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

  constructor(private elementRef: ElementRef) {}

  interval: any;
  randomSource!: VectorSource;
  randomLayer!: VectorLayer<VectorSource>;

  iconFeature!: Feature;
  clickedSource!: VectorSource;
  clickedLayer!: VectorLayer<VectorSource>;

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.hideRandomMarkers();
  }

  setMap(map: Map) {
    this.map = map;
    this.map.setTarget(this.elementRef.nativeElement);

    this.showRandomMarkers();
    this.showClickedMarkers();
  }

  showRandomMarkers() {
    this.randomSource = new VectorSource();
    this.randomLayer = new VectorLayer({
      source: this.randomSource,
      style: new Style({
        image: new Icon({
          src: 'assets/icon.png', 
          anchor: [0.5, 1],
          scale: 0.05
        })
      })
    });

    this.map.addLayer(new TileLayer({ source: new OSM() }));
    this.map.addLayer(this.randomLayer);

    this.interval = setInterval(() => {
      const lon = (Math.random() * 360) - 180; 
      const lat = (Math.random() * 180) - 90; 
      const coordinates = fromLonLat([lon, lat]);

      const markerFeature = new Feature({
        geometry: new Point(coordinates)
      });

      this.randomSource.clear(); 
      this.randomSource.addFeature(markerFeature);
    }, 3000);
  }

  hideRandomMarkers() {
    clearInterval(this.interval);
    this.randomLayer.setVisible(false);
  }

  showClickedMarkers(){
    this.clickedSource = new VectorSource();
    this.clickedLayer = new VectorLayer({
      source: this.clickedSource,
      style: new Style({
        image: new Icon({
          src: 'assets/xIcon.png', 
          anchor: [0.5, 1],
          scale: 0.05
        })
      })
    });
    this.map.addLayer(this.clickedLayer);

    this.map.on('click', (event) => {
      const clickedCoordinate = event.coordinate;
      this.clickedSource.clear();
      const iconFeature = new Feature({
        geometry: new Point(clickedCoordinate)
      });

  
      this.clickedSource.addFeature(iconFeature);
    });
  }
  
  hideClickedMarkers(){
    this.clickedLayer.setVisible(false);
  }
}