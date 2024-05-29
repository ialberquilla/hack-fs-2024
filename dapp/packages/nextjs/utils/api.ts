import { SERVER_URL } from "./constants";

export const getFiles = async () => {
  const response = await fetch(`${SERVER_URL}`);
  const files = await response.json();
  return files;
};
