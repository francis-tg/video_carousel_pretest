const CarouselItems = document.querySelectorAll(".carousel .carousel-item");


const firtCarousel=0;
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

for (const key in CarouselItems) {
    if (Object.hasOwnProperty.call(CarouselItems, key)) {
        const carouselitem = CarouselItems[key];
        const url = carouselitem.dataset.url;
        if(String(url).endsWith(".mp4")){
            carouselitem.setAttribute('data-type', "video")
            carouselitem.innerHTML =`<video src='${url}'></video>`
        }else if(String(url).endsWith(".jpg")||String(url).endsWith(".png")){
            carouselitem.setAttribute("data-type", "image")
            carouselitem.innerHTML =`<img src="${url}"/>`
        }

        else{
            carouselitem.setAttribute('data-type','youtube');
        }

         
    }

}

CarouselItems[firtCarousel].classList.add("active")
let currentCarousel=0
let interval = 0;
let volume_value = 0;
function start(){
    CarouselItems[currentCarousel].classList.remove("active")
    if(CarouselItems.length===currentCarousel+1){
        currentCarousel =0
    }else currentCarousel++
    console.log(currentCarousel)
    CarouselItems[currentCarousel].classList.add('active');
    if(CarouselItems[currentCarousel].dataset.type==="video"){
        const video_interval = CarouselItems[currentCarousel].children[0].duration;
        interval = parseInt(video_interval*1000)
        CarouselItems[currentCarousel].currentTime=0;
        CarouselItems[currentCarousel].children[0].play()
        const video = CarouselItems[currentCarousel].children[0];
        
        window.addEventListener("keyup",(e)=>{
            console.log(e.key)
            if (e.key==="ArrowUp") {
                if(CarouselItems[currentCarousel].children[0].volume <1 && volume_value<1){
                  volume_value +=0.1;
                  if(volume_value<=1){
                    video.volume =volume_value;
                    console.log(volume_value)
                    console.log(video.volume)
                  }
                }
            }else if(e.key==="ArrowDown"){
                if(CarouselItems[currentCarousel].children[0].volume >0 && volume_value>0){
                  volume_value -=0.1;
                  // if(volume_value>=0){
                    video.video =Math.floor(volume_value*10)/10;
                  // }
                  console.log(Math.floor(volume_value*10)/10)
                  console.log(video.volume)
                }
            }
            
        })
        video.volume = volume_value;
    }else if(CarouselItems[currentCarousel].dataset.type==="youtube"){
        let player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '720',
          width: '1080',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
      onYouTubeIframeAPIReady()
    }
    else interval = 3000
    setTimeout(start,interval)
}

start()