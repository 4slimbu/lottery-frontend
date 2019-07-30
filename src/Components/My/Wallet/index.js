import React, {Component, Fragment} from 'react'
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../actions/requestAction";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../../actions/lotteryActions";
import {setCurrencies, setSettings} from "../../../actions/appStatusAction";
import {inAppCoin, inCurrency} from "../../../utils/helper/helperFunctions";
import AnimatedSection from "../../AppCommon/AnimatedSection";

class Wallet extends Component {

    render() {
        const {user} = this.props.auth;
        const {wallet} = user;
        return (
            <Fragment>
                <AnimatedSection>
                    <div className="row">
                        <div className="col-md-4 mb-md-4">
                            <div className="card">
                                <div className="card-header">Pending Withdraw</div>
                                <div className="card-body">{ inCurrency(wallet && wallet.pending_withdraw) }</div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-md-4">
                            <div className="card">
                                <div className="card-header">Deposit</div>
                                <div className="card-body">{ wallet && inAppCoin(wallet.deposit) }</div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-md-4">
                            <div className="card">
                                <div className="card-header">Won</div>
                                <div className="card-body">{ wallet && inCurrency(wallet.won) }</div>
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
                                        <li className="list-group-item"><strong>Pending Withdraw: </strong> { wallet.pending_withdraw }</li>
                                        <li className="list-group-item"><strong>Deposit: </strong> { inCurrency(wallet.deposit) }</li>
                                        <li className="list-group-item"><strong>Won: </strong> { inCurrency(wallet.won) }</li>
                                        <li className="list-group-item"><strong>Created on: </strong> { wallet.created_at }</li>
                                        <li className="list-group-item"><strong>Last Updated on: </strong> { wallet.updated_at }</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
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