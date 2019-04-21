import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import CssBaseline from '@material-ui/core/CssBaseline'
import withStyles from '@material-ui/core/styles/withStyles'
import Stats from './Stats'
// import { exampleData } from './data'

const styles = {
  jsonInput: {
    width: "calc(100% - 40px)",
    margin: 20,
  },
  button: {
    margin: 20,
  }
}

class App extends Component {

  state = {
    data: null,
    displayStats: false,
  }

  onDataChange = (e) => {
    console.log(e.target)
    this.setState({
      data: e.target.value
    })
  }

  handleClick = (e) => {
    if (this.state.data && JSON.parse(this.state.data)) {
      this.setState({
        displayStats: true
      })
    }
  }

  render() {

    const { classes } = this.props

    if (this.state.displayStats) {
      return <Stats data={JSON.parse(this.state.data)} />
    }

    return (
      <>
        <CssBaseline />
        <Grid container>
          <Hidden smDown>
            <Grid item md={2} />
          </Hidden>
          <Grid item md={8}>

            <Typography variant="h6">
              <ol>
                <li>
                  Zaloguj się na stronie{' '}
                  <a href="https://traficar.pl" target="_blank"
                     rel="noopener noreferrer">Traficara</a></li>
                <li>
                  Otwórz w przeglądarce stronę{' '}
                  <a href="https://api.traficar.pl/eaw-rest-api/reservation" target="_blank"
                     rel="noopener noreferrer">https://api.traficar.pl/eaw-rest-api/reservation</a>{' '}
                  i wklej jej zawartość poniżej:
                </li>
              </ol>
            </Typography>
            <TextField className={classes.jsonInput} multiline rows={8} id="reservations" onChange={this.onDataChange} />
            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>Wygeneruj ładne rzeczy</Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default withStyles(styles)(App)
