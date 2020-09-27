import { Component, OnInit } from '@angular/core';
import { GoogleMap, 
         GoogleMaps, 
         GoogleMapsEvent,
         GoogleMapOptions, 
         Environment } from '@ionic-native/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  public latitude: number;

  public longitude: number;

  private map: GoogleMap;

  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  public loadMap(): void {
    console.log("here 1");
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCzOSjHdOK1ybtCq5eZvssBioQoTMobfrQ',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCzOSjHdOK1ybtCq5eZvssBioQoTMobfrQ'
    });

    console.log("here 2");
    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
    console.log("here 3");

    this.map = GoogleMaps.create('#map_canvas', mapOptions);
    console.log("here 4");

    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(event => {
      console.log(event); 
    });
    console.log("here 5");
  }

}
