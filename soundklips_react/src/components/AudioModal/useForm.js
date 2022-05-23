import React, { useState, useEffect } from "react";
// import * as themes from "../../themes";
// import styled from "styled-components";
import { fetchAPI } from "../../api/fetchAPI";
import * as actions from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import store from "../../Redux/store";

const useUpdateForm = () => {
  const formJSON = useSelector((state) => state.audioModal.audio_data);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setFormErrors(null);

      let response = await fetchAPI("/api/edit/audio-data", formValues);
      let data = response.json();

      store.dispatch(actions.updateUserAudioData(formValues));

      store.dispatch(
        actions.setAudioModalState({
          state: !store.getState().audioModal.state,
          audio_data: null,
        })
      );

      store.dispatch(
        actions.setSnackBar(true, "success", "Sample Updated!", 5000)
        // actions.setSnackBar(true, "error", "Sample wasn't updated", 5000)
      );
    } catch (err) {
      console.log(err);
      actions.setSnackBar(true, "error", "Sample wasn't updated", 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormValues(formJSON);
  }, []);

  return { formValues, formErrors, handleChange, handleSubmit };
};

export default useUpdateForm;
