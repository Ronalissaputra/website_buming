import axios from "axios";
import { reqToken } from "../refreshtoken/reqToken";

export const reqDeletepemantauankehamilan = async (id) => {
  try {
    const { accesstoken } = await reqToken();
    await axios.delete(
      `https://api.buming-pendamping.com/api/pemantauankehamilan/${id}`,
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
