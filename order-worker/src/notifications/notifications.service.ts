import { Inject, Injectable } from '@nestjs/common';
import {
  NOTIFICATION_FEATURE_REGISTRY,
  NOTIFICATION_OPTIONS,
} from './constants';
import {
  NotificationFeatureOptions,
  NotificationModuleOptions,
} from './interfaces';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_OPTIONS)
    private readonly options: NotificationModuleOptions,

    @Inject(NOTIFICATION_FEATURE_REGISTRY)
    private readonly features: NotificationFeatureOptions[],
  ) {}

  // ... rest of your code stays the same
}
