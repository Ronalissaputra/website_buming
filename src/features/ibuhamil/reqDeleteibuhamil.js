import axios from "axios";
import { reqToken } from "../refreshtoken/reqToken";

export const reqDeleteibuhamil = async (uuid) => {
  try {
    const { accesstoken } = await reqToken();
    await axios.delete(
      `https://api.buming-pendamping.com/api/ibuhamil/${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
