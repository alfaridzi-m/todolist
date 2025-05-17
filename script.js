const date = new Date();
document.getElementById("date").textContent = date.toLocaleDateString('id');

// Function to update the clock
 function updateClock() {
            const now = new Date();
            
            // Format time with leading zeros
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            // Format date
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const dateString = now.toLocaleDateString(undefined, options);
            
            // Display time and date
            document.getElementById('time').innerHTML = 
                `${hours}:${minutes}:${seconds}`;
        }

        // Update the clock immediately and then every second
        updateClock();
        setInterval(updateClock, 1000);

//function to switch tab
document.addEventListener('DOMContentLoaded', () => {
    const formTodo = document.getElementById('todo-list')
    const todoList = document.getElementById('list-Todo1');
    const doneList = document.getElementById('list-Done1');
    const popUp =document.getElementById('addItem')
    const todoTab = document.getElementById('todo-tab');
    const doneTab = document.getElementById('done-button');
    const todoContent = document.getElementById('todo');
    const doneContent = document.getElementById('done');
    const deleteDone = document.getElementById('delete-done')
    const DeleteTodo = document.getElementById('delete-todo')

    function switchTab(activeTab, activeContent, inactiveTab, inactiveContent) {
        activeTab.classList.remove('bg-[#F2F7F5]');
        activeTab.classList.add(activeTab === todoTab ? 'bg-[#8BD3DD]' : 'bg-[#A585DB]');
        
        inactiveTab.classList.remove('bg-[#8BD3DD]', 'bg-[#A585DB]');
        inactiveTab.classList.add('bg-[#F2F7F5]');
        
        activeContent.classList.remove('hidden');
        inactiveContent.classList.add('hidden');
    }
    todoTab.addEventListener('click', () => {
        switchTab(todoTab, todoContent, doneTab, doneContent);
        DeleteTodo.classList.remove('hidden')
        deleteDone.classList.add('hidden')
    });

    doneTab.addEventListener('click', () => {
        switchTab(doneTab, doneContent, todoTab, todoContent);
        DeleteTodo.classList.add('hidden')
        deleteDone.classList.remove('hidden')

    });
    doneTab.addEventListener('click', () => {
        deleteDone.classList.remove('hidden')
    })

    //delete task  
    DeleteTodo.addEventListener('click', function() {
        if (confirm('Apakah anda yakin ingin menghapus Todo dan Done?')) {
            todoList.innerHTML = '';
            updateCounts();
            saveLocal();
        }
    });
    deleteDone.addEventListener('click', function() {
        if (confirm('Apakah anda yakin ingin menghapus Todo dan Done?')) {
            doneList.innerHTML = '';
            updateCounts();
            saveLocal();
        }
    });

    loadTasks()
    updateCounts()
    document.getElementById('todo-list').addEventListener('submit', function(e) {
            e.preventDefault();
    
        const todate = document.getElementById('date2').value;
        const dateObj = new Date(todate);
        const totime = document.getElementById('time2').value;
        const task = document.getElementById('task').value; 
        const prioity = document.querySelector('input[name="priority"]:checked').value;
        const formattedDate = dateObj.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' })
        console.log(prioity)
        
        // loadTasks()
        setTimeout(() => {
            
        }, 300);
        updateCounts()
        
        //add task
        const priorityColor = {
            low: 'border-r-green-500',
            medium: 'border-r-yellow-500',
            high: 'border-r-red-500',
        }
        const prioritBGyColor = {
            low: 'bg-green-500',
            medium: 'bg-yellow-500',
            high: 'bg-red-500',
        }
        const newTask = document.createElement('div');
        newTask.dataset.id = Date.now();

        newTask.className = `flex flex-row border-1 items-center rounded-sm p-1.5 h-12 animate-shake animate-once animate-ease-in-out border-r-6 mb-1 ${priorityColor[prioity]}`

        newTask.innerHTML = `
                <div class="mr-2"><input class= "check-box h-3 w-3 text-blue-600 rounded focus:ring-blue-500" type="checkbox"></div>
                <div class="w-1/7 ">${totime}</div>
                <div class="w-6/7 text-sm" >
                    <div class="w-full">${task}</div>
                    <div class="w-full">${formattedDate}</div>
                </div>`
                todoList.insertBefore(newTask, todoList.firstChild);
                popUp.classList.remove('hidden', 'opacity-0')
                popUp.classList.add('opacity-100', 'top-3')
                popUp.classList.add(`${prioritBGyColor[prioity]}`)
                setTimeout(() => {
                    popUp.classList.add('opacity-0')
                    setTimeout(() => popUp.classList.add('hidden'),300)
                }, 1000)
                setTimeout(() => {
                    popUp.classList.remove(`${prioritBGyColor[prioity]}`)
                },1000)
                updateCounts()
                saveLocal()
                formTodo.reset()

        const checkbox = newTask.querySelector('.check-box');
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                newTask.classList.add('line-through', 'bg-gray-800', 'text-gray-400');
                setTimeout(() => {
                    doneList.appendChild(newTask);
                    this.disabled =true
                    updateCounts();
                    saveLocal()
                    },300)
                }
            });
    });

        function updateCounts() {
            document.getElementById('countTodo').textContent = todoList.children.length;
            document.getElementById('countDone').textContent = doneList.children.length;
        }
        function saveLocal() {
            const task  = []
            const doneTask = []
        
            // Get active tasks
            document.querySelectorAll('#list-Todo1 > div').forEach(item => {
                task.push({
                id: item.dataset.id,
                html: item.innerHTML,
                className: item.className
                });
            });
            
            // Get completed tasks
            document.querySelectorAll('#list-Done1 > div').forEach(item => {
                doneTask.push({
                id: item.dataset.id,
                html: item.innerHTML,
                className: item.className
                });
            });
            
            localStorage.setItem('task', JSON.stringify(task));
            localStorage.setItem('doneTask', JSON.stringify(doneTask));
        }
        function loadTasks() {
            const task = JSON.parse(localStorage.getItem('task')) || [];
            const doneTask = JSON.parse(localStorage.getItem('doneTask')) || [];
            
            // Load active tasks
            task.forEach(task => {
              const taskItem = document.createElement('div');
              taskItem.className = task.className;
              taskItem.dataset.id = task.id;
              taskItem.innerHTML = task.html;
              todoList.appendChild(taskItem);

              const checkbox = taskItem.querySelector('.check-box');
              if (checkbox) {
                checkbox.addEventListener('change', function() {
                  if (this.checked) {
                    taskItem.classList.add('line-through', 'bg-gray-800', 'text-gray-400');
                    setTimeout(() => {
                      doneList.appendChild(taskItem);
                      this.disabled = true;
                      saveLocal();
                      updateCounts();
                    }, 300);
                }
                });
              }
            });
            
            // Load completed tasks
            doneTask.forEach(task => {
              const taskItem = document.createElement('div');
              taskItem.className = task.className + ' line-through text-gray-400';
              taskItem.dataset.id = task.id;
              taskItem.innerHTML = task.html;
              
              // Disable checkbox for completed tasks
              const checkbox = taskItem.querySelector('.task-checkbox');
              if (checkbox) {
                checkbox.checked = true;
                checkbox.disabled = true;
              }
              
              doneList.appendChild(taskItem);
            });
          }
          function exportTasks() {
            const tasks = {
                todo: JSON.parse(localStorage.getItem('task')) || [],
                done: JSON.parse(localStorage.getItem('doneTask')) || []
            };
            
            const blob = new Blob([JSON.stringify(tasks)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'my-tasks.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        // Tambahkan fungsi untuk impor dari file
        function importTasks(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const tasks = JSON.parse(e.target.result);
                localStorage.setItem('task', JSON.stringify(tasks.todo));
                localStorage.setItem('doneTask', JSON.stringify(tasks.done));
                loadTasks();
                updateCounts();
            };
            reader.readAsText(file);
        }
        
        // Tambahkan event listener untuk tombol save
        document.getElementById('save-tasks').addEventListener('click', exportTasks);

        document.getElementById('import-button').addEventListener('click', () => {
            document.getElementById('import-tasks').click();
        });
        
        document.getElementById('import-tasks').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                importTasks(e.target.files[0]);
            }
        });
});
