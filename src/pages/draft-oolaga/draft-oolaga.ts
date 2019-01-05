import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { CreateolagaPage } from '../createolaga/createolaga'; 
import { ENV } from '../../app/env'; 
import { Http } from '@angular/http';
import { AppProvider } from '../../providers/app-provider';
import { LocationSelectPage } from '../location-select/location-select';
import { SummaryEditLocationPage } from '../summary-edit-location/summary-edit-location'
import { AddeditemsPage} from '../addeditems/addeditems';
import { HelperSelectionPage } from '../helper-selection/helper-selection';
import { SelectTimeDatePage } from '../select-time-date/select-time-date';
import { YourPricePage } from '../your-price/your-price';
import { ItemDetailPage } from '../item-detail/item-detail'
import { LaboronlyPage } from '../laboronly/laboronly';
import { Camera } from 'ionic-native';


@Component({
  selector: 'page-draft-oolaga',
  templateUrl: 'draft-oolaga.html'
})
export class DraftOolagaPage {
  value;
  http;
  nextpage;
  item_quantity;
  dataLoaded:boolean=false;
  selected_item=0;
  my:any;
  constructor(http:Http,private appProvider:AppProvider, public loadingCtrl:LoadingController,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
    this.http=http;
  }

  openNextStep(data?){
    if(this.appProvider.current.service_id!=7){
      if(data=='location'){
        this.submit();
      }
      if(data=='items'){
        if(this.value.source == null){
          let alert = this.alertCtrl.create({
            message:'You have to enter Location details first',
            buttons:[{text:'OK',handler:()=>{
              this.submit();
            }}]
          })
          alert.present();
        }else{
          this.submit();
        }
      }
      if(data=='datetime'){
        if(this.value.source == null){
          let alert = this.alertCtrl.create({
            message:'You have to enter Location details first',
            buttons:[{text:'OK',handler:()=>{
              this.submit();
            }}]
          })
          alert.present();
        }else if(this.value.oolaga_item[0] == null){
          let alert = this.alertCtrl.create({
            message:'You have to enter item details first',
            buttons:[{text:'OK',handler:()=>{
              this.submit();
            }}]
          })
          alert.present();
        }else{
          this.submit();
        }
      }
      if(data=='price'){
        if(this.value.source == null){
          let alert = this.alertCtrl.create({
            message:'You have to enter Location details first',
            buttons:[{text:'OK',handler:()=>{
              this.submit();
            }}]
          })
          alert.present();
        }else if(this.value.oolaga_item[0] == null){
          let alert = this.alertCtrl.create({
            message:'You have to enter item details first',
            buttons:[{text:'OK',handler:()=>{
              this.submit();
            }}]
          })
          alert.present();
        }else if(this.appProvider.current.date && this.appProvider.current.date==null){
          let alert = this.alertCtrl.create({
            message:'You have to enter Date and Time first',
            buttons:[{text:'OK',handler:()=>{
              this.submit();
            }}]
          })
          alert.present();
        }else{
          this.submit();
        }
      }
    }else if(this.appProvider.current.service_id==7){
      if(data=='price'){
        if(this.appProvider.current.laborLocationName==null){
          let alert = this.alertCtrl.create({
            message:'You have to enter Location details first',
            buttons:[{text:'OK',handler:()=>{
              this.submit();
            }}]
          })
          alert.present();
        }else if(this.appProvider.current.date && this.appProvider.current.date==null){
          let alert = this.alertCtrl.create({
            message:'You have to enter Date and Time first',
            buttons:[{text:'OK',handler:()=>{
              this.submit();
            }}]
          })
          alert.present();
        }else{
          this.submit();
        }
      }
      if(data=='datetime'){
        if(this.appProvider.current.laborLocationName==null){
          let alert = this.alertCtrl.create({
            message:'You have to enter Location details first',
            buttons:[{text:'OK',handler:()=>{
              this.submit();
            }}]
          })
          alert.present();
        }else{
          this.submit();
        }
      }
      if(data=='location'){
        this.submit();
      }
    }
  }

