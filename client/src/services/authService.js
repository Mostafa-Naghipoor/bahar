import jwtDecode from "jwt-decode";
import http from "./httpService";
import apiUrl from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data } = await http.post("/auth/login", { email, password });
  console.log("_______::::", email, password, data);
  delete data.password;
  localStorage.setItem(tokenKey, JSON.stringify(data));
  return data;
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    console.log("jwt____", JSON.parse(jwt).name);
    // return jwtDecode(jwt);
    return JSON.parse(jwt);
    
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};