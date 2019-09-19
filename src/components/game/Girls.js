// import React, { Component } from "react";
// // import PropTypes from "prop-types";
// import { connect } from "react-redux";

// class Girls extends Component {
//   // state = {
//   //   leftGirlID: null,
//   //   rightGirlID: null,
//   //   handsCombination: null
//   // };
//   // componentDidMount() {
//   //   this.leftGirlWaiting();
//   // }
//   // shouldComponentUpdate(nextProps, nextState) {
//   //   if (nextProps !== this.props) {
//   //     console.log("shouldComponentUpdate");
//   //     if (nextProps.leftGirlChoice || "and right is ready") {
//   //       this.leftGirlPlaying(nextProps.leftGirlChoice);
//   //     }
//   //     return true;
//   //   }
//   //   if (nextState !== this.state) {
//   //     console.log("State changed");
//   //   }
//   //   return false;
//   // }

//   // leftGirlWaiting = async () => {
//   //   const { leftGirlVideo } = this.refs;
//   //   this.setState({ intervalID: clearInterval(this.state.intervalID) });

//   //   leftGirlVideo.muted = true;
//   //   const {
//   //     leftGirl: {
//   //       inGameMovement: {
//   //         waitLong: { start, duration }
//   //       }
//   //     }
//   //   } = this.props;
//   //   leftGirlVideo.currentTime = start;
//   //   await leftGirlVideo.play();
//   //   this.setState({ leftGirlID: clearInterval(this.state.leftGirlID) });
//   //   this.setState({
//   //     leftGirlID: setInterval(() => {
//   //       leftGirlVideo.currentTime = start;
//   //       leftGirlVideo.play();
//   //     }, duration * 1000)
//   //   });
//   // };
//   // leftGirlPlaying = async choice => {
//   //   //stop waiting part
//   //   this.setState({
//   //     leftGirlID: clearInterval(this.state.leftGirlID)
//   //   });
//   //   const { leftGirlVideo } = this.refs;
//   //   leftGirlVideo.pause();

//   //   //start playing part
//   //   const { leftGirl } = this.props;
//   //   const {
//   //     inGameMovement: {
//   //       playing: { start, duration }
//   //     }
//   //   } = leftGirl;
//   //   leftGirlVideo.currentTime = start;
//   //   await leftGirlVideo.play();
//   //   setTimeout(() => {
//   //     leftGirlVideo.pause();
//   //     this.HandsCombination(choice, leftGirl, "leftGirl");
//   //   }, duration * 1000);
//   // };

//   // HandsCombination = (choice, girl, id) => {
//   //   // console.log("leftGirlHandsCombination");
//   //   const {
//   //     inGameMovement: { r, s, p }
//   //   } = girl;
//   //   const { start, duration } = eval(choice);
//   //   this.setState({
//   //     handsCombination: choice
//   //   });
//   //   console.log("state changed to ", this.state.handsCombination);
//   //   const girlVideo = document.getElementById(id);
//   //   girlVideo.currentTime = start;
//   //   girlVideo.play();
//   //   setTimeout(() => {
//   //     girlVideo.pause();
//   //   }, duration * 1000);
//   // };

//   render() {
//     const { handsCombination } = this.state;
//     console.log("rendered");
//     const { leftGirl } = this.props;
    
//   }
// }

// export default connect(mapStateToProps)(Girls);
