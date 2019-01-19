import { Component,OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, AlertController, LoadingController,ModalController } from 'ionic-angular';
import { ENV } from '../../app/env';
import { OfferPage } from '../offer/offer';
import { CancelOolagaPage } from '../cancel-oolaga/cancel-oolaga'
import { OpenItemPicPage } from '../open-item-pic/open-item-pic'
@Component({
  selector: 'page-oolaga-summary',
  templateUrl: 'oolaga-summary.html'
})
export class OolagaSummaryPage implements OnInit{
	data:any;
	item_quantity:number=0;
	locations;
	pics;
  page;
  selected_item=0;
  my;
  oolaga_id;
  fromService=false;
  constructor(public modalCtrl:ModalController,public http:Http,public LoadingController:LoadingController,public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController) {
  	this.locations=[];
  	this.pics=[];
    this.oolaga_id=this.navParams.get('oolaga_id');
    // alert(this.oolaga_id);
  }

  ngOnInit(){
    if (this.oolaga_id) {
        let dataToSend={
          oolaga_id:this.oolaga_id
        }
        this.http.post(ENV.api+'/getOolagaById', dataToSend).subscribe(data => {
            this.fromService=true;
            if(JSON.parse(data['_body']).response==true){
              // alert("hello")
              
              this.my=ENV.api;
              console.log('ionViewDidLoad OolagaSummaryPage');
              this.data=JSON.parse(data['_body']).data[0];
              this.page='active';
              console.log(this.page,this.data)
              for(let i=0;i<this.data.oolaga_item.length;i++){
                this.item_quantity += parseInt(this.data.oolaga_item[i].quantity)  
              }
              if(this.data.source && this.data.source!=null){
                this.locations.push(this.data.source);
              }
              if(this.data.way_point1 && this.data.way_point1!=null){
                this.locations.push(this.data.way_point1);
              }
              if(this.data.way_point2 && this.data.way_point2!=null){
                this.locations.push(this.data.way_point2);
              }
              if(this.data.destination && this.data.destination!=null){
                this.locations.push(this.data.destination);
              }
              // this.locations.push({location_name:this.data.src_location_name});
              // this.locations.push({location_name:this.data.dst_location_name});
			  console.log('Gagzzz')
              console.log(this.locations)
              console.log(this.data.items.length)
              for(let i=0;i<this.data.items.length;i++){
                if(this.data.items[i].image!=null){
                  let a = this.data.items[i].image.split(",")
                    this.data.items[i].image ?  this.pics.push(ENV.api + '/public/frontend/img/addImage/' + a[0]):'';
                  }
                }
            }
            
          }, error => {
           // alert(error)
          });
        
    }

    else{
       this.my=ENV.api;
        console.log('ionViewDidLoad OolagaSummaryPage');
        this.data=this.navParams.get('data');
        this.page=this.navParams.get('page');
        console.log(this.page,this.data)
		try{
        for(let i=0;i<this.data.items.length;i++){
          this.item_quantity += parseInt(this.data.items[i].quantity)  
        }
		}catch(err){
			//alert('tesr');
		}
        if(this.data.source && this.data.source!=null){
          this.locations.push(this.data.source);
        }
        if(this.data.way_point1 && this.data.way_point1!=null){
          this.locations.push(this.data.way_point1);
        }
        if(this.data.way_point2 && this.data.way_point2!=null){
          this.locations.push(this.data.way_point2);
        }
        if(this.data.destination && this.data.destination!=null){
          this.locations.push(this.data.destination);
        }
        // this.locations.push({location_name:this.data.src_location_name});
        // this.locations.push({location_name:this.data.dst_location_name});
        console.log(this.locations)
       // console.log(this.data.items.length)
	   try {
        for(let i=0;i<this.data.items.length;i++){
          if(this.data.items[i].image!=null){
            let a = this.data.items[i].image.split(",")
              this.data.items[i].image ?  this.pics.push(ENV.api + '/public/frontend/img/addImage/' + a[0]):'';
            }
          }
	   }catch(err){
		   //alert('error');
	   }
    }
  }

  cancelOolaga(){
    let confirm=this.alertCtrl.create({
          subTitle:'Êtes-vous sûr de vouloir annuler votre projet ?',
          buttons:[ {
                     text:'OUI',
                     handler:()=>
                     {
						this.navCtrl.push(CancelOolagaPage,{data:this.data})
                     }
                    }
                    ,{ 
                     text:'NON',
                     handler:()=>
                     {
                     console.log('no clicked');
                     }
                    }]
                 })
    confirm.present();
  }

  withdrawAuction(id){
    let confirm=this.alertCtrl.create({
          subTitle:'Êtes-vous certain de vouloir supprimer votre projet?',
          buttons:[ {
                     text:'OUI',
                     handler:()=>
                     {
					  let loader = this.LoadingController.create()
                      loader.present()
                      this.http.get(ENV.api+"/webservicesdeactivedraft/"+id).subscribe(data=>{
                        this.navCtrl.popToRoot();
                        loader.dismiss()
                      },err=>{
                        loader.dismiss()
                      })
                     }
                    }
                    ,{ 
                     text:'ANNULER',
                     handler:()=>
                     {
                     
                     }
                    }]
                 })
    confirm.present();
  }
  
  notificationpage(id,offer){
    if(offer!=0 || offer!='0'){
      this.navCtrl.push(OfferPage,{id:id});
    }
    else{
      let alert=this.alertCtrl.create({
        title:'Oups',
        message:'Vous n\'avez pas encore reçu d\'offre',
        buttons:['Ok']
      })
      alert.present();
    }
  }
  getString(object){
	  if(object){
	  return object.replace(/<\/?[^>]+(>|$)/g, "");
	  }
  }
  ionViewDidLoad() {
   
  }

 openPic(pic){
    pic=this.my+'/public/frontend/img/addImage/'+pic;
    let model = this.modalCtrl.create(OpenItemPicPage,{pic:pic})
    model.present()
  }
 formatDate(date){
	  var date_parts=date.split('-');
	  return date_parts[0]+'/'+date_parts[1]+'/'+'20'+date_parts[2];
	  
  }
   formatTime(time){
	 if(time){
		 return time.replace(":", "h");
	 }
	  
  }   
  chageToEuro(cost){
	 if(cost){
		 cost=cost.toString().replace("$", "");
		 return cost+"€";
	 }
	  
  }
}
