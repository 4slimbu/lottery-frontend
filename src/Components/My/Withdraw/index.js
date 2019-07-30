import React, {Component, Fragment} from 'react'
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
import {inCoin, inCurrency} from "../../../utils/helper/helperFunctions";
import {setUser} from "../../../actions/authActions";
import AnimatedSection from "../../AppCommon/AnimatedSection";

class Withdraw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            amount: "",
            error: "",
        };

        this.getWithdrawRequests = this.getWithdrawRequests.bind(this);
        this.cancelWithdrawRequest = this.cancelWithdrawRequest.bind(this);
        this.resetFields = this.resetFields.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleWithdraw = this.handleWithdraw.bind(this);
    }

    componentDidMount() {
        this.bootstrap();
    }

    bootstrap() {
        // Get Withdraw Requests
        this.setState({isLoading: true});
        this.getWithdrawRequests();
    }

    getWithdrawRequests() {
        this.props.makeRequest(request.Me.getWithdrawRequests, {}, {message: MESSAGES.LOGGING}).then(
            (res) => { if (res.data) { this.props.setWithdrawRequests(res); this.setState({isLoading: false}); } },
            (errorData) => {}
        );
    }

    getUserInfo() {
        this.props.makeRequest(request.Me.get, {}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                this.props.setUser(res.data);
                this.setState({ isLoading: false });
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );
    }

    cancelWithdrawRequest(id) {
        this.props.makeRequest(request.Me.cancelWithdrawRequest, {id: id}, {message: MESSAGES.LOGGING}).then(
            (res) => { if (res.data) { this.getWithdrawRequests(); this.setState({isLoading: false}); } },
            (errorData) => {}
        );
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleWithdraw(e) {
        e.preventDefault();

        const {wallet} = this.props.auth.user;
        if (this.state.amount <= 0) {
            this.setState({
                error: "Please enter valid amount"
            });
            return;
        }

        if (inCoin(this.state.amount, false) > wallet.won) {
            this.setState({
                error: "Amount cannot be greater than available balance"
            });
            return;
        }

        const data = {
            amount: inCoin(this.state.amount, false)
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Me.createWithdrawRequest, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.getUserInfo();
                this.getWithdrawRequests();
                this.resetFields();
                this.setState({isLoading: false});
            },
            (errorData) => {
                this.resetFields();
                this.setState({error: errorData.message});
                this.setState({isLoading: false});
            }
        );
    }

    resetFields() {
        this.setState({
            amount: "",
            error: ""
        })
    }

    render() {
        const {withdrawRequests} = this.props.my;
        const {wallet} = this.props.auth.user;
        return (
            <Fragment>
                <AnimatedSection>
                    <div className="row">
                        <div className="col-md-12 mb-md-4">
                            <div className="card">
                                <div className="card-header">Withdraw</div>
                                <div className="card-body">
                                    <p>Available Balance: <strong>{wallet && inCurrency(wallet.won)}</strong></p>
                                    <form className="withdraw-form" onSubmit={this.handleWithdraw}>
                                        <div className="input-group">
                                            <input name="amount" type="text" className="form-control" placeholder="0.00"
                                                   onChange={this.handleChange}
                                                   value={this.state.amount}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">BTC</span>
                                            </div>
                                        </div>
                                        <div>
                                            { this.state.error && <span className="text text-danger">{ this.state.error }</span>}
                                        </div>
                                        <div className="btn-group">
                                            <button className="btn btn-primary btn-black">Withdraw</button>
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
                                                    {
                                                        Header: 'Action',
                                                        accessor: 'action',
                                                        Cell: props => (
                                                            <div>
                                                                {
                                                                    props.original.status === 'pending' &&
                                                                    <button onClick={() => this.cancelWithdrawRequest(props.original.id)}>Cancel</button>
                                                                }
                                                            </div>
                                                        )
                                                    },
                                                ]
                                            },
                                        ]}
                                        defaultPageSize={10}
                                        showPagination={true}
                                        className="-striped -highlight"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
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
    setWithdrawRequests, setUser
})(Withdraw));