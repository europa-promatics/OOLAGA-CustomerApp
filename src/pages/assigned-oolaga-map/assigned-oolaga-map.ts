import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { ENV } from '../../app/env'
import { ChatPage } from '../chat/chat'
declare var google
@Component({
  selector: 'page-assigned-oolaga-map',
  templateUrl: 'assigned-oolaga-map.html'
})
export class AssignedOolagaMapPage {
  map;
  markers=[];
  data;
  duration;
  helper_lat;
  helper_long;
  helper_data
  track;
  helper;
  status:boolean=false;
  refresh_status:boolean=true;
  constructor(public alertCtrl:AlertController,public navCtrl: NavController,public http:Http, public navParams: NavParams) {
  	this.markers=[];
  }
  getHelperLocation(){
      console.log('hello')
      // this.markers[0]=marker;
      // http://gagandeepsethi.com/oolaga/track_helper
      this.http.post(ENV.api+'/track_helper',{user_id:this.data.helper_id})
      .subscribe(data=>{
        if(data.json().response){
          this.helper_lat=data.json().data.latitude;
          this.helper_long=data.json().data.longitude;

          // if(status){
          //   this.helper.setMap(null);
          // }
          console.log(this.helper_lat);
          console.log(this.helper_long);
          var pin =new google.maps.LatLng(this.data.src_latitude,this.data.src_longitude)
          var icon1 = {
              url: 'assets/icon/pin-1.png', // url
                scaledSize: new google.maps.Size(33, 46), // scaled size
                };
          var marker = new google.maps.Marker({
            icon:icon1,
            position: pin
          });
          this.markers[0]=marker
          var pin2 =new google.maps.LatLng(this.data.dst_latitude,this.data.dst_longitude)
          var icon2 = {
                url: 'assets/icon/pin-2.png', // url
                  scaledSize: new google.maps.Size(33, 46), // scaled size
                  };
          var marker2 = new google.maps.Marker({
            icon:icon2,
            position: pin2
          });
          this.markers[1]=marker2
          if(this.status==false){
          
          var pin =new google.maps.LatLng(this.helper_lat,this.helper_long)
          var icon1 = {
                    url: 'img/delivery-truck.png', // url
                    scaledSize: new google.maps.Size(33, 33), // scaled size
                };
          var marker3 = new google.maps.Marker({
              position: pin,
              icon:icon1,
            });
          this.markers[2]=marker3
          }
          // marker2.setMap(this.map);

          this.refresh();
          this.status=true;
        }else{
          let confirm=this.alertCtrl.create({
            title:'Helper location not available',
            buttons:['OK']
          })
          confirm.present();
          clearInterval(this.track);
          confirm.onDidDismiss(()=>{
            this.navCtrl.pop();
          });
        }
      },err=>{
        console.log(err.json())
      })
  }
  refresh(){
    console.log(this.status)
    if(this.status){
      // for (var i = 0; i < this.markers.length; i++) {
        var myLatlng = new google.maps.LatLng(this.helper_lat, this.helper_long);
          this.markers[2].setPosition(myLatlng);
        // }
    }
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(this.map);
      }
      var bounds = new google.maps.LatLngBounds();
      for(var i=0;i<this.markers.length;i++) {
        bounds.extend(this.markers[i].getPosition());
      }
      if(this.refresh_status)
      {
        this.map.setCenter(bounds.getCenter());
        this.map.fitBounds(bounds);
      }
      this.refresh_status=false;
  }
  openChat(value,image,name, oolaga_id){
    console.log('gagzz');
	console.log(oolaga_id);
    this.navCtrl.push(ChatPage,{receiver_id:value,image:image,name:name, oolaga: oolaga_id})
  }
  ionViewDidLeave(){
    clearInterval(this.track);
  }
  ionViewWillLoad(){
  }
  ionViewDidLoad() {
    this.data = this.navParams.get('data')
    // console.log(this.data)
    // this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+this.data.src_latitude+','+this.data.src_longitude+'&destinations='+this.data.dst_latitude+','+this.data.dst_longitude+'&key=AIzaSyAI2_gJfnHQ8ztCJ8omA-YrefkddT7y5TI')
    // .subscribe(data=>{
   //    let a = data.json()
   //    this.duration=a.rows[0].elements[0].duration.text
   //  },err=>{
   //    // alert('Something wrong...')
   //  })
    let mapp = document.getElementById('assignedMap')
    this.map = new google.maps.Map(mapp,{
      center: {lat:37.09024,lng: -95.712891},
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
      });
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapp.classList.add('show-map');
      google.maps.event.trigger(mapp, 'resize');
      });
      this.getHelperLocation();
      this.track = setInterval(()=>{
        this.getHelperLocation();
      },5000)

    // console.log(this.markers.length)
    // for (var i = 0; i < this.markers.length; i++) {
    //       this.markers[i].setMap(this.map);
    //     }
    //   var bounds = new google.maps.LatLngBounds();
    //   // bounds.extend(new google.maps.LatLng(this.data.src_latitude,this.data.src_longitude))
    //     for(var i=0;i<this.markers.length;i++) {
    //        bounds.extend(this.markers[i].getPosition());
    //     }
        // console.log('data',bounds.getCenter(),bounds)
        // var m = new google.maps.Marker({
        //   icon:{
        //     url: 'img/delivery-truck.png', // url
        //     scaledSize: new google.maps.Size(30, 30), // scaled size
        //   },
        //   position:bounds.getCenter()
        // })
        // m.setMap(this.map);
      // this.map.setCenter(bounds.getCenter());
      // this.map.fitBounds(bounds);
  }

}
