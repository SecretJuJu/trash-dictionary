import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export const Logout = (props: any) => {
    
    useEffect(() => {
        localStorage.clear();
    }, []);
    
    return (
        <>
            <Redirect to="/" />
        </>
    )
}
