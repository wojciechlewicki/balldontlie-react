import { Fragment, useEffect } from "react";

import Card from "../ui/Card";

import useFetch from "../../hooks/useFetch";
import { getSeasonAverages } from "../../services/api";

import generateArrayOfYears from "../../utils/generateArrayOfYears";

const SeasonAverages = ({ searchParams, setSearchParams, playerId }) => {
  let content;
  const seasonsArray = generateArrayOfYears(1979);
  const chosenYear = searchParams.get("season")
    ? searchParams.get("season")
    : seasonsArray[0];

  const {
    sendRequest: sendSeasonAveragesRequest,
    data: seasonAverages,
    error: errorSeasonAverages,
    isLoading: isLoadingSeasonAverages,
  } = useFetch(getSeasonAverages);

  useEffect(() => {
    sendSeasonAveragesRequest(playerId, chosenYear);
  }, [sendSeasonAveragesRequest, playerId, chosenYear]);

  if (isLoadingSeasonAverages || seasonAverages === null) {
    return <div className="centered">Loading...</div>;
  }

  if (errorSeasonAverages) {
    return <div>{errorSeasonAverages}</div>;
  }

  const selectOptions = seasonsArray.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));

  const handleSelectYear = (event) => {
    setSearchParams({ season: event.target.value });
  };

  if (seasonAverages.length === 0) {
    content = (
      <Card>
        <p>There's no player statistics for the chosen season.</p>
      </Card>
    );
  } else {
    content = (
      <Card className="flexbox-row-center">
        <table>
          <tbody>
            <tr>
              <th>Season</th>
              <td>{seasonAverages[0].season}</td>
            </tr>
            <tr>
              <th>Games played</th>
              <td>{seasonAverages[0].games_played}</td>
            </tr>
            <tr>
              <th>Points</th>
              <td>{seasonAverages[0].pts}</td>
            </tr>
            <tr>
              <th>Minutes played</th>
              <td>{seasonAverages[0].min}</td>
            </tr>
            <tr>
              <th>Offensive Rebounds</th>
              <td>{seasonAverages[0].oreb}</td>
            </tr>
            <tr>
              <th>Defensive Rebounds</th>
              <td>{seasonAverages[0].dreb}</td>
            </tr>
            <tr>
              <th>Rebounds</th>
              <td>{seasonAverages[0].reb}</td>
            </tr>
            <tr>
              <th>Assists</th>
              <td>{seasonAverages[0].ast}</td>
            </tr>
            <tr>
              <th>Steals</th>
              <td>{seasonAverages[0].stl}</td>
            </tr>
            <tr>
              <th>Blocks</th>
              <td>{seasonAverages[0].blk}</td>
            </tr>
            <tr>
              <th>Turnovers</th>
              <td>{seasonAverages[0].turnover}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th>Personal Fauls</th>
              <td>{seasonAverages[0].pf}</td>
            </tr>
            <tr>
              <th>Field goals made</th>
              <td>{seasonAverages[0].fgm}</td>
            </tr>
            <tr>
              <th>Field goals attempted</th>
              <td>{seasonAverages[0].fga}</td>
            </tr>
            <tr>
              <th>Field goal percentage</th>
              <td>{seasonAverages[0].fg_pct}</td>
            </tr>
            <tr>
              <th>3 Point Field goals made</th>
              <td>{seasonAverages[0].fg3m}</td>
            </tr>
            <tr>
              <th>3 Point Field goals attempted</th>
              <td>{seasonAverages[0].fg3a}</td>
            </tr>
            <tr>
              <th>3 Point Field goals percentage</th>
              <td>{seasonAverages[0].fg3_pct}</td>
            </tr>
            <tr>
              <th>Free Throws Made</th>
              <td>{seasonAverages[0].ftm}</td>
            </tr>
            <tr>
              <th>Free Throws Attempted</th>
              <td>{seasonAverages[0].fta}</td>
            </tr>
            <tr>
              <th>Free throw percentage</th>
              <td>{seasonAverages[0].ft_pct}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    );
  }

  return (
    <Fragment>
      <p>Season averages</p>
      <label htmlFor="season-select">Select season</label>
      <select
        id="season-select"
        onChange={handleSelectYear}
        defaultValue={chosenYear}
      >
        {selectOptions}
      </select>
      {content}
    </Fragment>
  );
};

export default SeasonAverages;
