import React, {Fragment} from 'react';

const PrizePool = (props) =>  {
    const {amount} = props;
    return (
        <Fragment>
            <div className="prizepool-head">
                <h6>Prize Pool</h6>
                <div className="prizepool-amount">
                    <span>{amount} BTC</span>
                    <span></span>
                </div>
            </div>
        </Fragment>
    )
};

export default PrizePool;