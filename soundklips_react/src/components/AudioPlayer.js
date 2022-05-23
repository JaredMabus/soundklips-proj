import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import route from "../api/RouteSwitch";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';


const PlayPauseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #54B9B5;
  padding: 5px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 100px;  
  transition: 500ms; 

  svg {
    color: white;
    height: 100%;
    width: 90%; 
  }

  :hover {
    background-color: white;
    box-shadow: 2px 2px 5px 5px rgba(0,0,0,.2);
    
    svg {
      color: #54B9B5;
    }
  }
  :active {
    background-color: #54B9B5;
    }
  }
  
`;


const AudioPlayer = () => {
  const [audioFileId, setAudioFileID] = useState(57)
  const [audioData, setAudioData] = useState([])
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const [isPlaying, setIsPlaying] = useState(true)

  // References
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  const togglePlayPause = () => {
    const prevValue = isPlaying;

    setIsPlaying(!prevValue)

    if (prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current)
      // changePlayerCurrentTime();
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changePlayerCurrentTime = () => {
    setCurrentTime(progressBar.current.value)
  }

  useEffect((audioFileId)=>{
    let uri = `${route.uri}/api/get_audio/57`
    let options = {
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    }

    fetch(uri, options)
      .then(response => response.json())
      .then(data => setAudioData(data))

    const seconds = Math.floor(audioPlayer.current.duration)
    
    setDuration(calculateTime(seconds))
    progressBar.current.max = seconds

    

  },[audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` :`${seconds}`;

    return `${returnedMinutes} : ${returnedSeconds}`;
  }

  const changeRange = () =>{
    audioPlayer.current.currentTime = progressBar.current.value;
    setCurrentTime(progressBar.current.value)

  }

  return(
    <div>
        {console.log(audioData.audio_file_byte)}
        <audio ref={audioPlayer} src = {`data:audio/mp3;base64,${audioData.audio_file_byte}`} preload="metadata"></audio>
        
        {/* <button>back30</button> */}
        <PlayPauseButton onClick={togglePlayPause}>
        {isPlaying 
          ? <PlayArrowIcon/>
          : <PauseIcon/>
        }
        </PlayPauseButton>
        
        {/* <button>forward 40</button> */}

        <div>{calculateTime(currentTime)}</div>

        <div>
          <input ref={progressBar} type='range' defaultValue={0} onChange={changeRange}></input>
        </div>

        <div>{duration}</div>
        {/* {console.log(duration)} */}
    </div>
  )
}

export default AudioPlayer