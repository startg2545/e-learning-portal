import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Account = () => {
    const { logOut, user } = UserAuth()
    const navigate = useNavigate()
    const isPressedHome = false

    const handleSignOut = async () => {
        try{
            await logOut()
        }catch(e){
            console.log(e)
        }
    }

    return(
        <div>
            <h1>Account</h1>
            <div>
                <p>Welcome, {user?.displayName}</p>
                <button onClick={handleSignOut}>Logout</button>
            </div>
        </div>
    )
}
export default Account