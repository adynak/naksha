	var geocoder;
	var map;
    var markers = new Array();

	var xmlhttp = new XMLHttpRequest();
	var url = "http://127.0.0.1/NAKSHA/staff.json";
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			var myArr = JSON.parse(xmlhttp.responseText);
			myFunction(myArr);
		}
	}

	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	google.maps.event.addDomListener(window, 'load', initialize);

	function myFunction(arr)
	{
		var i;
		var doCenter = false ;
		var numberOfMarkers = arr.length ;
		var lastMarker     = numberOfMarkers - 1 ;
		for(i = 0 ; i < numberOfMarkers ; i++)
		{
			// send a trigger to center when the last marker is sent
			if (i == (lastMarker))
			{
				doCenter = true ;
			}
			geocodeAddress(arr[i] , doCenter );
		}
	}

	function initialize()
	{
		geocoder = new google.maps.Geocoder();
		// center if USA = 39.50  -98.35
		var latlng = new google.maps.LatLng(39.50, -98.35);
		var mapOptions = {
			zoom: 11,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
      		mapTypeControl: false,
      		streetViewControl: false,
      		panControl: false,
      		zoomControlOptions: {
         		position: google.maps.ControlPosition.LEFT_BOTTOM
         	}
	  	}
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	}

	function geocodeAddress(custInfo, doCenter)
	{
		var name    = custInfo.name ;
		var address = custInfo.address ;
		var city    = custInfo.city ;
		var state   = custInfo.state ;
		var zip     = custInfo.postalCode ;
		var icon    = 'images/' + custInfo.icon ;
		var averyLabel = address + ' ' + city + ' ' + state + ' ' + zip ;
		geocoder.geocode( { 'address': averyLabel}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK)
			{
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					icon: icon,
					title : name + "\r\n" + address
			  	});

			  	markers.push(marker);
			  	if (doCenter)
			  	{
			  		AutoCenter() ;	
			  	}
			}
			else
			{
			  alert('Geocode was not successful for the following reason: ' + status);
			}
	  	});
	}

	
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
