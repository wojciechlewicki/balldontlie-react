import { useEffect } from "react";

import useFetch from "../hooks/useFetch";
import { getAllPlayers } from "../services/api";

const Players = () => {
  const {
    sendRequest,
    isLoading,
    data: playersList,
    error,
  } = useFetch(getAllPlayers);

  useEffect(() => {
    sendRequest(2, 15);
  }, [sendRequest]);

  if(isLoading || playersList === null) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>{error}</div>
  }

  console.log(playersList);

  return <table></table>;
};

export default Players;
