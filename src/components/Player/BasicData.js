import Card from "../ui/Card";
import classes from "./BasicData.module.css";

const BasicData = ({ playerData }) => {
  return (
    <Card className={classes["basic-data__card"]}>
      <div className={classes["basic-data__data"]}>
        <h2>{playerData.first_name}</h2>
        <h2 className={classes.headers}>{playerData.last_name}</h2>
        <table>
          <tbody>
            <tr>
              <th>Position</th>
              <td>{playerData.position}</td>
            </tr>
            <tr>
              <th>Height</th>
              <td>
                {playerData.height_feet
                  ? `${playerData.height_feet}'`
                  : "unknown"}
                {playerData.height_inches === null
                  ? ""
                  : ` ${playerData.height_inches}''`}
              </td>
            </tr>
            <tr>
              <th>Weight (Pounds)</th>
              <td>
                {playerData.weight_pounds
                  ? playerData.weight_pounds
                  : "unknown"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classes["basic-data__data"]}>
        <h2 className={classes.headers}>Team</h2>
        <table>
          <tbody>
            <tr>
              <th>Abbreviation</th>
              <td>{playerData.team.abbreviation}</td>
            </tr>
            <tr>
              <th>Full name</th>
              <td>{playerData.team.full_name}</td>
            </tr>
            <tr>
              <th>Conference</th>
              <td>{playerData.team.conference}</td>
            </tr>
            <tr>
              <th>Division</th>
              <td>{playerData.team.division}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{playerData.team.city}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default BasicData;
