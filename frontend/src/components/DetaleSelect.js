import React from 'react'

import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

function DetaleSelect(props) {
    const { label, id_name, db_id_name, name, value, detale, loading, handleChange } = props;
    return (
        <FormControl fullWidth margin="normal">
            <InputLabel id={id_name + "-select-label"}>
                {label}
            </InputLabel>
            <Select key={id_name+value}
                labelId={id_name + "-select-label"}
                id={id_name + "-select"}
                name={id_name}
                value={value}
                onChange={handleChange}
            >
                <MenuItem value=""><em>Brak</em></MenuItem>
                {loading ? (
                    <CircularProgress/>
                ) : (
                    detale.map(detal => (
                        <MenuItem key={id_name + ":" + detal[db_id_name]} value={detal[db_id_name]}>{detal[name]}</MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    )
}

export default DetaleSelect;