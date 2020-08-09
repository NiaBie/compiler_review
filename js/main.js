var on_progress = 0;
var on_speed = 0;
var progress_bar;
var speed_bar;
var total_progress;
var total_speed;

function my_load() {
  document.ondragstart = function() {
    // 防止onmouseup判断失败
    return false;
  }

  total_progress = document.getElementById("total_progress");
  total_speed = document.getElementById("total_speed");
  progress_bar = total_progress.parentElement;
  speed_bar = total_speed.parentElement;

  progress_bar.addEventListener("mousedown", function() {
    on_progress = 1;
    change_progress();
  });
  speed_bar.addEventListener("mousedown", function() {
    on_speed = 1;
    change_speed();
  });
  document.addEventListener("mousemove", function() {
    change_progress();
    change_speed();
  });
  document.addEventListener("mouseup", function() {
    on_progress = 0;
    on_speed = 0;
  })
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
  if (switch_button.children[0].innerText == "show") {
    $(main_video).css("display", "block");
    switch_button.children[0].innerText = "hide";
  } else {
    $(main_video).css("display", "none");
    switch_button.children[0].innerText = "show";
  }
}

function pause_video() {
  var pause_button = document.getElementById("pause_video");
  var main_video = document.getElementById("main_video");
  if (pause_button.children[0].innerText == "pause") {
    main_video.pause();
    pause_button.children[0].innerText = "play";
  } else {
    main_video.play();
    pause_button.children[0].innerText = "pause";
  }
}

function change_progress() {
  if (!on_progress) return;
  var event = window.event;
  var main_video = document.getElementById("main_video");
  
  var mouse_x = event.clientX + document.body.scrollLeft;
  var total_x = parseFloat($("#total_progress").css("width"));
  var start_x = $("#total_progress").offset().left;
  var percent = (mouse_x - start_x) / total_x;
  percent = Math.min(1, percent);
  percent = Math.max(percent, 0);
  if (isNaN(main_video.duration) == false) {
    // console.log(mouse_x, total_x, start_x, percent);
    main_video.currentTime = main_video.duration * percent;
    $("#cur_progress").css("width", (total_x * percent) + "px");
  }
}

function change_speed() {
  if (!on_speed) return;
  var main_video = document.getElementById("main_video");
  var event = window.event;
  
  var mouse_x = event.clientX + document.body.scrollLeft;
  var total_x = parseFloat($("#total_speed").css("width"));
  var start_x = $("#total_speed").offset().left;
  var percent = (mouse_x - start_x) / total_x;
  percent = Math.min(1, percent);
  percent = Math.max(percent, 0);
  main_video.playbackRate = 15 * percent + 1;
  console.log(main_video.playbackRate);
  $("#cur_speed").css("width", (total_x * percent) + "px");
}