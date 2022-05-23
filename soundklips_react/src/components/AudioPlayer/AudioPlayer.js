import React, { useEffect, useState, useRef } from "react";
import * as themes from "../../themes";
import styled from "styled-components";
import { AudioDataApi } from "./AudioPlayerApi";
// ICONS
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSelector, useDispatch } from "react-redux";
import store from "../../Redux/store";
import * as actions from "../../Redux/actions";

const AudioPlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  // bottom: ${({ audioPlayerState }) => (audioPlayerState ? "0" : "-45px")};
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.menu};
  border-top: 1px solid ${(props) => props.theme.main1};
  height: ${({ audioPlayerState }) => (audioPlayerState ? "50px" : "200px")};
  width: 100%;
  padding: 5px;
  transition: 500ms;
  // box-shadow: 0px -50px 50px 10px rgba(0, 0, 0, .1);
  white-space: nowrap;
  z-index: 1;
`;

const AudioPlayerControlsMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  min-width: 100%;
  height: 100%;
  padding: 0 5px;
`;

const PlayPauseButton = styled.div`
  display: flex;
  justify-self: center; 
  align-items: center; 
  justify-content: center;
  align-items: center;
//   background-color: #54B9B5;
  padding: 5px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 5px;  
  transition: 400ms; 

  svg {
    color: ${(props) => props.theme.fontColor};
    // color: white;
    height: 100%;
    width: 90%; 
  }

  :hover {
    background-color: white;
    box-shadow: 2px 2px 5px 5px rgba(0,0,0,.1);
    
    svg {
        // color: #54B9B5;
    }
  }
  :active {
    background-color: #54B9B5;
    }
  }
`;

const ExpandBtn = styled.div`
  justify-self: flex-end;
  align-self: start;
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.hover};
  }

  svg {
    height: 35px;
    width: 35px;
  }
`;

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const audioPlayerState = useSelector(
    (state) => state.audioPlayer.audioPlayerState
  );
  const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
  const activeAudioFile = useSelector(
    (state) => state.audioPlayer.activeAudioFile
  );
  // REFS
  const audioPlayer = useRef();
  const animationRef = useRef();

  // useEffect(() => {
  //   isPlaying ? audioPlayer.current.play() : audioPlayer.current.pause();
  // }, [isPlaying]);

  return (
    <>
      <AudioPlayerContainer audioPlayerState={audioPlayerState}>
        <AudioPlayerControlsMenu>
          <PlayPauseButton>
            <PlayArrowIcon />
          </PlayPauseButton>
          {/* {Object.keys(activeAudioFile).length !== 0 ? (
            <audio ref={audioPlayer} controls>
              <source src={activeAudioFile["public_url"]} type="audio/mpeg" />
            </audio>
          ) : (
            console.log("no audio")
          )} */}
          {audioPlayerState ? (
            <ExpandBtn>
              <KeyboardArrowUpIcon
                onClick={() =>
                  dispatch(actions.setAudioPlayerState(!audioPlayerState))
                }
              />
            </ExpandBtn>
          ) : (
            <ExpandBtn>
              <KeyboardArrowDownIcon
                onClick={() =>
                  dispatch(actions.setAudioPlayerState(!audioPlayerState))
                }
              />
            </ExpandBtn>
          )}
        </AudioPlayerControlsMenu>
      </AudioPlayerContainer>
    </>
  );
};

export default AudioPlayer;
