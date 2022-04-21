import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const Notification = ({ color, text }) => {
  return (
    <Card id={"notification"} sx={{ backgroundColor: color}}>
      <CardContent>
        <Typography>{text}!</Typography>
      </CardContent>
    </Card>
  );
};

Notification.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
