import axios from "axios";
import { reqToken } from "../refreshtoken/reqToken";

export const reqCreateibuhamil = async (data) => {
  try {
    const { accesstoken } = await reqToken();
    const response = await axios.post(
      "https://api.buming-pendamping.com/api/ibuhamil",
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
