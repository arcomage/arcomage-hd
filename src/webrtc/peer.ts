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

export let peer: Peer | null = null

type ConnectionType = {
  current: Peer.DataConnection | null
}
export let connection: ConnectionType = {
  current: null,
}
;(window as any).conn = connection

export const initPeer = () => {
  peer = new Peer(config)
}

export const nullifyPeer = () => {
  peer = null
}
