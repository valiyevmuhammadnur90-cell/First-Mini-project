import axios from "axios";
import api from "../api/api";

export async function getAll() {
  const res = await api.get("/");
  return res.data;
}

export async function create(value) {
  const res = await api.post("/", value);
  return res.data;
}

export async function update(id, data) {
  const res = await api.patch(`/${id}`, data);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await api.delete(`/${id}`);
  return res.data;
}
