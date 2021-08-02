import React, { Fragment } from "react";
import { connect } from "react-redux";

import logo from "../../assets/images/logo-white.png";

class AppLogo extends React.Component {
  render() {
    return (
      <>
        <a href="/" className="navbar-brand logo">
          <img src={logo} className="logo" />
        </a>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppLogo);
