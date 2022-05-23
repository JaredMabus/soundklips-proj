import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import store from "../../Redux/store";
import * as actions from "../../Redux/actions";

export const useAudioData = () => {
  const [userAudioData, setUserAudioData] = useState([]);

  useEffect(() => {
    (async () => {
      const localToken = await localStorage.getItem("token");
      let uri = `${process.env.REACT_APP_URI}/api/select/audio-data/account`;
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ token: localToken }),
      };
      const response = await fetch(uri, options);
      let data = await response.json();
      setUserAudioData(data["audio_data"]);
    })();
  }, []);

  return userAudioData;
};
