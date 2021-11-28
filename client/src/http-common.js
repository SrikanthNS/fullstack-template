import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:6868/api',
    headers: {
        "Content-type": "application/json"
    }
});