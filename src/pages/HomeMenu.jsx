import React from 'react'
import './HomeMenu.css'

const HomeMenu = () => {
  return (
    <div className="container-box">
        <div className="container-header">Dashboard</div>
            <div className="platform">
                <a href="https://www.microsoft.com/en/microsoft-teams/log-in" target="_blank" className="Team"> Microsoft Team <br/>
                  <div className="img">
                    <img src={require('./img/team.png')} />
                  </div>
                </a>
                <a href="https://mango.cmu.ac.th/" target="_blank" className="Mango"> Mango CMU <br/>
                  <div className='img'>
                    <img src={require('./img/mango.png')}/>
                  </div>
                </a>
                <a href="https://elearning.cmu.ac.th/login/index.php" target="_blank" className="Moodle"> KC-Moodle CMU 
                  <div className="img">
                    <img src={require('./img/moodle.png')}/>
                  </div>
                </a>
            </div>    
    </div>
  )
}

export default HomeMenu
