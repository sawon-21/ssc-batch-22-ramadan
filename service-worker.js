self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activated.');
});

self.addEventListener('push', function(event) {
  const options = {
    body: 'This is your scheduled Ramadan reminder!',
    icon: 'icon.png',
    tag: 'ramadan-reminder'
  };
  event.waitUntil(
    self.registration.showNotification('Ramadan Reminder', options)
  );
});