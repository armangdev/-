// import uuid from "uuid";
import {
  GIRL_CHOSEN,
  CHOICE,
  WINNER,
  SET_INTERVAL_ID,
  CLEAR_INTERVAL_ID,
  SET_WAITING,
  CLEAR_WAITING,
  SET_READY,
  CLEAR_READY
} from "./constants";

//________________Intervals__________________
export const setIntervalID = (
  dirGirl,
  video,
  start,
  duration
) => async dispatch => {
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

export const clearIntervalID = (dirGirl, previous) => dispatch => {
  const intervalObj = {
    [dirGirl]: clearInterval(previous)
  };
  dispatch({
    type: CLEAR_INTERVAL_ID,
    payload: intervalObj
  });
};
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//_______________WAITING______________
export const setWaiting = (dirGirl, start, duration) => dispatch => {
  dispatch({
    type: SET_WAITING,
    payload: { [dirGirl]: { start, duration } }
  });
};
export const clearWaiting = dirGirl => dispatch => {
  dispatch({
    type: CLEAR_WAITING,
    payload: { [dirGirl]: null }
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
//@@@@@@@@@@@@@@@@@@@@@@@@@@@

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
// ____________________RSP_________________________
export const rsp = (dirGirl, choice, waitLong) => dispatch => {
  dispatch({
    type: CHOICE,
    payload: { [dirGirl]: choice }
  });
  //happens when both girls finish playing and someone is winner
  setTimeout(() => {
    dispatch({
      type: CHOICE,
      payload: { [dirGirl]: null }
    });
    dispatch({
      type: WINNER,
      payload: null
    });

    const { start, duration } = waitLong;
    dispatch(setWaiting(dirGirl, 0, 3));

    dispatch(
      setIntervalID(
        dirGirl,
        document.querySelector(`#${dirGirl}`),
        start,
        duration
      )
    );

    dispatch(setReady("rightGirl"));
  }, (2.6 + 1.44) * 1000);
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
  const cash = document.querySelector(".cash-to-winner");
  cash.classList.add("active");

  setTimeout(async () => {
    cash.classList.remove("active");
  }, 2000);
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//__________________Others_______________________
export const chooseGirl = girls => dispatch => {
  dispatch({
    type: GIRL_CHOSEN,
    payload: girls
  });
};
export const disableButtons = () => dispatch => {
  const buttons = document.querySelector(".game-rsp");
  buttons.classList.add("disabled");
  buttons.classList.add("invisible");
  setTimeout(() => {
    buttons.classList.remove("disabled");
    buttons.classList.remove("invisible");
  }, (2.6 + 1.44 + 2 + 2) * 1000);
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
