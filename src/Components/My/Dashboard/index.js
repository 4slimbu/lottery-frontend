import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../actions/requestAction";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../../actions/lotteryActions";
import {setCurrencies, setSettings} from "../../../actions/appStatusAction";
import {inCurrency} from "../../../utils/helper/helperFunctions";
import request from "../../../services/request";
import {MESSAGES} from "../../../constants/messages";
import {setPlayedGames, setTransactions} from "../../../actions/myActions";
import ReactTable from "react-table";
import 'react-table/react-table.css'

class Dashboard extends React.Component {
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
        // Get Played Games
        this.setState({isLoading: true});
        this.props.makeRequest(request.Me.getPlayedGames, {}, {message: MESSAGES.LOGGING}).then(
            (res) => { if (res.data) { this.props.setPlayedGames(res); this.setState({isLoading: false}); } },
            (errorData) => {}
        );
        // Get Transactions
        this.setState({isLoading: true});
        this.props.makeRequest(request.Me.getTransactions, {}, {message: MESSAGES.LOGGING}).then(
            (res) => { if (res.data) { this.props.setTransactions(res); this.setState({isLoading: false}); } },
            (errorData) => {}
        );
    }

    render() {
        const {isLoading} = this.state;
        const {wallet} = this.props.auth.user;
        const {playedGames, transactions} = this.props.my;
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
                                    <div className="card-body">{ wallet && inCurrency(wallet.usable_amount) }</div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Withdrawable Amount</div>
                                    <div className="card-body">{ wallet && inCurrency(wallet.withdrawable_amount) }</div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Total Amount</div>
                                    <div className="card-body">{ wallet && inCurrency(wallet.total_amount) }</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Latest Played Games</div>
                                    {
                                        playedGames && playedGames.data ?
                                            <div>
                                                <div className="card-body">
                                                    <ReactTable
                                                        data={playedGames.data}
                                                        columns={[
                                                            {
                                                                columns: [
                                                                    {
                                                                        Header: 'Slot Ref',
                                                                        accessor: 'slot_ref',
                                                                        Cell: props => (
                                                                            <div>
                                                                                { props.original.lottery_slot.slot_ref }
                                                                            </div>
                                                                        )
                                                                    },
                                                                    {
                                                                        Header: 'Lottery Number',
                                                                        accessor: 'lottery_number'
                                                                    },
                                                                    {
                                                                        Header: 'Result',
                                                                        accessor: 'result',
                                                                        Cell: props => (
                                                                            <div>
                                                                                { props.original.lottery_slot.result }
                                                                            </div>
                                                                        )
                                                                    },
                                                                    {
                                                                        Header: 'Won',
                                                                        accessor: 'won_amount',
                                                                        Cell: props => (
                                                                            <div>
                                                                                { inCurrency(props.original.won_amount) }
                                                                            </div>
                                                                        )
                                                                    }
                                                                ]
                                                            },
                                                        ]}
                                                        defaultPageSize={5}
                                                        showPagination={false}
                                                        className="-striped -highlight"
                                                    />
                                                </div>
                                                <div className="card-footer">
                                                    <div className="text-center">
                                                        <Link to="/my/played-games">View all</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="card-body">You have not played any games.</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-md-4">
                                <div className="card">
                                    <div className="card-header">Latest Transactions</div>
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
                                                        defaultPageSize={5}
                                                        showPagination={false}
                                                        className="-striped -highlight"
                                                    />
                                                </div>
                                                <div className="card-footer">
                                                    <div className="text-center">
                                                        <Link to="/my/transactions">View all</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="card-body">You have not made any transactions.</div>
                                    }
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
        lottery: state.lotteryReducer,
        my: state.myReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest, setLotteryWinners, setLotterySlot, setLotteryPlayers, setSettings, setCurrencies, setLastSlot,
    setPlayedGames, setTransactions
})(Dashboard));