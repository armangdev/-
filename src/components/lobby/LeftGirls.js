import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const LeftGirls = ({ girlPlay, preGameByDefault, otherStuff }) => {
  const [visibility, setVisibility] = useState("hidden");

  useEffect(() => {
    const { start, duration } = preGameByDefault;
    setTimeout(() => setVisibility("visible"), 1500);
    girlPlay(start, duration);
  }, [girlPlay, preGameByDefault]);

  return (
    <div className="left-girls">
      <video
        style={{ visibility }}
        id="player"
        className="video"
        muted="muted"
        preload="none"
        controlsList="nofullscreen nodownload"
      >
        <source src={otherStuff.lobby} type="video/webm" />
      </video>
    </div>
  );
};

LeftGirls.propTypes = {
  preGameByDefault: PropTypes.object,
  otherStuff: PropTypes.object
};
const mapStateToProps = state => {
  return {
    preGameByDefault: state.game.preGameByDefault,
    otherStuff: state.game.otherStuff
  };
};
export default connect(mapStateToProps)(LeftGirls);
