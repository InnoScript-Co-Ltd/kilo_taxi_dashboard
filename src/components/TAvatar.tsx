import { Avatar } from '@mui/material'
import React from 'react'

const TAvatar = ({ src } : { src : string }) => {
    console.log(src);
    
  return (
    <div>
        <Avatar alt="Remy Sharp" src={src} />    
    </div>
  )
}

export default TAvatar