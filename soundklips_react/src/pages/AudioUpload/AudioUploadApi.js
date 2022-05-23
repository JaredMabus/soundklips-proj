import React from "react";

// import { useSelector } from "react-redux";
import store from "../../Redux/store";
import * as actions from "../../Redux/actions";

export const audioFileUploadApi = async (formValue) => {
  try {
    store.dispatch(actions.setApiLoading(true));

    // Attach Token and user credentials to json object
    let auth_cred = store.getState().account;
    formValue.email = auth_cred.email;
    formValue.account_id = auth_cred.account_id;
    formValue.token = localStorage.getItem("token");
    // console.log(formValue);
    var formData = new FormData();
    let audio_file = document.getElementById("audio_file").files[0];
    let audio_img_file = document.getElementById("audio_img").files[0];

    formData.append("audio_file", audio_file); // append file to formData object
    formData.append("audio_img", audio_img_file); // append file to formData object
    formData.append("data", JSON.stringify(formValue)); // append form values as json to formData object
    formData.append("token", localStorage.getItem("token"));

    let uri = `${process.env.REACT_APP_URI}/api/audio-data/upload`;
    let options = {
      method: "POST",
      headers: {
        "Conntent-Type": "multipart/form-data",
        Accept: "application/json",
      },
      body: formData,
    };
    const response = await fetch(uri, options);
    const message = await response.json();
    if (response.status === 200) {
      store.dispatch(
        actions.setSnackBar(true, "success", "Audio Uploaded!", 5000)
      );
      return { audioUploaded: true, message: message };
    } else if (response.status === 403) {
      return { audioUploaded: false, message: "Token Required" };
    } else {
      actions.setSnackBar(true, "error", "Failed to upload", 5000);
      return { audioUploaded: false, message: message };
    }
  } catch (err) {
    console.log(err);
  } finally {
    store.dispatch(actions.setApiLoading(false));
  }
};
