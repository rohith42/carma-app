import { EMISSIONS_PER_GAL_MAPPING, AVG_MILEAGE_MAPPING } from "../constants.js";

// Parameter: speed (in miles per hour)
// Returns: A penalty for emissions
function penalty_function(speed) {
    if (speed <= 10) return 2;
    if (10 <= speed && speed <= 50) return 1;

    let multiplier = Math.floor((speed-50)/5);
    return 1 + 0.14 * multiplier;
}

// Params: trip_type (str), miles_travelled (flaot), duration (in minutes)
export function co2_emissions(trip_type, miles_travelled, duration) {
    let hour_duration = duration / 60;
    let speed = miles_travelled / hour_duration;
    let penalty = penalty_function(speed);
    let emissions_per_gallon = EMISSIONS_PER_GAL_MAPPING[trip_type];
    let avg_mileage = AVG_MILEAGE_MAPPING[trip_type];

    let emissions = emissions_per_gallon * (miles_travelled / avg_mileage) * penalty;
    if (trip_type == 'UberGreen') {
        return -1 * emissions;
    }
    return emissions;
}
