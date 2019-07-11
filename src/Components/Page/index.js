import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import 'react-table/react-table.css'
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {makeRequest} from "../../actions/requestAction";

import AppHeader from "../../Layout/AppHeader";
import AppFooter from "../../Layout/AppFooter";
import AppLogo from "../AppCommon/AppLogo";
import PrizePool from "../AppCommon/PrizePool";
import DepositButton from "../AppCommon/DepositButton";

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        this.bootstrap();
    }

    bootstrap() {
        // Get Played Games
        this.setState({isLoading: true});
        this.props.makeRequest(request.Me.getPlayedGames, {}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setPlayedGames(res);
                    this.setState({isLoading: false});
                }
            },
            (errorData) => {
            }
        );
    }

    render() {
        const {isLoading} = this.state;
        const {user} = this.props.auth;
        const {wallet} = user;
        const {playedGames, transactions} = this.props.my;
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <AppHeader/>

                    <section className="main">
                        <div className="section-top">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-5 col-lg-4">
                                        <AppLogo/>
                                    </div>
                                    <div className="col-sm-12 col-md-7 col-lg-5">
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-3">
                                        <div className="buttons">
                                            <DepositButton/>
                                            <button onClick={this.playLottery} className="btn btn-primary">Let's play
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-bottom">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        Hello test
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <AppFooter/>

                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

Page.propTypes = {
    makeRequest: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer,
        lottery: state.lotteryReducer,
        my: state.myReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest
})(Page));