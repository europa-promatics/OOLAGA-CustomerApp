import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ENV } from '../../app/env';
import { AppProvider } from '../../providers/app-provider';
import {SelectTimeDatePage} from '../select-time-date/select-time-date';

declare var google;
@Component({
  selector: 'page-laboronly',
  templateUrl: 'laboronly.html'
})
export class LaboronlyPage {
	timeValues=['01:00','01:30','02:00','02:30','03:00','03:30','04:00','04:30','05:00','05:30','06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00'];
	value=0;
	locationData=[];
	acService:any
	oolaga:labor = new labor();
  constructor(public loadingCtrl:LoadingController,public alertCtrl:AlertController,public appProvider:AppProvider,public http:Http,public navCtrl: NavController, public navParams: NavParams) {
  	this.oolaga.hours=this.timeValues[0];
  	this.locationData=[];
  }

  ionViewDidLoad() {
  	this.acService = new google.maps.places.AutocompleteService(); 
    console.log('ionViewDidLoad LaboronlyPage');
    this.appProvider.current.laborHours?this.oolaga.hours = this.appProvider.current.laborHours:'',
    this.oolaga.info = this.appProvider.current.laborInfo        
    this.oolaga.latitude = this.appProvider.current.laborLocationLat  
    this.oolaga.longitude = this.appProvider.current.laborLocationLng  
    this.oolaga.location_name = this.appProvider.current.laborLocationName
    this.oolaga.unit_nu = this.appProvider.current.laborUnit_no      
  }
  searchLocation(){
  	let config;
    if (this.oolaga.location_name == '') {
      this.locationData = [];
      return;
    }
    config = { 
      types:  ['geocode'],
      input: this.oolaga.location_name, 
    } 
    let self = this;
    this.acService.getPlacePredictions(config, function (predictions, status) {
      if(predictions){
        self.locationData = [];
        if(predictions){
         	predictions.forEach(function (prediction) {              
            self.locationData.push(prediction);
          });	
        }            
      }
    });
  }
  selectLocation(value){
  	this.http.get('https://maps.googleapis.com/maps/api/geocode/json?place_id='+value+'&key=AIzaSyCFKqNqXD8Na1FWkzZkbGdJV2XJVfH__5Y').subscribe(data=>{
		console.log(data);
      this.oolaga.latitude=Math.round(data.json().results[0].geometry.location.lat*10000000)/10000000;
      this.oolaga.longitude=Math.round(data.json().results[0].geometry.location.lng*10000000)/10000000;
    },err=>{
      console.log(err);
    })
  }
  up(){
    if(this.value!=this.timeValues.length-1){
      this.value++;
      this.oolaga.hours=this.timeValues[this.value];
    }
  }
  down(){
    if(this.value!=0){
      this.value--;
      this.oolaga.hours=this.timeValues[this.value];
    }
  }
  submit(value){
    if(value){
  		this.oolaga.oolaga_id                       = this.appProvider.current.oolaga_id;
      this.appProvider.current.laborInfo          = this.oolaga.info;
      this.appProvider.current.laborHours         = this.oolaga.hours;
      this.appProvider.current.laborLocationLat   = this.oolaga.latitude;
      this.appProvider.current.laborLocationLng   = this.oolaga.longitude;
      this.appProvider.current.laborLocationName  = this.oolaga.location_name;
      this.appProvider.current.laborUnit_no       = this.oolaga.unit_nu;
      let loader = this.loadingCtrl.create()
      loader.present()
      this.http.post(ENV.api+'/webservicesaddLabour',JSON.stringify(this.oolaga))
          .subscribe(data=>{
            console.log(data);
            if(data.json().response==true){
              if(this.appProvider.current.summary_edit_location==true){
                if(this.appProvider.current.draft_edit_labor_location==true){
                  let a                       = JSON.parse(localStorage['draftOolaga']);
                  a.info                      = this.appProvider.current.laborInfo;
                  a.hours                     = this.appProvider.current.laborHours;
                  a.source.latitude           = this.appProvider.current.laborLocationLat;
                  a.source.longitude          = this.appProvider.current.laborLocationLng;
                  a.source.location_name      = this.appProvider.current.laborLocationName;
                  a.source.unit_nu            = this.appProvider.current.laborUnit_no;
                  localStorage['draftOolaga'] = JSON.stringify(a);
                }
                this.navCtrl.pop();
              }else{
                this.navCtrl.push(SelectTimeDatePage,{});
              }
              loader.dismiss()
            }
            else if (data.json().response==false){
              loader.dismiss()
              let alert = this.alertCtrl.create({
                title: 'Oops!',
                subTitle: 'Please Fill All Entries',
                buttons: ['OK']
              });
              alert.present();
            }
          },err=>{
            console.log(err);
          })
        }
        else{
          this.navCtrl.pop();
        }
    }
  }
//       this.http.post(ENV.api+'/webservicesaddLabour',JSON.stringify(this.oolaga))
//       .subscribe(data=>{
//         console.log(data);
//         if(data.json().response==true){
//   				this.navCtrl.push(SelectTimeDatePage,{})
//   			}
//   		},err=>{
//   			console.log(err);
//   		})
//   	}
//   	else{
//   		this.navCtrl.pop();
//   	}
//   }
// }


class labor{
		latitude?:any;
		longitude?:any;
		location_name?:any;
		oolaga_id?:any;
		unit_nu?:any;
		hours?:any;
		info?:any;
	constructor(){
	}
}
