import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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

export class MapComponent implements OnInit, OnDestroy{
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  map!: Map;
  @Input() showRandomMarkers: boolean = true;
  @Output() showRandomMarkersChange = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {}

  interval: any;
  randomMarkerSource!: VectorSource;
  randomMarkerLayer!: VectorLayer<VectorSource>;
  
  clickedMarkerSource!: VectorSource;
  clickedMarkerLayer!: VectorLayer<VectorSource>;

  setMap(map: Map) {
    this.map = map;
    this.map.setTarget(this.elementRef.nativeElement);

    this.randomMarkerSource = new VectorSource();
    this.randomMarkerLayer = new VectorLayer({
      source: this.randomMarkerSource,
      style: new Style({
        image: new Icon({
          src: 'assets/icon.png', 
          anchor: [0.5, 1],
          scale: 0.05
        })
      })
    });
    
    this.map.addLayer(new TileLayer({ source: new OSM() }));
    
    this.startCoordinateUpdate();
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.stopCoordinateUpdate();
  }

  startCoordinateUpdate() {
    if (this.showRandomMarkers){
      this.interval = setInterval(() => {
        const lon = (Math.random() * 360) - 180; 
        const lat = (Math.random() * 180) - 90; 
        const coordinates = fromLonLat([lon, lat]);

        const markerFeature = new Feature({
          geometry: new Point(coordinates)
        });

        this.randomMarkerSource.clear(); 
        this.randomMarkerSource.addFeature(markerFeature);
      }, 3000);
    }

    else {
      this.clickedMarkerSource = new VectorSource();
      this.clickedMarkerLayer = new VectorLayer({
        source: this.clickedMarkerSource
      });

      const clickedMarkerStyle = new Style({
        image: new Icon({
          src: 'assets/xIcon.png', 
          anchor: [0.5, 1],
          scale: 0.05
        })
      });

      this.map.on('click', (event) => {
        const clickedCoordinate = event.coordinate;

        const markerFeature = new Feature({
          geometry: new Point(clickedCoordinate)
        });

        markerFeature.setStyle(clickedMarkerStyle);

        this.clickedMarkerSource.clear();
        this.clickedMarkerSource.addFeature(markerFeature);
      });

      this.map.addLayer(this.randomMarkerLayer);
    }
  }

  stopCoordinateUpdate() {
    clearInterval(this.interval);
  }

  setRandomMarkers() {
    this.randomMarkerLayer.setVisible(true);
    this.clickedMarkerLayer.setVisible(false);
  }

  showClickedMarkers() {
    this.randomMarkerLayer.setVisible(false);
    this.clickedMarkerLayer.setVisible(true);
  }
}