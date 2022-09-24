import React, { useContext, useState } from 'react'
import { Grid, Typography, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { SocketContext } from '../SocketContext'
import { KeyboardVoice, VolumeOff, KeyboardVoiceOutlined, Speaker } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  video: {
    width: '400px',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      width: '150px',
    },
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
    },
  },
  paper: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
  btnsuccess: {
    backgroundColor: theme.palette.success.main,
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();
  const [selfMute, setSelfMute] = useState(true);
  const [otherMute, setOtherMute] = useState(true);

  

  // const audioDev = audio

  // console.log('audio', audio? 'yes' : 'no')


  return (
    <Grid container className={classes.gridContainer}>
    {stream && (
      <Paper className={classes.paper}>
        <Grid item xs={12} md={6}>
          <Typography variant='h5' gutterBottom style={{fontFamily: 'futura', color: 'blue'}}>{name || 'Name'}</Typography>
          <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          <Grid item xs={12} md={6} style={{alignItems: 'center', paddingTop: '3%'}}>
            {/* <Button 
            className={!selfMute? null : classes.btnsuccess}
            startIcon={selfMute? <KeyboardVoiceOutlined fontSize='small'/> : <KeyboardVoice />} 
            variant='contained' 
            color={selfMute? 'success' : 'secondary'}
            onClick={() => selfMute? setSelfMute(false) : setSelfMute(true)}>
              {selfMute? 'On' : 'Muted'}
            </Button> */}
          </Grid>
        </Grid>
      </Paper>
      
    )}
      {callAccepted && !callEnded && (
      <Paper className={classes.paper}>
        <Grid item xs={12} md={6}>
          <Typography variant='h5' gutterBottom style={{fontFamily: 'futura', color: 'red'}}>{call.name || 'Name'}</Typography>
          <video playsInline muted={otherMute} ref={userVideo} autoPlay className={classes.video} />
          <Grid item xs={12} md={6} style={{alignItems: 'center', justifyContent: 'center', paddingTop: '3%'}}>
          <Button 
            className={!otherMute? null : classes.btnsuccess}
            startIcon={otherMute? <Speaker fontSize='small'/> : <VolumeOff />} 
            variant='contained' 
            color={otherMute? 'success' : 'secondary'}
            onClick={() => otherMute? setOtherMute(false) : setOtherMute(true)}>
              {otherMute? 'On' : 'Muted'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      )}
    </Grid>
  )
}

export default VideoPlayer