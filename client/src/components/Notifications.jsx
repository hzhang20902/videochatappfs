import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { PhoneCallback, PhoneDisabled } from '@material-ui/icons'

import { SocketContext } from '../SocketContext'

const Notifications = () => {
  const { answerCall, call, callAccepted, dialing, leaveCall } = useContext(SocketContext);

  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <h1 style={{ display: 'flex', fontFamily: 'futura', color: 'green', marginRight: '3%'}}>{call.name} is calling...</h1>
          <Button variant='contained' startIcon={<PhoneCallback />} color='primary' onClick={answerCall}>
            Answer Call
          </Button>
        </div>
      )}
      {dialing && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <h1 style={{ display: 'flex', fontFamily: 'futura', color: 'green', marginRight: '3%'}}>Calling {call.name}...</h1>
         <Button variant='contained' startIcon={<PhoneDisabled />} color='secondary' onClick={leaveCall}>
            End Call
          </Button>
        </div>
      )}
    </>
  )
}

export default Notifications