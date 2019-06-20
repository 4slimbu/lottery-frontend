import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import logo from '../../../assets/images/logo.png';

class PrizePool extends React.Component {

    render() {
        return (
            <Fragment>
                <div className="prizepool-head">
                    <h6>Prize Pool</h6>
                    <div className="prizepool-amount">
                        <span>1.072821 BTC</span>
                        <span>$33,537.91</span>
                    </div>
                </div>
            </Fragment>
        )
    }

}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrizePool);