import React, {Component, Fragment, Suspense} from 'react'
import {Link, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../actions/requestAction";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../../actions/lotteryActions";
import {setCurrencies, setSettings} from "../../../actions/appStatusAction";
import AnimatedSection from "../../AppCommon/AnimatedSection";
import Loader from 'react-loaders';
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";

class Profile extends Component {
    render() {
        return (
            <Fragment>
                <AnimatedSection>
                    <div className="row">
                        <div className="col-md-12 mb-md-4">
                            <Suspense fallback={
                                <div className="loader-container">
                                    <div className="loader-container-inner">
                                        <div className="text-center">
                                            <Loader type="ball-grid-beat"/>
                                        </div>
                                    </div>
                                </div>
                            }>
                                <Route path={`/my/profile`} render={() => <ViewProfile {...this.props}/>}/>
                                <Route path={`/my/profile/edit`} render={() => <EditProfile {...this.props}/>}/>
                            </Suspense>
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
})(Profile));