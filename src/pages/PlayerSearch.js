import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { playerSearch } from "../services/api";

import Wrapper from "../components/ui/Wrapper";
import Navigation from "../components/DataTable/Navigation";
import PlayersList from "../components/Players/PlayersList";

const PlayerSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("string");
  const page = +searchParams.get("page");
  const per_page = +searchParams.get("per_page")
    ? +searchParams.get("per_page")
    : 20;

  const {
    sendRequest,
    isLoading,
    data: playersList,
    error,
  } = useFetch(playerSearch);

  useEffect(() => {
    sendRequest(search, page ? page : 1, per_page);
  }, [sendRequest, search, page, per_page]);

  if (isLoading || playersList === null) {
    return <div className="centered">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { players, meta } = playersList;

  return (
    <div className="outer-wrapper">
      <Wrapper>
        <h1>Search results</h1>
        <h2>{meta.total_count} player(s) found</h2>
        <PlayersList players={players} />
        <Navigation
          numberOfPages={meta.total_pages}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </Wrapper>
    </div>
  );
};

export default PlayerSearch;
