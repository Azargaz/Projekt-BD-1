import React from 'react'

import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

function DetailsSelect(props) {
    const { label, id_name, db_id_name, value, details, loading, handleChange } = props;
    return (
        <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id={id_name + "-select-label"}>
                {label}
            </InputLabel>
            <Select
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
                    details.map(detail => (
                        <MenuItem key={id_name + ":" + detail[db_id_name]} value={detail[db_id_name]}>{detail.nazwa}</MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    )
}

export default DetailsSelect;