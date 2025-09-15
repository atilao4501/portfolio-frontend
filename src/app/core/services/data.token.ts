import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioData } from '../models/portfolio.model';

export interface PortfolioDataService {
  getData$(): Observable<PortfolioData>;
}
export const DATA_SERVICE = new InjectionToken<PortfolioDataService>(
  'DATA_SERVICE'
);
