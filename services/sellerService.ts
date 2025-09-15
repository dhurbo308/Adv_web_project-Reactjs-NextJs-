import api from "./api";

export const createSeller = async (data: any) => api.post("/seller/create", data);

export const getSellerById = async (id: number) => {
  const res = await api.get(`/seller/profile/${id}`);
  return res.data;
};

export const updateSeller = async (id: number, data: any) => api.put(`/seller/updateseller/${id}`, data);

export const updateSellerStatus = async (id: number, status: string) => api.patch(`/seller/status/${id}`, { status });

export const findInactiveSellers = async () => api.get("/seller/inactive");

export const findSellersOlderThan40 = async () => api.get("/seller/older");

export const deleteSellerById = async (id: number) => api.delete(`/seller/delete/${id}`);

export const uploadNIDFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/seller/uploadfile", formData, { headers: { "Content-Type": "multipart/form-data" } });
};

export const loginSeller = async (email: string) => {
  const res = await api.post("/seller/login", { email });
  return res.data;
};

export const getSellerProfile = async () => {
  const res = await api.get("/seller/me");
  return res.data;
};

export const logoutSeller = async () => api.post("/seller/logout");