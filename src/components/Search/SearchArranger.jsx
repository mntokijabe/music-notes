import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function SearchArranger() {
  const data = useSelector((store) => store.searchResults);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Arranged by</th>
            <th>Composer</th>
            <th>Title</th>
            <th>Voicing</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((song) => (
            <tr key={song.id}>
              <td>{song.arranged_by}</td>
              <td>{song.composer}</td>
              <td>{song.title}</td>
              <td>{song.voicing}</td>
              <td>
                <Button
                  component={Link}
                  to={`/info/${song.id}`}
                  variant="contained"
                >
                  Select
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
