import Card from "../ui/Card";
import styles from "./BasicData.module.css";

const BasicData = ({ playerData }) => {
  const leftSideRows = [
    { name: "Position", data: playerData.position },
    {
      name: "Height",
      data: `${
        playerData.height_feet ? `${playerData.height_feet} '` : "unknown"
      }
        ${playerData.height_inches && `${playerData.height_inches}''`}`,
    },
    {
      name: "Weight (Pounds)",
      data: playerData.weight_pounds ? playerData.weight_pounds : "unknown",
    },
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
    { name: "Abbreviation", data: playerData.team.abbreviation },
    { name: "Full name", data: playerData.team.full_name },
    { name: "Conference", data: playerData.team.conference },
    { name: "Division", data: playerData.team.division },
    { name: "City", data: playerData.team.city },
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
    <Card className={styles["basic-data__card"]}>
      <div className={styles["basic-data__data"]}>
        <h2>{playerData.first_name}</h2>
        <h2 className={styles.headers}>{playerData.last_name}</h2>
        <table>
          <tbody>{leftSideTableBody}</tbody>
        </table>
      </div>
      <div className={styles["basic-data__data"]}>
        <h2 className={styles.headers}>Team</h2>
        <table>
          <tbody>{rightSideTableBody}</tbody>
        </table>
      </div>
    </Card>
  );
};

export default BasicData;
