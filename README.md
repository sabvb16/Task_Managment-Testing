# Task_Managment-Testing
I have tested this website using Postman and Chrome inspect  that tested frontend and backend    

Add this text on Loadtest.js file :
(
const newman = require('newman');

const concurrentRequests = 5;

for (let i = 0; i < concurrentRequests; i++) {
    newman.run({
        collection: require('./collection.json'),
        reporters: 'cli',
        iterationCount: 20,
    }, (err) => {
        if (err) { console.error(err); }
        else { console.log(`Run ${i + 1} completed`); }
    });
}
)

FOR POSTMAN: USE THESE LINKS (GET<POST<UPDATE<DELETE)
http://localhost:1000/getTasks
http://localhost:1000/addTask
http://localhost:1000/updateTask/1
http://localhost:1000/deleteTask/6

<img width="799" alt="Screenshot 2025-04-18 at 15 49 07" src="https://github.com/user-attachments/assets/30c93eb0-d9b5-4b55-85f6-4f67c40333ea" />
<img width="295" alt="Screenshot 2025-04-18 at 09 28 08" src="https://github.com/user-attachments/assets/df14e007-8296-4797-8216-43bb5c19cd8a" />
<img width="1280" alt="Screenshot 2025-04-18 at 09 27 42" src="https://github.com/user-attachments/assets/4333ef27-a3d2-4401-86a5-1bdbb976106f" />


