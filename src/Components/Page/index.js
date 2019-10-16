import React, {Component, Fragment} from 'react'
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import 'react-table/react-table.css'
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {getBySlug} from "../../utils/helper/helperFunctions";
import ContactUs from "./ContactUs";
import withLayout from "../HOC/withLayout";
import PastWinners from "./PastWinners";

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };

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

        if (slug === 'contact' || slug === 'winners') {
            return;
        }

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
            <Fragment>
                { slug === 'contact' && <ContactUs {...this.props}/> }

                { slug === 'winners' && <PastWinners {...this.props}/> }

                {
                    slug !== 'contact' && slug !== 'winners' &&
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
                }
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


export default withLayout(Page);