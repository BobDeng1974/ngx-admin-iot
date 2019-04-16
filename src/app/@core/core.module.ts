import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { environment } from './../../environments/environment';

import { SecurityCamerasData } from './data/security-cameras';
import { SolarData } from './data/solar';

import { SecurityCamerasService } from './mock/security-cameras.service';
import { SolarService } from './mock/solar.service';
import { ApiDataService } from './mock/apidata.service';
import { ApiData } from './data/apidata';

import { SocketService } from './mock/socket.service';
import { SocketData } from './data/socketdata';

// const socialLinks = [
//   {
//     url: 'https://github.com/akveo/nebular',
//     target: '_blank',
//     icon: 'socicon-github',
//   },
//   {
//     url: 'https://www.facebook.com/akveo/',
//     target: '_blank',
//     icon: 'socicon-facebook',
//   },
//   {
//     url: 'https://twitter.com/akveo_inc',
//     target: '_blank',
//     icon: 'socicon-twitter',
//   },
// ];

const DATA_SERVICES = [
  // { provide: UserData, useClass: UserService },
  // { provide: ElectricityData, useClass: ElectricityService },
  // { provide: SmartTableData, useClass: SmartTableService },
  // { provide: UserActivityData, useClass: UserActivityService },
  // { provide: OrdersChartData, useClass: OrdersChartService },
  // { provide: ProfitChartData, useClass: ProfitChartService },
  // { provide: TrafficListData, useClass: TrafficListService },
  // { provide: EarningData, useClass: EarningService },
  // { provide: OrdersProfitChartData, useClass: OrdersProfitChartService },
  // { provide: TrafficBarData, useClass: TrafficBarService },
  // { provide: ProfitBarAnimationChartData, useClass: ProfitBarAnimationChartService },
  // { provide: TemperatureHumidityData, useClass: TemperatureHumidityService },
   { provide: SolarData, useClass: SolarService },
  // { provide: TrafficChartData, useClass: TrafficChartService },
  // { provide: StatsBarData, useClass: StatsBarService },
  // { provide: CountryOrderData, useClass: CountryOrderService },
  // { provide: StatsProgressBarData, useClass: StatsProgressBarService },
  // { provide: VisitorsAnalyticsData, useClass: VisitorsAnalyticsService },
  { provide: SecurityCamerasData, useClass: SecurityCamerasService },
  { provide: ApiData, useClass: ApiDataService },
  { provide: SocketData, useClass: SocketService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      // NbDummyAuthStrategy.setup({
      //   name: 'email',
      //   delay: 3000,
      // })
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          key: 'data',
        },
        baseEndpoint: environment.apiUrl,
        login: {
          endpoint: '/auth/login',
          method: 'post',
        },
        register: {
          endpoint: '/auth/signup',
          method: 'post',
        },
        logout: {
          endpoint: '/auth/logout',
          method: 'post',
          redirect: {
            success: '/auth/login',
            failure: null,
          },
        },
      }),
    ],
    forms: {
      // login: {
      //   socialLinks: socialLinks,
      // },
      // register: {
      //   socialLinks: socialLinks,
      // },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
