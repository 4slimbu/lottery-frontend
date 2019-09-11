import React, {Component, Fragment} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";
import LoginModal from "../../Components/AppCommon/LoginModal";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import RegisterModal from "../../Components/AppCommon/RegisterModal";
import PlayModal from "../../Components/AppCommon/PlayModal";
import {findSetting} from "../../utils/helper/helperFunctions";
import VerifyModal from "../../Components/AppCommon/VerifyModal";

class AppFooter extends Component {
    render() {
        const {settings} = this.props.appStatus;
        return (
            <Fragment>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6 footer-left">
                                <ul className="footer-items">
                                    <li className="footer-item">
                                        <Link to={"/about"} className="footer-link">About</Link>
                                    </li>
                                    <li className="footer-item">
                                        <Link to={"/winners"} className="footer-link">Winners</Link>
                                    </li>
                                    <li className="footer-item">
                                        <Link to={"/privacy-policy"} className="footer-link">Privacy Policy</Link>
                                    </li>
                                    <li className="footer-item">
                                        <Link to={"/terms"} className="footer-link">Terms</Link>
                                    </li>
                                    <li className="footer-item">
                                        <Link to={"/faq"} className="footer-link">Faq</Link>
                                    </li>
                                    <li className="footer-item">
                                        <Link to={"/contact"} className="footer-link">Contact Us</Link>
                                    </li>
                                </ul>
                                <p>© { (new Date()).getFullYear() } { findSetting(settings, 'app_name').value }. All rights reserved.</p>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 footer-right">
                                <ul className="social-icons">
                                    <li><a href={findSetting(settings, 'app_facebook_url').value}><FontAwesomeIcon icon={faFacebook}/></a></li>
                                    <li><a href={findSetting(settings, 'app_twitter_url').value}><FontAwesomeIcon icon={faTwitter}/></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
                <LoginModal/>
                <RegisterModal/>
                <VerifyModal/>
                <PlayModal/>
            </Fragment>
        )}
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest,
})(AppFooter));