self.addEventListener('message', (event) => {
  ipu = event.data.ipu
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('app-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== 'app-cache';
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});



self.addEventListener('fetch', function(event) {
  if (//event.request.headers.get('Content-Type').indexOf('image') !== -1 || 
  /https?:\/\/.*\.(jpe?g|png|gif|bmp|webp)/i.test(event.request.url) 
  || /https?:\/\/img04\.sogoucdn\.com/i.test(event.request.url)) {
    if(!/https?:\/\/i.\.hdslb\.com/i.test(event.request.url)){
    const imageUrl = event.request.url;
    if(ipu){
      var newUrl = ipu + imageUrl;
    }else{
      var newUrl = imageUrl;
    }
    event.respondWith(
      fetch(newUrl).catch(() => {
        // 加载失败则使用默认图片 https://sdfsdf.dev/400x400.jpg
        return fetch('https://sdfsdf.dev/400x400.jpg')
      })
    )
  }}
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      var request = event.request.clone();
      return fetch(request).then(function(response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        var responseToCache = response.clone();
        caches.open('app-cache').then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(function(error) {
        console.error(error);
      });
    })
  );
});


const handle = async(req)=>{
  return fetch(req)
}

