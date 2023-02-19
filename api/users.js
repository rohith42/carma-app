import axios from "axios"
import { BASE_URL } from "../server-conn.js";
import { get_headers } from "./util.js";

// Login user.
export async function login(email, password) {
    const route = "user/login";
    const url = `${BASE_URL}/${route}`;
    console.log(url);
    console.log(JSON.stringify({
        email: email,
        password: password
    }));
    const response = await axios.post(url, {
        email: email,
        password: password
    });
    console.log(response);
    return response.data;
}

// Signup user.
export async function signup(email, password, full_name) {
    const route = "user/signup";
    const url = `${BASE_URL}/${route}`;
    const response = await axios.post(url, {
        email: email,
        password: password,
        full_name: full_name
    });
    return response.data;
}