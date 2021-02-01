import React, { useState } from "react";
import "../styles/itinerary.css";
import { Comment } from "./Comment.jsx";
import { Activity } from "./Activity.jsx";
import { RiWheelchairFill, RiWheelchairLine } from "react-icons/ri";
import { HiCash, HiOutlineCash } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { useEffect } from "react";

export const Itinerary = ({ itinerary }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="itinerary" key={itinerary._id}>
        <div className="itineraryTitle">
          <h3>{itinerary.title}</h3>
        </div>
        <div className="content">
          <div className="author">
            <img src="../images/user-icon-male.jpg" alt="avatar" />
            <span>{itinerary.authorName}</span>
          </div>
          <div className="info">
            <div className="ratings">
              <span>
                <AiOutlineHeart />
                {" " + itinerary.likes}
              </span>
              <span>Duration: {itinerary.duration}h</span>
              <span style={{ color: "darkgreen" }}>
                {Array(itinerary.budget).fill(<HiCash />)}
                {(() => {
                  switch (itinerary.budget) {
                    case 4:
                      return <span>{Array(1).fill(<HiOutlineCash />)}</span>;
                    case 3:
                      return <span>{Array(2).fill(<HiOutlineCash />)}</span>;
                    case 2:
                      return <span>{Array(3).fill(<HiOutlineCash />)}</span>;
                    case 1:
                      return <span>{Array(4).fill(<HiOutlineCash />)}</span>;
                    default:
                      return <span>{Array(5).fill(<HiOutlineCash />)}</span>;
                  }
                })()}
              </span>
              <span>
                {itinerary.accesibility ? (
                  <RiWheelchairFill />
                ) : (
                  <RiWheelchairLine />
                )}
              </span>
            </div>
            <div className="hashtags">
              {itinerary.hashtags.map((hashtag) => {
                return (
                  <span style={{ fontSize: "18px" }} key={uuidv4()}>
                    #{hashtag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="commentsContainer">
          {visible && (
            <>
              <div className="activities">
                {itinerary.activities.map((activity) => {
                  return <Activity key={uuidv4()} activity={activity} />;
                })}
              </div>
              <div className="comments">
                {itinerary.comments.map((comment) => {
                  return <Comment key={uuidv4()} comment={comment} />;
                })}
              </div>
              <div className="commentInput">
                <input
                  type="text"
                  placeholder="Must be logged in to comment!"
                  disabled
                />
                <button className="ingresarComentario" disabled>
                  <AiOutlineSend />
                </button>
              </div>
            </>
          )}
          <div className="buttonContainer">
            <button onClick={() => setVisible(!visible)}>
              View {visible ? "Less" : "More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
