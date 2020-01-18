import React, { useContext, useState } from 'react'

import { AuthContext } from '../utils/Auth';

function ListaUzytkownika(props) {
    const id_uzytkownika = props.match.params.id;
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true);
        fetch('http://localhost:3001/uzytkownik/lista')
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                setGames(jsonData);
                setLoading(false);
            });
    }

    return (
        <React.Fragment>
            {id_uzytkownika}
        </React.Fragment>
    )
}

export default ListaUzytkownika
