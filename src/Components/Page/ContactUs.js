import React, {Component} from 'react'
import 'react-table/react-table.css'
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {AvFeedback, AvField, AvForm, AvGroup} from "availity-reactstrap-validation";
import {Button, FormGroup, Row} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import {getEnv} from "../../utils/helper/helperFunctions";

class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            subject: "",
            message: "",
            captchaResponse: "",
            errors: [],
            response: {},
            isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.resetErrors = this.resetErrors.bind(this);
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
        if (typeof e === 'string') {
            this.setState({
                captchaResponse: e
            });
            return;
        }

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(event, errors, values) {
        if (! this.state.captchaResponse) {
            errors.push('captchaResponse');
        }

        if (errors.length > 0) {
            this.setState({errors: errors});
            return;
        }

        const data = {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message,
            captcha_response: this.state.captchaResponse
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.ContactFormEntry.create, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.setState({
                    response: responseData
                });
                this.form.reset();
                this.reCaptcha.reset();
                this.resetErrors();
            },
            (errorData) => {
                this.setState({
                    response: errorData
                });
                this.reCaptcha.reset();
            }
        );
    }

    resetErrors() {
        this.setState({
            errors: []
        })
    }

    render() {
        const {name, email, subject, message, response, errors} = this.state;
        return (
            <div className="section-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="inner-content-wrap">
                                <h2>Contact Us</h2>
                                <div className="content">
                                    <div>
                                        { response.errors && <p className="text-danger">Something went wrong. Try Again!</p>}
                                        { response.success && <p className="text-success">Form was submitted successfully.</p>}

                                        <div>
                                            <AvForm onSubmit={this.handleSubmit} ref={c => (this.form = c)}>
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
                                                                    sitekey={ getEnv('RECAPTCHA_SITE_KEY')}
                                                                    onChange={this.handleChange}
                                                                    ref={c => (this.reCaptcha = c)}
                                                                />

                                                                {(errors.indexOf('captchaResponse') !== -1) && <span className="text-danger">Re-captcha must be solved.</span>}
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
        )
    }
}

export default ContactUs;