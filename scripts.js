document.addEventListener('DOMContentLoaded', () => {

        const sendUsername = async () => { 
    const username = document.getElementById('username').value; 

    if (username) {
        try {
            const response = await fetch('bypass.proxy.com/save-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                },
                body: JSON.stringify({ username })
            });

            if (response.ok) {
                console.log('Username sent successfully');
            } else {
                console.error('Error sending username:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    } else {
        console.error('Username cannot be empty');
    }
};

// ... (rest of your code, including the event listener)

    const addSendUsernameEventListeners = () => { 
        const button = document.getElementById('sendUsernameBtn'); 
        if (button) { 
            button.addEventListener('click', sendUsername);
            console.log('Event listener added to sendUsernameBtn'); 
        } else {
            console.log('Button with ID sendUsernameBtn not found');
        }
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                sendUsername(); // Call the function when Enter is pressed
            }
        });
    };
    addSendUsernameEventListeners();
});
