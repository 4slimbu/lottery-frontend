import React from "react";
import * as _ from "lodash";
import * as classnames from "classnames";
import {getPlayerDisplayName} from "../../utils/helper/helperFunctions";

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
                                        <span className="player-name">{getPlayerDisplayName(player)} <small>joined the Game.</small></span>
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