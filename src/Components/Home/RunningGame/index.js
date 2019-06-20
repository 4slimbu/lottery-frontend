import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import logo from '../../../assets/images/logo.png';

class RunningGame extends React.Component {

    render() {
        return (
            <Fragment>
                <div className="count-down-table card">
                    <div className="card-body">
                        <h4>Next Game Starts</h4>
                        <div className="countdown">
                            <h3 className="countdown-text">
                                <span>01</span> :<span>59</span> :<span>29</span>
                                :<span>08</span>
                            </h3>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RunningGame);