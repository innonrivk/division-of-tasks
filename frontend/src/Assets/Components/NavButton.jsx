import React ,{ useState} from 'react'


function NavButton() {


  return (
    <div>
        <div>
            <button onClick={() => {navigator('/')}}>Home</button>
            <button onClick={() => {navigator('/about')}}>About</button>
            <button onClick={() => {navigator('/contact')}}>Contact</button>
        </div>

    </div>
)
}

export default NavButton
