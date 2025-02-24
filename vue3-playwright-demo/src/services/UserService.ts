import axios from "axios";

export const userService = {
  async validateName(name) {
    try {
      const response = await axios.post("/api/validate-name", { name });
      return {
        success: true,
        message: response.data.message,
        name: response.data.name,
      };    } catch (error) {
      return {
        success: false,
        message: error.response
          ? error.response.data.message
          : "Network error or server not responding",
        name:
          error.response && error.response.data.name
            ? error.response.data.name
            : "Unknown",
      };
    }
  },

  async fetchUserInfo() {
    try {
      const response = await axios.get("/api/user/info");
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response
          ? error.response.data.message
          : "Network error or server not responding",
      };
    }
  },
};
