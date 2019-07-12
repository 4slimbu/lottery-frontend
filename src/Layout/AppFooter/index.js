import React, {Component, Fragment} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";
import LoginModal from "../../Components/AppCommon/LoginModal";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import RegisterModal from "../../Components/AppCommon/RegisterModal";
import PlayModal from "../../Components/AppCommon/PlayModal";

class AppFooter extends Component {
    render() {
        return (
            <Fragment>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6 footer-left">
                                <ul className="footer-items">
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
                                <p>© 2019 Bitlot Crypto Lottery. All rights reserved.</p>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 footer-right">
                                <ul className="social-icons">
                                    <li><a href="#"><FontAwesomeIcon icon={faFacebook}/></a></li>
                                    <li><a href="#"><FontAwesomeIcon icon={faTwitter}/></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
                <LoginModal/>
                <RegisterModal/>
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