import axios from "axios";

export const reqLogin = async (data) => {
  try {
    const response = await axios.post(
      "https://api.buming-pendamping.com/api/login",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
