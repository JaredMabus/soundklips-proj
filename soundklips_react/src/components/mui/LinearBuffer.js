import * as React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import styled from "styled-components";
import LinearBufferStill from "../../assets/images/myUI/LinearBufferStill.svg";
import store from "../../Redux/store";
// import * as actions from "../../Redux/store";

const LinearBufferWrapper = styled.div`
  display: flex;
  justify-self: center;
  align-self: center;
  justify-content: center;
  align-items: center;
  min-height: 5px;
  max-height: 5px;
  width: 100%;
  // margin: 0 auto;

  img {
    width: 100%;
    max-height: auto;
    padding: 0;
    margin: 0;
  }

  @media only screen and (max-width: 625px) {
    width: 90%;
    min-width: 45%;
    // max-width: 90%;

    // padding: 0 0 25px 0;
    margin: 0 0 0px 0;
  }
`;

export default function LinearColor() {
  // useEffect(() => {

  // });
  return (
    <LinearBufferWrapper>
      <Stack sx={{ width: "100%", color: "#54B9B5" }} spacing={10}>
        {/* {store.getState().account.api.pending ? (
          <LinearProgress color="inherit" />
        ) : (
          <img src={LinearBufferStill} alt="Loading Line" />
        )} */}
        <LinearProgress color="inherit" />
        {/* <LinearProgress color="success" /> */}
      </Stack>
    </LinearBufferWrapper>
  );
}

// ALT COLORS:
// main-teal: #54B9B5
// dark-teal: #2b6361
// light green: #C8DF3D
// snack-green: #2E7D32
