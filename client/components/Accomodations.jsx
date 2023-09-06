import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Accomodations() {
    const [places , setPlaces] = useState([])
    useEffect(()=> {

        axios.get('/places').then(({data}) => setPlaces(data))
    } , [])
  return (
    <div>
        hello
    </div>
  )
}

export default Accomodations