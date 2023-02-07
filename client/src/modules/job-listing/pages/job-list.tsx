import { AppAdvanceSearch } from '../../../components/advance-search';
import { useState } from 'react';

const AppJobList = () => {
    const [ data, setData ] = useState()

    const onSearch = async (value: any) => {
        console.log(value);
    };

    return (
        <>
            <AppAdvanceSearch onSearch={onSearch}/>
        </>
    )
};

export default AppJobList;
