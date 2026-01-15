import { DynamicModule, Module } from '@nestjs/common';
import {
  NOTIFICATION_FEATURE_OPTIONS,
  NOTIFICATION_OPTIONS,
} from './constants';
import {
  NotificationModuleOptions,
  NotificationFeatureOptions,
} from './interfaces';
import { NotificationsService } from './notifications.service';
import { NotificationFeatureRegistrar } from './notifications-feature.registrar';
import { NotificationsRegistryModule } from './notifications-registry.module';

@Module({
  imports: [NotificationsRegistryModule], // ✅ registry always available
})
export class NotificationModule {
  static forRoot(options: NotificationModuleOptions): DynamicModule {
    return {
      module: NotificationModule,
      global: true, // optional
      providers: [
        { provide: NOTIFICATION_OPTIONS, useValue: options },
        NotificationsService,
      ],
      exports: [NotificationsService],
    };
  }

  static forFeature(feature: NotificationFeatureOptions): DynamicModule {
    return {
      module: NotificationModule,
      providers: [
        { provide: NOTIFICATION_FEATURE_OPTIONS, useValue: feature },
        NotificationFeatureRegistrar,
      ],
    };
  }
}
