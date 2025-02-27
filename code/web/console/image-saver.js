(function() {
    const defaultNotificationDuration = 3000;

    function createNotification(message) {
        // Remove any existing notification
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

    function isImageElement(element) {
        return element.tagName === 'IMG' && element.src && element.complete && element.naturalWidth > 0 && element.naturalHeight > 0;
    }

    function enableImageSaveOnHover() {
        let hoverTimeout;

        // To avoid adding multiple event listeners
        const mouseOverHandler = (event) => {
            const target = event.target;

            if (isImageElement(target)) {
                const notification = createNotification('Hover over for 3 seconds to save this image. Time left: 3 seconds');
                let secondsLeft = 3;

                const mouseEnterHandler = () => {
                    target.style.cursor = 'pointer';
                    hoverTimeout = setInterval(() => {
                        secondsLeft--;
                        notification.querySelector('span').innerText = `Hover over for 3 seconds to save this image. Time left: ${secondsLeft} seconds`;
                        
                        if (secondsLeft <= 0) {
                            clearInterval(hoverTimeout);
                            notification.remove(); // Remove notification
                            autoDownloadImage(target); // Automatically download the image
                            target.removeEventListener('mouseenter', mouseEnterHandler);
                        }
                    }, 1000); // Update every second
                };

                const mouseLeaveHandler = () => {
                    clearInterval(hoverTimeout);
                    target.style.cursor = 'default';
                    notification.remove(); // Remove notification
                };

                target.addEventListener('mouseenter', mouseEnterHandler);
                target.addEventListener('mouseleave', mouseLeaveHandler);
                target.removeEventListener('mouseover', mouseOverHandler);
            }
        };

        document.addEventListener('mouseover', mouseOverHandler);
    }

    function autoDownloadImage(image) {
        const link = document.createElement('a');
        link.href = image.src;
        link.download = image.src.split('/').pop() || 'image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        createNotification('Image downloaded successfully!');
    }

    function createImageSaverButton() {
        const button = document.createElement('button');
        button.innerText = 'Activate Image Saver';
        button.style.position = 'fixed';
        button.style.top = '20px';
        button.style.right = '20px';
        button.style.padding = '10px 15px';
        button.style.backgroundColor = '#28a745';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '1000';
        button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';

        button.onclick = () => {
            createNotification('Image saver is now active. Hover over an image to save it.');
            enableImageSaveOnHover();
            button.disabled = true; // Disable the button after activation
            button.style.backgroundColor = 'gray';
            button.innerText = 'Image Saver Active';
        };

        document.body.appendChild(button);
    }

    createImageSaverButton();
})();
