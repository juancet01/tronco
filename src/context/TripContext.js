import React, { createContext, useContext, useMemo, useState } from 'react';

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [savedTrips, setSavedTrips] = useState([]);

  const value = useMemo(
    () => ({
      savedTrips,
      addTrip: (trip) => {
        setSavedTrips((currentTrips) =>
          currentTrips.some((item) => item.id === trip.id)
            ? currentTrips
            : [...currentTrips, trip]
        );
      },
      removeTrip: (tripId) => {
        setSavedTrips((currentTrips) => currentTrips.filter((item) => item.id !== tripId));
      },
      isTripSaved: (tripId) => savedTrips.some((item) => item.id === tripId),
    }),
    [savedTrips]
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrips() {
  const context = useContext(TripContext);

  if (!context) {
    throw new Error('useTrips debe usarse dentro de TripProvider');
  }

  return context;
}
