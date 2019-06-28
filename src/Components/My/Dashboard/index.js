import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../actions/requestAction";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../../actions/lotteryActions";
import {setCurrencies, setSettings} from "../../../actions/appStatusAction";

class Dashboard extends React.Component {

    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <div className="row">
                            <div className="col-md-4 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Deposit</div>
                                    <div className="card-body">3000BTC</div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Won</div>
                                    <div className="card-body">100BTC</div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Withdrawable</div>
                                    <div className="card-body">100BTC</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Latest Played Games</div>
                                    <div className="card-body">You haven't played any games</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Latest Transactions</div>
                                    <div className="card-body">You have not made any transactions</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

Dashboard.propTypes = {
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
    makeRequest, setLotteryWinners, setLotterySlot, setLotteryPlayers, setSettings, setCurrencies, setLastSlot
})(Dashboard));