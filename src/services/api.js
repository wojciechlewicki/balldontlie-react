export const BASE_URL = "https://www.balldontlie.io/api/v1";

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Fetching has failed!");
  }

  return data;
}

export async function getSeasonAverages(id, season = "current") {
  let seasonParam = "";
  if (season !== "current") {
    seasonParam = `season=${season}&`;
  }

  const data = await fetchData(
    `${BASE_URL}/season_averages?${seasonParam}player_ids[]=${id}`
  );
  return data.data;
}

export async function getPlayer(id) {
  const data = await fetchData(`${BASE_URL}/players/${id}`);
  return data;
}

export async function playerSearch(name, page = 1, perPage = 20) {
  const data = await fetchData(
    `${BASE_URL}/players?search=${name}&page=${page}&per_page=${perPage}`
  );
  return { players: data.data, meta: data.meta };
}

export async function getAllPlayers(page = 1, perPage = 20) {
  const data = await fetchData(
    `${BASE_URL}/players?page=${page}&per_page=${perPage}`
  );
  return { players: data.data, meta: data.meta };
}

export async function getAllTeams(page = 1, perPage = 20) {
  const data = await fetchData(
    `${BASE_URL}/teams?page=${page}&per_page=${perPage}`
  );
  return { teams: data.data, meta: data.meta };
}

export async function getAllGames(page = 1, perPage = 20, params = {}) {
  let urlParams = new URLSearchParams("");
  for (const key in params) {
    const value = params[key];
    console.log(key, value);

    if (value) {
      urlParams.set(key, value);
    }
  }
  const data = await fetchData(
    `${BASE_URL}/games?page=${page}&per_page=${perPage}${urlParams.toString()}`
  );
  return { games: data.data, meta: data.meta };
}
