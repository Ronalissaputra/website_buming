import axios from "axios";
import { reqToken } from "../refreshtoken/reqToken";

export const reqCreatepemantauankehamilan = async (data) => {
  try {
    const { accesstoken } = await reqToken();
    const response = await axios.post(
      "https://api.buming-pendamping.com/api/pemantauankehamilan",
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
