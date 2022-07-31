import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { getAllTeams } from "../services/api";

import Wrapper from "../components/ui/Wrapper";
import DataTable from "../components/DataTable/DataTable";
import DataTableNavigation from "../components/DataTable/DataTableNavigation";

const Teams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page");
  const per_page = +searchParams.get("per_page")
    ? +searchParams.get("per_page")
    : 20;

  const {
    sendRequest,
    isLoading,
    data: teamsList,
    error,
  } = useFetch(getAllTeams);

  useEffect(() => {
    sendRequest(page ? page : 1, per_page);

    console.log(page, per_page);
  }, [sendRequest, page, per_page]);

  const handlePerPageChange = (event) => {
    const per_page = event.target.value;
    setSearchParams({ per_page: per_page });
  };

  if (isLoading || teamsList === null) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const { teams, meta } = teamsList;

  const handleBack = () => {
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
      <th>Abbreviation</th>
      <th>Full name</th>
      <th>Conference</th>
      <th>Division</th>
      <th>City</th>
    </tr>
  );

  const teamsRows = teams.map((team) => {
    return (
      <tr key={team.id}>
        <td>{team.abbreviation}</td>
        <td>{team.full_name}</td>
        <td>{team.conference}</td>
        <td>{team.division}</td>
        <td>{team.city}</td>
      </tr>
    );
  });

  return (
    <div className="outer-wrapper">
      <Wrapper>
        <DataTable head={tableHeader} body={teamsRows} />
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

export default Teams;
