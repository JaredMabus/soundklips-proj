import * as actions from "../../Redux/actions";
import store from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import useUpdateForm from "./useForm";

export const updateAudioAPI = async (formValues) => {
  try {
    store.dispatch(actions.setApiLoading(false));
  } catch (err) {
    console.log(err);
  } finally {
    store.dispatch(actions.setApiLoading(false));
  }
};

export const deleteAudioData = async () => {};
