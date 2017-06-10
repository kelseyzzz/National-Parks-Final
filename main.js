	







					
var GoogleApi = (function(){		
					
					var NpMap;

					
					function initMap() {
				      	var NpMapCenter = new google.maps.LatLng(39.816448, -101.843262);
				      	var NpMapOptions = { 
							  center: NpMapCenter, 
					          zoom: 1,
					          mapTypeId: google.maps.MapTypeId.ROADMAP,
							  maxZoom: 12,
							  minZoom: 4,
							  panControl: false,
							  mapTypeControl: false,
						};

				          NpMap = new google.maps.Map(document.getElementById('Np-map'), NpMapOptions);


  					}


  					function createMarker (data) {
				       var infowindow = new google.maps.InfoWindow ({
				          content:'<img src="' + data.img + '"> <h3>'+ data.title +'</h3>',

				        });

				       var marker = new google.maps.Marker ({
				          position: data.location,
				          map: NpMap
				        });

				       marker.addListener ( "click", function () {
				          infowindow.open ( NpMap, marker );
				        });
   					}



  					var shared = {
  						init: initMap,
  						createMarker: createMarker
  					}
  					return shared

  					


})();



var FlickrApi = (function(){

	function ajaxCall() {

		var url = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=d3f3d8de69b56fb180270e35cdc2c2f8&user_id=150288100%40N04&has_geo=1&extras=geo&format=json&nojsoncallback=?"
			$.ajax({
				url: url,
				method: 'GET',
			})
			.done(populate)
			.fail(function(){
				
			})
	};

	function ajaxCallNp() {
		var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d3f3d8de69b56fb180270e35cdc2c2f8&tags=usnationalparks&format=json&nojsoncallback=?"
			$.ajax({
				url: url,
				method: 'GET',
			})
			.done(populate)
			.fail(function(){
				
			})

	};


	function populate(results) {
		var items = results.photos.photo;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
			var place = item.title.replace('-', ' ');
			var location = new google.maps.LatLng(item.latitude, item.longitude);
			var data = {
				img: photoURL,
				title: place,
				location: location,

			}
			GoogleApi.createMarker(data);
		}
		
		console.log(results);
	}
	var shared = {
		ajaxCall: ajaxCall,
		ajaxCallNp: ajaxCallNp
	}
	return shared

})();



 $('.my-pictures').on('click',function(){
 		FlickrApi.ajaxCall();

 });

 $('.Np-pictures').on('click',function(){
 		FlickrApi.ajaxCallNp();

 });

























