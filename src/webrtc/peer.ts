import Peer, { DataConnection } from 'peerjs'
import icelist from './icelist'
import { isProd } from '../constants/devSettings'

const config = {
  secure: true,
  port: 443,
  iceServers: [
    {
      urls: icelist.map((stunUrl) => ({ url: `stun:${stunUrl}` })),
    },
    // still needs some TURN servers to connect two users behind symetric NAT
  ],
}

type ConnectionType = {
  peer: Peer | null
  conn: DataConnection | null
}

export const peerAll: ConnectionType = {
  peer: null,
  conn: null,
}

if (!isProd) {
  ;(window as Window & typeof globalThis & { peerAll: unknown }).peerAll =
    peerAll
}

export const onUnloadDisconnect = () => {
  if (peerAll.peer !== null && !peerAll.peer.destroyed) {
    peerAll.peer.destroy()
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
