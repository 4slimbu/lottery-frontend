import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";

import logo from '../../assets/images/logo.png';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <header>
                        <div className="container">
                            <nav className="navbar navbar-expand-md">
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#headerNavbar" aria-controls="headerNavbar">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse" id="headerNavbar">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">About </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Faq </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Contact </a>
                                        </li>
                                    </ul>
                                </div>
                                <ul className="nav-items-link">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Login </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Register </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </header>

                    <section className="main">
                        <div className="section-top">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-5 col-lg-4">
                                        <a href="#" className="navbar-brand">
                                            <img src={logo} alt="Bitlot logo"/>
                                        </a>
                                    </div>
                                    <div className="col-sm-12 col-md-7 col-lg-5">
                                        <div className="prizepool-head">
                                            <h6>Prize Pool</h6>
                                            <div className="prizepool-amount">
                                                <span>1.072821 BTC</span>
                                                <span>$33,537.91</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-3">
                                        <div className="buttons">
                                            <a href="#" className="btn btn-secondary">Deposit</a>
                                            <a href="#" className="btn btn-primary">Let's play</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-bottom">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-5 col-lg-4">
                                        <div className="winners-table card">
                                            <h4 className="card-header">
                                                Recent Winners
                                            </h4>
                                            <ol className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <span className="player-name">Xnaughty001</span>
                                                    <span className="player-lottery-amount"><i className="fa fa-btc"></i>0.0067</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="player-name">Op$781G001</span>
                                                    <span className="player-lottery-amount"><i className="fa fa-btc"></i>1.0084</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="player-name">Xnaughty001</span>
                                                    <span className="player-lottery-amount"><i className="fa fa-btc"></i>0.7062</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="player-name">Op$781G001</span>
                                                    <span className="player-lottery-amount"><i className="fa fa-btc"></i>0.0520</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="player-name">Xnaughty001</span>
                                                    <span className="player-lottery-amount"><i className="fa fa-btc"></i>0.3067</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="player-name">Op$781G001</span>
                                                    <span className="player-lottery-amount"><i className="fa fa-btc"></i>0.0904</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="player-name">Xnaughty001</span>
                                                    <span className="player-lottery-amount"><i className="fa fa-btc"></i>0.8061</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="player-name">Op$781G001</span>
                                                    <span className="player-lottery-amount"><i className="fa fa-btc"></i>0.0392</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="player-name">Op$781G001</span>
                                                    <span className="player-lottery-amount"><i className="fa fa-btc"></i>0.0136</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="player-name">Op$781G001</span>
                                                    <span className="player-lottery-amount"><i className="fa fa-btc"></i>0.0905</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="player-name">Op$781G001</span>
                                                    <span className="player-lottery-amount"><i className="fa fa-btc"></i>0.0083</span>
                                                </li>
                                            </ol>
                                            <div className="card-body">
                                                <a href="#" className="card-link">View Past Winners</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-7 col-lg-5">
                                        <div className="lottery-table card">
                                            <h4 className="card-header">
                                                <span>Picked Numbers</span>
                                                <ul>
                                                    <li className="picked-number"><a href="#">5</a></li>
                                                    <li className="picked-number"><a href="#">16</a></li>
                                                    <li className="picked-number"><a href="#">19</a></li>
                                                    <li className="picked-number"><a href="#">27</a></li>
                                                    <li className="picked-number"><a href="#">29</a></li>
                                                    <li className="picked-number"><a href="#">47</a></li>
                                                </ul>
                                            </h4>
                                            <div className="card-body">
                                                <ul className="lottery-table-numbers">
                                                    <li className="lottery-table-number"><a href="#">1</a></li>
                                                    <li className="lottery-table-number"><a href="#">2</a></li>
                                                    <li className="lottery-table-number"><a href="#">3</a></li>
                                                    <li className="lottery-table-number"><a href="#">4</a></li>
                                                    <li className="lottery-table-number active"><a href="#">5</a></li>
                                                    <li className="lottery-table-number"><a href="#">6</a></li>
                                                    <li className="lottery-table-number"><a href="#">7</a></li>
                                                    <li className="lottery-table-number"><a href="#">8</a></li>
                                                    <li className="lottery-table-number"><a href="#">9</a></li>
                                                    <li className="lottery-table-number"><a href="#">10</a></li>
                                                    <li className="lottery-table-number"><a href="#">11</a></li>
                                                    <li className="lottery-table-number"><a href="#">12</a></li>
                                                    <li className="lottery-table-number"><a href="#">13</a></li>
                                                    <li className="lottery-table-number"><a href="#">14</a></li>
                                                    <li className="lottery-table-number"><a href="#">15</a></li>
                                                    <li className="lottery-table-number active"><a href="#">16</a></li>
                                                    <li className="lottery-table-number"><a href="#">17</a></li>
                                                    <li className="lottery-table-number"><a href="#">18</a></li>
                                                    <li className="lottery-table-number active"><a href="#">19</a></li>
                                                    <li className="lottery-table-number"><a href="#">20</a></li>
                                                    <li className="lottery-table-number"><a href="#">21</a></li>
                                                    <li className="lottery-table-number"><a href="#">22</a></li>
                                                    <li className="lottery-table-number"><a href="#">23</a></li>
                                                    <li className="lottery-table-number"><a href="#">24</a></li>
                                                    <li className="lottery-table-number"><a href="#">25</a></li>
                                                    <li className="lottery-table-number"><a href="#">26</a></li>
                                                    <li className="lottery-table-number active"><a href="#">27</a></li>
                                                    <li className="lottery-table-number"><a href="#">28</a></li>
                                                    <li className="lottery-table-number active"><a href="#">29</a></li>
                                                    <li className="lottery-table-number"><a href="#">30</a></li>
                                                    <li className="lottery-table-number"><a href="#">31</a></li>
                                                    <li className="lottery-table-number"><a href="#">32</a></li>
                                                    <li className="lottery-table-number"><a href="#">33</a></li>
                                                    <li className="lottery-table-number"><a href="#">34</a></li>
                                                    <li className="lottery-table-number"><a href="#">35</a></li>
                                                    <li className="lottery-table-number"><a href="#">36</a></li>
                                                    <li className="lottery-table-number"><a href="#">37</a></li>
                                                    <li className="lottery-table-number"><a href="#">38</a></li>
                                                    <li className="lottery-table-number"><a href="#">39</a></li>
                                                    <li className="lottery-table-number"><a href="#">40</a></li>
                                                    <li className="lottery-table-number"><a href="#">41</a></li>
                                                    <li className="lottery-table-number"><a href="#">42</a></li>
                                                    <li className="lottery-table-number"><a href="#">43</a></li>
                                                    <li className="lottery-table-number"><a href="#">44</a></li>
                                                    <li className="lottery-table-number"><a href="#">45</a></li>
                                                    <li className="lottery-table-number"><a href="#">46</a></li>
                                                    <li className="lottery-table-number active"><a href="#">47</a></li>
                                                    <li className="lottery-table-number"><a href="#">48</a></li>
                                                    <li className="lottery-table-number"><a href="#">49</a></li>
                                                </ul>
                                                <div className="buttons">
                                                    <a href="#" className="btn btn-primary">Play Now</a>
                                                    <a href="#" className="btn btn-dark">Reset</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-3">
                                        <div className="count-down-table card">
                                            <div className="card-body">
                                                <h4>Next Game Starts</h4>
                                                <div className="countdown">
                                                    <h3 className="countdown-text">
                                                        <span>01</span> :<span>59</span> :<span>29</span> :<span>08</span>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wining-numbers-table card">
                                            <div className="card-body">
                                                <h4>Wining Numbers</h4>
                                                <ul className="winning-numbers">
                                                    <li className="winning-number"><a href="#">5</a></li>
                                                    <li className="winning-number"><a href="#">16</a></li>
                                                    <li className="winning-number"><a href="#">19</a></li>
                                                    <li className="winning-number"><a href="#">27</a></li>
                                                    <li className="winning-number"><a href="#">29</a></li>
                                                    <li className="winning-number"><a href="#">47</a></li>
                                                    <li className="winning-number"><a href="#">5</a></li>
                                                    <li className="winning-number"><a href="#">16</a></li>
                                                    <li className="winning-number"><a href="#">19</a></li>
                                                    <li className="winning-number"><a href="#">27</a></li>
                                                    <li className="winning-number"><a href="#">29</a></li>
                                                    <li className="winning-number"><a href="#">47</a></li>
                                                    <li className="winning-number"><a href="#">5</a></li>
                                                    <li className="winning-number"><a href="#">16</a></li>
                                                    <li className="winning-number"><a href="#">19</a></li>
                                                    <li className="winning-number"><a href="#">27</a></li>
                                                    <li className="winning-number"><a href="#">29</a></li>
                                                    <li className="winning-number"><a href="#">47</a></li>
                                                    <li className="winning-number"><a href="#">5</a></li>
                                                    <li className="winning-number"><a href="#">16</a></li>
                                                    <li className="winning-number"><a href="#">19</a></li>
                                                    <li className="winning-number"><a href="#">27</a></li>
                                                    <li className="winning-number"><a href="#">29</a></li>
                                                    <li className="winning-number"><a href="#">47</a></li>
                                                    <li className="winning-number"><a href="#">5</a></li>
                                                    <li className="winning-number"><a href="#">16</a></li>
                                                    <li className="winning-number"><a href="#">19</a></li>
                                                    <li className="winning-number"><a href="#">27</a></li>
                                                    <li className="winning-number"><a href="#">29</a></li>
                                                    <li className="winning-number"><a href="#">47</a></li>
                                                    <li className="winning-number"><a href="#">5</a></li>
                                                    <li className="winning-number"><a href="#">16</a></li>
                                                    <li className="winning-number"><a href="#">19</a></li>
                                                    <li className="winning-number"><a href="#">27</a></li>
                                                    <li className="winning-number"><a href="#">29</a></li>
                                                    <li className="winning-number"><a href="#">47</a></li>
                                                    <li className="winning-number"><a href="#">5</a></li>
                                                    <li className="winning-number"><a href="#">16</a></li>
                                                    <li className="winning-number"><a href="#">19</a></li>
                                                    <li className="winning-number"><a href="#">27</a></li>
                                                    <li className="winning-number"><a href="#">29</a></li>
                                                    <li className="winning-number"><a href="#">47</a></li>
                                                    <li className="winning-number"><a href="#">5</a></li>
                                                    <li className="winning-number"><a href="#">16</a></li>
                                                    <li className="winning-number"><a href="#">19</a></li>
                                                    <li className="winning-number"><a href="#">27</a></li>
                                                    <li className="winning-number"><a href="#">29</a></li>
                                                    <li className="winning-number"><a href="#">47</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <footer>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-6 footer-left">
                                    <ul className="footer-items">
                                        <li className="footer-item">
                                            <a href="#" className="footer-link">Privacy Policy</a>
                                        </li>
                                        <li className="footer-item">
                                            <a href="#" className="footer-link">Terms</a>
                                        </li>
                                        <li className="footer-item">
                                            <a href="#" className="footer-link">Faq</a>
                                        </li>
                                        <li className="footer-item">
                                            <a href="#" className="footer-link">Contact Us</a>
                                        </li>
                                    </ul>
                                    <p>© 2019 Bitlot Crypto Lottery. All rights reserved.</p>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6 footer-right">
                                    <ul className="social-icons">
                                        <li><a href="#"><span className="fa fa-facebook"></span></a></li>
                                        <li><a href="#"><span className="fa fa-twitter"></span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>

                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

Home.propTypes = {
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
})(Home));