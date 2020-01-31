import React, { useEffect, useState } from 'react'
import fetchData from '../utils/fetchData';

function WyszukaneGry(props) {
    const { tytul } = props.match.params;

    const [loading, setLoading] = useState(true);
    const [wyszukaneGry, setWyszukaneGry] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetchData('POST', 'gra/tytul', (json) => {
            setWyszukaneGry(json);
            setLoading(false);
        }, (err) => {setLoading(false);},
        {
            'Content-Type': 'application/json'
        },
        JSON.stringify({
            tytul: atob(tytul)
        }))
    }, []);

    return (
        <div>
            {loading ? "Ładowanie..." : (wyszukaneGry.length > 0 ? wyszukaneGry[0].tytul : "Nie znaleziono gier...")}
        </div>
    )
}

export default WyszukaneGry
