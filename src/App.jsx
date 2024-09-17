import { useState, useEffect } from "react";
import { v4 as uuid4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
const [showfinish, setshowfinish] = useState(true)

useEffect(() => {
let td_data = localStorage.getItem("todos")
if (td_data){
  let todos = JSON.parse(td_data)
  settodos(todos)
}

 
}, [])

const sv_tds = (params) => {
  localStorage.setItem("todos", JSON.stringify(todos));
}

  const handleEdit = (e, id) => {
    let todo_Edit = todos.find((i) => i.id === id);
    settodo(todo_Edit.todo);
    let newTodos = todos.filter((item) => item.id !== id);
    settodos(newTodos);
    sv_tds()
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    settodos(newTodos);
    sv_tds()
  };

  const handleAdd = () => {
    if (todo.length !== 0) {
      settodos([...todos, { id: uuid4(), todo, isCompleted: false }]);
      settodo("");
      sv_tds()
    } else {
      alert("Empty....Input");
    }
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckox = (e) => {
    let id = e.target.id;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos); // Fix: Removed passing `todos` as an extra argument
    sv_tds()
  };

  const toogleFinish = () => {
    setshowfinish(!showfinish)
  }


  return (
    <>


      <div
        className="todo_card overflow-auto"
        style={{
          border: "1px solid #ffffff3b",
          boxShadow: "1px 1px 18px 0px #ffffff3b",
        }}
      >
        <header>
          <div className="icons">
            {/* Google */}
          <a
          aria-label="Google" target="_blank"
              href="mailto:sabirhusseinbalal@gamil.com"
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
            >
              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                alt="Google"
              />
            </a>
            {/* Github */}
            <a
            aria-label="Github" target="_blank"
              href="https://github.com/Sabirhussainbalal"
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
            >
              <img
                className="max-w-[25px] filter dark:invert"
                src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                alt="Github"
              />
            </a>
            {/* Fb */}
             <a
             aria-label="FaceBook" target="_blank"
              href="https://www.facebook.com/Sabirhusseinbalal/"
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
            >
              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                alt="Facebook"
              />
            </a>
        </div>
        <div className="line w-[30%] m-auto h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:scale-105  transition duration-300 ease-in-out cursor-pointer"></div>
        <h1 className="pt-2 pb-2 font-bold text-2xl dark:text-gray-400 text-center cursor-default ">
        Task Master
        </h1>
        <div className="line w-[30%] m-auto h-[2px] bg-gradient-to-r  to-purple-500 shadow-lg hover:scale-105 from-purple-500  transition duration-300 ease-in-out cursor-pointer"></div>
        {/* Adding todos */}
        <h3 className="pt-4 pb-5 text-1x1 dark:text-gray-300 cursor-default w-[80%] m-auto">
        Effortlessly plan your day by adding, tracking, and managing your tasks with ease.
        </h3>
        <div className="btns">
          <input
            className="text-white input"
            type="text"
            value={todo}
            onChange={handleChange}
            placeholder="Add a new task..."
            style={{ resize: "horizontal", width: "100%" }}
          />
          <div onClick={handleAdd} className="btn_sav bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg text-white hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out cursor-pointer">
          Add_Task
          </div>
        </div>
        </header>
        <main>
        <div className="w-[78%] m-auto mt-10">
          <div className="finished flex gap-5 mb-5">
            <input
              className="cursor-pointer "
              type="checkbox"
              checked={showfinish}
              onChange={toogleFinish}
              placeholder="Show Completed Tasks"
            />
            <span>Show Finished</span>

          </div>
          <div className="line bg-white w-[95%] h-[2px] m-auto"></div>
          <div className="todos mt-5 font-bold mb-5">
            <p>Things To Achieve</p>
            {/* Todo */}
            { todos.length === 0 && <span className="zero">Looks like you haven’t added any tasks yet. Start by adding your first one!</span>}
            {todos.map(item => {
  return (showfinish || !item.isCompleted) && (
    <div key={item.id} className="list flex justify-between items-center ali p-2 hover:border-2 hover:border-[#464343]">
      <div className="first flex gap-3">
        <input className="cursor-pointer" onChange={handleCheckox} type="checkbox" id={item.id} checked={item.isCompleted} />
        <p className={item.isCompleted ? "line-through" : ""}>{item.todo}</p>
      </div>
      <div className="second flex gap-3">
        <div onClick={(e) => handleEdit(e, item.id)} className="edit cursor-pointer" title="Edit">
          <lord-icon state="in-dynamic" src="https://cdn.lordicon.com/oqaajvyl.json" trigger="loop-on-hover" stroke="bold"></lord-icon>
        </div>
        <div onClick={(e) => handleDelete(e, item.id)} className="delete cursor-pointer" title="Delete">
          <lord-icon src="https://cdn.lordicon.com/vlnvqvew.json" state="morph-trash-out" trigger="loop-on-hover" stroke="bold"></lord-icon>
        </div>
      </div>
    </div>
  );
})}


            
          </div>
        </div>
        </main>
      </div>
    </>
  );
}

export default App;

