// import uuid from "uuid";
import {
  GIRL_CHOSEN,
  WINNER,
  SET_INTERVAL_ID,
  CLEAR_INTERVAL_ID,
  SET_CHOICE,
  CLEAR_CHOICE,
  SET_WAITING,
  CLEAR_WAITING,
  SET_READY,
  CLEAR_READY,
  SET_PLAYING,
  CLEAR_PLAYING,
} from "./constants";

//________________Intervals__________________
export const setIntervalID = (dirGirl, start, duration) => async dispatch => {
  const video = document.querySelector(`#${dirGirl}`);
  video.muted = true;
  video.currentTime = start;
  await video.play();
  const intervalObj = {
    [dirGirl]: setInterval(async () => {
      video.currentTime = start;
      await video.play();
    }, duration * 1000)
  };
  dispatch({
    type: SET_INTERVAL_ID,
    payload: intervalObj
  });
};

export const clearIntervalID = (dirGirl, prevIntervalID) => dispatch => {
  const intervalObj = {
    [dirGirl]: clearInterval(prevIntervalID)
  };
  dispatch({
    type: CLEAR_INTERVAL_ID,
    payload: intervalObj
  });
};
export const clearIntervalIDBoth = intevalID => dispatch => {
  const intervalObj = {
    leftGirl: clearInterval(intevalID.leftGirl),
    rightGirl: clearInterval(intevalID.rightGirl)
  };
  dispatch({
    type: CLEAR_INTERVAL_ID,
    payload: intervalObj
  });
};
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@END@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//_______________WAITING______________
export const waitingFull = (
  dirGirl,
  start,
  duration,
  prevIntervalID
) => dispatch => {
  dispatch(setWaiting(dirGirl, start, duration));
  dispatch(clearIntervalID(dirGirl, prevIntervalID));
  dispatch(setIntervalID(dirGirl, start, duration));
};
export const setWaiting = (dirGirl, start, duration) => dispatch => {
  dispatch({
    type: SET_WAITING,
    payload: { [dirGirl]: { start, duration } }
  });
};

export const clearWaitingBoth = () => dispatch => {
  dispatch({
    type: CLEAR_WAITING,
    payload: {
      leftGirl: null,
      rightGirl: null
    }
  });
};
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@END@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//_______________READY______________
export const setReady = dirGirl => dispatch => {
  dispatch({
    type: SET_READY,
    payload: { [dirGirl]: true }
  });
};
export const clearReady = dirGirl => dispatch => {
  dispatch({
    type: CLEAR_READY,
    payload: { [dirGirl]: null }
  });
};

export const clearReadyBoth = () => dispatch => {
  dispatch({
    type: CLEAR_READY,
    payload: {
      leftGirl: null,
      rightGirl: null
    }
  });
};
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@END@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//_______________CHOICE______________
export const setChoice = dirGirl => dispatch => {
  dispatch({
    type: SET_CHOICE,
    payload: { [dirGirl]: true }
  });
};

export const clearChoice = dirGirl => dispatch => {
  dispatch({
    type: CLEAR_CHOICE,
    payload: { [dirGirl]: null }
  });
};

export const clearChoiceBoth = () => dispatch => {
  dispatch({
    type: CLEAR_CHOICE,
    payload: {
      leftGirl: null,
      rightGirl: null
    }
  });
};
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@END@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//_______________PLAYING______________
export const playingFull = intervalID => dispatch => {
  //clear
  dispatch(clearReadyBoth());
  dispatch(clearWaitingBoth());
  dispatch(clearIntervalIDBoth(intervalID));
  dispatch(hideButtons());

  //set
  dispatch(setPlayingBoth());
};

export const setPlayingBoth = () => dispatch => {
  dispatch({
    type: SET_PLAYING,
    payload: {
      leftGirl: true,
      rightGirl: true
    }
  });
};
export const clearPlaying = dirGirl => dispatch => {
  dispatch({
    type: CLEAR_PLAYING,
    payload: { [dirGirl]: null }
  });
};

export const clearPlayingBoth = () => dispatch => {
  dispatch({
    type: CLEAR_PLAYING,
    payload: {
      leftGirl: null,
      rightGirl: null
    }
  });
};
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@END@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// ____________________RSP_________________________

export const finishHandsPart = (dirGirl, waitLong) => dispatch => {
  const { start, duration } = waitLong;
  setTimeout(() => {
    dispatch({
      type: CLEAR_CHOICE,
      payload: { [dirGirl]: null }
    });
    dispatch({
      type: WINNER,
      payload: null
    });
    dispatch(setWaiting(dirGirl, start, duration));

    dispatch(setIntervalID(dirGirl, start, duration));
    dispatch(setReady("rightGirl"));
  }, (2.6 + 1.44) * 1000);
};
export const rsp = (dirGirl, choice, waitLong) => dispatch => {
  dispatch({
    type: SET_CHOICE,
    payload: { [dirGirl]: choice }
  });
  //happens when both girls finish playing and someone is winner
  dispatch(finishHandsPart(dirGirl, waitLong));
};

export const rspWinner = (leftChoice, rightChoice) => dispatch => {
  const [r, p, s] = [0, 1, 2];
  [leftChoice, rightChoice] = [eval(leftChoice), eval(rightChoice)];

  if (leftChoice === rightChoice) {
    dispatch({
      type: WINNER,
      payload: "draw"
    });
  } else if ((leftChoice + 1) % 3 === rightChoice) {
    dispatch({
      type: WINNER,
      payload: "right"
    });
  } else {
    dispatch({
      type: WINNER,
      payload: "left"
    });
  }

  //Cash animation
  dispatch(cashAnimation());
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@END@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//__________________Others_______________________
export const chooseGirl = girls => dispatch => {
  dispatch({
    type: GIRL_CHOSEN,
    payload: girls
  });
};
export const hideButtons = () => dispatch => {
  const buttons = document.querySelector(".game-rsp");
  buttons.classList.add("disabled");
  buttons.classList.add("invisible");
  setTimeout(() => {
    buttons.classList.remove("disabled");
    buttons.classList.remove("invisible");
  }, (2.6 + 1.44 + 2 + 2) * 1000);
};
export const cashAnimation = () => dispatch => {
  const cash = document.querySelector(".cash-to-winner");
  cash.classList.add("active");

  setTimeout(() => {
    cash.classList.remove("active");
  }, 2000);
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@END@@@@@@@@@@@@@@@@@@@@@@@@@@@@

