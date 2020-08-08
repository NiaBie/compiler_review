var host = "localhost:6061"
var mouse_down = 0;

function my_load() {
  document.body.addEventListener("mousedown", function() {
    mouse_down = 1;
    console.log(mouse_down);
  });
  document.body.addEventListener("mouseup", function() {
    mouse_down = 0;
    console.log(mouse_down);
  });
  document.body.addEventListener("mouseout", function() {
    mouse_down = 0;
    console.log(mouse_down);
  });
}

function load_video(video_name, hour, minute, second) {
  var main_video = document.getElementById("main_video");
  main_video.src = "/source/" + video_name + ".mp4";
  var currentTime =  hour * 3600 + minute * 60 + second;
  main_video.addEventListener("loadedmetadata", function() {
    main_video.currentTime = currentTime;
    main_video.addEventListener("loadedmetadata", function() {
      // do nothing
    });
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

function change_progress() {
  if (!mouse_down) return;
  var event = window.event;
  var main_video = document.getElementById("main_video");
  
  var mouse_x = event.clientX + document.body.scrollLeft;
  var total_x = parseFloat($("#total_progress").css("width"));
  var start_x = $("#total_progress").offset().left;
  var percent = (mouse_x - start_x) / total_x;
  if (isNaN(main_video.duration) == false) {
    // console.log(mouse_x, total_x, start_x, percent);
    main_video.currentTime = main_video.duration * percent;
    $("#cur_progress").css("width", (total_x * percent) + "px");
  }
}

function change_speed() {
  if (!mouse_down) return;
  var main_video = document.getElementById("main_video");
  var event = window.event;
  
  var mouse_x = event.clientX + document.body.scrollLeft;
  var total_x = parseFloat($("#total_speed").css("width"));
  var start_x = $("#total_speed").offset().left;
  var percent = (mouse_x - start_x) / total_x;
  main_video.playbackRate = 15 * percent + 1;
  console.log(main_video.playbackRate);
  $("#cur_speed").css("width", (total_x * percent) + "px");
}