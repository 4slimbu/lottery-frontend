import React from "react";
import * as _ from "lodash";
import * as classnames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBtc} from "@fortawesome/free-brands-svg-icons";

const PlayersList = (props) => {
    const {ulClass, liClass, players} = props;
    return (
        <ul className={classnames("players-list", ulClass)}>
            {
                _.map(players, (player, key) => {
                    return (
                        <li key={key} className={classnames(liClass)}>
                            {
                                player ?
                                    <div>
                                        <span className="player-name">{player.full_name} <small>joined the Game.</small></span>
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