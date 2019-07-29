import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import 'react-table/react-table.css'
import {makeRequest} from "../../actions/requestAction";

import AppHeader from "../../Layout/AppHeader";
import AppFooter from "../../Layout/AppFooter";
import AppLogo from "../AppCommon/AppLogo";
import DepositButton from "../AppCommon/DepositButton";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {setPage} from "../../actions/pageActions";
import {getBySlug, stripslashes} from "../../utils/helper/helperFunctions";
import ContactUs from "./ContactUs";

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }

        this.playLottery = this.playLottery.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.slug !== nextProps.match.params.slug) {
            this.bootstrap(nextProps.match.params.slug);
        }
    }

    componentDidMount() {
        this.bootstrap(this.props.match.params.slug);
    }

    bootstrap(slug) {
        // Get Page
        this.setState({isLoading: true});

        if (! this.props.page[slug]) {
            this.props.makeRequest(request.Pages.show, {slug: slug }, {message: MESSAGES.LOGGING}).then(
                (res) => { if (res.data) { this.props.setPage(res); this.setState({isLoading: false}); } },
                (errorData) => {}
            );
        }
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
        const {slug} = this.props.match.params;
        const {pages} = this.props.page;
        const currentPage = getBySlug(pages, slug);
        return (
            slug === 'contact' ?
            <ContactUs/>
            :
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <AppHeader/>

                    <section className="main inner-pages">
                        <div className="section-top">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-5 col-lg-4">
                                        <AppLogo/>
                                    </div>
                                    <div className="col-sm-12 col-md-7 col-lg-5">
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-3">
                                        <div className="buttons">
                                            <DepositButton/>
                                            <button onClick={this.playLottery} className="btn btn-primary">Let's play</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-bottom">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="inner-content-wrap">
                                            <h2>{currentPage.title}</h2>
                                            <div className="content">
                                                {currentPage.content}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <AppFooter/>

                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

Page.propTypes = {
    makeRequest: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer,
        lottery: state.lotteryReducer,
        my: state.myReducer,
        page: state.pageReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest, setPage
})(Page));