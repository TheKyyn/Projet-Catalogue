import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogueModule } from './catalogue/catalogue.module';
import { BroadcastModule } from './broadcast/broadcast.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Programme } from './catalogue/entities/programme.entity';
import { Launch } from './catalogue/entities/launch.entity';
import { ExternalId } from './catalogue/entities/external-id.entity';
import { SimplyProgramme } from './broadcast/entities/simply-programme.entity';
import { SimplyBroadcast } from './broadcast/entities/simply-broadcast.entity';

@Module({
  imports: [
    // Charge les variables d'environnement depuis .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Base de données MyETV (SQLite local en dev)
    TypeOrmModule.forRoot({
      name: 'myetv',
      type: 'sqlite',
      database: 'database/myetv.sqlite', // Fichier local
      entities: [SimplyProgramme, SimplyBroadcast],
      synchronize: true, // En dev: crée automatiquement les tables
      logging: true, // Pour voir les requêtes SQL dans la console
    }),

    // Base de données Nota (SQLite local en dev)
    TypeOrmModule.forRoot({
      name: 'nota',
      type: 'sqlite',
      database: 'database/nota.sqlite', // Fichier local
      entities: [Programme, Launch, ExternalId, SimplyProgramme],
      synchronize: true,
      logging: true,
    }),

    CatalogueModule,
    BroadcastModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
