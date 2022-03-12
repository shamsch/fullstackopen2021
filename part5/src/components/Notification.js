import PropTypes from 'prop-types'

export const Notification = ({color, text}) => {
  return (
    <div id={"notification"} style={{"background-color":`${color}`}}>{text}</div>
  )
}

Notification.propTypes ={
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}
