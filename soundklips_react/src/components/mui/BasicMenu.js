import * as React from "react";
import * as themes from "../../themes";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as actions from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";

// MUI Url: https://mui.com/components/menus/

const ButtonWrapper = styled(themes.Menu)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: auto;
  margin: 3px 0 0 0;

  svg {
    color: ${(props) => props.theme.fontColor};
    // padding: -1px;
    transition: 350ms;
  }

  :hover {
    // background-color: #eef1f4;
    // color: #5fd635;

    svg {
      color: ${(props) => props.theme.hover};
      background-color: ${(props) => props.theme.fontColor};
      // border: 1px solid ${(props) => props.theme.fontColor};
      border-radius: 5px;
    }
  }

  p {
    color: #36454f;
    font-size: 1em;
    margin: 0;
    padding: 0;
  }

  button {
    padding: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      font-size: 0.5em;
    }
  }
`;

const MenuLinks = styled.div`
  color: #36454f;

  a {
    color: #36454f;
    font-size: 0.5em;
  }
`;

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();
  const signOutClose = () => {
    localStorage.removeItem("token");
    dispatch(actions.signOut());
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ButtonWrapper>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AccountBoxIcon title="Account" />
        </Button>
      </ButtonWrapper>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        disableScrollLock={true}
      >
        {/* <MenuLinks>
          <Link to="/account">
            <MenuItem onClick={handleClose}>My Account</MenuItem>
          </Link>
        </MenuLinks> */}
        <MenuLinks>
          <Link to="/settings">
            <MenuItem onClick={handleClose}>Settings</MenuItem>
          </Link>
        </MenuLinks>
        <MenuLinks>
          <Link to="/">
            <MenuItem onClick={signOutClose}>Logout</MenuItem>
          </Link>
        </MenuLinks>
      </Menu>
    </div>
  );
}
