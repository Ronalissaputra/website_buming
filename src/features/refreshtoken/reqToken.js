import axios from "axios";
import jwt_decode from "jwt-decode";
export const reqToken = async () => {
  try {
    const response = await axios.get(
      "https://api.buming-pendamping.com/api/refreshtoken"
    );
    const { accesstoken } = response.data;
    const decoded = jwt_decode(accesstoken);
    return { decoded, accesstoken };
  } catch (error) {
    throw error;
  }
};
