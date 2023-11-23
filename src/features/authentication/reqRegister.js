import axios from "axios";

export const reqRegister = async (data) => {
  try {
    const response = await axios.post(
      "https://api.buming-pendamping.com/api/admin",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
