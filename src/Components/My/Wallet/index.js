import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../actions/requestAction";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../../actions/lotteryActions";
import {setCurrencies, setSettings} from "../../../actions/appStatusAction";
import {inCurrency} from "../../../utils/helper/helperFunctions";

class Wallet extends React.Component {

    render() {
        const {user} = this.props.auth;
        const {wallet} = user;
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
                                    <div className="card-header">Usable Amount</div>
                                    <div className="card-body">{ inCurrency(wallet.usable_amount) }</div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Withdrawable Amount</div>
                                    <div className="card-body">{ inCurrency(wallet.withdrawable_amount) }</div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Total Amount</div>
                                    <div className="card-body">{ inCurrency(wallet.total_amount) }</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Wallet Info</div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><strong>ID: </strong> { wallet.id}</li>
                                            <li className="list-group-item"><strong>Owner: </strong> { user.full_name }</li>
                                            <li className="list-group-item"><strong>Withdrawable Amount: </strong> { inCurrency(wallet.withdrawable_amount) }</li>
                                            <li className="list-group-item"><strong>Pending Withdraw Amount: </strong> { inCurrency(wallet.pending_withdraw_amount) }</li>
                                            <li className="list-group-item"><strong>Usable Amount: </strong> { inCurrency(wallet.usable_amount) }</li>
                                            <li className="list-group-item"><strong>Total Amount: </strong> { inCurrency(wallet.total_amount) }</li>
                                            <li className="list-group-item"><strong>Created on: </strong> { wallet.created_at }</li>
                                            <li className="list-group-item"><strong>Last Updated on: </strong> { wallet.updated_at }</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

Wallet.propTypes = {
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
})(Wallet));