import React, {Component, Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../actions/requestAction";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../../actions/lotteryActions";
import {setCurrencies, setSettings} from "../../../actions/appStatusAction";
import ReactTable from "react-table";
import {inCurrency} from "../../../utils/helper/helperFunctions";

class Transactions extends Component {

    render() {
        const {transactions} = this.props.my;
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
                                    <div className="card-header">Transactions</div>
                                    <div className="card-body">
                                        {
                                            transactions && transactions.data ?
                                                <div>
                                                    <div className="card-body">
                                                        <ReactTable
                                                            data={transactions.data}
                                                            columns={[
                                                                {
                                                                    columns: [
                                                                        {
                                                                            Header: 'Transaction Code',
                                                                            accessor: 'transaction_code',
                                                                        },
                                                                        {
                                                                            Header: 'Type',
                                                                            accessor: 'type'
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
                                                                            Header: 'Date',
                                                                            accessor: 'updated_at'
                                                                        }
                                                                    ]
                                                                },
                                                            ]}
                                                            defaultPageSize={15}
                                                            showPagination={true}
                                                            className="-striped -highlight"
                                                        />
                                                    </div>
                                                </div>
                                                :
                                                <div className="card-body">You have not made any transactions.</div>
                                        }
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

Transactions.propTypes = {
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
    makeRequest, setLotteryWinners, setLotterySlot, setLotteryPlayers, setSettings, setCurrencies, setLastSlot
})(Transactions));