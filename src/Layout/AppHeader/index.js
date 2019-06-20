import React, {Fragment} from 'react';

import {connect} from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Header extends React.Component {
    render() {
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
                                <ul className="nav-items-link">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Login </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Register </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </header>

                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);