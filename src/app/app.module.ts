import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {
    ButtonModule,
    CalendarModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    GrowlModule,
    InputTextModule,
    MessagesModule,
    PanelModule,
    ProgressBarModule,
    RadioButtonModule,
    TabViewModule
} from 'primeng/primeng';


import {AppComponent} from './app.component';

import {LoginComponent} from './components/login/login.component';
import {RoutingModule} from './app.routes';
import {AuthService} from "./services/auth.service";
import {HomepageComponent} from './pages/homepage/homepage.component';
import {UtilityService} from "./services/utility.service";
import {Globals} from "./globals";
import {DashboardVenComponent} from './pages/dashboard-ven/dashboard-ven.component';
import {SmGWWidgetComponent} from './components/sm-gwwidget/sm-gwwidget.component';
import {MessageService} from "./services/data.service";
import {SmMWWidgetComponent} from "./components/sm-mwwidget/sm-mwwidget.component";
import {SmRWWidgetComponent} from "./components/sm-rwwidget/sm-rwwidget.component";
import {SmTWWidgetComponent} from "./components/sm-twwidget/sm-twwidget.component";
import {BwellLevelWidgetComponent} from './components/bwell-level-widget/bwell-widget.component';
import {SwiperModule} from 'angular2-useful-swiper';
import {PumpLevelWidgetComponent} from './components/pump-widget/pump-widget.component';
import {UiSwitchModule} from 'angular2-ui-switch/src';
import {SumpLevelWidgetComponent} from "./components/sump-level-widget/sump-level-widget.component";
import {WTPWidgetComponent} from "./components/wtp-widget/wtp-widget.component";
import {StpWidgetComponent} from "./components/stp-widget/stp-widget.component";
import {ROWidgetComponent} from "./components/ro-widget/ro-widget.component";
import {BlockWidgetComponent} from './components/block-widget/block-widget.component';
import {AlarmsWidgetComponent} from "./components/alarms-widget/alarms-widget.component";
import {WeatherComponent} from './components/weather/weather.component';
import {NavCompComponent} from "./components/nav-comp/nav-comp.component";
import {VenblockComponent} from './pages/venblock/venblock.component';
import {ReportsComponent} from './pages/reports/reports.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {SiteComponent} from './components/site/site.component';
import {BlockSideWidgetComponent} from './components/block-side-widget/block-side-widget.component';
import {InvoiceComponent} from "./pages/invoices/invoice.component";
import {BwellIntelligenceWidgetComponent} from "./components/bwell-intelligence/bwell-intelligence-widget.component";
import {BwellControlWidgetComponent} from "./components/bwell-control-widget/bwell-control-widget.component";
import {PopupComponent} from "./components/popup/popup.component";
import {RegisterComponent} from "./components/register/register.component";
import {StatusComponent} from "./components/status/status.component";
import {EnsureAuthenticated} from "./services/ensure-authenticated.service";
import {LoginRedirect} from "./services/login-redirect.service";
import {AuthHttp} from "angular2-jwt";
import {PingService} from "./services/ping.service";
import {ArchwizardModule} from 'ng2-archwizard/dist';
import {ModalDialogModule} from 'ngx-modal-dialog';
import {Ng2SmartTableModule} from "ng2-smart-table";


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomepageComponent,
        DashboardVenComponent,
        SmGWWidgetComponent,
        SmMWWidgetComponent,
        SmRWWidgetComponent,
        SmTWWidgetComponent,
        BwellLevelWidgetComponent,
        PumpLevelWidgetComponent,
        SumpLevelWidgetComponent,
        WTPWidgetComponent,
        StpWidgetComponent,
        ROWidgetComponent,
        BlockWidgetComponent,
        AlarmsWidgetComponent,
        WeatherComponent,
        NavCompComponent,
        VenblockComponent,
        ReportsComponent,
        SettingsComponent,
        PopupComponent,
        SiteComponent,
        BlockSideWidgetComponent,
        InvoiceComponent,
        BwellIntelligenceWidgetComponent,
        BwellControlWidgetComponent,
        RegisterComponent,
        StatusComponent

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        DataTableModule,
        HttpModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        GrowlModule,
        RoutingModule,
        PanelModule,
        ProgressBarModule,
        SwiperModule,
        UiSwitchModule,
        DropdownModule,
        CalendarModule,
        RadioButtonModule,
        TabViewModule,
        MessagesModule,
        ArchwizardModule,
        ModalDialogModule.forRoot(),
        Ng2SmartTableModule
    ],
    providers: [AuthService, UtilityService, Globals, MessageService, EnsureAuthenticated, LoginRedirect, AuthHttp, PingService],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule {
}