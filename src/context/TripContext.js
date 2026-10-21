import React, { createContext, useContext, useMemo, useState } from 'react';

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [cartTrips, setCartTrips] = useState([]);

  const value = useMemo(
    () => ({
      cartTrips,
      addToCart: (trip, passengerCount = 1) => {
        setCartTrips((currentTrips) =>
          currentTrips.some((item) => item.id === trip.id)
            ? currentTrips
            : [...currentTrips, { ...trip, passengerCount }]
        );
      },
      removeFromCart: (tripId) => {
        setCartTrips((currentTrips) => currentTrips.filter((item) => item.id !== tripId));
      },
      isInCart: (tripId) => cartTrips.some((item) => item.id === tripId),
    }),
    [cartTrips]
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
