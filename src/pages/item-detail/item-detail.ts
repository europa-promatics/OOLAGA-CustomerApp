import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Camera } from 'ionic-native';
import { ImagePicker } from '@ionic-native/image-picker';

//-------------pages-------------------
import { AddeditemsPage } from '../addeditems/addeditems'
import { ENV } from '../../app/env'
//------------provider-------------------
import {AppProvider} from '../../providers/app-provider';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  public pic:string;
  public pic1;
  image_number:number=0;
  pic_exist:boolean=false;
  http;
  item_id;number;
  item_name:string='';
  item_quantity:number=1;
  item_image:string;
  item_info:string='';
  locations;
  locations_detail;
  items_quantity=0;
  from;
  to;
  items: Array<{
    item_id:number,
    oolaga_id:number,
    item_name:string,
    quantity:number,
    information?:string,
    src_item_loc: string,
    dst_item_loc: string,
    pics?:any,
  }>;
  item: Array<{
    item_id:number,
    oolaga_id:number,
    item_name:string,
    quantity:number,
    information:string,
  }>;
  added_item:boolean=true
  src_location;
  dst_item_loc;
  src_item_loc;
  suggestions;
  itemlist;

  constructor(private appProvider:AppProvider,private imagePicker: ImagePicker,public loadingCtrl:LoadingController,public alertCtrl:AlertController,http:Http,public navCtrl: NavController, public navParams: NavParams) {
    this.pic = "img/man.png"
    this.pic_exist=false;
    this.items=[];
    this.item=[];
    this.pic1=[];
    this.http=http;
    this.src_location;
    this.itemlist=[]
    this.suggestions=[];
  }

  itemList(){
    console.log('item list')
    if(this.items[0] == null){
        let alert = this.alertCtrl.create({
                  title: 'Add Item!',
                  buttons: ['OK']
                });
            alert.present();
    }else{
        localStorage['items']=JSON.stringify(this.items);
        // console.log(JSON.parse(localStorage['items']));
        this.navCtrl.push(AddeditemsPage,{});
    }
  }
  help(){
    let alert = this.alertCtrl.create({
      title: 'Ajoutez vos objets',
      message: "Ici, vous décrivez les objets que vous désirez faire transporter. Appuyez sur le signe '+' et indiquez le type d'objet, la quantité, caractéristiques etc. Prenez des photos et donnez toute information supplémentaire que vous jugez utile pour vous assurer que votre Helper soit bien préparé.",
      buttons: ['OK']
    })
    alert.present();
  }

  ionViewDidEnter(){
    this.items_quantity=0;
    this.http.get(ENV.api+'/webservicesuggetionItem/'+localStorage['service_type']).subscribe(data=>{
      this.suggestions=JSON.parse(data._body);
    })
    this.locations=this.appProvider.current.locations;
    this.dst_item_loc=this.appProvider.current.dst_location;
    this.src_item_loc=this.appProvider.current.src_location;
    if(this.items[0]!=null || this.appProvider.current.edit_item_data || this.appProvider.current.summary_edit_item){
      this.items=this.appProvider.current.items
      console.log(this.items.length);
      for(var i=0;i<this.items.length;i++){
        console.log(this.items[i].quantity);
        // this.items_quantity=this.items_quantity+this.items[i].quantity;
        this.items_quantity += parseInt(this.appProvider.current.items[i].quantity)
      }
    }
    // if(this.appProvider.current.summary_edit_item){
    //   this.items=this.appProvider.current.items
    //   console.log(this.items.length);
    //   for(var i=0;i<this.items.length;i++){
    //     console.log(this.items[i].quantity);
    //   }
    // }
  }

  updateSearch(){
    console.log(this.item_name)
    if (this.item_name == '') {
            this.itemlist = [];
            return;
       }
       let ev= this.item_name
       if (ev && ev.trim() != '') {
        this.itemlist = this.suggestions.filter((value) => {
        return (value.suggestion.toUpperCase().indexOf(ev.toUpperCase()) > -1);
      })
      }
      else
      {
        this.itemlist=[];
      }
      console.log(this.itemlist)
  }

  chooseItem(value){
    this.item_name = value;
    this.itemlist = [];
  }

  remove_pic(value){
    let p=[];
    for(var i=0;i<this.pic1.length;i++){
      if(i==value)
      { 
        //alert('yes')
        this.image_number--
      }
      else{
        p.push(this.pic1[i])       
      }
    }
    this.pic1=p;
  }

  toggle_added_item(){
    this.added_item=false;
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

  delete_item(id){
    let link=ENV.api+'/webservicedeleteItem'
    this.http.post(link,{item_id:id}).subscribe(data=>{
      console.log(JSON.parse(data._body));
            if(JSON.parse(data._body).response==true){
              this.remove_item(id)
            }else{}
    })
  }
  remove_item(value){
    for(var i=0;i<this.items.length;i++){
      if(this.items[i].item_id==value){
        this.items.splice(i,1)
      }
    }
  }
  additems()
  { 
    if(this.item_name==null || this.item_name=='' ||this.item_name==' '){
      let alert = this.alertCtrl.create({
        title: 'Oops...',
        subTitle: 'Please enter item details...',
        buttons: ['OK']
      });
      alert.present();
    }else if(this.item_name.toLowerCase()=="gun safes" || this.item_name.toLowerCase()=="jukeboxes" ||this.item_name.toLowerCase()=="jukebox" || this.item_name.toLowerCase()=="motorcycles" ||this.item_name.toLowerCase()=="motorcycle" || this.item_name.toLowerCase()=="organs" || this.item_name.toLowerCase()=="pianos" ||this.item_name.toLowerCase()=="piano"  || this.item_name.toLowerCase()=="large safes" || this.item_name.toLowerCase()=="u-box" || this.item_name.toLowerCase()=="containers" || this.item_name.toLowerCase()=='kegs & other alcohol' || this.item_name.toLowerCase()=='kegs and other alcohol' || this.item_name.toLowerCase()=='alcohol' || this.item_name.toLowerCase()=='pool tables'){
		 let alert = this.alertCtrl.create({
        title: 'Oops...',
        subTitle: 'Sorry, OOLAGA is not meant for such items.',
        buttons: ['OK']
      });
      alert.present();
		
	}
    else{
      let loader = this.loadingCtrl.create();
      loader.present();
      let data=JSON.stringify({
                                      item_name:this.item_name,
                                      quantity:this.item_quantity,
                                      information:this.item_info,
                                      oolaga_id:this.appProvider.current.oolaga_id,
                                      src_item_loc: this.src_item_loc,
                                      dst_item_loc: this.dst_item_loc,
                                      pics:this.pic1
                             });

      this.http.post(ENV.api+"/webserviceaddItem",data).subscribe(data => {
              console.log(JSON.parse(data._body));
              if(JSON.parse(data._body).response==true){
                console.log(JSON.parse(data._body).item_id)
                  this.items.push({
                                          item_name:this.item_name,
                                          quantity:this.item_quantity,
                                          information:this.item_info,
                                          oolaga_id:this.appProvider.current.oolaga_id,
                                          item_id:JSON.parse(data._body).item_id,
                                          src_item_loc: this.src_item_loc,
                                          dst_item_loc: this.dst_item_loc,
                                          pics:this.pic1
                                  })
                  this.appProvider.current.items=this.items;
                  console.log(this.appProvider.current.items)
                  this.items_quantity=this.items_quantity+this.item_quantity;
                  this.appProvider.current.edit_item_data=true;
                if(this.pic != "img/man.png"){
                }
                else{}
                  this.item_name ='';
                  this.item_quantity =1;
                  this.item_info ='';
                  this.pic1=[];
                  this.image_number=0;
                  if(this.locations.length>2){
                    this.src_item_loc=null;
                  }
                loader.dismiss();
                let alt = this.alertCtrl.create({
                  title: 'Objet ajouté',
                  buttons: ['OK']
                });
                alt.present();
              }else{alert('error')}
      });

    }
  }

  uploadpic(id){
    var options: any;
    options = {fileKey: "image",chunkedMode: false,mimeType: "image/jpg"}
    this.http.post(ENV.api+"/webserviceoolagaImage/" + id,{image:this.pic1[0]}).subscribe((data)=>{
      console.log(JSON.parse(data._body));
    })
  }

  upload_pic(value){
    if(this.image_number<4){
      if(value==0){
        Camera.getPicture({
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          encodingType: 0,
          correctOrientation: true,
          targetHeight:300,
          targetWidth:300,
          saveToPhotoAlbum: false,
        }).then((imageData) => {
          this.pic1[this.image_number]="data:image/jpeg;base64," + imageData;
          this.image_number++
        this.pic = "data:image/jpeg;base64," + imageData;
        this.pic_exist=true;
        }, (err) => {})
      }
      else if(value==1){
       /*  Camera.getPicture({
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
        }, (err) => {}) */
		var options={
			maximumImagesCount:4,
			outputType:1,
			          quality: 75,
					  height:500,
					  width:500
		}
		this.imagePicker.getPictures(options).then((results) => {
		  for (var i = 0; i < results.length; i++) {
			  console.log('Image URI: ' + results[i]);
			  if(results[i]!='O' && results[i]!='K' && results[i]!='OK'){
			      this.pic1[i]="data:image/jpeg;base64,"+results[i];
				 // this.image_number++
				this.pic = "data:image/jpeg;base64," + results[i];
				this.pic_exist=true;
			  }
		  }
		}, (err) => { });
      } 
    }
  }

  submit(value){
    if(value==0){
        this.navCtrl.pop()
    }
    else if(value==1){
		//alert(this.appProvider.current.summary_edit_item);
		//alert(JSON.stringify(this.items));
		
          
			
		  
      // console.log(this.appProvider.current.items)
      if(this.items[0] == null){
        let alert = this.alertCtrl.create({
                  title: 'Add Item!',
                  buttons: ['OK']
                });
            alert.present();
      }else if(this.appProvider.current.summary_edit_item==true){
		  
        if(this.appProvider.current.draft_edit_item){
          console.log('draft',JSON.parse(localStorage['draftOolaga']));
          let a = JSON.parse(localStorage['draftOolaga'])
          a.oolaga_item=[];
          for(let i=0;i<this.items.length;i++){
            if(this.items[i].pics.length==0){
              this.items[i].pics=["no_image.jpg", "no_image.jpg", "no_image.jpg", "no_image.jpg"];
            }else if(this.items[i].pics.length==1){
              this.items[i].pics=[this.items[i].pics[0], "no_image.jpg", "no_image.jpg", "no_image.jpg"];
            }else if(this.items[i].pics.length==2){
              this.items[i].pics=[this.items[i].pics[0], this.items[i].pics[1], "no_image.jpg", "no_image.jpg"];
            }else if(this.items[i].pics.length==3){
              this.items[i].pics=[this.items[i].pics[0], this.items[i].pics[1], this.items[i].pics[2], "no_image.jpg"];
            }
            a.oolaga_item.push({
              dst_item_loc:this.items[i].dst_item_loc,
              id:this.items[i].item_id,
              information:this.items[i].information,
              item_name:this.items[i].item_name,
              oolaga_id:this.items[i].oolaga_id,
              quantity:this.items[i].quantity,
              src_item_loc:this.items[i].src_item_loc,
              image1: this.items[i].pics[0],
              image2: this.items[i].pics[1],
              image3: this.items[i].pics[2],
              image4: this.items[i].pics[3]
            })
          }
          console.log(a.oolaga_item);
          console.log(this.items[0]);
          localStorage['draftOolaga']=JSON.stringify(a);
        }
          this.navCtrl.pop()
      }
      else{
        localStorage['items']=JSON.stringify(this.items);
        localStorage['itemimages']=this.pic1;
        // console.log(JSON.parse(localStorage['items']));
        this.navCtrl.push(AddeditemsPage,{});
      }
    }  
  }

}
