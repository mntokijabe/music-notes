import { useSelector } from "react-redux"
import { Button } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom";
export default function SearchTitle () {
    const data = useSelector(store => store.searchResults)

    return(
        <>
           <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Composer</th>
                        <th>Arranged by</th>
                        <th>Voicing</th>
                        <th>Year</th>
                        <th># of Copies</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((song) => (
                    <tr key={song.id}>
                        <td>{song.title}</td>
                        <td>{song.composer}</td>
                        <td>{song.arranged_by}</td>
                        <td>{song.voicing}</td>
                        <td>{song.copyright_year}</td>
                        <td>{song.quantity}</td>
                        <td><Button component={Link} to={`/info/${song.id}`} variant="contained">Select</Button></td>
                    </tr>))}
                    
                </tbody>
            </table>
        
        </>

    )

}