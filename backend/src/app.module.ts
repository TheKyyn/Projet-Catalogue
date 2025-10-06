import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogueModule } from './catalogue/catalogue.module';
import { BroadcastModule } from './broadcast/broadcast.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Charge les variables d'environnement depuis .env
    ConfigModule.forRoot({
      isGlobal: true, // Rend les configs accessibles partout
    }),

    // Connexion à la base MyETV
    TypeOrmModule.forRoot({
      name: 'myetv', // Nom de la connexion (important!)
      type: 'oracle',
      host: process.env.MYETV_HOST,
      port: parseInt(process.env.MYETV_PORT),
      sid: process.env.MYETV_SERVICE, // Oracle utilise 'sid' pour le service
      username: process.env.MYETV_USER,
      password: process.env.MYETV_PASSWORD,
      entities: [], // On ajoutera les entities plus tard
      synchronize: false, // IMPORTANT: false pour Oracle en prod!
    }),

    // Connexion à la base Nota
    TypeOrmModule.forRoot({
      name: 'nota', // Nom différent pour la 2e connexion
      type: 'oracle',
      host: process.env.NOTA_HOST,
      port: parseInt(process.env.NOTA_PORT),
      sid: process.env.NOTA_SERVICE,
      username: process.env.NOTA_USER,
      password: process.env.NOTA_PASSWORD,
      entities: [], // On ajoutera les entities plus tard
      synchronize: false,
    }),

    CatalogueModule,
    BroadcastModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
