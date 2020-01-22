import React, { useState } from 'react';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import plLocale from "date-fns/locale/pl";

import FormControl from '@material-ui/core/FormControl';

function MuiDatePicker(props) {
	const { name, label, onChange, value } = props;

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
			<FormControl fullWidth margin="normal" required>
				<DatePicker 
					name={name}
					label={label}
					format="dd.MM.yyyy"
					value={value}
					onChange={(date) => onChange(date, name)} 
				/>
			</FormControl>
		</MuiPickersUtilsProvider>
	)
}

export default MuiDatePicker;
