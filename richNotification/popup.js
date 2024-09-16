document.addEventListener('DOMContentLoaded', () => {
    const basic = document.getElementById('basic');
    const progressNotif = document.getElementById('progress');
    const list = document.getElementById('list');

    basic.addEventListener('click', () => {
        let options = {
            type: 'basic',
            title: 'Basic Notification',
            message: 'This is a Basic Notification',
            iconUrl: 'icon.png'
        };
        chrome.notifications.create(options);
    });

    progressNotif.addEventListener('click', () => {
        let options = {
            type: 'progress',
            title: 'Progress Notification',
            message: 'This is a Progress Notification',
            iconUrl: 'icon.png',
            progress: 99
        };
        chrome.notifications.create(options);
    });

    list.addEventListener('click', () => {
        let options = {
            type: 'list',
            title: 'List Notification',
            message: 'This is a List Notification',
            iconUrl: 'icon.png',
            items: [
                { title: 'list element 1', message: 'list message 1' },
                { title: 'list element 2', message: 'list message 2' }
            ]
        };
        chrome.notifications.create(options);
    });
});