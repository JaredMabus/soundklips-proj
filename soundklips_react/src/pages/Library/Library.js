import React, { useEffect, useState, useRef } from "react";
import * as themes from "../../themes";
import styled from "styled-components";
import UI from "../../components/UI";
// import route from "../api/RouteSwitch";
import { AudioDataApi } from "../../components/AudioPlayer/AudioPlayerApi";
// import Mp3 from "../assets/audio/Chase.mp3";
// import { ListItem } from '@mui/material';
import CircularLoading from "../../components/mui/CircularLoading";
import AudioModal from "../../components/AudioModal/AudioModal";
// ICONS
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import DownloadIcon from "@mui/icons-material/Download";
import IosShareIcon from "@mui/icons-material/IosShare";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Waveform from "react-audio-waveform";
import * as actions from "../../Redux/actions";
import store from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
// MUI
import AudioOptions from "./AudioOptions";

const LibraryContainer = styled(themes.FlexPage)`
  // background-color: ${(props) => props.theme.main2};
  // border: 1px solid black;
  min-height: 100%;
  width: 100%;
  padding: 15px 30px;
  h {
    white-space: nowrap;
  }
`;

const AudioContainer = styled(themes.Content)`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  // background-color: ${(props) => props.theme.main2};
  background-color: none;
  width: 100%;
  height: auto;
  margin: 50px 0 0 0;
  padding: 0 30px;
`;

const AudioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-self: start;
  align-self: center;
  width: 100%;
  // max-width: 500px;
  height: 160px;
  max-height: 250px;
  margin: 0px 0 40px 0;
  flex-wrap: nowrap;
  // border: 1px solid black;
`;

const AudioImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  width: 20%;
  min-width: 160px;
  max-width: 160px;
  height: 160px;
  margin: 0px 10px 0 0;
  // border: 1px solid black;
  // border-radius: 10px;

  svg {
    height: 160px;
    width: 160px;
  }

  .audio-image-bg {
    max-height: 160px;
    max-width: 160px;
    min-height: 160px;
    min-width: 160px;
    border-radius: 15px;
  }
`;

const AudioFileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  width: 80%;
  height: 100%;
  min-height: 100%;
  margin: 0px 0 0 0;
  padding: 5px 0 5px 0;

  audio {
    // background-color: red;
  }
`;

const AudioMeta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: auto;
  // min-width: auto;
  // max-width: auto;
  // margin: 0px 10px;

  p {
    font-size: 0.8em;
  }
`;

const AudioControls = styled.div`
  // min-width: 100px;
  // max-width: 100%;
  // width: 100%;
  margin: 0px 10px;
`;

const AudioWaveForm = styled.div`
  // display: flex;
  min-width: 500px;
  max-width: 500px;
  margin: 0px 10px;
`;

const AudioMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  width: 100%;
  min-width: 500px;
  max-width: 500px;
  margin: 0px 10px;

  svg {
    cursor: pointer;
  }

  svg:hover {
    color: green;
  }

  svg:active {
    color: lightgreen;
  }
