import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppProvider } from '../../providers/app-provider';
@Component({
  selector: 'page-poptime',
  templateUrl: 'poptime.html'
})
export class PoptimePage {
	hh:number=1;
	mm:number=0;
	am_pm:boolean=false;
  constructor(public appProvider:AppProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoptimePage');
  }
  ionViewWillLeave(){
   // console.log('jj')
   // this.viewCtrl.dismiss('hello')
   //this.appProvider.current.first_time = this.hh + ':' + this.mm + ' ' + am_pm
   let am_pm;
   this.am_pm ? am_pm = 'PM' : am_pm = 'AM';
   if(this.hh<10){this.appProvider.current.firstAvailableTime = '0' + this.hh + ':';
   }else{this.appProvider.current.firstAvailableTime = this.hh + ':';}
   if(this.mm<10){this.appProvider.current.firstAvailableTime += '0' + this.mm + ' ' + am_pm;	
   }else{this.appProvider.current.firstAvailableTime += this.mm + ' ' + am_pm;	
   }//alert(this.appProvider.current.firstAvailableTime);
  }
  up(a,value){
    if(value){
      if(a==55){a=0}else{a+=5;}
      return a;
    }else if(!value){
      if(a==12){a=1}else{a++;}
      return a;
    }
  }
  down(a,value){
    if(value){
      if(a==0){a=55}else{a-=5;}
      return a;
    }else if(!value){
      if(a==1){a=12}else{a--;}
      return a;
    }
  }

}
