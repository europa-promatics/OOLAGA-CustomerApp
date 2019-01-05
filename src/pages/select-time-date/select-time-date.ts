import { Component } from '@angular/core';
import { NavController, NavParams,ModalController, AlertController,LoadingController,PopoverController} from 'ionic-angular';
import { YourPricePage }from '../your-price/your-price';
import { PoptimePage } from '../poptime/poptime'
import { AppProvider } from '../../providers/app-provider'
import { ENV } from '../../app/env';
import { Http } from '@angular/http';
@Component({
  selector: 'page-select-time-date',
  templateUrl: 'select-time-date.html'
})
export class SelectTimeDatePage {
  enabletimediv:boolean=false;
  popshow:any;
  divcount:any;;
  count=0;
  showlast:boolean=false;
  enablenext:boolean=true;
  enable:boolean=false;
  firsttime=null;
  lasttime=null;
  myDate:string;
  myTime:string; 
  yyyy; 
  SelectedTime;
  calendarEvent:any = {};
    attendees = [{email:""}];
    validation:any = {}; 
    eventSource;
    viewTitle;
    isToday:boolean;
    calendar = {mode: 'month',currentDate: new Date(), locale: 'en-GB'};
    http
    am_pm:boolean=false;
    mm:number=0;
    hh:number=0;
    ondivclick:boolean=false;
  constructor(public popoverCtrl:PopoverController,public loadingCtrl:LoadingController,http:Http,private appProvider:AppProvider,public alertCtrl:AlertController,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
    this.http=http;
	
  }
  ionViewDidLoad(){
    var today = new Date();
    this.yyyy = today.getFullYear();
    this.myDate= new Date().toISOString().substring(0,10);
    this.appProvider.current.firstAvailableTime ? this.firsttime=this.appProvider.current.firstAvailableTime : this.firsttime='Sélectionnez un horaire';
    this.appProvider.current.lastAvailableTime ? this.lasttime=this.appProvider.current.lastAvailableTime : this.lasttime='Sélectionnez un horaire';
    this.appProvider.current.lastAvailableTime ? this.showlast=true : this.showlast=false;
    let someday = new Date();
    let a = someday.getDate().toString().length==1?'0'+someday.getDate().toString():someday.getDate().toString();
    let b = (someday.getMonth()+1).toString();
        b = b.length==1?'0'+b:b;
        console.log(a+ '-' + b + '-' + someday.getFullYear().toString().substr(-2))
        this.appProvider.current.date= a+ '-' + b + '-' + someday.getFullYear().toString().substr(-2);
 }
  checktime(value){
    if(this.lasttime==null || this.lasttime=="Sélectionnez un horaire"){
      this.enable=true
    }
    else{
      let a = this.firsttime.split(':')
      let b = this.lasttime.split(':')
      if(parseInt(a[0]) * 60 + parseInt(a[1]) < parseInt(b[0]) * 60 + parseInt(b[1])){
        this.enable=true
      }
      else{
        let alert =this.alertCtrl.create({
          subTitle:'Last available start time should not be less then First time',
          buttons:['Ok']
        })
        alert.present()
        this.enable=false
      }
    }
  }
  help(){
    let alert = this.alertCtrl.create({
      title: 'Date & Horaires',
      message: ' Dites-nous quand vous souhaitez planifier votre projet. Vous pouvez fournir une tranche horaire plus longue en appuyant sur le bouton "Je suis flexible". ',
      buttons: ['OK']
    })
    alert.present();
  }
  flexable(){
    this.lasttime=null;
    this.showlast=!this.showlast;
    console.log(this.firsttime,this.lasttime)
    if(this.showlast==false){
      this.enable=true
    }
  }
  show_last_time(myevent){
    let popover=this.popoverCtrl.create(PoptimePage)
    popover.present({
      ev:myevent
    })
    popover.onDidDismiss(data => {
      console.log(data)
      this.myTime=this.appProvider.current.firstAvailableTime;
      this.lasttime=this.appProvider.current.firstAvailableTime;
      this.appProvider.current.last_time=this.appProvider.current.firstAvailableTime
    })
  //   let timeModal = this.modalCtrl.create(SelectTimePage);
  //   timeModal.onDidDismiss(data => {
  //    this.myTime=data;
  //    this.lasttime=data;
  //    this.appProvider.current.lastAvailableTime=data;
  //    console.log(this.appProvider.current.lastAvailableTime)
  //    });
  //    timeModal.present();
  // // }
  // enabletimedivCheck(){
  //   console.log(this.ondivclick)
  //  if(this.ondivclick && this.popshow=='show'){
  //     if(this.divcount==1 && this.popshow=='show'){
  //       this.enabletimediv=false;
  //       this.count=0;
  //       this.divcount=0
  //       this.popshow='hide';
  //       console.log('iff data 1')
  //     }else{
  //       // this.divcount=0; 
  //       // this.enabletimediv=false;
  //       // this.count=0;
  //        console.log('iff data else')
  //     }
    
  //  }
  // if(this.divcount==0 && this.popshow=='show'){
  //   // this.ondivclick=false; 
  //    if(this.popshow=='show'){
  //        if(this.count==0 && this.popshow=='show'){
  //          this.enabletimediv=true;
  //          this.count=1;
  //          this.popshow='hide'
  //          console.log(this.count)
  //          console.log('hello if 1')
  //        }
  //        else{
  //           console.log('hello else')
  //           this.popshow='hide'
  //           this.enabletimediv=false;
  //           this.count=0;
  //        }
       
  //    }else{
  //     this.count=0;
  //     this.popshow='hide'
  //     this.enabletimediv=false;
  //      console.log('hello elswe')
  //    }
  //  }

  // }
  // ondiv(){
  //   console.log('kk')
  //   this.divcount=1;
  //   this.ondivclick=true; 
  }
  show_first_time(myevent){
    let popover=this.popoverCtrl.create(PoptimePage)
    popover.present({
      ev:myevent
    })
    popover.onDidDismiss(data => {
      console.log(data)
      this.myTime=this.appProvider.current.firstAvailableTime;
      this.firsttime=this.appProvider.current.firstAvailableTime;
      this.appProvider.current.first_time=this.appProvider.current.firstAvailableTime;
    })
   //  if(this.count==0){
   //     //this.enabletimediv=true;
   //     this.popshow='show';
   //     console.log('if')
   //     this.divcount=0;
   //     // this.ondivclick=false;
   //  }
   // //this.count=this.count+1;
   //  //this.enabletimediv=!this.enabletimediv;

    // let timeModal = this.modalCtrl.create(SelectTimePage);
    // timeModal.onDidDismiss(data => {
    //  this.myTime=data;
    //  this.firsttime=data;
    //  this.appProvider.current.firstAvailableTime=data;
    //  console.log(this.appProvider.current.firstAvailableTime)
    //  });
    //  timeModal.present();
  }
  submit(value){
	 //alert(this.firsttime);
    let enable=false
    console.log(this.firsttime,this.lasttime)
    if(this.firsttime!='Select A Time' && this.firsttime!='SELECT A TIME'){
      enable=true
    }
    this.myTime=this.firsttime
    this.appProvider.current.first_time=this.firsttime
    this.appProvider.current.last_time=this.lasttime
	

	
							
    if(value==0){
      this.navCtrl.pop()
    }
    else if(value==1){
      let loader = this.loadingCtrl.create()
      if(this.myTime && this.enablenext && this.enable && enable)
      { 
        // let x :any   = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+'T'+ new Date().getHours()+':'+ new Date().getMinutes()+':00.000Z'
        let x=new Date().getFullYear()+'-';
        (new Date().getMonth()+1).toString().length==1?x=x+'0'+(new Date().getMonth()+1):x=x+(new Date().getMonth()+1);
        (new Date().getDate()).toString().length==1?x=x+'-0'+(new Date().getDate()):x=x+'-'+new Date().getDate();
        (new Date().getHours()).toString().length==1?x=x+'T0'+(new Date().getHours()):x=x+'T'+new Date().getHours();
        (new Date().getMinutes()).toString().length==1?x=x+':0'+(new Date().getMinutes())+':00.000Z':x=x+':'+new Date().getMinutes()+':00.000Z';
        let time = '20'+this.appProvider.current.date.split('-')[2]+'-'+this.appProvider.current.date.split('-')[1]+'-'+this.appProvider.current.date.split('-')[0]
        let y    = time+'T'+this.appProvider.current.first_time+':00.000Z';
		//console.log(this.appProvider.current.first_time+':00.000Z');
        let a    = Date.parse(x)//+24*60*60*1000;
        let b    = Date.parse(y);
		console.log(b);
		console.log(a);
        console.log(b>a)
        if(b>a){
			var now=new Date(x);
			var selected_date=new Date(y);
			var difference =(selected_date.getTime() - now.getTime()) / 1000;
			difference /= (60 * 60);
			
		if(difference < 2){
		let alert =this.alertCtrl.create({
            subTitle:"Afin de laisser suffisamment de temps aux Helpers pour se préparer et se rendre à votre adresse de collection à l’heure, il est nécessaire que les projets soient programmés au moins 2 heures à l'avance.",
            buttons:['Ok'] 
          })
          alert.present()
			return false;
		}
			
          loader.present();
          // if(this.showlast==true){
          //   this.appProvider.current.time = this.appProvider.current.firstAvailableTime.start_time + '-' +this.appProvider.current.lastAvailableTime.end_time
          // }
          // else if(this.showlast==false){
          //   this.appProvider.current.time = this.appProvider.current.firstAvailableTime.start_time + '-' + this.appProvider.current.firstAvailableTime.end_time
          // }
          // localStorage['date']=this.myDate;
          // localStorage['time']=this.myTime;
          if(this.appProvider.current.summary_edit_dateTime){
            console.log('updated')
            this.http.post(ENV.api+'/webservicehelper_edit',{
                                         oolaga_id:this.appProvider.current.oolaga_id,
                                         date:this.appProvider.current.date,
                                         first_time:this.appProvider.current.first_time,
                                         last_time:this.appProvider.current.last_time
                                       })
                  .subscribe(data=>{
                    if(this.appProvider.current.Draft_edit_dateTime){
                      let a                       = JSON.parse(localStorage['draftOolaga']);
                      a.date                      = this.appProvider.current.date;
                      a.first_time                = this.appProvider.current.first_time;
                      a.last_time                 = this.appProvider.current.last_time;
                      localStorage['draftOolaga'] = JSON.stringify(a);
                    }
                    this.navCtrl.pop()
                    loader.dismiss();
                  },err=>{
                    loader.dismiss();
                  })
          }
          else{
            this.http.post(ENV.api+'/webservicehelper_edit',{
					 oolaga_id:this.appProvider.current.oolaga_id,
					 date:this.appProvider.current.date,
					 first_time:this.appProvider.current.first_time,
					 last_time:this.appProvider.current.last_time
				   })
                  .subscribe(data=>{
                    loader.dismiss();
                    this.navCtrl.push(YourPricePage);  
                  },err=>{
                    loader.dismiss();
                  })
          }
        }else{
          let alert =this.alertCtrl.create({
            subTitle:'Please select future time',
            buttons:['Ok']
          })
          alert.present()
        }
      } 
      else{
        let alert =this.alertCtrl.create({
          subTitle:'Enter valid Time and Date',
          buttons:['Ok']
        })
        alert.present()
        //this.navCtrl.push(YourPricePage,{});
      }   
    }
  }
  loadEvents() {
        this.eventSource = this.createRandomEvents();
    }

