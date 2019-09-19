import React, {Component, Fragment} from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import {setModal} from "../../actions/appStatusAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import PickedNumbers from "./PickedNumbers";
import {findSetting, inAppCoin, isNumberPickedCorrectly} from "../../utils/helper/helperFunctions";
import {setUser} from "../../actions/authActions";
import DepositButton from "./DepositButton";

class PlayModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            backdrop: true,
            isLoading: true,
            activeScreen: 'play', // 'play', 'error', 'success',
            message: ''
        };

        this.closeModal = this.closeModal.bind(this);
        this.changeBackdrop = this.changeBackdrop.bind(this);
        this.play = this.play.bind(this);
        this.handleNumberClick = this.handleNumberClick.bind(this);
        this.activateScreen = this.activateScreen.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset() {
        this.setState({
            modal: false,
            backdrop: true,
            isLoading: true,
            activeScreen: 'play', // 'play', 'error', 'success',
            message: ''
        })
    }

    activateScreen(screen) {
        this.setState({activeScreen: screen});
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
                        this.setState({ isLoading: false, message: 'You have joined the game. Good Luck!' });
                        this.activateScreen('success');
                    },
                    (errorData) => {
                        this.setState({isLoading: false});
                        this.setState({ isLoading: false, message: 'Unable to update info!' });
                        this.activateScreen('error');
                    }
                );
            },
            (errorData) => {
                if (errorData.error === 'duplicateEntry') {
                    this.setState({ message: 'You have already joined the game. Please wait for next game.' });
                } else {
                    this.setState({ message: 'Unable to join the game. Try again!' });
                }

                this.setState({isLoading: false});
                this.activateScreen('error');
            }
        );
    }

    closeModal() {
        this.reset();
        this.props.setModal();
    }

    changeBackdrop(e) {
        let value = e.target.value;
        if (value !== 'static') {
            value = JSON.parse(value);
        }
        this.setState({backdrop: value});
    }

    handleNumberClick() {

    }

    showVerificationModal() {
        this.props.setModal('verify');
    }

    render() {
        const {activeScreen, message} = this.state;
        const {modal, settings} = this.props.appStatus;
        const {user, isVerified} = this.props.auth;
        const {wallet} = user;
        const {pickedNumbers} = this.props.lottery;
        const isOpen = modal === 'playLottery';

        // check if can play
        let entryFee = findSetting(settings, 'lottery_slot_entry_fee');
        const canPlayUsingBalance = (wallet && entryFee &&  (wallet.deposit > entryFee.value));
        const canPlayFreeUnVerified = !isVerified && user.free_games > 3; // only 2 games out of 5 can be played unverified
        const canPlayFreeVerified = isVerified && user.free_games > 0; // five games are allowed
        const canPlayFreeIfVerified = !isVerified && user.free_games > 0; // if user was verified, then they can play more game
        const canPlay = canPlayUsingBalance || canPlayFreeUnVerified || canPlayFreeVerified;
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
                                handleClick={this.handleNumberClick}
                            />
                            {
                                activeScreen === 'play' &&
                                (
                                    isNumberPickedCorrectly(pickedNumbers) ?
                                        <div>
                                            {
                                                canPlayFreeVerified || canPlayFreeUnVerified || canPlayFreeIfVerified ?
                                                    <h3 className="play-title">Free Games Left: {user.free_games}</h3>
                                                    :
                                                    <h3 className="play-title">Entry Fee: {inAppCoin(entryFee && entryFee.value)}</h3>
                                            }
                                            {
                                                canPlay ?
                                                    (
                                                        canPlayFreeIfVerified ?
                                                            <div className="text-center">
                                                                <span>Please verify your account to use your remaining free games.</span> <br />
                                                                <a href="javascript:void(0);" onClick={() => this.showVerificationModal()} className="btn-link">Verify Now</a>
                                                            </div>
                                                            :
                                                            <div>
                                                                <button className="play-btn" onClick={this.play}>Play</button>
                                                            </div>
                                                    )
                                                    :
                                                    (
                                                        canPlayFreeIfVerified ?
                                                            <div className="text-center">
                                                                <span>Please verify your account to use your remaining free games.</span> <br />
                                                                <a href="javascript:void(0);" onClick={() => this.showVerificationModal()} className="btn-link">Verify Now</a>
                                                            </div>
                                                            :
                                                            <div>
                                                                <span>You don't have enough balance.</span>
                                                                <DepositButton/>
                                                            </div>
                                                    )
                                            }
                                        </div>
                                        :
                                        <div>
                                            <span className="short-note">Please pick your lucky numbers to play game.</span>
                                        </div>
                                )
                            }

                            {
                                activeScreen === 'error' &&
                                (
                                    <div>
                                        <span className="text-error">{ message }</span>
                                    </div>
                                )
                            }

                            {
                                activeScreen === 'success' &&
                                (
                                    <div>
                                        <span className="text-success">{ message }</span>
                                    </div>
                                )
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