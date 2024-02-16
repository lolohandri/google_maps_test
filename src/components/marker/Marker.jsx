import React from 'react';
const Marker = (options) => {
    const [marker, setMarker] = React.useState(null);

    React.useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker());
        }
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);
    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);
    return null;
};

export {Marker}