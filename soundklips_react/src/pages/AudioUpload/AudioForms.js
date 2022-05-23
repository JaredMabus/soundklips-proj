import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as themes from "../../themes";
import { audioFileUploadApi } from "./AudioUploadApi";
import Mp3 from "../../assets/audio/Chase.mp3";
// import { FormControlUnstyledContext } from "@mui/core";
import StorageCapacityBar from "../../components/StorageCapacityBar";
import LinearBuffer from "../../components/mui/LinearBuffer";
import CircularLoading from "../../components/mui/CircularLoading";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
import * as actions from "../../Redux/actions";

const AudioUploadPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  // min-width: 350px;
  max-width: 900px;
  height: auto;
  // min-height: 100%;
  // max-height: 750px;
  padding: 25px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.main3};
  box-shadow: 0px 15px 25px 8px rgba(0, 0, 0, 0.1);
  
  .title-storage-wrapper{
    display: flex;
    flex-direction row;
    justify-content: space-between;
    align-items: baseline;   
    width: 100%;
    height: 70px; 
    // max-height: 70px; 
    // background-color: red;
    
    p {
      padding: 3px 0 0 5px;
    }

    @media only screen and (max-width: 600px){
      flex-direction: column;
      height: auto;
      justify-content: start;
      align-items: start;  
    }
  }

  .audio-upload-title{
    display: flex;
    flex-direction: column;
    // min-width: 100%;
    // height: 70px; 
    // max-height: 70px;
    // background-color: red; 
  }
`;

const AudioDataFormWrapper = styled(themes.Form)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  flex-wrap: wrap;
  width: 100%;
  height: 100%; 
  // min-width: 1000px;
  // max-width: 650px;
  // min-height: 100%;
  // max-height: 1000px;
  // background-color: none; 

  .audio-img-wrapper {
    display: flex;
    flex-direction: row; 
    justify-content: start;
    align-items: start;
    // min-width: 150px;
    // max-width: 100px;
    // height: auto; 
    // min-height: 100%;
    max-height: 180px;
    margin: 0px 0px 15px 0;
    // padding: 50px 50px 50px 50px;

    img {
      min-width: 0px
      max-width: 100px;
      min-height: 0px;
      max-height: 100px;
    }

    #audio_img {
      // display: flex;
      // flex-direction: column;
      // align-self: start;
      // justify-self: start;
      padding: 110px 8px 5px 5px;
      margin: 0 15px 0 0 ;
      border: 1px solid lightgrey;
      border-radius: 5px; 
      // min-width: 150px;
      max-width: 160px;
      // height: 100%; 
      min-height: 160px;
      max-height: 160px;
      cursor: pointer; 
      // background-image: linear-gradient(rgb(84,185,181,1), rgb(199,224,61,.9) );
      background: repeating-linear-gradient(
        45deg,
        rgba(92,92,92,.2),
        rgba(92,92,92,.2)40px,
        rgba(200,200,200,.1)40px,
        rgba(200,200,200,.1)80px
      );
      transition:350ms; 
      
      :hover{
        background: repeating-linear-gradient(
          45deg,
          rgba(84,185,181,.5),
          rgba(84,185,181,.5)40px,
          rgba(200,200,200,.2)40px,
          rgba(200,200,200,.2)80px
        ); 
      }
    }
  }

  .input-wrapper {
    display: flex; 
    flex-grow: 1;
    height: auto; 
    flex-direction: row;
    flex-wrap: wrap;   
    justify-content: start; 
    align-items: start; 
    // min-width: 500px;
    // width: 100%;
    // border: 1px solid red; 
  }

  #title-desc{
    flex-grow: 1;
    // border: 1px solid black;
    max-width: 350px;
    min-height: 180px;
    max-height: 180px;
    margin: 0 15px 20px 15px;
  }

  .audio-file-input {
    // flex-grow: 1; 
    min-width: 100%;
    max-width: 800px;
    // min-height: 100%;
    // max-height: 700px;
  }

  .audio-category-inputs {
    // display: flex;
    // justify-content: start;
    // align-items: start; 
    // flex-direction: column;
    // padding: 0px 5px;
    margin: 0 15px 0 15px;  
    width: auto;
    min-width: 200px;
    height: auto;
    min-height: 180px; 
    max-height: 180px; 
    
    select {
      font-size: .8em; 
      height: auto;
      width: 100%;
      max-width: 100%;
      padding: 4px; 
    }
  }

  textarea, select {
    max-width: 100%;
  }

  input[type="text"],
  input[type="file"] {
    // min-width: 100px;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%; 
  } 

  .submit-btn-wrapper {
    display: flex;
    justify-content: end; 
    align-items: center;
    min-width: 100%;
    padding: 0 15px 0 0;
    
    button {
      font-weight: bold; 
      padding: 8px 12px; 
      border: none;
      border-radius: 5px;
      border: 1px solid ${(props) => props.theme.main3}; 
      background-color: ${(props) => props.theme.main3}; 
      color: ${(props) => props.theme.teal};
      cursor: pointer;
      transition: 350ms;
      margin: 0 0 0 5px;

      :hover {
        border: 1px solid ${(props) => props.theme.teal};
        // background-color: ${(props) => props.theme.teal}; 
        color: ${(props) => props.theme.teal};
        box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.1);
      }

      :active {
        background-color: ${(props) => props.theme.hover}; 
        color: ${(props) => props.theme.white};
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1); 
      }
    }

    input[type="submit"]{
      font-weight: bold; 
      padding: 8px 12px; 
      border: none;
      border-radius: 5px;
      border: 1px solid ${(props) => props.theme.main3}; 
      background-color: ${(props) => props.theme.teal}; 
      color: ${(props) => props.theme.white};
      cursor: pointer;
      transition: 350ms;
      margin: 0 0 0 5px;

      :hover {
        border: 1px solid ${(props) => props.theme.teal};
        // background-color: ${(props) => props.theme.teal}; 
        color: ${(props) => props.theme.white};
        box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.2);
      }

      :active {
        // background-color: ${(props) => props.theme.hover}; 
        color: ${(props) => props.theme.white};
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1); 
      }
    }
  }

  #audio_file {
    // display: flex;
    // align-self: center;
    // justify-content: center;
    // align-items: center;
    // background-color: ${(props) => props.theme.teal};
    // background-color: none ;
    border: 1px solid lightgrey ;
    border-radius: 5px;
    // padding: 150px 150px;
    margin: 10px auto;
    text-align: center; 
    // flex-grow: 1; 
    width: 100%;
    height: 250px;
    cursor: pointer;
    background: repeating-linear-gradient(
      45deg,
      // rgba(84,185,181,.5),
      // rgba(84,185,181,.5)160px,
      // rgba(200,200,200,.2)160px,
      // rgba(200,200,200,.2)310px
      rgba(92,92,92,.3),
      rgba(92,92,92,.3)160px,
      rgba(200,200,200,.1)160px,
      rgba(200,200,200,.1)310px
    ); 
     
    :hover {
      background: repeating-linear-gradient(
        45deg,
      rgba(84,185,181,.5),
      rgba(84,185,181,.5)160px,
      rgba(200,200,200,.2)160px,
      rgba(200,200,200,.2)310px
      );  
    }

    #upload-btn {
      position: relative;
      left:-1px;
      background-color:#446655; 
    }
  }

  #audio_desc {
    height: 100px;
    padding: 8px 0 0px 8px;
    font-size: 1em;
  }

  label {
    font-size: 0.9em;
    margin: 0 0 5px 0;
  }

  @media only screen and (max-width:1200px) {
    flex-direction: column;
    // background-color: red; 
      #audio_img {
        max-width: 160px;
        height: 100%; 
        min-height: 100px;
        max-height: 100px;
      }
  }
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
`;

