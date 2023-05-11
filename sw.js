self.addEventListener('message', (event) => {
  ipu = event.data.ipu
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

const handle = async(req)=>{
  return fetch(req)
}

