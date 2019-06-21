import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import PropTypes from "prop-types";
import request from "../../../services/request";
import {MESSAGES} from "../../../constants/messages";
import {makeRequest} from "../../../actions/requestAction";
import {withRouter} from "react-router-dom";
import LotteryWinnerList from "../../AppCommon/LotteryWinnerList";

class Winners extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: true,
            winners: ["", "", "", "", "", "", "", "", "", ""]
        }
    }

    componentDidMount() {
        this.props.makeRequest(request.Lottery.slots.winners, {query: ''}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    console.log(res.data);
                    this.setState({
                        winners: res.data,
                        pages: res.meta.last_page,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        winners: [{}],
                        pages: 0,
                        isLoading: false,
                    });
                }
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );
    }

    render() {
        const {winners, isLoading} = this.state;
        return (
            <Fragment>
                <div className="winners-table card">
                    <h4 className="card-header">
                        Recent Winners
                    </h4>
                    <LotteryWinnerList winners={winners}/>
                    <div className="card-body">
                        <a href="#" className="card-link">View Past Winners</a>
                    </div>
                </div>
            </Fragment>
        )
    }

}

Winners.propTypes = {
    makeRequest: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest,
})(Winners));