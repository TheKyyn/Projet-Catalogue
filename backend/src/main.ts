import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Point d'entrée de l'application NestJS
 * Cette fonction initialise et démarre le serveur
 */
async function bootstrap() {
  // Création de l'instance NestJS avec le module principal
  const app = await NestFactory.create(AppModule);
  
  // Activation de CORS pour permettre les requêtes depuis Angular
  // En développement, on autorise toutes les origines
  app.enableCors({
    origin: 'http://localhost:4200', // URL du frontend Angular
    credentials: true, // Permet l'envoi de cookies si nécessaire
  });

  // Démarrage du serveur sur le port 3000 (ou celui défini dans .env)
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Backend NestJS démarré sur http://localhost:${port}`);
  console.log(`📡 Endpoints disponibles:`);
  console.log(`   - GET  /catalogue/search?title=...`);
  console.log(`   - GET  /broadcast/search?idLaunch=...`);
}

bootstrap();
