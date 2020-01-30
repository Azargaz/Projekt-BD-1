import React from 'react';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
	KeyboardDatePicker ,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import plLocale from "date-fns/locale/pl";
import FormControl from '@material-ui/core/FormControl';

function MuiDatePicker(props) {
	const { name, label, onChange, value, required } = props;

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
			<FormControl fullWidth margin="normal">
				<KeyboardDatePicker  
					name={name}
					label={label}
					format="dd.MM.yyyy"
					value={value}
					required={required ? true : false}
					onChange={(date) => onChange(date, name)} 
				/>
			</FormControl>
		</MuiPickersUtilsProvider>
	)
}

export default MuiDatePicker;
