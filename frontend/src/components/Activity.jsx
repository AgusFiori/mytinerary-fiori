import React from "react";
import "../styles/activity.css";

export const Activity = ({ activity }) => {
  return (
    <div className="activityContainer">
      <div className="activityPic">
        <div
          className="activity"
          style={{
            backgroundImage: `url(${activity.img})`,
            width: "300px",
            height: "200px",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      <div className="activity">{activity.activity}</div>
    </div>
  );
};
