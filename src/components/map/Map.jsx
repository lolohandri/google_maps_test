import React, {useState} from 'react';
import {GoogleMap, Marker, useGoogleMap} from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const Map = ({center, markers, setMarkers}) => {
    const mapRef = React.useRef(undefined)

    const onLoad = React.useCallback(function callback(map) {
        mapRef.current = map
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined
    }, []);

    const [markerId, setMarkerId] = useState(0);
    const map = useGoogleMap()

    const onMapClick = (e) => {
        setMarkers((current) => [
            ...current,
            {
                id: markerId,
                coords: e.latLng.toJSON()
            }
        ]);
        setMarkerId((markerId => markerId + 1));
    };
    const handleOnMarkerClick = (e, index) => {
        const filteredMarkers = markers.filter((marker) => marker.id !== index)
        setMarkers(filteredMarkers)
    }

    return mapRef ?
        <div className='flex flex-row w-screen h-svh'>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={onMapClick}
            >
                {markers?.map((marker, id) => (
                    <Marker
                        key={marker.id}
                        label={`${marker.id + 1}`}
                        draggable={true}
                        onClick={(e) => handleOnMarkerClick(e, marker.id)}
                        onDragEnd={(e) => marker.coords = e.latLng.toJSON()}
                        position={marker.coords}
                    />
                ))}
            </GoogleMap>
            <button
                className='w-36'
                type="button"
                onClick={() => {
                    setMarkers([]);
                    setMarkerId(0);
                }}>
                Clear markers
            </button>
        </div>
        : <div className='flex justfy-around'>
            <h1>Something went wrong while loading map!</h1>
        </div>
}
export {Map}