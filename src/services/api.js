export const BASE_URL = "https://www.balldontlie.io/api/v1";

export async function getAllPlayers(page = 1, perPage = 25) {
  const response = await fetch(
    `${BASE_URL}/players?page=${page}&per_page=${perPage}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Fetching has failed!");
  }

  return {players: data.data, meta: data.meta};
}
