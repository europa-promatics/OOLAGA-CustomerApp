import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { HelperSelectionPage} from '../helper-selection/helper-selection';
import { SelectTimeDatePage} from '../select-time-date/select-time-date';
import { EditItemDetailPage }from '../edit-item-detail/edit-item-detail';
import {ENV} from '../../app/env';
import {Http} from '@angular/http';
import {AppProvider} from '../../providers/app-provider';
@Component({
  selector: 'page-addeditems',
  templateUrl: 'addeditems.html'
})
export class AddeditemsPage {
  items;
  selecteditem=null;
  http
  loading
  popup:boolean=false;
  enableclear:boolean=false;
  constructor(private appProvider:AppProvider,public loadingCtrl:LoadingController,http:Http,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
    this.http=http;
  }
  edit(value){
    this.navCtrl.push(EditItemDetailPage,{itemDetails:value});
  }
  ionViewDidEnter() {
    this.items=this.appProvider.current.items;
    console.log('ionViewDidLoad AddeditemsPage');
  }
  help(){
    let alert = this.alertCtrl.create({
      title: 'Objet(s) ajouté(s)',
      message: 'Cette page est un récapitulatif de tous les objets que vous avez ajoutés. A cette étape, vous pouvez les modifier ou supprimer si nécessaire en appuyant sur le bouton d’options, symbolisé par trois petits points.',
      buttons: ['OK']
    })
    alert.present();
  }
  submit(value){
    if(this.appProvider.current.summary_edit_item){
        this.navCtrl.pop()
    }
    else if(value==0){
        this.navCtrl.pop()
    }
    else if(value==1){
        let alert = this.alertCtrl.create({
          message:"Gardez à l'esprit que les gros articles nécessitent au moins deux personnes. Si vous ne pouvez pas aider, vous pouvez créer un Oolaga 'Labor seulement' séparé une fois que vous avez finalisé celui-ci",
          buttons:[
          {
            text:'CONTINUER',
            handler:()=>{
              this.navCtrl.push(SelectTimeDatePage,{});
            }
          }]
        })
        alert.present();
    }  
  }
  enablecleartrue(){
    setTimeout(()=>{this.enableclear=true},100);
  }
  select(value){
    this.selecteditem=value;
    console.log(this.selecteditem)
    setTimeout(()=>{this.enableclear=true},100);
  }
  delete(item){
    console.log(item);
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    let link=ENV.api+'/webservicedeleteItem'
    this.http.post(link,{item_id:item.item_id}).subscribe(data=>{
      console.log(JSON.parse(data._body));
            if(JSON.parse(data._body).response==true){
              this.remove_item(item.item_id)
            }else{}
    })
  }
  remove_item(id){
    for(var i=0;i<this.items.length;i++){
        if(this.items[i].item_id==id){
          this.items.splice(i,1)
        }
      }
      localStorage['items']=JSON.stringify(this.items);
      this.appProvider.current.items=this.items;
      this.loading.dismiss();
      console.log(this.items.length)
      if(this.items[0]==null){
        this.navCtrl.pop()
      }
  }
}
