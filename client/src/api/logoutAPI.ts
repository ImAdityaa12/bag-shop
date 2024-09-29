export const logoutAPI = async () => {
  const response = await fetch(`http://localhost:7000/users/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const json = await response.json();
  return { data: json, status: response.status };
};
