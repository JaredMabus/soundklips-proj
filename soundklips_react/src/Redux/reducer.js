const initialState = {
  account: {
    loginStatus: false,
    email: null,
    account_id: null,
    api: {
      pending: false,
      error: false,
      errorMessage: {},
    },
  },
  theme: "light",
  snackBar: {
    openStatus: false,
    type: "success",
    message: "",
    duration: 5000,
  },
  loading: {
    apiLoading: false,
  },
  audioPlayer: {
    audioPlayerState: true,
    activeAudioFile: {},
    playList: [],
    isPlaying: false,
  },
  audioModal: {
    state: false,
  },
  userAudioData: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // ACCOUNT
    case "LOGIN_STATUS":
      return {
        ...state,
        account: {
          loginStatus: action.payload.loginStatus,
          email: action.payload.email,
          account_id: action.payload.account_id,
          api: state.account.api,
        },
      };

    case "ACCOUNT_API_PENDING":
      return {
        ...state,
        account: {
          loginStatus: state.account.loginStatus,
          email: state.account.email,
          account_id: state.account.account_id,
          api: {
            pending: action.payload,
            error: state.account.api.error,
            errorMessage: state.account.api.errorMessage,
          },
        },
      };

    case "ACCOUNT_API_ERROR":
      return {
        ...state,
        account: {
          loginStatus: state.account.loginStatus,
          email: state.account.email,
          account_id: state.account.account_id,
          api: {
            pending: state.account.api.pending,
            error: action.payload.error,
            errorMessage: action.payload.errorMessage,
          },
        },
      };

    case "ACCOUNT_CONFIRM_EMAIL_STATUS":
      return {
        ...state,
        account: {
          loginStatus: state.account.loginStatus,
          email: state.account.email,
          api: {
            pending: state.account.api.pending,
            error: state.account.api.error,
            errorMessage: state.account.api.errorMessage,
          },
        },
      };
    case "SIGN_OUT":
      return {
        ...state,
        account: {
          loginStatus: false,
          email: null,
          account_id: null,
          api: {
            pending: false,
            error: false,
            errorMessage: {},
          },
        },
      };
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload.theme,
      };
    // Genearl UI Components
    case "SET_COMP_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_API_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_SNACKBAR":
      if (action.payload.duration) {
        return {
          ...state,
          snackBar: {
            openStatus: action.payload.openStatus,
            type: action.payload.type,
            message: action.payload.message,
            duration: action.payload.duration,
          },
        };
      } else {
        return {
          ...state,
          snackBar: {
            openStatus: action.payload.openStatus,
            type: action.payload.type,
            message: action.payload.message,
            duration: state.snackBar.duration,
          },
        };
      }
    case "SET_AUDIOPLAYER_STATE":
      return {
        ...state,
        audioPlayer: {
          audioPlayerState: action.payload.data,
          activeAudioFile: state.audioPlayer.activeAudioFile,
          isPlaying: state.audioPlayer.isPlaying,
        },
      };

    case "SET_ACTIVE_AUDIO":
      return {
        ...state,
        audioPlayer: {
          audioPlayerState: state.audioPlayer.audioPlayerState,
          activeAudioFile: action.payload,
          isPlaying: state.audioPlayer.isPlaying,
        },
      };
    case "TOGGLE_PLAY":
      return {
        ...state,
        audioPlayer: {
          audioPlayerState: state.audioPlayer.audioPlayerState,
          activeAudioFile: state.audioPlayer.activeAudioFile,
          isPlaying: action.payload,
        },
      };

    case "SET_AUDIO_MODAL_STATE":
      return {
        ...state,
        audioModal: {
          state: action.payload.state,
          audio_data: action.payload.audio_data,
        },
      };

    case "SET_USER_AUDIO_DATA":
      return {
        ...state,
        userAudioData: action.payload.data,
      };

    case "UPDATE_USER_AUDIO_DATA":
      console.log(action.payload.data);
      var index = state.userAudioData.findIndex(
        (p) => p.audio_data_id === state.audioModal.audio_data.audio_data_id
      );
      console.log(index);
      const new_list = state.userAudioData.splice(
        index,
        1,
        action.payload.data
      );
      console.log(new_list);
      return { ...state };

    default:
      return state;
  }
}
