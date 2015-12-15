function Letak(container, options) {
	(function (document, Math) {

		function lat2tile(lat, zoom) {
			var t = lat * Math.PI / 180;
			return (1 - Math.log(Math.tan(t) + 1 / Math.cos(t)) / Math.PI) / 2 * Math.pow(2, zoom);
		}

		function lng2tile(lon, zoom) {
			return (lon + 180) / 360 * Math.pow(2, zoom);
		}

		function get(f, latOrLng, zoom, sideLength) {
			if (sideLength % 2 === 1) {
				return Math.floor(f(latOrLng, zoom)) - (sideLength - 1) / 2;
			}
			var tileIndex = Math.floor(f(latOrLng, zoom + 1));
			return ((tileIndex - sideLength) >> 1) + tileIndex % 2;
		}

		var lat = options.lat || 0,
			lng = options.lng || 0,
			zoom = options.zoom || 5,
			width = options.width || 3,
			height = options.height || 3,
			layers = options.layers || [],
			offset = options.offset || [0, 0],
			pin = options.pin,
			x = get(lng2tile, lng, zoom, width),
			y = get(lat2tile, lat, zoom, height),
			i, j, l, img, layer;

		container = typeof container === 'string' ? document.getElementById(container) : container;
		container.style.maxWidth = 256 * width + 'px';
		container.style.fontSize = 0;
		container.style.position = 'relative';
		for (l in layers) {
			if (layers.hasOwnProperty(l)) {
				var layer = layers[l];
				var layerElement = document.createElement('div');
				layerElement.style.opacity = layer.opacity || 1;
				if (l > 0) {
					layerElement.style.position = 'absolute';
					layerElement.style.top = 0;
					layerElement.style.left = 0;
				}
				for (j = 0; j < height; j++) {
					for (i = 0; i < width; i++) {
						img = new Image();
						img.style.width = 100 / width + '%';
						//img.style.height = 100 / width + '%';
						img.src = layer.urlTemplate
							.replace('{x}', x + i + offset[0])
							.replace('{y}', y + j + offset[1])
							.replace('{z}', zoom);
						layerElement.appendChild(img);
					}
				}
				container.appendChild(layerElement);
			}
		}

		if (pin) {
			var pinElement = document.createElement('div');
			var pinx = lng2tile(lng, zoom);
			var piny = lat2tile(lat, zoom);
			pinElement.className = 'pin';
			var style = pinElement.style;
			style.position = 'absolute';
			style.top = 100 / height * (Math.floor(piny) - y - offset[1] + (piny % 1)) + '%';
			style.left = 100 / width * (Math.floor(pinx) - x - offset[0] + (pinx % 1)) + '%';
			style.width = '10px';
			style.height = '10px';
			style.margin = '-10px';
			style.borderRadius = '50%';
			style.background = '#000';
			container.appendChild(pinElement);
		}

	})(document, Math);
}