import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { getAllPlayers } from "../services/api";

import Wrapper from "../components/ui/Wrapper";
import DataTable from "../components/DataTable/DataTable";
import DataTableNavigation from "../components/DataTable/DataTableNavigation";

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
      <th>Position</th>
      <th>Height</th>
      <th>Weight (Pounds)</th>
      <th>Team</th>
    </tr>
  );

  const playersRows = players.map((player) => {
    return (
      <tr key={player.id}>
        <td>{player.first_name}</td>
        <td>{player.last_name}</td>
        <td>{player.position ? `${player.position}'` : "unknown"}</td>
        <td>
          {player.height_feet ? `${player.height_feet}'` : "unknown"}
          {player.height_inches ? ` ${player.height_inches}''` : ""}
        </td>
        <td>{player.weight_pounds ? player.weight_pounds : "unknown"}</td>
        <td>{player.team.full_name}</td>
      </tr>
    );
  });

  return (
    <div className="outer-wrapper">
      <Wrapper>
        <DataTable head={tableHeader} body={playersRows} />
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

export default Players;
