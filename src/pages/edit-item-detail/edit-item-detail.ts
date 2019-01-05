import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Camera } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import {ENV} from '../../app/env'
import { AppProvider }from '../../providers/app-provider';
@Component({
  selector: 'page-edit-item-detail',
  templateUrl: 'edit-item-detail.html'
})
export class EditItemDetailPage{
  public pic:string;
  pic_exist:boolean=false;
  http;
  item_name:string=null;
  item_quantity:number=null;
  item_image:string=null;
  item_info:string=null;
  item_data=[];
  item_id;
  FileT; 
  pic1;
  image_number:number=0;
  id;
  item;
  my;
  constructor(private appProvider:AppProvider,public loadingCtrl:LoadingController,public alertCtrl:AlertController,http:Http,public navCtrl: NavController, public navParams: NavParams) {
  	this.item_id=this.navParams.get('itemDetails')
    this.item=this.item_id;
  	this.item_data=this.appProvider.current.items;
    this.pic1=[];
    this.image_number=this.pic1.length;
  	console.log(this.item_data)
    console.log(this.item_id)
  	this.pic = "img/man.png"
    this.pic_exist=false;
    this.http=http;
    this.item_name=this.item_id.item_name;
    this.item_quantity=this.item_id.quantity;
    this.item_info=this.item_id.information;
    this.id=this.item_id.item_id
    this.my=ENV.api;
  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad EditItemDetailPage')
  } 
  ionViewDidEnter(){
      for (var i=0;i<this.item_id.pics.length;i++) {
        if(this.item_id.pics[i].length<50){
          this.pic1[i]=this.my+'/public/frontend/img/addImage/'+this.item_id.pics[i];
        }else{
          this.pic1[i]=this.item_id.pics[i]
        }
      }
  }
  help(){
    let alert = this.alertCtrl.create({
      title: 'Add items',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven',
      buttons: ['OK']
    })
    alert.present();
  }
  updateitem(){
    console.log(this.item_data)
        console.log(this.item_id)
       /* let alert = this.alertCtrl.create({
		  title: 'Add items',
		  message: JSON.stringify(this.item),
		  buttons: ['OK']
		})
		alert.present(); */
		
        this.item_id.item_name=this.item_name;
        this.item_id.quantity=this.item_quantity;
        this.item_id.information=this.item_info;
		
        let link=ENV.api+"/webserviceeditItem";
        let data=JSON.stringify({item_name:this.item_name,
                              quantity:this.item_quantity,
                              information:this.item_info,
                              item_id:this.id,
							  pics:this.pic1
			  });
      this.http.post(link,data).subscribe(data => {
              if(JSON.parse(data._body).response==true){
                this.additems();
                this.navCtrl.pop();
              }
            });
  }
  remove_pic(value){
    let p=[];
    for(var i=0;i<this.pic1.length;i++){
      if(i==value)
      { 
      }
      else{
        p.push(this.pic1[i])       
      }
    }
    this.pic1=p;
  }
  
  add(){
    this.item_quantity++
  }

  remove(){
    if(this.item_quantity==1){
    }else{
    this.item_quantity--
    }
  }

  additems()
  { 
	                for(var i=0;i<this.item_data.length;i++)
	                {	if(this.item_data[i].item_id==this.id)
	                	{	this.item_data[i].item_name=this.item_name
	                		this.item_data[i].quantity=this.item_quantity
	                		this.item_data[i].information=this.item_info
							this.item_data[i].pics=this.pic1;
						    if(this.item_data[i].pics.length==0){
							  this.item_data[i].pics=["no_image.jpg", "no_image.jpg", "no_image.jpg", "no_image.jpg"];
							}else if(this.item_data[i].pics.length==1){
							  this.item_data[i].pics=[this.item_data[i].pics[0], "no_image.jpg", "no_image.jpg", "no_image.jpg"];
							}else if(this.item_data[i].pics.length==2){
							  this.item_data[i].pics=[this.item_data[i].pics[0], this.item_data[i].pics[1], "no_image.jpg", "no_image.jpg"];
							}else if(this.item_data[i].pics.length==3){
							  this.item_data[i].pics=[this.item_data[i].pics[0], this.item_data[i].pics[1], this.item_data[i].pics[2], "no_image.jpg"];
							} 
	                	}
	                }
                    localStorage['items']=JSON.stringify(this.item_data);
	                this.appProvider.current.items=this.item_data;
  }
  


  upload_pic(value){
    if(value==0){
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
        this.pic1[this.image_number]="data:image/jpeg;base64," + imageData;
        this.image_number++
        this.pic = "data:image/jpeg;base64," + imageData;
      this.pic_exist=true;
      }, (err) => {
		  alert('Camera is not Working')
		  })
    }
    else if(value==1){
      Camera.getPicture({
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        targetHeight:500,
        targetWidth:500,
        saveToPhotoAlbum: false
      }).then((imageData) => {
        this.pic1[this.image_number]="data:image/jpeg;base64," + imageData;
        this.image_number++
      this.pic = "data:image/jpeg;base64," + imageData;
      this.pic_exist=true;
      }, (err) => {
		  alert('Camera is not Working')
		})
    }
  }
  submit(value){
    if(value==0){
       this.navCtrl.pop()
    }
    else if(value==1){   
		let loader = this.loadingCtrl.create();
        loader.present();
        let link=ENV.api+"/webserviceeditItem";
        let data=JSON.stringify({item_name:this.item_name,
                              quantity:this.item_quantity,
                              information:this.item_info,
                              item_id:this.item_id});
        this.http.post(link,data).subscribe(data => {
              if(JSON.parse(data._body).response==true){
                if(this.pic != "img/man.png"){
				 this.additems();
				 this.navCtrl.pop()
				 .then(()=>{
				   setTimeout(()=>{
					 loader.dismiss();
				   },500)
				 })
                }
                else{
                this.additems();
				 this.navCtrl.pop()
				 .then(()=>{
				   setTimeout(()=>{
					 loader.dismiss();
				   },500)
				 })
                }
              }else{alert('error')}
    });
    }
  }
}
