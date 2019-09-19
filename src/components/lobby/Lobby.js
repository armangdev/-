import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

//redux
import { chooseGirl } from "../../actions/game";
import { connect } from "react-redux";

//components
import RightGirls from "./RightGirls";
import Footer from "./Footer";
import LeftGirls from "./LeftGirls";

class Lobby extends Component {
  state = {
    selectedGirl: 6, //default
    intervalID: null
  };

  girlPlay = async (start, duration) => {
    const vidRef = document.querySelector("#player");
    this.setState({ intervalID: clearInterval(this.state.intervalID) });
    vidRef.play();
    vidRef.muted = true;
    vidRef.currentTime = start;
    await vidRef.play();
    this.setState({ intervalID: clearInterval(this.state.intervalID) });
    this.setState({
      intervalID: setInterval(() => {
        vidRef.currentTime = start;
        vidRef.play();
      }, duration * 1000)
    });
  };
  changeGirl = e => {
    const foundGirl = this.props.api.find(girl => girl.name === e.target.name);
    const {
      key,
      preGameMovement: { start, duration }
    } = foundGirl;

    this.setState({
      selectedGirl: key
    });
    this.girlPlay(start, duration);
  };
  submitPlay = key => {
    const { api } = this.props;
    const leftGirl = api[key];
    const rightGirl = api[0];
    this.props.chooseGirl({ leftGirl, rightGirl });
  };
  render() {
    const { selectedGirl } = this.state;

    return (
      <Fragment>
        <LeftGirls girlPlay={this.girlPlay} />
        <RightGirls changeGirl={this.changeGirl} selectedGirl={selectedGirl} />
        <Footer selectedGirl={selectedGirl} submitPlay={this.submitPlay} />
      </Fragment>
    );
  }
}
Lobby.propTypes = {
  chooseGirl: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    api: state.game.api
  };
};

export default connect(
  mapStateToProps,
  { chooseGirl }
)(Lobby);
