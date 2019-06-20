import React, {Component, Fragment} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";

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
                                        <a href="#" className="footer-link">Privacy Policy</a>
                                    </li>
                                    <li className="footer-item">
                                        <a href="#" className="footer-link">Terms</a>
                                    </li>
                                    <li className="footer-item">
                                        <a href="#" className="footer-link">Faq</a>
                                    </li>
                                    <li className="footer-item">
                                        <a href="#" className="footer-link">Contact Us</a>
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
            </Fragment>
        )}
}

export default AppFooter;