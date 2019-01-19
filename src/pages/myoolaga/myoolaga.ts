import { Component, ViewChild,ElementRef,HostListener } from '@angular/core';
import { Content,Slides,Slide} from 'ionic-angular';
import { NavController, NavParams,AlertController,MenuController,LoadingController,ModalController } from 'ionic-angular';
import { CreateolagaPage} from '../createolaga/createolaga';
import { InboxPage} from '../myoolaga/inbox/inbox'
import { OfferPage} from '../offer/offer'
import { Http,RequestOptions,Headers } from '@angular/http';
import { OolagaDetailsPage} from '../oolaga-details/oolaga-details';
import { DraftOolagaPage} from '../draft-oolaga/draft-oolaga';
import { Observable} from "rxjs/Rx";
import { ENV} from '../../app/env';
import { AppProvider } from '../../providers/app-provider';
import { OolagaSummaryPage} from '../oolaga-summary/oolaga-summary';
import { AssignedOolagaMapPage } from '../assigned-oolaga-map/assigned-oolaga-map'
import { ChatPage }from '../chat/chat';
import { LaboronlysummaryPage}from '../laboronlysummary/laboronlysummary'
@Component({
  selector: 'page-myoolaga',
  templateUrl: 'myoolaga.html'
})
export class MyoolagaPage {
@ViewChild(Slides) slides: Slides;
@ViewChild(Content) content: Content;
@ViewChild('draft_slide') draft_slide:ElementRef;
@ViewChild('auction_slide') auction_slide:ElementRef;
@ViewChild('active_slide') active_slide:ElementRef;
link1;
data;
data1;
http
oolaga_created:boolean=true;
msg_no:number=0;
enable_service:boolean;
menu
draft_oolaga:boolean=false;
draft_oolaga_enable:boolean=true;
page_selection:boolean=true;
activeSec="active";
assignedOolagas;
assigned_oolaga_enable:boolean=false;
activeSlide:boolean=true;
enableScroll1:boolean=true;
enableScroll2:boolean=true;
enableScroll3:boolean=true;
refreasherEnabled:boolean=false;
  constructor(public modelCtrl:ModalController,private appProvider:AppProvider,public loadingCtrl:LoadingController,public menuCtrl:MenuController,public alertCtrl:AlertController,http:Http,public navCtrl: NavController, public navParams: NavParams) {
    this.http = http;
    this.menu=menuCtrl;
    this.menu.enable(true,"mymenu");
		setInterval(() => {
				  this.updateData();
				}, 5000); 
  }
  refreshOolagas(refresh){
    this.refreasherEnabled=true;
    if(this.activeSec=='draft'){
      this.http.get(ENV.api + '/webservicedraftOolaga/' + localStorage['user_id']).subscribe(data=>{
        if(data.json().response){
          if(data.json().services[0] == null){this.draft_oolaga_enable=true;}
          else if(data.json().services[0] != null){
            this.draft_oolaga_enable=false;
            this.data1=data.json().services;
            this.data1.reverse();
          }
        }else{this.draft_oolaga_enable=true;}
        refresh.complete();
        // this.enableScroll=false;
        this.refreasherEnabled=false;
      },err=>{
       // alert(JSON.stringify('error'+err));
        refresh.complete();
        // this.enableScroll=false;
        this.refreasherEnabled=false;
      })
    }
    else if(this.activeSec=='auction'){
      this.http.post(ENV.api + '/webserviceuserOolagas',{user_id:localStorage['user_id']}).subscribe(data=>{
        if(data.json().response){
          if(data.json().oolagas[0] == null){this.oolaga_created=true;}
          else if(data.json().oolagas[0] != null){
            this.oolaga_created=false;
            this.data=data.json().oolagas;
            this.data.reverse();
			var date = new Date().getDate();
			var date_month = new Date().getMonth();
			var date_year = new Date().getFullYear();
			var final_date=new Date(date_year,date_month,date);
			console.log(this.data);
			this.data=this.data.filter(d=>new Date((20+d.date.split('-')[2]),parseInt(d.date.split('-')[1])-1, d.date.split('-')[0]).getTime() >=final_date.getTime());
            this.data = this.data.map(function(el) {
						   
						      var time=el.first_time; 
							  console.log(el);
							   var zero = 2 - el.date.split('-')[1].toString().length + 1;
							 var mm= Array(+(zero > 0 && zero)).join("0") + el.date.split('-')[1];   
							 
							 var zer = 2 - el.date.split('-')[0].toString().length + 1;
							 var dd= Array(+(zer > 0 && zer)).join("0") + el.date.split('-')[0];
							 
							// alert(dd);
							  var date_string=20+el.date.split('-')[2]+"-"+(mm)+"-"+dd+'T'+time;						 
							 var date1=new Date(date_string);
							 var date2=new Date();
							 console.log('Difference');
							 console.log(date1);
							 console.log(date2);
							var difference =(date1.getTime() - date2.getTime()) / 1000;
							difference /= (60 * 60);
							console.log(difference);
							
							  var o = Object.assign({}, el);
							  o.remaining_time=difference;
							  return o; 
							})
		  
		  }
        }else{this.oolaga_created=true;}
        refresh.complete();
		var date = new Date().getDate();
			var date_month = new Date().getMonth();
			var date_year = new Date().getFullYear();
			var final_date=new Date(date_year,date_month,date);
			this.data=this.data.filter(d=>new Date((20+d.date.split('-')[2]),parseInt(d.date.split('-')[1])-1, d.date.split('-')[0]).getTime() >=final_date.getTime());
       this.data = this.data.map(function(el) {
						   
						      var time=el.first_time; 
							  console.log(el);
							   var zero = 2 - el.date.split('-')[1].toString().length + 1;
							 var mm= Array(+(zero > 0 && zero)).join("0") + el.date.split('-')[1];   
							 
							 var zer = 2 - el.date.split('-')[0].toString().length + 1;
							 var dd= Array(+(zer > 0 && zer)).join("0") + el.date.split('-')[0];
							 
							// alert(dd);
							  var date_string=20+el.date.split('-')[2]+"-"+(mm)+"-"+dd+'T'+time;						 
							 var date1=new Date(date_string);
							 var date2=new Date();
							 console.log('Difference');
							 console.log(date1);
							 console.log(date2);
							var difference =(date1.getTime() - date2.getTime()) / 1000;
							difference /= (60 * 60);
							console.log(difference);
							
							  var o = Object.assign({}, el);
							  o.remaining_time=difference;
							  return o; 
							})
        this.refreasherEnabled=false;
      },err=>{
       // alert(JSON.stringify('error'+err));
        refresh.complete();
        // this.enableScroll=false;
        this.refreasherEnabled=false;
      })
    }
    else if(this.activeSec=='active'){
      this.http.post(ENV.api +'/webserviceshowuseroolaga',{user_id:localStorage['user_id']}).subscribe(data=>{
        if(data.json().response){
          this.assignedOolagas=data.json().data.reverse()
          if(data.json().data[0] != null){this.assigned_oolaga_enable=true;}
          else{this.assigned_oolaga_enable=false;}
        }
        else{this.assigned_oolaga_enable=false;}
        refresh.complete();
        // this.enableScroll=false;
        this.refreasherEnabled=false;
      },err=>{
       // alert(JSON.stringify('error'+err));
        refresh.complete();
        // this.enableScroll=false;
        this.refreasherEnabled=false;
      })
    }
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex == 0) {
      this.activeSec = 'draft'
    }
    else if (currentIndex == 1) {
      this.activeSec = 'auction'
    }
    else {
      this.activeSec = 'active'
    }
  }
  updateData(){
	  // this.refreasherEnabled=true;
    if(this.activeSec=='draft'){
      this.http.get(ENV.api + '/webservicedraftOolaga/' + localStorage['user_id']).subscribe(data=>{
        if(data.json().response){
          if(data.json().services[0] == null){this.draft_oolaga_enable=true;}
          else if(data.json().services[0] != null){
            this.draft_oolaga_enable=false;
            this.data1=data.json().services;
            this.data1.reverse();
          }
        }else{this.draft_oolaga_enable=true;}
       // refresh.complete();
        // this.enableScroll=false;
        //this.refreasherEnabled=false;
      },err=>{
        //alert(JSON.stringify('error'+err));
        //refresh.complete();
        // this.enableScroll=false;
        //this.refreasherEnabled=false;
      })
    }
    else if(this.activeSec=='auction'){
      this.http.post(ENV.api + '/webserviceuserOolagas',{user_id:localStorage['user_id']}).subscribe(data=>{
        if(data.json().response){
          if(data.json().oolagas[0] == null){this.oolaga_created=true;}
          else if(data.json().oolagas[0] != null){
            this.oolaga_created=false;
            this.data=data.json().oolagas;
            this.data.reverse();
			var date = new Date().getDate();
			var date_month = new Date().getMonth();
			var date_year = new Date().getFullYear();
			var final_date=new Date(date_year,date_month,date);
			this.data=this.data.filter(d=>new Date((20+d.date.split('-')[2]),parseInt(d.date.split('-')[1])-1, d.date.split('-')[0]).getTime() >=final_date.getTime());
			 this.data = this.data.map(function(el) {
						   
						      var time=el.first_time; 
							  console.log(el);
							   var zero = 2 - el.date.split('-')[1].toString().length + 1;
							 var mm= Array(+(zero > 0 && zero)).join("0") + el.date.split('-')[1];   
							 
							 var zer = 2 - el.date.split('-')[0].toString().length + 1;
							 var dd= Array(+(zer > 0 && zer)).join("0") + el.date.split('-')[0];
							 
							// alert(dd);
							  var date_string=20+el.date.split('-')[2]+"-"+(mm)+"-"+dd+'T'+time;						 
							 var date1=new Date(date_string);
							 var date2=new Date();
							 console.log('Difference');
							 console.log(date1);
							 console.log(date2);
							var difference =(date1.getTime() - date2.getTime()) / 1000;
							difference /= (60 * 60);
							console.log(difference);
							
							  var o = Object.assign({}, el);
							  o.remaining_time=difference;
							  return o; 
							})
		 }
        }else{this.oolaga_created=true;}
        //refresh.complete();
        // this.enableScroll=false;
      //  this.refreasherEnabled=false;
	        var date = new Date().getDate();
			var date_month = new Date().getMonth();
			var date_year = new Date().getFullYear();
			var final_date=new Date(date_year,date_month,date);
	  this.data=this.data.filter(d=>new Date((20+d.date.split('-')[2]),parseInt(d.date.split('-')[1])-1, d.date.split('-')[0]).getTime() >=final_date.getTime());
      },err=>{
        //alert(JSON.stringify('error'+err));
       // refresh.complete();
        // this.enableScroll=false;
        //this.refreasherEnabled=false;
      })
    }
    else if(this.activeSec=='active'){
      this.http.post(ENV.api +'/webserviceshowuseroolaga',{user_id:localStorage['user_id']}).subscribe(data=>{
        if(data.json().response){
          this.assignedOolagas=data.json().data.reverse()
          if(data.json().data[0] != null){this.assigned_oolaga_enable=true;}
          else{this.assigned_oolaga_enable=false;}
        }
        else{this.assigned_oolaga_enable=false;}
        //refresh.complete();
        // this.enableScroll=false;
       // this.refreasherEnabled=false;
      },err=>{
        //alert(JSON.stringify('error'+err));
        //refresh.complete();
        // this.enableScroll=false;
       // this.refreasherEnabled=false;
      })
    }
	  
  }
  tabChange() {
    let len: number = this.slides.length()
    let currentIndex = this.slides.getActiveIndex();
    if (len > 0) {
      if (this.activeSec == 'draft') {
        if (currentIndex != 0) {
          this.slides.slideTo(0)

        }
      }
      else if (this.activeSec == 'auction') {
        if (currentIndex != 1) {
          this.slides.slideTo(1)

        }
      }
      else if (this.activeSec == 'active') {
        if (currentIndex != 2) {
          this.slides.slideTo(2)
        }
      }
    }
  }
  
  titleCase(str){
if(str){
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}else{
	return "";
}

}
  openChat(value,image,name, oolagaid){
    console.log(value)
    this.navCtrl.push(ChatPage,{receiver_id:value,image:image,name:name, oolaga:oolagaid})
    // let chat = this.modelCtrl.create(ChatPage,{receiver_id:value,image:image,name:name});
    // chat.dismiss(data=>{
    // })
    // chat.present();
  }
  oolaga_detail(value){
    if(value.service=='Labor Only'){
      if(this.page_selection){
        this.navCtrl.push(LaboronlysummaryPage,{data:value})
      }
      this.page_selection=true;
    }
    else{
      if(this.page_selection){
        this.navCtrl.push(OolagaSummaryPage,{data:value,page:'auction'})
      }
      this.page_selection=true;
    }
  }
  active_oolaga_detail(value){
    if(value.cancel_status!='cancel_by_helper'){
        console.log(value)
        this.navCtrl.push(OolagaSummaryPage,{data:value,page:'active'})
    }
    else{
      let alert= this.alertCtrl.create({
        title:'Do you want to delete',
        buttons:[{
          text:'NO',
          handler:()=>{
          }
        },{
          text:'YES',
          handler:()=>{
            let loading=this.loadingCtrl.create()
             loading.present();
             this.http.get(ENV.api + '/webservicedeletecanceledoolaga/'+value.oolaga_id)
             .subscribe(data=>{
               if(data.json().response){
                 this.ionViewWillEnter();
               }
               loading.dismiss();
             },err=>{
               loading.dismiss();
             })
          }
        }]
      })
      alert.present();
    }
  }
  deleteCancelOolaga(){

  }
  openmap(value){
    if(value.service_id==7){

    }
    else if(value.service_id!=7){
      console.log('map')
      this.navCtrl.push(AssignedOolagaMapPage,{data:value})
    }
  }
  deleteDraft(value){
    // this.http.get(ENV.api + '/webservicedeleteDraft/'+value.id)
    console.log('DeleteEnable');
    let confirm=this.alertCtrl.create({
          title:'Souhaitez-vous supprimer votre brouillon ?',
          buttons:[ 
                    { 
                     text:'OUI',
                     handler:()=>
                     {
                       let loading=this.loadingCtrl.create()
                       loading.present();
                       this.http.get(ENV.api + '/webservicedeleteDraft/'+value.id)
                       .subscribe(data=>{
                         if(JSON.parse(data['_body']).response)
                         {  
                            this.http.get(ENV.api + '/webservicedraftOolaga/' + localStorage['user_id'])
                            .subscribe(data=>{
                              let d =JSON.parse(data['_body']);
                              if(d.response){
                                if(d.services[0] == null)
                                {
                                  this.draft_oolaga_enable=true;
                                }
                                else if(d.services[0] != null){
                                  this.draft_oolaga_enable=false;
                                  this.data1=d.services;
                                  this.data1.reverse();
                                }
                              }
                              else{
                                  this.draft_oolaga_enable=true;
                              }
                              loading.dismiss();
                              let alert = this.alertCtrl.create({
                                  title:'Votre brouillon a été supprimé',
                                  buttons:[{
                                    text:'Ok'
                                  }]
                                })
                              alert.present();
                            })
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
                     text:'NON',
                     handler:()=>
                     {

                     },
                   }]
                  });
      confirm.present();
  }
  showDraft(value){
    console.log(value);
    localStorage['draftOolaga']=JSON.stringify(value);
      this.navCtrl.push(DraftOolagaPage);
  }
  
  createoolaga(){
    if(!this.draft_oolaga_enable){
      let confirm=this.alertCtrl.create({
          message:'Nous avons remarqué que vous avez un projet enregistré dans vos brouillons. Souhaitez-vous modifier votre brouillon ou créer un nouveau projet?',
          buttons:[{ text:'Nouveau',
                     handler:()=>
                        {
                          this.appProvider.createNew();
                          this.navCtrl.push(CreateolagaPage,{data:'new'});
                        },
                    },
                    { 
                     text:'	Modifier',
                     handler:()=>{
                          this.navCtrl.push(CreateolagaPage,{data:'new'});
                         // this.navCtrl.push(DraftOolagaPage,{data:'new'});
                       },
                   }]
                  });
      confirm.present();
    }
    else{
      this.appProvider.createNew();
      this.navCtrl.push(CreateolagaPage,{data:'new'});
    }
  }
  notificationpage(id,offer, time){
    if(offer!=0 || offer!='0'){
		if(time<1){
			 let alert=this.alertCtrl.create({
        title:'Pardon',
        message:'Les offres ne peuvent être acceptées si votre Oolaga est programmé dans moins d\'une heure.',
        buttons:['Ok']
      })
      alert.present();
	  return false;
		}
      this.navCtrl.push(OfferPage,{id:id, time:time});
    }
    else{
      let alert=this.alertCtrl.create({
        title:'Oups',
        message:'Vous n\'avez pas encore reçu d\'offre',
        buttons:['OK']
      })
      alert.present();
    }
  }
  messagespage(){
    this.msg_no=0;
    localStorage['msg_no']=0;
    this.navCtrl.push(InboxPage);
  }
  ionViewDidEnter(){
    if(this.activeSlide)
    {
      this.slides.slideTo(2);this.activeSlide=false;
    }
  }
  @HostListener('scroll', ['$event'])
  onScroll(event) {
    if(this.activeSec=="draft"){
      if(document.getElementById('draft_slide').scrollTop==0){this.enableScroll1=true;}
      else{this.refreasherEnabled?'':this.enableScroll1=false}
    }
    if(this.activeSec=="auction"){
      if(document.getElementById('auction_slide').scrollTop==0){this.enableScroll2=true;}
      else{this.refreasherEnabled?'':this.enableScroll2=false}
    }
    if(this.activeSec=="active"){
      if(document.getElementById('active_slide').scrollTop==0){this.enableScroll3=true;}
      else{this.refreasherEnabled?'':this.enableScroll3=false}
    }
  }
  ionViewWillEnter() {
    this.enable_service=true;
    localStorage['chat']=0;
    localStorage['draft_oolaga']=true;
    // this.http.post(this.link + '',{user_id:localStorage['user_id']})
    // .subscribe(data=>{
    //   console.log(JSON.parse(data._body).response);
    //   localStorage['draft_oolaga']=true;
    //   localStorage['draft_oolaga']=false;
    // })
    let loading = this.loadingCtrl.create()
    loading.present();
    Observable.forkJoin(
      this.http.post(ENV.api + '/webserviceuserOolagas',{user_id:localStorage['user_id']}),
      this.http.get(ENV.api + '/webservicedraftOolaga/' + localStorage['user_id']),
      this.http.post(ENV.api +'/webserviceshowuseroolaga',{user_id:localStorage['user_id']})
      )
    .subscribe(data => {
      let data1= JSON.parse(data[0]['_body']);
      let data2= JSON.parse(data[1]['_body']);
      let data3= JSON.parse(data[2]['_body']);
      console.log('active',data1);
      console.log('draft',data2);
      console.log('assignedOolagas',data3);
      if(data3.response){
      this.assignedOolagas=data3.data.reverse()
        if(data3.data[0] != null){
          this.assigned_oolaga_enable=true;
          console.log(1)
        }
        else{
          this.assigned_oolaga_enable=false;
          console.log(2)
        }
      }else{
        this.assigned_oolaga_enable=false;
          console.log(3)
      }
      if(data1.response){
        if(data1.oolagas[0] == null)
        {
          this.oolaga_created=true;
        }
        else if(data1.oolagas[0] != null){
          this.oolaga_created=false;
          this.data=data1.oolagas;
          this.data.reverse();
		  var date = new Date().getDate();
			var date_month = new Date().getMonth();
			var date_year = new Date().getFullYear();
			var final_date=new Date(date_year,date_month,date);
			console.log(this.data);
			this.data=this.data.filter(d=>new Date((20+d.date.split('-')[2]),parseInt(d.date.split('-')[1])-1, d.date.split('-')[0]).getTime() >=final_date.getTime());
            this.data = this.data.map(function(el) {
						   
						      var time=el.first_time; 
							  console.log(el);
							   var zero = 2 - el.date.split('-')[1].toString().length + 1;
							 var mm= Array(+(zero > 0 && zero)).join("0") + el.date.split('-')[1];   
							 
							 var zer = 2 - el.date.split('-')[0].toString().length + 1;
							 var dd= Array(+(zer > 0 && zer)).join("0") + el.date.split('-')[0];
							 
							// alert(dd);
							  var date_string=20+el.date.split('-')[2]+"-"+(mm)+"-"+dd+'T'+time;						 
							 var date1=new Date(date_string);
							 var date2=new Date();
							 console.log('Difference');
							 console.log(date1);
							 console.log(date2);
							var difference =(date1.getTime() - date2.getTime()) / 1000;
							difference /= (60 * 60);
							console.log(difference);
							
							  var o = Object.assign({}, el);
							  o.remaining_time=difference;
							  return o; 
							})
			console.log(JSON.stringify(this.data));							
		}
      }
      else{
          this.oolaga_created=true;
      }

      if(data2.response){
        if(data2.services[0] == null)
        {
          this.draft_oolaga_enable=true;
        }
        else if(data2.services[0] != null){
          this.draft_oolaga_enable=false;
          this.data1=data2.services;
          this.data1.reverse();
        }
      }
      else{
          this.draft_oolaga_enable=true;
      }
        loading.dismiss();
        this.content.scrollToTop();
      },err => {
        loading.dismiss();
       // alert(JSON.stringify('error'+err));
      });
    this.update_msg();
  }
  ionViewWillLeave() {
    this.enable_service=false;
  }
  update_msg(){
    if(this.enable_service==true){
      setTimeout(()=>{
        this.msg_no++
        this.update_msg()
      },5000)
    }
  }
  get_detail(value){
    this.navCtrl.push(OolagaDetailsPage,{data:value})
  }
  
  padZero(num, places) {
	  var zero = places - num.toString().length + 1;
	  return Array(+(zero > 0 && zero)).join("0") + num;
	}
	
	getServiceName(string){
		return string.replace(/<[^>]*>/g, '');
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
}

