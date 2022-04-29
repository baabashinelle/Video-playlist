// CONSTANTS
const initload = document.getElementById("init");
const subvideos = document.getElementById("subs");
// const currently_playing = 
const PLAYLIST = await fetchVideos();


videoPlayer(PLAYLIST[0]);
document.getElementById("currently_playing").addEventListener("ended", () => {
  loop(0, PLAYLIST);
});





// Function to automatically loop through Videos
function loop(i, videos, listener = undefined)
{
  alert(i)
  videoPlayer(videos[i])
  if(i >= videos.length)
  {
    i = 0
  }else{
    i++;
  }
  listener = document
    .getElementById("currently_playing")
    .addEventListener("ended", () => {
      loop(i, videos, listener);
    });
}

function videoPlayer(video)
{
  let player = `<video autoplay id = "currently_playing" controls poster="${
    video.thumbnails[video.thumbnails.length - 1].url
  }" class="rounded-md w-full" >
            <source
              src="${video.assets[video.assets.length - 1].url}"
              type="video/mp4"
            />
          </video>
          <div>
            <h1 class="xl:text-4xl md:text-3xl text-xl font-bold pt-5 pb-4">${
              video.metadata.title
            }</h1>
            <p class="text-left">${video.metadata.description}</p>
      </div>`;

  initload.innerHTML = player;
}



// DISPLAY SUB VIDEOS
let output = ""
for (let i = 1; i <= 4; i++) {
    let video = PLAYLIST[i]
    output += `<div class="lg:flex ${i < 4 ? "border-b-2": ''} border-[#ccc] ${i < 4? "pb-3":""} ${i > 0 ? "pt-3":""}">
              <video poster = "${
                video.thumbnails[2].url
              }" class="rounded-md lg:w-[180px] md:w-[500px]">
                <source
                  src="${video.assets[(video.assets.length-1)].url}"
                  type="video/mp4"
                />
              </video>
              <p class="lg:pl-5 pt-1">${video.metadata.title}</p>
            </div>`;
}
subvideos.innerHTML = output;
// Append the btn
let readmorebtn = `<div class="pt-4">
            <button
              class="bg-red-700 lg:w-1/2 w-full h-10 rounded-md lg:h-10 text-white font-semibold"
            >
              Load More
            </button>
          </div>`;
subvideos.innerHTML += readmorebtn;

async function fetchVideos() {
  const res = await axios.get(
    "https://cors-anywhere.herokuapp.com/https://ign-apis.herokuapp.com/videos?startIndex=30\u0026count=5"
  );
  return await res.data.data;
}


