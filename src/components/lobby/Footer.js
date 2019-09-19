import React from "react";
import { Link } from "react-router-dom";

const Footer = ({selectedGirl, submitPlay}) => {
  return (
    <div className="footer">
      <Link
        onClick={() =>submitPlay(selectedGirl)}
        to="/game"
        className="btn btn-danger btn-lg button"
      >
        PLAY
      </Link>
    </div>
  );
};


export default Footer;
