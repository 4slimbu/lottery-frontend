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

const withForm = (PassedComponent) => {
    class WithForm extends Component {
        constructor(props) {
            super(props);

            this.playLottery = this.playLottery.bind(this);
        }

        playLottery() {
            this.props.addToRootCssClassList("focus-on");

            this.props.history.push('/');

            setTimeout(function() {
                this.props.removeFromRootCssClassList("focus-on");
            }.bind(this), 2000)
        }

        render() {
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
                                                <button onClick={this.playLottery} className="btn btn-primary">Let's play</button>
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
        removeFromRootCssClassList
    };

    return  withRouter(connect(mapStateToProps, mapDispatchToProps)(WithForm));
};


export default withForm;