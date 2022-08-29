import LinkButton from "../ui/LinkButton";
import DataTable from "../DataTable/DataTable";

const PlayersList = ({ players }) => {
  const tableHeader = (
    <tr>
      <th>First name</th>
      <th>Last name</th>
      <th>Pos.</th>
      <th>Height</th>
      <th>Weight(Lb)</th>
      <th>Team</th>
      <th>Details</th>
    </tr>
  );

  const playersRows = players.map((player) => {
    return (
      <tr key={player.id}>
        <td>{player.first_name}</td>
        <td>{player.last_name}</td>
        <td>{player.position ? `${player.position}'` : "unk"}</td>
        <td>
          {player.height_feet ? `${player.height_feet}'` : "unk"}
          {player.height_inches === null ? "" : ` ${player.height_inches}''`}
        </td>
        <td>{player.weight_pounds ? player.weight_pounds : "unk"}</td>
        <td>{player.team.abbreviation}</td>
        <td>
          <LinkButton to={`/players/${player.id}`}>Show</LinkButton>
        </td>
      </tr>
    );
  });

  return <DataTable head={tableHeader} body={playersRows} />;
};

export default PlayersList;