import axios from "axios";
import { reqToken } from "../refreshtoken/reqToken";

export const reqGetadminbyid = async (id) => {
  try {
    const { accesstoken } = await reqToken();
    const response = await axios.get(
      `https://api.buming-pendamping.com/api/admin/${id}`,
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
