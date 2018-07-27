import axios from 'axios';

export default function setAuthorizationToken(token) {
    if (token){
        console.log("SUCCESS - setAuthorizationToken");
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        console.log("ERROR - setAuthorizationToken");
        delete axios.defaults.headers.common['Authorization'];
    }
}