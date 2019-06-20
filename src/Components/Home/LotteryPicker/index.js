import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import LotteryNumberList from "../../AppCommon/LotteryNumberList";
import {generateRandomLotteryNumber} from "../../../utils/helper/helperFunctions";
import PickedNumbers from "../../AppCommon/PickedNumbers";

class LotteryPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numbers: [
                1, 2, 4, 5, 6, 7, 8 , 9, 10,
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
            activeIndex: null
        };

        this.randomPick = this.randomPick.bind(this);
        this.handleNumberClick = this.handleNumberClick.bind(this);
    }

    componentDidMount() {
        this.randomPick();
    }

    componentWillUnmount() {
    }

    handleNumberClick(number) {
        let {pickedNumbers, activeIndex} = this.state;

        let index = pickedNumbers.indexOf(number);

        if (index !== -1) {
            // let filtered = pickedNumbers.filter(function (el) {
            //     return el != undefined;
            // });
            //
            // if (filtered.length === 6) {
            // }
            this.setState({activeIndex: index});
            delete pickedNumbers[index];
        } else {
            pickedNumbers[activeIndex] = number;
        }

        this.setState({
            pickedNumbers: pickedNumbers,
            activeIndex: index
        });
    }

    randomPick() {
        let that = this;
        (function theLoop (i) {
            setTimeout(function () {
                let randomPick = generateRandomLotteryNumber();

                that.setState({
                    pickedNumbers: randomPick,
                    activeIndex: null
                });

                if (--i) {          // If i > 0, keep going
                    theLoop(i);       // Call the loop again, and pass it the current value of i
                }
            }, 200);
        })(10);
    }

    render() {
        const {numbers, pickedNumbers} = this.state;
        return (
            <Fragment>
                <div className="lottery-table card">
                    <h4 className="card-header">
                        <span>Picked Numbers</span>
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
                            <button className="btn btn-info" onClick={this.randomPick}>Shuffle</button>
                            <button className="btn btn-primary">Play Now</button>
                            <a href="#" className="btn btn-dark">Reset</a>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LotteryPicker);