import React from "react";
import * as _ from "lodash";
import * as classnames from "classnames";
import {
    getPlayerDisplayName, getWinningTypeClass, getWinningTypeIcon,
    inCurrency
} from "../../utils/helper/helperFunctions";

const LotteryWinnerList = (props) => {
    const {ulClass, liClass, winners} = props;
    return (
        <ol className={classnames("list-group list-group-flush", ulClass)}>
            {
                _.map(winners, (winner, key) => {
                    return (
                        <li key={key} className={classnames("list-group-item", liClass)}>
                            {
                                winner ?
                                    <div>
                                        <span className="player-name">{getPlayerDisplayName(winner)}</span>
                                        <span className="player-lottery-amount">
                                            { inCurrency(winner.won_amount * 1 + winner.service_charge * 1)}
                                            <span className={ "winner-type " + getWinningTypeClass(winner) }>
                                                { getWinningTypeIcon(winner) }
                                            </span>
                                        </span>
                                    </div>
                                    :
                                    <div className="placeholder-div">
                                    </div>
                            }
                        </li>
                    );
                })
            }
        </ol>
    )
};

export default LotteryWinnerList;