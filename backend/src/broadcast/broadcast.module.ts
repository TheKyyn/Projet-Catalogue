import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BroadcastController } from './broadcast.controller';
import { BroadcastService } from './broadcast.service';
import { BrNotaLaunch } from './entities/br-nota-launch.entity';
import { SimplyBroadcast } from './entities/simply-broadcast.entity';
import { SimplyProgramme } from './entities/simply-programme.entity';
import { Broadcast } from './entities/broadcast.entity';
import { Region } from './entities/region.entity';

@Module({
  imports: [
    // Enregistre les repositories pour les entities MyETV
    TypeOrmModule.forFeature(
      [BrNotaLaunch, SimplyBroadcast, SimplyProgramme, Broadcast, Region],
      'myetv', // ← Connexion MyETV
    ),
  ],
  controllers: [BroadcastController],
  providers: [BroadcastService],
  exports: [BroadcastService], // ← Export pour utiliser dans d'autres modules
})
export class BroadcastModule {}
