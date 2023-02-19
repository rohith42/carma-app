import axios from "axios"
import { BASE_URL } from "../server-conn.js";
import { get_headers } from "util.js";

// Add a trip
export async function add_trip(token, username, company_name, emissions, date, trip_type) {
    const route = "trip";
    const url = `${BASE_URL}/${route}`;
    const response = await axios.post(url, {
        username: username,
        company_name: company_name,
        emissions: emissions,
        date: date,
        trip_type: trip_type
    }, get_headers(token));
    return response.data;
}

// Add a trip
// Returns: list(str): list of trips
export async function get_trip(token, username, company_name, emissions, date, trip_type) {
    const route = "trip";
    const url = `${BASE_URL}/${route}`;
    const response = await axios.get(url, get_headers(token));
    let data = JSON.parse(response.data);
    return data['trips']
}

// Parse trip data into JSON that gives { company_name: savings: emissions
export function parse_trips(trips) {
    let data = {}
    trips.forEach( (trip) => {
        company_name = trip['company_name'];
        if (!(company_name in data)) {
            data[company_name] = {
                'savings': 0,
                'emissions': 0,
                'trips': []
            }
        }
        data[company_name]['trips'].append(trip);
        if (trip['emissions'] < 0) {
            data[company_name]['savings'] -= trip['emissions']
        } else {
            data[company_name]['emissions'] += trip['emissions']
        }
    });

    return data;
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