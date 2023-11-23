import axios from "axios";
import { reqToken } from "../refreshtoken/reqToken";

export const reqUpdateanak = async (id, data) => {
  try {
    const { accesstoken } = await reqToken();
    const response = await axios.patch(
      `https://api.buming-pendamping.com/api/anak/${id}`,
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
