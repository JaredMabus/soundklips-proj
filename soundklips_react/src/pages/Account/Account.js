import React from "react";
import styled from "styled-components";
import UI from "../../components/UI";
// import {Link} from 'react-router-dom';
// import DrawerLeft from "../../components/DawerLeft/DrawerLeft";

const AccountContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const Section = styled.div`
  min-width: 100%;
  height: 400px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: grey;
  // margin: 2em 0 0 17em;
  // padding: 0 0 0 0;
  background-color: #fff;
  // background-color: #1C1C1C;
`;

const Account = () => {
  return (
    <>
      <UI />
      <AccountContainer>
        <Section>
          <h1>Account</h1>
        </Section>
      </AccountContainer>
    </>
  );
};
export default Account;
