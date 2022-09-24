import React, { useContext, useState, useEffect } from 'react'
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled, PhoneInTalk } from '@material-ui/icons'
import { SocketContext } from '../SocketContext';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '5px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%'
    }
  },
  margin: {
    marginTop: 20,
  },
  btnsuccess: {
    marginTop: 20,
    backgroundColor: theme.palette.success.main,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
  firstpaper:{
    padding: '10px 20px',
    border: '2px solid black',
    fontFamily: 'futura',
    textAlign: 'center',
    textShadow: 5,
  }
}));

const Options = ({ children, props }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext)
  const [idToCall, setIdToCall] = useState('');
  const [dial, setDial] = useState(false);
  const classes = useStyles();
  const calling = () => {
    callUser(idToCall);
    dial? setDial(false) : setDial(true);
  }

  const [visible, setVisible] = useState(false);
  const [altVis, setAltVis] = useState(1);

  useEffect(() => {
		const visibilityTimeout = setTimeout(() => {
			setVisible(false)
		}, 24000)
		setVisible(true)
		return () => {
			clearTimeout(visibilityTimeout)
		}
	}, [])

  useEffect(() => {
		const altVisTime = setInterval(() => {
			setAltVis(altVis+1)
		}, 4000)
		return () => {
			clearInterval(altVisTime)
		}
	},)

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.firstpaper} style={{backgroundColor: 'lightblue'}} hidden={!visible}>
        <h1 hidden={altVis===1? !visible : true}>This is Bottle Express!</h1>
        <h2 hidden={altVis===2? !visible : true}>A lightweight, no strings attached video app!</h2>
        <h3 hidden={altVis===3? !visible : true}>Each browser refresh/ended call clears the ID and a new one is generated.</h3>
        <h3 hidden={altVis===4? !visible : true}>Simply enter your name, press the "Copy Your ID" button below, and send it to a friend.</h3>
        <h3 hidden={altVis===5? !visible : true}>They can then enter your ID to call you!</h3>
        <h3 hidden={altVis===6? !visible : true}>Thanks for visiting, and be sure to check out my other projects in the upcoming links:</h3>
      
      </Paper>
      <Paper elevation={10} className={classes.firstpaper} style={{backgroundColor: 'lightblue'}} hidden={visible}>
        <Button color='primary' variant='outlined' target={'_blank'} href='https://account.venmo.com/u/figgsboson'>Support My Work!</Button>
      </Paper>
      <Paper elevation={10} className={classes.paper} style={{backgroundColor: 'lightblue'}}>
      <Grid></Grid>
        <form className={classes.root} noValidate autoComplete='off'>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant='h6'>Account Info</Typography>
              <TextField 
              label='Name' 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              fullWidth />
              <CopyToClipboard text={me} className={classes.margin}>
                <Button 
                onClick={()=> window.alert('Copied!')}
                variant='contained' 
                color='primary' 
                fullWidth 
                startIcon={<Assignment fontSize='large' />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>

            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant='h6'>Make A Call</Typography>
              <TextField 
              label='ID To Call' 
              value={idToCall} 
              onChange={(e) => setIdToCall(e.target.value)} 
              fullWidth />
              {callAccepted && !callEnded ? (
                <Button 
                variant='contained' 
                color='secondary' 
                startIcon={<PhoneDisabled fontSize='large' />}
                fullWidth
                onClick={leaveCall}
                className={classes.margin}>
                  Hang Up
                </Button>
              ) : (
                <Button
                variant='contained' 
                color={dial? 'success' : 'primary'}
                startIcon={dial? <PhoneInTalk fontSize='large' /> : <Phone fontSize='large' />}
                fullWidth
                onClick={() => calling()}
                className={dial? classes.btnsuccess : classes.margin}>
                {dial? 'Calling...' : 'Make A Call'}
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  )
}

export default Options