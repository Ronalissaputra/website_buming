import axios from "axios";
import { reqToken } from "../refreshtoken/reqToken";

export const reqCreateanak = async (data) => {
  try {
    const { accesstoken } = await reqToken();
    const response = await axios.post(
      "https://api.buming-pendamping.com/api/anak",
      data,
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
