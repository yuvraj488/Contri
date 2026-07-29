import api from "@/api/axios";

export const createGroup = async ({ name, description }) => {
  const response = await api.post("/groups", {
    name,
    description,
  });

  return response.data;
};