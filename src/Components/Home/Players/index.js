import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import PlayersList from "../../AppCommon/PlayersList";

class Players extends React.Component {

    render() {
        return (
            <Fragment>
                <div className="wining-numbers-table card">
                    <div className="card-body">
                        <h4>Players</h4>
                        <PlayersList players={["", "", "", ""]}/>
                    </div>
                </div>
            </Fragment>
        )
    }

}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Players);