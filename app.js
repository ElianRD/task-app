document.getElementById("form").addEventListener("submit", saveTask);

function saveTask(e){
    let title = document.querySelector(".form__title").value
    let description = document.querySelector(".form__description").value
    const task = {
        title,
        description,
    }
    if (localStorage.getItem("task") == null){
        let tasks = []
        tasks.push(task)  
        localStorage.setItem("task",JSON.stringify(tasks))

    }else{
        let tasks = JSON.parse(localStorage.getItem("task"))
        tasks.push(task)
        localStorage.setItem("task",JSON.stringify(tasks))  
        
        
    }
    getTask()
    title.innerHTML = ""
    description.innerHTML= ""
    e.preventDefault()
}
function getTask(){
    let blockTaks = document.querySelector(".tasks")
    let tasks = JSON.parse(localStorage.getItem("task"))
    blockTaks.innerHTML = "";
    let allTask = []
    console.log(tasks)
    tasks.forEach(element => {
        console.log(element)
        
        let container = document.createElement("div")
        container.classList.add("task-container")
        let title = document.createElement("p")
        title.classList.add("task-container__title")
        let description = document.createElement("p")
        description.classList.add("task-container__description")
        let deleteBoton = document.createElement("button")
        deleteBoton.textContent = "Eliminar";
        deleteBoton.classList.add("task-container__delete")
        let editBoton = document.createElement("button")
        editBoton.textContent = "editar";
        editBoton.classList.add("task-container__delete")

        title.textContent = element.title
        description.textContent = element.description
        container.append(title,description,deleteBoton,editBoton)
        allTask.push(container)
        

    });
    blockTaks.append(...allTask)
}