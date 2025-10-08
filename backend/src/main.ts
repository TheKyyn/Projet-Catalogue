import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as oracledb from 'oracledb';

/**
 * Point d'entrée de l'application NestJS
 * Cette fonction initialise et démarre le serveur
 */
async function bootstrap() {
  // Activation du mode "thick" pour node-oracledb
  // Nécessaire pour supporter le chiffrement réseau Oracle (ORA-12660)
  try {
    oracledb.initOracleClient();
    console.log('✅ Oracle Client initialisé en mode thick');
  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation d\'Oracle Client:');
    console.error('   Assurez-vous d\'avoir Oracle Instant Client installé');
    console.error('   Téléchargement: https://www.oracle.com/database/technologies/instant-client/downloads.html');
    console.error(err);
  }

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
