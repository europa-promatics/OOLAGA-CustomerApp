var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { FCM } from '@ionic-native/fcm';
//-------------------------calendar----------------------------------
import { NgCalendarModule } from 'ionic2-calendar';
import 'intl';
import 'intl/locale-data/jsonp/en';
//--------------pages---------------------------------------------
import { MyApp } from './app.component';
import { AlertsPage } from '../pages/myoolaga/alerts/alerts';
import { InboxPage } from '../pages/myoolaga/inbox/inbox';
import { MyoolagaPage } from '../pages/myoolaga/myoolaga';
import { ProfilePage } from '../pages/profile/profile';
import { HelpPage } from '../pages/help/help';
import { InvitePage } from '../pages/invite/invite';
import { CreditPage } from '../pages/credit/credit';
import { PaymentPage } from '../pages/payment/payment';
import { HelperPage } from '../pages/helper/helper';
import { LoginPage } from '../pages/login/login';
import { RegisterationPage } from '../pages/registeration/registeration';
import { CreateolagaPage } from '../pages/createolaga/createolaga';
import { PastoolagaPage } from '../pages/pastoolaga/pastoolaga';
import { ContactusPage } from '../pages/contactus/contactus';
import { LocationSelectPage } from '../pages/location-select/location-select';
import { HowPage } from '../pages/how/how';
import { ForgotPage } from '../pages/forgot/forgot';
import { OolagaDetailsPage } from '../pages/oolaga-details/oolaga-details';
import { PastOolagaDetailsPage } from '../pages/past-oolaga-details/past-oolaga-details';
import { DetailForHelperPage } from '../pages/detail-for-helper/detail-for-helper';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { HelperSelectionPage } from '../pages/helper-selection/helper-selection';
import { SelectTimeDatePage } from '../pages/select-time-date/select-time-date';
import { ReviewDetailsPage } from '../pages/review-details/review-details';
import { FAQPage } from '../pages/faq/faq';
import { PricequotePage } from '../pages/pricequote/pricequote';
import { YourPricePage } from '../pages/your-price/your-price';
import { Storage } from '@ionic/storage';
import { ChatPage } from '../pages/chat/chat';
import { EditLocationDetailPage } from '../pages/edit-location-detail/edit-location-detail';
import { EditItemDetailPage } from '../pages/edit-item-detail/edit-item-detail';
import { FeedbackPage } from '../pages/feedback/feedback';
import { HireHelperPage } from '../pages/hire-helper/hire-helper';
import { SummaryPage } from '../pages/summary/summary';
import { SelectTimePage } from '../pages/select-time/select-time';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { ItemDetailHelpPage } from '../pages/item-detail-help/item-detail-help';
import { CancellationPage } from '../pages/cancellation/cancellation';
import { TermsofServicePage } from '../pages/termsof-service/termsof-service';
import { DraftOolagaPage } from '../pages/draft-oolaga/draft-oolaga';
import { AddeditemsPage } from '../pages/addeditems/addeditems';
import { FillLocationDetailPage } from '../pages/fill-location-detail/fill-location-detail';
import { FillStorePickUpDetailPage } from '../pages/fill-store-pick-up-detail/fill-store-pick-up-detail';
import { OolagaPaymentPage } from '../pages/oolaga-payment/oolaga-payment';
import { SummaryEditLocationPage } from '../pages/summary-edit-location/summary-edit-location';
import { PriceInputPage } from '../pages/price-input/price-input';
import { PoptimePage } from '../pages/poptime/poptime';
import { OfferPage } from '../pages/offer/offer';
import { OpenOfferPage } from '../pages/open-offer/open-offer';
import { OolagaSummaryPage } from '../pages/oolaga-summary/oolaga-summary';
import { AssignedOolagaMapPage } from '../pages/assigned-oolaga-map/assigned-oolaga-map';
import { LaboronlyPage } from '../pages/laboronly/laboronly';
import { LaboronlysummaryPage } from '../pages/laboronlysummary/laboronlysummary';
import { CancelOolagaPage } from '../pages/cancel-oolaga/cancel-oolaga';
import { TestPage } from '../pages/test/test';
import { NotificationPage } from '../pages/notification/notification';
import { OpenItemPicPage } from '../pages/open-item-pic/open-item-pic';
//=-----------providers----------------------------
import { AppProvider } from '../providers/app-provider';
import { Draft } from '../providers/draft';
import { FileChooser } from '@ionic-native/file-chooser';
//--------------------pipes------------------------------
import { InfoFilter, TimeMomentFormat, DateConvert } from '../pipes/time-moment-format';
import { Timer, StartingTime } from '../pipes/timer';
import { Chatfilter } from '../pipes/chatfilter';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                FAQPage,
                PricequotePage,
                PastOolagaDetailsPage,
                EditItemDetailPage,
                CancellationPage,
                EditLocationDetailPage,
                PrivacyPolicyPage,
                ContactusPage,
                LocationSelectPage,
                ChatPage,
                MyoolagaPage,
                HowPage,
                ForgotPage,
                InboxPage,
                AlertsPage,
                ProfilePage,
                HelpPage,
                InvitePage,
                CreditPage,
                PaymentPage,
                HelperPage,
                LoginPage,
                RegisterationPage,
                CreateolagaPage,
                PastoolagaPage,
                OolagaDetailsPage,
                DetailForHelperPage,
                ItemDetailPage,
                HelperSelectionPage,
                SelectTimeDatePage,
                ReviewDetailsPage,
                YourPricePage,
                FeedbackPage,
                HireHelperPage,
                SummaryPage,
                SelectTimePage,
                ItemDetailHelpPage,
                TermsofServicePage,
                DraftOolagaPage,
                AddeditemsPage,
                FillLocationDetailPage,
                FillStorePickUpDetailPage,
                OolagaPaymentPage,
                SummaryEditLocationPage,
                PriceInputPage,
                PoptimePage,
                OfferPage,
                OpenOfferPage,
                OolagaSummaryPage,
                AssignedOolagaMapPage,
                LaboronlyPage,
                LaboronlysummaryPage,
                CancelOolagaPage, TestPage,
                NotificationPage, OpenItemPicPage,
                ////pipes
                TimeMomentFormat,
                Timer,
                StartingTime,
                Chatfilter,
                InfoFilter,
                DateConvert
            ],
            imports: [NgCalendarModule,
                IonicModule.forRoot(MyApp, {
                    pageTransition: 'ios-transition'
                }, {}),
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp, FAQPage,
                PastOolagaDetailsPage,
                ChatPage,
                EditItemDetailPage,
                EditLocationDetailPage,
                ContactusPage,
                LocationSelectPage,
                MyoolagaPage,
                HowPage,
                CancellationPage,
                ForgotPage,
                InboxPage,
                AlertsPage,
                PrivacyPolicyPage,
                ProfilePage,
                HelpPage,
                InvitePage,
                CreditPage,
                PaymentPage,
                HelperPage,
                PricequotePage,
                LoginPage,
                RegisterationPage,
                CreateolagaPage,
                PastoolagaPage,
                OolagaDetailsPage,
                DetailForHelperPage,
                ItemDetailPage,
                HelperSelectionPage,
                SelectTimeDatePage,
                ReviewDetailsPage,
                YourPricePage,
                FeedbackPage,
                HireHelperPage,
                SummaryPage,
                SelectTimePage,
                ItemDetailHelpPage,
                TermsofServicePage,
                DraftOolagaPage,
                AddeditemsPage,
                FillLocationDetailPage,
                FillStorePickUpDetailPage,
                OolagaPaymentPage,
                SummaryEditLocationPage,
                AssignedOolagaMapPage,
                PriceInputPage,
                PoptimePage,
                OfferPage,
                OpenOfferPage,
                OolagaSummaryPage,
                LaboronlyPage,
                LaboronlysummaryPage,
                CancelOolagaPage,
                TestPage,
                NotificationPage, OpenItemPicPage
            ],
            providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
                Storage,
                Draft,
                FCM,
                Device,
                AppProvider,
                FileChooser]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map