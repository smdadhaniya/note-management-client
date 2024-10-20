import axios from "axios";
import { INote } from "../../components/notes/AddNote";

// Notes API

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api",
});

const token = localStorage.getItem("token");
if (token) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const fetchNotes = async (value:string) => {
  const response = await apiClient.get(`/note/note?search=${value}`);
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await apiClient.get(`/note/note/${id}`);
  return response.data;
};

export const createNote = async (note: any) => {
  const response = await apiClient.post(`/note/create-note`, note);
  return response.data;
};

export const updateNoteById = async (note: INote) => {
  const response = await apiClient.patch(`/note/update-note/${note._id}`, note);
  return response.data;
};

export const deleteNoteById = async (id: string) => {
  const response = await apiClient.delete(`/note/delete-note/${id}`);
  return response.data;
};

// Authentication API

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post(`/user/login`, credentials);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const register = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post(`/user/register`, credentials);
  localStorage.setItem("token", response.data.token);
  return response.data;
};
