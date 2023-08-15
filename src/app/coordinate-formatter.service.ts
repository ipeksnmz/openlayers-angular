import { Injectable } from '@angular/core';
import { format} from 'ol/coordinate.js';


@Injectable({
  providedIn: 'root',
})
export class CoordinateFormatterService {

  constructor() { }
  
  numberCoordinates(
    coordinates: number[],
    fractionDigits: number = 2,
  ) : string {
    const template = 'Coordinate is ( lat: {y}, lon: {x}).';
    return format(coordinates, template, fractionDigits);
  }
}
