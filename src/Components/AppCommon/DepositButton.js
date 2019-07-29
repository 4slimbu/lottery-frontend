import React, {Component, Fragment} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Row, Col} from 'reactstrap';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import {setModal} from "../../actions/appStatusAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {AvFeedback, AvField, AvForm, AvGroup} from "availity-reactstrap-validation";
import {Loader} from 'react-loaders';
import PickedNumbers from "./PickedNumbers";
import {findSetting, inCurrency} from "../../utils/helper/helperFunctions";
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

    createCharge() {

        const {isAuthenticated} = this.props.auth;

        // check if authenticated
        if (! isAuthenticated) {
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
        auth: state.authReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    setUser,
    setModal,
    makeRequest,
})(DepositButton));