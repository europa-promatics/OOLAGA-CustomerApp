import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage }from '../login/login';
import { AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Transfer,Camera } from 'ionic-native';
import { Validators, FormBuilder,AbstractControl,ValidatorFn  } from '@angular/forms';
import { ENV } from '../../app/env';
import { SaveCardDetailsPage } from '../save-card-details/save-card-details';
import { PaymentPage } from '../payment/payment'
declare var FileTransfer;
@Component({
  selector: 'page-registeration',
  templateUrl: 'registeration.html'
})
export class RegisterationPage {
pushPage;
data;
firstname;
lastname;
email;
password;
phone;
about;
http;
user_id;
mangoUserId;
public pic:string;
loader;
register;
confirm;
constructor(public formBuilder: FormBuilder,public popoverCtrl:PopoverController ,public navCtrl: NavController, public navParams: NavParams, http: Http, public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
   this.firstname='';
   this.lastname='';
   this.email='';
   this.password='';
   this.confirm='';
   this.phone='';
   this.about='';
   this.http = http;
   this.data = {};
   this.data.response = '';
            let emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   // let emailRegex = '^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
   this.register = formBuilder.group({
     firstname:['' , Validators.compose([Validators.maxLength(30),Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
     lastname:['' , Validators.compose([Validators.maxLength(30),Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
     email:['' , Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
     password:['' , Validators.compose([Validators.maxLength(25),Validators.minLength(8), Validators.required])],
     confirm:['' , Validators.compose([Validators.maxLength(25),Validators.minLength(8), Validators.required, this.equalto('password')])],
     phone:['', Validators.compose([Validators.minLength(10), Validators.pattern('[0-9]*'), Validators.required])],
     dob:['',Validators.compose([Validators.required])],
     hearDetailsFrom:['',Validators.compose([Validators.required])]
   });
   console.log('Hello registration Page');
   this.pic = "img/man.png"
 }
equalto(field_name): ValidatorFn {
return (control: AbstractControl): {[key: string]: any} => {

let input = control.value;

let isValid=control.root.value[field_name]==input
if(!isValid) 
return { 'equalTo': {isValid} }
else 
return null;
};
}
 uploadpic(a){
  if(a==2){
    Camera.getPicture({
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: Camera.EncodingType.JPEG,
      targetHeight:500,
      targetWidth:500,
      saveToPhotoAlbum: false
    }).then((imageData) => {
    this.pic = "data:image/jpeg;base64," + imageData;
    }, (err) => {alert('Camera is not Working')})
  }else if(a==1){
    Camera.getPicture({
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true,
      targetHeight:300,
      targetWidth:300,
      saveToPhotoAlbum: false
    }).then((imageData) => {
    this.pic = "data:image/jpeg;base64," + imageData;
    }, (err) => {alert('Camera is not Working')})
  }
 }
 itemTapped(event, item) {
    this.navCtrl.push(RegisterationPage, {
      item: item
    });
  }


 submit() {
   console.log(this.register.controls["dob"].value)
   let dateForMangopay=this.register.controls["dob"].value.split('-');
   let yy=dateForMangopay[0];
   yy=yy.slice(2,4);
   console.log(yy)
   yy=yy
   let dd=dateForMangopay[2];
   let mm=dateForMangopay[1];
   dateForMangopay=dd+mm+yy
   console.log(dateForMangopay)
    //----------------------------------------------------------------------
    console.log(this.register.valid)
    console.log(this.register.dirty)



        if(this.register.valid){
          this.loader = this.loadingCtrl.create();
          this.loader.present();
          var error;
          var data = JSON.stringify(
            {
              firstname:this.register.controls["firstname"].value,
              lastname:this.register.controls["lastname"].value,
              email:this.register.controls["email"].value,
              number:this.register.controls["phone"].value,
              user_type: 0, 
              password:this.register.controls["password"].value,
              hear_aboutus:this.register.controls["hearDetailsFrom"].value,
            });
            this.http.post(ENV.api+'/webservicesignup', data).subscribe(data => {
              this.data.response = data;
              if(JSON.parse(data._body).response==true){
                this.user_id=JSON.parse(data._body).user_id;
                let walletdata =JSON.stringify({
                  user_id:JSON.parse(data._body).user_id,
                  email:this.register.controls["email"].value, 
                  first_name:this.register.controls["firstname"].value, 
                  last_name:this.register.controls["lastname"].value, 
                  dob:+dateForMangopay,
                  hear_aboutus:this.register.controls["hearDetailsFrom"].value, 
                  nationality:'US', 
                  country:'US'
                });

                this.http.post(ENV.api+'/createMangoUser', walletdata).subscribe(data=>{
                  console.log("wallet successfully created");
                  console.log(data);
                  console.log(JSON.parse(data._body).userData);
                  console.log(JSON.parse(data._body).userData.Id);
                  this.mangoUserId=JSON.parse(data._body).userData.Id
                  localStorage['user_id']=this.user_id;
                  localStorage['mango_user_id']=JSON.parse(data._body).userData.Id;
                  console.log(JSON.parse(data._body).walletDetails);
                  console.log(JSON.parse(data._body).walletDetails.Id);
                  if(this.pic == "img/man.png"){
                   this.loader.dismiss();
                   let alert = this.alertCtrl.create({
                        title: 'Thank you!',
                        subTitle: 'Registration Successful please check your email to verify your email address.',
                        buttons: ['OK']
                   });
                     alert.present();
                     this.navCtrl.push(PaymentPage,{'user_id':this.user_id,'mangoUserId':this.mangoUserId})
                  }else{
                    this.submitt(JSON.parse(data._body).user_id);
                  }
                },err=>{
                  console.log(err);
                })
              }
              else if(JSON.parse(data._body).response==false){
                error=JSON.parse(data._body).message;
                let alert = this.alertCtrl.create({title: 'Error!',subTitle: error,buttons: ['OK']});
                alert.present();
                this.loader.dismiss();
              }
            }, error => {
              console.log(error);
            });
        } 	
        else{
          console.log('else')
          if(this.register.controls["firstname"].value==null || this.register.controls["firstname"].value==''){
            let alert = this.alertCtrl.create({
                 title: 'Oups!',
                 subTitle: 'Veuillez saisir un prénom',
                 buttons: ['OK']
                 });
                 alert.present();
          }
          else if(!this.register.controls["firstname"].valid){
            let alert = this.alertCtrl.create({
                 title: 'Oups!',
                 subTitle: 'Veuillez saisir un nom de famille',
                 buttons: ['OK']
                 });
                 alert.present();
          }
          else if(this.register.controls["lastname"].value==null || this.register.controls["lastname"].value==''){
            let alert = this.alertCtrl.create({
                 title: 'Oups!',
                 subTitle: 'Veuillez saisir une adresse email valide',
                 buttons: ['OK']
                 });
                 alert.present();
          }
          else if(!this.register.controls["lastname"].valid){
            let alert = this.alertCtrl.create({
                 title: 'Oups!',
                 subTitle: 'Veuillez saisir un nom de famille',
                 buttons: ['OK']
                 });
                 alert.present();
          }
          else if(this.register.controls["email"].value==null || this.register.controls["email"].value==''){
            let alert = this.alertCtrl.create({
                 title: 'Oups!',
                 subTitle: 'Veuillez saisir une adresse email valide',
                 buttons: ['OK']
                 });
                 alert.present();
          }
          else if(!this.register.controls["email"].valid){
            let alert = this.alertCtrl.create({
                 title: 'Oups!',
                 subTitle: 'Veuillez saisir une adresse email valide',
                 buttons: ['OK']
                 });
                 alert.present();
          }
          else if(this.register.controls["password"].value==null || this.register.controls["password"].value==''){
            let alert = this.alertCtrl.create({
                 title: 'Oups!',
                 subTitle: 'Le mot de passe doit être de 8 caractères minimum et contenir au moins 1 chiffre',
                 buttons: ['OK']
                 });
                 alert.present();
          }
          else if(!this.register.controls["password"].valid){
            let alert = this.alertCtrl.create({
                 title: 'Oups!',
                 subTitle: 'Le mot de passe doit être de 8 caractères minimum et contenir au moins 1 chiffre',
                 buttons: ['OK']
                 });
                 alert.present();
          }else if(!this.hasNumber(this.register.controls["password"].value)){
			  let alert = this.alertCtrl.create({
                 title: 'Oups!',
                 subTitle: 'Le mot de passe doit être de 8 caractères minimum et contenir au moins 1 chiffre',
                 buttons: ['OK']
                 });
                 alert.present();
		  }
          else if(this.register.controls["phone"].value==null || this.register.controls["phone"].value=='' || this.register.controls["phone"].length <10){
            let alert = this.alertCtrl.create({
                 title: 'Oups!',
                 subTitle: 'Veuillez saisir un numéro de mobile valide',
                 buttons: ['OK']
                 });
                 alert.present();
          }
          else if(!this.register.controls["phone"].valid){
            let alert = this.alertCtrl.create({
                 title: 'Oups!',
                 subTitle: 'Veuillez saisir un numéro de mobile valide',
                 buttons: ['OK']
                 });
                 alert.present();
          }else if(!this.register.controls["dob"].valid){
            let alert = this.alertCtrl.create({
                 title: 'Oups!',
                 subTitle: 'Veuillez saisir une date de naissance valide',
                 buttons: ['OK']
                 });
                 alert.present();
          }else if(!this.register.controls["hearDetailsFrom"].valid){
            let alert = this.alertCtrl.create({
                 title: 'Oups!',
                 subTitle: 'Veuillez choisir la façon dont vous avez entendu parler de nous',
                 buttons: ['OK']
                 });
                 alert.present();
          }
          
        }
 }
  
hasNumber(myString) {
	console.log(myString);
	console.log(/\d/.test(myString));
  return /\d/.test(myString);
}
  submitt(id:number){
       //alert(id);
          FileTransfer = new Transfer();
          var options: any;
          options = {
            fileKey: "image",
            chunkedMode: false,
            mimeType: "image/jpg",
          }
          FileTransfer.upload(this.pic, ENV.api+"/webservicefileupload1/" + id ,options)
           .then(data => {
             this.loader.dismiss();
             let alert = this.alertCtrl.create({
               title: 'Thank you!',
               subTitle: 'Registration Successful please check your email to verify you email address',
               buttons: ['OK']
             });
             alert.present();
             this.navCtrl.push(LoginPage)
           }, (err) => {
             alert(JSON.stringify(err))
             this.loader.dismiss();
           })
  }

}
