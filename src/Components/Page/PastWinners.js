import React, {Fragment} from 'react'
import {withRouter} from "react-router-dom";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import AnimatedSection from "../AppCommon/AnimatedSection";
import {inCurrency} from "../../utils/helper/helperFunctions";
import LotteryNumberList from "../AppCommon/LotteryNumberList";

class PastWinners extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pages: 1,
            perPage: 10,
            reactTableState: {},
            isLoading: false
        };

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(state, instance = null) {
        let query = "";
        this.setState({reactTableState: state});

        //If fetchData is already running, return
        if (this.state.isLoading) {
            return;
        }

        // Go to page
        if (state.page) {
            query += "&page=" + (state.page + 1);
        }

        // Sorting
        if (state.sorted.length > 0) {
            query += "&orderBy=" + state.sorted[0].id;
            query += "&ascending=" + (state.sorted[0].desc ? "false" : "true");
        }

        // Limit
        if (state.pageSize) {
            query += "&limit=" + state.pageSize;
        }

        // if filter is on and doesn't have at least 2 characters, abort
        if (state.filtered.length > 0 && state.filtered[0].value.length < 2) {
            return;
        }

        // filter only after having at least 2 characters
        if (state.filtered.length > 0 && state.filtered[0].value.length > 1) {
            query += "&" + state.filtered[0].id + "=" + state.filtered[0].value
        }

        // Start loading indicator and call api
        this.setState({isLoading: true});

        this.props.makeRequest(request.Lottery.slots.winners, {query: query}, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                if (responseData.data) {
                    this.setState({
                        data: responseData.data,
                        pages: responseData.meta.last_page,
                        isLoading: false,
                        selectedIds: []
                    });
                } else {
                    this.setState({
                        data: [],
                        pages: 0,
                        isLoading: false,
                        selectedIds: []
                    });
                }
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );
    }

    render() {
        const {data, pages, isLoading} = this.state;
        return (
            <Fragment>
                <AnimatedSection>
                    <div className="section-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="inner-content-wrap  responsive-width">
                                        <h2>Past Winners</h2>
                                        <div className="content">
                                            {
                                               data ?
                                                    <div className="content">
                                                        <ReactTable
                                                            data={data}
                                                            columns={[
                                                                {
                                                                    columns: [
                                                                        {
                                                                            Header: 'Name',
                                                                            accessor: 'full_name'
                                                                        },
                                                                        {
                                                                            Header: 'Lottery Number',
                                                                            accessor: 'lottery_number',
                                                                            Cell: props => (
                                                                                <div className="d-block w-100 text-center">
                                                                                    <LotteryNumberList
                                                                                        ulClass="number-in-column"
                                                                                        numbers={props.original.lottery_number}
                                                                                    />
                                                                                </div>
                                                                            ),
                                                                        },
                                                                        {
                                                                            Header: 'Won Amount',
                                                                            accessor: 'won_amount',
                                                                            Cell: props => (
                                                                                <div className="d-block w-100 text-center">
                                                                                    { inCurrency(props.original.won_amount * 1 + props.original.service_charge * 1)}
                                                                                </div>
                                                                            ),
                                                                        },
                                                                        {
                                                                            Header: 'Date',
                                                                            accessor: 'updated_at',
                                                                        },
                                                                    ]
                                                                },
                                                            ]}
                                                            defaultPageSize={15}
                                                            showPagination={true}
                                                            className="-striped -highlight"
                                                            manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                                                            pages={pages} // Display the total number of pages
                                                            loading={isLoading} // Display the loading overlay when we need it
                                                            onFetchData={this.fetchData} // Request new data when things change
                                                            filterable={false}
                                                            sortable={false}
                                                        />
                                                    </div>
                                                    :
                                                    <div className="card-body">Winners not found.</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </Fragment>
        )
    }
}

export default PastWinners;