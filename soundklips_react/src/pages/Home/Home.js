import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as themes from "../../themes";
import UI from "../../components/UI";
import { Link } from "react-router-dom";
import { useTransition, animated, config } from "react-spring";
import SplitSection from "./components/SplitSection";

// IMAGES
import SplashBg from "../../assets/images/background/SplashEmpty.svg";
// import waveFormNotes from "../../assets/images/background/waveFormNotes.svg";
// import audioUploadToCloudLight from "../../assets/images/audioUploadToCloudLight.svg";
// import audioUploadToCloudDark from "../../assets/images/audioUploadToCloudDark.svg";
import audioUploadBg from "../../assets/images/background/audioUploadBg.svg";

const HomeContainer = styled(themes.FlexPage)`
  // background-color: #fafafa;
  h1 {
    font-weight: 400;
  }
`;

const Splash = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  min-width: 100%;
  min-height: 450px;
  background-color: ${(props) => props.theme.background};
  // background-image: linear-gradient(
  //     rgba(255, 255, 255, 0.1),
  //     rgba(255, 255, 255, 0.15)
  //   ),
  //   url(${SplashBg});
  background-image: url(${SplashBg});
  background-repeat: no-repeat;
  background-position: right;
  // border-bottom-right-radius: 15px;
  // box-shadow: 5px 2px 5px 2px rgba(0,0,0,0.05);
  // margin: 50px 0 0 0;
  padding: 15px 25% 0 30px;

  @media only screen and (max-width: 1000px) {
    margin-left: 0;
    margin-right: 0;
    // padding: 0px 0px;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.15)
      ),
      url(${SplashBg});
  }
`;

const SplashContent = styled.div`
  display: flex;
  flex-direction: column;   
  // background-color: ${(props) => props.theme.main2} ;
  border-radius: 5px;
  padding: 5px;
  max-width: 100%;  
  min-height: auto;
  width: auto; 

  h1 {
    font-size: 2.5em;
    margin: 10px 0 5px 0;
    font-weight: 400;   
  }

  p {
    font-size: 1.1em; 
    font-weight: 500; 
    margin: 5px;
    padding: 0 0 0 3px; 
  }

  .get-started-btn {
    display: flex;
    justify-content: center; 
    width: 130px; 
    color: ${(props) => props.theme.teal};
    // background-color: ${(props) => props.theme.main2};
    cursor: pointer;
    border-radius: 5px;
    font-weight: 600;
    border: 2px solid ${(props) => props.theme.teal};
    transition: 350ms;
    margin: 10px 0 0 0;
    padding: 10px;
    box-shadow: inset 0 0 0 0 #54B9B5;
    transition: ease-in-out 300ms;
    
    &:hover {
      color: ${(props) => props.theme.white};
      background-color: ${(props) => props.theme.teal};
      box-shadow: inset 130px 0 0 0 #54B9B5;
    }
`;

const Section = styled(themes.Content)`
  display: flex;
  flex-direction: column;
  align-self: start;
  justify-self: start;
  flex-wrap: wrap;
  width: 100%;
  min-width: 100%;
  min-height: 100%;
  height: 500px;
  border-radius: 5px;
  padding: 30px 30px;
  margin: 0px 0 100px 0;
  background-color: ${(props) => props.theme.main2};
  // font-size: 1.5em;
  .section-title {
    font-size: 2.2em;
    // color: linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.15));
    margin: 10px 0 5px 0;
    font-weight: 400;
  }
`;

const FeatureCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  width: 100%;
`;

const FeatureCards = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  height: 250px;
  width: 300px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.main2};
  padding: 20px 0 0 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const FeatureCardsTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  // padding: 10px;
  font-size: 0.8em;

  h1 {
    margin: 0;
  }

  h3 {
    margin: 0 0 20px 0;
  }
`;

const FeatureCardsImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.2)
    ),
    url(${audioUploadBg});
  background-repeat: no-repeat;
  background-position: left;
  width: 100%;
  height: 100%;
  border-radius: 10px;

  img {
    height: auto;
    width: 70%;
  }
`;

const FeatureCardsDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

function Toggle() {
  const [delayTime, setDelayTime] = useState(0);
  const [toggle, set] = useState(false);
  const transitions = useTransition(toggle, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: toggle,
    delay: delayTime,
    config: config.molasses,
    onRest: () => set(!toggle),
  });

  useEffect(() => {
    setDelayTime(5000);
  }, []);

  return transitions(({ opacity }, item) =>
    item ? (
      <animated.div
        style={{
          position: "absolute",
          opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
        }}
      >
        Discover
      </animated.div>
    ) : (
      <animated.div
        style={{
          position: "absolute",
          opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
        }}
      >
        Build
      </animated.div>
    )
  );
}
const Home = () => {
  return (
    <>
      <UI />
      <HomeContainer>
        <Splash>
          <SplashContent>
            <h1>Create music with SoundKlips </h1>
            <p>Upload and find royalty-free audio samples</p>
            <Link className="get-started-btn" to={"/register"}>
              Get Started
            </Link>
          </SplashContent>
        </Splash>
        <themes.Content>
          {/* <Section> */}
          {/* <h2 className="section-title">
              <b>Upload and Share</b>
            </h2> */}
          {/* <h1>{<Toggle />}</h1>
            <br></br>
            <br></br>
            <h1>Your Sound</h1> */}

          {/* <FeatureCardsWrapper>
              <FeatureCards>
                <FeatureCardsTitle>
                  <h1>Upload and Share</h1>
                  <h3>
                    Upload <b>500mb</b> of samples for Free{" "}
                  </h3>
                </FeatureCardsTitle>
                <FeatureCardsImage>
                  <img
                    src={audioUploadToCloudLight}
                    alt="Upload Audio to Cloud image"
                  />
                </FeatureCardsImage>
              </FeatureCards>
              <FeatureCardsDescription></FeatureCardsDescription>
            </FeatureCardsWrapper> */}
          {/* </Section> */}
          <SplitSection></SplitSection>
        </themes.Content>
      </HomeContainer>
    </>
  );
};

export default Home;
