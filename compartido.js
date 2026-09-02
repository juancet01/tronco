import React, { createContext, useState, useContext } from 'react';

const TripContext = createContext();

export function TripProvider({ children }) {
  const [savedTrips, setSavedTrips] = useState([]);

  const addTrip = (trip) => {
    setSavedTrips((current) => {
      if (current.some((item) => item.id === trip.id)) return current;
      return [...current, trip];
    });
  };

  const removeTrip = (tripId) => {
    setSavedTrips((current) => current.filter((item) => item.id !== tripId));
  };

  const isTripSaved = (tripId) => {
    return savedTrips.some((item) => item.id === tripId);
  };

  return (
    <TripContext.Provider value={{ savedTrips, addTrip, removeTrip, isTripSaved }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripContext);
  if (!context) throw new Error('useTrips debe usarse dentro de TripProvider');
  return context;
}