import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Account = () => {
    const { logOut, user } = UserAuth()
    return(
        <div>
            <h1>Account</h1>
            <div>
                <p>Welcome, {user?.displayName}</p>
            </div>
        </div>
    )
}
export default Account