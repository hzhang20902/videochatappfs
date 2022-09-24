import React from 'react'
import { Typography, AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import VideoPlayer from './components/VideoPlayer'
import Options from './components/Options'
import Notifications from './components/Notifications'


const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '20px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',
        backgroundColor: 'lightblue',

        [theme.breakpoints.down('xs')]: {
            width: '90%',
        }
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
 }));

const App = () => {
    const classes = useStyles();
  return (
    <div className={classes.wrapper}>
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Typography variant='h2' align='center' style={{
                fontFamily: 'futura',
                display: 'flex',
                margin: '1px 3px',
                padding: '7px'
            }}>Bottle Express</Typography>
        </AppBar>
        <VideoPlayer />
        <Options>
            <Notifications />
        </Options>
        
    </div>
  )
}

export default App