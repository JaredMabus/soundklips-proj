// // ICONS
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MusicVideoTwoToneIcon from "@mui/icons-material/MusicVideoTwoTone";
import AlbumTwoToneIcon from "@mui/icons-material/AlbumTwoTone";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export const NavData = [
  // {
  //   id: 0,
  //   title: 'Account',
  //   path: '/account',
  //   icon: <AccountBoxIcon/>,
  //   needLogin: true,
  // },
  {
    id: 1,
    title: "Discover",
    path: "/discover",
    icon: <AlbumTwoToneIcon />,
    needLogin: false,
  },
  {
    id: 2,
    title: "Library",
    path: "/library",
    icon: <LibraryMusicIcon />,
    needLogin: true,
  },
  {
    id: 3,
    title: "Upload",
    path: "/upload",
    icon: <UploadFileIcon />,
    needLogin: true,
  },
];
