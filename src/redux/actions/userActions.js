import { LIKE } from "./types";

const likeAction = (imageUrl) => {
  return { type: LIKE, payload: imageUrl };
};

export const like = (imageUrl) => (dispatch) => {
  dispatch(likeAction(imageUrl));
};
