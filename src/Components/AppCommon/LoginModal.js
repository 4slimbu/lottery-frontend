import React, {Component, Fragment} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Row, Col} from 'reactstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import {setModal} from "../../actions/appStatusAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {AvFeedback, AvField, AvForm, AvGroup} from "availity-reactstrap-validation";
import {Loader} from 'react-loaders';

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            backdrop: true,
            email: "",
            password: "",
            recoveryEmail: "",
            passwordResetCode: "",
            newPassword: "",
            confirmNewPassword: "",
            error: "",
            activeScreen: "login", // login | sendRecoveryEmail | resetPassword
            isLoading: true
        };

        this.closeModal = this.closeModal.bind(this);
        this.changeBackdrop = this.changeBackdrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSendRecoveryEmail = this.handleSendRecoveryEmail.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.activateScreen = this.activateScreen.bind(this);
    }

    closeModal() {
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
                this.props.setModal();
                this.props.history.push("/");
            },
            (errorData) => {
                this.setState({error: errorData.message});
                this.resetFields();
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
                this.resetFields();
                this.setState({activeScreen: "resetPassword", isLoading: false});
            },
            (errorData) => {
                this.setState({error: errorData.message});
                this.resetFields();
                this.setState({isLoading: false});
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
                this.resetFields();
                this.setState({isLoading: false});
            }
        );
    }

    render() {
        const {modal} = this.props.appStatus;
        const isOpen = modal === 'login';

        const {error, email, password, recoveryEmail, passwordResetCode, newPassword, confirmNewPassword, isLoading, activeScreen} = this.state;

        return (
            <Fragment>
                <div>
                    <Modal isOpen={isOpen} toggle={this.closeModal} className={this.props.className}
                           backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.closeModal}>Login</ModalHeader>
                        <ModalBody>
                            {/*============== Login Screen ==================*/}
                            {
                                activeScreen === "login" &&
                                <div>
                                    { error && <p className="text-danger">{error}</p>}
                                    <h4 className="mb-0">
                                        <span>Please sign in to your account.</span>
                                    </h4>
                                    <Row className="divider"/>
                                    <div>
                                        <AvForm onSubmit={this.handleLogin}>
                                            <Row form>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <AvGroup>
                                                            <AvField name="email"
                                                                     label="Email"
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
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <AvGroup>
                                                            <AvField name="password"
                                                                     label="Password"
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
                                                </Col>
                                            </Row>
                                            {/*<FormGroup check>*/}
                                            {/*<Input type="checkbox" name="check" id="exampleCheck"/>*/}
                                            {/*<Label for="exampleCheck" check>Keep me logged in</Label>*/}
                                            {/*</FormGroup>*/}
                                            <Row className="divider"/>
                                            <div className="d-flex align-items-center">
                                                <div className="ml-auto">
                                                    <a href="javascript:void(0);" onClick={() => this.activateScreen("sendRecoveryEmail")} className="btn-lg btn btn-link">Recover
                                                        Password</a>{' '}{' '}
                                                    <Button color="primary" size="lg">
                                                            Login
                                                    </Button>
                                                </div>
                                            </div>
                                        </AvForm>
                                    </div>
                                </div>
                            }

                            {/*============== Send Password Recovery Email Screen ==================*/}
                            {
                                activeScreen === "sendRecoveryEmail" &&
                                <div>
                                    { error && <p className="text-danger">{error}</p>}
                                    <h4 className="mb-0">
                                        <span>Please enter your email address to recover your password</span>
                                    </h4>
                                    <Row className="divider"/>
                                    <div>
                                        <AvForm onSubmit={this.handleSendRecoveryEmail}>
                                            <Row form>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <AvGroup>
                                                            <AvField name="recoveryEmail"
                                                                     label="Recovery Email"
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
                                                </Col>
                                            </Row>
                                            <Row className="divider"/>
                                            <div className="d-flex align-items-center">
                                                <div className="ml-auto">
                                                    <a href="javascript:void(0);" onClick={() => this.activateScreen("login")} className="btn-lg btn btn-link">Go Back</a>{' '}{' '}
                                                    <a href="javascript:void(0);" onClick={() => this.activateScreen("resetPassword")} className="btn-lg btn btn-link">Skip to Password Reset Screen</a>{' '}{' '}
                                                    <Button color="primary" size="lg">
                                                        Send Recovery Email
                                                    </Button>
                                                </div>
                                            </div>
                                        </AvForm>
                                    </div>
                                </div>
                            }

                            {/*============== Password Reset Screen ==================*/}
                            {
                                activeScreen === "resetPassword" &&
                                <div>
                                    { error && <p className="text-danger">{error}</p>}
                                    <h4 className="mb-0">
                                        <span>Please enter the password reset code and your new password</span>
                                    </h4>
                                    <Row className="divider"/>
                                    <div>
                                        <AvForm onSubmit={this.handleResetPassword}>
                                            <Row form>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <AvGroup>
                                                            <AvField name="passwordResetCode"
                                                                     label="Password Reset Code"
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
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <AvGroup>
                                                            <AvField name="recoveryEmail"
                                                                     label="Recovery Email"
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
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <AvGroup>
                                                            <AvField name="newPassword"
                                                                     label="New Password"
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
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <AvGroup>
                                                            <AvField name="confirmPassword"
                                                                     label="Confirm New Password"
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
                                                </Col>
                                            </Row>
                                            <Row className="divider"/>
                                            <div className="d-flex align-items-center">
                                                <div className="ml-auto">
                                                    <a href="javascript:void(0);" onClick={() => this.activateScreen("sendRecoveryEmail")} className="btn-lg btn btn-link">Go Back</a>{' '}{' '}
                                                    <Button color="primary" size="lg">
                                                        Reset Password
                                                    </Button>
                                                </div>
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
})(LoginModal));