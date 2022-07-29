import Card from "../ui/Card";
import classes from "./DataTable.module.css"

const DataTable = (props) => {
  return (
    <Card>
      <table className={classes['data-table']}>
        <thead>{props.head}</thead>
        <tbody>{props.body}</tbody>
      </table>
    </Card>
  );
};

export default DataTable;
