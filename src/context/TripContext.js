import React, { createContext, useContext, useMemo, useRef, useState } from 'react';

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [savedTrips, setSavedTrips] = useState([]);
  const [points, setPoints] = useState(0);
  const pointsRef = useRef(0);

  const value = useMemo(
    () => ({
      savedTrips,
      points,
      addPoints: (amount) => {
        if (!Number.isFinite(amount) || amount < 0) {
          throw new Error('La cantidad de puntos debe ser un número válido.');
        }

        pointsRef.current += amount;
        setPoints(pointsRef.current);
      },
      redeemPoints: (amount) => {
        if (!Number.isInteger(amount) || amount <= 0) {
          throw new Error('El costo del canje debe ser un número entero positivo.');
        }

        if (pointsRef.current < amount) {
          return false;
        }

        pointsRef.current -= amount;
        setPoints(pointsRef.current);
        return true;
      },
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
      clearTrips: () => setSavedTrips([]),
      isTripSaved: (tripId) => savedTrips.some((item) => item.id === tripId),
    }),
    [points, savedTrips]
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
