import React, {Fragment} from 'react';
import {bitsToBtc} from "../../utils/helper/helperFunctions";

const PrizePool = (props) =>  {
    const {amount} = props;
    return (
        <Fragment>
            {
                amount &&
                <div className="prizepool-head">
                    <h6>Prize Pool</h6>
                    <div className="prizepool-amount">
                        <span>{bitsToBtc(amount)}</span>
                        <span></span>
                    </div>
                </div>
            }
        </Fragment>
    )
};

export default PrizePool;