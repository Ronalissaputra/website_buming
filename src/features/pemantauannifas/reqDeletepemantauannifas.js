import axios from "axios";
import { reqToken } from "../refreshtoken/reqToken";

export const reqDeletepemantauannifas = async (id) => {
  try {
    const { accesstoken } = await reqToken();
    await axios.delete(
      `https://api.buming-pendamping.com/api/pemantauannifas/${id}`,
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
