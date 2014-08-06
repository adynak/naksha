	var map;
	var markers = new Array();


	function AutoCenter()
	{
		//  Create a new viewpoint bound
		var bounds = new google.maps.LatLngBounds();
		var markerLength = markers.length ;
		//  Go through each...
		for (var i = 0 ; i < markerLength ; i ++)
		{
			bounds.extend(markers[i].position);
		}
		//  Fit these bounds to the map
		map.fitBounds(bounds);			
	}

	function initialize()
	{
		var mapOptions = 
		{
			  zoom: 11,
			  center: new google.maps.LatLng(2.8,-187.3),
			  mapTypeId: google.maps.MapTypeId.ROADMAP,
			  mapTypeControl: false,
			  streetViewControl: false,
			  panControl: false,
			  zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_BOTTOM
			  }
		};
		map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	 }

// Loop through the results array and place a marker for each
// set of coordinates.
	window.eqfeed_callback = function(results) {
		console.log(results);
		for (var i = 0; i < results.features.length; i++)
		{
			var name       = results.features[i].properties.name ;
			var address    = results.features[i].properties.address ;
			var city       = results.features[i].properties.city ;
			var state      = results.features[i].properties.state ;
			var postalCode = results.features[i].properties.postalCode;
			var averyLabel = name + "\r\n" + address + "\r\n" + city + ", " + state + ' ' + postalCode ;
			var year       = results.features[i].properties.year ;
			var make       = results.features[i].properties.make ; 
			var model      = results.features[i].properties.model ;   
			var vehicle    = year + ' ' + make + ' ' + model ;       
			var hoverHelp = averyLabel + "\r\n\r\n" + vehicle ;                              
			var icon       = 'images/' + results.features[i].properties.icon ;
			var latitude   = results.features[i].properties.latitude ;
			var longitude  = results.features[i].properties.longitude ;
			var latLng  = new google.maps.LatLng(latitude,longitude);
			console.log(name) ;
		  
			var marker  = new google.maps.Marker({
							position: latLng,
							map: map,
							title: hoverHelp,
							icon : icon
						  });
			markers.push(marker);

		  
		}
		AutoCenter() ;
	}