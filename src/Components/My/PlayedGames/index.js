import React, {Component, Fragment} from 'react';
import ReactTable from "react-table";
import {inCurrency} from "../../../utils/helper/helperFunctions";
import LotteryNumberList from "../../AppCommon/LotteryNumberList";
import AnimatedSection from "../../AppCommon/AnimatedSection";

class PlayedGames extends Component {

    render() {
        const {playedGames} = this.props.my;
        return (
            <Fragment>
                <AnimatedSection>
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
                                                                        accessor: 'lottery_number',
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
                                                                                { props.original.won_amount && "Winner "} ({ inCurrency(props.original.won_amount) })
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
                </AnimatedSection>
            </Fragment>
        )
    }
}


export default PlayedGames;