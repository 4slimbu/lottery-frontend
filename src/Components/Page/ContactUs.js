import React, {Component, Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import 'react-table/react-table.css'
import {makeRequest} from "../../actions/requestAction";

import AppHeader from "../../Layout/AppHeader";
import AppFooter from "../../Layout/AppFooter";
import AppLogo from "../AppCommon/AppLogo";
import DepositButton from "../AppCommon/DepositButton";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {setPage} from "../../actions/pageActions";
import {getBySlug} from "../../utils/helper/helperFunctions";
import {AvFeedback, AvField, AvForm, AvGroup} from "availity-reactstrap-validation";
import {Button, FormGroup, Row} from "reactstrap";
import {ReCAPTCHA} from "react-google-recaptcha";

class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            subject: "",
            message: "",
            captchaResponse: "",
            error: "",
            success: "",
            isLoading: false
        };

        this.playLottery = this.playLottery.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetFields = this.resetFields.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.slug !== nextProps.match.params.slug) {
            this.bootstrap(nextProps.match.params.slug);
        }
    }

    componentDidMount() {
        this.bootstrap(this.props.match.params.slug);
    }

    bootstrap(slug) {
        // Get Page
        this.setState({isLoading: true});

        if (! this.props.page[slug]) {
            this.props.makeRequest(request.Pages.show, {slug: slug }, {message: MESSAGES.LOGGING}).then(
                (res) => { if (res.data) { this.props.setPage(res); this.setState({isLoading: false}); } },
                (errorData) => {}
            );
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(event, errors, values) {
        if (errors.length > 0) {
            return;
        }

        const data = {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.ContactFormEntry.create, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.setState({
                    success: 'Form submitted successfully.'
                });
            },
            (errorData) => {
                this.setState({
                    error: 'Something went wrong. Please try again!'
                });
            }
        );
    }

    resetFields() {
        this.setState({
            name: "",
            email: "",
            subject: "",
            message: "",
        })
    }

    playLottery() {
        const {isAuthenticated} = this.props.auth;

        // check if authenticated
        if (! isAuthenticated) {
            this.props.setModal('login');
            return;
        }

        this.props.setModal('playLottery');

        this.props.history.push('/');
    }

    render() {
        const {slug} = this.props.match.params;
        const {pages} = this.props.page;
        const currentPage = getBySlug(pages, slug);
        const {name, email, subject, message, error, success} = this.state;
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <AppHeader/>

                    <section className="main inner-pages">
                        <div className="section-top">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-5 col-lg-4">
                                        <AppLogo/>
                                    </div>
                                    <div className="col-sm-12 col-md-7 col-lg-5">
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-3">
                                        <div className="buttons">
                                            <DepositButton/>
                                            <button onClick={this.playLottery} className="btn btn-primary">Let's play</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-bottom">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="inner-content-wrap">
                                            <h2>Contact Us</h2>
                                            <div className="content">
                                                <div>
                                                    { error && <p className="text-danger">{error}</p>}
                                                    { success && <p className="text-success">{success}</p>}

                                                    <div>
                                                        <AvForm onSubmit={this.handleSubmit}>
                                                            <Row form>
                                                                <FormGroup>
                                                                    <AvGroup>
                                                                        <AvField name="name"
                                                                                 type="text"
                                                                                 placeholder="Full Name ..."
                                                                                 onChange={this.handleChange}
                                                                                 value={name}
                                                                                 validate={{
                                                                                     required: {
                                                                                         value: true,
                                                                                         errorMessage: 'Please enter your name'
                                                                                     }
                                                                                 }}
                                                                        />
                                                                        <AvFeedback/>
                                                                    </AvGroup>
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <AvGroup>
                                                                        <AvField name="email"
                                                                                 type="email"
                                                                                 placeholder="Email ..."
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
                                                                        <AvField name="subject"
                                                                                 type="text"
                                                                                 placeholder="Subject ..."
                                                                                 onChange={this.handleChange}
                                                                                 value={subject}
                                                                                 validate={{
                                                                                     required: {
                                                                                         value: true,
                                                                                         errorMessage: 'Please enter your subject ...'
                                                                                     }
                                                                                 }}
                                                                        />
                                                                        <AvFeedback/>
                                                                    </AvGroup>
                                                                </FormGroup>

                                                                <FormGroup>
                                                                    <AvGroup>
                                                                        <AvField name="message"
                                                                                 type="textarea"
                                                                                 placeholder="Message ..."
                                                                                 onChange={this.handleChange}
                                                                                 value={message}
                                                                                 rows={10}
                                                                                 validate={{
                                                                                     required: {
                                                                                         value: true,
                                                                                         errorMessage: 'Please enter your message ...'
                                                                                     }
                                                                                 }}
                                                                        />
                                                                        <AvFeedback/>
                                                                    </AvGroup>
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <AvGroup>
                                                                        <div className="form-group re-captcha">
                                                                            <ReCAPTCHA
                                                                                sitekey="6LfywmMUAAAAAH51QWhKz33Nel43Fh8uAq3xUN1j"
                                                                                onChange={this.handleChange}
                                                                            />

                                                                            {error.captcha_response && <span className="form-error-message">{error.captcha_response}</span>}
                                                                        </div>
                                                                    </AvGroup>
                                                                </FormGroup>
                                                            </Row>

                                                            <Button className="popup-btn">Contact Us</Button>

                                                        </AvForm>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <AppFooter/>

                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

ContactUs.propTypes = {
    makeRequest: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer,
        lottery: state.lotteryReducer,
        my: state.myReducer,
        page: state.pageReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest, setPage
})(ContactUs));