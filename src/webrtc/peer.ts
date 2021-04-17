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

type ConnectionType = {
  peer: Peer | null
  conn: Peer.DataConnection | null
}
export const peerAll: ConnectionType = {
  peer: null,
  conn: null,
}

if (process.env.ISDEV) {
  ;(window as any).peerAll = peerAll
}

export const onUnloadDisconnect = () => {
  if (peerAll.peer !== null) {
    peerAll.peer.disconnect()
  }
}

export const bindOnUnloadDisconnect = () => {
  window.addEventListener('beforeunload', onUnloadDisconnect)
}

export const initPeer = () => {
  peerAll.peer = new Peer(config)
  bindOnUnloadDisconnect()
}

export const nullifyPeer = () => {
  peerAll.peer = null
}
