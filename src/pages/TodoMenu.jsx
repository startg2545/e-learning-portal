import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDoc, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore'

const TodoMenu = () => {
  const [data, setData] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

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
  useEffect(()=>{
    getData()
  },[]);

  return (
    <div>
      <form onSubmit={(e)=>{
        e.preventDefault()
        const add_data = {
          title: title,
          content: content
        }
        addData(add_data)
      }}>
        <input type='text' value={title} placeholder='Title'
        onChange={(e)=>{setTitle(e.target.value)}}/><br/>
        <textarea value={content} placeholder='Content'
        onChange={(e)=>{setContent(e.target.value)}}/>
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
        />)
      }
    </div>
  )
}

const Card = ({title, content, id, removeData}) => {
  return(
    <div>
      <div>
        {title}
      </div>
      <div id='popup' style={{ display: 'none'}}>
        <div>
          {title}
        </div>
        <div>
          {content}
        </div>
        <div>
          {id}
        </div>
      </div>
      <button onClick={()=>{
        removeData(id)
      }}>Delete</button>
      <button onClick={()=>{
        document.getElementById('popup').style.display = 'block'
      }}>Show</button>
    </div>
  )
}

export default TodoMenu