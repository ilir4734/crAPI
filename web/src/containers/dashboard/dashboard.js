import React, { useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "antd";
import {
  getVehiclesAction,
  refreshLocationAction,
  resendMailAction,
} from "../../actions/vehicleActions";
import Dashboard from "../../components/dashboard/dashboard";
import responseTypes from "../../constants/responseTypes";
import { FAILURE_MESSAGE, SUCCESS_MESSAGE } from "../../constants/messages";

const DashboardContainer = (props) => {
  const {
    history,
    accessToken,
    getVehicles,
    resendMail,
    refreshLocation,
  } = props;

  useEffect(() => {
    const callback = () => {};
    getVehicles({ callback, accessToken });
  }, [accessToken, getVehicles]);

  const handleRefreshLocation = (carId) => {
    const callback = (res, data) => {
      if (res !== responseTypes.SUCCESS)
        Modal.error({
          title: FAILURE_MESSAGE,
          content: data,
        });
    };
    refreshLocation({ callback, accessToken, carId });
  };

  const handleResendMail = () => {
    const callback = (res, data) => {
      if (res === responseTypes.SUCCESS) {
        Modal.success({
          title: SUCCESS_MESSAGE,
          content: data,
        });
      } else {
        Modal.error({
          title: FAILURE_MESSAGE,
          content: data,
        });
      }
    };
    resendMail({ callback, accessToken });
  };

  return (
    <Dashboard
      history={history}
      refreshLocation={handleRefreshLocation}
      resendMail={handleResendMail}
    />
  );
};

const mapStateToProps = ({ userReducer: { accessToken } }) => {
  return { accessToken };
};

const mapDispatchToProps = {
  getVehicles: getVehiclesAction,
  refreshLocation: refreshLocationAction,
  resendMail: resendMailAction,
};

DashboardContainer.propTypes = {
  accessToken: PropTypes.string,
  getVehicles: PropTypes.func,
  resendMail: PropTypes.func,
  refreshLocation: PropTypes.func,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
