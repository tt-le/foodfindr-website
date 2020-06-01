
function off() {
    document.getElementById("overlay").style.display = "none";
  }

  $('.sign-up-button').click(function () {
    document.getElementById("overlay").style.display = "block";
  });

  window.onclick =  function(e){   
  if (e.target == overlay)
    off();
  };