import React, {Component, Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import AppHeader from "../../Layout/AppHeader";
import AppFooter from "../../Layout/AppFooter";
import AppLogo from "../../Components/AppCommon/AppLogo";
import PrizePool from "../../Components/AppCommon/PrizePool";
import Winners from "./Winners";
import LotteryPicker from "./LotteryPicker";
import GameInfo from "../../Components/AppCommon/GameInfo";
import Players from "./Players";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../actions/lotteryActions";
import {setCurrencies, setModal, setSettings} from "../../actions/appStatusAction";
import DepositButton from "../AppCommon/DepositButton";

class Home extends Component {

    render() {
        const {slot, players} = this.props.lottery;
        const lotterySlotAmount = slot && slot.total_amount;
        const lotterySlotParticipantsCount = slot && slot.total_participants;
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
                                        <PrizePool amount={lotterySlotAmount}/>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-3">
                                        <div className="buttons">
                                            <DepositButton/>
                                            <a href="#" className="btn btn-primary">Let's play</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-bottom">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-5 col-lg-4">
                                        <Winners/>
                                    </div>
                                    <div className="col-sm-12 col-md-7 col-lg-5">
                                        <LotteryPicker/>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-3">
                                        <GameInfo lottery={this.props.lottery} auth={this.props.auth}/>
                                        <Players players={players.data} total={lotterySlotParticipantsCount}/>
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

Home.propTypes = {
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
})(Home));