// import React, { Fragment } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { rsp } from "../../actions/game";

// const Buttons = ({ rsp, leftGirl, rightGirl }) => {
//   // const [leftVideoID, setLeftVideoID] = useState(null);
//   const submitRSP = async sign => {
//     rsp(sign);
//   };

//   return (
//     <Fragment>
//       <div className="game-rsp">
//         <div
//           onClick={() => {
//             submitRSP("r");
//           }}
//           className="box game-rsp-box "
//         >
//           Rock
//         </div>
//         <div
//           onClick={() => {
//             submitRSP("s");
//           }}
//           className="box game-rsp-box "
//         >
//           Scissors
//         </div>
//         <div
//           onClick={() => {
//             submitRSP("p");
//           }}
//           className="box game-rsp-box "
//         >
//           Paper
//         </div>
//       </div>
//       <div className="game-options">
//         <div className="box game-options-box" />
//         <div className="box game-options-box" />
//         <div className="box game-options-box" />
//       </div>
//       <div className="game-chat">
//         <div className="box game-chat-box" />
//       </div>
//     </Fragment>
//   );
// };
// Buttons.propTypes = {
//   rsp: PropTypes.func.isRequired,
//   leftGirl: PropTypes.object,
//   rightGirl: PropTypes.object
// };

// const mapStateToProps = state => {
//   return {
//     leftGirl: state.game.girls.leftGirl,
//     rightGirl: state.game.girls.rightGirl
//   };
// };

// export default connect(
//   mapStateToProps,
//   { rsp }
// )(Buttons);
