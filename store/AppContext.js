import { createContext, useState, useEffect } from "react";
import { get_trip, parse_trips } from '../api/trips.js';

/**
 * Context is an app-wide state management system.
 * This AppContext is used to manage state for while it's running. 
 * This is a little simpler and more robust than using
 * route params to send information back and forth between screens.
 *
 * To manage state in this context, create a stateful variable using the
 * useState hook as you normally would, and then make sure to pass that
 * variable and/or it's setter (or an associated wrapper function) to the
 * value prop in the AppContext.Provider component in the return
 * statement.
 *
 * To use a function or variable defined in this context in another
 * component, use the useContext hook. For example, if I wanted to use
 * the phoneNum variable and setPhoneNum function in a different component,
 * I would type:
 *      const { phoneNum, setPhoneNum } = useContext(AppContext);
 * Make sure you import useContext and AppContext at the the top
 * of the file.
 */

const AppContext = createContext();

export function AppContextProvider({ children }) {
    const [cookie, setCookie] = useState("");
    const [savingTrips, setSavingTrips] = useState([]);
    const [emissionsTrips, setEmissionsTrips] = useState([]);
    const [savingTotal, setSavingTotal] = useState(0);
    const [emissionsTotal, setEmissionsTotal] = useState(0);

    async function update() {
        console.log("RUNNING UPDATE");
        let trips = await get_trip(cookie);
        console.log(trips);
        const [savingTrips, emissionsTrips, savingTotal, emissionsTotal] = parse_trips(trips);
        setSavingTrips(savingTrips);
        setEmissionsTrips(emissionsTrips);
        setSavingTotal(savingTotal);
        setEmissionsTotal(emissionsTotal);
        console.log("RAN UPDATE");
        console.log(savingTrips);
        console.log(savingTotal);
    }

    useEffect(() => {
        if (cookie) {
            update();
        }
    }, [cookie]);

    return (
        <AppContext.Provider
            value={{
                cookie,
                setCookie
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppContext;