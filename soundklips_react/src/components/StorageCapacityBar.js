import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as themes from "../themes";

const StorageCapacityContainer = styled.div`
  align-self: start;
  display: flex;
  flex-direction: column;
  justify-content: start;
  flex-wrap: nowrap;
  min-height: auto;
  max-height: auto;
  min-width: 200px;
  max-width: 200px;
  padding: 10px;
  margin: 0 10px 0 0;
  white-space: nowrap;

  p {
    font-weight: 500;
    padding: 0;
    margin: 0 0 3px 0;
  }
`;

const CapacityBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start; 
    flex-wrap: nowrap; 
    background-color: lightgrey;
    min-height: 7px;
    max-height: 7px;
    width: 100%;
    border-radius: 5px 5px 5px 5px;
    margin 3px 0 0 0;   
`;

const StorageUsedBar = styled.div`
  background-color: #76c7c4;
  min-width: ${({ storageUsedPercent }) => `${storageUsedPercent}%`};
  max-width: ${({ storageUsedPercent }) => `${storageUsedPercent}%`};
  min-height: 100%;
  max-height: 100%;
  border-right: 1px solid white;
`;

const PercentUsedNum = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  font-weight: 500;
  padding: 0 0 0 0;
  margin: 0 0 0 0px;
`;

const StorageCapcityBar = () => {
  const [storageUsedPercent, setStorageUsedPercent] = useState(0);
  const [storageUsedMB, setStorageUsedMB] = useState(
    localStorage.getItem("total_file_storage")
  );
  // const [storageUsedMB, setStorageUsedMB] = useState(400)
  const [maxStorageMB, setUnusedStorageMB] = useState(1000);

  useEffect(() => {
    try {
      setStorageUsedMB(localStorage.getItem("total_file_storage"));
      let percent = (storageUsedMB / maxStorageMB) * 100;
      setStorageUsedPercent(percent.toFixed(1));
    } catch (err) {
      let percent = 100;
      setStorageUsedPercent(percent.toFixed(1));
    }
  }, []);

  return (
    <>
      <StorageCapacityContainer>
        <p>{maxStorageMB / 1000}GB of Storage</p>
        {storageUsedPercent === 100 ? (
          <p>All storage Used</p>
        ) : (
          <div>
            Storage Used: <b>{storageUsedPercent}%</b> ({storageUsedMB}MB)
          </div>
        )}

        <CapacityBar>
          <StorageUsedBar storageUsedPercent={storageUsedPercent}>
            <PercentUsedNum>
              {/* <div><b>{storageUsedPercent}%</b></div> */}
            </PercentUsedNum>
            {/* <div><b>{storageUsedPercent}%</b></div> */}
          </StorageUsedBar>
        </CapacityBar>
      </StorageCapacityContainer>
    </>
  );
};

export default StorageCapcityBar;
