// http://ejohn.org/apps/jselect/event.html
function addEvent(object, event, method) {
    if (object.attachEvent) {
        object['e' + event + method] = method;
        object[event + method] = function(){object['e' + event + method](window.event);};
        object.attachEvent('on' + event, object[event + method]);
    } else {
    object.addEventListener(event, method, false);
    }
}

!(function(context) {
    var Tristen = function() {};

    Tristen.prototype = {
        masthead: function() {
            var m = document.getElementById('masthead');
            addEvent(document.getElementById('t-toggle'), 'click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              m.className !== 'active' ? m.className = 'active' : m.className = '';
            });
        },
        frontpage: function() {
            var poi =[
              {
                "geometry": {
                  "type": "Point",
                  "coordinates": [-77.03238901390978,38.913188059745586]
                },
                "properties": {
                  "klass":4,
                  "dates": "2011 - present",
                  "title": "MapBox",
                  "description": "Got a job at DevelopmentSeed / MapBox. I presently live between here and Toronto."
                }
              },
              {
                "geometry": {
                  "type": "Point",
                  "coordinates": [-79.44889783859253,43.64828784884155]
                },
                "properties": {
                  "klass":3,
                  "dates": "2000 - present",
                  "title": "Toronto",
                  "description": "Completed a BMus at the University of Toronto. Realized I didn't want to be a jazz musician. Became interested in web design and development."
                }
              },
              {
                "geometry": {
                  "type": "Point",
                  "coordinates": [-124.44211358934785,49.3556511909281]
                },
                "properties": {
                  "klass":2,
                  "dates": "1991 - 2000",
                  "title": "Qualicum Beach",
                  "description": "Attended Qualicum Beach Middle and Kwalikum High school. Wanted to be a jazz musician."
                }
              },
              {
                "geometry": {
                  "type": "Point",
                  "coordinates": [-123.43264160339346,48.46711840348592]
                },
                "properties": {
                  "klass":1,
                  "dates": "1981 - 1991",
                  "title": "Victoria",
                  "description": "Born in Victoria General. Attended Wishart Elementary School and lived in Colwood."
                }
              }
            ];

            // Create map
            var map = mapbox.map('map');
            map.addLayer(mapbox.layer().id('tristen.homepage'));

            // Create and add marker layer
            var markerLayer = mapbox.markers.layer().features(poi).factory(function(f) {
                var p = document.createElement('div');
                p.className = 'marker marker-' + f.properties.klass;
                p.innerHTML = f.properties.klass;

                var up = document.createElement('div');
                    up.className = 'm-popup';
                    up.innerHTML = '<span class="date">' + f.properties.dates + '</span>' +
                            '<h2>' + f.properties.title + '</h2>' +
                            '<p>' + f.properties.description + '</p>';

                    p.appendChild(up);
                    addEvent(p, 'mouseover', function() {
                       up.className += ' active';
                    });
                    addEvent(p, 'mouseout', function() {
                       up.className = up.className.replace(' active', '');
                    });

                return p;
            });
            map.addLayer(markerLayer);

            map.ui.zoomer.add();
            map.setZoomRange(2, 5);

            // Set iniital center and zoom
            map.centerzoom({
                lat: 43.04,
                lon: -92.86
            }, 3);
        }
    }

    window.Tristen = Tristen;
})(window);