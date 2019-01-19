import { Component ,OnInit} from '@angular/core';
import { NavController, NavParams, AlertController, ModalController,LoadingController } from 'ionic-angular';
import { FillLocationDetailPage } from '../fill-location-detail/fill-location-detail';
import { ItemDetailPage } from '../item-detail/item-detail'
import { AppProvider } from '../../providers/app-provider';
import { Http } from '@angular/http';
import { ENV } from '../../app/env' 
declare var google;
@Component({
  selector: 'page-location-select',
  templateUrl: 'location-select.html'
})
export class LocationSelectPage  implements OnInit{
  _1:boolean=false;
  _2:boolean=false;
  _3:boolean=false;
  _4:boolean=false;
  count:boolean=true;
  markers
  http
  third_location:boolean=false;
  forth_location:boolean=false;
  first_location_name;
  second_location_name;
  third_location_name;
  forth_location_name;
  first_location_label='Collection';
  second_location_label='Livraison';
  third_location_label='Livraison';
  forth_location_label='Livraison';
  map
  autocompleteItems1: any;
  autocompleteItems2: any;
  autocompleteItems3: any;
  autocompleteItems4: any;
  acService:any;
  placesService;
  editmarker1:boolean=false;
  editmarker2:boolean=false;
  editmarker3:boolean=false;
  editmarker4:boolean=false;
  locations: Array<{
                    no:number,
                    name: string,
                    lat: number, 
                    lng: number, 
                    location_selection:boolean
                  }>;
  locations_details: Array<{
                            inhome:any,
                            curbside:any,
                            loc_no:any, 
                            oolaga_id:any,
                            latitude:any,
                            longitude:any,
                            location_name:any,
                            unit_nu?:any,
                            stairs?:any,
                            elevator?:any,
                            ride?:any,
                            parking_info?:any,
                            store_name?:any,
                            purchaser?:any,
                            order_number?:any,
                            phone?:any,
                            additional_contact?:any,
							iwillbehelping?:any
                          }>;
  constructor(private appProvider:AppProvider,http:Http,public loadingCtrl:LoadingController, public modalCtrl:ModalController,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
    this.locations = [];
    this.markers = [];
    this.locations_details = [];
    this.http=http;    
  }
  clearLocation(value){
    if(this.markers.length>=value+1){
      this.markers[value].setMap(null);
    }
    // this.locations_details[value]={
    //               loc_no:value, 
    //               oolaga_id:localStorage['oolaga_id'],
    //               latitude:null,
    //               longitude:null,
    //               location_name:null,
    //               unit_nu:null,
    //               curbside:null,
    //               inhome:null,
    //               stairs:null,
    //               elevator:null,
    //               ride:null,
    //               parking_info:null,
    //               store_name:null,
    //               purchaser:null,
    //               order_number:null,
    //               phone:null,
    //               additional_contact:null
    //             }
    // this.locations[value].name=null;
    // this.locations[value].lat=null;
    // this.locations[value].lng=null;
    if(value==0){
      this._1=false;
      this.first_location_name=null;
      this.autocompleteItems1 = [];
      if(this.locations.length==1){
        this.locations.pop();
      }
      if(this.locations_details.length==1){
        this.locations_details.pop();
      }
    }else if(value==1){
      this._2=false;
      this.second_location_name=null;
      this.autocompleteItems2 = [];
      if(this.locations.length==2){
        this.locations.pop();
      }
      if(this.locations_details.length==2){
        this.locations_details.pop();
      }
    }else if(value==2){
      if(this.forth_location){
        this._4=false;
        this.third_location_name=this.forth_location_name;
        this.forth_location_name=null;
        this.autocompleteItems3 = [];
        this.autocompleteItems4 = [];
        this.forth_location=!this.forth_location;
        this.third_location_label='Livraison';
        if(this.locations.length==4){
          this.locations[2]=this.locations[3];
          this.locations.pop();
        }
        if(this.locations_details.length==4){
          this.locations_details[2]=this.locations_details[3];
          this.locations_details.pop();
        }
      }else{
        this._3=false;
        this.third_location_name=null;
        this.autocompleteItems3 = [];
        if(!this.forth_location){
          this.third_location=!this.third_location;
        }
        this.second_location_label='Livraison';
        if(this.locations.length==3){
          this.locations.pop();
        }
        if(this.locations_details.length==3){
          this.locations_details.pop();
        }
      }
    }else if(value==3){
      this._4=false;
      this.forth_location_name=null;
      this.autocompleteItems4 = [];
      this.forth_location=!this.forth_location;
      this.third_location_label='Livraison';
      if(this.locations.length==4){
        this.locations.pop();
      }
      if(this.locations_details.length==4){
        this.locations_details.pop();
      }
    }
  }
  editdetail(value){
    let locationhead;
    let locationname;
    if(value==0){
      locationhead="DÉTAILS DE LA PREMIÈRE ADRESSE";
      locationname=this.first_location_name;
    }else if(value==1){
      locationhead="DÉTAILS DE LA SECONDE ADRESSE";
      locationname=this.second_location_name;
    }else if(value==2){
      locationhead="DÉTAILS DE LA TROISIÈME ADRESSE";
      locationname=this.third_location_name;
    }else if(value==3){
      locationhead="DÉTAILS DE LA QUATRIÈME ADRESSE";
      locationname=this.forth_location_name;
    }
    this.appProvider.current.edit_location_data=true;
    let locationDetails = this.modalCtrl.create(FillLocationDetailPage,{location:locationhead,location_name:locationname});
            locationDetails.onDidDismiss(data => {
              if(data==null){
                this.locations_details[value]={
                  loc_no:value, 
                  oolaga_id:localStorage['oolaga_id'],
                  latitude:this.locations_details[value].latitude,
                  longitude:this.locations_details[value].longitude,
                  location_name:this.locations_details[value].location_name,
                  unit_nu:null,
                  curbside:null,
                  inhome:null,
                  stairs:null,
                  elevator:null,
                  ride:null,
                  parking_info:null,
                  store_name:null,
                  purchaser:null,
                  order_number:null,
                  phone:null,
                  additional_contact:null,
				  iwillbehelping:null
                }
              }
              else{
                this.locations_details[value]={
                  loc_no:value, 
                  oolaga_id:localStorage['oolaga_id'],
                  latitude:this.locations_details[value].latitude,
                  longitude:this.locations_details[value].longitude,
                  location_name:this.locations_details[value].location_name,
                  unit_nu:data.unit_nu,
                  curbside:data.curbside,
                  inhome:data.inhome,
                  stairs:data.stairs,
                  elevator:data.elevator,
                  ride:data.ride,
                  parking_info:data.parking_info,
                  store_name:data.store_name,
                  purchaser:data.purchaser,
                  order_number:data.order_number,
                  phone:data.phone,
                  additional_contact:data.additional_contact,
				  iwillbehelping:data.iwillbehelping
                }
              }
              console.log(this.locations_details)
            });
            locationDetails.present();

  }
  loadLocations(){
    this.appProvider.current.locations[0] ? this.first_location_name=this.appProvider.current.locations[0].location_name : this.first_location_name ;
    this.appProvider.current.locations[1] ? this.second_location_name=this.appProvider.current.locations[1].location_name : this.second_location_name ;
    this.appProvider.current.locations[2] ? this.third_location_name=this.appProvider.current.locations[2].location_name : this.third_location_name ;
    this.appProvider.current.locations[3] ? this.forth_location_name=this.appProvider.current.locations[3].location_name : this.forth_location_name ;
    this.locations_details=this.appProvider.current.locations;
    console.log('locations :-',this.appProvider.current.locations.length)
    if(this.appProvider.current.locations.length==2){
      this._1=true;
      this._2=true;
    }
    if(this.appProvider.current.locations.length==3){
      this._1=true;
      this._2=true;
      this._3=true; 
    }
    if(this.appProvider.current.locations.length==4){
      this._1=true;
      this._2=true;
      this._3=true;
      this._4=true;
    }
    for(let i=0;i<this.appProvider.current.locations.length;i++){
      this.locations[i]={
                          no:i,
                          name: this.appProvider.current.locations[i].location_name,
                          lat:this.appProvider.current.locations[i].latitude,
                          lng:this.appProvider.current.locations[i].longitude,
                          location_selection:false
      }
    }
    if(this.markers!=null){
      for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }
    }
    if(this.locations_details.length>=1){
      var pin =new google.maps.LatLng(this.locations_details[0].latitude,this.locations_details[0].longitude)
      var icon1 = {
                url: 'assets/icon/pin-1.png', // url
                scaledSize: new google.maps.Size(33, 46), // scaled size
            };
      var marker = new google.maps.Marker({
          position: pin,
          icon:icon1,
        });
      this.markers[0]=marker;
    }
    if(this.locations_details.length>=2){
      var pin =new google.maps.LatLng(this.locations_details[1].latitude,this.locations_details[1].longitude)
      var icon1 = {
                url: 'assets/icon/pin-2.png', // url
                scaledSize: new google.maps.Size(33, 46), // scaled size
            };
      var marker = new google.maps.Marker({
          position: pin,
          icon:icon1,
        });
      this.markers[1]=marker;
    }
    if(this.locations_details.length>=3){
      var pin =new google.maps.LatLng(this.locations_details[2].latitude,this.locations_details[2].longitude)
      var icon1 = {
                url: 'assets/icon/pin-3.png', // url
                scaledSize: new google.maps.Size(33, 46), // scaled size
            };
      var marker = new google.maps.Marker({
          position: pin,
          icon:icon1,
        });
      this.markers[2]=marker;
      this.third_location=true;
    }
    if(this.locations_details.length==4){
      var pin =new google.maps.LatLng(this.locations_details[3].latitude,this.locations_details[3].longitude)
      var icon1 = {
                url: 'assets/icon/pin-4.png', // url
                scaledSize: new google.maps.Size(33, 46), // scaled size
            };
      var marker = new google.maps.Marker({
          position: pin,
          icon:icon1,
        });
      this.markers[3]=marker;
      this.forth_location=true;
    }
      for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(this.map);
        }
      var bounds = new google.maps.LatLngBounds();
        for(var i=0;i<this.markers.length;i++) {
            bounds.extend(this.markers[i].getPosition());
        }
      this.map.setCenter(bounds.getCenter());
      this.map.fitBounds(bounds);
      if(this.markers.length==1){
        this.map.setZoom(10);
      }
      else{
      this.map.setZoom(this.map.getZoom());
      }
  }

  help(){
    let alert = this.alertCtrl.create({
      title: 'Adresses',
      message: " C'est à cette étape que vous choisissez vos adresses. Gardez à l'esprit que vous pouvez choisir jusqu'à 3 adresses de collection et la dernière adresse étant le point de livraison. Pour chaque adresse choisie, vous serez invité à fournir plus de détails.",
      buttons: ['OK']
    })
    alert.present();
  }
  chooseItem(item: any,location_no) {
      if(location_no==1){
        this._1=true;
      }if(location_no==2){
        this._2=true;
      }if(location_no==3){
        this._3=true;
      }if(location_no==4){
        this._4=true;
      }
      let name = item.description.split(',');name.pop();
      item.description=name.toString();
      console.log('modal > chooseItem > item > ', item);
      this.placesService = new google.maps.places.PlacesService(this.map);
      var request = {placeId: item.place_id};

      if(location_no==1){
        this.first_location_name=item.description;
        this.autocompleteItems1 = [];
        this.placesService.getDetails(request, (place,status)=>{
          if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('page > getPlaceDetail > place > ', place);
                this.locations[0]={ 
                                    no:0,
                                    name: this.first_location_name,
                                    lat:place.geometry.location.lat(),
                                    lng:place.geometry.location.lng(),
                                    location_selection:true
                                  };
                this.loadmap(1);
            }
            else{console.log('page > getPlaceDetail > status > ', status );}
        })
        this.appProvider.current.edit_location_data=false;
        let locationDetails = this.modalCtrl.create(FillLocationDetailPage,{location:"DÉTAILS DE LA PREMIÈRE ADRESSE",location_name:this.first_location_name});
            locationDetails.onDidDismiss(data => {
              console.log("first",data);
              if(data==null){
                this.locations_details[0]={
                  loc_no:0, 
                  oolaga_id:localStorage['oolaga_id'],
                  latitude:this.locations[0].lat,
                  longitude:this.locations[0].lng,
                  location_name:this.locations[0].name,
                  curbside:null,
                  inhome:null,
                  unit_nu:null,
                  stairs:null,
                  elevator:null,
                  ride:null,
                  parking_info:null,
                  store_name:null,
                  purchaser:null,
                  order_number:null,
                  phone:null,
                  additional_contact:null,
				  iwillbehelping:null
                }
              }
              else{
                this.locations_details[0]={
                  loc_no:0, 
                  oolaga_id:localStorage['oolaga_id'],
                  latitude:this.locations[0].lat,
                  longitude:this.locations[0].lng,
                  location_name:this.locations[0].name,
                  curbside:data.curbside,
                  inhome:data.inhome,
                  unit_nu:data.unit_nu,
                  stairs:data.stairs,
                  elevator:data.elevator,
                  ride:data.ride,
                  parking_info:data.parking_info,
                  store_name:data.store_name,
                  purchaser:data.purchaser,
                  order_number:data.order_number,
                  phone:data.phone,
                  additional_contact:data.additional_contact,
				  iwillbehelping:data.iwillbehelping
                }
              }
              console.log(this.locations_details)
              this.appProvider.current.locations=this.locations_details;

            });
            locationDetails.present();
        }
      else if(location_no==2){
        this.second_location_name=item.description;
        this.autocompleteItems2 = [];
        this.placesService.getDetails(request, (place,status)=>{
          if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('page > getPlaceDetail > place > ', place);
                this.locations[1]={
                                    no:1,
                                    name: this.second_location_name,
                                    lat:place.geometry.location.lat(),
                                    lng:place.geometry.location.lng(),
                                    location_selection:false
                                  };
                this.loadmap(2);
            }
            else{console.log('page > getPlaceDetail > status > ', status );}
        })
        this.appProvider.current.edit_location_data=false;
        let locationDetails = this.modalCtrl.create(FillLocationDetailPage,{location:"DÉTAILS DE LA SECONDE ADRESSE",location_name:this.second_location_name});
            locationDetails.onDidDismiss(data => {
              console.log("second",data);
              if(data==null){
                this.locations_details[1]={
                  loc_no:1, 
                  oolaga_id:localStorage['oolaga_id'],
                  latitude:this.locations[1].lat,
                  longitude:this.locations[1].lng,
                  location_name:this.locations[1].name,
                  curbside:null,
                  inhome:null,
                  unit_nu:null,
                  stairs:null,
                  elevator:null,
                  ride:null,
                  parking_info:null,
				  iwillbehelping:null
                }
              }else{
                this.locations_details[1]={
                  loc_no:1, 
                  oolaga_id:localStorage['oolaga_id'],
                  latitude:this.locations[1].lat,
                  longitude:this.locations[1].lng,
                  location_name:this.locations[1].name,
                  curbside:data.curbside,
                  inhome:data.inhome,
                  unit_nu:data.unit_nu,
                  stairs:data.stairs,
                  elevator:data.elevator,
                  ride:data.ride,
                  parking_info:data.parking_info,
				  iwillbehelping:data.iwillbehelping
                }
              }
              console.log(this.locations_details)
              this.appProvider.current.locations=this.locations_details;
            });
            locationDetails.present();
      }
      else if(location_no==3){
        this.third_location_name=item.description;
        this.autocompleteItems3 = [];
        this.placesService.getDetails(request, (place,status)=>{
          if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('page > getPlaceDetail > place > ', place);
                this.locations[2]={
                                    no:2,
                                    name: this.third_location_name,
                                    lat:place.geometry.location.lat(),
                                    lng:place.geometry.location.lng(),
                                    location_selection:false
                                  };
                this.loadmap(3);
            }
            else{console.log('page > getPlaceDetail > status > ', status );}
        })
        this.appProvider.current.edit_location_data=false;
        let locationDetails = this.modalCtrl.create(FillLocationDetailPage,{location:"DÉTAILS DE LA TROISIÈME ADRESSE",location_name:this.third_location_name});
            locationDetails.onDidDismiss(data => {
              console.log('third',data);
              if(data==null){
                this.locations_details[2]={
                  loc_no:2, 
                  oolaga_id:localStorage['oolaga_id'],
                  latitude:this.locations[2].lat,
                  longitude:this.locations[2].lng,
                  location_name:this.locations[2].name,
                  curbside:null,
                  inhome:null,
                  unit_nu:null,
                  stairs:null,
                  elevator:null,
                  ride:null,
                  parking_info:null,
				  iwillbehelping:null
                }
              }else{
                this.locations_details[2]={
                  loc_no:2, 
                  oolaga_id:localStorage['oolaga_id'],
                  latitude:this.locations[2].lat,
                  longitude:this.locations[2].lng,
                  location_name:this.locations[2].name,
                  curbside:data.curbside,
                  inhome:data.inhome,
                  unit_nu:data.unit_nu,
                  stairs:data.stairs,
                  elevator:data.elevator,
                  ride:data.ride,
                  parking_info:data.parking_info,
				  iwillbehelping:data.iwillbehelping
                }
              }
              console.log(this.locations_details)
              this.appProvider.current.locations=this.locations_details;
            });
            locationDetails.present();
      }
      else if(location_no==4){
        this.forth_location_name=item.description;
        this.autocompleteItems4 = [];
        this.placesService.getDetails(request, (place,status)=>{
          if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('page > getPlaceDetail > place > ', place);
                this.locations[3]={
                                    no:3,
                                    name: this.forth_location_name,
                                    lat:place.geometry.location.lat(),
                                    lng:place.geometry.location.lng(),
                                    location_selection:false
                                  };
                this.loadmap(4);
                                  console.log(this.locations)
            }
            else{console.log('page > getPlaceDetail > status > ', status );}
        })
        this.appProvider.current.edit_location_data=false;
        let locationDetails = this.modalCtrl.create(FillLocationDetailPage,{location:"DÉTAILS DE LA QUATRIÈME ADRESSE ",location_name:this.forth_location_name});
            locationDetails.onDidDismiss(data => {
              console.log('forth',data);
              if(data==null){
                this.locations_details[3]={
                  loc_no:3, 
                  oolaga_id:localStorage['oolaga_id'],
                  latitude:this.locations[3].lat,
                  longitude:this.locations[3].lng,
                  location_name:this.locations[3].name,
                  curbside:null,
                  inhome:null,
                  unit_nu:null,
                  stairs:null,
                  elevator:null,
                  ride:null,
                  parking_info:null,
				  iwillbehelping:null
                }
              }else{
                this.locations_details[3]={
                  loc_no:3, 
                  oolaga_id:localStorage['oolaga_id'],
                  latitude:this.locations[3].lat,
                  longitude:this.locations[3].lng,
                  location_name:this.locations[3].name,
                  curbside:data.curbside,
                  inhome:data.inhome,
                  unit_nu:data.unit_nu,
                  stairs:data.stairs,
                  elevator:data.elevator,
                  ride:data.ride,
                  parking_info:data.parking_info,
				  iwillbehelping:data.iwillbehelping
                }
              }
              console.log(this.locations_details)
              this.appProvider.current.locations=this.locations_details;
            });
            locationDetails.present();
      }
  }
  ngOnInit(){
    this.acService = new google.maps.places.AutocompleteService();        
    this.autocompleteItems1 = [];
    this.autocompleteItems2 = [];
    this.autocompleteItems3 = [];
    this.autocompleteItems4 = [];
    let mapEle

      mapEle = document.getElementById('map');

      this.map = new google.maps.Map(mapEle,{
      center: {lat:37.09024,lng: -95.712891},
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
      });
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      google.maps.event.trigger(mapEle, 'resize');
      });
    if(localStorage['edit_draft_oolaga']==true || localStorage['edit_draft_oolaga']=='true'){
      console.log('draft location page')
      console.log(localStorage['locations'].length)
    }
    this.appProvider.current.locations ? this.loadLocations() : console.log('asd');
    // if(this.appProvider.current.summary_edit_location=true){
    //   this.loadLocations();
    // }
  }
  add_next_location(){
    if(!this.third_location){
      this.third_location=!this.third_location;
      this.second_location_label=' ';
    }
    else if(this.third_location && !this.forth_location){
      this.forth_location=!this.forth_location;
      this.third_location_label=' ';
    }
  }
  updateSearch(value){
     console.log('modal > updateSearch');
      let config;
      if(value==1){
          if (this.first_location_name == '') {
            this.autocompleteItems1 = [];
            return;
          }
          config = { 
            types:  ['geocode'],
            input: this.first_location_name, 
          } 
      }
      if(value==2){
          if (this.second_location_name == '') {
            this.autocompleteItems2 = [];
            return;
          }
          config = { 
            types:  ['geocode'],
            input: this.second_location_name, 
          } 
      }
      if(value==3){
          if (this.third_location_name == '') {
            this.autocompleteItems3 = [];
            return;
          }
          config = { 
            types:  ['geocode'],
            input: this.third_location_name, 
          } 
      }
      if(value==4){
          if (this.forth_location_name == '') {
            this.autocompleteItems4 = [];
            return;
          }
          config = { 
            types:  ['geocode'],
            input: this.forth_location_name, 
          } 
      }
    if(this.count){
      let self = this;
      this.acService.getPlacePredictions(config, function (predictions, status) {
          console.log('modal > getPlacePredictions > status > ', status);
          if(value==1 && predictions){
              self.autocompleteItems1 = [];
              if(predictions){
                 predictions.forEach(function (prediction) {              
                self.autocompleteItems1.push(prediction);
              });
              }            
             
          }
          if(value==2 && predictions){
              self.autocompleteItems2 = [];            
              predictions.forEach(function (prediction) {              
                  self.autocompleteItems2.push(prediction);
              });
          }
          if(value==3 && predictions){
              self.autocompleteItems3 = [];            
              predictions.forEach(function (prediction) {              
                  self.autocompleteItems3.push(prediction);
              });
          }
          if(value==4 && predictions){
              self.autocompleteItems4 = [];            
              predictions.forEach(function (prediction) {              
                  self.autocompleteItems4.push(prediction);
              });
          }
      });
      this.count=false;
      setTimeout(()=>{
        this.count=true;
      },500)
    }
  }
  nextSubmit(){
    let loader = this.loadingCtrl.create();
        loader.present();
        localStorage['locations']=JSON.stringify(this.locations_details);
        this.appProvider.current.locations=this.locations_details;
        this.appProvider.consoleData();
		//alert(JSON.stringify(this.locations_details));
        this.http.post(ENV.api+'/webserviceaddLocation', this.locations_details).subscribe(data => {
             loader.dismiss();
             if(JSON.parse(data._body).response==true){
               console.log(JSON.parse(data._body).location)
                if(JSON.parse(data._body).location.length>=2){
                  this.appProvider.current.src_location=JSON.parse(data._body).location[0].id;
                  this.appProvider.current.dst_location=JSON.parse(data._body).location[JSON.parse(data._body).location.length-1].id;
                  this.appProvider.current.way_point1=null;
                  this.appProvider.current.way_point2=null;
                  if(JSON.parse(data._body).location.length==3){
                    this.appProvider.current.way_point1=JSON.parse(data._body).location[1].id;
                    this.appProvider.current.way_point2=null;
                  }
                  if(JSON.parse(data._body).location.length==4){
                    this.appProvider.current.way_point1=JSON.parse(data._body).location[1].id;
                    this.appProvider.current.way_point2=JSON.parse(data._body).location[2].id;
                  }
                }
                this.http.post(ENV.api+'/webservicehelper_edit', {
                                                          oolaga_id:this.appProvider.current.oolaga_id,
                                                          src_location:this.appProvider.current.src_location,
                                                          dst_location:this.appProvider.current.dst_location,
                                                          way_point1:this.appProvider.current.way_point1,
                                                          way_point2:this.appProvider.current.way_point2
				})
                .subscribe(data => {
                })
                  if(this.appProvider.current.summary_edit_location){
                    this.navCtrl.pop()
                  }
                  else{
                    this.navCtrl.push(ItemDetailPage,{ locationId: JSON.parse(data._body).location });
                  }
             }
             else{
               let alert= this.alertCtrl.create({
                 title:'oops..',
                 message:'Something wrong...',
                 buttons:['Ok']
               })
               alert.present();
             }
         },err=>{
           loader.dismiss();
           let alert= this.alertCtrl.create({
               title:'oops..',
               message:'please check your Internet connection',
               buttons:['Ok']
             })
             alert.present();
         })
  }
  submit(value){
    if(value==0){this.navCtrl.pop()}
    else if(value==1){
      if(this.first_location_name != null && this.second_location_name != null && this.third_location==false && this.forth_location==false)
      { 
        if(this.locations_details.length==2 && 
           this.locations_details[0].oolaga_id!=null && 
           this.locations_details[0].latitude!=null &&
           this.locations_details[0].longitude!=null &&
           this.locations_details[0].location_name!=null &&
           this.locations_details[1].oolaga_id!=null && 
           this.locations_details[1].latitude!=null &&
           this.locations_details[1].longitude!=null &&
           this.locations_details[1].location_name!=null
          ){
          this.nextSubmit();
        }
        else{
          let alert= this.alertCtrl.create({
               title:'Oups',
               message:'Veuillez saisir une adresse',
               buttons:['Ok']
             })
             alert.present();
        }
      }else if(this.first_location_name != null && this.second_location_name != null && this.third_location_name != null && this.third_location==true && this.forth_location==false){
        if(this.locations_details.length==3 && 
           this.locations_details[0].oolaga_id!=null && 
           this.locations_details[0].latitude!=null &&
           this.locations_details[0].longitude!=null &&
           this.locations_details[0].location_name!=null &&
           this.locations_details[1].oolaga_id!=null && 
           this.locations_details[1].latitude!=null &&
           this.locations_details[1].longitude!=null &&
           this.locations_details[1].location_name!=null &&
           this.locations_details[2].oolaga_id!=null && 
           this.locations_details[2].latitude!=null &&
           this.locations_details[2].longitude!=null &&
           this.locations_details[2].location_name!=null
          ){
          this.nextSubmit();
        }
        else{
        let alert= this.alertCtrl.create({
               title:'Oups',
               message:'Veuillez saisir une adresse',
               buttons:['Ok']
             })
             alert.present();
        }
      }else if(this.first_location_name != null && this.second_location_name != null && this.third_location_name != null && this.forth_location_name != null && this.third_location==true && this.forth_location==true){
        if(this.locations_details.length==4 && 
           this.locations_details[0].oolaga_id!=null && 
           this.locations_details[0].latitude!=null &&
           this.locations_details[0].longitude!=null &&
           this.locations_details[0].location_name!=null &&
           this.locations_details[1].oolaga_id!=null && 
           this.locations_details[1].latitude!=null &&
           this.locations_details[1].longitude!=null &&
           this.locations_details[1].location_name!=null &&
           this.locations_details[2].oolaga_id!=null && 
           this.locations_details[2].latitude!=null &&
           this.locations_details[2].longitude!=null &&
           this.locations_details[2].location_name!=null &&
           this.locations_details[3].oolaga_id!=null && 
           this.locations_details[3].latitude!=null &&
           this.locations_details[3].longitude!=null &&
           this.locations_details[3].location_name!=null
          ){
          this.nextSubmit();
        }
        else{
          let alert= this.alertCtrl.create({
               title:'Oups',
               message:'Veuillez saisir une adresse',
               buttons:['Ok']
             })
             alert.present();
        }
      }
      else{
        let alert= this.alertCtrl.create({
               title:'Oups',
               message:'Veuillez saisir une adresse',
               buttons:['Ok']
             })
             alert.present();
      }  
    }
  }
  save_locations(){
      this.http.post(ENV.api+'/webservicehelper_edit', {
                                                        olaga_id:this.appProvider.current.oolaga_id,
                                                        src_location:this.appProvider.current.src_location,
                                                        dst_location:this.appProvider.current.dst_location,
                                                        way_point1:this.appProvider.current.way_point1,
                                                        way_point2:this.appProvider.current.way_point2
                                                      })
      .subscribe(data => {
      })
  }
  loadmap(value){
    if(this.markers!=null){
      for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }
    }
    console.log(this.locations.length)
    console.log(this.markers)
    if(value >= 1)
    {
      var pin =new google.maps.LatLng(this.locations[0].lat,this.locations[0].lng)
      var icon1 = {
                url: 'assets/icon/pin-1.png', // url
                scaledSize: new google.maps.Size(33, 46), // scaled size
            };
      var marker = new google.maps.Marker({
          position: pin,
          icon:icon1,
        });
      this.markers[0]=marker;
    }
    if(value >= 2)
    {
      var pin =new google.maps.LatLng(this.locations[1].lat,this.locations[1].lng)
      var icon1 = {
                url: 'assets/icon/pin-2.png', // url
                scaledSize: new google.maps.Size(33, 46), // scaled size
            };
      var marker = new google.maps.Marker({
          position: pin,
          icon:icon1,
        });
      this.markers[1]=marker;
    } 
    if(value >= 3)
    {
      var pin =new google.maps.LatLng(this.locations[2].lat,this.locations[2].lng)
      var icon1 = {
                url: 'assets/icon/pin-3.png', // url
                scaledSize: new google.maps.Size(33, 46), // scaled size
            };
      var marker = new google.maps.Marker({
          position: pin,
          icon:icon1,
        });
      this.markers[2]=marker;
    }
    if(value == 4)
    {
      var pin =new google.maps.LatLng(this.locations[3].lat,this.locations[3].lng)
      var icon1 = {
                url: 'assets/icon/pin-4.png', // url
                scaledSize: new google.maps.Size(33, 46), // scaled size
            };
      var marker = new google.maps.Marker({
          position: pin,
          icon:icon1,
        });
      this.markers[3]=marker;
    }
    for (var i = 0; i < this.markers.length; i++) {
          if(this.locations[i].lng==null){
            this.markers[i].setMap(null);
          }else{
            this.markers[i].setMap(this.map);
          }     
        }
      var bounds = new google.maps.LatLngBounds();
        for(var i=0;i<this.markers.length;i++) {
           if(this.locations[i].lng==null){
           }else{
             bounds.extend(this.markers[i].getPosition());
           }
        }
      this.map.setCenter(bounds.getCenter());
      this.map.fitBounds(bounds);
      if(this.markers.length==1){
        this.map.setZoom(10);
      }
      else{
      this.map.setZoom(this.map.getZoom());
      }
   }
}
