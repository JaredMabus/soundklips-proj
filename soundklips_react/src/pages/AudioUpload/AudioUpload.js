import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as themes from "../../themes";
import UI from "../../components/UI";
// import route from "../api/RouteSwitch";
// import Mp3 from "../assets/audio/Chase.mp3";
import StorageCapacityBar from "../../components/StorageCapacityBar";
// import StorageCapacityBar from "../components/mui/StorageCapacityBar";

import AudioForms from "./AudioForms";
// import AudioPlayer from "../components/AudioPlayer";
import { useSelector } from "react-redux";

const UploadContainer = styled(themes.FlexPage)`
  // background-color: ${(props) => props.theme.menu};
  // background-color: red;
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  width: 100%;
  padding: 15px 27px 0px 15px;
`;

const AudioDataFormTabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: space-between;
  // background-color: ${(props) => props.theme.menu};
  flex-direction: row;
  width: 100%;
  padding: 0% 20%;
  font-size: 0.9em;
  // border: 1px solid black;

  .form-tabs {
    cursor: pointer;
    transition: 250ms;
  }

  .form-tabs:hover {
    color: ${(props) => props.theme.teal};
    // text-decoration: underline;
  }
`;

const AudioUpload = () => {
  const loginStatus = useSelector((state) => state.account.loginStatus);
  const [tabState, setTabState] = useState("Info");
  const setTabValue = (value) => {
    setTabState(value);
  };
  const apiLoading = useSelector((state) => state.loading.apiLoading);

  useEffect(() => {}, []);

  return (
    <>
      <UI />
      {loginStatus === true ? (
        <UploadContainer>
          {/* <AudioDataFormTabs>
            <div className="form-tabs">
              <h1>Audio Sample Info</h1>
            </div>
          </AudioDataFormTabs> */}
          {/* <StorageCapacityBar /> */}
          <AudioForms />
        </UploadContainer>
      ) : (
        <UploadContainer>
          <br></br>
          <h1>Uplaod</h1>
          <div>
            Create an account and login to upload and manage your sounds
          </div>
        </UploadContainer>
      )}
    </>
  );
};

export default AudioUpload;
