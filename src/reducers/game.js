import {
  GIRL_CHOSEN,
  CHOICE,
  WINNER,
  SET_INTERVAL_ID,
  CLEAR_INTERVAL_ID,
  SET_WAITING,
  CLEAR_WAITING,
  SET_READY,
  CLEAR_READY,
} from "../actions/constants";
import api from "../api/mainApi";
import { otherStuff } from "../api/shorts";

const initialState = {
  api,
  otherStuff,
  preGameByDefault: {
    key: 6,
    start: api[6].preGameMovement.start,
    duration: api[6].preGameMovement.duration
  },
  girls: {
    leftGirl: null,
    rightGirl: null
  },
  choices: {
    leftGirl: null,
    rightGirl: null
  },
  intervalID: {
    leftGirl: null,
    rightGirl: null
  },
  waiting: {
    leftGirl: null,
    rightGirl: null
  },
  ready: {
    leftGirl: null,
    rightGirl: null
  },
  winner: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GIRL_CHOSEN:
      const { leftGirl, rightGirl } = payload;
      return {
        ...state,
        girls: {
          leftGirl,
          rightGirl
        }
      };
    case CHOICE:
      const allChoices = state.choices;
      return {
        ...state,
        choices: {
          ...allChoices,
          ...payload
        }
      };

    case SET_INTERVAL_ID:
    case CLEAR_INTERVAL_ID:
      return {
        ...state,
        intervalID: {
          ...state.intervalID,
          ...payload
        }
      };

    case WINNER:
      return {
        ...state,
        winner: payload
      };
    case SET_WAITING:
    case CLEAR_WAITING:
      return {
        ...state,
        waiting: {
          ...state.waiting,
          ...payload
        }
      };
      case SET_READY:
        case CLEAR_READY:
          return {
            ...state,
            ready: {
              ...state.ready,
              ...payload
            }
          };
    default:
      return state;
  }
}
