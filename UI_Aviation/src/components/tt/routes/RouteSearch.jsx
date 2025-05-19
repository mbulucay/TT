import { useState, useEffect } from "react";
import axios from "axios";
import './RouteSearch.css';
import RouteResult from './RouteResult';
import { LocationServices } from "../../../api/services/tt/location/LocationServices";

function RouteSearch() {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState({
        origin: [],
        destination: []
    });
    
    const [selectedValues, setSelectedValues] = useState({
        origin: {
            country: '',
            city: '',
            location: null
        },
        destination: {
            country: '',
            city: '',
            location: null
        }
    });

    const [routeResult, setRouteResult] = useState(null);
    const [error, setError] = useState(null);

    // Fetch all locations on component mount
    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await LocationServices.getAllLocations();
            setLocations(response);
            
            // Get unique countries and sort alphabetically
            const uniqueCountries = [...new Set(response.data.map(loc => loc.country))]
                .sort((a, b) => a.localeCompare(b));
            setFilteredLocations(prev => ({
                origin: uniqueCountries,
                destination: uniqueCountries
            }));
        } catch (err) {
            setError('Failed to fetch locations');
        }
    };

    const handleChange = (type, field, value) => {
        console.log(`Changing ${field} for ${type}:`, value); // Debug log

        setSelectedValues(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [field]: value,
                // Reset dependent fields
                ...(field === 'country' && { city: '', location: null }),
                ...(field === 'city' && { location: null })
            }
        }));

        // Update filtered locations based on selection
        if (field === 'country') {
            const citiesInCountry = [...new Set(
                locations
                    .filter(loc => loc.country === value)
                    .map(loc => loc.city)
            )].sort((a, b) => a.localeCompare(b));
            setFilteredLocations(prev => ({
                ...prev,
                [type]: citiesInCountry
            }));
        } else if (field === 'city') {
            const locationsInCity = locations
                .filter(loc => 
                    loc.country === selectedValues[type].country && 
                    loc.city === value
                )
                .sort((a, b) => a.name.localeCompare(b.name));
            setFilteredLocations(prev => ({
                ...prev,
                [type]: locationsInCity
            }));
        }
    };

    const handleSearch = async () => {
        try {
            console.log(`${selectedValues.origin.location.id} ${selectedValues.destination.location.id}`);
            console.log(`${selectedValues.origin.location.locationCode} ${selectedValues.destination.location.locationCode}`);
            const response = await axios.get('/routes/api/search', {
                params: {
                    originLocationId: selectedValues.origin.location.id,
                    destinationLocationId: selectedValues.destination.location.id
                }
            });
            setRouteResult(response.data);
            setError(null);
        } catch (err) {
            setError('No available route found between selected locations');
            setRouteResult(null);
        }
    };

    return (
        <div className="route-search-container">
            <h1>Route Search</h1>
            
            <div className="search-form">
                <div className="location-sections-container">
                    {/* Origin Selection */}
                    <div className="location-section">
                        <h2>Origin</h2>
                        <select 
                            value={selectedValues.origin.country}
                            onChange={(e) => handleChange('origin', 'country', e.target.value)}
                        >
                            <option value="">Select Country</option>
                            {[...new Set(locations.map(loc => loc.country))]
                                .sort((a, b) => a.localeCompare(b))
                                .map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                        </select>

                        <select 
                            value={selectedValues.origin.city}
                            onChange={(e) => handleChange('origin', 'city', e.target.value)}
                            disabled={!selectedValues.origin.country}
                        >
                            <option value="">Select City</option>
                            {[...new Set(locations
                                .filter(loc => loc.country === selectedValues.origin.country)
                                .map(loc => loc.city))]
                                .sort((a, b) => a.localeCompare(b))
                                .map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))
                            }
                        </select>

                        <select 
                            value={selectedValues.origin.location?.id || ''}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                console.log('Selected Origin Location ID:', selectedId);
                                const location = locations.find(loc => loc.id.toString() === selectedId);
                                console.log('Found Origin Location:', location);
                                handleChange('origin', 'location', location);
                            }}
                            disabled={!selectedValues.origin.city}
                        >
                            <option value="">Select Location</option>
                            {locations
                                .filter(loc => 
                                    loc.country === selectedValues.origin.country && 
                                    loc.city === selectedValues.origin.city
                                )
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map(location => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    {/* Destination Selection */}
                    <div className="location-section">
                        <h2>Destination</h2>
                        <select 
                            value={selectedValues.destination.country}
                            onChange={(e) => handleChange('destination', 'country', e.target.value)}
                        >
                            <option value="">Select Country</option>
                            {[...new Set(locations.map(loc => loc.country))]
                                .sort((a, b) => a.localeCompare(b))
                                .map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                        </select>

                        <select 
                            value={selectedValues.destination.city}
                            onChange={(e) => handleChange('destination', 'city', e.target.value)}
                            disabled={!selectedValues.destination.country}
                        >
                            <option value="">Select City</option>
                            {[...new Set(locations
                                .filter(loc => loc.country === selectedValues.destination.country)
                                .map(loc => loc.city))]
                                .sort((a, b) => a.localeCompare(b))
                                .map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))
                            }
                        </select>

                        <select 
                            value={selectedValues.destination.location?.id || ''}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                console.log('Selected Destination Location ID:', selectedId);
                                const location = locations.find(loc => loc.id.toString() === selectedId);
                                console.log('Found Destination Location:', location);
                                handleChange('destination', 'location', location);
                            }}
                            disabled={!selectedValues.destination.city}
                        >
                            <option value="">Select Location</option>
                            {locations
                                .filter(loc => 
                                    loc.country === selectedValues.destination.country && 
                                    loc.city === selectedValues.destination.city
                                )
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map(location => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <button 
                    onClick={handleSearch}
                    disabled={!selectedValues.origin.location || !selectedValues.destination.location}
                >
                    Search Route
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {routeResult && <RouteResult routes={routeResult} />}
        </div>
    );
}

export default RouteSearch;
