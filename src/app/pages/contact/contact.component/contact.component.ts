import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import {
  DATA_SERVICE,
  PortfolioDataService as DataServiceInterface,
} from '../../../core/services/data.token';

interface ContactMethods {
  email: string;
  whatsapp: string;
}

interface SocialLinks {
  linkedin: string;
  github: string;
}

interface ContactInfo {
  email: string;
  whatsapp: string;
}

interface ContactViewModel {
  title: string;
  subtitle: string;
  description: string;
  contactMethods: ContactMethods;
  socialTitle: string;
  socialLinks: SocialLinks;
  contactInfo: ContactInfo;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  vm$!: Observable<ContactViewModel>;

  constructor(
    @Inject(DATA_SERVICE) private dataService: DataServiceInterface
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.vm$ = this.dataService.getData$().pipe(
      map((data) => {
        const contactData = (data as any).contact;
        const sharedContactInfo = (data as any).shared?.contact;

        return {
          title: contactData?.title || 'Entre em Contato',
          subtitle:
            contactData?.subtitle ||
            'Vamos trabalhar juntos no seu próximo projeto',
          description:
            contactData?.description ||
            'Entre em contato através do WhatsApp ou email. Respondo rapidamente!',
          contactMethods: {
            email: contactData?.contactMethods?.email || 'E-mail',
            whatsapp: contactData?.contactMethods?.whatsapp || 'WhatsApp',
          },
          socialTitle: contactData?.socialTitle || 'Redes Sociais',
          socialLinks: {
            linkedin: contactData?.socialLinks?.linkedin || 'LinkedIn',
            github: contactData?.socialLinks?.github || 'GitHub',
          },
          contactInfo: {
            email: sharedContactInfo?.email || 'atilafa2012@hotmail.com',
            whatsapp: sharedContactInfo?.whatsapp || '+5562999001030',
          },
        };
      })
    );
  }

  openEmail(email: string): void {
    window.location.href = `mailto:${email}`;
  }

  openWhatsApp(whatsapp: string): void {
    const number = whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${number}`, '_blank');
  }
}
