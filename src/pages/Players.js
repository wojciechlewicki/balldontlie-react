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

    console.log(page, per_page);
  }, [sendRequest, page, per_page]);

  const handlePerPageChange = (event) => {
    const per_page = event.target.value;
    setSearchParams({ per_page: per_page });
  };

  if (isLoading || playersList === null) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const { players, meta } = playersList;

  const handleBack = () => {
    console.log(page);
    if (page > 1) {
      const paramsObj = {
        page: page - 1,
      };
      if (per_page !== 20) {
        paramsObj.per_page = per_page;
      }

      setSearchParams(paramsObj);
    }
  };

  const handleForward = () => {
    if (page < meta.total_pages) {
      const paramsObj = {
        page: page + 1,
      };
      if (page === 0) {
        paramsObj.page++;
      }
      if (per_page !== 20) {
        paramsObj.per_page = per_page;
      }

      setSearchParams(paramsObj);
    }
  };

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
        <td>{player.position}</td>
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
          handlePerPageChange={handlePerPageChange}
          handleBack={handleBack}
          handleForward={handleForward}
        />
      </Wrapper>
    </div>
  );
};

export default Players;
