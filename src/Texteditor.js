import React from 'react'
import styled from 'styled-components'
import { Navcontainer } from './components/Navcontainer'
import Options from './components/Options'

const Texteditor = () => {
    return (
        <div style={{backgroundColor:"rgba(190, 192, 196, 0.15)",height:"100vh",padding:20}}>
            <Navcontainer/>
            <Options/>
        </div>
    )
}

export default Texteditor
