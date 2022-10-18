import React, {useEffect, useState} from 'react';
import {db} from '../firebase/firebase';
import {collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';
import './CalendarView.css';

const Calendar = () => {
    const [data, setData] = useState();
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventDate, setEventDate] = useState("");

    const getData = () => {
        getDocs(collection(db,'google-auth')).then(query=>{
            if(!query.empty){
                const docs_data = [];
                query.forEach(doc=>{
                    const doc_data = doc.data();
                    doc_data.id = doc.id;
                    docs_data.push(doc_data);
                });
                setData(docs_data);
            }
        });
    }
    const addData = (item) => {
        addDoc(collection(db,'google-auth'),item).then(msg=>{
            getData()
        });
    }
    const removeData = (id) => {
        deleteDoc(doc(db, 'google-auth', id.toString())).then(msg=>{
            setData([]);
            getData()
        });
    }
    useEffect(()=>{
        getData();
    },[]);
    const stringToDate = (str, time) => {
        const arr = str.split("-");
        const arr1 = time.split(":");
        const date = new Date();
        date.setFullYear(parseInt(arr[0]));
        date.setMonth(parseInt(arr[1])-1);
        date.setDate(parseInt(arr[2]));
        date.setHours(parseInt(arr1[0]));
        date.setMinutes(parseInt(arr1[1]));
        return date;
    }

    // calendar part
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    var getMonthNum = d.getMonth();
    var getDateNum = d.getDate();
    var monthNum = document.getElementById('monthNum');
    var yearNum = document.getElementById('yearNum');
    let element = document.getElementById("today" + getDateNum);
    if(element!=null){
        element.style.padding = 5;
        element.style.background = 'green';
        element.style.color = 'white';
    }
    // if(monthNum!=null)
    // document.getElementById('monthNum').innerHTML = months[getMonthNum] + " " + d.getFullYear();
    const monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    var isShowInfoOpening = false;

    var previousMonth = function(){
        getMonthNum--;
        setBothMonth(getMonthNum);
    }
    var nextMonth = function(){
        getMonthNum++; 
        setBothMonth(getMonthNum);
    }
    var myForm = document.getElementById("myForm");
    function openForm(getDayFromClicking) {
        if(isShowInfoOpening===true){return;}
        // if(myForm)
        document.addEventListener("DOMContentLoaded", function () {
            myForm.style.display = "block";
        });
        setDateDefault(getDayFromClicking);
    }
    function closeForm() {
        if(myForm!=null)
            myForm.style.display = "none";
    }
    var desForm = document.getElementById("desForm");
    function openInfo(x){
        if(desForm!=null)
            desForm.style.display = "block";
        setEvent(x);
        isShowInfoOpening = true;
    }
    function closeInfo(){
        if(desForm!=null)
            desForm.style.display = "none";
        if(document.getElementById("titleShow")!=null)
            document.getElementById("titleShow").innerHTML = '';
        isShowInfoOpening = false;
    }

    function setEvent(x){
        var countEvent = 0;
        const objCache = JSON.parse(localStorage.getItem('cache'));
        for(let item of objCache){
            let getTitle = item.title || "";
            let getMonth = new Date(item.date).getMonth();
            let getDay = new Date(item.date).getDate();
            var titleShow = document.getElementById("titleShow");
            var dateShow = document.getElementById("dateShow");
            var timeShow = document.getElementById("timeShow");
            var descriptionShow = document.getElementById("descriptionShow");
            if(getMonthNum===getMonth && getDay===x){
                countEvent++;
                if(countEvent>1){
                    titleShow.innerHTML += ', ';
                    dateShow.innerHTML += ', ';
                    timeShow.innerHTML += ', ';
                    descriptionShow.innerHTML += ', ';
                }
                titleShow.innerHTML += getTitle;
                dateShow.innerHTML += item.date;
                timeShow.innerHTML += item.time;
                descriptionShow.innerHTML += item.description;
            }
        }
    }
    var setDateDefault = function(getDayFromClicking){
        const objCache = JSON.parse(localStorage.getItem('cache'));
        let getMonth = new Date(objCache.date).getMonth()+1;
        if(getMonth<10){
          getMonth = '0'+getMonth;
        }
        if(getDayFromClicking<10){
          getDayFromClicking = '0'+getDayFromClicking;
        }
  
        let date = 2022+'-'+getMonth+ '-'+getDayFromClicking;
        if(document.getElementById('date')!=null) 
            document.getElementById('date').defaultValue = date;
    }
    function setBothMonth(getMonthNum){
        if(document.getElementById('monthNum')!=null)
            document.getElementById('monthNum').innerHTML = months[getMonthNum] + " " + d.getFullYear();
        setDay();
        changeEventInMonth(getMonthNum);
    }
    var setDay = function(){
        for(var i=28;i<32;i++){
            if(i>monthDays[getMonthNum] &&
            document.getElementById("today" + i)!=null){
            document.getElementById("today" + i).style.display="none";
            }else if(document.getElementById("today" + i)!=null){
            document.getElementById("today" + i).style.display="initial";
            }
        }
    }
    function changeEventInMonth(x){
        const objCache = JSON.parse(localStorage.getItem('cache'));
        for(let item of objCache){
          let getTitle = item.title || "";
          let getMonth = new Date(item.date).getMonth();
          let getDay = new Date(item.date).getDate();
          let getEleDay = document.getElementById("appointment"+getDay.toString());
          if(getMonth===x && getEleDay!=null){
            getEleDay.innerHTML += '<p>'+getTitle+'</p>';
          }else if(getEleDay!=null){
            getEleDay.innerHTML = '';
          }
        } 
      }
      var dateInput = document.getElementById('date');
      var timeInput = document.getElementById('time');
      var titleInput = document.getElementById('title');
      var describeInput = document.getElementById('describe');
      var durationInput = document.getElementById("duration-input");
      var resultP = document.getElementById("output");

    //   durationInput.addEventListener("change", function (e) {
    //     resultP.textContent = "";
    //     durationInput.checkValidity();
    //   });
    //   durationInput.addEventListener("invalid", function (e) {
    //     resultP.textContent = "Invalid input";
    //   });
      getDatabase('http://kencosh.com/calendar/calendar.php')
      async function getDatabase(link){
        await fetch(link)
        .then((res)=>res.text())
        .then((data)=>{
          calendarAddEvent(JSON.parse(data));
        })
      }
      var calendar_event=[];
      getCache();
      function calendarAddEvent(data){
        //concat
        try{
          for(let item of data){
            //validation no duplicate name
            let dup = false;
            for(let i of calendar_event){
              console.log(calendar_event.length);
              if(i.title === item.title){
                dup=true;
                break;
              }
            }
            if(!dup){
              calendar_event.push(item);
            }
          }
        }
        catch(e){
          console.log(e.message);
        }
        updateData(calendar_event);
      }
      function updateData(data){
        for(let i=1;i<=31;i++){
          try{
            if(document.getElementById('appointment'+i)!=null)
                document.getElementById('appointment'+i).innerHTML = '';
          }
          catch(e){

          }
        }
        for(let item of data){
          let getTitle = item.title || "";
          let getMonth = new Date(item.date).getMonth();
          let getDay = new Date(item.date).getDate();
          let getEleDay2 = document.getElementById("appointment"+getDay.toString())
          if(getMonth === getMonthNum && getEleDay2!=null){
            getEleDay2.innerHTML += '<p>'+getTitle+'</p>';
          }
        }
        setCache(data);
      }
      
      function setCache(data){
        const datajson = JSON.stringify(data);
        localStorage.setItem('cache',datajson);
      }

      function getCache(){
        const data = JSON.parse(localStorage.getItem('cache')||"{}");
        calendarAddEvent(data);
      }
      function handleSubmit(e){
        if(e!==undefined)
        e.preventDefault();
        if(titleInput!==null&&dateInput!==null&&timeInput!==null&&describeInput!==null &&
            titleInput.value.length!==0 && dateInput.value.length!==0 && timeInput.value.length!==0){
          const data_input = {
            title: titleInput.value,
            date: JSON.stringify(dateInput.value),
            time: timeInput.value,
            description: describeInput.value
          }
          calendarAddEvent([data_input]);
          closeForm();
        }
      }
return(
    <div>
    <h1 style={{ textAlign: 'center' }}>My Calendar</h1>
    <div className='month'>
        <ul>
        <div className='changeMonth'>
        <li>
            <span className='monthYearStyle'>
            <button id='month_dec' onClick={previousMonth}>&#10094;&#10094;</button>
            <span id='monthNum'>October 2022</span>
            <button id='month_inc' onClick={nextMonth}>&#10095;&#10095;</button>
            </span>
        </li>
        </div>
        </ul>
    </div>

    <ul className='weekdays'>
    <b>
        <li>Mo</li>
        <li>Tu</li>
        <li>We</li>
        <li>Th</li>
        <li>Fr</li>
        <li>Sa</li>
        <li>Su</li>
    </b>
    </ul>

    <ul className='days'>
    <b>
        <li onClick={openForm(1)}><span id="today1">1</span><br/><span id="appointment1" onClick={openInfo(1)}></span></li>
        <li onClick={openForm(2)}><span id="today2">2</span><br/><span id="appointment2" onClick={openInfo(2)}></span></li>
        <li onClick={openForm(3)}><span id="today3">3</span><br/><span id="appointment3" onClick={openInfo(3)}></span></li>
        <li onClick={openForm(4)}><span id="today4">4</span><br/><span id="appointment4" onClick={openInfo(4)}></span></li>
        <li onClick={openForm(5)}><span id="today5">5</span><br/><span id="appointment5" onClick={openInfo(5)}></span></li>
        <li onClick={openForm(6)}><span id="today6">6</span><br/><span id="appointment6" onClick={openInfo(6)}></span></li>
        <li onClick={openForm(7)}><span id="today7">7</span><br/><span id="appointment7" onClick={openInfo(7)}></span></li>
        <li onClick={openForm(8)}><span id="today8">8</span><br/><span id="appointment8" onClick={openInfo(8)}></span></li>
        <li onClick={openForm(9)}><span id="today9">9</span><br/><span id="appointment9" onClick={openInfo(9)}></span></li>
        <li onClick={openForm(10)}><span id="today10">10</span><br/><span id="appointment10" onClick={openInfo(10)}></span></li>
        <li onClick={openForm(11)}><span id="today11">11</span><br/><span id="appointment11" onClick={openInfo(11)}></span></li>
        <li onClick={openForm(12)}><span id="today12">12</span><br/><span id="appointment12" onClick={openInfo(12)}></span></li>
        <li onClick={openForm(13)}><span id="today13">13</span><br/><span id="appointment13" onClick={openInfo(13)}></span></li>
        <li onClick={openForm(14)}><span id="today14">14</span><br/><span id="appointment14" onClick={openInfo(14)}></span></li>
        <li onClick={openForm(15)}><span id="today15">15</span><br/><span id="appointment15" onClick={openInfo(15)}></span></li>
        <li onClick={openForm(16)}><span id="today16">16</span><br/><span id="appointment16" onClick={openInfo(16)}></span></li>
        <li onClick={openForm(17)}><span id="today17">17</span><br/><span id="appointment17" onClick={openInfo(17)}></span></li>
        <li onClick={openForm(18)}><span id="today18">18</span><br/><span id="appointment18" onClick={openInfo(18)}></span></li>
        <li onClick={openForm(19)}><span id="today19">19</span><br/><span id="appointment19" onClick={openInfo(19)}></span></li>
        <li onClick={openForm(20)}><span id="today20">20</span><br/><span id="appointment20" onClick={openInfo(20)}></span></li>
        <li onClick={openForm(21)}><span id="today21">21</span><br/><span id="appointment21" onClick={openInfo(21)}></span></li>
        <li onClick={openForm(22)}><span id="today22">22</span><br/><span id="appointment22" onClick={openInfo(22)}></span></li>
        <li onClick={openForm(23)}><span id="today23">23</span><br/><span id="appointment23" onClick={openInfo(23)}></span></li>
        <li onClick={openForm(24)}><span id="today24">24</span><br/><span id="appointment24" onClick={openInfo(24)}></span></li>
        <li onClick={openForm(25)}><span id="today25">25</span><br/><span id="appointment25" onClick={openInfo(25)}></span></li>
        <li onClick={openForm(26)}><span id="today26">26</span><br/><span id="appointment26" onClick={openInfo(26)}></span></li>
        <li onClick={openForm(27)}><span id="today27">27</span><br/><span id="appointment27" onClick={openInfo(27)}></span></li>
        <li onClick={openForm(28)}><span id="today28">28</span><br/><span id="appointment28" onClick={openInfo(28)}></span></li>
        <li onClick={openForm(29)}><span id="today29">29</span><br/><span id="appointment29" onClick={openInfo(29)}></span></li>
        <li onClick={openForm(30)}><span id="today30">30</span><br/><span id="appointment30" onClick={openInfo(30)}></span></li>
        <li onClick={openForm(31)}><span id="today31">31</span><br/><span id="appointment31" onClick={openInfo(31)}></span></li>
    </b>
    </ul>
    <div className='form-popup' id='myForm'>
        <form className='form-container' id='calendarForm' onSubmit={handleSubmit()}>
            <h1>Appointment</h1>

            <label htmlFor='date'><b>Date</b></label>
            <input type='date' placeholder='Enter date' id='date' required/><br/>

            <label htmlFor='time'><b>Time</b></label>
            <input type="time" placeholder="Enter time" id="time" required/><br/>
            
            <label htmlFor='title'><b>Title</b></label>
            <input type="text" placeholder="Enter title" id="title" required/>
            
            <label htmlFor='description'><b>Description</b></label>
            <textarea placeholder="What is your description?"
            rows="4" cols="35" id="describe"/>

            <label htmlFor='duration'><b>Duration</b></label>
            <input id="duration-input" type="text" required pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}" 
            defaultValue="00:00:00:00" title="Write a duration in the format hh:mm:ss:ms"/>
            <p id="output"></p>
            
            <button type='submit' id='submit' className='btn' >Save</button>
            <button type='button' className='btn cancel' onClick={closeForm()}>Close</button>
        </form>
    </div>
    <div className='form-popup' id='desForm'>
        <form className='describe-container'>
            <h1>Information</h1>
            <label htmlFor='titleShow'><b>Title: </b></label>
            <span id="titleShow"></span><br/>

            <label htmlFor='dateShow'><b>Date: </b></label>
            <span id="dateShow"></span><br/>

            <label htmlFor='timeShow'><b>Time: </b></label>
            <span id="timeShow"></span><br/>

            <label htmlFor='descriptionShow'><b>Description: </b></label>
            <span id="descriptionShow"></span><br/>

            <button type="button" onClick={closeInfo()}>Close</button>
        </form>
    </div>
    
    <form onSubmit={(e)=>{
        e.preventDefault();
        const add_data = {
            name: eventName,
            description: eventDescription,
            time: stringToDate(eventDate, eventTime)
        };
        addData(add_data);
    }} className='form-container'>
        <input type="text" value={eventName} onChange={(e)=>{setEventName(e.target.value)}} placeholder='Title'/>
        <input type="text" value={eventDescription} onChange={(e)=>{setEventDescription(e.target.value)}} placeholder='Description'/>
        <input type="time" value={eventTime} onChange={(e)=>{setEventTime(e.target.value)}} />
        <input type="date" value={eventDate} onChange={(e)=>{setEventDate(e.target.value)}}/>
        <input type="submit" className='btn' />
    </form>
    {
        data && data.map(item=><Card name={item.name} 
        description={item.description}
        time={item.time} id={item.id} 
        removeData={removeData}/>)
    }
</div>
)
}

