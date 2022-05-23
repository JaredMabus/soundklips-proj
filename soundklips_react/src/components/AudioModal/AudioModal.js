//AUDIOMODAL
import React, { useState, useEffect } from "react";
import * as themes from "../../themes";
import styled from "styled-components";
import { useTransition, animated, config, useSpring } from "react-spring";
import useUpdateForm from "./useForm";
import * as actions from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
// ICONS

import CloseIcon from "@mui/icons-material/Close";
import { ListItem } from "@mui/material";

const AudioModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: start;
  z-index: 2;
  min-width: 100%;
  height: 100%;
  backdrop-filter: blur(1.2px);
  background-color: ${(props) => props.theme.modalBg};

  h1 {
    font-size: 24px;
  }

  #audio-update-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.main3};
  width: 65vw;
  min-width: 350px;
  max-width: 500px;
  min-height: auto;
  border-radius: 5px;
  box-shadow: 2px 3px 15px 15px rgba(40, 40, 40, 0.1);
  margin: 85px 0 0 0;
  padding: 30px 50px;
  transition: 250ms;
`;

const ModalForm = styled(themes.Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-self: center;
  width: 100%;
  height: auto;
  margin: 5px 0px;
  // background-color: ${(props) => props.theme.main2};

  .audio-form-input {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 5px 0;
  }

  input[type="text"],
  input[type="password"],
  textarea,
  select {
    height: auto;
    width: 100%;
    // max-width: 450px;
    font-weight: 600;
    color: ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.main1};
    border: 2px solid ${(props) => props.theme.main2};
    border-radius: 10px;
    outline: none;
    padding: 8px 10px;
    font-size: 0.9em;
  }

  textarea {
    min-height: 100px;
  }

  label {
    margin: 5px 0px;
  }

  input[type="submit"] {
    height: 40px;
    width: 150px;
    cursor: pointer;
    background-color: ${(props) => props.theme.main3};
    color: #54b9b5;
    border: 2px solid #54b9b5;
    border-radius: 100px;
    font-size: 0.9em;
    font-weight: 600;
    transition: 350ms;
  }

  input[type="submit"]:hover {
    background-color: #54b9b5;
    color: #fff;
    box-shadow: 3px 5px 3px 0px rgba(0, 0, 0, 0.2);
  }

  input[type="submit"]:active {
    box-shadow: 3px 5px 3px 0px rgba(0, 0, 0, 0.1);
  }

  .modal-submit-delete {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    width: 100%;
    margin: 20px 0 0 0;
  }
`;

const DeleteAudioBtn = styled.div`
  align-self: end;
  justify-self; end; 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  background-color: grey;
  cursor: pointer;
  transition: 250ms;
  border-radius: 5px; 
   
  
  :hover {
    background-color: red;
    
  }

  svg {
    
  }

  svg:hover {
    color: white; 
  }
`;

const ExitTop = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgba(150, 150, 150, 0.4);
  // background-color: ${(props) => props.theme.modalBg};
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  min-width: 100%;
  height: 55px;
  padding: 0 50px 0 0;
  transition: opacity 350ms ease-in-out;

  #modal-close-btn {
    color: ${(props) => props.theme.fontColor};
    position: fixed;
    top: 0;
    margin: 15px 0 0 0;
    cursor: pointer;
    font-size: 2em;
    font-weight: bold;
  }

  #modal-close-btn:hover {
    color: rgba(118, 15, 15);
  }
`;

const AudioModal = () => {
  const dispatch = useDispatch();
  const audioModalState = useSelector((state) => state.audioModal.state);
  const { formValues, formErrors, handleChange, handleSubmit } =
    useUpdateForm();

  const closeModal = () => {
    setMount(true);
    dispatch(
      actions.setAudioModalState({ state: !audioModalState, audio_data: null })
    );
  };
  const [mount, setMount] = useState(true);

  const transitions = useTransition(mount, {
    from: { x: 0, y: 1000, opacity: 1 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: 1000, opacity: 0 },
    delay: 200,
  });

  useEffect(() => {
    document.getElementById("audio-update-form").focus();
  }, []);

  return (
    <>
      <AudioModalContainer
        onClick={closeModal}
        onKeyDown={(e) => {
          e.key === "Escape" ? closeModal() : console.log();
        }}
      >
        <ExitTop>
          <div title="Close">
            <CloseIcon onClick={closeModal} id="modal-close-btn" />
          </div>
        </ExitTop>
        {transitions(
          (styles, key) =>
            mount && (
              <animated.div key={key} style={styles}>
                {" "}
                <ModalContent
                  styles={styles}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h1>Info</h1>
                  <ModalForm>
                    <hr></hr>
                    <form
                      id="audio-update-form"
                      tabIndex="0"
                      onSubmit={handleSubmit}
                    >
                      <div className="audio-form-input">
                        <label htmlFor="audio_title">Title:</label>
                        <input
                          type="text"
                          name="audio_title"
                          id="audio_title"
                          value={formValues.audio_title}
                          onChange={handleChange}
                          tabIndex="0"
                        ></input>
                      </div>
                      <div className="audio-form-input">
                        <label htmlFor="audio_desc">Description</label>
                        <textarea
                          type="text"
                          name="audio_desc"
                          id="audio_desc"
                          value={formValues.audio_desc}
                          onChange={handleChange}
                          tabIndex="0"
                        ></textarea>
                      </div>
                      <div className="audio-form-input">
                        <label htmlFor="category_id">Category</label>
                        <select
                          type="select"
                          id="category_id"
                          name="category_id"
                          onChange={handleChange}
                          value={formValues.category_id}
                          tabIndex="0"
                        >
                          <option value="1">Other</option>
                          <option value="2">Drum Kit</option>
                        </select>
                      </div>
                      <div className="audio-form-input">
                        <label htmlFor="sub_category_id">Subcategory</label>
                        <select
                          type="select"
                          id="sub_category_id"
                          name="sub_category_id"
                          onChange={handleChange}
                          value={formValues.sub_category_id}
                          tabIndex="0"
                        >
                          <option value="1">Other</option>
                          <option value="2">Accoustic Drum Kit</option>
                          <option value="3">Electric Drum Kit</option>
                        </select>
                      </div>
                      <div className="audio-form-input">
                        <label htmlFor="sub2_category_id">
                          Second Subcategory
                        </label>
                        <select
                          type="select"
                          id="sub2_category_id"
                          name="sub2_category_id"
                          onChange={handleChange}
                          value={formValues.sub2_category_id}
                          tabIndex="0"
                        >
                          <option value="1">Other</option>
                          <option value="2">Snare</option>
                          <option value="3">Kick</option>
                        </select>
                      </div>
                      <div className="modal-submit-delete">
                        <input
                          type="submit"
                          value="Update"
                          tabIndex="0"
                        ></input>
                        {/* <DeleteAudioBtn>
                          <DeleteIcon />
                        </DeleteAudioBtn> */}
                      </div>
                    </form>
                  </ModalForm>
                </ModalContent>
              </animated.div>
            )
        )}
      </AudioModalContainer>
    </>
  );
};

export default AudioModal;
