import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueController } from './catalogue.controller';
import { CatalogueService } from './catalogue.service';
import { Programme } from './entities/programme.entity';
import { Launch } from './entities/launch.entity';
import { ExternalId } from './entities/external-id.entity';
import { BroadcastModule } from '../broadcast/broadcast.module';

@Module({
  imports: [
    // Enregistre les repositories pour les entities Programme et Launch
    // depuis la connexion 'nota'
    TypeOrmModule.forFeature(
      [Programme, Launch, ExternalId], // ← Les entities utilisées dans ce module
      'nota', // ← La connexion à utiliser
    ),
    // Import du BroadcastModule pour accéder au BroadcastService
    BroadcastModule,
  ],
  controllers: [CatalogueController],
  providers: [CatalogueService],
})
export class CatalogueModule {}
