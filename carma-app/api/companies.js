import axios from "axios"
import { BASE_URL } from "../constants.js";
import { get_headers } from "./util.js";

// Get all the company email daims.
// Returns (list(str)): A list of the email domains.
export async function get_domains() {
    const route = "company/domains";
    const url = `${BASE_URL}/${route}`;
    const response = await axios.get(url);
    let data = JSON.parse(response.data);
    return data['domains']
}