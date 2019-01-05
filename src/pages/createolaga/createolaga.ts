import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController ,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AppProvider} from '../../providers/app-provider'
import { ENV } from '../../app/env'
//--------------------------------------------
import { LocationSelectPage } from '../location-select/location-select';
import { LaboronlyPage} from '../laboronly/laboronly'
@Component({
  selector: 'page-createolaga',
  templateUrl: 'createolaga.html'
})
export class CreateolagaPage {
  http;
  service;
  service_type:number;
  service_id:number;
  service_name;
  service_description='';
  service_image;
  hightlightStatus;
  editable:boolean=false;
  enablenext:boolean;
  constructor(http:Http,
              public loadingCtrl:LoadingController,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl:AlertController,
              private appProvider: AppProvider ) {
    this.http=http;
    this.service_type=1;
    if(this.navParams.get('data')=='edit'){this.editable=true}
  }

help(){
  let alert = this.alertCtrl.create({
    title: 'Sélection de la catégorie',
    message: "C'est à cette étape que vous sélectionnez votre type de projet. Choisissez la catégorie qui correspond le mieux à vos besoins pour que votre Helper soit bien préparé.",
    buttons: ['OK']
  })
  alert.present();
}

details(value){
  this.service_description=value;
}

  ionViewDidLoad(){
    if(this.appProvider.current.enable_draft==true){
    }else{
      this.appProvider.createNew();
    }
    let loader = this.loadingCtrl.create();
    loader.present();
    this.http.get(ENV.api+"/webserviceoolagaServices").subscribe(data => {
        if(JSON.parse(data._body).response==true)
        {
          this.service=JSON.parse(data._body).services;
          loader.dismiss();
          if(this.appProvider.current.summary_edit_service){
            this.service_description=this.appProvider.current.service_description;
            this.hightlightStatus=this.appProvider.current.service_id;
            console.log(this.hightlightStatus)
          }
          else if(localStorage['edit_draft_oolaga']==true || localStorage['edit_draft_oolaga']=='true'){
            this.service_description=localStorage['service_description'];
            this.hightlightStatus=localStorage['service_no']
            this.enablenext=true;
          }
          else{
            localStorage['service_type']=this.service[0].service_id;
            localStorage['service_image']=this.service[0].service_image;
            localStorage['service_name']=this.service[0].service_name;
            localStorage['service_description']=this.service[0].service_description;
          }
        }
        else{loader.dismiss();}
      },err => {alert(JSON.stringify('error'+err));
      loader.dismiss();
    })
    
  }
  selectcard(type,img,name,description,i){
     if(i==0)
    {
      let confirm=this.alertCtrl.create({
                  title: "Don d'objets",
                  message:'Certains objets (comme les matelas) ne sont généralement pas acceptés dans les centres de dons <br> <br> Assurez-vous que votre don sera accepté par le centre de donation sélectionné ou vous serez peut-être responsable de frais supplémentaires',
                  buttons:[
                   {
                     text:'OK',
                     handler:()=>{},
                   }]
              });
                  confirm.present();
    }
    this.enablenext=true;
    this.service_type=type;
    localStorage['service_no']=i+1;
    localStorage['service_type']=type;
    localStorage['service_image']=img;
    localStorage['service_name']=name;
    localStorage['service_description']=description;

  }
  
  nextpage(){
    this.appProvider.current.service_description=localStorage['service_description']
    this.appProvider.current.service_id=localStorage['service_type']
    this.appProvider.current.service_image=localStorage['service_image']
    this.appProvider.current.service_name=localStorage['service_name']
    if(this.editable || this.appProvider.current.oolaga_created || this.appProvider.current.summary_edit_service){
      let loader = this.loadingCtrl.create();
      loader.present();
      var link = ENV.api+'/webserviceeditOolagaService';
      var data = JSON.stringify({ 
                                  oolaga_id:this.appProvider.current.oolaga_id,
                                  service_type:this.service_type
                                });
          this.http.post(link, data).subscribe(data => {
            loader.dismiss();
            if(JSON.parse(data._body).response==true)
              {
                if(this.appProvider.current.summary_edit_service){
                  localStorage['draftOolaga']=JSON.stringify(data.json().data);
                  this.navCtrl.pop();   
                }
                else if(this.appProvider.current.oolaga_created)
                {
                  if(this.service_type==7){
                    this.navCtrl.push(LaboronlyPage,{})
                  }
                  else{
                      this.navCtrl.push(LocationSelectPage,{}); 
                  }
                }
                else{
                  this.navCtrl.pop();   
                }
              }
              else{alert('error')}
          })
    }
    else
    {
      if(this.enablenext){
      let loader = this.loadingCtrl.create();
      loader.present();
      var link = ENV.api+'/webserviceaddOolaga';
      var data = JSON.stringify({ 
                                  customer_id:localStorage['user_id'],
                                  service_type:this.service_type
                                });
      this.http.post(link, data).subscribe(data => {
            loader.dismiss();
            if(JSON.parse(data._body).response==true)
              {
                localStorage['oolaga_id']=JSON.parse(data._body).oolaga_id;
                this.appProvider.current.oolaga_id=JSON.parse(data._body).oolaga_id;
                this.appProvider.current.oolaga_created=true;
              }
              else{alert('error')}
          })
      if(this.service_type==7){
          this.navCtrl.push(LaboronlyPage,{})
      }
      else{
          this.navCtrl.push(LocationSelectPage,{}); 
      }
      }else{
        let alert=this.alertCtrl.create({
          title:'Please select ooLaga',
          buttons:[{
                     text:'Ok',
                     handler:()=>{}
                   }]
                  });
            alert.present();
      }
    }
  }
}
