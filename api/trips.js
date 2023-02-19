import axios from "axios"
import { BASE_URL } from "../constants.js";
import { get_headers } from "./util.js";

// Add a trip
export async function add_trip(token, email_id, company_domain, emissions, date, trip_type) {
    const route = "trip";
    const url = `${BASE_URL}/${route}`;
    const response = await axios.post(url, {
        email_id: email_id,
        company_domain: company_domain,
        emissions: emissions,
        date: date,
        trip_type: trip_type
    }, get_headers(token));
    return response.data;
}

// Get trip data for user
// Returns: list(str): list of trips
export async function get_trip(token) {
    const route = "trip";
    const url = `${BASE_URL}/${route}`;
    const response = await axios.get(url, get_headers(token));
    return response.data['trips']
}

// Parse trip data into JSON that gives { company_name: savings: emissions
export function parse_trips(trips) {
    let savingTrips = [];
    let emissionsTrips = [];
    let savingTotal = 0;
    let emissionsTotal = 0;
    trips.forEach( (trip) => {
        if (trip['emissions'] < 0) {
            savingTotal -= trip['emissions'];
            savingTrips.push(trip);
        } else {
            emissionsTotal += trip['emissions'];
            emissionsTrips.push(trip);
        }
    });

    return [savingTrips, emissionsTrips, savingTotal, emissionsTotal];
}

// Add a trip
// Returns: list(str): list of trips
export async function redeem_trip(token, trip_ids) {
    const route = "trip";
    const url = `${BASE_URL}/${route}`;
    const response = await axios.post(url, {
        trip_ids: trip_ids
    }, get_headers(token));
    return response.data
}