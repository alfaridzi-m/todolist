const date = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById("date").textContent = date.toLocaleDateString('id', options);

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