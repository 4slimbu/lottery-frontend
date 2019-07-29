import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import LotteryNumberList from "../../AppCommon/LotteryNumberList";
import {
    findSetting, generateRandomLotteryNumber, getFirstEmptyPosition,
    isNumberPickedCorrectly,
} from "../../../utils/helper/helperFunctions";
import PickedNumbers from "../../AppCommon/PickedNumbers";
import {withRouter} from "react-router-dom";
import {setModal} from "../../../actions/appStatusAction";
import {makeRequest} from "../../../actions/requestAction";
import {setUser} from "../../../actions/authActions";
import {setLotteryPickedNumbers} from "../../../actions/lotteryActions";

class LotteryPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numbers: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
                61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
                71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
                81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
                91, 92, 93, 94, 95, 96, 97, 98, 99
            ],
            pickedNumbers: [],
        };

        this.randomPick = this.randomPick.bind(this);
        this.handleNumberClick = this.handleNumberClick.bind(this);
        this.playLottery = this.playLottery.bind(this);
    }

    componentDidMount() {
        this.randomPick(false);
    }

    componentWillUnmount() {
    }

    handleNumberClick(number) {
        let {pickedNumbers} = this.state;

        let index = pickedNumbers.indexOf(number);

        if (index !== -1) {
            delete pickedNumbers[index];
        } else {
            let firstEmptyKey = getFirstEmptyPosition(pickedNumbers);
            if (typeof firstEmptyKey === 'number') {
                pickedNumbers[firstEmptyKey] = number;
            }
        }

        this.setState({
            pickedNumbers: pickedNumbers,
        });
        this.props.setLotteryPickedNumbers(pickedNumbers);
    }

    randomPick(pick = true) {
        let that = this;
        (function theLoop(i) {
            setTimeout(function () {
                let randomPick = generateRandomLotteryNumber();

                that.setState({
                    pickedNumbers: randomPick,
                });

                that.props.setLotteryPickedNumbers(randomPick);

                if (--i) {          // If i > 0, keep going
                    theLoop(i);       // Call the loop again, and pass it the current value of i
                } else {
                    // Reset to blank after random number shuffle
                    if (! pick) {
                        let noPick = [undefined, undefined, undefined, undefined, undefined, undefined];
                        that.setState({
                            pickedNumbers: noPick
                        });
                        that.props.setLotteryPickedNumbers(noPick);
                    }
                }
            }, 150);
        })(10);
    }

    playLottery() {
        const {isAuthenticated} = this.props.auth;
        const {pickedNumbers} = this.state;

        // check if all numbers are picked
        if (! isNumberPickedCorrectly(pickedNumbers)) {
            alert('Please pick lottery number.');
            return;
        }

        // check if authenticated
        if (! isAuthenticated) {
            this.props.setModal('login');
            return;
        }

        this.props.setModal('playLottery');
    }

    render() {
        const {numbers, pickedNumbers} = this.state;
        let firstEmptyKey = getFirstEmptyPosition(pickedNumbers);

        return (
            <Fragment>
                <div className="lottery-table card">
                    <h4 className="card-header">
                        <span>{ typeof firstEmptyKey !== 'undefined' ? 'Pick Numbers' : 'Picked Numbers' }</span>
                        <PickedNumbers
                            liClass="picked-number"
                            numbers={pickedNumbers}
                            handleClick={this.handleNumberClick}
                        />
                    </h4>
                    <div className="card-body">
                        <LotteryNumberList
                            ulClass="lottery-table-numbers"
                            liClass="lottery-table-number"
                            numbers={numbers}
                            activeNumbers={pickedNumbers}
                            handleClick={this.handleNumberClick}
                        />
                        <div className="buttons">
                            <button className="btn btn-info" onClick={this.randomPick}>Random Pick</button>
                            <button className="btn btn-primary" onClick={this.playLottery}>Play Now</button>
                        </div>
                    </div>
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
    setUser,
    setLotteryPickedNumbers
})(LotteryPicker));