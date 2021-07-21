import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {getBySlug, getTitleFromSlug} from "../../utils/helper/helperFunctions";
import {withRouter} from "react-router-dom";
import {setPage} from "../../actions/pageActions";

class MetaTags extends Component {

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

    render() {
        const {slug} = this.props.match.params;
        const {pages} = this.props.page;

        // Set to home page by default so that all meta are from home page
        // Other pages will override as needed
        let currentPage = getBySlug(pages, 'home');
        // Can be set from backend as well but blank is fine for homepage
        // let title = currentPage.title;
        let title = "";

        // Other pages
        if (slug) {
            currentPage = getBySlug(pages, slug);
            title = currentPage.title;

            if (!title) {
                title = getTitleFromSlug(this.props.match.url);
            }
        } else {
            title = getTitleFromSlug(this.props.match.url);
        }

        return (
            <Helmet>
                <title>{title ? title + ' - ' : ''} Lotterycamp</title>
                {
                    currentPage.seo && currentPage.seo.meta_title &&
                    <meta name="title" content={currentPage.seo.meta_title} />
                }
                {
                    currentPage.seo && currentPage.seo.meta_description &&
                    <meta name="description" content={currentPage.seo.meta_description} />
                }
                {
                    title &&
                    <meta name="og:title" content={title} />
                }
                {
                    currentPage.seo && currentPage.seo.meta_description &&
                    <meta name="og:description" content={currentPage.seo.meta_description} />
                }
                {
                    currentPage.seo && currentPage.seo.og_image &&
                    <meta name="og:image" content={currentPage.seo.og_image} />
                }
                <meta name="twitter:card" content="summary_large_image" />
                {
                    title &&
                    <meta name="twitter:title" content={title} />
                }
                {
                    currentPage.seo && currentPage.seo.meta_description &&
                    <meta name="twitter:description" content={currentPage.seo.meta_description} />
                }
                {
                    currentPage.seo && currentPage.seo.og_image &&
                    <meta name="twitter:image" content={currentPage.seo.og_image} />
                }
            </Helmet>
        )
    }
}

function mapStateToProps(state) {
    return {
        page: state.pageReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest, setPage
})(MetaTags));