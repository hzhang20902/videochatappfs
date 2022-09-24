import React, { 
    createContext,
    useState,
    useRef,
    useEffect
} from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'


const SocketContext = createContext()

const socket = io('https://vidchatappexpress.herokuapp.com/')

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [audio, setAudio] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [dialing, setDialing] = useState(false);
    const [name, setName] = useState('');

    const myVideo = useRef();
    const myAudio = useRef();
    const userVideo = useRef();
    const userAudio = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia( {
            video: true,
            audio: true,
            } ).then(
            (currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
                
            });

        navigator.mediaDevices.getUserMedia( {
            audio: true,
        }).then(
            (currentAudio) => {
                setAudio(currentAudio);

                myAudio.current.srcObject = currentAudio;
            }
        )

        socket.on('me', (id) => setMe(id));

        socket.on('calluser', ( {from, name: callerName, signal} ) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal })
        })
    }, []);
    
    const answerCall = () => {
        setCallAccepted(true)

        const peer = new Peer({ initiator: false, trickle: false, stream, audio });

        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        
        });

        peer.on('audio', (currentAudio) => {
            userAudio.current.srcObject = currentAudio;
        })

        peer.signal(call.signal);

        connectionRef.current = peer;
    };
    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream, audio });

        peer.on('signal', (data) => {
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name });
            setDialing(true);
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
           
        });

        peer.on('audio', (currentAudio) => {
            userAudio.current.srcObject = currentAudio;
        })

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);
            setDialing(false);
            peer.signal(signal)
        });

        connectionRef.current = peer;        
    };
    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    };

    return (
        <SocketContext.Provider value={{
            dialing,
            call,
            callAccepted,
            myVideo,
            myAudio,
            userVideo,
            userAudio,
            stream,
            audio,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
