import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  dogs: {},
  status: "idle",
};

export const fetchDogs = createAsyncThunk("app/fetchDogs", async () => {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  const breeds = Object.keys(data.message);
  const dogs = {};

  for (let i = 0; i < 20; i++) {
    const dogResponse = await fetch(
      "https://dog.ceo/api/breed/pug/images/random"
    );
    const data = await dogResponse.json();
    const dogImage = data.message;
    const randomBreedIndex = Math.floor(Math.random() * 12); // 12 to force having some breeds with multiple dogs
    dogs[dogImage] = {
      imageUrl: dogImage,
      breed: breeds[randomBreedIndex],
      likes: 0,
    };
  }

  console.log(dogs);

  return dogs;
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    like: (state, { payload: imageUrl }) => {
      state.dogs[imageUrl].likes++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDogs.fulfilled, (state, action) => {
        state.dogs = action.payload;
        state.status = "done";
      });
  },
});

export const { like } = appSlice.actions;

// export const summary = (state) => {
//   Object.entries(state.dogs).forEach(([breed, dogs]) => {
//     const likes = dogs.reduce((likes, curr) => likes + curr.likes, 0);
//     const stats = { count: dogs.length, likes }
//     summary[breed] = stats;
//   })
// }

export default appSlice.reducer;
