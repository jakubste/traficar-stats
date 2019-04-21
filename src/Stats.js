import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import CssBaseline from '@material-ui/core/CssBaseline'
import withStyles from '@material-ui/core/styles/withStyles'
import DayHourHeatmap from './components/DayHourHeatmap'
import PerYear from './components/PerYear'

const styles = {
  child: {
    flexGrow: 1,
    padding: 5,
  },
}

class Stats extends Component {


  render() {

    const { classes, data } = this.props

    return (
      <Grid container>
        <Hidden smDown>
          <Grid item md={2} />
        </Hidden>
        <Grid item md={8} sm={12} className={classes.child}>
          <Grid container direction="column">
            <Grid item className={classes.child}>
              <Typography>Ogółem rezerwacji: {data.totalAmount}</Typography>
              <Typography>Przejechałeś {Math.round(data.totalKm, 2)} km</Typography>
              <Typography>Zapłaciłeś za {data.reservations.map(res => res.km).reduce((a, b) => a + b)} km</Typography>
              <Typography>
                Zapłaciłeś za: {' '}
                {Math.floor(data.totalMinutes / 60 / 24)}d {' '}
                {Math.floor(data.totalMinutes / 60) % 24}h {' '}
                {Math.floor(data.totalMinutes % 60)}min
              </Typography>
            </Grid>
            <Grid item className={classes.child}>
              <DayHourHeatmap
                dates={data.reservations.filter(res => res.status === 'ENDED').map(res => res.startDate)} />
            </Grid>
            <Grid item className={classes.child}>
              <PerYear data={data.reservations.filter(res => res.status === 'ENDED')} />
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    )

  }
}

export default withStyles(styles)(Stats)
