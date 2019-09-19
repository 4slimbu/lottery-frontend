import React, {Component, Fragment} from 'react'
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../actions/requestAction";
import {setLastSlot, setLotteryPlayers, setLotterySlot, setLotteryWinners} from "../../../actions/lotteryActions";
import {setCurrencies, setModal, setSettings} from "../../../actions/appStatusAction";
import AnimatedSection from "../../AppCommon/AnimatedSection";

class ViewProfile extends Component {
    showVerificationModal() {
        this.props.setModal('verify');
    }

    render() {
        const {user} = this.props.auth;
        return (
            <Fragment>
                <AnimatedSection>
                    <div className="row">
                        <div className="col-md-12 mb-md-4">
                            <div className="card my-profile">
                                <div className="card-header">Profile</div>
                                <div className="card-body">
                                    <img className="card-img-top img-profile" src={user.profile_pic} alt="Profile picture" />
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><strong>Username: </strong> { user.username }</li>
                                        <li className="list-group-item"><strong>Nickname: </strong> { user.nickname }</li>
                                        <li className="list-group-item"><strong>Name: </strong> { user.full_name }</li>
                                        <li className="list-group-item"><strong>Email: </strong> { user.email }</li>
                                        <li className="list-group-item"><strong>Contact No: </strong> { user.contact_number }</li>
                                        <li className="list-group-item">
                                            <strong>Status: </strong> { user.verified ? <span className="text-success">Verified</span> : <span className="text-danger">Un-verified</span> }
                                            { !user.verified && <a href="javascript:void(0);" onClick={() => this.showVerificationModal()} className="btn-link">Verify Now</a> }
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <div className="text-center">
                                        <Link to="/my/profile/edit">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer,
        lottery: state.lotteryReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest, setLotteryWinners, setLotterySlot, setLotteryPlayers, setSettings, setCurrencies, setLastSlot,
    setModal,
})(ViewProfile));