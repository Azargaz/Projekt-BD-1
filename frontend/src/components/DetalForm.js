import React, { useState } from 'react'

function DetalForm(props) {
    const { label, detalTemplate } = props;
    const [detal, setDetal] = useState(detalTemplate);

    const handleChange = (event) => {
        setDetal({
            ...detal,
            [event.target.name]: event.target.value
        });
    }

    const textFields = () => {
        const result;
        for(let [value, key] of Object.entries(detalTemplate)) {
            result.push({
                
            });
        }
        return result;
    }

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={4}>
                <form>
                    <Typography variant="h3">
                        {label}
                    </Typography>
                    {textFields}
                </form>
            </Grid>
        </Grid>
    )
}

export default DetalForm
