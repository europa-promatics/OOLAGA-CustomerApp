import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams,ModalController, AlertController, LoadingController } from 'ionic-angular';
import { YourPricePage } from '../your-price/your-price';
import { SummaryEditLocationPage } from '../summary-edit-location/summary-edit-location'
import { ItemDetailPage} from '../item-detail/item-detail';
import { OpenItemPicPage } from '../open-item-pic/open-item-pic'
import { HelperSelectionPage } from '../helper-selection/helper-selection'
import { CreateolagaPage } from '../createolaga/createolaga'
import { SelectTimeDatePage } from '../select-time-date/select-time-date';
import { LaboronlyPage } from '../laboronly/laboronly'
import { AppProvider }from '../../providers/app-provider';
import { ENV } from '../../app/env';
import { CustomerOolagaConfirmedPage } from '../customer-oolaga-confirmed/customer-oolaga-confirmed';
import { SaveCardDetailsPage } from '../save-card-details/save-card-details' 


@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {
	date;
	time;
	helper;
	service_name;
	items;
	dst_location_name;
	src_location_name;
  locations;
  editenable:boolean=true;
  item_quantity:number=0;
  pics:any;
  my;
  selected_item=0;
  oolaga_id;
  constructor(public modalCtrl:ModalController,public http:Http,private loadingCtrl:LoadingController,private appProvider:AppProvider,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
    this.pics=[];
    // oolaga_id=this.navParams.get('oolaga_id');
 
  }

  openPic(pic){
    if(pic.length>50){
      let model = this.modalCtrl.create(OpenItemPicPage,{pic:pic})
      model.present()
    }else{
      pic=this.my+'/public/frontend/img/addImage/'+pic;
      let model = this.modalCtrl.create(OpenItemPicPage,{pic:pic})
      model.present()
    }
  }

  ionViewDidEnter(){
    this.my=ENV.api;
    // alert(JSON.stringify(this.appProvider.current.items[0].pics[0]));
    console.log(this.appProvider.current)
    if(this.appProvider.current.service_id!=7){
      this.appProvider.current.summary_edit_item=false;
      this.appProvider.current.summary_edit_location=false;
      this.appProvider.current.summary_edit_dateTime=false;
      this.appProvider.current.summary_edit_oolagaType=false;
      this.appProvider.current.summary_edit_helper=false;
      this.date=this.appProvider.current.date;
      this.time=this.appProvider.current.time;
      this.helper=this.appProvider.current.helper_no;
      this.items=this.appProvider.current.items;
      this.service_name=this.appProvider.current.service_name;
      this.locations=this.appProvider.current.locations;
      this.src_location_name=this.locations[0].location_name
      this.dst_location_name=this.locations[this.locations.length - 1].location_name
      for(var i=0;i<this.items.length;i++){
        if(i==0){
          this.item_quantity=parseInt(this.items[i].quantity);
        }
        else{
          this.item_quantity=this.item_quantity+parseInt(this.items[i].quantity);
        }
      }
      this.pics=[];
      for(let i=0;i<this.appProvider.current.items.length;i++){
        if(this.appProvider.current.items[i].pics){
        console.log(this.appProvider.current.items[i].pics[0])
        this.appProvider.current.items[i].pics[0] ? this.pics.push(this.appProvider.current.items[i].pics[0]):'';
        }
      }
    }
  }
  editItems(){
    if(this.editenable==false){
      console.log('Edit Items');
      this.appProvider.current.summary_edit_item=true;
      this.navCtrl.push(ItemDetailPage,{})
    }
  }
  editCategory(){
    if(this.editenable==false){
    let alert = this.alertCtrl.create({
                  message:'If you edit Category then you have to re-enter all the other information',
                  buttons:[{
                            text:'Cancel',
                            handler:()=>{
                            }
                          },{
                            text:'OK',
                            handler:()=>{
                              this.navCtrl.popTo(1)
                            }
                          }]
    })
    alert.present();
    }
  }
  editLocation(){
    if(this.editenable==false){
      console.log('Edit locations');
      this.appProvider.current.summary_edit_location=true;
      this.navCtrl.push(SummaryEditLocationPage,{});
    }
  }
  editDateTime(){
    if(this.editenable==false){
      console.log('Edit date and time');
      this.appProvider.current.summary_edit_dateTime=true;
      this.navCtrl.push(SelectTimeDatePage,{});
    }
  }
  editType(){
    if(this.editenable==false){
      console.log('Edit oolagatype');
      this.appProvider.current.summary_edit_oolagaType=true;
      this.navCtrl.push(YourPricePage,{});
    }
  }
  editLaborData(){
    if(this.editenable==false){
      console.log('Edit labor data');
      this.appProvider.current.summary_edit_location=true;
      this.navCtrl.push(LaboronlyPage)
    }
  }
  editPrice(){
    if(this.editenable==false){
      console.log('Edit price');
      this.navCtrl.pop()
    }
  }
  submitoolaga(){
  //	this.navCtrl.popToRoot();
  this.navCtrl.push(CustomerOolagaConfirmedPage, {});
  }
  
   onAddCard(){
     this.navCtrl.push(SaveCardDetailsPage,{'user_id':localStorage['user_id'],'mangoUserId':localStorage['mango_user_id']})
   }
  submit(value)
   {  
      if(value==0){
        this.navCtrl.pop()
      }
      else if(value==1){
		  if(!localStorage['card_id']){
			  this.onAddCard();
		  }else{
          // let loader=this.loadingCtrl.create()
          //   loader.present();
          //   this.http.post()
          //   .subscribe(data=>{
          //     if(JSON.parse(data['response'])==true){
          //       this.navCtrl.popToRoot()
          //       loader.dismiss();
          //     }
          //     else{
          //       loader.dismiss()
          //       let alert = this.alertCtrl.create({
          //         title:'Alert',
          //         message:'Something Wrong...',
          //         buttons:['OK']
          //       })
          //       alert.present();
          //     }
          //   })
             let alert = this.alertCtrl.create({
                  message:"Les enchères resteront ouvertes jusqu'à ce que vous acceptiez une offre ou retiriez votre annonce",
                  buttons:[{
                            text:'Annuler',
                            handler:()=>{
                              this.navCtrl.popToRoot();
                            }},
                            {
                            text:'OK',
                            handler:()=>{
                              let loader = this.loadingCtrl.create()
                              loader.present();
                              var d = JSON.stringify(
                                  {  
                                    oolaga_id:this.appProvider.current.oolaga_id,
                                    cost:this.appProvider.current.price,
                                  });
                                    this.http.post(ENV.api+'/webservicecompleteOolaga', d)
                                    .subscribe(data => {
                                    if(JSON.parse(data['_body']).response==true){
                                      loader.dismiss()

                                      this.navCtrl.push(CustomerOolagaConfirmedPage, {});
                                    //  this.navCtrl.popToRoot({animation: 'ios-transition',animate: true, direction: 'forward'});
                                    }
                                    else if(JSON.parse(data['_body']).response==false){
                                      // this.error=JSON.parse(data._body).message;
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
		  }		
      }
	  
   }
  help(){
    let alert = this.alertCtrl.create({
      title: 'Summary',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven',
      buttons: ['OK']
    })
    alert.present();
  }
  formatDate(date){
	  var date_parts=date.split('-');
	  return date_parts[0]+'/'+date_parts[1]+'/'+'20'+date_parts[2];
	  
  }
  getString(string){
	  if(string){
	  return string.replace(/<\/?[^>]+(>|$)/g, "");
	  }
  }
  
  edit(){
    this.editenable=!this.editenable;
  }
  getTimeFormat(time){
	  if(time){
		  return time.replace(":", "h");
	  }
  }
}
