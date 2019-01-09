import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { AlertController }from 'ionic-angular';
import { LoadingController } from 'ionic-angular'
import { LoginPage } from '../login/login'
import { Transfer,Camera } from 'ionic-native';
import { ENV } from '../../app/env'; 
import { AppProvider } from '../../providers/app-provider'

import { Device } from '@ionic-native/device';
import { Events } from 'ionic-angular';
import { Validators, FormBuilder} from '@angular/forms';
const FileTransfer = new Transfer(); //---------mobile code
//declare var FileTransfer //-------browser code

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
    edit:boolean=true;
    profile_pic:string;
    firstname;
    lastname;
    email;
    password;
    number;
    http;
    id;
    pic:boolean=false;
  constructor(public device:Device,public events:Events,
              public formBuilder:FormBuilder,
              private appProvider:AppProvider,
              http:Http,
              public loadingCtrl:LoadingController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl:AlertController,
              public actionSheetCtrl:ActionSheetController) {
   this.profile_pic=localStorage['profile_pic']; 
   this.firstname=localStorage['user_name'];
   this.lastname=localStorage['lastname'];
   this.email=localStorage['email'];
   this.number=localStorage['number'];
   this.id=localStorage['user_id']
   if(localStorage['profile_pic']==''){this.pic=false}
   else{this.pic=true}
   this.http=http;
  }
  picOption(value){
   //FileTransfer = new Transfer();
	//------------browser code
    let data={
      id:this.id,
      pic:''
    }
    if(value==1){
      Camera.getPicture({
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPEG,
          correctOrientation: true,
          targetHeight:500,
          targetWidth:500,
          saveToPhotoAlbum: false
      }).then((imageData) => {
          this.profile_pic = "data:image/jpeg;base64," + imageData;
          localStorage['profile_pic'] = this.profile_pic;
          this.events.publish('changeProfileData',true);

          var options: any;
          options = {
            fileKey: "image",
            chunkedMode: false,
            mimeType: "image/jpg",
          }
          FileTransfer.upload(this.profile_pic, ENV.api+"/webservicefileupload1/" + this.id ,options)
           .then(data => {
             // alert(JSON.stringify(data));
           }, (err) => {
             // alert(JSON.stringify(err))
           })

      }, (err) => {})
    }else if (value==2){
      Camera.getPicture({
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          encodingType: Camera.EncodingType.JPEG,
          correctOrientation: true,
          targetHeight:500,
          targetWidth:500,
          saveToPhotoAlbum: false
        }).then((imageData) => {
          this.profile_pic = "data:image/jpeg;base64," + imageData;
          localStorage['profile_pic'] = this.profile_pic;
          this.events.publish('changeProfileData',true);

          var options: any;
          options = {
            fileKey: "image",
            chunkedMode: false,
            mimeType: "image/jpg",
          }
          FileTransfer.upload(this.profile_pic, ENV.api+"/webservicefileupload1/" + this.id ,options)
           .then(data => {
             // alert(JSON.stringify(data));
           }, (err) => {
             // alert(JSON.stringify(err))
           })
        }, (err) => {})
    }
  }
  changePic(){
    if(this.edit){
    }else{
      const actionSheet = this.actionSheetCtrl.create({
         title: 'Upload Option',
         buttons: [
           {
             text: 'Camera',
             icon:'ios-camera-outline',
             role: 'destructive',
             handler: () => {
                 this.picOption(1)
             }
           },
           {
             text: 'Gallery',
             icon:'ios-image-outline',
             role: 'destructive',
             handler: () => {
               this.picOption(2)
             }
           },
           {
             text: 'Cancel',
             icon:'md-close',
             role: 'cancel',
             handler: () => {
             }
           }
         ]
       });
       actionSheet.present();

    }
  }

   editprofile(){
     if(this.edit==false){
       this.saveprofile();
     }else{
       this.edit= !this.edit;
     }
   }
   saveprofile(){
     this.password==''?this.password=null:'';
     if(this.password && this.password.length<8 && this.password.length!=0)
     {
      let alert = this.alertCtrl.create({
                                          title: 'Oops..!',
                                          subTitle: 'Please enter minimum 8 character password',
                                          buttons: ['OK']
                                        });
          alert.present();
     }
     else{
          let loader = this.loadingCtrl.create();
              loader.present();

          var data = JSON.stringify({
                                      id:this.id,
                                      // email:this.email,
                                      firstname:this.firstname,
                                      lastname:this.lastname,
                                      password:this.password,
                                      number:this.number
                                    });
          this.http.post(ENV.api+'/webserviceeditprofile', data).subscribe(data => {
              loader.dismiss();
                  var message=JSON.parse(data._body).message;
                  if(JSON.parse(data._body).response==true){
                      let alert = this.alertCtrl.create({
                          title: 'Profile updated successfully',
                          buttons: ['OK']
                      });
                      alert.present();
                       localStorage['user_name']=this.firstname;
                       localStorage['lastname']=this.lastname;
                       localStorage['email']=this.email;
                       localStorage['number']=this.number;
                       localStorage['password']=this.password;
                       this.events.publish('changeProfileData',true);
                       this.edit= !this.edit;

                  }
                  else if(JSON.parse(data._body).response==false){
                      let alertf = this.alertCtrl.create({
                          title: 'Error!',
                          subTitle: message,
                          buttons: ['OK']
                      });
                      alertf.present();
                  }
              console.log(JSON.parse(data._body).response);
          }, error => {
              console.log(error);
          });
     }
   }

  doFbLogout(){
  }
   logout() {
    let confirm = this.alertCtrl.create({ title: 'Logout',
      message: "Are you sure?.",
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              let loading = this.loadingCtrl.create()
                  loading.present();
                  localStorage.clear();
                  this.navCtrl.setRoot(LoginPage);
                  this.http.post(ENV.api+'/webservicelogout',({device_id:this.device.uuid})).subscribe(data => {},err=>{})
              loading.dismiss();
            }
          }
        ]
      });
      confirm.present();
  }
}


