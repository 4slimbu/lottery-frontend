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
    constructor(props) {
        super(props);

        this.state = {
            path: "/my/profile"
        };

    }

    componentDidMount() {
        this.setState({
            path: this.props.match.path
        });
    }

    render() {
        const {path} = this.state;
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
                                {path === "/my/profile/edit" && <EditProfile {...this.props}/>}
                                {path === "/my/profile" && <ViewProfile {...this.props}/>}
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