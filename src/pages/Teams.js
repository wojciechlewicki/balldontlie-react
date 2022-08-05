import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { getAllTeams } from "../services/api";

import Wrapper from "../components/ui/Wrapper";
import DataTable from "../components/DataTable/DataTable";
import Navigation from "../components/DataTable/Navigation";

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
  }, [sendRequest, page, per_page]);


  if (isLoading || teamsList === null) {
    return <div className="centered">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const { teams, meta } = teamsList;

  const tableHeader = (
    <tr>
      <th>Abbrev.</th>
      <th>Full name</th>
      <th>Con.</th>
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
        <h1>Teams</h1>
        <DataTable head={tableHeader} body={teamsRows} />
        <Navigation
          numberOfPages={meta.total_pages}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </Wrapper>
    </div>
  );
};

export default Teams;