  loadProvider(){
    console.log('jkashkhskdh',this.value);
    this.appProvider.createNew();
    this.appProvider.current.enable_draft=true;
    this.appProvider.current.oolaga_id=this.value.id;
    this.appProvider.current.service_name=this.value.service.service;
    this.appProvider.current.service_image=this.value.service.image;
    this.appProvider.current.service_id=this.value.service.id;
    this.appProvider.current.service_description=this.value.service.description;
    if(this.appProvider.current.service_id==7){
      if(this.appProvider.current.service_name!=null){this.nextpage=LaboronlyPage}
      if(this.value.source != null){
        this.appProvider.current.laborLocationName=this.value.source.location_name;
        this.appProvider.current.laborLocationLat=this.value.source.latitude;
        this.appProvider.current.laborLocationLng=this.value.source.longitude;
        this.appProvider.current.laborUnit_no=this.value.source.unit_nu;
        this.appProvider.current.laborHours=this.value.hours;
        this.appProvider.current.laborInfo=this.value.info;
        this.nextpage=SelectTimeDatePage;
        if((this.value.source != null && this.value.date != null)){
          this.appProvider.current.date = this.value.date;
          this.appProvider.current.first_time = this.value.first_time;
          this.appProvider.current.last_time = this.value.last_time;
          this.nextpage=YourPricePage;
          if(this.value.max_price!=null){
            this.appProvider.current.max_price=this.value.max_price;
            this.nextpage=true;
          }
        }
      }
    }
    if(this.appProvider.current.service_id!=7){
      if(this.appProvider.current.service_name!=null){this.nextpage=LocationSelectPage}
      if(this.value.source != null ) {
        this.appProvider.current.src_location=this.value.source.id;
        this.appProvider.current.locations=[];
        this.appProvider.current.locations.push({
                                                 latitude:this.value.source.latitude,
                                                 curbside:this.value.source.curbside,
                                                 inhome:this.value.source.inhome,
                                                 longitude:this.value.source.longitude,
                                                 loc_no:this.value.source.loc_no,
                                                 oolaga_id:this.value.source.oolaga_id,
                                                 location_name:this.value.source.location_name,
                                                 unit_nu:this.value.source.unit_nu,
                                                 elevator:this.value.source.elevator,
                                                 stairs:this.value.source.stairs,
                                                 ride:this.value.source.ride,
                                                 parking_info:this.value.source.parking_info
                                                })
        if(this.value.way_point1 != null){
          this.appProvider.current.way_point1=this.value.way_point1.id;
          this.appProvider.current.locations.push({
                                                  latitude:this.value.way_point1.latitude,
                                                  curbside:this.value.way_point1.curbside,
                                                  inhome:this.value.way_point1.inhome,
                                                  longitude:this.value.way_point1.longitude,
                                                  loc_no:this.value.way_point1.loc_no,
                                                  oolaga_id:this.value.way_point1.oolaga_id,
                                                  location_name:this.value.way_point1.location_name,
                                                  unit_nu:this.value.way_point1.unit_nu,
                                                  elevator:this.value.way_point1.elevator,
                                                  stairs:this.value.way_point1.stairs,
                                                  ride:this.value.way_point1.ride,
                                                  parking_info:this.value.way_point1.parking_info
                                                })
          if(this.value.way_point2 != null){
            this.appProvider.current.way_point2=this.value.way_point2.id;
            this.appProvider.current.locations.push({
                                                    latitude:this.value.way_point2.latitude,
                                                    curbside:this.value.way_point2.curbside,
                                                    inhome:this.value.way_point2.inhome,
                                                    longitude:this.value.way_point2.longitude,
                                                    loc_no:this.value.way_point2.loc_no,
                                                    oolaga_id:this.value.way_point2.oolaga_id,
                                                    location_name:this.value.way_point2.location_name,
                                                    unit_nu:this.value.way_point2.unit_nu,
                                                    elevator:this.value.way_point2.elevator,
                                                    stairs:this.value.way_point2.stairs,
                                                    ride:this.value.way_point2.ride,
                                                    parking_info:this.value.way_point2.parking_info
                                                  })
          }
        }
        if(this.value.destination != null){
          this.appProvider.current.dst_location=this.value.destination.id;
          this.appProvider.current.locations.push({
                                                    latitude:this.value.destination.latitude,
                                                    inhome:this.value.destination.inhome,
                                                    curbside:this.value.destination.curbside,
                                                    longitude:this.value.destination.longitude,
                                                    loc_no:this.value.destination.loc_no,
                                                    oolaga_id:this.value.destination.oolaga_id,
                                                    location_name:this.value.destination.location_name,
                                                    unit_nu:this.value.destination.unit_nu,
                                                    elevator:this.value.destination.elevator,
                                                    stairs:this.value.destination.stairs,
                                                    ride:this.value.destination.ride,
                                                    parking_info:this.value.destination.parking_info
                                                  })
        }
        if(this.appProvider.current.locations[0] != null){this.nextpage=ItemDetailPage}
      }
      if(this.value.source != null && this.value.oolaga_item[0] != null){
        this.appProvider.current.items=[]
        for(let i=0;i<this.value.oolaga_item.length;i++)
        { 
          let pic = [];
          pic=[this.value.oolaga_item[i].image1,this.value.oolaga_item[i].image2,this.value.oolaga_item[i].image3,this.value.oolaga_item[i].image4]
          this.appProvider.current.items.push({
                                              item_name:this.value.oolaga_item[i].item_name,
                                              quantity:this.value.oolaga_item[i].quantity,
                                              oolaga_id:this.value.oolaga_item[i].oolaga_id,
                                              item_id:this.value.oolaga_item[i].id,
                                              src_item_loc:this.value.oolaga_item[i].src_item_loc,
                                              dst_item_loc:this.value.oolaga_item[i].dst_item_loc,
                                              information:this.value.oolaga_item[i].information,
                                              pics:pic
                                              })
        }
        if(this.appProvider.current.items[0] != null){this.nextpage=SelectTimeDatePage}
      }
      if((this.value.source != null && this.value.oolaga_item[0] != null && this.value.date != null)){
        this.appProvider.current.date = this.value.date;
        this.appProvider.current.first_time = this.value.first_time;
        this.appProvider.current.last_time = this.value.last_time;
        this.nextpage=YourPricePage
        if(this.value.max_price!=null){
            this.appProvider.current.max_price=this.value.max_price;
            this.nextpage=true;
        }
      }
    }
  }

