import * as WebBrowser from 'expo-web-browser';
import { Buffer } from 'buffer';
import { add_trip } from '../api/trips.js';
import { get_authorization } from '../api/domain_authorization.js';
import { co2_emissions } from './compute_emissions.js';
import { UBER_TYPES, GMAIL_API_URL } from '../constants.js';
import { isDate } from 'util';

WebBrowser.maybeCompleteAuthSession();

function getEmailQueryString(email_domains) {
    let email_query_string = email_domains.join(' OR ');
    var query_string = `from:(${email_query_string})`;
    //console.log(query_string);
    return query_string;
}

function getDate(email_response_body) {
  let headers = JSON.parse(email_response_body)['payload']['headers'];
  let date = undefined;
  headers.forEach((header) => {
    if (header['name'] == 'Date') {
      date = header['value'];
      date = date.split(' ').slice(1,5).join(' ');
    }
  });
  return date;
}

async function addTrips(token, accessToken, domain) {
    let email_query_response = await fetch(`${GMAIL_API_URL}?q=${getEmailQueryString([domain])}`, {
        headers: { Authorization: `Bearer ${accessToken}`
        }
      });
    
    let response_body = await email_query_response.text();
    //console.log(response_body);
    let ids = JSON.parse(response_body)['messages'].map((message)=> {return message['id']});
    //console.log(ids);


    ids.forEach(async (id) => {
        try {
            let email_response = await fetch(`${GMAIL_API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}`
                }
            });
            let email_response_body = await email_response.text();
            let base64_encoded_body =  JSON.parse(email_response_body)['payload']['body']['data'];
            let date = getDate(email_response_body);
            let email_body = Buffer.from(base64_encoded_body, 'base64').toString('ascii'); //base64.decode(base64_encoded_body.trim());
            UBER_TYPES.forEach((type) => { // temporary usage of UBER_TYPES -- should actually be a list of all types corresponding to the domain.
                if (email_body.includes(type)) {
                    let miles_split = email_body.split('miles');
                    let miles_split_2 = miles_split[0].split(">");
                    let miles = parseFloat(miles_split_2[miles_split_2.length-1].trim());
                    
                    let minutes = parseInt(miles_split[1].split("|")[1].split("min")[0].split());
    
                    let emissions = co2_emissions(type, miles, minutes);
    
                    add_trip(token, id, domain, emissions, date, type);
    
                    let trip = {
                    trip_type: type,
                    miles: miles,
                    time_duration: minutes,
                    date: date,
                    emissions: emissions
                    }
                    //console.log(JSON.stringify(trip, null, 2));
                }
            });
        } catch (error) {
            console.log(error);
        }
    });
}

export async function getAndParseEmails(our_token, google_oauth_token) {
  console.log("getting emails...");
  let domains = await get_authorization(our_token);
  //console.log(domains);
  //console.log("PAST AUTH1923481-028401-2384-1029384-1023984-102384-10923480");
  domains.forEach(async (domain) => {
    await addTrips(our_token, google_oauth_token, domain);
  });
}