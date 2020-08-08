var host = "localhost:6061"

function load_video(video_name, time = 0) {
  var main_vide = document.getElementById("main_video");
  main_vide.src = host + "/" + video_name + ".mp4";
}

function switch_video() {
  var video_button = document.getElementById("switch_video");
  var main_video = document.getElementById("main_video");
  if (video_button.innerText == "show") {
    $(main_video).css("display", "block");
    video_button.innerText = "hide";
  } else {
    $(main_video).css("display", "none");
    video_button.innerText = "show";
  }
}