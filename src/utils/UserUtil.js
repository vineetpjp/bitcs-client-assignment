import axios from "axios";

export class UserUtil {
  static getUserById = async (id) => {
    try {
      const response = await axios.get(`/user/${id}`);
      return response?.data?.data;
    } catch (e) {
      return null;
    }
  };

  static getUsers = async (pageNo) => {
    if (pageNo < 0) {
      return [];
    }
    try {
      const response = await axios.get(`/user`, {
        params: {
          page: pageNo,
        },
      });
      return response?.data?.data;
    } catch (e) {
      return [];
    }
  };

  static deleteUser = async (Id) => {
    try {
      const response = await axios.delete(`/user/${Id}`);
      return response?.data?.data;
    } catch (e) {
      return {};
    }
  };

  static editUser = async (Id, data) => {
    try {
      const response = await axios.put(`/user/${Id}`, data);
      return response?.data?.data;
    } catch (e) {
      return {};
    }
  };

  static createUser = async (userData) => {
    try {
      const response = await axios.post("user", { ...userData });
      return response?.data?.data;
    } catch (e) {
      return [];
    }
  };
}
