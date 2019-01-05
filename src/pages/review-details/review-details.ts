import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YourPricePage} from '../your-price/your-price';
import { ModalController ,LoadingController} from 'ionic-angular';
import { CreateolagaPage} from '../createolaga/createolaga';
import { Http } from '@angular/http';
import {EditLocationDetailPage} from '../edit-location-detail/edit-location-detail';
import {HelperSelectionPage} from '../helper-selection/helper-selection';
import {EditItemDetailPage} from '../edit-item-detail/edit-item-detail';
import {ENV} from '../../app/env'

@Component({
  selector: 'page-review-details',
  templateUrl: 'review-details.html'
})
export class ReviewDetailsPage {
  oolaga_type;
  oolaga_name;
  oolaga_img;
  locations;
  items;
  date;
  time;
  helper;
  http;
  constructor(public loadingCtrl:LoadingController,http:Http,public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.http=http;
  }
  ionViewDidEnter(){
  this.locations=JSON.parse(localStorage['locations']);
  this.oolaga_type=localStorage['service_type'];
  this.items=JSON.parse(localStorage['items']);
  this.date=localStorage['date']
  this.time=localStorage['time']
  this.helper=localStorage['helper_selection']
  this.oolaga_img=localStorage['service_image']
  this.oolaga_name=localStorage['service_name']
  console.log(this.locations)
  }
  submit(value){
    if(value==0){this.navCtrl.pop()}
    else if(value==1){this.navCtrl.push(YourPricePage,{});}
  }
  edit_oolaga_type(){
    this.navCtrl.push(CreateolagaPage,{data:'edit'})
  }
  edit_locations(value){
    // let edit = this.modalCtrl.create(SelectLocationMapPage,{edit:'edit'});
    //  edit.onDidDismiss(data => {
    //  if(data.name!=''&&data.lat!=''&&data.lng!=''){
    //     this.edit_location(data.name,data.lat,data.lng,value);
    //  }});
    //  edit.present();
  }
  edit_location_details(value,location){
    var location_id;
    let loader = this.loadingCtrl.create();
        loader.present();
    this.http.post(ENV.api+'/webservicegetLocation', {olaga_id:localStorage['oolaga_id']}).subscribe(data => {
        if(JSON.parse(data._body).response==true){
        location_id=JSON.parse(data._body).locations[value].id;
        this.navCtrl.push(EditLocationDetailPage,{location_id:location_id,location_data:location,value:value})
        .then(()=>{
        loader.dismiss();

        })
      }
    })
  }
  edit_item_details(value,id){
     this.navCtrl.push(EditItemDetailPage,{data:id},{animation: 'ios-transition'})
  }
  edit_time_details(){
     this.navCtrl.pop({animation: 'ios-transition',animate: true, direction: 'forward'})
  }
  edit_helper_details(){
     this.navCtrl.push(HelperSelectionPage,{data:'edit'})
  }
  edit_location(name,lat,lng,value){
        var location_id;
        var id=localStorage['oolaga_id']
        console.log(localStorage['oolaga_id'])
        let loader = this.loadingCtrl.create();
            loader.present();
        this.http.post(ENV.api+'/webservicegetLocation', {olaga_id:id}).subscribe(data => {
              if(JSON.parse(data._body).response==true){
              console.log(JSON.parse(data._body))
              if(value==0){
                location_id=JSON.parse(data._body).locations[0].id;
              }
              else if(value==1){
                location_id=JSON.parse(data._body).locations[1].id;
              }
              this.http.post(ENV.api+'/webserviceeditLocation',{location:location_id,
                                    latitude:lat,
                                    longitude:lng,
                                    location_name:name
                                   }
                ).subscribe(data=>{
                if(JSON.parse(data._body).response==true){
                    console.log(JSON.parse(data._body))
                    if(value==0){
                      this.locations[0].location_name=name
                      this.locations[0].latitude=lat
                      this.locations[0].longitude=lng
                      localStorage['locations']=this.locations
                    }
                    else if(value==1){
                      this.locations[1].location_name=name
                      this.locations[1].latitude=lat
                      this.locations[1].longitude=lng
                      localStorage['locations']=this.locations
                    }
                    loader.dismiss();
                }
                else{

                }
              })
              }else{alert('error')}
        })
  }
}
