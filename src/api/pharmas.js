import http from "@/services/http";

export function get(str) {
  return http.get(`pharmas/search?search=${str}`);
}

export default {
  get
};
