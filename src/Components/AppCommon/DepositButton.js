import React, {Component, Fragment} from 'react';
import {Button} from 'reactstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import {setModal, updateBrowseHistory} from "../../actions/appStatusAction";
import {setUser} from "../../actions/authActions";

class DepositButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            charge: {}
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        //Listen to browser history
        this.unlisten = this.props.history.listen((location, action) => {
            // Run create charge if createCharge is set on autoTasks
            let {autoTasks} = this.props.browseHistory;
            let index = autoTasks.indexOf('createCharge');
            if (index !== -1) {
                const newBrowserHistory = {
                    // Todo: find out why splice not removing createCharge
                    // autoTasks: [...autoTasks.splice(index, 1)]
                    autoTasks: []
                };

                this.props.updateBrowseHistory(newBrowserHistory);

                this.handleClick();
            }
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    handleClick() {

        const {isAuthenticated} = this.props.auth;

        // check if authenticated
        if (! isAuthenticated) {
            this.props.updateBrowseHistory({
                autoTasks: ['createCharge'],
            });

            this.props.setModal('login');
            return;
        }

        // Open deposit modal
        this.props.setModal('deposit');
    }

    render() {
        return (
            <Fragment>
                <Button onClick={this.handleClick}>Deposit</Button>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        browseHistory: state.appStatusReducer.browseHistory
    }
}


export default withRouter(connect(mapStateToProps, {
    setUser,
    setModal,
    makeRequest,
    updateBrowseHistory
})(DepositButton));