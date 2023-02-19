import axios from "axios"
import { BASE_URL } from "../server-conn.js";
import { get_headers } from "util.js";

// Login user.
export async function login(token, username, password) {
    const route = "user/login";
    const url = `${BASE_URL}/${route}`;
    const response = await axios.post(url, {
        username: username,
        password: password
    }, get_headers(token));
    return response.data;
}


// Signup user.
export async function login(token, username, password, email, full_name) {
    const route = "user/signup";
    const url = `${BASE_URL}/${route}`;
    const response = await axios.post(url, {
        username: username,
        password: password,
        email: email,
        full_name: full_name
    }, get_headers(token));
    return response.data;
}