import React, {Component, Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AppHeader from "../../Layout/AppHeader/index";
import AppFooter from "../../Layout/AppFooter/index";
import AppLogo from "../AppCommon/AppLogo";
import PrizePool from "../AppCommon/PrizePool";
import DepositButton from "../AppCommon/DepositButton";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../actions/lotteryActions";
import {
    addToRootCssClassList, removeFromRootCssClassList, setCurrencies, setModal,
    setSettings
} from "../../actions/appStatusAction";
import {withRouter} from "react-router-dom";
import {setPage} from "../../actions/pageActions";
import {setPlayedGames, setTransactions} from "../../actions/myActions";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav} from "reactstrap";
import {logout} from "../../actions/authActions";
import MetaTags from "../AppCommon/MetaTags";

const withLayout = (PassedComponent) => {
    class WithLayout extends Component {
        constructor(props) {
            super(props);

            this.state = {
                authNavDropdownOpen: false
            };

            this.showLoginModal = this.showLoginModal.bind(this);
            this.showRegisterModal = this.showRegisterModal.bind(this);
            this.logoutHandler = this.logoutHandler.bind(this);
            this.toggleAuthNav = this.toggleAuthNav.bind(this);
            this.playLottery = this.playLottery.bind(this);
        }

        playLottery() {
            this.props.addToRootCssClassList("focus-on");

            this.props.history.push('/');

            setTimeout(function() {
                this.props.removeFromRootCssClassList("focus-on");
            }.bind(this), 2000)
        }

        showLoginModal() {
            this.props.setModal("login");
        }

        showRegisterModal() {
            this.props.setModal("register");
        }

        logoutHandler() {
            const {logout, history, auth} = this.props;

            window.Echo.leaveChannel('private-App.User.' + auth.user.id);
            logout();
        }

        toggleAuthNav() {
            this.setState(prevState => ({
                authNavDropdownOpen: !prevState.authNavDropdownOpen
            }));
        }

        render() {
            const {slot} = this.props.lottery;
            const {isAuthenticated, user} = this.props.auth;
            const lotterySlotAmount = slot && slot.total_amount;
            return (
                <Fragment>
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="TabsAnimation"
                        transitionAppear={true}
                        transitionAppearTimeout={0}
                        transitionEnter={false}
                        transitionLeave={false}>
                        {/*<AppHeader/>*/}
                        <MetaTags/>
                        <section className="main focus-in">
                            <div className="section-top">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-5 col-lg-4">
                                            <AppLogo/>
                                        </div>
                                        <div className="col-sm-12 col-md-7 col-lg-5">
                                            <PrizePool amount={lotterySlotAmount}/>
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-3">
                                            <div className="buttons">
                                                <DepositButton/>
                                                {
                                                    ! isAuthenticated &&
                                                    <button onClick={this.showLoginModal} className="btn btn-primary">Sign In</button>
                                                }
                                                {
                                                    isAuthenticated &&
                                                    <Nav>
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
                                                    </Nav>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*-------------Start: Passed Component---------------*/}
                            <PassedComponent
                                {...this.props}
                                playLottery={this.playLottery}
                            />
                            {/*-------------End: Passed Component---------------*/}
                        </section>

                        <AppFooter/>

                    </ReactCSSTransitionGroup>
                </Fragment>
            )
        }
    }

    const mapStateToProps = state => {
        return {
            auth: state.authReducer,
            appStatus: state.appStatusReducer,
            lottery: state.lotteryReducer,
            my: state.myReducer,
            page: state.pageReducer
        }
    };

    const mapDispatchToProps = {
        makeRequest,
        setLotteryWinners,
        setLotterySlot,
        setLotteryPlayers,
        setSettings,
        setCurrencies,
        setLastSlot,
        setModal,
        setPage,
        setTransactions,
        setPlayedGames,
        addToRootCssClassList,
        removeFromRootCssClassList,
        logout
    };

    return  withRouter(connect(mapStateToProps, mapDispatchToProps)(WithLayout));
};


export default withLayout;