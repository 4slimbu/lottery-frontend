import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import PlayersList from "../../AppCommon/PlayersList";

const Players = (props) => {
    const {players, total} = props;
    return (
        <Fragment>
            <div className="wining-numbers-table card">
                <div className="card-body">
                    <h4>Players : {total}</h4>
                    <PlayersList players={players}/>
                </div>
            </div>
        </Fragment>
    )
};

export default Players;