`;

const Library = () => {
  const loginStatus = useSelector((state) => state.account.loginStatus);
  const [audioDataLocal, setAudioDataLocal] = useState([]);
  const audioDataRedux = useSelector((state) => state.userAudioData);
  const loading = useSelector((state) => state.loading.apiLoading);
  const [needsRefresh, setRefresh] = useState(true);
  const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
  const activeAudioFile = useSelector(
    (state) => state.audioPlayer.activeAudioFile
  );

  const [loadFromRedux, setLoadFromRedux] = useState(true);
  const audioModalState = useSelector((state) => state.audioModal.state);
  const dispatch = useDispatch();
  const dispatchAudioModalState = (audio) => {
    audioModalState
      ? dispatch(
          actions.setAudioModalState({
            state: !audioModalState,
            audio_data: null,
          })
        )
      : dispatch(
          actions.setAudioModalState({
            state: !audioModalState,
            audio_data: audio,
          })
        );
  };
  // const togglePlayPause = () => {
  //   const prevValue = isPlaying;

  //   setIsPlaying(!prevValue);

  //   if (prevValue) {
  //     audioPlayer.current.play();
  //     animationRef.current = requestAnimationFrame(whilePlaying);
  //   } else {
  //     audioPlayer.current.pause();
  //     cancelAnimationFrame(animationRef.current);
  //   }
  // };

  // const whilePlaying = () => {
  //   animationRef.current = requestAnimationFrame(whilePlaying);
  // };

  // const [peaks, setPeaks] = useState([]);

  const togglePlaySetAudio = (audio) => {
    try {
      dispatch(actions.setActiveAudio(audio));
      dispatch(actions.togglePlay(!isPlaying));
    } catch (err) {
      throw err;
    }
  };

  const audioApi = async () => {
    try {
      let data = await AudioDataApi();
      dispatch(actions.setUserAudioData(data.audio_data));
      setAudioDataLocal(data.audio_data);
      setRefresh(false);
      setLoadFromRedux(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (needsRefresh === true) {
      audioApi();
    } else if (loadFromRedux === true && needsRefresh === false) {
      setAudioDataLocal(audioDataRedux);
    } else {
      return;
    }
  }, [needsRefresh, loadFromRedux]);

  return (
    <>
      {audioModalState ? <AudioModal></AudioModal> : <div></div>}
      <UI />
      {loginStatus ? (
        <LibraryContainer>
          <h1>Library</h1>
          <div>Page under construction</div>
          <AudioContainer audioDataLocal={audioDataLocal}>
            {loading ? (
              <CircularLoading />
            ) : (
              audioDataLocal.map((item) => {
                return (
                  <AudioWrapper key={item.audio_data_id}>
                    <AudioImage>
                      {item.image_url !== null ? (
                        <div
                          className="audio-image-bg"
                          style={{
                            backgroundImage: `url("${item.image_url}")`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                      ) : (
                        <GraphicEqIcon />
                      )}
                    </AudioImage>
                    <AudioFileWrapper>
                      <AudioMeta>
                        <h4 id={`${item.audio_data_id}-${item.audio_title}`}>
                          {item.audio_title}
                        </h4>
                        <div>
                          <p>User Name</p>
                        </div>
                        {/* {isPlaying ? (
                          <PauseIcon onClick={() => togglePlaySetAudio(item)} />
                        ) : (
                          <PlayArrowIcon
                            onClick={() => togglePlaySetAudio(item)}
                          />
                        )} */}
                      </AudioMeta>
                      <AudioControls>
                        <audio controls>
                          <source src={item.public_url} type="audio/mpeg" />
                        </audio>
                      </AudioControls>
                      <AudioWaveForm>
                        <Waveform
                          barWidth={1.8}
                          peaks={item.peaks}
                          height={60}
                          pos={0}
                          duration={item.duration}
                          // onClick={hello}
                          color="#676767"
                          progressGradientColors={[
                            [0, "#C7DF3D"],
                            [1, "#aaa"],
                          ]}
                          transitionDuration={300}
                        />
                      </AudioWaveForm>
                      <AudioMenu>
                        {/* <DownloadIcon />
                      <IosShareIcon /> */}
                        <EditIcon
                          tabIndex="0"
                          onClick={() => dispatchAudioModalState(item)}
                          onKeyDown={() => dispatchAudioModalState(item)}
                        />
                        {/* <AudioOptions></AudioOptions> */}
                      </AudioMenu>
                    </AudioFileWrapper>
                  </AudioWrapper>
                );
              })
            )}
          </AudioContainer>
        </LibraryContainer>
      ) : (
        <LibraryContainer>
          <br></br>
          <h1>Library</h1>
          <div>
            Create an account and login to upload and manage your sounds
          </div>
        </LibraryContainer>
      )}
    </>
  );
};

export default Library;
