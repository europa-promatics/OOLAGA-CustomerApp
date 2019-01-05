import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController,AlertController} from 'ionic-angular';
import { ItemDetailPage} from '../item-detail/item-detail';
import { Content } from 'ionic-angular';
import { Http } from '@angular/http';
import {ENV} from '../../app/env'

@Component({
  selector: 'page-detail-for-helper',
  templateUrl: 'detail-for-helper.html'
})
export class DetailForHelperPage {
  @ViewChild(Content) content: Content;
  http;
  unit_nu:number=null;
  stairs:number=null;
  elevator:boolean=false;
  ride:boolean=false;
  parking_info:string=null;
  count=0;
  locations;
  i:number=0;
  locations_details: Array<{loc_no:any, 
                            oolaga_id:any,
                            latitude:any,
                            longitude:any,
                            location_name:any,
                            unit_nu:any,
                            stairs:any,
                            elevator:any,
                            ride:any,
                            parking_info:any
                          }>;
  service_name;
  constructor(public loadingCtrl:LoadingController,http:Http,public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
    this.locations_details=[];
    this.http=http;
    this.service_name=localStorage['service_name']
  }
  ionViewWillEnter(){
          this.locations=this.navParams.get('data');
          this.locations[this.locations.length-1].location_selection=false;
          this.count=0;
          this.i=0;
          console.log(this.navParams.get('data'))
          this.locations[0].location_selection=true;
  }
  add1(){
    this.count=this.count+1;
    this.stairs=this.count;
  }
  sub1()
  {
    this.count=this.count-1;
    this.stairs=this.count;
  }
  add()
  {
    this.add1();
    console.log('add'+this.count);
  }
  sub()
  {
    if(this.count!=0)
    {
    this.sub1();
    console.log('sub'+this.count);
    }
    else  {
      let confirm=this.alertCtrl.create({
              message:'Sorry it won,t go Down',

              buttons:[{
                 text:'OK',
                 handler:()=>{},
               }]
          });
                confirm.present();
    }
  }
  submit(value)
  { 
    if(value==0){
      this.navCtrl.pop()
    }
    else if(value==1){
      if(this.i<this.locations.length-1)
        {this.locations_details.push({loc_no: this.i,
                                      oolaga_id: localStorage['oolaga_id'],
                                      location_name: this.locations[this.i].name,
                                      latitude: this.locations[this.i].lat,
                                      longitude: this.locations[this.i].lng,
                                      unit_nu: this.unit_nu,
                                      stairs: this.stairs,
                                      elevator: this.elevator,
                                      ride: this.ride,
                                      parking_info: this.parking_info
                                    });
          this.locations[this.i].location_selection=false;
          this.unit_nu= null;this.stairs=null;this.elevator=false;this.ride=false;this.parking_info=null;
          this.content.scrollToTop();
          this.locations[this.i+1].location_selection=true;
        }
      else if(this.i==this.locations.length-1){
          this.locations_details.push({loc_no: this.i,
                                      oolaga_id: localStorage['oolaga_id'],
                                      location_name: this.locations[this.i].name,
                                      latitude: this.locations[this.i].lat,
                                      longitude: this.locations[this.i].lng,
                                      unit_nu: this.unit_nu,
                                      stairs: this.stairs,
                                      elevator: this.elevator,
                                      ride: this.ride,
                                      parking_info: this.parking_info
                                    });
//------------------------------------------------------
    let loader = this.loadingCtrl.create();
    loader.present();
            localStorage['locations']=JSON.stringify(this.locations_details)
    var link = ENV.api+'/webserviceaddLocation';
    this.http.post(link, this.locations_details).subscribe(data => {
          loader.dismiss();
          if(JSON.parse(data._body).response==true){
            console.log(JSON.parse(data._body).location)
             this.navCtrl.push(ItemDetailPage,{ locationId: JSON.parse(data._body).location });
          }
          else{alert('error')}
        })
//-----------------------------------------------------
        }
      this.i++;
    }
    else if(value==2){
      alert('jhagsdghasd')
    } 
      
  }
}
