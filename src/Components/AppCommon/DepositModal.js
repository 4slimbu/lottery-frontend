import React, {Component, Fragment} from 'react';
import {Col, Modal, ModalBody, ModalHeader, Row} from 'reactstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import {setModal} from "../../actions/appStatusAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import * as _ from "lodash";
import {coinToBtc} from "../../utils/helper/helperFunctions";

const Coins = (props) => {
    let {handleClick} = props;
    let coins = [1, 5, 10, 25, 50, 100];

    return (
        _.map(coins, (coin, key) => {
            return (
                <Col key={key} md={4} className="coin-box">
                    <div className="coin-wrapper">
                        <div className="coin" onClick={() => handleClick(coin)}>
                            <span className="coin-amount">{coin} <br /> {coin === 1 ? "coin" : "coins"}</span>
                        </div>
                    </div>
                    <button className="btn btn-primary coin-buy-amount" onClick={() => handleClick(coin)}>
                        { coinToBtc(coin) }
                    </button>
                </Col>
            )
        })
    )
};

class DepositModal extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            charge: {},
            isLoading: false,
        };

        this.handleClick = this.handleClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        this.setState({isLoading: true});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    closeModal() {
        this.props.setModal();
    }

    async handleClick(coins) {

        await this.props.makeRequest(request.Coinbase.createCharge, {coins: coins}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                this.setState({charge: res.data, isLoading: false });
                this.openPopUp();
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        this.closeModal();
    }

    openPopUp() {
        const {charge} = this.state;
        const url = charge && charge.hosted_url;
        const newWindow=window.open(url,'name','height=600,width=800');
        if (window.focus) {newWindow.focus()}
        return false;
    }

    render() {
        const {modal} = this.props.appStatus;
        const isOpen = modal === 'deposit';
        const coinProps = {
            handleClick: this.handleClick
        };

        return (
            <Fragment>
                <div>
                    <Modal isOpen={isOpen} toggle={this.closeModal} className={this.props.className} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.closeModal}>Deposit Coins</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Coins {...coinProps}/>
                            </Row>
                        </ModalBody>
                    </Modal>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    setModal,
    makeRequest,
})(DepositModal));