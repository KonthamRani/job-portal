import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material'
import '../../Candidate/Profile/Profile.css'

export default function FormLoading({
    fields = 4, height
}) {
    return (
        <Grid container spacing={2} className='onboarding-container'>

            {
                [...Array(fields)].map((_, i) => {

                    return (
                        <Grid item xs={12} md={6}>

                            <Skeleton animation="wave" key={i} height={height} />
                        </Grid>)
                })
            }
        </Grid>
    );
}
