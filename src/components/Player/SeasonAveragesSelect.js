import styles from "./SeasonAveragesSelect.module.css";

const SeasonAveragesSelect = ({ onChange, defaultValue, options }) => {
  return (
    <div className="flexbox-row-space-around">
      <p>Season averages</p>
      <div className={styles["season-select"]}>
        <label htmlFor="season-select">Select season</label>
        <select
          id="season-select"
          onChange={onChange}
          defaultValue={defaultValue}
        >
          {options}
        </select>
      </div>
    </div>
  );
};

export default SeasonAveragesSelect;
