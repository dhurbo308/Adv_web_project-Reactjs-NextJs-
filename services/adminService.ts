import api from "./api";

export const loginAdmin = async (email: string, password: string) => {
  const res = await api.post("/admin/login", { email, password });
  return res.data;
};

export const getAdminProfile = async () => {
  const res = await api.get("/admin/me");
  return res.data;
};

export const getAllAdmins = async () => {
  const res = await api.get("/admin/all");
  return res.data;
};

export const approveSeller = async (adminId: number, sellerId: number) => {
  return api.post(`/admin/${adminId}/approve/${sellerId}`);
};

export const logoutAdmin = async () => {
  return api.post("/admin/logout");
};
