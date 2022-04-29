async function fetchVideos() {
  const res = await axios.get(
    "https://cors-anywhere.herokuapp.com/https://ign-apis.herokuapp.com/videos"
  );
  const videos = res.data.data;
  console.log(videos);
}

fetchVideos();
