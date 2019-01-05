import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactusPage} from '../contactus/contactus';
import {HowPage} from '../how/how';
import { FAQPage} from '../faq/faq';
import { PrivacyPolicyPage} from '../privacy-policy/privacy-policy';
import {TermsofServicePage}from '../termsof-service/termsof-service';
import {CancellationPage} from '../cancellation/cancellation' 
/*
  Generated class for the Help page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {
	howpage;
	contactuspage;
  faq;
  privacy;
  termsofservice
  cancellation
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.howpage=HowPage;
  	this.contactuspage=ContactusPage;
    this.faq=FAQPage;
    this.privacy=PrivacyPolicyPage;
    this.cancellation=CancellationPage
    this.termsofservice=TermsofServicePage
    //this.help(this.navParams.get('help'))
  }
  help(value){
    if(localStorage['helpPage']=='category'){
      alert('category')
    }
    else if(localStorage['helpPage']=='help'){
      alert('help')
    }
    else if(localStorage['helpPage']=='location'){
      alert('location')
    }
    else if(localStorage['helpPage']=='item'){
      alert('item')
    }
    else if(localStorage['helpPage']=='helper'){
      alert('helper')
    }
    else if(localStorage['helpPage']=='date&time'){
      alert('date&times')
    }
    else if(localStorage['helpPage']=='summary'){
      alert('summary')
    }
    else if(localStorage['helpPage']=='addeditems'){
      alert('addeditems')
    }
  }
}
