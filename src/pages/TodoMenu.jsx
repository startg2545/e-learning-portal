import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import '../components/design.css'
import { UserAuth } from '../context/AuthContext'

const TodoMenu = () => {
  const { logOut, user } = UserAuth()
  const [data, setData] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [idChosen, setIdChosen] = useState(0)

  const getData = () => {
    getDocs(collection(db, 'todo')).then(query=>{
      if(!query.empty){
        const docs_data = []
        query.forEach(doc=>{
          const doc_data = doc.data()
          doc_data.id = doc.id
          docs_data.push(doc_data)
        })
        setData(docs_data)
      }
    })
  }
  const addData = (item) => {
    addDoc(collection(db, 'todo'), item).then(msg=>{
      getData()
    })
  }
  const removeData = (id) => {
    deleteDoc(doc(db, 'todo', id.toString())).then(msg=>{
      setData([])
      getData()
    })
  }
  const updateData = async (newTitle, newContent) => {
    console.log(idChosen)
    const userDoc = doc(db, 'todo', idChosen)
    let add_data = {
      title: newTitle,
      content: newContent
    }
    updateDoc(userDoc, add_data).then(msg=>{
      setData([])
      getData()
    })
  }

  useEffect(()=>{
    getData()
  },[]);
  return (
    <div>
      <h1 style={{ margin: '1rem auto', textAlign: 'center' }}>Todo List</h1>
      <div className='submitForm'>
      <form onSubmit={(e)=>{
        e.preventDefault()
        const add_data = {
          title: title,
          content: content,
          uid: user.uid
        }
        addData(add_data)
      }}>
        
        <input type='text' value={title} placeholder='Title' maxLength={22}
        onChange={(e)=>{setTitle(e.target.value)}}/><br/>
        <textarea value={content} placeholder='Content' rows={4} cols={32} maxLength={80}
        onChange={(e)=>{setContent(e.target.value)}}/><br/>
        <button type='submit'>Submit</button>
      </form>
      {
        data && data.map(item=> 
        <Card 
          title={item.title}
          content={item.content} 
          id={item.id} 
          removeData={removeData} 
          key={item.id}
          uidItem ={item.uid}
          updateData={updateData}
          setIdChosen={setIdChosen}
          uid={user.uid}
        />)
      }
    </div>
    </div>
  )
}

const Card = ({title, content, id, removeData, updateData, 
              setIdChosen, uid, uidItem}) => {
  const [updateTitle, setUpdateTitle] = useState()
  const [updateContent, setUpdateContent] = useState()

  const submitForm =(e) => {
    document.getElementById('editForm').style.display = 'none'
    updateData(updateTitle, updateContent)
    e.preventDefault()
  }
  useEffect(()=>{
    // if(uid!==uidItem){
    //   document.getElementById('cardId').style.display = 'none'
    //   console.log(uid)
    //   console.log(uidItem)
    // }
  },[]);
  return(
    <div className='submitForm titleContent' id='cardId'>
      <div>
      <div className='title'>
        Title: {title}
      </div>
      <button
      className='button' onClick={()=>{
        removeData(id)
      }}>Delete</button>
      <button
      className='button' onClick={()=>{
        document.getElementById('editForm').style.display = 'block'
        setIdChosen(id)
      }}>
        Edit
      </button>
      </div>
        <div id='myContent' className='content'>
        Description: {content}
        </div>
      <div id='editForm' className='modifyTodo'>
        <form onSubmit={(e)=>{
          submitForm(e)
        }}>
          <h1 style={{ color: 'white' }}>Editing</h1>
          <input type='text' placeholder='title' required maxLength={22}
          onChange={(e)=>setUpdateTitle(e.target.value)}/><br/>
          <textarea rows={4} cols={20} placeholder='content' required maxLength={80}
          onChange={(e)=>setUpdateContent(e.target.value)}/><br/>
          <button className='button' type='submit'>Update</button>
          <button className='button' onClick={()=>{
            document.getElementById('editForm').style.display = 'none'
          }}>Cancel</button>
        </form>
      </div>
    </div>
  )
}

export default TodoMenu