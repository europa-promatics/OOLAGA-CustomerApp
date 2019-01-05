import { Injectable, Pipe } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'timemomentformat'
})
@Injectable()
export class TimeMomentFormat {
   transform(value: string, format: string = "h:mm a"): string {
        if (value=='SELECT A TIME' || !value) {
            return value;
        }
        let val='2017-04-29T'+value+':00.00Z'
        console.log(value)
       // return moment(val).utc().format(format)
	   return value;
    }
}
@Pipe({
  name: 'infoFilter'
})
@Injectable()
export class InfoFilter {
   transform(value: string): string {
   	let b='';
        if (value=='SELECT A TIME' || !value) {
            return value;
        }
        let a = value.split('\n');
        for(let i=0;i<a.length;i++){
        	b=b+a[i]
        	if(i!=a.length-1){
        		b=b+'<br />'
        	}
        }
        return b
	}
}
@Pipe({
  name: 'dateConvert'
})
@Injectable()
export class DateConvert {
   transform(value: string): string {
        if (value=='SELECT A TIME' || !value) {
            return value;
        }
        let a = value;/*.split('-').reverse().toString().replace(',','-').replace(',','-');*/
        return a
	}
}
