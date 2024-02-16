import {Map} from "./components/map/Map";
import {useJsApiLoader} from "@react-google-maps/api";
import {useState} from "react";

const API_KEY = process.env.REACT_APP_API_KEY;
const defaultCenter = {
    lat: 49.8382600,
    lng: 24.0232400
}

const App = () => {
    const [markers, setMarkers] = useState([]);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
    });

    return (
        <div>
            {
                isLoaded?
                    <Map apiKey={API_KEY} center={defaultCenter} markers={markers} setMarkers={setMarkers}/> :
                    <h1 className='flex justify-around'>Loading...</h1>
            }
        </div>
    );
}

export default App;
