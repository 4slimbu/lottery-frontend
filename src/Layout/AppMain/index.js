import {Redirect, Route, withRouter} from 'react-router-dom';
import React, {Component, Fragment, lazy, Suspense} from 'react';
import Loader from 'react-loaders'

import {ToastContainer,} from 'react-toastify';
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";


const Home = lazy(() => import('../../Modules/Home'));

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
                            <h6 className="mt-3">
                                Please wait while we load all the User Components
                                <small>Because this is a demonstration, we load at once all the Dashboards examples. This wouldn't happen in a real live app!</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/" component={Home}/>
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