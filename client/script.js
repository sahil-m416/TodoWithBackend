
var input = document.getElementById("input")
var btn = document.getElementById('submit')
var parent = document.getElementById('allTodos')
var leftDiv = document.getElementById('leftDiv')

btn.setAttribute("class", "btn btn-success")
//adding Event Listener on Submit Button


btn.addEventListener("click", function(){
  if(input.value)
  {
    var todo = {
      todo : input.value,
      id : Date.now(),
      isChecked : false
    }
    var req = new XMLHttpRequest();
    req.open('post', '/save');
    req.setRequestHeader("Content-type", 'application/json')
    req.send(JSON.stringify({
     todo
    }))  
    req.addEventListener("load", function(){
        var container = document.createElement("div");
        var taskHead = document.createElement('p')
        var buttons = document.createElement("div")
        var readBtn = document.createElement('input')
        var deleteBtn = document.createElement('i')

        buttons.setAttribute("id", 'buttons')
        container.setAttribute('class', 'todoContainer')
        taskHead.setAttribute('id', 'taskHead')
        readBtn.setAttribute('id', 'readButton')
        readBtn.setAttribute('type', 'checkbox')
        deleteBtn.setAttribute('id', 'deleteButton')
        deleteBtn.setAttribute('class', 'bi bi-trash-fill')
        deleteBtn.addEventListener('click', handleDelete(todo))
        buttons.appendChild(readBtn)
        buttons.appendChild(deleteBtn)
        
        readBtn.addEventListener('click', toggleCheck(todo))
        container.appendChild(taskHead)
        container.appendChild(buttons)
        
        taskHead.innerHTML = input.value
        parent.appendChild(container)
        input.value = ''
      })
      
    }
  })
  init();
  function init() {
    var req = new XMLHttpRequest();
    req.open("get", '/todo')
    req.send()
    req.addEventListener('load', function() {
      var fromBack = JSON.parse(req.responseText)
    fromBack.forEach(function(task){
        var container = document.createElement("div");
        var taskHead = document.createElement('p')
        var buttons = document.createElement("div")
        var readBtn = document.createElement('input')
        var deleteBtn = document.createElement('i')
        
        buttons.setAttribute("id", 'buttons')
        container.setAttribute('class', 'todoContainer')
        taskHead.setAttribute('id', 'taskHead')
        readBtn.setAttribute('id', 'readButton')
        readBtn.setAttribute('type', 'checkbox')
        deleteBtn.setAttribute('id', 'deleteButton')
        deleteBtn.setAttribute('class', 'bi bi-trash-fill')
        deleteBtn.addEventListener('click', handleDelete(task.todo))
        readBtn.addEventListener('click', toggleCheck(task.todo))
        task.todo.isChecked ? readBtn.checked = true : readBtn.checked = false

        task.todo.isChecked ? taskHead.style.textDecoration = 'line-through' : taskHead.style.textDecoration = 'none'
        buttons.appendChild(readBtn)
        buttons.appendChild(deleteBtn)

        container.appendChild(taskHead)
        container.appendChild(buttons)
        
        taskHead.innerHTML = task.todo.todo
        parent.appendChild(container)
    })
  })
}

function handleDelete(todo){
  return  function() {
  var toDelete = todo.id
  var request = new XMLHttpRequest();
  request.open("post", '/handleDelete')
  request.setRequestHeader("Content-type", 'application/json')
  request.send(JSON.stringify({toDelete : toDelete}));
  request.addEventListener("load", function(){
    clearTodos();
    init();
  }) 
  }
}


function toggleCheck(todo) 
{
  return function() {
    var toToggle = todo.id
    var request = new XMLHttpRequest()
    request.open('post', '/handleToggle')
    request.setRequestHeader("Content-type", 'application/json')
    request.send(JSON.stringify({toToggle : toToggle}))
    request.addEventListener("load", function() {
      clearTodos();
      init();
    })
  }
}


function clearTodos() {
  parent.innerHTML = ""
}