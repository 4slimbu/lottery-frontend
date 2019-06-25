import React, {Fragment} from 'react'
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
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../actions/lotteryActions";
import {setCurrencies, setSettings} from "../../actions/appStatusAction";

class Home extends React.Component {
    constructor() {
        super();

    }

    componentDidMount() {
        this.bootstrap();
    }

    bootstrap() {
        // Get settings
        this.props.makeRequest(request.Settings.all, {query: ''}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setSettings(res.data);
                }
                this.setState({ isLoading: false });
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        // Get settings
        this.props.makeRequest(request.Currencies.all, {query: ''}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setCurrencies(res.data);
                }
                this.setState({ isLoading: false });
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        // Get Winners
        this.props.makeRequest(request.Lottery.slots.winners, {query: ''}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    console.log(res);
                    this.props.setLotteryWinners(res);
                    this.setState({
                        winners: res.data,
                        pages: res.meta.last_page,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        winners: [{}],
                        pages: 0,
                        isLoading: false,
                    });
                }
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        // Get Active Slot
        this.props.makeRequest(request.Lottery.slots.getActive, {}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setLotterySlot(res.data);
                    this.props.setLotteryPlayers(res.data.participants);
                }
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );
    }

    render() {
        const {slot, players, result} = this.props.lottery;
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
                                            <a href="https://commerce.coinbase.com/checkout/294e64a2-e757-4745-91c5-69f3a168abe7" className="btn btn-secondary">Deposit</a>
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
                                        <GameInfo slot={slot} result={result}/>
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
    makeRequest, setLotteryWinners, setLotterySlot, setLotteryPlayers, setSettings, setCurrencies
})(Home));