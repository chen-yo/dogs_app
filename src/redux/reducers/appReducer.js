import {
  FETCH_DOGS_START,
  FETCH_DOGS_SUCCESS,
  FETCH_DOGS_FAILED,
  LIKE,
} from "../actions/types";

export function reducer(state, action) {
  switch (action.type) {
    case FETCH_DOGS_START: {
      return {
        ...state,
        status: "pending",
      };
    }

    case FETCH_DOGS_SUCCESS: {
      return {
        ...state,
        status: "resolved",
        dogs: action.payload,
      };
    }

    case FETCH_DOGS_FAILED: {
      return {
        ...state,
        status: "rejected",
      };
    }

    case LIKE: {
      const imageUrl = action.payload;
      const newDogs = new Map(
        JSON.parse(JSON.stringify(Array.from(state.dogs)))
      );
      const dogToLike = newDogs.get(imageUrl);
      dogToLike.likes++;

      return {
        ...state,
        dogs: newDogs,
      };
    }

    default:
      return state;
  }
}
