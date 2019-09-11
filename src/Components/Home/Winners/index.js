import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {makeRequest} from "../../../actions/requestAction";
import {NavLink, withRouter} from "react-router-dom";
import LotteryWinnerList from "../../AppCommon/LotteryWinnerList";

class Winners extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: true,
            winners: []
        }
    }

    render() {
        const {winners} = this.props.lottery;
        return (
            <Fragment>
                <div className="winners-table card">
                    <h4 className="card-header">
                        Recent Winners
                    </h4>
                    <LotteryWinnerList winners={winners.data}/>
                    <div className="card-body">
                        <NavLink exact={true} className='card-link'
                                 to='/winners'>View Past Winners</NavLink>
                    </div>
                </div>
            </Fragment>
        )
    }

}

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