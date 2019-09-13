import React, {Component, Fragment} from 'react';
import LotteryNumberList from "./LotteryNumberList";
import {
    checkIfWinner, getPlayerDisplayName, getWinningTypeClass, getWinningTypeIcon, inCurrency,
    isItemLoaded
} from "../../utils/helper/helperFunctions";
import * as _ from "lodash";

class GameInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            gameStatus: "",
            result: null,
            timer: {
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00',
                miliSeconds: '000',
                deciSeconds: '00'
            }

        };

        this.handleNumberClick = this.handleNumberClick.bind(this);
    }

    componentWillReceiveProps() {
        const {slot, result} = this.props.lottery;
        this.setState({
            slot: slot,
            result: result
        });

        slot && slot.id && this.setTimer();
    }

    setTimer() {
        let that = this;
        const {slot} = this.props.lottery;
        // Set the date we're counting down to
        let countDownDate = new Date(slot.end_time).getTime();

        // Update the count down every 1 second
        let x = setInterval(function() {

            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes, seconds and mili seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            let miliSeconds = Math.floor(distance % (1000));
            let deciSeconds = Math.floor(distance % (10));

            // set timer values
            that.setState({
                timer: {
                    days: days < 10 ? '0' + days: days,
                    hours: hours < 10 ? '0' + hours: hours,
                    minutes: minutes < 10 ? '0' + minutes: minutes,
                    seconds: seconds < 10 ? '0' + seconds: seconds,
                    miliSeconds: miliSeconds < 10 ? '00' + miliSeconds : (miliSeconds < 100 ? '0' + miliSeconds : miliSeconds),
                    deciSeconds: deciSeconds < 10 ? '0' + deciSeconds: deciSeconds,
                }
            });

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                that.setState({
                    gameStatus: "processing",
                })
            } else {
                that.setState({
                    gameStatus: "running"
                })
            }
        }, 1);
    }

    handleNumberClick() {

    }


    render() {
        const {user} = this.props.auth;
        const {lastSlot} = this.props.lottery;
        const {gameStatus, timer, result} = this.state;
        return (
            <Fragment>
                <div className="count-down-table card">
                    {
                        gameStatus === "running" &&
                        <div className="card-body">
                            <h4>Game Closing On</h4>
                            <div className="countdown">
                                <h3 className="countdown-text">
                                    <span>{ timer.minutes }</span> : <span>{ timer.seconds }</span> : <span>{ timer.deciSeconds }</span>
                                </h3>
                            </div>
                        </div>
                    }
                    {
                        gameStatus === "processing" &&
                        <div className="card-body">
                            <h4>Result Processing ...</h4>
                            <div className="countdown">
                                <h3 className="countdown-text">
                                    <span>00</span> : <span>00</span> : <span>00</span>
                                </h3>
                            </div>
                        </div>
                    }
                    {
                        lastSlot && lastSlot.id &&
                        <div className="card-body">
                            {
                                lastSlot.winners.length > 0 && gameStatus !== 'processing' ?
                                    <div className="congratulation-note">
                                        <div className="text-center"><strong>Congratulation to Winners</strong></div>
                                        {
                                            _.map(lastSlot.winners, function (winner, key) {
                                                return <div key={key} className="winner-sec text-center">
                                                    <span>
                                                        {getPlayerDisplayName(winner)} : { inCurrency(winner.pivot.won_amount * 1 + winner.pivot.service_charge * 1) }
                                                    </span>
                                                    <span className={ "winner-type " + getWinningTypeClass(winner) }>
                                                        { getWinningTypeIcon(winner) }
                                                    </span>
                                                </div>
                                            })
                                        }
                                    </div> :
                                    <div></div>
                            }

                            <div className="countdown">
                                <h5 className="counter-title text-center">
                                    {
                                        gameStatus === 'processing' ? 'Getting Result ...' : 'Last Game Result'
                                    }
                                </h5>
                                <LotteryNumberList
                                    ulClass="lottery-table-numbers result"
                                    liClass="lottery-table-number"
                                    numbers={gameStatus === "processing" ? ["", "", "", "", "", ""] : lastSlot.result}
                                    activeNumbers={lastSlot.result}
                                    handleClick={this.handleNumberClick}
                                />
                            </div>

                        </div>
                    }
                </div>
            </Fragment>
        )
    }

}

export default GameInfo