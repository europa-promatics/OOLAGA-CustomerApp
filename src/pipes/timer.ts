import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'timer'
})
@Injectable()
export class Timer {
   transform(value: string, format: string = "hh:mm a"): string {
        let a=Date.parse(value)+24*60*60*1000
        let b=Date.parse(new Date().toString())
        if(a>b==false){return '00h 00m'}
        else{
          let c=(a-b)/1000
          return (Math.floor(c/(60*60))).toString()+'h '+(Math.floor((c%(60*60))/60)).toString()+'m'
        }
    }
}

@Pipe({
  name: 'objectTimer'
})
@Injectable()
export class ObjectTimer {
   transform(value: any, format: string = "hh:mm a"): string {
	    var date_parts=value.date.split('-'); 
		var time_parts=value.first_time.split(':');
	    var date='20'+date_parts[2]+'-'+date_parts[1]+'-'+date_parts[0]+' '+(time_parts[0]-1)+':'+time_parts[1];
        let a=new Date(date);
		let b=new Date();
		return this.milliseconds(a.getTime()-b.getTime());
		/* //a.setHours( a.getHours() - 1 );		
        let b=Date.parse(new Date().toString())
        if(a>b==false){return '00h 00m'}
        else{
          let c=(a-b)/1000
          return (Math.floor(c/(60*60))).toString()+'h '+(Math.floor((c%(60*60))/60)).toString()+'m'
        } */
    }
	  
	  milliseconds(date_future){  
		//date_future = new Date('2011-04-11T10:20:30Z')
var seconds=date_future*0.001;

var numdays = Math.floor(seconds / 86400);

var numhours = Math.floor((seconds % 86400) / 3600);

var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);

var numseconds = ((seconds % 86400) % 3600) % 60;

if(numdays>0){
	if(numdays==1){
			return numdays + " jour ";
	}
	else{
		return numdays + " jours ";
	}
	// + numhours + " hours " + numminutes + " minutes ";
}else{
	if(numhours > 0){
		return  numhours + "h" + numminutes + "m";
	}else{
		if(numminutes > 0){
			return numminutes + "m";
		}else{
			return "Expiré"
		}
	}
}
//return numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";


	  }
}


@Pipe({
  name: 'startingTime'
})
@Injectable()
export class StartingTime {
   transform(value: string, format: string = "hh:mm a"): string {
        let val = value.split('|')
        val[1]=val[1]+':00.000000'
        let a= val[0].split('-')
        let b= '20'+a[2]+'-'+a[1]+'-'+a[0]+' '+val[1];
        let x=Date.parse(b)
        let y=Date.parse(new Date().toString())
        if(x>y==false){return 'En attente'}
        else{
          let c=(x-y)/1000
          let day=(Math.floor((c/(60*60))/24))
          let hr=(Math.floor((c/(60*60))%24))
          let mint=(Math.floor((c%(60*60))/60))
          return (day!=0?day.toString()+'j ':'')+hr.toString()+'h '+mint.toString()+'m ';
        }
    }
}