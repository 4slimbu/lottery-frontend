import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../actions/requestAction";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../../actions/lotteryActions";
import {setCurrencies, setSettings} from "../../../actions/appStatusAction";

class Profile extends React.Component {

    render() {
        const {user} = this.props.auth;
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <div className="row">
                            <div className="col-md-12 mb-md-4">
                                <div className="card my-profile">
                                    <div className="card-header">Profile</div>
                                    <div className="card-body">
                                        <img className="card-img-top img-profile" src={user.profile_pic} alt="Profile picture" />
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><strong>Name: </strong> { user.full_name }</li>
                                            <li className="list-group-item"><strong>Email: </strong> { user.email }</li>
                                            <li className="list-group-item"><strong>Contact No: </strong> { user.contact_number }</li>
                                        </ul>
                                    </div>
                                    <div className="card-footer">
                                        <div className="text-center">
                                            <Link to="/my/played-games">Edit</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

Profile.propTypes = {
    makeRequest: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer,
        lottery: state.lotteryReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest, setLotteryWinners, setLotterySlot, setLotteryPlayers, setSettings, setCurrencies, setLastSlot
})(Profile));