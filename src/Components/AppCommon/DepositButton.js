import React, {Component, Fragment} from 'react';
import {Button} from 'reactstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import {setModal, updateBrowseHistory} from "../../actions/appStatusAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {setUser} from "../../actions/authActions";

class DepositButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            charge: {}
        };

        this.createCharge = this.createCharge.bind(this);
        this.openPopUp = this.openPopUp.bind(this);
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

                this.createCharge();
            }
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    createCharge() {

        const {isAuthenticated} = this.props.auth;

        // check if authenticated
        if (! isAuthenticated) {
            this.props.updateBrowseHistory({
                autoTasks: ['createCharge'],
            });

            this.props.setModal('login');
            return;
        }

        this.props.makeRequest(request.Coinbase.createCharge, {}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                this.setState({charge: res.data, isLoading: false });
                this.openPopUp();
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );
    }

    openPopUp() {
        const {charge} = this.state;
        const url = charge && charge.hosted_url;
        const newWindow=window.open(url,'name','height=600,width=800');
        if (window.focus) {newWindow.focus()}
        return false;
    }

    render() {
        return (
            <Fragment>
                <Button onClick={this.createCharge}>Deposit</Button>
            </Fragment>
        )
    }
};

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