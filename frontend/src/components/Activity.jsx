import React from "react";
import "../styles/activity.css";

export const Activity = ({ activity }) => {
  return (
    <div className="activityContainer">
      <div className="activityPic">
        <img src={activity.img} alt="activity" />
      </div>
      <div className="activity">{activity.activity}</div>
    </div>
  );
};
