import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBtc} from "@fortawesome/free-brands-svg-icons";

class Winners extends React.Component {

    render() {
        return (
            <Fragment>
                <div className="winners-table card">
                    <h4 className="card-header">
                        Recent Winners
                    </h4>
                    <ol className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="player-name">Xnaughty001</span>
                            <span className="player-lottery-amount"><FontAwesomeIcon
                                icon={faBtc}/>0.0067</span>
                        </li>
                        <li className="list-group-item">
                            <span className="player-name">Op$781G001</span>
                            <span className="player-lottery-amount"><FontAwesomeIcon
                                icon={faBtc}/>1.0084</span>
                        </li>
                        <li className="list-group-item">
                            <span className="player-name">Xnaughty001</span>
                            <span className="player-lottery-amount"><FontAwesomeIcon
                                icon={faBtc}/>0.7062</span>
                        </li>
                        <li className="list-group-item">
                            <span className="player-name">Op$781G001</span>
                            <span className="player-lottery-amount"><FontAwesomeIcon
                                icon={faBtc}/>0.0520</span>
                        </li>
                        <li className="list-group-item">
                            <span className="player-name">Xnaughty001</span>
                            <span className="player-lottery-amount"><FontAwesomeIcon
                                icon={faBtc}/>0.3067</span>
                        </li>
                        <li className="list-group-item">
                            <span className="player-name">Op$781G001</span>
                            <span className="player-lottery-amount"><FontAwesomeIcon
                                icon={faBtc}/>0.0904</span>
                        </li>
                        <li className="list-group-item">
                            <span className="player-name">Xnaughty001</span>
                            <span className="player-lottery-amount"><FontAwesomeIcon
                                icon={faBtc}/>0.8061</span>
                        </li>
                        <li className="list-group-item">
                            <span className="player-name">Op$781G001</span>
                            <span className="player-lottery-amount"><FontAwesomeIcon
                                icon={faBtc}/>0.0392</span>
                        </li>
                        <li className="list-group-item">
                            <span className="player-name">Op$781G001</span>
                            <span className="player-lottery-amount"><FontAwesomeIcon
                                icon={faBtc}/>0.0136</span>
                        </li>
                        <li className="list-group-item">
                            <span className="player-name">Op$781G001</span>
                            <span className="player-lottery-amount"><FontAwesomeIcon
                                icon={faBtc}/>0.0905</span>
                        </li>
                        <li className="list-group-item">
                            <span className="player-name">Op$781G001</span>
                            <span className="player-lottery-amount"><FontAwesomeIcon
                                icon={faBtc}/>0.0083</span>
                        </li>
                    </ol>
                    <div className="card-body">
                        <a href="#" className="card-link">View Past Winners</a>
                    </div>
                </div>
            </Fragment>
        )
    }

}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Winners);