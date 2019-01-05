import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController} from 'ionic-angular';
import {SelectTimeDatePage} from '../select-time-date/select-time-date';
import {AppProvider} from '../../providers/app-provider'
import { Http } from '@angular/http';
import {ENV} from '../../app/env';
@Component({
  selector: 'page-helper-selection',
  templateUrl: 'helper-selection.html'
})
export class HelperSelectionPage {
  selection1:boolean=false;
  selection2:boolean=false;
  selection3:boolean=false;
  selection:string='2 Helpers';
  editable;
  user_help:boolean=false;
  http;
  constructor(public loadingCtrl:LoadingController,http:Http,private appProvider:AppProvider,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.get('data')=='edit'){this.editable=true}
    this.http=http;
  }
  ionViewDidEnter(){
    if(this.appProvider.current.helper_no=='1 Helper + 1 Van'){
      this.selectcard(1);
    }
    else if(this.appProvider.current.helper_no=='1 Helper + 1 Van + You'){
      this.selectcard(2);
    }
    else if(this.appProvider.current.helper_no=='2 Helper + 1 Van'){
      this.selectcard(3);
    }
    else{
      console.log('Empty Data')
    }
  }
  help(){
    let alert = this.alertCtrl.create({
      title: 'Helper Selection',
      message: 'This is where you give us more details about the help you need. In addition to a helper and his/her van, you can specify that you will help out or that you need an additional helper for labor only.',
      buttons: ['OK']
    })
    alert.present();
  }
  selectcard(value)
  {
    if(value==1){
      this.selection1=true;
      this.selection2=false;
      this.selection3=false;
      this.selection='1 Helper';
      localStorage['helper_no']='1 Helper + 1 Van'
      this.appProvider.current.helper_no='1 Helper + 1 Van';
      this.appProvider.current.helper_number=1;
      }
    else if(value==2){
      this.selection2=true;
      this.selection1=false;
      this.selection3=false;
      this.selection='2 Helpers';
      localStorage['helper_no']='1 Helper + 1 Van + You'
      this.appProvider.current.helper_no='1 Helper + 1 Van + You';
      this.appProvider.current.helper_number=2;
    }
    else if(value==3){
      this.selection3=true;
      this.selection1=false;
      this.selection2=false;
      this.selection='2 Helpers';
      localStorage['helper_no']='2 Helper + 1 Van'
      this.appProvider.current.helper_no='2 Helper + 1 Van';
      this.appProvider.current.helper_number=3;
    }
   }
   submit(value)
   {  
      if(value==0){
          this.navCtrl.pop()
      }
      else if(value==1)
      {    
        let loader = this.loadingCtrl.create();
        loader.present();
          if(this.appProvider.current.summary_edit_helper){
            console.log('updated')
            this.http.post(ENV.api+'/webservicehelper_edit',{
                                       oolaga_id:this.appProvider.current.oolaga_id,
                                       helper_type:this.appProvider.current.helper_no
                                     })
            .subscribe(data=>{
              console.log(data);
              loader.dismiss();
            })
            this.navCtrl.pop()
          }
          else if(this.editable)
          {
            localStorage['helper_selection']=this.selection;
            this.http.post(ENV.api+'/webservicehelper_edit',{
                                       oolaga_id:this.appProvider.current.oolaga_id,
                                       helper_type:this.appProvider.current.helper_no
                                     })
            .subscribe(data=>{
              console.log(data);
              loader.dismiss();
            })
            this.navCtrl.pop()
          }
          else{
            if(this.selection1==true || this.selection2==true || this.selection3==true)
            {
              // if(localStorage['helper_no']=='2 Helper + 1 Van'){
              //   let alert = this.alertCtrl.create({
              //       title: 'Alert',
              //       message: 'Select Helper in lieu of moving to the next step',
              //       buttons: ['OK']
              //     })
              //     alert.present();
              // }
              this.http.post(ENV.api+'/webservicehelper_edit',{
                                         oolaga_id:this.appProvider.current.oolaga_id,
                                         helper_type:this.appProvider.current.helper_no
                                       })
              .subscribe(data=>{
                console.log(data);
                loader.dismiss();
              })
              localStorage['user_help']=this.user_help;
              localStorage['helper_selection']=this.selection;
         		  this.navCtrl.push(SelectTimeDatePage,{});
            }
            else{
              alert('Select Helper');
              loader.dismiss();
            }
          }
      }
   }
}