const Card = ({name, description, time, id, removeData}) => {
    function showInfo(){
        document.getElementById('desForm').style.display = 'block';
    }
    function closeInfo(){

    }
    if(document.getElementById('dateShow')!=null&&document.getElementById('titleShow')!=null&&
    document.getElementById('descriptionShow')!=null&&document.getElementById('timeShow')!=null)
    document.getElementById('dateShow').innerHTML = id;
    document.getElementById('titleShow').innerHTML = name;
    document.getElementById('descriptionShow').innerHTML = description;
    document.getElementById('timeShow').innerHTML = new Date(time.seconds*1000).toString();
    return (
        <div>
            <div>
                {
                    name
                }
            </div>
            <div className='form-popup' id='desForm'>
                <div>
                {
                    id
                }
            </div>
            <div>
                {
                    name
                }
            </div>
            <div>
                {
                    description
                }
            </div>
            <div>
                {
                    new Date(time.seconds*1000).toString()
                }
            </div>
            </div>
            

            <button style={{  backgroundColor:'lime' }} onClick={()=>{
                removeData(id)
            }}>Delete</button>
            <button style={{  backgroundColor:'lime' }} onClick={showInfo}>
                Show
            </button>

            <div className='form-popup' id='desForm'>
                <form className='describe-container' onSubmit={closeInfo}>
                    <h1>Information</h1>
                    <label htmlFor='titleShow'><b>id: </b></label>
                    <span id="titleShow"></span><br/>

                    <label htmlFor='dateShow'><b>Title: </b></label>
                    <span id="dateShow"></span><br/>

                    <label htmlFor='descriptionShow'><b>Description: </b></label>
                    <span id="descriptionShow"></span><br/>

                    <label htmlFor='timeShow'><b>Time: </b></label>
                    <span id="timeShow"></span><br/>

                    <button type='submit' id='submit'>Close</button>
                </form>
            </div>
        </div>
    )
}

export default Calendar