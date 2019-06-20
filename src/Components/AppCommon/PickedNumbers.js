import React from "react";
import * as _ from "lodash";
import * as classnames from "classnames";

const PickedNumbers = (props) => {
    const {ulClass, liClass, numbers, activeNumbers, handleClick} = props;
    return (
        <ul className={classnames(ulClass)}>
            {
                _.map(numbers, (number, key) => {
                    const isActive = activeNumbers && activeNumbers.indexOf(number) !== -1;
                    return <li key={key} className={classnames(liClass, {"active" : isActive})}><a href="javascript:void(0)">{ number }</a></li>;
                })
            }
        </ul>
    )
};

export default PickedNumbers;