import axios from "axios";

export const isAuthenticated = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/auth/isAuthenticated",
      {
        withCredentials: true,
      }
    );

    return response.data.user; // or return true
  } catch (error) {
    console.log(error);
    return false;
  }
};
