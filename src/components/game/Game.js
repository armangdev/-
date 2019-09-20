import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  rsp,
  rspWinner,
  hideButtons,
  setIntervalID,
  clearIntervalID,
  waitingFull,
  setReady,
  clearReady,
  clearReadyBoth,
  playingFull,
  clearPlaying,
  clearPlayingBoth
} from "../../actions/game";

class Game extends Component {
  componentDidMount() {
    this.bothWaiting();
    //just for testing
    this.props.setReady("rightGirl");
  }

  componentWillUnmount() {
    this.props.clearIntervalID("leftGirl", this.props.intervalID["leftGirl"]);
    this.props.clearIntervalID("rightGirl", this.props.intervalID["rightGirl"]);
  }

  //_____________________waiting_____________________
  waitingPart = dirGirl => {
    const start = this.props[dirGirl].inGameMovement.waitLong.start;
    const duration = this.props[dirGirl].inGameMovement.waitLong.duration;
    const prevIntervalID = this.props.intervalID[dirGirl];
    this.props.waitingFull(dirGirl, start, duration, prevIntervalID);
  };

  bothWaiting = () => {
    this.waitingPart("leftGirl");
    this.waitingPart("rightGirl");
  };

  submitRSP = async choice => {
    await this.props.setReady("leftGirl");
    const left_is_ready = this.props.ready.leftGirl;
    const right_is_ready = this.props.ready.rightGirl;

    //both ready
    if (left_is_ready && right_is_ready) {
      setTimeout(() => {
        this.bothPlaying(choice);
      }, 500);
    }
  };
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@END@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  //__________________________playing__________________________
  playingPart = async dirGirl => {
    const girl = this.props[dirGirl];
    const {
      inGameMovement: {
        playing: { start, duration }
      }
    } = girl;
    this.props.setIntervalID(dirGirl, start, duration);
  };

  bothPlaying = async (leftChoice, rightChoice = "p") => {
    await this.props.playingFull(this.props.intervalID);
    this.playingPart("leftGirl");
    this.playingPart("rightGirl");
    // setTimeout(() => {
    //   this.handsCombinationPart(choice, girl, dirGirl);
    // }, duration * 1000);
  };
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@END@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  //____________________hands-shake____________________
  handsCombinationPart = async (choice, girl, dirGirl) => {
    //hands shake partrspWinner
    const {
      inGameMovement: { r, s, p }
    } = girl;
    const { start, duration } = eval(choice);
    this.props.rsp(dirGirl, choice, girl.inGameMovement.waitLong);
    const video = document.getElementById(dirGirl);
    video.currentTime = start;

    await video.play();

    //stop hands shake
    setTimeout(async () => {
      await video.pause();
      const leftChoice = this.props.choices.leftGirl;
      const rightChoice = this.props.choices.rightGirl;
      this.props.rspWinner(leftChoice, rightChoice);
    }, duration * 1000);
  };
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@END@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  render() {
    return (
      <section className="game">
        <div className="game-details">
          <Link className="back" to="/">
            Back to Lobby
          </Link>
          <div className="cash">
            <div className={` ${this.props.winner}-winner cash-to-winner`}>
              {[...Array(5)].map((elem, key) => (
                <img key={key} alt="" src={this.props.otherStuff.chip} />
              ))}
            </div>
            <div className="cash-left">
              {[...Array(5)].map((elem, key) => (
                <img key={key} alt="" src={this.props.otherStuff.chip} />
              ))}
            </div>
            <div className="cash-center">
              <h3 className="money">$0</h3>
            </div>
            <div className="cash-right">
              {[...Array(5)].map((elem, key) => (
                <img key={key} alt="" src={this.props.otherStuff.chip} />
              ))}
            </div>
          </div>
        </div>

        <div className="game-girls">
          <div className="left-girl">
            <video
              key={
                this.props.choices.leftGirl
                  ? this.props.otherStuff.hands_combination
                  : this.props.leftGirl.videoSrc
              }
              ref="leftGirlVideo"
              id="leftGirl"
              className={`video`}
              muted="muted"
              preload="auto"
              loop
            >
              {this.props.choices.leftGirl ? (
                <source
                  src={this.props.otherStuff.hands_combination}
                  type="video/webm"
                />
              ) : (
                <source src={this.props.leftGirl.videoSrc} type="video/webm" />
              )}
            </video>
            <div
              className={`${
                this.props.ready.leftGirl ? "" : "invisible"
              } ready-message`}
            >
              <p>Ready!</p>
            </div>
          </div>
          <div className="right-girl">
            <video
              key={
                this.props.choices.rightGirl
                  ? this.props.otherStuff.hands_combination
                  : this.props.rightGirl.videoSrc
              }
              ref="rightGirlVideo"
              id="rightGirl"
              className={`video`}
              muted="muted"
              preload="auto"
              loop
            >
              {this.props.choices.rightGirl ? (
                <source
                  src={this.props.otherStuff.hands_combination}
                  type="video/webm"
                />
              ) : (
                <source src={this.props.rightGirl.videoSrc} type="video/webm" />
              )}
            </video>
            <div
              className={`${
                this.props.ready.rightGirl ? "" : "invisible"
              } ready-message`}
            >
              <p>Ready!</p>
            </div>
          </div>
        </div>

        <div className={`game-rsp`}>
          <div
            onClick={() => {
              this.submitRSP("r");
            }}
            className="box game-rsp-box "
          >
            Rock
          </div>
          <div
            onClick={() => {
              this.submitRSP("s");
            }}
            className="box game-rsp-box "
          >
            Scissors
          </div>
          <div
            onClick={() => {
              this.submitRSP("p");
            }}
            className="box game-rsp-box "
          >
            Paper
          </div>
        </div>
        <div className="game-options">
          <div className="box game-options-box" />
          <div className="box game-options-box" />
          <div className="box game-options-box" />
        </div>
        <div className="game-chat">
          <div className="box game-chat-box" />
        </div>
      </section>
    );
  }
}

Game.propTypes = {
  //variables
  leftGirl: PropTypes.object,
  rightGirl: PropTypes.object,
  otherStuff: PropTypes.object,
  choices: PropTypes.object,
  intervalID: PropTypes.object,
  waiting: PropTypes.object,
  ready: PropTypes.object,
  playing: PropTypes.object,
  winner: PropTypes.string,

  //functions
  rsp: PropTypes.func.isRequired,
  rspWinner: PropTypes.func.isRequired,
  hideButtons: PropTypes.func.isRequired,
  setIntervalID: PropTypes.func.isRequired,
  clearIntervalID: PropTypes.func.isRequired,
  waitingFull: PropTypes.func.isRequired,

  setReady: PropTypes.func.isRequired,
  clearReady: PropTypes.func.isRequired,
  clearReadyBoth: PropTypes.func.isRequired,
  playingFull: PropTypes.func.isRequired,
  clearPlaying: PropTypes.func.isRequired,
  clearPlayingBoth: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    leftGirl: state.game.girls.leftGirl,
    rightGirl: state.game.girls.rightGirl,
    otherStuff: state.game.otherStuff,
    choices: state.game.choices,
    winner: state.game.winner,
    intervalID: state.game.intervalID,
    waiting: state.game.waiting,
    ready: state.game.ready,
    playing: state.game.playing
  };
};

export default connect(
  mapStateToProps,
  {
    rsp,
    rspWinner,
    hideButtons,
    setIntervalID,
    clearIntervalID,
    waitingFull,

    setReady,
    clearReady,
    clearReadyBoth,
    playingFull,
    clearPlaying,
    clearPlayingBoth
  }
)(Game);
