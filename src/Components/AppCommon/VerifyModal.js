import React, {Component, Fragment} from 'react';
import {Button, FormGroup, Modal, ModalBody, ModalHeader, Row} from 'reactstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import {setModal} from "../../actions/appStatusAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {AvField, AvForm, AvGroup} from "availity-reactstrap-validation";

class VerifyModal extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            backdrop: true,
            verificationCode: "",
            email: "",
            error: "",
            isLoading: false,
            activeScreen: "verify" // verify, resendVerificationCode
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeBackdrop = this.changeBackdrop.bind(this);
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
        this.setState({ backdrop: value });
    }

    async componentDidMount() {
        this._isMounted = true;

        this.setState({isLoading: true});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    resetFields() {
        this.setState({
            verificationCode: "",
            email: "",
        })
    }

    handleChange(e) {
        if (e.target && e.target.name) {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    handleSubmit(event, errors, values) {
        if (errors.length > 0) {
            return;
        }

        const { verificationCode, email, activeScreen } = this.state;

        this.setState({isLoading: true});

        if (activeScreen === 'verify') {
            this.props.makeRequest(request.Auth.verifyEmail, {verificationCode}, {message: MESSAGES.LOGGING}).then(
                (responseData) => {
                    this.props.setModal();
                    this.props.history.push("/");
                },
                (errorData) => {
                    this.setState({error: "Verification failed"});
                    this.setState({isLoading: false});
                }
            );
        }

        if (activeScreen === 'resendVerificationCode') {
            this.props.makeRequest(request.Auth.resendVerificationCode, {verificationCode}, {message: MESSAGES.LOGGING}).then(
                (responseData) => {
                    this.activateScreen('verify');
                    this.props.history.push("/");
                },
                (errorData) => {
                    this.setState({error: "Sending verification code failed"});
                    this.setState({isLoading: false});
                }
            );
        }

    }

    handleClick(state) {
        let node = this[state];
        this.setState({
            profilePicture: node.crop(),
            editMode: "done"
        })
    }

    activateScreen(screen) {
        this.setState({error: "", activeScreen: screen});
    };

    render() {
        const {modal} = this.props.appStatus;
        const isOpen = modal === 'verify';
        const { verificationCode, email, activeScreen, error } = this.state;
        return (
            <Fragment>
                <div>
                    <Modal isOpen={isOpen} toggle={this.closeModal} className={this.props.className} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.closeModal}>Verify your account</ModalHeader>
                        {
                            activeScreen === 'verify' &&
                            <ModalBody>
                                <h4 className="popup-title">
                                    <span>Please use the verification code sent to your email.</span>
                                </h4>
                                <AvForm onSubmit={this.handleSubmit} model={this.state}>
                                    <Row form>
                                        <FormGroup>
                                            { error && <p className="text-danger">{error}</p>}
                                            <AvGroup>
                                                <AvField name="verificationCode"
                                                         type="text"
                                                         placeholder="Verification code..."
                                                         onChange={this.handleChange}
                                                         value={verificationCode}
                                                         validate={{
                                                             required: {
                                                                 value: true,
                                                                 errorMessage: 'Please enter your verification code'
                                                             }
                                                         }}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Row>
                                    <Button className="popup-btn register-btn">Verify Email</Button>
                                    <div className="optional-links">
                                        <a href="javascript:void(0);" onClick={() => this.activateScreen("resendVerificationCode")} className="btn-link">Re-send Verification Code</a>{' '}{' '}
                                        <a href="javascript:void(0);" onClick={() => this.closeModal()} className="btn-link">Skip</a>{' '}{' '}
                                    </div>
                                </AvForm>
                            </ModalBody>
                        }
                        {
                            activeScreen === 'resendVerificationCode' &&
                            <ModalBody>
                                <h4 className="popup-title">
                                    <span>Click below to re-send verification code to your email.</span>
                                </h4>
                                <AvForm onSubmit={this.handleSubmit} model={this.state}>
                                    { error && <p className="text-danger">{error}</p>}
                                    <Button className="popup-btn register-btn">Re-send Verification Code</Button>
                                    <div className="optional-links">
                                        <a href="javascript:void(0);" onClick={() => this.activateScreen("verify")} className="btn-link">Verify Email</a>{' '}{' '}
                                        <a href="javascript:void(0);" onClick={() => this.closeModal()} className="btn-link">Skip</a>{' '}{' '}
                                    </div>
                                </AvForm>
                            </ModalBody>
                        }
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
})(VerifyModal));