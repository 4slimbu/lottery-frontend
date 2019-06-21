import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBtc} from "@fortawesome/free-brands-svg-icons";
import request from "../../../services/request";
import {MESSAGES} from "../../../constants/messages";
import {makeRequest} from "../../../actions/requestAction";
import {withRouter} from "react-router-dom";

class Winners extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: true,
            winners: [{}]
        }
    }

    componentDidMount() {
        this.props.makeRequest(request.Lottery.winners, {query: ''}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    console.log(res.data);
                    this.setState({
                        winners: res.data,
                        pages: res.meta.last_page,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        winners: [{}],
                        pages: 0,
                        isLoading: false,
                    });
                }
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );
    }

    render() {
        const {winners, isLoading} = this.state;
        return (
            !isLoading &&
            <Fragment>
                <div className="winners-table card">
                    <h4 className="card-header">
                        Recent Winners asdfsd
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

Winners.propTypes = {
    makeRequest: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest,
})(Winners));