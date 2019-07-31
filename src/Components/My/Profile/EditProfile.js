import React, {Component, Fragment} from 'react'
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../actions/requestAction";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../../actions/lotteryActions";
import {setCurrencies, setSettings} from "../../../actions/appStatusAction";
import AnimatedSection from "../../AppCommon/AnimatedSection";

class EditProfile extends Component {

    render() {
        const {user} = this.props.auth;
        return (
            <Fragment>
                <AnimatedSection>
                    <div className="row">
                        <div className="col-md-12 mb-md-4">
                            <div className="card my-profile">
                                <div className="card-header">Edit Profile</div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
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
    makeRequest, setLotteryWinners, setLotterySlot, setLotteryPlayers, setSettings, setCurrencies, setLastSlot
})(EditProfile));