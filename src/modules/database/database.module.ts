import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost/easygenerator')], //TODO: Uncomment this for local db
  imports: [MongooseModule.forRoot('mongodb+srv://umarrhere:Qyc5zzB6meFEbjK5@testcluster.qhvzf2e.mongodb.net/easygenerator')],
})
export class DatabaseModule {}
