import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
  child: {
    flexGrow: 1,
  },
}

class PerYear extends Component {


  render() {

    const { classes, data } = this.props

    const perYear = {}

    data.forEach(res => {
      const year = (new Date(res.startDate)).getFullYear()
      if (!perYear[year]) {
        perYear[year] = 0
      }
      perYear[year] = perYear[year] + res.price
    })

    return (
      <>
        <Typography variant="h6">Rocznie wydałeś:</Typography>
        {Object.keys(perYear).map(year => (
          <div>
            <Typography variant="body2
            " inline>{year}</Typography>: <Typography inline>{Math.round(perYear[year])} zł</Typography>
          </div>
        ))}
      </>
    )

  }
}

export default withStyles(styles)(PerYear)
