import React, {Component, Fragment} from 'react';
import LotteryNumberList from "./LotteryNumberList";
import {checkIfWinner, isItemLoaded} from "../../utils/helper/helperFunctions";
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
                seconds: '00'
            }

        }
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

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // set timer values
            that.setState({
                timer: {
                    days: days < 10 ? '0' + days: days,
                    hours: hours < 10 ? '0' + hours: hours,
                    minutes: minutes < 10 ? '0' + minutes: minutes,
                    seconds: seconds < 10 ? '0' + seconds: seconds
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
        }, 1000);
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
                            <h4>Game in Progress</h4>
                            <div className="countdown">
                                <div className="text-center">Closing on</div>
                                <h3 className="countdown-text">
                                    <span>{ timer.days }</span> :<span>{ timer.hours }</span> :<span>{ timer.minutes }</span> :<span>{ timer.seconds }</span>
                                </h3>
                            </div>
                        </div>
                    }
                    {
                        gameStatus === "processing" &&
                        <div className="card-body">
                            <h4>Game Closed</h4>
                            <div className="countdown">
                                <div className="text-center">Waiting for Result ...</div>
                                <h3 className="countdown-text">
                                    <span>&nbsp;</span>
                                </h3>
                            </div>
                        </div>
                    }
                </div>
                {
                    lastSlot && lastSlot.id &&
                    <div className="count-down-table card">
                        <div className="card-body">
                            <h4>Last Result</h4>
                            <div className="text-center"><strong>Prize Pool: { lastSlot.total_amount } BTC</strong></div>

                            {
                                lastSlot.winners.length > 0 ?
                                <div>
                                    <div className="text-center">Winners:</div>
                                    <div className="text-center"><strong>Congratulations !!</strong></div>
                                    {
                                        _.map(lastSlot.winners, function (winner, key) {
                                            return <div key={key} className="text-center">{winner.full_name} : { winner.pivot.won_amount * 1 + winner.pivot.service_charge * 1 } BTC</div>
                                        })
                                    }
                                </div> :
                                <div className="text-center">No Winners so pool prize has been moved to next game.</div>
                            }

                            <div className="countdown">
                                <LotteryNumberList
                                    ulClass="lottery-table-numbers result"
                                    liClass="lottery-table-number"
                                    numbers={lastSlot.result}
                                    activeNumbers={lastSlot.result}
                                />
                            </div>

                        </div>
                    </div>
                }
            </Fragment>
        )
    }

}

export default GameInfo