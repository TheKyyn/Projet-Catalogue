import { Controller, Get, Query } from '@nestjs/common';
import { BroadcastService } from './broadcast.service';

@Controller('broadcast')
export class BroadcastController {
  constructor(private readonly broadcastService: BroadcastService) {}

  /**
   * Endpoint de recherche de broadcasts par ID_LAUNCH
   * Route : GET /broadcast/search?idLaunch=1
   * @param idLaunch - L'ID du launch Nota (vient du query parameter)
   * @returns Les broadcasts trouvés
   */
  @Get('search')
  async search(@Query('idLaunch') idLaunch: string) {
    // Validation : vérifier que le paramètre idLaunch est fourni
    if (!idLaunch) {
      return {
        error: 'Le paramètre "idLaunch" est requis',
        exemple: '/broadcast/search?idLaunch=1',
      };
    }

    // Convertir idLaunch (string) en nombre
    const id = parseInt(idLaunch, 10);

    // Vérifier que c'est bien un nombre valide
    if (isNaN(id)) {
      return {
        error: 'Le paramètre "idLaunch" doit être un nombre',
        exemple: '/broadcast/search?idLaunch=1',
      };
    }

    // Appeler le service avec le nombre
    const results = await this.broadcastService.searchByIdLaunch(id);

    // Retourner directement les résultats du service
    return results;
  }
}
