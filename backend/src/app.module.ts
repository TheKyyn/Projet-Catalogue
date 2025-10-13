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
import { FormatsName } from './catalogue/entities/formats-name.entity';
import { Genre } from './catalogue/entities/genre.entity';
import { Subgenre } from './catalogue/entities/subgenre.entity';
import { SimplyProgramme } from './broadcast/entities/simply-programme.entity';
import { SimplyBroadcast } from './broadcast/entities/simply-broadcast.entity';
import { BrNotaLaunch } from './broadcast/entities/br-nota-launch.entity';
import { Broadcast } from './broadcast/entities/broadcast.entity';
import { Region } from './broadcast/entities/region.entity';
import { LocalDescriptionsNota } from './broadcast/entities/local-descriptions-nota.entity';

@Module({
  imports: [
    // Charge les variables d'environnement depuis .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Base de données MyETV (Oracle preprod)
    TypeOrmModule.forRoot({
      name: 'myetv',
      type: 'oracle',
      host: process.env.MYETV_HOST,
      port: parseInt(process.env.MYETV_PORT || '1521'),
      serviceName: process.env.MYETV_SERVICE,
      username: process.env.MYETV_USER,
      password: process.env.MYETV_PASSWORD,
      entities: [
        SimplyProgramme,
        SimplyBroadcast,
        BrNotaLaunch,
        Broadcast,
        Region,
        LocalDescriptionsNota,
      ],
      synchronize: false, // Important: ne pas modifier le schéma en preprod
      logging: true, // Pour voir les requêtes SQL dans la console
    }),

    // Base de données Nota (Oracle preprod)
    TypeOrmModule.forRoot({
      name: 'nota',
      type: 'oracle',
      host: process.env.NOTA_HOST,
      port: parseInt(process.env.NOTA_PORT || '1521'),
      serviceName: process.env.NOTA_SERVICE,
      username: process.env.NOTA_USER,
      password: process.env.NOTA_PASSWORD,
      entities: [Programme, Launch, ExternalId, FormatsName, Genre, Subgenre],
      synchronize: false, // Important: ne pas modifier le schéma en preprod
      logging: true,
    }),

    CatalogueModule,
    BroadcastModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}