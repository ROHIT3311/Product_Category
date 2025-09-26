import axios from "axios";

export const isAuthenticated = async () => {
  try {
    const response = await axios.get(
      "https://product-category-sget.vercel.app/api/auth/isAuthenticated",
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
