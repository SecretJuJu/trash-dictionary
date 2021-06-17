import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = (props: any) => {
    
    const history = useHistory()

    useEffect(() => {
        localStorage.clear();
    }, []);
    

    const toHome = () => {
        history.push("/")
    }

    return (
        <>
            { toHome() }
        </>
    )
}

export default Logout