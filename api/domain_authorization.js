import axios from "axios"
import { BASE_URL } from "../server-conn.js";
import { get_headers } from "./util.js";

// Post authorization.
export async function post_authorization(token, domains) {
    const route = "authorization";
    const url = `${BASE_URL}/${route}`;
    const response = await axios.post(url, {
        domains: domains
    }, get_headers(token));
    return response.data;
}

// Get domains the user is authoirzed for.
export async function get_authorization(token) {
    const route = "authorization";
    const url = `${BASE_URL}/${route}`;
    const response = await axios.post(url, get_headers(token));
    return response.data;
}