import searchParamsParser from "../utils/searchParamsParser";

export const BASE_URL = "https://www.balldontlie.io/api/v1";

export async function getSeasonAverages(id, season = "current") {

  let seasonParam = "";
  if(season !== "current") {
    seasonParam = `season=${season}&`;
  }

  const response = await fetch(`${BASE_URL}/season_averages?${seasonParam}player_ids[]=${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Fetching season averages has failed!");
  }

  return data.data;
}

export async function getPlayer(id) {
  const response = await fetch(`${BASE_URL}/players/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Fetching player has failed!");
  }

  return data;
}

export async function getAllPlayers(page = 1, perPage = 20) {
  const response = await fetch(
    `${BASE_URL}/players?page=${page}&per_page=${perPage}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Fetching players has failed!");
  }

  return { players: data.data, meta: data.meta };
}

export async function getAllTeams(page = 1, perPage = 20) {
  const response = await fetch(
    `${BASE_URL}/teams?page=${page}&per_page=${perPage}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Fetching teams has failed!");
  }

  return { teams: data.data, meta: data.meta };
}

export async function getAllGames(page = 1, perPage = 20, params = {}) {
  let urlParams = searchParamsParser(params);

  const response = await fetch(
    `${BASE_URL}/games?page=${page}&per_page=${perPage}${urlParams}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Fetching games has failed!");
  }

  return { games: data.data, meta: data.meta };
}

