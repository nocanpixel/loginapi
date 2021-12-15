import { useState, useEffect } from "react";
import jwt from 'jwt-simple';

export default function usePayLoad(x_token) {
    const [response, setResponse] = useState(false);

    useEffect(() => {
        let payload = {}
        payload = jwt.decode(x_token, 'Nocan');
        const timer = (payload.expiredAt * 1000) - Date.now();
        setResponse(timer);
        setTimeout(() => {
            setResponse(true)
        }, timer)
    }, [x_token])
    return (
        response
    );
}