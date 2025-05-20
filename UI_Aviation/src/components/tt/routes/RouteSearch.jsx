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

    const [formData, setFormData] = useState({
        originLocation: null,
        destinationLocation: null,
        operatingDays: ["0", "1", "2", "3", "4", "5", "6"]
    });

    const daysOfWeek = [
        { label: "SUNDAY", value: "0" },
        { label: "MONDAY", value: "1" },
        { label: "TUESDAY", value: "2" },
        { label: "WEDNESDAY", value: "3" },
        { label: "THURSDAY", value: "4" },
        { label: "FRIDAY", value: "5" },
        { label: "SATURDAY", value: "6" },
    ];

    const [routeResult, setRouteResult] = useState(null);
    const [error, setError] = useState(null);

    const allDaysSelected = formData.operatingDays.length === daysOfWeek.length;

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

        // Update formData when location is selected
        if (field === 'location') {
            setFormData(prev => ({
                ...prev,
                [`${type}Location`]: value
            }));
        }

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

    const handleDaySelection = (dayValue) => {
        setFormData(prev => {
            const updatedDays = prev.operatingDays.includes(dayValue)
                ? prev.operatingDays.filter(day => day !== dayValue)
                : [...prev.operatingDays, dayValue];
            
            return {
                ...prev,
                operatingDays: updatedDays
            };
        });
    };

    const handleFindRoutes = async () => {
        try {
            console.log(JSON.stringify(formData));

            console.log(JSON.stringify( {
                originLocation: formData.originLocation.locationCode,
                destinationLocation: formData.destinationLocation.locationCode,
                operatingDays: formData.operatingDays
            }));
            
            const response = await axios.post('/routes/find', {
                originLocation: formData.originLocation.locationCode,
                destinationLocation: formData.destinationLocation.locationCode,
                operatingDays: formData.operatingDays
            });
            setRouteResult(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to find routes');
            setRouteResult(null);
        }
    };

    const handleToggleAllDays = () => {
        setFormData(prev => ({
            ...prev,
            operatingDays: allDaysSelected ? [] : daysOfWeek.map(day => day.value)
        }));
    };

    return (
        <div className="route-search-container">
            <h1>Route Search</h1>
            
            <div className="search-form">
                <div className="days-selection-container mb-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-semibold">Operating Days</h2>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={allDaysSelected}
                                onChange={handleToggleAllDays}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">
                                {allDaysSelected ? 'Deselect All' : 'Select All'}
                            </span>
                        </label>
                    </div>
                    <div className="flex justify-between gap-2">
                        {daysOfWeek.map(day => (
                            <button
                                key={day.value}
                                className={`
                                    w-32 h-7 rounded-md text-xs font-medium
                                    transform transition-all duration-200
                                    flex items-center justify-center
                                    ${formData.operatingDays.includes(day.value)
                                        ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-sm scale-105 hover:from-blue-600 hover:to-blue-700'
                                        : 'bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600 border border-gray-200'
                                    }
                                    hover:shadow-sm active:scale-95
                                `}
                                onClick={() => handleDaySelection(day.value)}
                                type="button"
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>
                </div>

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
                    // onClick={handleSearch}
                    // disabled={!selectedValues.origin.location || !selectedValues.destination.location}
                    onClick={handleFindRoutes}
                    disabled={!selectedValues.origin.location || 
                             !selectedValues.destination.location ||
                             formData.operatingDays.length === 0}
                    className="mt-6"
                >
                    Find Routes
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {routeResult && <RouteResult routes={routeResult} />}
        </div>
    );
}

export default RouteSearch;
