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
import LotteryNumberList from "../../AppCommon/LotteryNumberList";

class PlayedGames extends Component {

    render() {
        const {playedGames} = this.props.my;
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
                                    <div className="card-header">Played Games</div>
                                    <div className="card-body">
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
                                                                                    <LotteryNumberList
                                                                                        ulClass="number-in-column"
                                                                                        numbers={props.original.lottery_slot.result}
                                                                                        handleClick={this.handleNumberClick}
                                                                                    />
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
                                                            defaultPageSize={15}
                                                            showPagination={true}
                                                            className="-striped -highlight"
                                                        />
                                                    </div>
                                                </div>
                                                :
                                                <div className="card-body">You have not played any games.</div>
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

PlayedGames.propTypes = {
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
})(PlayedGames));