import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';
import { I18nService } from '../../../core/services/i18n.service';
import { Subject, takeUntil, map } from 'rxjs';
import {
  PortfolioDataService,
  DATA_SERVICE,
} from '../../../core/services/data.token';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private i18n = inject(I18nService);
  private data = inject<PortfolioDataService>(DATA_SERVICE);
  private destroy$ = new Subject<void>();

  currentLang = 'en';
  isMenuOpen = false;

  // Observable com dados da navbar
  navbar$ = this.data.getData$().pipe(map((d) => d.navbar));

  ngOnInit() {
    this.i18n.lang$.pipe(takeUntil(this.destroy$)).subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setLang(lang: 'en' | 'pt-BR') {
    this.i18n.setLang(lang);
    this.closeMenu();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