const MetaDataForm = styled(themes.Form)`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: start;
  // align-items: center;
  // height: 500px;
  // width: 100%;
  // max-width: 900px;
  // padding: 50px 50px;
  p {
    font-size: 0.9em;
    margin: 0 10px 0 0;
  }
`;

var displayAudioImage = function (event) {
  try {
    var output = document.getElementById("img-output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  } catch (err) {
    return;
  }
};

const AudioForms = () => {
  const [formValue, setFormValue] = useState({
    audio_title: "",
    audio_desc: "",
    file_name: "",
    file_size: "",
    file_type: "",
    category_id: "1",
    sub_category_id: "1",
    sub2_category_id: "1",
  });
  const [filterValues, setFilterValues] = useState({});
  const [formError, setFormErrors] = useState({});

  const resetAudioForm = () => {
    try {
      let audio_file = document.getElementById("audio_file");
      let audio_image = document.getElementById("audio_img");
      let audioImageDisplay = document.getElementById("img-output");

      audio_file.value = null;
      audio_image.value = null;
      // audioImageDisplay.src = "#";
      // audioImageDisplay.style.display = "none";
      setFormValue({
        audio_title: "",
        audio_desc: "",
        file_name: "",
        file_size: "",
        file_type: "",
        category_id: "1",
        sub_category_id: "1",
        sub2_category_id: "1",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const cancelUpload = () => {
    window.confirm(
      "Are you sure you want to cancel? Current upload data will be lost"
    )
      ? resetAudioForm()
      : console.log("");
  };
  const apiLoading = useSelector((state) => state.loading.apiLoading);

  const validateFormValues = (formValue) => {
    if (formValue.file_type === null) {
      formError.file_type = `.wav files take up a lot of space.`;
    } else if (formValue.file_type == null) {
      formError.file_type = "file_type is empty";
    }

    return formError;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const getImageMetaData = () => {
    try {
      const audio_imageMeta = document.getElementById("audio_img");
      if (/image\//.test(audio_imageMeta.files[0].type)) {
        return;
      } else {
        console.log(
          `File must be image type. "${audio_imageMeta.files[0].type}" is incorrect file type`
        );
        audio_imageMeta.value = null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAudioMetaData = () => {
    try {
      const audioFile = document.getElementById("audio_file").files[0];
      if (/audio\//.test(audioFile.type)) {
        setFormValue({
          ...formValue,
          ["audio_title"]: audioFile.name.substring(
            0,
            audioFile.name.lastIndexOf(".")
          ),
          ["file_name"]: audioFile.name,
          ["file_type"]: audioFile.type,
          ["file_size"]: (audioFile.size / 1000000).toFixed(2),
        });
      } else {
        console.log(
          `File must be audio type. "${audioFile.type}" is incorrect file type`
        );
        audioFile.files = null;
        resetAudioForm();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // FORM API
  const submitAudioData = async (e) => {
    try {
      e.preventDefault();
      setFormErrors(validateFormValues(formValue));

      if (Object.keys(formError).length === 0) {
        var response = await audioFileUploadApi(formValue);

        if (response.audioUploaded === true) {
          console.log(response);
        } else {
          console.log(response);
        }
      } else {
        console.log(formError);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [resetAudioForm]);

  return (
    <>
      <AudioUploadPage>
        <div className="title-storage-wrapper">
          <div className="audio-upload-title">
            <h1>Sample File</h1>
            <p>Drag and drop to upload </p>
          </div>
          <StorageCapacityBar />
        </div>
        <form action="" method="post" onSubmit={submitAudioData}>
          <hr></hr>
          <br></br>
          <AudioDataFormWrapper>
            <div className="audio-img-wrapper">
              <FormInput>
                <label htmlFor="audio_img">Image</label>
                {/* <img id="img-output"></img> */}
                <input
                  type="file"
                  id="audio_img"
                  name="audio_img"
                  accept="image/*"
                  // onChange={(event) => displayAudioImage(event)}
                  onChange={getImageMetaData}
                />
              </FormInput>
            </div>
            <div className="input-wrapper">
              <div id="title-desc">
                <FormInput>
                  <label htmlFor="audio_title">Title</label>
                  <input
                    type="text"
                    id="audio_title"
                    name="audio_title"
                    value={formValue.audio_title}
                    onChange={handleChange}
                  />
                </FormInput>
                <FormInput>
                  <label htmlFor="audio_desc">Description</label>
                  <textarea
                    id="audio_desc"
                    name="audio_desc"
                    value={formValue.audio_desc}
                    onChange={handleChange}
                    placeholder="Describe your sample"
                  />
                </FormInput>
              </div>
              <div className="audio-category-inputs">
                <FormInput>
                  <label htmlFor="category_id">Category</label>
                  <select
                    type="select"
                    id="category_id"
                    name="category_id"
                    onChange={handleChange}
                  >
                    <option value="1">Other</option>
                    <option value="2">Drum Kit</option>
                  </select>
                </FormInput>
                <FormInput>
                  <label htmlFor="sub_category_id">Subcategory</label>
                  <select
                    type="select"
                    id="sub_category_id"
                    name="sub_category_id"
                    onChange={handleChange}
                  >
                    <option value="1">Other</option>
                    <option value="2">Accoustic Drum Kit</option>
                    <option value="3">Electric Drum Kit</option>
                  </select>
                </FormInput>
                <FormInput>
                  <label htmlFor="sub2_category_id">Second Subcategory</label>
                  <select
                    type="select"
                    id="sub2_category_id"
                    name="sub2_category_id"
                    onChange={handleChange}
                  >
                    <option value="1">Other</option>
                    <option value="2">Snare</option>
                    <option value="3">Kick</option>
                  </select>
                </FormInput>
              </div>
            </div>

            <FormInput className="audio-file-input">
              <br></br>
              {/* <LinearBuffer /> */}
              {apiLoading ? <LinearBuffer /> : <hr></hr>}
              <br></br>
              <h3>Audio File</h3>
              <input
                type="file"
                id="audio_file"
                name="audio_file"
                accept="audio/*"
                onChange={getAudioMetaData}
              />
            </FormInput>
            {Object.values(formValue.file_name).length > 0 ? (
              <MetaDataForm>
                <p>{formValue.file_name}</p>
                <p>{formValue.file_type}</p>
                <p>{formValue.file_size} mb</p>
              </MetaDataForm>
            ) : (
              <div></div>
            )}

            <div className="submit-btn-wrapper">
              <button onClick={cancelUpload}>Cancel</button>
              <FormInput>
                <input type="submit" value="Save" />
              </FormInput>
            </div>
          </AudioDataFormWrapper>
        </form>
        {/* <form action="" method="post" onSubmit={submitAudioData}>
          <MetaDataForm>
            <FormInput>
              <label htmlFor="file_name">File Name</label>
              <input
                type="text"
                id="file_name"
                name="file_name"
                value={formValue.file_name}
                readOnly={true}
              />
            </FormInput>
            <FormInput>
              <label htmlFor="file_type">File Type</label>
              <input
                type="text"
                id="file_type"
                name="file_type"
                value={formValue.file_type}
                readOnly={true}
              />
            </FormInput>
            <FormInput>
              <label htmlFor="file_size">Size (mb)</label>
              <input
                type="text"
                id="file_size"
                name="file_size"
                value={formValue.file_size}
                readOnly={true}
              />
            </FormInput>
          </MetaDataForm>
        </form> */}
      </AudioUploadPage>
    </>
  );
};

export default AudioForms;
