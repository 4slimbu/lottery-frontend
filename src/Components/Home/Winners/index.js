import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import PropTypes from "prop-types";
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

    render() {
        const {isLoading} = this.state;
        const {winners} = this.props.lottery;
        return (
            <Fragment>
                <div className="winners-table card">
                    <h4 className="card-header">
                        Recent Winners
                    </h4>
                    <LotteryWinnerList winners={winners.data}/>
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
        appStatus: state.appStatusReducer,
        lottery: state.lotteryReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest,
})(Winners));