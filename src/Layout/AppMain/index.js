import {Redirect, Route, withRouter} from 'react-router-dom';
import React, {Component, Fragment, lazy, Suspense} from 'react';
import Loader from 'react-loaders'
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";


const Home = lazy(() => import('../../Components/Home'));
const Dashboard = lazy(() => import('../../Components/Dashboard'));

class AppMain extends Component {
    render () {
        const {isAuthenticated} = this.props.auth;
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
                    <Route exact path="/dashboard" component={Dashboard}/>
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
    makeRequest,
})(AppMain));