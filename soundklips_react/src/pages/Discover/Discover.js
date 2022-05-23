import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as themes from "../../themes";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../Redux/actions";
import store from "../../Redux/store";
import UI from "../../components/UI";
import { useAudioData } from "../../components/AudioData/useAudioData";

const DiscoverPage = styled(themes.FlexPage)`
  // border: 1px solid black;
  min-height: 100%;
  width: 100%;
  padding: 15px 30px;
`;

const DiscoverContent = styled(themes.Content)``;

// const AudioDataC = () => {
//   const [audioData, setAudioData] = useState(useAudioData());

//   return (
//     <>
//       {audioData.map((item, i) => {
//         return (
//           <ul key={i}>
//             <li>{item.audio_title}</li>
//             <li>{item.duration}</li>
//             <li>{item.file_type}</li>
//             <li>{item.email}</li>
//           </ul>
//         );
//       })}
//     </>
//   );
// };

const Discover = () => {
  const loginStatus = useSelector((state) => state.account.loginStatus);
  const audioData = useAudioData();

  return (
    <>
      <UI></UI>
      <DiscoverPage>
        {loginStatus ? (
          <DiscoverContent>
            <h1>Discover</h1>
            <div>This page is in the works </div>
            {/* {audioData.map((item, i) => {
              return (
                <ul key={i}>
                  <li>{item.audio_title}</li>
                  <li>{item.duration}</li>
                  <li>{item.file_type}</li>
                  <li>{item.email}</li>
                </ul>
              );
            })} */}
          </DiscoverContent>
        ) : (
          <DiscoverContent>
            <br></br>
            <h1>Discover</h1>

            <div>
              Discover other user's samples and collections. Work in progress..{" "}
            </div>
          </DiscoverContent>
        )}
      </DiscoverPage>
    </>
  );
};

export default Discover;
