import { Injectable } from '@angular/core';
@Injectable()
export class Draft {
oolaga;
  constructor() {
   this.oolaga = 1
    console.log('Oolagadata Provider');
  }
  storedata(){
     console.log(this.oolaga)
  }

}
