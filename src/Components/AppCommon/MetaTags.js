import React from 'react';
import {Helmet} from "react-helmet";

const MetaTags = (props) =>  {
    const {title, seo} = props;
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="title" content={seo.meta_title} />
            <meta name="description" content={seo.meta_description} />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={seo.meta_description} />
            <meta name="og:image" content={seo.og_image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={seo.meta_description} />
            <meta name="twitter:image" content={seo.og_image} />
        </Helmet>
    )
};

export default MetaTags;