  ionViewWillUnload(){
    this.appProvider.current.enable_draft=false;
    this.appProvider.current.summary_edit_service=false;
    this.appProvider.current.summary_edit_helper=false;
    this.appProvider.current.summary_edit_dateTime=false;
    this.appProvider.current.summary_edit_oolagaType=false;
    this.appProvider.current.summary_edit_item=false;
    this.appProvider.current.summary_edit_location=false;
    this.appProvider.current.summary_edit_price=false;
    this.appProvider.current.draft_edit_price=false;
    this.appProvider.current.draft_edit_labor_location=false;
    this.appProvider.current.Draft_edit_dateTime=false;
    console.log('ionViewWillUnload')
  }

  ionViewDidLoad(){
    console.log('ionViewdidload draft oolaga')
     this.my=ENV.api
  }

  ionViewWillEnter() {
    let val=JSON.parse(localStorage['draftOolaga']);
    this.value=val;
    console.log('ionViewWillEnter',this.value)
    this.loadProvider();
    this.appProvider.current.summary_edit_service=false;
    this.appProvider.current.summary_edit_helper=false;
    this.appProvider.current.summary_edit_dateTime=false;
    this.appProvider.current.summary_edit_oolagaType=false;
    this.appProvider.current.summary_edit_item=false;
    this.appProvider.current.summary_edit_location=false;
    this.appProvider.current.summary_edit_price=false;
    this.appProvider.current.draft_edit_price=false;
    this.appProvider.current.draft_edit_labor_location=false;
    this.appProvider.current.Draft_edit_dateTime=false;
    this.appProvider.consoleData();
    this.appProvider.current.items ? this.calc() : '' ;
    this.dataLoaded=true;
  }

  calc(){
    let q=0;
      for(let i=0;i<this.appProvider.current.items.length;i++)
      {
        q=q+parseInt(this.appProvider.current.items[i].quantity);
      }
      this.item_quantity=q;
  }

  ionViewDidLeave(){
    console.log('leave')
    //this.appProvider.createNew();
  }

  edit_Price(){
    this.appProvider.current.summary_edit_oolagaType=true;
    this.appProvider.current.draft_edit_price=true;
    this.navCtrl.push(YourPricePage);
  }

