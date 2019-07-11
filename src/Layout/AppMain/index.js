import {Redirect, Route, withRouter} from 'react-router-dom';
import React, {Component, Fragment, lazy, Suspense} from 'react';
import Loader from 'react-loaders'
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../actions/lotteryActions";
import {setCurrencies, setSettings} from "../../actions/appStatusAction";


const Home = lazy(() => import('../../Components/Home'));
const My = lazy(() => import('../../Components/My'));

class AppMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({isLoading: true});
        this._isMounted && this.bootstrap();
    }

    bootstrap() {
        // Get settings
        this.props.makeRequest(request.Settings.all, {query: ''}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setSettings(res.data);
                }
                this.setState({isLoading: false});
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        // Get currencies
        this.props.makeRequest(request.Currencies.all, {query: ''}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setCurrencies(res.data);
                }
                this.setState({isLoading: false});
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        // Get Last slot
        this.props.makeRequest(request.Lottery.slots.last, {}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setLastSlot(res.data);
                }
                this.setState({isLoading: false});
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        // Get Winners
        this.props.makeRequest(request.Lottery.slots.winners, {query: 'limit=12'}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setLotteryWinners(res);
                } else {
                }
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        // Get Active Slot
        this.props.makeRequest(request.Lottery.slots.getActive, {}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setLotterySlot(res.data);
                    this.props.setLotteryPlayers(res.data.participants);
                }
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        return (
            <Fragment>

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="ball-grid-beat"/>
                            </div>
                        </div>
                    </div>
                }>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/my/dashboard" component={My}/>
                    <Route exact path="/my/wallet" component={My}/>
                    <Route exact path="/my/transactions" component={My}/>
                    <Route exact path="/my/withdraw" component={My}/>
                    <Route exact path="/my/played-games" component={My}/>
                    <Route exact path="/my/profile" component={My}/>
                </Suspense>

            </Fragment>
        )
    }
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest, setLastSlot, setCurrencies, setSettings, setLotteryWinners, setLotterySlot, setLotteryPlayers
})(AppMain));