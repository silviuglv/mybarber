$(document).ready(function() {
  var pos
 // Get browser location
  $("#leadCta").on('click', function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    };
  })

  function success(pos) {
    pos = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    };
    displayAddress(pos);
    openModal();
  }

  function error(){
    alert("Geocoder failed");
  }

  // Google geocode coords and display address
  function displayAddress(pos, output) {
    var geocoder = new google.maps.Geocoder();
    var latlng   = new google.maps.LatLng(pos);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(results);
        if (results[1]) {

         //formatted address
         var output = $("#locationLabel");

          $("#lat").val(results[3].geometry.location.lat);
          $("#lng").val(results[3].geometry.location.lng);
          output.html(results[2].formatted_address);
        } else {

          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }

  // MODAL

  $("#modalClose").click(function() {
    closeModal();
  });

  $('#modal').click(function (event) {
		if (this == event.target) {
			closeModal();
		}
	});


  // Filters Toggle

  $('#formFilter').click(function(){
    $('.filterContainer').slideToggle(500, function(){
      $("#formFilter .innerBtn").toggleClass("lessFilters");
    });
  });

  // Radius Toggle

  $('#radiusCta').click(function(){
    radiusToggle();
  })

  //Form Submit

  $("#formSubmit").click(function(){
    if ($("[name='radius']").is(":checked")) {
      $("#getResults").submit();
    } else {
      formError();
    }
  });

  //End script
});

function openModal() {
  $('#modal').css('display', 'flex');
}

function closeModal() {
  $('#modal').css('display', 'none');
}

function radiusToggle() {
  var radiusContent = document.getElementById('radiusContent');
  var arrow         = document.getElementById('arrowWrapper');

  if (radiusContent.style.top === "0px") {
    radiusContent.style.top = "-111px";
    arrow.style.transform = "rotate(0deg)";

  } else {
    radiusContent.style.top = "0px";
    arrow.style.transform = "rotate(180deg)";
   }
}

function radiusSwitch(i) {
  var item = i;
  switch (item) {
    case 1:
      $("#radiusBtn").html("0.5 miles");
      radiusToggle();
      break;
    case 2:
      $("#radiusBtn").html("1.0 miles");
      radiusToggle();
      break;
    case 3:
      $("#radiusBtn").html("2.0 miles");;
      radiusToggle();
      break;
    case 4:
      $("#radiusBtn").html("3.0 miles");;
      radiusToggle();
      break;
    default:
      radiusHolder.innerHTML = "Select radius";

  };
}
function formError() {
  if ($('.formContainer').has("p")) {
    return
  } else {
  $('.formContainer').append("<p>errorMsg</p>");
}
 };
