import Drawer from "./DrawerLeft/DrawerLeft";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import SnackBar from "../components/mui/Snackbar";

const GeneralUI = () => {
  return (
    <>
      <Drawer />
      <AudioPlayer />
      <SnackBar />
    </>
  );
};

export default GeneralUI;
