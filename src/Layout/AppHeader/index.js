import React, {Component, Fragment} from 'react';

import {connect} from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {setModal} from "../../actions/appStatusAction";
import {logout} from "../../actions/authActions";
import {withRouter} from "react-router-dom";
import {Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        };

        this.showLoginModal = this.showLoginModal.bind(this);
        this.showRegisterModal = this.showRegisterModal.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    showLoginModal() {
        this.props.setModal("login");
    }

    showRegisterModal() {
        this.props.setModal("register");
    }

    logoutHandler() {
        const {logout, history} = this.props;

        logout();
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const {isAuthenticated, isVerified, user} = this.props.auth;
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="HeaderAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <header>
                        <div className="container">
                            <nav className="navbar navbar-expand-md">
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#headerNavbar" aria-controls="headerNavbar">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse" id="headerNavbar">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">About </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Faq </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Contact </a>
                                        </li>
                                    </ul>
                                </div>
                                {
                                    ! isAuthenticated &&
                                    <ul className="nav-items-link">
                                        <li className="nav-item">
                                            <button className="nav-link" onClick={this.showLoginModal}>Login</button>
                                        </li>
                                        <li className="nav-item">
                                            <button className="nav-link" onClick={this.showRegisterModal}>Register</button>
                                        </li>
                                    </ul>
                                }
                                {
                                    isAuthenticated &&
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="top-dropdown">
                                        <DropdownToggle caret>
                                            <img className="img-profile" src={user.profile_pic} alt="profile picture"/>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem><Badge>{ user.wallet.usable_amount } BTC</Badge></DropdownItem>
                                            <DropdownItem>Dashboard</DropdownItem>
                                            <DropdownItem onClick={this.logoutHandler}>Logout</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                }
                            </nav>
                        </div>
                    </header>

                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    setModal,
    logout
})(AppHeader));