import './Todo.css';

function Todo (el) {
    const showText = (e) => {
        document.getElementById('sample').innerHTML += e.target.innerHTML;
        
    }
    return(
        <div className='Todo'>
            <h1 onClick={(e) => showText(e)}>title: {el.title}</h1>
            <p>description: {el.description}</p>
            <b>name: {el.name}, student id: {el.id}</b><br/>
            <b><span id='sample'></span></b>
        </div>
    )
}

export default Todo