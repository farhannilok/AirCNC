import { BASE_URL } from '../constants/base-url';

// retriving all rooms data
export const getAllRooms = async () => {
  const response = await fetch(`${BASE_URL}/rooms`);
  const data = response.json();
  return data;
};

// retriving individual room data with id
export const getSingleRoom = async (id) => {
  const response = await fetch(`${BASE_URL}/room/${id}`);
  const data = response.json();
  return data;
};

// api creating rooms for host
export const postRoom = async (roomData) => {
  const url = `${BASE_URL}/post-rooms`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(roomData),
  });
  const data = await response.json();
  return data;
};

// get host rooms
export const getHostRooms = async (email) => {
  const response = await fetch(`${BASE_URL}/rooms/${email}`);
  const data = response.json();
  return data;
};

// delete host room
export const deleteHostRooms = async (id) => {
  const response = await fetch(`${BASE_URL}/rooms/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = response.json();
  return data;
};
