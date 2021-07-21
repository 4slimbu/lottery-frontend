import React, {Component, Fragment} from 'react';

import {connect} from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {setModal} from "../../actions/appStatusAction";
import {logout} from "../../actions/authActions";
import {Link, withRouter} from "react-router-dom";
import {
    Collapse,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNavDropdownOpen: false,
            authNavDropdownOpen: false
        };

        this.showLoginModal = this.showLoginModal.bind(this);
        this.showRegisterModal = this.showRegisterModal.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.toggleAuthNav = this.toggleAuthNav.bind(this);
        this.togglePageNav = this.togglePageNav.bind(this);
        this.navigate = this.navigate.bind(this);

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

    toggleAuthNav() {
        this.setState(prevState => ({
            authNavDropdownOpen: !prevState.authNavDropdownOpen
        }));
    }

    togglePageNav() {
        this.setState(prevState => ({
            pageNavDropdownOpen: !prevState.pageNavDropdownOpen
        }));
    }

    navigate(to) {
        this.props.history.push(to);
        this.setState({
            pageNavDropdownOpen: false
        })
    }

    render() {
        const {pageNavDropdownOpen} = this.state;
        const {isAuthenticated, user} = this.props.auth;
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
                        <div className="container nav-container">
                            <Navbar expand="md" className="">
                                <NavbarToggler onClick={this.togglePageNav}>
                                    <FontAwesomeIcon icon={faBars}/>
                                </NavbarToggler>
                                <Collapse isOpen={pageNavDropdownOpen} navbar>
                                    <Nav className="mr-auto" navbar>
                                        <NavItem>
                                            <Link onClick={() => this.navigate("/about")} className="nav-link" to={"/about"}>About </Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link onClick={() => this.navigate("/faq")} className="nav-link" to={"/faq"}>Faq </Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link onClick={() => this.navigate("/contact")} className="nav-link" to={"/contact"}>Contact </Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link onClick={() => this.navigate("/winners")} className="nav-link" to={"/winners"}>Winners</Link>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                            <Nav>
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
                                    <Dropdown isOpen={this.state.authNavDropdownOpen} toggle={this.toggleAuthNav} className="top-dropdown">
                                        <DropdownToggle caret>
                                            <img className="img-profile" src={user.profile_pic} alt="profile picture"/>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => this.props.history.push("/my/dashboard")}>Dashboard</DropdownItem>
                                            <DropdownItem onClick={() => this.props.history.push("/my/profile")}>My Profile</DropdownItem>
                                            <DropdownItem onClick={this.logoutHandler}>Logout</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                }
                            </Nav>
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