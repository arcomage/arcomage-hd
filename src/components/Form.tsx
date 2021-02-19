import React from 'react'
import fcls from './Form.scss'

type AppProps = { message: string }
export default ({ message }: AppProps) => <div className={fcls.aa}>{message}</div>
