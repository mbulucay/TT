import React, { useState } from 'react';
import './RouteResult.css';

const RouteResult = ({ routes }) => {
    // Move useState before any conditional returns
    const [expandedGroups, setExpandedGroups] = useState(new Set());

    if (!routes || routes.length === 0) return null;

    // Toggle expansion for a group
    const toggleGroupExpansion = (groupIndex) => {
        setExpandedGroups(prev => {
            const newSet = new Set(prev);
            if (newSet.has(groupIndex)) {
                newSet.delete(groupIndex);
            } else {
                newSet.add(groupIndex);
            }
            return newSet;
        });
    };

    // Helper function to compare operating days
    const haveSameDays = (days1, days2) => {
        if (days1.length !== days2.length) return false;
        const sortedDays1 = [...days1].sort();
        const sortedDays2 = [...days2].sort();
        return sortedDays1.every((day, index) => day === sortedDays2[index]);
    };

    // Helper function to compare transportation sequences
    const haveSameTransportTypes = (route1, route2) => {
        if (route1.transportations.length !== route2.transportations.length) return false;
        return route1.transportations.every((transport, index) => 
            transport.transportationType === route2.transportations[index].transportationType
        );
    };

    // Group similar routes together
    const groupSimilarRoutes = (routes) => {
        const groups = [];
        let currentGroup = [routes[0]];

        for (let i = 1; i < routes.length; i++) {
            const current = routes[i];
            const previous = currentGroup[0];

            // Check if routes have same transport types and operating days
            const sameTypes = haveSameTransportTypes(current, previous);
            const sameDays = current.transportations.every((transport, index) => 
                haveSameDays(transport.operatingDays, previous.transportations[index].operatingDays)
            );

            if (sameTypes && sameDays) {
                currentGroup.push(current);
            } else {
                groups.push(currentGroup);
                currentGroup = [current];
            }
        }
        groups.push(currentGroup);
        return groups;
    };

    // Helper function to group transportations by operating days and first transport type
    const groupTransportations = (transportations) => {
        const groups = [];
        let currentGroup = [transportations[0]];
        
        for (let i = 1; i < transportations.length; i++) {
            const current = transportations[i];
            const previous = currentGroup[0];
            
            // Group if days match and both start with UBER
            const bothStartWithUber = 
                previous.transportationType === 'UBER' && 
                current.transportationType === 'UBER';
                
            if (haveSameDays(previous.operatingDays, current.operatingDays) && bothStartWithUber) {
                currentGroup.push(current);
            } else {
                groups.push(currentGroup);
                currentGroup = [current];
            }
        }
        groups.push(currentGroup);
        return groups;
    };

    // Helper function to process transport groups
    const processTransportGroup = (group) => {
        if (group.length > 1 && group[0].transportationType === 'UBER') {
            return [{
                isUberGroup: true,
                count: group.length,
                transportations: group,
                operatingDays: group[0].operatingDays
            }];
        }
        return group;
    };

    const routeGroups = groupSimilarRoutes(routes);

    return (
        <div className="route-results">
            <h3>Available Routes: {routes.length}</h3>
            
            <div className="routes-grid">
                {routeGroups.map((group, groupIndex) => {
                    const route = group[0];
                    const transportationGroups = groupTransportations(route.transportations);
                    const isExpanded = expandedGroups.has(groupIndex);

                    return (
                        <div key={`group-${groupIndex}`} className="route-card">
                            <div className="route-header">
                                <div className="route-header-top">
                                    <h4>Route Option {groupIndex + 1}</h4>
                                    {group.length > 1 && (
                                        <button 
                                            className="expand-button"
                                            onClick={() => toggleGroupExpansion(groupIndex)}
                                        >
                                            {group.length} similar routes {isExpanded ? '▼' : '▶'}
                                        </button>
                                    )}
                                </div>
                                <div className="route-overview">
                                    <span>{route.originLocation.name}, {route.originLocation.city}</span>
                                    <span className="arrow">→</span>
                                    <span>{route.destinationLocation.name}, {route.destinationLocation.city}</span>
                                </div>
                            </div>

                            <div className="transportation-groups">
                                {/* Show first route always */}
                                {transportationGroups.map((tGroup, tGroupIndex) => {
                                    const processedGroup = processTransportGroup(tGroup);
                                    
                                    return (
                                        <div key={`group-${groupIndex}-${tGroupIndex}`} className="transport-group">
                                            <div className="operating-days-header">
                                                <strong>Operating Days:</strong>
                                                <div className="days-list">
                                                    {tGroup[0].operatingDays.map(day => (
                                                        <span key={day} className="day-badge">
                                                            {day.slice(0, 3)}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="transport-steps">
                                                {processedGroup.map((transport, index) => (
                                                    transport.isUberGroup ? (
                                                        <div key={`uber-${index}`} className="transport-step uber-group">
                                                            <div className="transport-icon">
                                                                🚗
                                                            </div>
                                                            <div className="transport-details">
                                                                <div className="transport-type">
                                                                    {transport.count} Similar Uber Routes Available
                                                                    <span className="transport-id">
                                                                        IDs: {transport.transportations.map(t => t.id).join(', ')}
                                                                    </span>
                                                                </div>
                                                                <div className="location-details">
                                                                    <div className="from">
                                                                        <strong>From:</strong> {transport.transportations[0].originLocation.name}
                                                                        <span className="location-code">
                                                                            ({transport.transportations[0].originLocation.locationCode})
                                                                        </span>
                                                                    </div>
                                                                    <div className="to">
                                                                        <strong>To:</strong> {transport.transportations[0].destinationLocation.name}
                                                                        <span className="location-code">
                                                                            ({transport.transportations[0].destinationLocation.locationCode})
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div key={transport.id} className="transport-step">
                                                            <div className="transport-icon">
                                                                {transport.transportationType === 'FLIGHT' && '✈️'}
                                                                {transport.transportationType === 'BUS' && '🚌'}
                                                                {transport.transportationType === 'UBER' && '🚗'}
                                                            </div>
                                                            <div className="transport-details">
                                                                <div className="transport-type">
                                                                    {transport.transportationType}
                                                                    <span className="transport-id">ID: {transport.id}</span>
                                                                </div>
                                                                <div className="location-details">
                                                                    <div className="from">
                                                                        <strong>From:</strong> {transport.originLocation.name}
                                                                        <span className="location-code">({transport.originLocation.locationCode})</span>
                                                                    </div>
                                                                    <div className="to">
                                                                        <strong>To:</strong> {transport.destinationLocation.name}
                                                                        <span className="location-code">({transport.destinationLocation.locationCode})</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Show additional routes when expanded */}
                                {isExpanded && group.slice(1).map((similarRoute, similarIndex) => (
                                    <div key={`similar-${similarIndex}`} className="similar-route">
                                        <div className="similar-route-header">
                                            <h5>Similar Route {similarIndex + 2}</h5>
                                        </div>
                                        {groupTransportations(similarRoute.transportations).map((tGroup, tGroupIndex) => {
                                            const processedGroup = processTransportGroup(tGroup);
                                            
                                            return (
                                                <div key={`similar-${similarIndex}-${tGroupIndex}`} className="transport-group">
                                                    <div className="operating-days-header">
                                                        <strong>Operating Days:</strong>
                                                        <div className="days-list">
                                                            {tGroup[0].operatingDays.map(day => (
                                                                <span key={day} className="day-badge">
                                                                    {day.slice(0, 3)}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="transport-steps">
                                                        {processedGroup.map((transport, index) => (
                                                            transport.isUberGroup ? (
                                                                <div key={`uber-${index}`} className="transport-step uber-group">
                                                                    <div className="transport-icon">
                                                                        🚗
                                                                    </div>
                                                                    <div className="transport-details">
                                                                        <div className="transport-type">
                                                                            {transport.count} Similar Uber Routes Available
                                                                            <span className="transport-id">
                                                                                IDs: {transport.transportations.map(t => t.id).join(', ')}
                                                                            </span>
                                                                        </div>
                                                                        <div className="location-details">
                                                                            <div className="from">
                                                                                <strong>From:</strong> {transport.transportations[0].originLocation.name}
                                                                                <span className="location-code">
                                                                                    ({transport.transportations[0].originLocation.locationCode})
                                                                                </span>
                                                                            </div>
                                                                            <div className="to">
                                                                                <strong>To:</strong> {transport.transportations[0].destinationLocation.name}
                                                                                <span className="location-code">
                                                                                    ({transport.transportations[0].destinationLocation.locationCode})
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div key={transport.id} className="transport-step">
                                                                    <div className="transport-icon">
                                                                        {transport.transportationType === 'FLIGHT' && '✈️'}
                                                                        {transport.transportationType === 'BUS' && '🚌'}
                                                                        {transport.transportationType === 'UBER' && '🚗'}
                                                                    </div>
                                                                    <div className="transport-details">
                                                                        <div className="transport-type">
                                                                            {transport.transportationType}
                                                                            <span className="transport-id">ID: {transport.id}</span>
                                                                        </div>
                                                                        <div className="location-details">
                                                                            <div className="from">
                                                                                <strong>From:</strong> {transport.originLocation.name}
                                                                                <span className="location-code">({transport.originLocation.locationCode})</span>
                                                                            </div>
                                                                            <div className="to">
                                                                                <strong>To:</strong> {transport.destinationLocation.name}
                                                                                <span className="location-code">({transport.destinationLocation.locationCode})</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RouteResult; 