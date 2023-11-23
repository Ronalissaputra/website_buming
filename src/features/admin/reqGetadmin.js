import axios from "axios";
import { reqToken } from "../refreshtoken/reqToken";

export const reqGetibuhamil = async (keyword, page, limit) => {
  try {
    const { accesstoken, decoded } = await reqToken();
    const response = await axios.get(
      `https://api.buming-pendamping.com/api/admin?search_query=${keyword}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );
    return [response.data, decoded];
  } catch (error) {
    throw error;
  }
};
