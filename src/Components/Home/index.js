import React, {Component, Fragment} from 'react'
import {withRouter} from "react-router-dom";
import Winners from "./Winners";
import LotteryPicker from "./LotteryPicker";
import GameInfo from "../../Components/AppCommon/GameInfo";
import Players from "./Players";
import withLayout from "../HOC/withLayout";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {slot, players} = this.props.lottery;
        const lotterySlotParticipantsCount = slot && slot.total_participants;
        return (
            <div className="section-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-5 col-lg-4">
                            <Winners/>
                        </div>
                        <div className="col-sm-12 col-md-7 col-lg-5">
                            <LotteryPicker/>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-3">
                            <GameInfo lottery={this.props.lottery} auth={this.props.auth}/>
                            <Players players={players.data} total={lotterySlotParticipantsCount}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withLayout(Home);