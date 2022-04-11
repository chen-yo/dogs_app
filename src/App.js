/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import Gallery from "./components/Gallery";
import Summary from "./components/Summary";
import { connect } from "react-redux";
import { fetchDogs as fetchDogsAction } from "./redux/actions/appActions";
import { like as likeAction } from "./redux/actions/userActions";

const Header = styled.header`
  text-align: center;
  background-color: #ff694b;
  padding: 2px;
`;

function App({ status, dogs, fetchDogs, like }) {

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  if (status === "pending" || status === "idle") {
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

  const dogValues = [...dogs.values()];

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
          <Summary dogs={dogValues} />
        </div>
        <div
          css={css`
            flex: 85%;
          `}
        >
          <Gallery dogs={dogValues} onLike={(imageUrl) => like(imageUrl)} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  status: state.status,
  dogs: state.dogs,
});

export default connect(mapStateToProps, {
  fetchDogs: fetchDogsAction,
  like: likeAction,
})(App);
