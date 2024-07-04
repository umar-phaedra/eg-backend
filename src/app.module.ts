import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, ConfigModule.forRoot()],
})
export class AppModule {}
