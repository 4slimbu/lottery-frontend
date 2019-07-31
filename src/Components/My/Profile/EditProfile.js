import React, {Component, Fragment} from 'react'
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../actions/requestAction";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../../actions/lotteryActions";
import {setCurrencies, setSettings} from "../../../actions/appStatusAction";
import AnimatedSection from "../../AppCommon/AnimatedSection";
import request from "../../../services/request";
import {MESSAGES} from "../../../constants/messages";
import {AvField, AvForm, AvGroup, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";
import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {Cropper} from "react-image-cropper";
import {Loader} from "react-loaders";
import {setUser} from "../../../actions/authActions";

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            contactNumber: "",
            password: "",
            confirmPassword: "",
            profilePictureFile: "",
            profilePicture: "",
            error: "",
            isLoading: false,
            files: [],
            editMode: "pick", // pick | crop | done
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        this.setState({isLoading: true});

        this._isMounted && await this.props.makeRequest(request.Me.get, {}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.setState({
                        username: res.data.username,
                        email: res.data.email,
                        firstName: res.data.first_name,
                        lastName: res.data.last_name,
                        contactNumber: res.data.contact_number,
                        profilePicture: res.data.profile_pic,
                        editMode: "done"
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
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            contactNumber: "",
            profilePicture: "",
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
        event.preventDefault();
        if (errors.length > 0) {
            return;
        }

        const {
            username, email, firstName, lastName, contactNumber, password, confirmPassword,
            profilePicture, profilePictureFile
        } = this.state;

        const data = {
            username: username ? username : undefined,
            email: email ? email : undefined,
            first_name: firstName ? firstName : undefined,
            last_name: lastName ? lastName : undefined,
            password: password ? password : undefined,
            password_confirmation: confirmPassword ? confirmPassword : undefined,
            contact_number: contactNumber ? contactNumber : undefined,
            profile_picture: profilePictureFile && profilePicture ? profilePicture : undefined,
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Me.updateProfile, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                if (responseData.data) {
                    this.props.setUser(responseData.data);
                }
                this.props.history.push("/my/profile");
            },
            (errorData) => {
                this.setState({error: errorData.message});
                this.setState({isLoading: false});
            }
        );
    }

    handleSwitch(field) {
        this.setState({
            [field]: !this.state[field]
        });
    }

    handleImageLoaded() {
        this.setState({
            editMode: "crop"
        })
    }

    handleClick(state) {
        let node = this[state];
        this.setState({
            profilePicture: node.crop(),
            editMode: "done"
        })
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                profilePictureFile: file,
                profilePicture: reader.result,
                editMode: "crop"
            });
        };

        reader.readAsDataURL(file)
    }

    render() {
        const {
            username, email, firstName, lastName, contactNumber,
            profilePicture, isLoading, editMode, password, confirmPassword
        } = this.state;
        return (
            <Fragment>
                <AnimatedSection>
                    <div className="row">
                        <div className="col-md-12 mb-md-4">
                            <div className="card">
                                <div className="card-header">Edit Profile</div>
                                <div className="card-body">
                                    <AvForm onSubmit={this.handleSubmit} model={this.state}>
                                        <Row form>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        {
                                                            editMode === "crop" &&
                                                            <div style={{width: '300px'}}>
                                                                <Cropper src={profilePicture}
                                                                         ref={ref => {
                                                                             this.image = ref
                                                                         }}
                                                                         onImgLoad={() => this.handleImageLoaded()}
                                                                />

                                                                <div className="divider"/>

                                                                <div className="text-center">
                                                                    <Button color="primary"
                                                                            onClick={() => this.handleClick('image')}
                                                                    >
                                                                        Crop
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        }

                                                        {
                                                            editMode === "done" &&
                                                            <Col md={6}>
                                                                <img
                                                                    className="after-img rounded"
                                                                    src={profilePicture}
                                                                    alt=""
                                                                    style={{width: '150px'}}
                                                                />
                                                            </Col>
                                                        }
                                                        <AvField name="profilePicture"
                                                                 type="file"
                                                                 placeholder="Profile Picture"
                                                                 onChange={(e) => this.handleImageChange(e)}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="username"
                                                                 label="Username"
                                                                 type="text"
                                                                 placeholder="Username..."
                                                                 onChange={this.handleChange}
                                                                 value={username}
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
                                                        <AvField name="firstName"
                                                                 label="First Name"
                                                                 type="text"
                                                                 placeholder="First Name ..."
                                                                 onChange={this.handleChange}
                                                                 value={firstName}
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
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="contactNumber"
                                                                 label="Contact Number"
                                                                 type="text"
                                                                 placeholder="Contact Number ..."
                                                                 onChange={this.handleChange}
                                                                 value={contactNumber}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="password"
                                                                 label="New Password"
                                                                 type="password"
                                                                 placeholder="Enter your password..."
                                                                 onChange={this.handleChange}
                                                                 value={password}
                                                                 validate={{
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
                                                                 label="Confirm New Password"
                                                                 type="password"
                                                                 placeholder="Confirm your password..."
                                                                 onChange={this.handleChange}
                                                                 value={confirmPassword}
                                                                 validate={{
                                                                     match: {
                                                                         value: 'password',
                                                                         errorMessage: 'Password and Confirm Password must match'
                                                                     },
                                                                 }}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>



                                        </Row>
                                        <Row className="divider"/>
                                        <div className="d-flex align-items-center">
                                            <Button className="popup-btn register-btn">Update Profile</Button>
                                        </div>
                                    </AvForm>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </Fragment>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer,
        lottery: state.lotteryReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest, setLotteryWinners, setLotterySlot, setLotteryPlayers, setSettings, setCurrencies, setLastSlot, setUser
})(EditProfile));