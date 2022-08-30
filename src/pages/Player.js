import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { getPlayer } from "../services/api";
import useFetch from "../hooks/useFetch";

import Wrapper from "../components/ui/Wrapper";
import SeasonAverages from "../components/Player/SeasonAverages";
import BasicData from "../components/Player/BasicData";

const Player = () => {
  const { playerId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    sendRequest: sendPlayerDataRequest,
    data: playerData,
    error: errorPlayerData,
    isLoading: isLoadingPlayerData,
  } = useFetch(getPlayer);

  useEffect(() => {
    sendPlayerDataRequest(playerId).then(() => {
    });
  }, [sendPlayerDataRequest, playerId]);

  if (isLoadingPlayerData || playerData === null ) {
    return <div className="centered">Loading...</div>;
  }

  if (errorPlayerData) {
    return <div>{errorPlayerData}</div>;
  }

  return (
    <div className="outer-wrapper">
      <Wrapper>
        <BasicData playerData={playerData} />
        <SeasonAverages
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          playerId={playerId}
        />
      </Wrapper>
    </div>
  );
};

export default Player;