  edit_Cotegory(){
    let alert = this.alertCtrl.create({
                  message:'If you edit Category then you have to re-enter all the other information',
                  buttons:[{
                            text:'Cancel',
                            handler:()=>{
                            }
                          },{
                            text:'OK',
                            handler:()=>{
                              this.appProvider.current.summary_edit_service=true;
                              this.navCtrl.push(CreateolagaPage);
                            }
                          }]
    })
    alert.present();
  }
  edit_locations(){
     this.appProvider.current.summary_edit_location=true;
     if(this.value.service_type!=7){
       this.navCtrl.push(SummaryEditLocationPage);
     }
     if(this.value.service_type==7){
       this.appProvider.current.draft_edit_labor_location=true;
       this.navCtrl.push(LaboronlyPage);
     }
  }
  edit_items(){
    this.appProvider.current.summary_edit_item=true;
    this.appProvider.current.draft_edit_item=true;
    //this.navCtrl.push(AddeditemsPage);
    this.navCtrl.push(ItemDetailPage);
  }
  // edit_helper(){
  //   this.appProvider.current.summary_edit_helper=true;
  //   this.navCtrl.push(HelperSelectionPage);
  // }
  edit_datetime(){
    this.appProvider.current.summary_edit_dateTime=true;
    this.appProvider.current.Draft_edit_dateTime=true;
    this.navCtrl.push(SelectTimeDatePage);
  }
  edit_type(){
    this.appProvider.current.summary_edit_oolagaType=true;
    this.navCtrl.push(YourPricePage);
  }

  deleteDraft(){
    console.log('DeleteEnable');
    let confirm=this.alertCtrl.create({
          title:'Do you want to delete',
          message:`<ion-icon name="ios-arrow-forward" style="color: #999999"></ion-icon>`,
          buttons:[ 
                    { 
                     text:'Yes',
                     handler:()=>
                     {
                       let loading=this.loadingCtrl.create()
                       loading.present();
                       this.http.get(ENV.api + '/webservicedeleteDraft/'+this.value.id)
                       .subscribe(data=>{
                         if(JSON.parse(data['_body']).response)
                         {  
                              loading.dismiss();
                                      this.navCtrl.pop();
                              // let alert = this.alertCtrl.create({
                              //     title:'Draft Deleted',
                              //     buttons:[{
                              //       text:'Ok',
                              //       handler:()=>
                              //       {
                              //       }
                              //     }]
                              //   })
                              // alert.present();
                         }
                         else{
                            loading.dismiss();
                            let alert = this.alertCtrl.create({
                              title:'Oops...',
                              message:'Something Wrong...',
                              buttons:[{
                                text:'Ok'
                              }]
                            })
                            alert.present();
                         }
                       })
                     },
                    },
                    {
                     text:'No',
                     handler:()=>
                     {

                     },
                   }]
                  });
      confirm.present();
  }
  submit(){
          if(this.nextpage==true){
            // let x :any   = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+'T'+ new Date().getHours()+':'+ new Date().getMinutes()+':00.000Z'
            let x=new Date().getFullYear()+'-';
            (new Date().getMonth()+1).toString().length==1?x=x+'0'+(new Date().getMonth()+1):x=x+(new Date().getMonth()+1);
            (new Date().getDate()).toString().length==1?x=x+'-0'+(new Date().getDate()):x=x+'-'+new Date().getDate();
            (new Date().getHours()).toString().length==1?x=x+'T0'+(new Date().getHours()):x=x+'T'+new Date().getHours();
            (new Date().getMinutes()).toString().length==1?x=x+':0'+(new Date().getMinutes())+':00.000Z':x=x+':'+new Date().getMinutes()+':00.000Z';
            let time = '20'+this.appProvider.current.date.split('-')[2]+'-'+this.appProvider.current.date.split('-')[1]+'-'+this.appProvider.current.date.split('-')[0]
            let y    = time+'T'+this.appProvider.current.first_time+':00.000Z';
            let a    = Date.parse(x)//+24*60*60*1000;
            let b    = Date.parse(y);
            console.log(b>a)
            if(b>a){
             let alert = this.alertCtrl.create({
                        message:'Auction will be live for 24hrs after submission',
                        buttons:[{
                                  text:'Cancel',
                                  handler:()=>{
                                    this.navCtrl.popToRoot();
                                  }},
                                  {
                                  text:'OK',
                                  handler:()=>{
                                    let loader = this.loadingCtrl.create()
                                    loader.present();
                                    var value = JSON.stringify({  
                                                            oolaga_id:this.appProvider.current.oolaga_id,
                                                            cost:this.appProvider.current.max_price,
                                                          });
                                          this.http.post(ENV.api+'/webservicecompleteOolaga', value).subscribe(data => 
                                          {
                                            if(data.json().response==true){
                                              loader.dismiss()
                                              this.navCtrl.popToRoot();
                                            }
                                            else if(data.json().response==false){
                                              loader.dismiss()
                                              let a= this.alertCtrl.create({
                                                 title:'oops..',
                                                 message:'Something wrong...',
                                                 buttons:['Ok']
                                               })
                                               a.present();
                                            }
                                          },err=>{
                                             loader.dismiss();
                                             let a= this.alertCtrl.create({
                                                 title:'oops..',
                                                 message:'please check your Internet connection',
                                                 buttons:['Ok']
                                               })
                                               a.present();
                                          })
                                  }}]
                      })
                      alert.present();
            }else{
              let alert = this.alertCtrl.create({
                      message:'Please update Date & Time',
                      buttons:['OK']
                    })
              alert.present();
            }
          }else{
            this.navCtrl.push(this.nextpage,{})
          }
  }

