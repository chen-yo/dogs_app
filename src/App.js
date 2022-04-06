/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogs } from "./app/appSlice";
import Gallery from "./components/Gallery";
import Summary from "./components/Summary";

const Header = styled.header`
  text-align: center;
  background-color: #ff694b;
  padding: 2px;
`;

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);

  useEffect(() => {
    dispatch(fetchDogs());
  }, []);

  if (status === "loading" || status === "idle") {
    return (
      <div
        css={css`
          background-color: #fee;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <h2>Loading images...</h2>
      </div>
    );
  }

  return (
    <div>
      <Header>
        <h1>Dogs Gallery App</h1>
      </Header>
      <div
        css={css`
          display: flex;
        `}
      >
        <div
          css={css`
            flex: 15%;
          `}
        >
          <Summary />
        </div>
        <div
          css={css`
            flex: 85%;
          `}
        >
          <Gallery />
        </div>
      </div>
    </div>
  );
}

export default App;
