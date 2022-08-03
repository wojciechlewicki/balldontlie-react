import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { getAllGames } from "../services/api";

import Wrapper from "../components/ui/Wrapper";
import Filters from "../components/DataTable/Filters";
import DataTable from "../components/DataTable/DataTable";
import Navigation from "../components/DataTable/Navigation";

const Games = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page");
  const per_page = +searchParams.get("per_page")
    ? +searchParams.get("per_page")
    : 20;
  const postseason = searchParams.get("postseason");
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");

  const {
    sendRequest,
    isLoading,
    data: gamesList,
    error,
  } = useFetch(getAllGames);

  useEffect(() => {
    sendRequest(page, per_page, { start_date, end_date, postseason });
  }, [sendRequest, page, per_page, start_date, end_date, postseason]);

  if (isLoading || gamesList === null) {
    return <div className="centered">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const { games, meta } = gamesList;

  const tableHeader = (
    <tr>
      <th>Home team</th>
      <th>Score</th>
      <th>Visitor team</th>
      <th>Date (YYYY - MM - DD)</th>
      <th>Status</th>
      <th>Time</th>
    </tr>
  );

  const gamesRows = games.map((game) => {
    const date = new Date(game.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    const day = date.getDay() + 1 > 9 ? date.getDay() + 1 : "0" + (date.getDay() + 1);

    return (
      <tr key={game.id}>
        <td>{game.home_team.full_name}</td>
        <td>
          {game.home_team_score} : {game.visitor_team_score}
        </td>
        <td>{game.visitor_team.full_name}</td>
        <td>{`${year} - ${month} - ${day}`}</td>
        <td>{game.status}</td>
        <td>{game.time.trim() !== "" ? game.time : "-"}</td>
      </tr>
    );
  });

  return (
    <div className="outer-wrapper">
      <Wrapper>
        <h1>Games</h1>
        <Filters
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <DataTable head={tableHeader} body={gamesRows} />
        <Navigation
          numberOfPages={meta.total_pages}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </Wrapper>
    </div>
  );
};

export default Games;
