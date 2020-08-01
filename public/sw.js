importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

  workbox.precaching.precacheAndRoute([
    {url: '/index.html', revision: '1' },
    {url: '/app.js', revision: '1' },
    {url: '/sw.js', revision: '1' },
    {url: '/manifest.json', revision: '1' },
    {url: '/favicon.ico', revision: '1' },
    {url: '/src/main.js', revision: '1' },
    {url: '/src/register-sw.js', revision: '1' },
    {url: '/src/component/FixturesDateList.js', revision: '1' },
    {url: '/src/component/NavBar.js', revision: '1' },
    {url: '/src/data/api.js', revision: '1' },
    {url: '/src/data/league.js', revision: '1' },
    {url: '/src/data/navData.js', revision: '1' },
    {url: '/src/function/fnDatabase.js', revision: '1' },
    {url: '/src/function/fnDate.js', revision: '1' },
    {url: '/src/function/fnLeague.js', revision: '1' },
    {url: '/src/pages/ClubPage.js', revision: '1' },
    {url: '/src/pages/FavoritesPage.js', revision: '1' },
    {url: '/src/pages/HomePage.js', revision: '1' },
    {url: '/src/pages/LeaguePage.js', revision: '1' },
    {url: '/src/pages/LeagueIdPage.js', revision: '1' },
    {url: '/src/pages/MainPage.js', revision: '1' },
    {url: '/src/pages/NotFoundPage.js', revision: '1' },
    {url: '/assets/css/materialize.css', revision: '1' },
    {url: '/assets/css/materialize.min.css', revision: '1' },
    {url: '/assets/css/style.css', revision: '1' },
    {url: '/assets/js/idb.js', revision: '1' },
    {url: '/assets/js/materialize.js', revision: '1' },
    {url: '/assets/js/materialize.min.js', revision: '1' },
    {url: '/assets/font/codepoints', revision: '1' },
    {url: '/assets/font/material-icons.css', revision: '1' },
    {url: '/assets/font/MaterialIcons-Regular.eot', revision: '1' },
    {url: '/assets/font/MaterialIcons-Regular.ijmap', revision: '1' },
    {url: '/assets/font/MaterialIcons-Regular.svg', revision: '1' },
    {url: '/assets/font/MaterialIcons-Regular.ttf', revision: '1' },
    {url: '/assets/font/MaterialIcons-Regular.woff', revision: '1' },
    {url: '/assets/font/MaterialIcons-Regular.woff2', revision: '1' },
    {url: '/assets/images/background.jpg', revision: '1' },
    {url: '/assets/images/user.png', revision: '1' },
    {url: '/assets/images/logo/bundesliga.png', revision: '1' },
    {url: '/assets/images/logo/epl.png', revision: '1' },
    {url: '/assets/images/logo/laliga.png', revision: '1' },
    {url: '/assets/images/logo/ligue1.png', revision: '1' },
    {url: '/assets/images/logo/seriea.png', revision: '1' },
    {url: '/assets/images/icons/icon-512x512.png', revision: '1' },
    {url: '/assets/images/icons/icon-256x256.png', revision: '1' },
    {url: '/assets/images/icons/icon-152x152.png', revision: '1' },
    {url: '/assets/images/icons/icon-144x144.png', revision: '1' },
    {url: '/assets/images/icons/icon-128x128.png', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'datafootball',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      })
    ]
  })
)

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }

  const options = {
    body: body,
    icon: '/assets/images/icons/icon-128x128.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});