    onViewTitleChanged(title) {
		var year=title.split(' ');
		
		//alert(year[1]);
		
		if(title=="January "+year[1]){
			this.viewTitle = "JANVIER "+year[1];
		}
		if(title=="February "+year[1]){
			this.viewTitle = "FEVRIER "+year[1];
		}
		if(title=="March "+year[1]){
			this.viewTitle = "MARS "+year[1];
		}
		if(title=="April "+year[1]){
			this.viewTitle = "AVRIL "+year[1];
		}
		if(title=="May "+year[1]){
			this.viewTitle ="MAI "+year[1] ;
		}
		if(title=="June "+year[1]){
			this.viewTitle = "JUIN "+year[1];
		}
		if(title=="July"){
			this.viewTitle = "JUILLET "+year[1];
		}
		if(title=="August "+year[1]){
			this.viewTitle = "AOÛT "+year[1];
		}
		if(title=="September "+year[1]){
			this.viewTitle = "SEPTEMBRE "+year[1];
		}
		if(title=="October "+year[1]){
			this.viewTitle = "OCTOBRE "+year[1];
		}
		if(title=="November "+year[1]){
			this.viewTitle = "NOVEMBRE "+year[1];
		}
		if(title=="December "+year[1]){
			this.viewTitle = "DECEMBRE "+year[1];
		}  
    }

    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.appProvider.current.fullDate ? this.calendar.currentDate = this.appProvider.current.fullDate : this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
        localStorage['select']=ev.selectedTime;
        this.SelectedTime=localStorage['select']
        let text=ev.selectedTime.getDate();
        let today=new Date();
        let someday =new Date();
        someday.setFullYear(ev.selectedTime.getFullYear(), ev.selectedTime.getMonth(), ev.selectedTime.getDate());
        console.log('date'+someday)
        this.appProvider.current.fullDate=someday;
        console.log(ev.selectedTime.getFullYear(), ev.selectedTime.getMonth(), ev.selectedTime.getDate())
        if (someday < today) {
          alert("Please Enter valid Date");
          this.enablenext=false;
        }
        else{
          this.enablenext=true;
        } 
        console.log(text);
        var m;
          switch (this.SelectedTime.substring(4,7)) {
            case "Dec":
              m='12'
            break;
            case "Nov":
              m='11'
            break;
            case "Oct":
              m='10'
            break;
            case "Sep":
              m='09'
            break;
            case "Aug":
              m='08'
            break;
            case "Jul":
              m='07'
            break;
            case "Jun":
              m='06'
            break;
            case "May":
              m='05'
            break;
            case "Apr":
              m='04'
            break;
            case "Mar":
              m='03'
            break;
            case "Feb":
              m='02'
            break;
            case "Jan":
              m='01'
            break;
            default:
              break;
          }
        var date = this.SelectedTime.substring(8,10)+'-'+m+'-'+this.SelectedTime.substring(11,15).toString().substr(-2)
        localStorage['select']=date;
        this.myDate=date;
        console.log(date)
        this.appProvider.current.date=date;
    }

    onCurrentDateChanged(event:Date) {
		
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };
}
