import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
declare var google;
@Component({
  selector: 'page-oolaga-details',
  templateUrl: 'oolaga-details.html'
})
export class OolagaDetailsPage {
	selection;
	d;
	start;end;
	wypt=[];
	map;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.selection="detail";
  	this.d=this.navParams.get('data')
  	console.log(this.d)
  }
  loadmap(value)
  {		
  		if(value=='map'){
  			setTimeout(()=>{
		  	this.start = new google.maps.LatLng(this.d.src_latitude,this.d.src_longitude)
    		this.end = new google.maps.LatLng(this.d.dst_latitude,this.d.dst_longitude)
  			var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var mapel = new google.maps.Map(document.getElementById('map1'), {
            zoom: 4,
            disableDefaultUI: true
            });
            directionsDisplay.setMap(mapel);
            directionsService.route({
            origin: this.start,
            destination: this.end,
            waypoints: this.wypt,

            optimizeWaypoints: true,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function(response, status) {
            if (status === 'OK') {
            directionsDisplay.setDirections(response);
            } 
            });
  				
  			},1000);
  		}
  }
}
