/* Fonctionnement hors connexion : copie locale d'abord (instantané même sans réseau),
   puis mise à jour discrète en arrière-plan quand il y a du réseau.
   Après toute modification de l'application, changer VERSION. */
const PREFIXE = 'echeancier-pro-';
const VERSION = `${PREFIXE}6`;
const FICHIERS = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

/* Le site peut être partagé avec d'autres apps EPS : on n'efface que nos anciennes copies. */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((cles) => Promise.all(cles.filter((c) => c.startsWith(PREFIXE) && c !== VERSION).map((c) => caches.delete(c))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  const estPage = e.request.mode === 'navigate';
  e.respondWith(
    caches.open(VERSION).then(async (c) => {
      const copie = await c.match(estPage ? 'index.html' : e.request, { ignoreSearch: true });
      const reseau = fetch(e.request)
        .then((r) => {
          if (r.ok) c.put(estPage ? 'index.html' : e.request, r.clone());
          return r;
        })
        .catch(() => copie);
      if (copie) {
        e.waitUntil(reseau.catch(() => {}));
        return copie;
      }
      return reseau;
    }),
  );
});