  remove_pic(itemId,index){
    // alert(itemId);
    // alert(index);
    let data={
      item_id:itemId,
      index:index
    }
    console.log('DeleteEnable');
    let confirm=this.alertCtrl.create({
          title:'Do you want to remove this image',
          message:`<ion-icon name="ios-arrow-forward" style="color: #999999"></ion-icon>`,
          buttons:[ 
                    { 
                     text:'Yes',
                     handler:()=>
                     {
                       let loading=this.loadingCtrl.create()
                       loading.present();
                       this.http.post(ENV.api + '/deleteImage',data)
                       .subscribe(data=>{
                         if(JSON.parse(data['_body']).response)
                         {  
                              loading.dismiss();     
                              this.appProvider.current.items[this.selected_item].pics[index]='no_image.jpg'
                         }
                         else{
                            loading.dismiss();
                            let alert = this.alertCtrl.create({
                              title:'Oops...',
                              message:'Something Wrong...',
                              buttons:[{
                                text:'Ok'
                              }]
                            })
                            alert.present();
                         }
                       })
                     },
                    },
                    {
                     text:'No',
                     handler:()=>
                     {

                     },
                   }]
                  });
      confirm.present();
  }

  upload_pic(value,index,itemId){
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
            //   this.pic1[this.image_number]="data:image/jpeg;base64," + imageData;
            //   this.image_number++
            // this.pic = "data:image/jpeg;base64," + imageData;
            // this.pic_exist=true;
            alert(imageData);
            this.appProvider.current.items[this.selected_item].pics[index]= "data:image/jpeg;base64," + imageData
            let loading=this.loadingCtrl.create()
            loading.present();
            let data={
              item_id:itemId,
              index:index+1,
              image:"data:image/jpeg;base64," + imageData
            }
            this.http.post(ENV.api + '/addItemImage',data)
            .subscribe(data=>{
              if(JSON.parse(data['_body']).response)
                {  
                  loading.dismiss();
                  alert(JSON.stringify(data)); 
                  this.appProvider.current.items[this.selected_item].pics[index]= "data:image/jpeg;base64," + imageData
                }else{
                     loading.dismiss();
                        let alert = this.alertCtrl.create({
                          title:'Oops...',
                          message:'Something Wrong...',
                          buttons:[{
                            text:'Ok'
                          }]
                        })
                      alert.present();
                }
            },err=>{
                // alert(err);
                // alert(JSON.stringify(err));
            })
        }, (err) => {
          // alert(err);
          // alert(JSON.stringify(err));
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
             alert(imageData);
        
            this.appProvider.current.items[this.selected_item].pics[index]= "data:image/jpeg;base64," + imageData
            let loading=this.loadingCtrl.create()
            loading.present();
            let data={
              item_id:itemId,
              index:index+1,
              image:"data:image/jpeg;base64," + imageData
            }
            this.http.post(ENV.api + '/addItemImage',data)
            .subscribe(data=>{
              if(JSON.parse(data['_body']).response)
                {  
                  loading.dismiss();
                  this.appProvider.current.items[this.selected_item].pics[index]= "data:image/jpeg;base64," + imageData
                }else{
                     loading.dismiss();
                        let alert = this.alertCtrl.create({
                          title:'Oops...',
                          message:'Something Wrong...',
                          buttons:[{
                            text:'Ok'
                          }]
                        })
                      alert.present();
                }
            },err=>{
                // alert(err);
                // alert(JSON.stringify(err));
            })
        }, (err) => {
           // alert(err);
                // alert(JSON.stringify(err));
        })
    }
  }

  getImage(image){
    if (image.indexOf('base64')==-1) {
      return this.my+'/public/frontend/img/addImage/'+image;
    }else{
     return image
    }
  }
}
