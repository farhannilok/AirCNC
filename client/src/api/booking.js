// API for booking rooms

import { BASE_URL } from '../constants/base-url';

export const addBooking = async (bookingData) => {
  const url = `${BASE_URL}/bookings`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ bookingData }),
  });
  const data = await response.json();
  return data;
};

// Update room status
export const updateStatus = async (id, status) => {
  const url = `{BASE_URL}/rooms/status/${id}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  const data = await response.json();
  return data;
};

// get booking data for guest
export const getMyBooking = async (email) => {
  const response = await fetch(`${BASE_URL}/bookings?email=${email}`);
  const data = await response.json();
  return data;
};

// delete booking
export const cancelBooking = async (id) => {
  const response = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};
