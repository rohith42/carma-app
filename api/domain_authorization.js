import axios from "axios"
import { BASE_URL } from "../constants.js";
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
    const response = await axios.get(url, get_headers(token));
    console.log("-------");
    console.log(response.data);
    console.log(response.data[0]);
    console.log(response.data[0]['domains']);
    console.log("-------");
    return response.data[0]['domains'];
}