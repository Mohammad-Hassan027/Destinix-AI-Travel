import { getCurrentUser } from "../authService";

const getHeaders = () => {
  const user = getCurrentUser();
  return {
    "Content-Type": "application/json",
    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
  };
};

export const getBookings = async (groupId: string) => {
  const res = await fetch(`/api/groups/${groupId}/bookings`, {
    headers: getHeaders()
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch bookings");
  }
  return await res.json();
};

export const createBookingRecord = async (
  groupId: string,
  bookingReference: string,
  bookingType: string,
  amount: number,
  status: string
) => {
  const res = await fetch(`/api/groups/${groupId}/bookings`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ bookingReference, bookingType, amount, status })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to save booking details");
  }
  return await res.json();
};
