importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebaseConfig = {
    apiKey: "AIzaSyAvxsBAebusaC6Q_IJMLBBWOJeE8WWF2rQ",
    authDomain: "control-center-29b62.firebaseapp.com",
    projectId: "control-center-29b62",
    storageBucket: "control-center-29b62.firebasestorage.app",
    messagingSenderId: "843526225385",
    appId: "1:843526225385:web:3594067cadf811f1725f78"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    const clickAction = event.notification?.data?.click_action || event.notification?.click_action;
    const urlToOpen = clickAction || 'https://zivan-controlcenter-api.ahmedshaamil.org/swagger';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            for (const client of windowClients) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});