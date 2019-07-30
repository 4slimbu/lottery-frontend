import React, {Component} from 'react'
import Dashboard from "./Dashboard";
import Wallet from "./Wallet";
import Transactions from "./Transactions";
import Withdraw from "./Withdraw";
import PlayedGames from "./PlayedGames";
import Profile from "./Profile";
import withLayout from "../HOC/withLayout";
import DashboardMenu from "../AppCommon/DashboardMenu";

class My extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: "/my/dashboard"
        };

        this.playLottery = this.playLottery.bind(this);
    }

    componentDidMount() {
        this.setState({
            path: this.props.match.path
        });
    }

    playLottery() {
        const {isAuthenticated} = this.props.auth;

        // check if authenticated
        if (! isAuthenticated) {
            this.props.setModal('login');
            return;
        }

        this.props.setModal('playLottery');

        this.props.history.push('/');
    }

    render() {
        // Return to root url when unauthenticated
        const {isAuthenticated} = this.props.auth;

        if (! isAuthenticated ) {
            this.props.history.push('/');
        }

        // Proceed as usual
        const {path} = this.state;

        return (
            <div className="section-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <DashboardMenu/>
                        </div>
                        <div className="col-sm-12 col-md-8 col-lg-9">
                            {path === "/my/dashboard" && <Dashboard {...this.props}/>}
                            {path === "/my/wallet" && <Wallet {...this.props}/>}
                            {path === "/my/transactions" && <Transactions {...this.props}/>}
                            {path === "/my/withdraw" && <Withdraw {...this.props}/>}
                            {path === "/my/played-games" && <PlayedGames {...this.props}/>}
                            {path === "/my/profile" && <Profile {...this.props}/>}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default withLayout(My);