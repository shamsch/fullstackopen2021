import { useSelector } from "react-redux";
import { connect } from "react-redux";

const Notification = (props) => {
  const getNotification = () => {
    return props.notification
  };

  const notification = getNotification();
  
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (notification !== "") {
    return <div style={style}>{notification}</div>;
  }
  return <></>
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification;
