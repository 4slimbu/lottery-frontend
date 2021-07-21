import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const AnimatedSection = (props) =>  {
    return (
        <ReactCSSTransitionGroup
            transitionName="animated-section"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
            { props.children }
        </ReactCSSTransitionGroup>
    )
};

export default AnimatedSection;