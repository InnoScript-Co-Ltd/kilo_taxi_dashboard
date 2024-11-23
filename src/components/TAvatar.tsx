import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'

const TAvatar = ({ src } : { src : string }) => {   
  
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    if(src) {
      setPreview(`${src}?t=${new Date().getTime()}`);
    }
  }, [src])

  return (<Avatar alt="Remy Sharp" src={preview} />)
}

export default TAvatar