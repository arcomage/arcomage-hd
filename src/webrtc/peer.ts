import Peer from 'peerjs'
import icelist from './icelist'

const config = {
  secure: true,
  port: 443,
  iceServers: [
    {
      urls: icelist,
    },
  ],
}

export const initPeer = () => new Peer(config)
