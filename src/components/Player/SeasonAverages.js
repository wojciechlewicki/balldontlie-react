import { Fragment, useEffect } from "react";

import useFetch from "../../hooks/useFetch";
import { getSeasonAverages } from "../../services/api";

import generateArrayOfYears from "../../utils/generateArrayOfYears";
import Card from "../ui/Card";
import SeasonAveragesSelect from "./SeasonAveragesSelect";
import styles from "./SeasonAverages.module.css";

const SeasonAverages = ({ searchParams, setSearchParams, playerId }) => {
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
    return (
      <Fragment>
        <SeasonAveragesSelect
          onChange={handleSelectYear}
          defaultValue={chosenYear}
          options={selectOptions}
        />
        <Card>
          <p>There's no player statistics for the chosen season.</p>
        </Card>
      </Fragment>
    );
  }

  const seasonAveragesData = seasonAverages[0];
  const leftSideRows = [
    { name: "Season", data: seasonAveragesData.season },
    { name: "Games played", data: seasonAveragesData.games_played },
    { name: "Minutes played", data: seasonAveragesData.min },
    { name: "Offensive Rebounds", data: seasonAveragesData.oreb },
    { name: "Defensive Rebounds", data: seasonAveragesData.dreb },
    { name: "Rebounds", data: seasonAveragesData.reb },
    { name: "Assists", data: seasonAveragesData.ast },
    { name: "Steals", data: seasonAveragesData.stl },
    { name: "Blocks", data: seasonAveragesData.blk },
    { name: "Turnovers", data: seasonAveragesData.turnover },
  ];
  const leftSideTableBody = leftSideRows.map((row) => {
    return (
      <tr>
        <th>{row.name}</th>
        <td>{row.data}</td>
      </tr>
    );
  });

  const rightSideRows = [
    { name: "Personal Fauls", data: seasonAveragesData.pf },
    { name: "Field goals made", data: seasonAveragesData.fgm },
    { name: "Field goals attempted", data: seasonAveragesData.fga },
    { name: "Field goal percentage", data: seasonAveragesData.fg_pct },
    { name: "3 Point Field goals made", data: seasonAveragesData.fg3m },
    { name: "3 Point Field goals attempted", data: seasonAveragesData.fg3a },
    { name: "Free Throws Made", data: seasonAveragesData.ftm },
    { name: "Free Throws Attempted", data: seasonAveragesData.fta },
    { name: "Free throw percentage", data: seasonAveragesData.ft_pct },
  ];
  const rightSideTableBody = rightSideRows.map((row) => {
    return (
      <tr>
        <th>{row.name}</th>
        <td>{row.data}</td>
      </tr>
    );
  });

  return (
    <Fragment>
      <SeasonAveragesSelect
        onChange={handleSelectYear}
        defaultValue={chosenYear}
        options={selectOptions}
      />
      <Card className={styles["season-averages"]}>
        <table>
          <tbody>{leftSideTableBody}</tbody>
        </table>
        <table>
          <tbody>{rightSideTableBody}</tbody>
        </table>
      </Card>
    </Fragment>
  );
};

export default SeasonAverages;