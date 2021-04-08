import React from "react";
import Moment from "react-moment";
const TimeComponent = ({ date }) => {
  return (
    <span>
      <Moment toNow ago>
        {date}
      </Moment>{" "}
      ago
    </span>
  );
};

export default TimeComponent;
