const date = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById("date").textContent = date.toLocaleDateString('id', options);

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
    const todoTab = document.getElementById('todo-tab');
    const doneTab = document.getElementById('done-button');
    const todoContent = document.getElementById('todo');
    const doneContent = document.getElementById('done');

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
    });

    doneTab.addEventListener('click', () => {
        switchTab(doneTab, doneContent, todoTab, todoContent);
    });
});

document.getElementById('todo-list').addEventListener('submit', function(e) {
        e.preventDefault();
    const todoList = document.getElementById('list-Todo1');
    const prioity = document.querySelector('input[name="priority"]:checked').value;
    const todate = document.getElementById('date2').value;
    const totime = document.getElementById('time2').value;
    const task = document.getElementById('task').value; 
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const dateObj = new Date(todate);
    const formattedDate = dateObj.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' })
    console.log(prioity)

    const priorityColor = {
        low: 'border-r-green-500',
        medium: 'border-r-yellow-500',
        high: 'border-r-red-500',
    }
    const newTask = document.createElement('div');

    newTask.className = `flex flex-row border-1 items-center rounded-sm p-1.5 h-12 border-r-6 ${priorityColor[prioity]}`
    console.log(newTask)

    newTask.innerHTML = `
            <div class="mr-2"><input class= "check-box h-5 w-5 text-blue-600 rounded focus:ring-blue-500" type="checkbox"></div>
            <div class="w-1/7 ">${totime}</div>
            <div class="w-6/7 text-sm" >
                <div class="w-full">${task}</div>
                <div class="w-full">${formattedDate}</div>
            </div>`

    todoList.appendChild(newTask);

    const checkbox = newTask.querySelector('.check-box');
        checkbox.addEventListener('change', function() {
          if (this.checked) {
            newTask.classList.add('line-through', 'bg-gray-800', 'text-gray-400');
            this.disabled = true;
          }
        });
    });

    // function deleteTask() {
    //     const checkbox = document.querySelector('input[type="checkbox"]:checked');
    //     if (checkbox) {
    //         checkbox.closest('div').remove();
    //     }
     
    // }

// const nama = 'Jainal'
// const kerjaan = 'Mahasiswa'
// const umur = 20
// const newx = {
//     nama: "Ola", 
//     kerjaan: "PNS",
//     umur : 25
// }
// console.log(newx)
// let identitas = {nama, kerjaan, umur}
// console.log(identitas)
// // let newy = [...identitas, newx]
// let yy = [identitas, newx]
// console.log(yy)

// console.log(newy)