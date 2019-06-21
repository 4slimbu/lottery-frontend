import React from "react";
import * as _ from "lodash";
import * as classnames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBtc} from "@fortawesome/free-brands-svg-icons";

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
                                        <span className="player-name">{winner.full_name}</span>
                                            <span className="player-lottery-amount">
                                            <FontAwesomeIcon icon={faBtc}/>{winner.won_amount * 1 + winner.service_charge * 1}
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