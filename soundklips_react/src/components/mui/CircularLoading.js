import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  height: auto;
  width: auto;
`;

export default function CircularColor() {
  // const isLoading = useSelector((state) => state.loading.apiLoading);
  return (
    <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
      <CircularProgress color="inherit" />
    </Stack>
  );
  // if (isLoading) {

  // } else {
  //   return <div></div>;
  // }
}
