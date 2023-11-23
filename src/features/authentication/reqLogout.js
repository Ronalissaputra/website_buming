import axios from "axios";

export const reqLogout = async () => {
  try {
    const response = await axios.delete(
      "https://api.buming-pendamping.com/api/logout"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
