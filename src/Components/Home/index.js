import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import Header from "../../Layout/AppHeader";
import Footer from "../../Layout/AppFooter";
import AppLogo from "../../Components/AppCommon/AppLogo";
import PrizePool from "./PrizePool";
import Winners from "./Winners";
import LotteryPicker from "./LotteryPicker";
import RunningGame from "./RunningGame";
import Participants from "./Participants";

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Header/>

                    <section className="main">
                        <div className="section-top">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-5 col-lg-4">
                                        <AppLogo/>
                                    </div>
                                    <div className="col-sm-12 col-md-7 col-lg-5">
                                        <PrizePool/>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-3">
                                        <div className="buttons">
                                            <a href="#" className="btn btn-secondary">Deposit</a>
                                            <a href="#" className="btn btn-primary">Let's play</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-bottom">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-5 col-lg-4">
                                        <Winners/>
                                    </div>
                                    <div className="col-sm-12 col-md-7 col-lg-5">
                                        <LotteryPicker/>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-3">
                                        <RunningGame/>
                                        <Participants/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Footer/>

                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

Home.propTypes = {
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
})(Home));