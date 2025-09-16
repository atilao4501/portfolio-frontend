import { Injectable } from '@angular/core';

// Serviço central para mapear cores/tags de skills.
// Facilita reutilização e futura customização (ex: vir de config externa).
@Injectable({ providedIn: 'root' })
export class SkillColorService {
  private readonly colorMap: Record<string, string> = {
    dotnet: 'bg-purple-100 text-purple-800',
    efcore: 'bg-blue-100 text-blue-800',
    sqlserver: 'bg-orange-100 text-orange-800',
    postgresql: 'bg-blue-100 text-blue-800',
    redis: 'bg-red-100 text-red-800',
    docker: 'bg-blue-100 text-blue-800',
    angular: 'bg-red-100 text-red-800',
    apachekafka: 'bg-gray-100 text-gray-800',
    kubernetes: 'bg-blue-100 text-blue-800',
    aspnetcore: 'bg-purple-100 text-purple-800',
    wordpress: 'bg-blue-100 text-blue-800',
    woocommerce: 'bg-purple-100 text-purple-800',
    grafana: 'bg-orange-100 text-orange-800',
  };

  getColor(skillId?: string): string {
    if (!skillId) return 'bg-gray-100 text-gray-800';
    return this.colorMap[skillId.toLowerCase()] || 'bg-gray-100 text-gray-800';
  }
}
