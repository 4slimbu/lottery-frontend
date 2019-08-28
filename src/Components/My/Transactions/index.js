import React, {Component, Fragment} from 'react'
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../actions/requestAction";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../../actions/lotteryActions";
import {setCurrencies, setSettings} from "../../../actions/appStatusAction";
import ReactTable from "react-table";
import {inCurrency} from "../../../utils/helper/helperFunctions";
import AnimatedSection from "../../AppCommon/AnimatedSection";

class Transactions extends Component {

    render() {
        const {transactions} = this.props.my;
        return (
            <Fragment>
                <AnimatedSection>
                    <div className="row">
                        <div className="col-md-12 mb-md-4">
                            <div className="card">
                                <div className="card-header">Transactions</div>
                                <div className="card-body">
                                    {
                                        transactions && transactions.data ?
                                            <div>
                                                <div className="card-body custom-padding">
                                                    <ReactTable
                                                        data={transactions.data}
                                                        columns={[
                                                            {
                                                                columns: [
                                                                    
                                                                    {
                                                                        Header: 'Date',
                                                                        accessor: 'updated_at'
                                                                    },
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
                </AnimatedSection>
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