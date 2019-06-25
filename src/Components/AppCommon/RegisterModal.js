import React, {Component, Fragment} from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup,
    Col, Row, Card, CardBody,
    CardTitle, Container
} from 'reactstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import {setModal} from "../../actions/appStatusAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {AvField, AvForm, AvGroup, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";
import cx from 'classnames';
import * as _ from "lodash";
import {Cropper} from "react-image-cropper";
import {Loader} from "react-loaders";

class LoginModal extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            backdrop: true,
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            contactNumber: "",
            error: "",
            isLoading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeBackdrop = this.changeBackdrop.bind(this);
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
        this._isMounted && await this.props.makeRequest(request.Roles.all, '', {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                if (responseData.data) {
                    this.setState({
                        roles: responseData.data,
                    });
                }
                this.setState({isLoading: false});
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    resetFields() {
        this.setState({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            contactNumber: "",
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

        const {
            username, email, password, firstName, lastName, contactNumber
        } = this.state;

        const data = {
            username: username,
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            contact_number: contactNumber,
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Auth.register, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.props.setModal();
                this.props.history.push("/");
            },
            (errorData) => {
                this.setState({error: errorData.message});
                this.setState({isLoading: false});
            }
        );
    }

    handleClick(state) {
        let node = this[state];
        this.setState({
            profilePicture: node.crop(),
            editMode: "done"
        })
    }

    render() {
        const {modal} = this.props.appStatus;
        const isOpen = modal === 'register';
        const {
            username, email, password, confirmPassword, firstName, lastName, contactNumber
        } = this.state;
        return (
            <Fragment>
                <div>
                    <Modal isOpen={isOpen} toggle={this.closeModal} className={this.props.className} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.closeModal}>Register</ModalHeader>
                        <ModalBody>
                            <AvForm onSubmit={this.handleSubmit} model={this.state}>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField name="username"
                                                         label="Username"
                                                         type="text"
                                                         placeholder="Username..."
                                                         onChange={this.handleChange}
                                                         value={username}
                                                         validate={{
                                                             required: {
                                                                 value: true,
                                                                 errorMessage: 'Please enter a username'
                                                             }
                                                         }}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
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
                                                             required: {
                                                                 value: true,
                                                                 errorMessage: 'Please enter your password'
                                                             },
                                                             minLength: {
                                                                 value: 6,
                                                                 errorMessage: 'Your name must be at least 6 characters'
                                                             },
                                                         }}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField name="confirmPassword"
                                                         label="Confirm Password"
                                                         type="password"
                                                         placeholder="Confirm your password..."
                                                         onChange={this.handleChange}
                                                         value={confirmPassword}
                                                         validate={{
                                                             required: {
                                                                 value: true,
                                                                 errorMessage: 'Please confirm your password'
                                                             },
                                                             match: {
                                                                 value: 'password',
                                                                 errorMessage: 'Password and Confirm Password must match'
                                                             },
                                                         }}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField name="firstName"
                                                         label="First Name"
                                                         type="text"
                                                         placeholder="First Name ..."
                                                         onChange={this.handleChange}
                                                         value={firstName}
                                                         validate={{
                                                             required: {
                                                                 value: true,
                                                                 errorMessage: 'Please enter First Name'
                                                             },
                                                         }}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField name="lastName"
                                                         label="Last Name"
                                                         type="text"
                                                         placeholder="Last Name ..."
                                                         onChange={this.handleChange}
                                                         value={lastName}
                                                         validate={{
                                                             required: {
                                                                 value: true,
                                                                 errorMessage: 'Please enter Last Name'
                                                             },
                                                         }}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField name="contactNumber"
                                                         label="Contact Number"
                                                         type="text"
                                                         placeholder="Contact Number ..."
                                                         onChange={this.handleChange}
                                                         value={contactNumber}
                                                         validate={{
                                                             required: {
                                                                 value: true,
                                                                 errorMessage: 'Please enter your contact number'
                                                             },
                                                         }}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="divider"/>
                                <div className="d-flex align-items-center">
                                    <Button color="primary" size="lg">
                                        Register
                                    </Button>
                                </div>
                            </AvForm>
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