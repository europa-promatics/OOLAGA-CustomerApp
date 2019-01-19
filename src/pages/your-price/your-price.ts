import { Component, ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SummaryPage} from '../summary/summary'; 
import { ENV } from '../../app/env'
import { AppProvider } from '../../providers/app-provider'; 
@Component({
  selector: 'page-your-price',
  templateUrl: 'your-price.html'
})
export class YourPricePage {
  	@ViewChild('text_center') textfield;
  	@ViewChild('price_input') price_input;
	error;
	http;
	selection1:boolean=true;
	selection2:boolean=false;
	selection:boolean=false;
	data;
	value=' ';
 	src_location;
  	dst_location;
  	_price:any='';
  	_1price:any='00€';
  	_2price:any='00€';
  	price:number=0;
  	val1:number=null;
  	val2:number=null;
  	val3:number=null;
  	val4:number=null;
  	p='0'
  constructor(private element: ElementRef,private appProvider:AppProvider,public alertCtrl:AlertController,http:Http,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController) {
	this.data = {};
   	this.http = http;
   	// localStorage['curbside']='Standard';
   	// this.appProvider.current.oolagaType ? this.selectedtype() : this.selectcard(1);
	//this.load_locations()
  }
  ionViewDidLoad() {
  	// console.log(this.price_input)
   // this.price_input.writeValue('€');
    setTimeout(() => {
      this.price_input.setFocus();
    },1500);

  	console.log('YourPricePage');
 }
	checkinput(value1?:any,value2?:any,val?:any){
		if(val==null || val.length==0){
			value2.setFocus()	
		}
		else{
			value1.setFocus()	
		}
	}
	check(value){
		
		//alert(value.split()[value.length]);
		// value[value.length]!='€'? value=value+'€' : value;
		if(value.length > 3 || isNaN(parseInt(value[value.length-1]))){
		value = value.slice(0, -1);
		}
		
		return value;
	}
  	onBlur(value,event){
		this.p=value;
  	  	//value=='€'?value='€':value;
  	  	//value[value.length]!='€'?value=value+'€':value;
  	  	/* value.length==2?this.p=value[1]:'';
  	  	value.length==3?this.p=value[1]+value[2]:'';
  	  	value.length==4?this.p=value[1]+value[2]+value[3]:'';
  	  	value.length==5?this.p=value[1]+value[2]+value[3]+value[4]:''; */
  	  	return value
  // 	if(event=='p'){
  // 	}
  // 	else if(event==1) {
		// console.log(event)
		// this._1price=='$'?this._1price='$00':this._1price;
  // 	  	this._1price[0]!='$'?this._1price='$'+this._1price:this._1price;
  // 	  	// this._1price.length==2?( ):;
  // 	  	if(this._1price.length==2){
  // 	  		this._1price=this._1price[0]+'0'+this._1price[1];
  // 	  	}
  // 	}
  // 	else if(event==2){
		// console.log(event)
		// this._2price=='$'?this._2price='$00':this._2price;
  // 	  	this._2price[0]!='$'?this._2price='$'+this._2price:this._2price;
  // 	  	// this._2price.length==2?( ):;
  // 	  	if(this._2price.length==2){
  // 	  		this._2price=this._2price[0]+'0'+this._2price[1];
  // 	  	}
  // 	}
  	}
  onFocus(value,event){
  	if(event=='p'){
  	  	//this._price=='€'?this._price='€':this._price;
  	  	this._1price='00€'
		this._2price='00€'
		this.price=0;
  	}
  	else if(event==1){
		this._1price=='€'?this._1price='€':this._1price
		this._price='00€';
		this.price=1;
  	}
  	else if(event==2){
		this._2price=='€'?this._2price='€':this._2price
		this._price='00€'
		this.price=1;
  	}
  }
  	// selectedtype(){
  	// 	this.appProvider.current.oolagaType=='Standard' ? this.selectcard(1) : this.selectcard(2) ;
  	// }
  	gprice(value){
      	let loader = this.loadingCtrl.create();
      	loader.present();
  		if(value==1){
  			this.appProvider.current.price=123;
  		}
  		else if(value==2){
  			this.appProvider.current.price=321;
  		}
  		loader.dismiss();
  	}
	// selectcard(value)
	// {	
	// 	if(value==1){
	// 		this.selection1 = true;
	// 		this.selection2 = false;
	// 		localStorage['curbside']='Standard';
 //   			this.appProvider.current.oolagaType='Standard';
 //   			this.appProvider.current.oolagaTypeDiscription='Your Helper will load, transport and place item(s) in theroomof your choice.';
	// 		this.gprice(1)
	// 	}
	// 	if(value==2){
	// 		this.selection2 = true;
	// 		this.selection1 = false;
	// 		localStorage['curbside']='Doorstep';
 //   			this.appProvider.current.oolagaType='Doorstep';
 //   			this.appProvider.current.oolagaTypeDiscription='Your Helper will pic up from your door, and drop off at the door step. You are responsible for getting items inside.';
	// 		this.gprice(2)
	// 	}
	// }
	help()
	{
		let alert = this.alertCtrl.create({
		  title: 'Budget',
		  message: " C'est à cette étape que vous entrez votre budget. Il donnera une indication aux Helpers du montant que vous êtes prêt à payer pour votre projet. Gardez à l'esprit qu'Oolaga fonctionne selon un processus d'appel d'offres et que, si votre budget est trop bas, les Helpers risquent de ne pas enchérir sur votre projet. ",
		  buttons: ['OK']
		})
		alert.present();
	}
	load_locations(){
		// let loader = this.loadingCtrl.create({content: "Please wait..."});loader.present();
		// var id=localStorage['oolaga_id']
		// console.log(localStorage['oolaga_id'])
		// this.http.post(ENV.api+'/webservicegetLocation', {olaga_id:id}).subscribe(data => {
		// 	loader.dismiss();
		// 	if(JSON.parse(data._body).response==true){
		// 		console.log(JSON.parse(data._body))
		// 		this.src_location=JSON.parse(data._body).locations[0].id;
		// 		this.dst_location=JSON.parse(data._body).locations[1].id;
		// 	}
		// 	else{
		// 		alert('error')
		// 	}
		// })
  	}
	submit(value){
		console.log(this.p)
		//alert(this.p);
		let p;
		p=this.p
		console.log(p)
		if(value==0){
			this.navCtrl.pop()
		} 
		else if(value==1){
			if(parseInt(p)>=25){
				this.appProvider.current.max_price=parseInt(p)
				let loading=this.loadingCtrl.create();
				loading.present();
				this.appProvider.current.price=this._price;
				if(this.appProvider.current.summary_edit_oolagaType){
					this.http.post(ENV.api+'/webservicehelper_edit',{
                                       oolaga_id:this.appProvider.current.oolaga_id,
                                       max_price:this.appProvider.current.max_price,
                                     })
		            .subscribe(data=>{
			              console.log(data);
			              if(this.appProvider.current.draft_edit_price==true){
			              	let a = JSON.parse(localStorage['draftOolaga']);
			              	a.max_price=this.appProvider.current.max_price;
			              	localStorage['draftOolaga']=JSON.stringify(a);
			              }
						  this.navCtrl.pop();
						  loading.dismiss();
		            },err=>{
		            	alert(JSON.stringify(err))
						loading.dismiss();
		            })
				}
				else{
					this.http.post(ENV.api+'/webservicehelper_edit',{
                                       oolaga_id:this.appProvider.current.oolaga_id,
                                       max_price:this.appProvider.current.max_price,
                                     })
		            .subscribe(data=>{
		              		console.log(data);
		            },err=>{
		            	alert(JSON.stringify(err))
		            })
			        setTimeout(() => {
						loading.dismiss();
	        			this.navCtrl.push(SummaryPage,{});
			  		}, 3000);
				}
			}
			else {
					let a= this.alertCtrl.create({
						title:"Merci de saisir un budget supérieur à 25€",
						buttons:['ok']
					})
					a.present()
			}
		}
		
	}
}
