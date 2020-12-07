import React from 'react';
import './errorMessage.css';

const ErrorMessage = () => {
    return (
        <>
            <img src={process.env.PUBLIC_URL + '/img/got.jpeg'} alt="error" />
            <span>Something goes wrons</span>
        </>
    )
}

export default ErrorMessage;