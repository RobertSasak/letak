## Letak ##

Very tiny (<1kb not gzip) static JS map library.

### Install
	
	```bower install --save letak```
	
	```npm install --save letak```

### Examples

#### Basic 
http://htmlpreview.github.io/?https://github.com/RobertSasak/letak/blob/master/examples/bgOnly.html

#### With Overlay
http://htmlpreview.github.io/?https://github.com/RobertSasak/letak/blob/master/examples/simple.html
 
### Usage ###

   	Letak('idOftheDiv', {
		lat: 60.390401,
		lng: 5.328541,
		width: 8, // in tiles
		height: 4, // in tiles
		zoom: 8,
		pin: true,
		offset: [-2, 0], // in tiles
		layers:[{
			urlTemplate: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
			opacity: 1
		},{
			urlTemplate: 'http://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png',
				opacity:1
		}]
	});

### Build ###

	gulp build
