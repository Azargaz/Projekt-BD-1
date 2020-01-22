import React, { useState, useEffect } from 'react'

import fetchData from '../utils/fetchData';

function Gra(props) {
    const { id_gra } = props.match.params;
    const [gra, setGra] = useState({});

    useEffect(() => {
        fetchData('GET', `gra/${id_gra}`, (json) => {
            setGra(json);
        });
    }, [])

    return (
        <div>
            {gra.tytul}
        </div>
    )
}

export default Gra
