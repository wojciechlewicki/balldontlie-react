import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { getAllPlayers } from "../services/api";

import Wrapper from "../components/ui/Wrapper";
import DataTable from "../components/DataTable/DataTable";
import Navigation from "../components/DataTable/Navigation";

const Players = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page");
  const per_page = +searchParams.get("per_page")
    ? +searchParams.get("per_page")
    : 20;

  const {
    sendRequest,
    isLoading,
    data: playersList,
    error,
  } = useFetch(getAllPlayers);

  useEffect(() => {
    sendRequest(page ? page : 1, per_page);
  }, [sendRequest, page, per_page]);

  if (isLoading || playersList === null) {
    return <div className="centered">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const { players, meta } = playersList;

  const tableHeader = (
    <tr>
      <th>First name</th>
      <th>Last name</th>
      <th>Pos.</th>
      <th>Height</th>
      <th>Weight(Lb)</th>
      <th>Team</th>
      <th>Details</th>
    </tr>
  );

  const playersRows = players.map((player) => {
    return (
      <tr key={player.id}>
        <td>{player.first_name}</td>
        <td>{player.last_name}</td>
        <td>{player.position ? `${player.position}'` : "unk"}</td>
        <td>
          {player.height_feet ? `${player.height_feet}'` : "unk"}
          {player.height_inches === null ? "" : ` ${player.height_inches}''`}
        </td>
        <td>{player.weight_pounds ? player.weight_pounds : "unk"}</td>
        <td>{player.team.abbreviation}</td>
        <td><Link to={`/players/${player.id}`}>Show</Link></td>
      </tr>
    );
  });

  return (
    <div className="outer-wrapper">
      <Wrapper>
        <h1>Players</h1>
        <DataTable head={tableHeader} body={playersRows} />
        <Navigation
          numberOfPages={meta.total_pages}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </Wrapper>
    </div>
  );
};

export default Players;
