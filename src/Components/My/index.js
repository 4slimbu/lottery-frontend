import React, {Component, Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {NavLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import AppHeader from "../../Layout/AppHeader";
import AppFooter from "../../Layout/AppFooter";
import AppLogo from "../../Components/AppCommon/AppLogo";
import PrizePool from "../../Components/AppCommon/PrizePool";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../actions/lotteryActions";
import {setCurrencies, setModal, setSettings} from "../../actions/appStatusAction";
import {Nav} from "reactstrap";
import Dashboard from "./Dashboard";
import Wallet from "./Wallet";
import Transactions from "./Transactions";
import Withdraw from "./Withdraw";
import PlayedGames from "./PlayedGames";
import Profile from "./Profile";
import DepositButton from "../AppCommon/DepositButton";

class My extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: "/my/dashboard"
        };

        this.playLottery = this.playLottery.bind(this);
    }

    componentDidMount() {
        this.setState({
            path: this.props.match.path
        });
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
        // Return to root url when unauthenticated
        const {isAuthenticated} = this.props.auth;

        if (! isAuthenticated ) {
            this.props.history.push('/');
        }

        // Proceed as usual
        const {path} = this.state;
        const {slot} = this.props.lottery;
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
                    <AppHeader/>

                    <section className="main">
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
                                    <div className="col-sm-12 col-md-4 col-lg-3">
                                        <div className="winners-table dashboard-wrap card">
                                            <div className="card-header">Menu</div>
                                            <div className="card-body">
                                                <Nav className="my-menu">
                                                    <NavLink exact={true} activeClassName='is-active'
                                                             to='/my/dashboard'>Dashbaord</NavLink>
                                                    <NavLink exact={true} activeClassName='is-active' to='/my/profile'>profile</NavLink>
                                                    <NavLink exact={true} activeClassName='is-active' to='/my/wallet'>Wallet</NavLink>
                                                    <NavLink exact={true} activeClassName='is-active'
                                                             to='/my/transactions'>Transactions</NavLink>
                                                    <NavLink exact={true} activeClassName='is-active'
                                                             to='/my/played-games'>Played Games</NavLink>
                                                    <NavLink exact={true} activeClassName='is-active' to='/my/withdraw'>Withdraw</NavLink>
                                                </Nav>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-8 col-lg-9">
                                        {path === "/my/dashboard" && <Dashboard/>}
                                        {path === "/my/wallet" && <Wallet/>}
                                        {path === "/my/transactions" && <Transactions/>}
                                        {path === "/my/withdraw" && <Withdraw/>}
                                        {path === "/my/played-games" && <PlayedGames/>}
                                        {path === "/my/profile" && <Profile/>}
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

My.propTypes = {
    makeRequest: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer,
        lottery: state.lotteryReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest, setLotteryWinners, setLotterySlot, setLotteryPlayers, setSettings, setCurrencies, setLastSlot, setModal
})(My));