import { useMemo } from "react";

import styles from "./Filters.module.css";

import getTodaysDate from "../../utils/getTodaysDate";

const minDate = "1979-01-01";

const Filters = ({ searchParams, setSearchParams }) => {
  const postseason = searchParams.get("postseason");
  const startDate = searchParams.get("start_date")
    ? searchParams.get("start_date")
    : minDate;
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

  const postSeasonSelectValue = useMemo(() => {
    if (postseason === null) {
      return "all_games";
    }

    const postSeasonBool = postseason === "true";

    if (!postSeasonBool) {
      return "season";
    }

    if (postSeasonBool) {
      return "postseason";
    }
  }, [postseason]);

  return (
    <div className={styles.filters}>
      <div>
        <label htmlFor="postseason-select">Show</label>
        <select
          className={styles.inputStyle}
          id="postseason-select"
          onChange={handlePostseasonChange}
          defaultValue={postSeasonSelectValue}
        >
          <option value="all_games">All games</option>
          <option value="season">Season</option>
          <option value="postseason">Postseason</option>
        </select>
      </div>
      <div>
        <label htmlFor="start-date">Start date</label>
        <input
          className={styles.inputStyle}
          type="date"
          id="start-date"
          min={minDate}
          defaultValue={startDate}
          onChange={handleStartDateChange}
          required
        />
      </div>
      <div className={styles.labelInputContainer}>
        <label htmlFor="end-date">End date</label>
        <input
          type="date"
          id="end-date"
          min={minDate}
          defaultValue={endDate}
          onChange={handleEndDateChange}
          required
        />
      </div>
    </div>
  );
};

export default Filters;
