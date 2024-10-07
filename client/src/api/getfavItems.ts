import { getCookie } from "@/lib/utils";

export const getFavItems = async () => {
  const response = await fetch(`http://localhost:7000/users/favoritesItems`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    credentials: "include",
  });
  const json = await response.json();
  return { data: json, status: response.status };
};
