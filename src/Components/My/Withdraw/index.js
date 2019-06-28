import React, {Component, Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../actions/requestAction";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../../actions/lotteryActions";
import {setCurrencies, setSettings} from "../../../actions/appStatusAction";
import request from "../../../services/request";
import {MESSAGES} from "../../../constants/messages";
import {setWithdrawRequests} from "../../../actions/myActions";
import ReactTable from "react-table";
import {inCurrency} from "../../../utils/helper/helperFunctions";

class Withdraw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        this.bootstrap();
    }

    bootstrap() {
        // Get Withdraw Requests
        this.setState({isLoading: true});
        this.props.makeRequest(request.Me.getWithdrawRequests, {}, {message: MESSAGES.LOGGING}).then(
            (res) => { if (res.data) { this.props.setWithdrawRequests(res); this.setState({isLoading: false}); } },
            (errorData) => {}
        );
    }

    render() {
        const {withdrawRequests} = this.props.my;
        const {wallet} = this.props.auth.user;
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
                            <div className="col-md-12 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Withdraw</div>
                                    <div className="card-body">
                                        <p>Withdrawable Amount: <strong>{wallet && inCurrency(wallet.withdrawable_amount)}</strong></p>
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="amount">Withdraw Amount:</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">BTC</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="btn-group">
                                                <button className="btn btn-primary">Withdraw</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Withdraw Requests</div>
                                    <div className="card-body">
                                        <ReactTable
                                            data={withdrawRequests.data}
                                            columns={[
                                                {
                                                    columns: [
                                                        {
                                                            Header: 'Created On',
                                                            accessor: 'created_at',
                                                        },
                                                        {
                                                            Header: 'Amount',
                                                            accessor: 'amount',
                                                            Cell: props => (
                                                                <div>
                                                                    { inCurrency(props.original.amount) }
                                                                </div>
                                                            )
                                                        },
                                                        {
                                                            Header: 'Status',
                                                            accessor: 'status'
                                                        },
                                                    ]
                                                },
                                            ]}
                                            defaultPageSize={5}
                                            showPagination={false}
                                            className="-striped -highlight"
                                        />
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

Withdraw.propTypes = {
    makeRequest: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer,
        my: state.myReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest, setLotteryWinners, setLotterySlot, setLotteryPlayers, setSettings, setCurrencies, setLastSlot,
    setWithdrawRequests
})(Withdraw));