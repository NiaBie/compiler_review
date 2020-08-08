var host = "localhost:6061"

function load_video(video_name, hour, minute, second) {
  var main_video = document.getElementById("main_video");
  main_video.src = "/source/" + video_name + ".mp4";
  var currentTime =  hour * 3600 + minute * 60 + second;
  main_video.addEventListener("loadedmetadata", function() {
    main_video.currentTime = currentTime;
    console.log(currentTime);
    console.log(main_video.currentTime);
    main_video.addEventListener("loadedmetadata", function() {
      // do nothing
    })
  });
  main_video.load();
  main_video.play();
}

function switch_video() {
  var switch_button = document.getElementById("switch_video");
  var main_video = document.getElementById("main_video");
  if (switch_button.innerText == "show") {
    $(main_video).css("display", "block");
    switch_button.innerText = "hide";
  } else {
    $(main_video).css("display", "none");
    switch_button.innerText = "show";
  }
}

function pause_video() {
  var pause_button = document.getElementById("pause_video");
  var main_video = document.getElementById("main_video");
  if (pause_button.innerText == "pause") {
    main_video.pause();
    pause_button.innerText = "play";
  } else {
    main_video.play();
    pause_button.innerText = "pause";
  }
}