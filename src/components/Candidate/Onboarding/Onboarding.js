import React from 'react'
import {Grid,TextField} from '@mui/material'
const CandidateOnboarding = () => {
  return (
   <Grid>
    <Grid item xs={12} md={6}>
      <label>Name</label>
      <TextField id='outlined-basic' variant='outlined' fullWidth/>
    </Grid>
   </Grid>
  )
}

export default CandidateOnboarding
