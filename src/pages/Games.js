import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { getAllGames } from "../services/api";

import Wrapper from "../components/ui/Wrapper";
import DataTable from "../components/DataTable/DataTable";
import DataTableNavigation from "../components/DataTable/DataTableNavigation";

const Games = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page");
  const per_page = +searchParams.get("per_page")
    ? +searchParams.get("per_page")
    : 20;

  const {
    sendRequest,
    isLoading,
    data: gamesList,
    error,
  } = useFetch(getAllGames);

  useEffect(() => {
    sendRequest(page, per_page);
    // sendRequest(page, per_page, { seasons: [2021] });
  }, [sendRequest, page, per_page]);

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
    const month = date.getMonth() > 9 ? date.getMonth() : "0" + date.getMonth();
    const day = date.getDay() > 9 ? date.getDay() : "0" + date.getDay();

    return (
      <tr key={game.id}>
        <td>{game.home_team.full_name}</td>
        <td>{game.home_team_score} : {game.visitor_team_score}</td>
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
        <DataTable head={tableHeader} body={gamesRows} />
        <DataTableNavigation
          currentPage={meta.current_page}
          numberOfPages={meta.total_pages}
          perPage={per_page}
          setSearchParams={setSearchParams}
        />
      </Wrapper>
    </div>
  );
};

export default Games;
