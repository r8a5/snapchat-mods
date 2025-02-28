(function() {
    const defaultNotificationDuration = 3000;

    function createNotification(message) {
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#333';
        notification.style.color = '#fff';
        notification.style.padding = '10px 15px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1001';
        notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        notification.style.display = 'flex';
        notification.style.justifyContent = 'space-between';
        notification.style.alignItems = 'center';

        const messageSpan = document.createElement('span');
        messageSpan.innerText = message;

        const closeButton = document.createElement('span');
        closeButton.innerText = '✖';
        closeButton.style.cursor = 'pointer';
        closeButton.style.marginLeft = '10px';
        closeButton.style.color = 'lightgray';

        closeButton.onclick = () => {
            notification.remove();
        };

        notification.appendChild(messageSpan);
        notification.appendChild(closeButton);
        document.body.appendChild(notification);

        return notification;
    }

    function createToggleButton() {
        const button = document.createElement('button');
        button.textContent = 'Toggle Blur';
        button.style.position = 'fixed';
        button.style.top = '20px';
        button.style.right = '20px';
        button.style.zIndex = '1000';
        button.style.padding = '10px 15px';
        button.style.backgroundColor = '#007BFF';
        button.style.color = '#FFFFFF';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '16px';

        let blurEnabled = true;

        button.onclick = () => {
            if (blurEnabled) {
                disableBlur();
                createNotification('Blur effect is now disabled.');
                button.textContent = 'Enable Blur';
            } else {
                enableBlur();
                createNotification('Blur effect is now enabled.');
                button.textContent = 'Disable Blur';
            }
            blurEnabled = !blurEnabled;
        };

        document.body.appendChild(button);
    }

    function enableBlur() {
        const style = document.createElement('style');
        style.id = 'blurStyle';
        style.textContent = `
            img {
                transition: filter 0.3s ease; /* Smooth transition for the blur */
                filter: blur(10px); /* Set the initial blur */
            }
            img:hover {
                filter: blur(0); /* Remove blur on hover */
            }
        `;
        document.head.appendChild(style);
    }

    function disableBlur() {
        const style = document.getElementById('blurStyle');
        if (style) {
            style.remove();
        }
    }

    createToggleButton();
    enableBlur();
})();
