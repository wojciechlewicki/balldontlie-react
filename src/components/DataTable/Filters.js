import styles from "./Filters.module.css";

import getTodaysDate from "../../utils/getTodaysDate";

const Filters = ({ searchParams, setSearchParams }) => {
  const postseason = searchParams.get("postseason");
  const startDate = searchParams.get("start_date")
    ? searchParams.get("start_date")
    : "1979-01-01";
  const endDate = searchParams.get("end_date")
    ? searchParams.get("end_date")
    : getTodaysDate();

  const handleStartDateChange = (event) => {
    const startDate = event.target.value;
    searchParams.set("start_date", startDate);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleEndDateChange = (event) => {
    const endDate = event.target.value;
    searchParams.set("end_date", endDate);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handlePostseasonChange = (event) => {
    switch (event.target.value) {
      case "all_games":
        searchParams.delete("postseason");
        setSearchParams(searchParams);
        break;
      case "season":
        searchParams.set("postseason", "false");
        setSearchParams(searchParams);
        break;
      case "postseason":
        searchParams.set("postseason", "true");
        setSearchParams(searchParams);
        break;
      default:
        break;
    }
  };

  let postSeasonSelectValue;
  if (postseason === "false") postSeasonSelectValue = "season";
  else if (postseason === "true") postSeasonSelectValue = "postseason";
  else postSeasonSelectValue = "all_games";

  return (
    <div className={styles.filters}>
      <div className={styles["label-input-container"]}>
        <label htmlFor="postseason-select">Show</label>
        <select
          id="postseason-select"
          onChange={handlePostseasonChange}
          defaultValue={postSeasonSelectValue}
        >
          <option value="all_games">All games</option>
          <option value="season">Season</option>
          <option value="postseason">Postseason</option>
        </select>
      </div>
      <div className={styles["label-input-container"]}>
        <label htmlFor="start-date">Start date</label>
        <input
          type="date"
          id="start-date"
          min="1979-01-01"
          defaultValue={startDate}
          onChange={handleStartDateChange}
        ></input>
      </div>
      <div className={styles["label-input-container"]}>
        <label htmlFor="end-date">End date</label>
        <input
          type="date"
          id="end-date"
          min="1979-01-01"
          defaultValue={endDate}
          onChange={handleEndDateChange}
        ></input>
      </div>
    </div>
  );
};

export default Filters;
