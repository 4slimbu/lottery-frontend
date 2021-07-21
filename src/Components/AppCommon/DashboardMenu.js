import React from 'react'
import {NavLink} from "react-router-dom";
import {Nav} from "reactstrap";

const DashboardMenu = (props) => {
    return (
        <div className="winners-table dashboard-wrap card">
            <div className="card-header">Menu</div>
            <div className="card-body">
                <Nav className="my-menu">
                    <NavLink exact={true} activeClassName='is-active'
                             to='/my/dashboard'>Dashbaord</NavLink>
                    <NavLink exact={true} activeClassName='is-active' to='/my/profile'>profile</NavLink>
                    <NavLink exact={true} activeClassName='is-active' to='/my/wallet'>Wallet</NavLink>
                    <NavLink exact={true} activeClassName='is-active'
                             to='/my/transactions'>Transactions</NavLink>
                    <NavLink exact={true} activeClassName='is-active'
                             to='/my/played-games'>Played Games</NavLink>
                    <NavLink exact={true} activeClassName='is-active' to='/my/withdraw'>Withdraw</NavLink>
                </Nav>
            </div>
        </div>
    )
};

export default DashboardMenu;