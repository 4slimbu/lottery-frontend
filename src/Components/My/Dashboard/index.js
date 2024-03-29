import React, {Fragment} from 'react'
import {Link, withRouter} from "react-router-dom";
import {bitsToCoin, bitsToBtc, getTitleFromSlug} from "../../../utils/helper/helperFunctions";
import request from "../../../services/request";
import {MESSAGES} from "../../../constants/messages";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import LotteryNumberList from "../../AppCommon/LotteryNumberList";
import AnimatedSection from "../../AppCommon/AnimatedSection";

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
        const {user} = this.props.auth;
        const {wallet} = user;
        const {playedGames, transactions} = this.props.my;
        return (
            <Fragment>
                <AnimatedSection>
                    <div className="row">
                        <div className="col-md-4 mb-md-4">
                            <div className="card">
                                <div className="card-header">Free Games</div>
                                <div className="card-body">{ user && user.free_games }</div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-md-4">
                            <div className="card">
                                <div className="card-header">Deposit</div>
                                <div className="card-body">{ wallet && bitsToCoin(wallet.deposit) }</div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-md-4">
                            <div className="card">
                                <div className="card-header">Won</div>
                                <div className="card-body">{ wallet && bitsToBtc(wallet.won) }</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-md-4">
                            <div className="card responsive-width">
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
                                                                    Cell: props => (
                                                                        <div>
                                                                            <LotteryNumberList
                                                                                ulClass="number-in-column"
                                                                                numbers={props.original.lottery_number}
                                                                            />
                                                                        </div>
                                                                    )
                                                                },
                                                                {
                                                                    Header: 'Winning Number',
                                                                    accessor: 'result',
                                                                    Cell: props => (
                                                                        <div>
                                                                            <LotteryNumberList
                                                                                ulClass="number-in-column"
                                                                                numbers={props.original.lottery_slot.result}
                                                                            />
                                                                        </div>
                                                                    )
                                                                },
                                                                {
                                                                    Header: 'Won',
                                                                    accessor: 'won_amount',
                                                                    Cell: props => (
                                                                        <div>
                                                                            { bitsToBtc(props.original.won_amount) }
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
                            <div className="card responsive-width">
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
                                                                    accessor: 'type',
                                                                    Cell: props => (
                                                                        <div>{ getTitleFromSlug(props.original.type) }</div>
                                                                    )
                                                                },
                                                                {
                                                                    Header: 'Amount',
                                                                    accessor: 'amount',
                                                                    Cell: props => (
                                                                        <div>
                                                                            {
                                                                                props.original.deposit && props.original.deposit.amount && props.original.deposit.currency ?
                                                                                    parseFloat((props.original.deposit.amount * 1).toFixed(6)) + ' ' + props.original.deposit.currency
                                                                                    :
                                                                                    bitsToBtc(props.original.amount)

                                                                            }
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
                </AnimatedSection>
            </Fragment>
        )
    }
}

export default Dashboard;