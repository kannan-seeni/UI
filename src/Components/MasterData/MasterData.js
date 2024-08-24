import React from "react";
import RegionTable from './Region/Region';
import GodownTable from './Godown/GodownTable';
import GodownInput from './Godown/GodownInput';

const MasteData = ({options}) => {
    return(
        <>
            <RegionTable />
            <GodownTable />
            <GodownInput />
        </>
    )
}

export default MasteData;