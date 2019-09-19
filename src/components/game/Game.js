import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  rsp,
  rspWinner,
  disableButtons,
  setIntervalID,
  clearIntervalID,
  setWaiting,
  clearWaiting,
  setReady,
  clearReady
} from "../../actions/game";
import { Link } from "react-router-dom";

class Game extends Component {
  componentDidMount() {
    this.bothWaiting();
    //just testing
    this.props.setReady("rightGirl");
  }
  componentWillUnmount() {
    this.props.clearIntervalID("leftGirl", this.props.intervalID["leftGirl"]);
    this.props.clearIntervalID("rightGirl", this.props.intervalID["rightGirl"]);
  }

  submitRSP = async choice => {
    await this.props.setReady("leftGirl");
    const left_is_ready = this.props.ready.leftGirl;
    const right_is_ready = this.props.ready.rightGirl;
    console.log(left_is_ready, right_is_ready);
    if (left_is_ready && right_is_ready) {
      setTimeout(() => {
        this.props.clearReady("leftGirl");
        this.props.clearReady("rightGirl");
        this.props.disableButtons();
        this.playingPart(choice, "leftGirl");
        this.playingPart("p", "rightGirl");
      }, 500);
    }
  };

  waitingPart = dirGirl => {
    const video = document.querySelector(`#${dirGirl}`);
    const start = this.props[dirGirl].inGameMovement.waitLong.start;
    const duration = this.props[dirGirl].inGameMovement.waitLong.duration;
    this.props.setWaiting(dirGirl, start, duration);
    this.props.clearIntervalID(dirGirl, this.props.intervalID[dirGirl]);
    this.props.setIntervalID(dirGirl, video, start, duration);
  };
  bothWaiting = () => {
    this.waitingPart("leftGirl");
    this.waitingPart("rightGirl");
  }

  playingPart = async (choice, dirGirl) => {
    this.props.clearWaiting(dirGirl);
    this.props.clearIntervalID(dirGirl, this.props.intervalID[dirGirl]);
    const video = document.querySelector(`#${dirGirl}`);
    await video.pause();
    const girl = this.props[dirGirl];
    const {
      inGameMovement: {
        playing: { start, duration }
      }
    } = girl;
    console.log(dirGirl, duration);
    video.currentTime = start;
    await video.play();
    setTimeout(async () => {
      await video.pause();
      this.handsCombinationPart(choice, girl, dirGirl);
    }, duration * 1000);
  };

  handsCombinationPart = async (choice, girl, dirGirl) => {
    const {
      inGameMovement: { r, s, p }
    } = girl;
    const { start, duration } = eval(choice);
    console.log(dirGirl, duration);
    this.props.rsp(dirGirl, choice, girl.inGameMovement.waitLong);
    const video = document.getElementById(dirGirl);
    video.currentTime = start;
    await video.play();
    setTimeout(async () => {
      await video.pause();
      const leftChoice = this.props.choices.leftGirl;
      const rightChoice = this.props.choices.rightGirl;
      this.props.rspWinner(leftChoice, rightChoice);
    }, duration * 1000);
  };
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
  winner: PropTypes.string,

  //functions
  rsp: PropTypes.func.isRequired,
  rspWinner: PropTypes.func.isRequired,
  disableButtons: PropTypes.func.isRequired,
  setIntervalID: PropTypes.func.isRequired,
  clearIntervalID: PropTypes.func.isRequired,
  setWaiting: PropTypes.func.isRequired,
  clearWaiting: PropTypes.func.isRequired,
  setReady: PropTypes.func.isRequired,
  clearReady: PropTypes.func.isRequired
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
    ready: state.game.ready
  };
};

export default connect(
  mapStateToProps,
  {
    rsp,
    rspWinner,
    disableButtons,
    setIntervalID,
    clearIntervalID,
    setWaiting,
    clearWaiting,
    setReady,
    clearReady
  }
)(Game);
