import axios from "axios";

export class TripUtil {
  static getTripById = async (id) => {
    try {
      const response = await axios.get(`/trip/${id}`);
      return response?.data?.data;
    } catch (e) {
      return null;
    }
  };

  static getFilter = (filter) => {
    if (filter.next_month_plan === true) {
      return { next_month_plan: true };
    }
    for (let filterKey in filter) {
      if (!filter[filterKey]) {
        delete filter[filterKey];
      }
    }
    return filter;
  };

  static getTrips = async (pageNo, filters) => {
    if (pageNo < 0) {
      return [];
    }
    try {
      const response = await axios.get(`/trip`, {
        params: {
          page: pageNo,
          ...TripUtil.getFilter(filters),
        },
      });

      return response?.data?.data;
    } catch (e) {
      return [];
    }
  };

  static createTrip = async (tripData) => {
    try {
      const response = await axios.post("trip", { ...tripData });
      return response?.data?.data;
    } catch (e) {
      return [];
    }
  };

  static deleteTrip = async (Id) => {
    try {
      const response = await axios.delete(`/trip/${Id}`);
      return response?.data?.data;
    } catch (e) {
      return {};
    }
  };

  static editTrip = async (Id, data) => {
    try {
      const response = await axios.put(`/trip/${Id}`, data);
      return response?.data?.data;
    } catch (e) {
      return {};
    }
  };
}
