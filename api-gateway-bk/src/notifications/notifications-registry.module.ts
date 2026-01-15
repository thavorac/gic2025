import { Module } from '@nestjs/common';
import { NOTIFICATION_FEATURE_REGISTRY } from './constants';
import { NotificationFeatureOptions } from './interfaces';

@Module({
  providers: [
    {
      provide: NOTIFICATION_FEATURE_REGISTRY,
      useValue: [] as NotificationFeatureOptions[],
    },
  ],
  exports: [NOTIFICATION_FEATURE_REGISTRY],
})
export class NotificationsRegistryModule {}
