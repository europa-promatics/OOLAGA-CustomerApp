import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Current} from "../models/current";
@Injectable()
export class AppProvider {
  current:Current;
  constructor(public http: Http) {
  	this.current = new Current();
  }
  createNew(){
    this.current = null;
  	this.current = new Current();
    console.log('New Data!');
  }
  consoleData(){
  	console.log(this.current)
  }

}
