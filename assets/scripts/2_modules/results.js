var mapView = document.getElementById("mapView");
var map;
var service;
var infowindow;
// var latlng;
// var pos;
var lats, lngs;


  // Parse URL

function getParams(param) {
  var fullUrl = window.location.search.substring(1);
  var ParamsArray = fullUrl.split('&');
  for (var i = 0; i < ParamsArray.length; i++) {
    var CurrentParameter = ParamsArray[i].split('=');
    if (CurrentParameter[0] == param) {
      return CurrentParameter[1];
    }
  }
}


// Initiate Google MAP & locate places
window.onload = function getPlaces() {
  var lat      = getParams('lat');
  var lng      = getParams('lng');
  var radius   = getParams('radius');
  var sortBy   = getParams('sortBy');
  var filterBy = getParams('filterBy');

  var center = new google.maps.LatLng(lat, lng);

  map = new google.maps.Map(mapView, {
      center: center,
      zoom: 13,
      styles: [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
  })


  infowindow = new google.maps.InfoWindow();

  // Google geocode coords and display address

  var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: center,
      radius: radius,
      type: ['hair_care'],
      keyword: 'barbershop',
    }, callback);
  }


function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place);
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var status = place.opening_hours;
  console.log(status);
  for (item in status) {
    if ( status["open_now"] = true) {
      var statustest = "open now";
      $('#iwStatus').css("color", "green");
    } else {
      var statustest = "closed";
      $('#iwStatus').addClass("close");
    }
  }

  var contentString =
          '<div class="iw-container">' +
            '<div class="iw-title">' +
              '<span id="name"><h6>'+ place.name +'</h6></span>' +
              '<span class="icon ion-close-round" id="iwClose">'+
            '</div>'+
            '<div class="iw-details">' +
              '<span class="iw-rating" id="iwRating"><p>rating<br>'+place.rating+'</p></span>' +
              '<span class="iw-status"><p id="iwStatus">'+ statustest + '</p></span>' +
              '<div class="button iw-cta" id="getDetails"><span class="innerBtn"></span></div>' +
            '</div>'+
          '</div>';

          var icon = {
                url: "/assets/media/shop_marker.png",
                scaledSize: new google.maps.Size(30, 42)
            }

  var marker = new google.maps.Marker({
    map: map,
    position: placeLoc,
    icon: icon
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(contentString);
    infowindow.open(map, this);
  });

  google.maps.event.addListener(infowindow, 'domready', function() {

   // Reference to the DIV which receives the contents of the infowindow using jQuery
    var iwOuter = $('.gm-style-iw');

   /* The DIV we want to change is above the .gm-style-iw DIV.
    * So, we use jQuery and create a iwBackground variable,
    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
    */
    iwOuter.parent().css("pointer-events", "none");
    var iwBackground = iwOuter.prev();
   // Remove the background shadow DIV
    iwBackground.children(':nth-child(2)').css({
    'display': 'none',});

   // Remove the white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

   // Taking advantage of the already established reference to
// div .gm-style-iw with iwOuter variable.
// You must set a new variable iwCloseBtn.
// Using the .next() method of JQuery you reference the following div to .gm-style-iw.
// Is this div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

// Apply the desired effect to the close button
    iwCloseBtn.css({
      display: "none",
    });

    $('#iwClose').click(function(){
      infowindow.close()
    })
  });

}
  function displayAddress(pos) {
    var geocoder = new google.maps.Geocoder();
    var latlng   = new google.maps.LatLng(pos);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(results);
        if (results[1]) {

         //formatted address

          return results[2].formatted_address;

        } else {

          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }
