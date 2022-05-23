import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as themes from "../../../themes";
import DAWImage from "../../../assets/images/DAW-Image.svg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-self: center;
  align-self: center;
  min-height: 400px;
  width: 100%;
  flex-wrap: wrap;
  box-shadow: 5px 0px 5px 5px rgba(0, 0, 0, 0.01);
  margin: 100px 0 150px 0;
  //   border: 5px solid green;
  //   border-right: 10px solid;
  //   border-image: linear-gradient(
  //       to top,
  //       rgba(216, 236, 185, 1) 33%,
  //       #d0e570 33%,
  //       #7abfbd 33%
  //     )
  //     4;

  @media only screen and (max-width: 750px) {
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  height: auto;
  width: 100%;
  //   border: 5px solid blue;
  padding: 25px 25px 0 25px;
  background-color: ${(props) => props.theme.main2};
  color: ${(props) => props.theme.fontColor};

  border-radius: 20px;
  border-right: 15px solid;
  border-image: linear-gradient(
      to top,
      rgba(216, 236, 185, 1) 33%,
      #d0e570 33%,
      #7abfbd 33%
    )
    4;

  h1 {
    // font-weight: bold;
    font-size: 2.2em;
  }
  p {
    margin: 20px 0px;
    font-size: 1.2em;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
  //   border: 1px solid red;
  background-color: ${(props) => props.theme.DAWbg};
  padding: 50px 25px 15px 25px;

  img {
    height: 100%;
    // width: 100%;
    // min-width: 300px;
    max-width: 100%;
  }
`;

const SplitSection = () => {
  return (
    <>
      <Container>
        <TextContainer>
          <h1>Use with your</h1>
          <h1>Favorite</h1>
          <h1>Digital Audio Workstation</h1>
          <p>Download other user's audio files and upload into your projects</p>
        </TextContainer>
        <ImageContainer>
          <img src={DAWImage} alt="DAW"></img>
        </ImageContainer>
      </Container>
    </>
  );
};

export default SplitSection;
