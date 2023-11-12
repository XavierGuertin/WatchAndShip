import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsService, useJsApiLoader } from '@react-google-maps/api';
import DeliveryForm from './DeliveryForm';

const TrackingDelivery = () => {
    const { pickupRef, deliveryRef } = DeliveryForm();
    const [currentLocation, setCurrentLocation] = useState(null);
    const [routeSteps, setRouteSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [isTracking, setIsTracking] = useState(false);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    });

    useEffect(() => {
        if (isTracking && routeSteps.length > 0) {
            const interval = setInterval(() => {
                updatePackageLocation();
            }, 10000); // Update every 10 seconds

            return () => clearInterval(interval);
        }
    }, [isTracking, routeSteps, stepIndex]);

    const calculateRoute = async () => {
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: pickupRef.current.value,
            destination: deliveryRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING,
        });

        setRouteSteps(results.routes[0].legs[0].steps);
        setCurrentLocation(results.routes[0].legs[0].steps[0].start_location);
    };

    const updatePackageLocation = () => {
        if (stepIndex < routeSteps.length) {
            setCurrentLocation(routeSteps[stepIndex].end_location);
            setStepIndex(stepIndex + 1);
        } else {
            setIsTracking(false); // Stop tracking once the destination is reached
        }
    };

    const startTracking = () => {
        setIsTracking(true);
        calculateRoute(); // Start tracking
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <GoogleMap
                center={currentLocation || { lat: -34.397, lng: 150.644 }} // Default center if no location
                zoom={15}
                mapContainerStyle={{ width: '400px', height: '400px' }}
            >
                {currentLocation && <Marker position={currentLocation} />}
            </GoogleMap>
            <button onClick={startTracking}>Start Tracking</button>
        </div>
    );
};

export default TrackingDelivery;
