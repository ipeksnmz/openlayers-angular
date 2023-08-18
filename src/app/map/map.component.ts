import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


@Component({
  selector: 'app-map',
  template: '',
  styles: [':host { width: 100%; height: 100%; display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MapComponent implements OnInit{
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  @Input() map!: Map;
  constructor(private elementRef: ElementRef) {
  }

  interval: any;
  markerSource!: VectorSource;
  markerLayer!: VectorLayer<VectorSource>;

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.stopCoordinateUpdate();
  }

  setMap(map: Map) {
    this.map = map;
    this.map.setTarget(this.elementRef.nativeElement);

    this.markerSource = new VectorSource();
    this.markerLayer = new VectorLayer({
      source: this.markerSource,
      style: new Style({
        image: new Icon({
          src: 'assets/icon.png', 
          anchor: [0.5, 1],
          scale: 0.05
        })
      })
    });

    this.map.addLayer(new TileLayer({ source: new OSM() }));
    this.map.addLayer(this.markerLayer);

    this.startCoordinateUpdate();
  }

  startCoordinateUpdate() {
    this.interval = setInterval(() => {
      const lon = (Math.random() * 360) - 180; 
      const lat = (Math.random() * 180) - 90; 
      const coordinates = fromLonLat([lon, lat]);
      //projection: 'EPSG:4326'

      const markerFeature = new Feature({
        geometry: new Point(coordinates)
      });

      this.markerSource.clear(); 
      this.markerSource.addFeature(markerFeature);
    }, 3000);
  }

  stopCoordinateUpdate() {
    clearInterval(this.interval);
  }
}