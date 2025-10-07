import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueController } from './catalogue.controller';
import { CatalogueService } from './catalogue.service';
import { Programme } from './entities/programme.entity';
import { Launch } from './entities/launch.entity';

@Module({
  imports: [
    // Enregistre les repositories pour les entities Programme et Launch
    // depuis la connexion 'nota'
    TypeOrmModule.forFeature(
      [Programme, Launch],  // ← Les entities utilisées dans ce module
      'nota'                // ← La connexion à utiliser
    ),
  ],
  controllers: [CatalogueController],
  providers: [CatalogueService],
})
export class CatalogueModule {}