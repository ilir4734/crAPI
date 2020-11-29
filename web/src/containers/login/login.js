import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Login from "../../components/login/login";
import { logInUserAction } from "../../actions/userActions";
import responseTypes from "../../constants/responseTypes";

const LoginContainer = (props) => {
  const { history, logInUser } = props;

  const [hasErrored, setHasErrored] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const callback = (res, data) => {
    if (res === responseTypes.SUCCESS) {
      history.push("/dashboard");
    } else {
      setHasErrored(true);
      setErrorMessage(data);
    }
  };

  const onFinish = (values) => {
    logInUser({ ...values, callback });
  };

  return (
    <Login
      hasErrored={hasErrored}
      errorMessage={errorMessage}
      onFinish={onFinish}
      history={history}
    />
  );
};

const mapDispatchToProps = {
  logInUser: logInUserAction,
};

LoginContainer.propTypes = {
  logInUser: PropTypes.func,
  history: PropTypes.object,
};

export default connect(null, mapDispatchToProps)(LoginContainer);
