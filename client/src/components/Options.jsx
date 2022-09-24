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
  linkbtn:{
    backgroundColor: theme.palette.success.main,
  },
  padding: {
    padding: 20,
    fontFamily: 'futura',
  },
  paper: {
    padding: '10px 20px',
    fontFamily: 'futura',
    border: '2px solid black',
  },
  firstpaper:{
    margin: 'auto',
    padding: '10px 20px',
    border: '2px solid black',
    fontFamily: 'futura',
    textAlign: 'center',
    textShadow: 5,
  }
}));

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext)
  const [idToCall, setIdToCall] = useState('');
  const [dial, setDial] = useState(false);
  const classes = useStyles();
  const calling = () => {
    callUser(idToCall);
    dial? setDial(false) : setDial(true);
  }

  const [visible, setVisible] = useState(false);

  useEffect(() => {
		const visibilityTimeout = setTimeout(() => {
			setVisible(true)
		}, 16000)
		setVisible(false)
		return () => {
			clearTimeout(visibilityTimeout)
		}
	}, [])

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.firstpaper} style={{backgroundColor: 'lightblue'}} hidden={visible}>
        <h2 hidden={visible}>A light-weight, no strings attached v-chat:</h2>
        <h3 hidden={visible}>Each browser refresh/ended call generates a new ID.</h3>
        <h3 hidden={visible}>Enter a screen name and press "COPY YOUR ID".</h3>
        <h3 hidden={visible}>Anyone with your current ID can call you!</h3>
        <h3 hidden={visible}>Thanks for visiting, and be sure to check out my other projects:</h3>
      </Paper>
   
      <Paper elevation={10} className={classes.firstpaper} style={{backgroundColor: 'lightblue'}} hidden={!visible}>
        <Grid container className={classes.gridContainer} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '9%'}}>
          <Grid item xs={12} md={6} className={classes.padding}>
            <Button color='secondary' variant='contained' target={'_blank'} href='https://ecommerce-react-hzhang20902.vercel.app/'>Next.Js Webstore</Button>
          </Grid>
          <Grid item xs={12} md={6} className={classes.padding}>
            <Button className={classes.linkbtn} color='success' variant='contained' target={'_blank'} href='https://account.venmo.com/u/figgsboson'>Support My Work!</Button>
          </Grid>
          <Grid item xs={12} md={6} className={classes.padding}>
            <Button color='primary' variant='contained' target={'_blank'} href='https://minecraft3clone-g8o6.vercel.app/'>Minecraft 3js Clone</Button>
          </Grid>
          <Grid item xs={12} md={6} className={classes.padding}>
            <Button className={classes.linkbtn} color='secondary' variant='contained' target={'_blank'} href='https://deploy-react-three-test.herokuapp.com'>React 3D Modeling</Button>
          </Grid>
        </Grid>
      </Paper>
   
      <Paper elevation={10} className={classes.paper} style={{backgroundColor: 'lightblue'}}>
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
                onClick={()=> window.alert('Copied to clipbard.')}
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