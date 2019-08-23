import React, {Component, Fragment} from 'react';
import {Button, FormGroup, Modal, ModalBody, ModalHeader, Row} from 'reactstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import {setModal} from "../../actions/appStatusAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {AvField, AvForm, AvGroup} from "availity-reactstrap-validation";

class RegisterModal extends Component  {
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
            username, email, password, confirmPassword, firstName, lastName, contactNumber, error
        } = this.state;
        return (
            <Fragment>
                <div>
                    <Modal isOpen={isOpen} toggle={this.closeModal} className={this.props.className} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.closeModal}>Register</ModalHeader>
                        <ModalBody>
                            <AvForm onSubmit={this.handleSubmit} model={this.state}>
                                { error && <p className="text-danger">{error}</p>}
                                <Row form>
                                    <FormGroup>
                                        <AvGroup>
                                            <AvField name="username"
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
                                    <FormGroup>
                                        <AvGroup>
                                            <AvField name="firstName"
                                                     type="text"
                                                     placeholder="First Name ..."
                                                     onChange={this.handleChange}
                                                     value={firstName}
                                                     validate={{
                                                         required: {
                                                             value: true,
                                                             errorMessage: 'Please enter your first name'
                                                         },
                                                     }}
                                            />
                                        </AvGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <AvGroup>
                                            <AvField name="lastName"
                                                     type="text"
                                                     placeholder="Last Name ..."
                                                     onChange={this.handleChange}
                                                     value={lastName}
                                                     validate={{
                                                         required: {
                                                             value: true,
                                                             errorMessage: 'Please enter your last name'
                                                         },
                                                     }}
                                            />
                                        </AvGroup>
                                    </FormGroup>
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
                                    <FormGroup>
                                        <AvGroup>
                                            <AvField name="confirmPassword"
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
                                    <FormGroup>
                                        <AvGroup>
                                            <AvField name="contactNumber"
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
                                </Row>
                                <Button className="popup-btn register-btn">Register</Button>
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
})(RegisterModal));