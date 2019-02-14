import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ViewController, LoadingController } from 'ionic-angular';
import { AppProvider } from '../../providers/app-provider'
import { Transfer } from 'ionic-native';
import { FileChooser } from '@ionic-native/file-chooser';
import { ENV } from '../../app/env'
@Component({
  selector: 'page-fill-location-detail',
  templateUrl: 'fill-location-detail.html'
})
export class FillLocationDetailPage {
  locationTitle;
  location_name;
  service_name
  iwillhelp=0;
  unit_nu:any=null;
  stairs:number=0  ;
  elevator:boolean=false;
  ride:boolean=false;
  parking_info:string=null;
  count=0;
  data;
  a;
  store_name
  purchaser
  order_number
  phone
  additional_contact;
  file_name="Please add the receipt of your purchase";
  curb:boolean=false;
  inhome:boolean=false;
  v;
  constructor(public loadingCtrl:LoadingController,private fileChooser: FileChooser,private appProvider:AppProvider,public viewCtrl:ViewController,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
  	this.locationTitle=this.navParams.get('location');
    this.location_name=this.navParams.get('location_name');

	if(this.locationTitle=='DÉTAILS DE LA PREMIÈRE ADRESSE'){this.v=0;this.a=0}
    if(this.locationTitle=='DÉTAILS DE LA SECONDE ADRESSE'){this.v=1;this.a=1}
    if(this.locationTitle=='DÉTAILS DE LA TROISIÈME ADRESSE'){this.v=2;this.a=2}
    if(this.locationTitle=='DÉTAILS DE LA QUATRIÈME ADRESSE'){this.v=3;this.a=3}
    if(this.appProvider.current.edit_location_data){
      this.appProvider.current.locations[this.v].curbside==0 ? this.curb=false : this.curb=true;
      this.appProvider.current.locations[this.v].inhome==0 ? this.inhome=false : this.inhome=true;
      this.appProvider.current.locations[this.v].unit_nu ? this.unit_nu=this.appProvider.current.locations[this.v].unit_nu : this.unit_nu;
      this.appProvider.current.locations[this.v].stairs ? this.stairs=this.appProvider.current.locations[this.v].stairs : this.stairs;
      this.appProvider.current.locations[this.v].elevator==0 ? this.elevator=false : this.elevator=true;
      this.appProvider.current.locations[this.v].ride==0 ? this.ride=false : this.ride=true;
      this.appProvider.current.locations[this.v].parking_info ? this.parking_info=this.appProvider.current.locations[this.v].parking_info : this.parking_info;
      this.appProvider.current.locations[this.v].store_name ? this.store_name=this.appProvider.current.locations[this.v].store_name : this.store_name;
      this.appProvider.current.locations[this.v].additional_contact ? this.additional_contact=this.appProvider.current.locations[this.v].additional_contact : this.additional_contact;
      this.appProvider.current.locations[this.v].order_number ? this.order_number=this.appProvider.current.locations[this.v].order_number : this.order_number;
      this.appProvider.current.locations[this.v].phone ? this.phone=this.appProvider.current.locations[this.v].phone : this.phone;
      this.appProvider.current.locations[this.v].purchaser ? this.purchaser=this.appProvider.current.locations[this.v].purchaser : this.purchaser;
    }
  }
  checkUnit_nu(){
    console.log(isNaN(this.unit_nu[this.unit_nu.length-1]));
    /* if(isNaN(this.unit_nu[this.unit_nu.length-1])){
      this.unit_nu= this.unit_nu.slice(0, -1);
    }else{} */
  }
  check(value){
      if(value==1 && this.inhome==true){
        this.inhome=false;
        this.count=0
        this.elevator=false
        this.ride=false
      }
      else if(value==2 && this.curb==true){
        this.curb=false;
      }
	  
	  if(value==3){
		 this.iwillhelp=1; 
	  }
  }
  selectdoc(){
    this.fileChooser.open()
    .then(uri => {
                  this.upload(uri);
                 })
    .catch(e => console.log(e));
  }
  upload(uri){
    var loader = this.loadingCtrl.create()
    loader.present();
    var options = {fileKey: "doc",chunkedMode: false}
    var FileTransfer = new Transfer();
    FileTransfer.upload(uri, ENV.api+'/webserviceupload_doc/'+this.appProvider.current.oolaga_id , options)
    .then(data => {
      loader.dismiss();
      this.file_name="File Uploaded";
      console.log(data)
     }, (err) => {
       loader.dismiss();
     })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FillLocationDetailPage');
  }
  submitdata(){
    // this.curb==true ? this.appProvider.current.locations[this.v].curbside=1 : this.appProvider.current.locations[this.v].curbside=0;
    // this.inhome==true ? this.appProvider.current.locations[this.v].inhome=1 : this.appProvider.current.locations[this.v].inhome=0
    // this.unit_nu ? this.appProvider.current.locations[this.v].unit_nu=this.unit_nu : '';
    // this.stairs ? this.appProvider.current.locations[this.v].stairs=this.stairs : '';
    // this.elevator==true ? this.appProvider.current.locations[this.v].elevator=1:this.appProvider.current.locations[this.v].elevator=0;
    // this.ride==true ? this.appProvider.current.locations[this.v].ride=1:this.appProvider.current.locations[this.v].ride=0;
    // this.parking_info ? this.appProvider.current.locations[this.v].parking_info=this.parking_info : '';
    // this.store_name ? this.appProvider.current.locations[this.v].store_name=this.store_name : '';
    // this.additional_contact ? this.appProvider.current.locations[this.v].additional_contact=this.additional_contact : '';
    // this.order_number ? this.appProvider.current.locations[this.v].order_number=this.order_number : '';
    // this.phone ? this.appProvider.current.locations[this.v].phone=this.phone : '';
    // this.purchaser ? this.appProvider.current.locations[this.v].purchaser=this.purchaser : '';
    this.data={
        curbside:this.curb,
        inhome:this.inhome,
        unit_nu:this.unit_nu,
        stairs:this.stairs,
        elevator:this.elevator,
        ride:this.ride,
        parking_info:this.parking_info,
        store_name:this.store_name,
        purchaser:this.purchaser,
        order_number:this.order_number,
        phone:this.phone,
        additional_contact:this.additional_contact,
		iwillbehelping:this.iwillhelp
      }
      this.viewCtrl.dismiss(this.data);
  }
  submit(){
    if(this.curb){
      this.submitdata()
    }
    else if(this.inhome){
      if(!this.elevator){
        if(this.stairs>=-5){
          this.submitdata()
        }
        else{
          let a=this.alertCtrl.create({
            title:'Please select # of floors',
            buttons:['Ok']
          })
          a.present();
        }
      }
      else{
          this.submitdata()
      }
    }
    else{
      let a=this.alertCtrl.create({
        title:'Veuillez sélectionner “Pas-de-porte” ou “À l\'intérieur',
        buttons:['Ok']
      })
      a.present();
    }
  }
  ionViewWillLeave(){
    
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
    if(this.count!==-5)
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
                //confirm.present();
    }
  }

}
