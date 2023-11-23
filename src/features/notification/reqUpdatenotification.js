import axios from "axios";

export const reqUpdatenotification = async ({ id, status, values }) => {
  try {
    const response = await axios.put(
      `https://api.buming-pendamping.com/api/notification/${id}`,
      {
        status,
        values,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
