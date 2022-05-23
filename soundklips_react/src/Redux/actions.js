// ACCOUNT ACTIONS
export function LogIn(data) {
  return {
    type: "LOGIN_STATUS",
    payload: {
      loginStatus: data.loginStatus,
      email: data.email,
      account_id: data.account_id,
    },
  };
}

export function accountApiPending(status) {
  return {
    type: "ACCOUNT_API_PENDING",
    payload: status,
  };
}

export function accountApiError(data) {
  return {
    type: "ACCOUNT_API_ERROR",
    payload: {
      error: data.error,
      errorMessage: data.errorMessage,
    },
  };
}

export function signOut() {
  return {
    type: "SIGN_OUT",
    payload: {
      loginStatus: false,
      email: null,
      account_id: null,
    },
  };
}

export function setConfirmEmail(data) {
  return {
    type: "ACCOUNT_CONFIRM_EMAIL_STATUS",
    payload: {
      confirmEmailStatus: data.confirmEmailStatus,
    },
  };
}

export function setReduxTheme(theme) {
  return {
    type: "SET_THEME",
    payload: {
      theme,
    },
  };
}

// General UI components
export function setComponentLoading(loadingStatus) {
  return {
    type: "SET_COMP_LOADING",
    payload: {
      componentLoading: loadingStatus,
    },
  };
}

export function setApiLoading(loadingStatus) {
  return {
    type: "SET_API_LOADING",
    payload: {
      apiLoading: loadingStatus,
    },
  };
}

export function setSnackBar(openStatus, type, message, duration) {
  return {
    type: "SET_SNACKBAR",
    payload: {
      openStatus,
      type,
      message,
      duration,
    },
  };
}

// Audio Player
export function setAudioPlayerState(data) {
  return {
    type: "SET_AUDIOPLAYER_STATE",
    payload: {
      data,
    },
  };
}

export function setActiveAudio(data) {
  return {
    type: "SET_ACTIVE_AUDIO",
    payload: data,
  };
}

export function togglePlay(value) {
  return {
    type: "TOGGLE_PLAY",
    payload: value,
  };
}

export function setAudioModalState(data) {
  return {
    type: "SET_AUDIO_MODAL_STATE",
    payload: {
      state: data.state,
      audio_data: data.audio_data,
    },
  };
}

export function setUserAudioData(data) {
  return {
    type: "SET_USER_AUDIO_DATA",
    payload: {
      data,
    },
  };
}
export function updateUserAudioData(data) {
  return {
    type: "UPDATE_USER_AUDIO_DATA",
    payload: {
      data: data,
    },
  };
}
