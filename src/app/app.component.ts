import { Component, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { MapComponent } from './map/map.component'; 
import { ScalelineComponent } from './scaleline/scaleline.component';
import { MousePositionComponent } from './mouse-position/mouse-position.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('mapComponent', { static: true }) mapComponent!: MapComponent;
  @ViewChild('scaleLineComponent', { static: true }) scaleLineComponent!: ScalelineComponent;
  @ViewChild('mousePositionComponent', { static: true }) mousePositionComponent!: MousePositionComponent;
  
  doesShowRandomMarkers: boolean = true;
  doesShowClickedMarkers: boolean = false;

  showRandomMarkers() {
    // this.mapComponent.startRandomMarkers();
  }

  hideRandomMarkers(){

  }

  showClickedMarkers(value: boolean) {
    this.doesShowClickedMarkers = value;
    this.doesShowRandomMarkers = !value;
  }

  toggleClickedMarkers() {
    //startCoordinateUpdate();
    this.doesShowClickedMarkers = !this.doesShowClickedMarkers;
  }

  toggleRandomMarkers() {
    this.doesShowRandomMarkers = !this.doesShowRandomMarkers;
    if (this.doesShowRandomMarkers) 
      this.showRandomMarkers();
    else 
      this.hideRandomMarkers();
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
    this.mousePositionComponent.setMap(map);
  }
}