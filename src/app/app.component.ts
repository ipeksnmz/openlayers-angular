import { Component, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { MapComponent } from './map/map.component'; 
import { ScalelineComponent } from './scaleline/scaleline.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('mapComponent', { static: true }) mapComponent!: MapComponent;
  @ViewChild('scaleLineComponent', { static: true }) scaleLineComponent!: ScalelineComponent;
  showRandomMarkers: boolean = true;
  // clickedMarker: boolean = false;


  showRandomMarkersChanged(value: boolean) {
    this.showRandomMarkers = value;
  }

  showClickedMarkers() {
    this.showRandomMarkers = !this.showRandomMarkers;
  }

  ngOnInit(): void {
    const map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      // target: 'ol-map'
    });
    this.mapComponent.setMap(map);
    this.scaleLineComponent.setMap(map);
  }
}