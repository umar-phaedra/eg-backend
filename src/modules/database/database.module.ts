import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB } from 'src/common/constants';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('USE_DB') === MONGODB.ATLAS
          ? configService.get<string>('MONGODB_URL_ATLAS')
          : configService.get<string>('MONGODB_URL_LOCAL'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
