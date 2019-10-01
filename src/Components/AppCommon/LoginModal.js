import React, {Component, Fragment} from 'react';
import {Button, FormGroup, Modal, ModalBody, ModalHeader, Row} from 'reactstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import {setModal, updateBrowseHistory} from "../../actions/appStatusAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {AvFeedback, AvField, AvForm, AvGroup} from "availity-reactstrap-validation";
import {setAuth} from "../../actions/authActions";
import jwt_decode from "jwt-decode";
import setAuthorizationToken from "../../utils/axios/setAuthorizationToken";
import Echo from 'laravel-echo';
import {getEnv} from "../../utils/helper/helperFunctions";

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            backdrop: true,
            email: "",
            guestEmail: "",
            password: "",
            recoveryEmail: "",
            passwordResetCode: "",
            newPassword: "",
            confirmNewPassword: "",
            error: "",
            activeScreen: "login", // login | sendRecoveryEmail | resetPassword | loginAsGuest
            isLoading: true
        };

        this.closeModal = this.closeModal.bind(this);
        this.changeBackdrop = this.changeBackdrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLoginAsGuest = this.handleLoginAsGuest.bind(this);
        this.handleSendRecoveryEmail = this.handleSendRecoveryEmail.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.activateScreen = this.activateScreen.bind(this);
    }

    componentWillUnmount() {
        this.setState({activeScreen: "login"});
    }

    closeModal() {
        this.activateScreen("login");
        this.resetFields();
        this.props.updateBrowseHistory({
            autoTasks: [],
        });
        this.props.setModal();
    }

    changeBackdrop(e) {
        let value = e.target.value;
        if (value !== 'static') {
            value = JSON.parse(value);
        }
        this.setState({backdrop: value});
    }

    activateScreen(screen) {
        this.setState({error: "", activeScreen: screen});
    };

    resetFields() {
        this.setState({
            email: "",
            guestEmail: "",
            password: "",
            recoveryEmail: "",
            passwordResetCode: "",
            newPassword: "",
            confirmNewPassword: "",
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleLogin(event, errors, values) {
        if (errors.length > 0) {
            return;
        }

        const data = {
            email: this.state.email,
            password: this.state.password
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Auth.login, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                if (this.props.auth.isVerified) {
                    this.props.setModal();
                } else {
                    this.props.setModal('verify')
                }

                window.io = require('socket.io-client');
                window.Echo = new Echo({
                    broadcaster: 'socket.io',
                    host: getEnv('APP_SOCKET_URL'),
                    // host: window.location.hostname + ':6001',
                    auth: {
                        headers: {
                            'Authorization' : 'Bearer ' + responseData.token
                        }
                    }
                });

                // join private channel
                window.Echo.private('App.User.' + this.props.auth.user.id)
                    .listen('UserUpdateEvent', (e) => {
                        if (e.token) {
                            localStorage.setItem("jwtToken", e.token);
                            setAuthorizationToken(e.token);
                            this.props.setAuth(jwt_decode(e.token));
                        }
                    });
                this.props.history.push("/");
            },
            (errorData) => {
                this.setState({error: errorData.message});
                this.setState({isLoading: false});
            }
        );
    }

    handleLoginAsGuest(event, errors, values) {
        if (errors.length > 0) {
            return;
        }

        const data = {
            email: this.state.guestEmail,
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Auth.loginAsGuest, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.props.setModal();
                window.io = require('socket.io-client');
                window.Echo = new Echo({
                    broadcaster: 'socket.io',
                    host: getEnv('APP_SOCKET_URL'),
                    // host: window.location.hostname + ':6001',
                    auth: {
                        headers: {
                            'Authorization' : 'Bearer ' + responseData.token
                        }
                    }
                });

                // join private channel
                window.Echo.private('App.User.' + this.props.auth.user.id)
                    .listen('UserUpdateEvent', (e) => {
                        if (e.token) {
                            localStorage.setItem("jwtToken", e.token);
                            setAuthorizationToken(e.token);
                            this.props.setAuth(jwt_decode(e.token));
                        }
                    });
                this.props.history.push("/");
            },
            (errorData) => {
                this.setState({error: errorData.message});
                this.setState({isLoading: false});
            }
        );
    }

    handleSendRecoveryEmail(event, errors, values) {
        if (errors.length > 0) {
            return;
        }

        const data = {
            email: this.state.recoveryEmail,
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Auth.forgotPassword, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                // this.resetFields();
                this.setState({activeScreen: "resetPassword", isLoading: false});
            },
            (errorData) => {
                // this.resetFields();
                setTimeout(function () {
                    this.setState({activeScreen: "resetPassword", isLoading: false});
                }.bind(this), 300);
            }
        );
    }

    handleResetPassword(event, errors, values) {
        if (errors.length > 0) {
            return;
        }

        const data = {
            email: this.state.recoveryEmail,
            token: this.state.passwordResetCode,
            password: this.state.newPassword,
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Auth.resetPassword, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.resetFields();
                this.setState({activeScreen: "login", isLoading: false});
            },
            (errorData) => {
                this.setState({error: errorData.message});
                this.setState({isLoading: false});
            }
        );
    }

    render() {
        const {modal} = this.props.appStatus;
        const isOpen = modal === 'login';

        const {error, email, guestEmail, password, recoveryEmail, passwordResetCode, newPassword, confirmNewPassword, isLoading, activeScreen} = this.state;

        return (
            <Fragment>
                <div>
                    <Modal isOpen={isOpen} toggle={this.closeModal} className={this.props.className}
                           backdrop={this.state.backdrop}>
                        { activeScreen === "login" && <ModalHeader toggle={this.closeModal}>Sign In</ModalHeader> }
                        { activeScreen === "loginAsGuest" && <ModalHeader toggle={this.closeModal}>Sign In As Guest</ModalHeader> }
                        { activeScreen === "sendRecoveryEmail" && <ModalHeader toggle={this.closeModal}>Recover Password</ModalHeader> }
                        { activeScreen === "resetPassword" && <ModalHeader toggle={this.closeModal}>Reset Password</ModalHeader> }

                        <ModalBody>
                            { error && <p className="text-danger">{error}</p>}
                            {/*============== Login Screen ==================*/}
                            {
                                activeScreen === "login" &&
                                <div>
                                    <div className="login-as-user popup-form-wrap">
                                        <h4 className="popup-title">
                                            <span>Please sign in to your account.</span>
                                        </h4>
                                        <AvForm onSubmit={this.handleLogin}>
                                            <Row form>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="email"
                                                                 type="email"
                                                                 placeholder="Email here..."
                                                                 onChange={this.handleChange}
                                                                 value={email}
                                                                 validate={{
                                                                     email: {
                                                                         value: true,
                                                                         errorMessage: 'Please enter a valid email address'
                                                                     },
                                                                     required: {
                                                                         value: true,
                                                                         errorMessage: 'Please enter an email address'
                                                                     }
                                                                 }}
                                                        />
                                                        <AvFeedback/>
                                                    </AvGroup>
                                                </FormGroup>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="password"
                                                                 type="password"
                                                                 placeholder="Enter your password..."
                                                                 onChange={this.handleChange}
                                                                 value={password}
                                                                 validate={{
                                                                     required: {value: true, errorMessage: 'Please enter your password'},
                                                                     minLength: {value: 6, errorMessage: 'Your name must be at least 6 characters'},
                                                                 }}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Row>

                                            <Button className="popup-btn">Sign In</Button>

                                            <div className="optional-links">
                                                <a href="javascript:void(0);" onClick={() => this.activateScreen("sendRecoveryEmail")} className="btn-link">Recover
                                                        Password</a>{' '}{' '}
                                                <a href="javascript:void(0);" onClick={() => this.activateScreen("loginAsGuest")} className="btn-link">Sign in as Guest</a>{' '}{' '}
                                            </div>
                                                   
                                        </AvForm>
                                    </div>
                                </div>
                            }

                            {/*============== Login As Guest Screen ==================*/}
                            {
                                activeScreen === "loginAsGuest" &&
                                <div className="login-as-guest popup-form-wrap">
                                    <h4 className="popup-title">
                                        <span>Only email is required to sign in as guest.</span>
                                    </h4>
                                    <AvForm onSubmit={this.handleLoginAsGuest}>
                                        <Row form>
                                            <FormGroup>
                                                <AvGroup>
                                                    <AvField name="guestEmail"
                                                             type="email"
                                                             placeholder="Email here..."
                                                             onChange={this.handleChange}
                                                             value={guestEmail}
                                                             validate={{
                                                                 email: {
                                                                     value: true,
                                                                     errorMessage: 'Please enter a valid email address'
                                                                 },
                                                                 required: {
                                                                     value: true,
                                                                     errorMessage: 'Please enter an email address'
                                                                 }
                                                             }}
                                                    />
                                                    <AvFeedback/>
                                                </AvGroup>
                                            </FormGroup>
                                        </Row>
                                        <Button className="popup-btn">Sign in as Guest</Button>

                                        <div className="optional-links">
                                            <a href="javascript:void(0);" onClick={() => this.activateScreen("login")} className="btn-lg btn btn-link">Go Back</a>
                                        </div>
                                    </AvForm>
                                </div>
                            }

                            {/*============== Send Password Recovery Email Screen ==================*/}
                            {
                                activeScreen === "sendRecoveryEmail" &&
                                <div className="popup-form-wrap">
                                    { error && <p className="text-danger">{error}</p>}
                                    <h4 className="popup-title">
                                        <span>Please enter your email address to recover your password</span>
                                    </h4>
                                    <div>
                                        <AvForm onSubmit={this.handleSendRecoveryEmail}>
                                            <Row form>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="recoveryEmail"
                                                                 type="email"
                                                                 placeholder="Recovery Email here..."
                                                                 onChange={this.handleChange}
                                                                 value={recoveryEmail}
                                                                 validate={{
                                                                     email: {
                                                                         value: true,
                                                                         errorMessage: 'Please enter a valid email address'
                                                                     },
                                                                     required: {
                                                                         value: true,
                                                                         errorMessage: 'Please enter an email address'
                                                                     }
                                                                 }}
                                                        />
                                                        <AvFeedback/>
                                                    </AvGroup>
                                                </FormGroup>
                                            </Row>

                                            <Button className="popup-btn">Send Recovery Email</Button>

                                            <div className="optional-links">
                                                <a href="javascript:void(0);" onClick={() => this.activateScreen("login")} className="btn-lg btn btn-link">Go Back</a>{' '}{' '}
                                                    {/*<a href="javascript:void(0);" onClick={() => this.activateScreen("resetPassword")} className="btn-lg btn btn-link">Skip to Password Reset Screen</a>{' '}{' '}*/}
                                            </div>

                                        </AvForm>
                                    </div>
                                </div>
                            }

                            {/*============== Password Reset Screen ==================*/}
                            {
                                activeScreen === "resetPassword" &&
                                <div className="popup-form-wrap">
                                    { error && <p className="text-danger">{error}</p>}
                                    <h4 className="popup-title">
                                        <span>A password reset code has been sent to your email. Please use it to reset your password.</span>
                                    </h4>
                                    <Row className="divider"/>
                                    <div>
                                        <AvForm onSubmit={this.handleResetPassword}>
                                            <Row form>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="passwordResetCode"
                                                                 type="text"
                                                                 placeholder="Enter your reset code..."
                                                                 onChange={this.handleChange}
                                                                 value={passwordResetCode}
                                                                 validate={{
                                                                     required: {value: true, errorMessage: 'Please enter your password reset code'},
                                                                     minLength: {value: 8, errorMessage: 'Invalid code'},
                                                                 }}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                                {/*<FormGroup>*/}
                                                    {/*<AvGroup>*/}
                                                        {/*<AvField name="recoveryEmail"*/}
                                                                 {/*type="email"*/}
                                                                 {/*placeholder="Your Email here..."*/}
                                                                 {/*onChange={this.handleChange}*/}
                                                                 {/*value={recoveryEmail}*/}
                                                                 {/*validate={{*/}
                                                                     {/*email: {*/}
                                                                         {/*value: true,*/}
                                                                         {/*errorMessage: 'Please enter a valid email address'*/}
                                                                     {/*},*/}
                                                                     {/*required: {*/}
                                                                         {/*value: true,*/}
                                                                         {/*errorMessage: 'Please enter an email address'*/}
                                                                     {/*}*/}
                                                                 {/*}}*/}
                                                        {/*/>*/}
                                                        {/*<AvFeedback/>*/}
                                                    {/*</AvGroup>*/}
                                                {/*</FormGroup>*/}
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="newPassword"
                                                                 type="password"
                                                                 placeholder="Enter your password..."
                                                                 onChange={this.handleChange}
                                                                 value={newPassword}
                                                                 validate={{
                                                                     required: {value: true, errorMessage: 'Please enter your password'},
                                                                     minLength: {value: 6, errorMessage: 'Your name must be at least 6 characters'},
                                                                 }}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="confirmPassword"
                                                                 type="password"
                                                                 placeholder="Confirm your password..."
                                                                 onChange={this.handleChange}
                                                                 value={confirmNewPassword}
                                                                 validate={{
                                                                     required: {value: true, errorMessage: 'Please enter your password'},
                                                                     match: {value: "newPassword", errorMessage: 'Password and Confirm Password must match'},
                                                                 }}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Row>
                                            <div className="link-btn">
                                                <a href="javascript:void(0);" onClick={() => this.activateScreen("sendRecoveryEmail")} className="btn-lg btn btn-link">Go Back</a>{' '}{' '}
                                                <Button className="popup-btn">Reset Password</Button>
                                            </div>
                                        </AvForm>
                                    </div>
                                </div>
                            }
                        </ModalBody>
                    </Modal>
                </div>
            </Fragment>
        )
    }
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    setModal,
    makeRequest,
    updateBrowseHistory,
    setAuth
})(LoginModal));