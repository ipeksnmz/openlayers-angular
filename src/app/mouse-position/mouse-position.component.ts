import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import Map from 'ol/Map';
import ControlMousePosition from 'ol/control/MousePosition';
import { CoordinateFormatterService } from '../coordinate-formatter.service';

@Component({
  selector: 'mouse-position',
  template: '',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MousePositionComponent implements OnInit{
  map!: Map;
  @Input() fractionDigits!: number;
  control!: ControlMousePosition;

  constructor(
    private element: ElementRef,
    private coordinateFormatter: CoordinateFormatterService,
  ) 
  {}

  ngOnInit() {
    
  }

  setMap(map : Map){
    this.map = map;
    this.control = new ControlMousePosition({
      className: 'mouseposition-control',
      coordinateFormat: (coordinates?: number[]) => this.coordinateFormatter.numberCoordinates(coordinates!, this.fractionDigits),
      target: this.element.nativeElement,
      projection: 'EPSG:4326' // anlamlandirmak icin koordinat verilerini
    });
    this.map.addControl(this.control);
  }
}
