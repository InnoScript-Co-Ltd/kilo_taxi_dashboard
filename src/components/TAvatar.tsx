import { Avatar } from '@mui/material'
import React from 'react'

const TAvatar = ({ src } : { src : string }) => {    
  return (<Avatar alt="Remy Sharp" src={src} />)
}

export default TAvatar