import axios from "axios";

export const reqCreateartikel = async (data) => {
  try {
    const response = await axios.post(
      "https://api.buming-pendamping.com/api/artikel",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
