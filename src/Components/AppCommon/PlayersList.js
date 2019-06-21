import React from "react";
import * as _ from "lodash";
import * as classnames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBtc} from "@fortawesome/free-brands-svg-icons";

const PlayersList = (props) => {
    const {ulClass, liClass, players} = props;
    return (
        <ul className={classnames("list-group list-group-flush players-list", ulClass)}>
            {
                _.map(players, (player, key) => {
                    return (
                        <li key={key} className={classnames("list-group-item", liClass)}>
                            {
                                player ?
                                    <div>
                                        <span className="player-name">{player.full_name}</span> joined the Game.
                                    </div>
                                    :
                                    <div className="placeholder-div-sm">
                                    </div>
                            }
                        </li>
                    );
                })
            }
        </ul>
    )
};

export default PlayersList;