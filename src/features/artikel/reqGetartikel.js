import axios from "axios";

export const reqGetartikel = async () => {
  try {
    const response = await axios.get(
      `https://api.buming-pendamping.com/api/artikel`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
