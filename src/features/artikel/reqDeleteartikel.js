import axios from "axios";

export const reqDeleteartikel = async (id) => {
  try {
    await axios.delete(`https://api.buming-pendamping.com/api/artikel/${id}`);
  } catch (error) {
    throw error;
  }
};
