import { FETCH_DOGS_START, FETCH_DOGS_SUCCESS, FETCH_DOGS_FAILED } from "./types";

const fetchDogsStartAction = () => {
    return { type: FETCH_DOGS_START };
  };
  
  const fetchDogsSuccessAction = (dogs) => {
    return { type: FETCH_DOGS_SUCCESS, payload: dogs };
  };
  
  const fetchDogsFailedAction = () => {
    return { type: FETCH_DOGS_FAILED };
  };
  

  export const fetchDogs = () => async (dispatch) => {
    dispatch(fetchDogsStartAction());
  
    try {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      const data = await response.json();
      const breeds = Object.keys(data.message);
      const dogs = new Map();
  
      for (let i = 0; i < 20; i++) {
        const dogResponse = await fetch(
          "https://dog.ceo/api/breed/pug/images/random"
        );
        const data = await dogResponse.json();
        const dogImage = data.message;
        const randomBreedIndex = Math.floor(Math.random() * 12); // 12 to force having some breeds with multiple dogs
        dogs.set(dogImage, {
          imageUrl: dogImage,
          breed: breeds[randomBreedIndex],
          likes: 0,
        });
      }
  
      dispatch(fetchDogsSuccessAction(dogs));
    } catch (error) {
      console.error(
        "Failed to fetch dogs, check your internet connection",
        error
      );
      dispatch(fetchDogsFailedAction());
    }
  };