import api from "@/api/axios";

export const createGroup = async ({ name, description }) => {
  const response = await api.post("/groups", {
    name,
    description,
  });

  return response.data;
};

export const getMyGroups = async () => {
  const response = await api.get("/groups");

  return response.data;
};
export const joinGroup = async (inviteCode) => {
  const response = await api.post("/groups/join", {
    inviteCode,
  });

  return response.data;
};