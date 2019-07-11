import React, {Component, Fragment} from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import {setModal} from "../../actions/appStatusAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import PickedNumbers from "./PickedNumbers";
import {findSetting, inAppCoin, inCurrency} from "../../utils/helper/helperFunctions";
import {setUser} from "../../actions/authActions";
import DepositButton from "./DepositButton";

class PlayModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            backdrop: true,
            isLoading: true
        };

        this.closeModal = this.closeModal.bind(this);
        this.changeBackdrop = this.changeBackdrop.bind(this);
        this.play = this.play.bind(this);
    }

    play() {
        const {pickedNumbers} = this.props.lottery;
        // Play
        const data = {
            lottery_number: pickedNumbers
        };

        this.props.makeRequest(request.Me.play, data, {message: MESSAGES.LOGGING}).then(
            (res) => {
                this.props.makeRequest(request.Me.get, {}, {message: MESSAGES.LOGGING}).then(
                    (res) => {
                        this.props.setUser(res.data);
                        this.setState({ isLoading: false });
                        this.props.setModal();
                    },
                    (errorData) => {
                        this.setState({isLoading: false});
                    }
                );
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );
    }

    closeModal() {
        this.props.setModal();
    }

    changeBackdrop(e) {
        let value = e.target.value;
        if (value !== 'static') {
            value = JSON.parse(value);
        }
        this.setState({backdrop: value});
    }


    render() {
        const {modal, settings} = this.props.appStatus;
        const {user} = this.props.auth;
        const {wallet} = user;
        const {pickedNumbers} = this.props.lottery;
        const isOpen = modal === 'playLottery';

        // check if have enough balance
        let entryFee = findSetting(settings, 'lottery_slot_entry_fee');
        const canPay = (wallet && entryFee &&  (wallet.deposit > entryFee.value)) || user.free_games > 0;

        return (
            <Fragment>
                <div>
                    <Modal isOpen={isOpen} toggle={this.closeModal} className={this.props.className}
                           backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.closeModal}>Play Lottery</ModalHeader>
                        <ModalBody>
                            <PickedNumbers
                                ulClass="lottery-table-numbers"
                                liClass="lottery-table-number"
                                numbers={pickedNumbers}
                            />
                            <h3 className="play-title">Entry Fee: {inAppCoin(entryFee && entryFee.value)}</h3>
                            <h3 className="play-title">Free Games Left: {user.free_games}</h3>
                            {
                                canPay ?
                                    <div>
                                        <span className="short-note">Click on play to pay the entry fee and join the game.</span>
                                        <button class="play-btn" onClick={this.play}>Play</button>
                                    </div>
                                :
                                    <div>
                                        <span>You don't have enough balance.</span>
                                        <DepositButton/>
                                    </div>

                            }
                        </ModalBody>
                    </Modal>
                </div>
            </Fragment>
        )
    }
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer,
        lottery: state.lotteryReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    setUser,
    setModal,
    makeRequest,
})(PlayModal));