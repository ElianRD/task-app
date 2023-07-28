document.getElementById("form").addEventListener("submit", saveTask);

document.querySelector(".btn-show").addEventListener("click", getTask);
document.querySelector(".btn-hide").addEventListener("click", deleteAll);


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
    let show = document.querySelector(".btn-show")
    show.style.display = "none"
    let hide = document.querySelector(".btn-hide")
    hide.style.display = "block"
    getTask()
    title.innerHTML = ""
    description.innerHTML= ""
    document.getElementById("form").reset();
    e.preventDefault()
}


function getTask(){
    let blockTaks = document.querySelector(".tasks")
    let tasks = JSON.parse(localStorage.getItem("task"))
    blockTaks.innerHTML = "";
    let allTask = []
 
    tasks.forEach((element,index) => {

        
        let container = document.createElement("div")
        container.classList.add("task-container")
        let title = document.createElement("p")
        title.classList.add("task-container__title")
        let description = document.createElement("p")
        description.classList.add("task-container__description")
        let deleteBoton = document.createElement("button")
        deleteBoton.textContent = "Eliminar";
        deleteBoton.id = index
        deleteBoton.classList.add("task-container__delete")
        deleteBoton.onclick= function() {
            deleteTask(index); // Llamamos a la función deleteTask y pasamos el índice como argumento
          };
        
        let editBoton = document.createElement("button")
        editBoton.textContent = "Editar";
        editBoton.onclick = "deletetask(index)"
        editBoton.classList.add("task-container__edit")
        editBoton.onclick= function() {
            editTask(index); // Llamamos a la función deleteTask y pasamos el índice como argumento
          };

        title.textContent = element.title
        description.textContent = element.description
        container.append(title,description,deleteBoton,editBoton)
        allTask.push(container)
        

    });
    blockTaks.append(...allTask)
    
    let show = document.querySelector(".btn-show")
    show.style.display = "none"
    let hide = document.querySelector(".btn-hide")
    hide.style.display = "block"
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("task"))
    tasks.splice(index,1)
    localStorage.setItem("task",JSON.stringify(tasks))
    getTask()
    
}


function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("task"))
    let description = document.querySelector(".form__description")
    let title = document.querySelector(".form__title")
    title.value = tasks[index].title
    description.value = tasks[index].description
    tasks.splice(index,1)
    localStorage.setItem("task",JSON.stringify(tasks))
    ///no ejecute hasta que se haga click en el boton de guardar 

    
}
function deleteAll(){
    let show = document.querySelector(".btn-show")
    show.style.display = "block"
    let hide = document.querySelector(".btn-hide")
    hide.style.display = "none"
    let container = document.querySelector(".tasks")
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

}