import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProjectsComponent } from './projects.component';
import { AssetsDataService } from '../../../core/services/data.assets.service';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { I18nService } from '../../../core/services/i18n.service';
import { Skill } from '../../../core/models/skill.model';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let mockAssetsDataService: jasmine.SpyObj<AssetsDataService>;

  const mockLangData = {
    navbar: {
      menu: { home: '', about: '', skills: '', projects: '', contact: '' },
    },
    hero: { title: '', summary: '' },
    about: { title: '', description: '' },
    skills: { title: '', description: '' },
    contact: {
      title: '',
      subtitle: '',
      form: { name: '', email: '', message: '', send: '' },
    },
    projectsPage: {
      title: 'Projetos',
      subtitle: 'Alguns dos projetos que desenvolvi',
      featuresTitle: 'Principais Características',
    },
  } as any; // simplificado para o teste

  const mockShared = {
    projects: [
      {
        id: 'test-project',
        title: { pt: 'Projeto Teste', en: 'Test Project' },
        shortDescription: { pt: 'Descrição PT', en: 'Description EN' },
        features: { pt: ['F1'], en: ['F1'] },
        skills: ['dotnet'],
        links: { github: 'https://example.com' },
      },
    ],
    skills: [
      {
        id: 'dotnet',
        name: '.NET',
        type: 'backend',
        svg: { url: 'icon.svg' },
      } as Skill,
    ],
    personal: { name: 'Nome', brand: 'brand', githubUsername: 'user' },
    links: {},
    contact: { email: 'e', whatsapp: 'w' },
    certifications: [],
  } as any;

  beforeEach(async () => {
    const assetsSpy = jasmine.createSpyObj('AssetsDataService', ['getData$']);
    const portfolioSpy = jasmine.createSpyObj('PortfolioDataService', [
      'getProjects',
    ]);
    const i18nSpy = jasmine.createSpyObj('I18nService', [], {
      lang$: of('pt-BR'),
    });

    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        { provide: AssetsDataService, useValue: assetsSpy },
        { provide: PortfolioDataService, useValue: portfolioSpy },
        { provide: I18nService, useValue: i18nSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    mockAssetsDataService = TestBed.inject(
      AssetsDataService
    ) as jasmine.SpyObj<AssetsDataService>;
    mockAssetsDataService.getData$.and.returnValue(of(mockLangData));
    const portfolioMock = TestBed.inject(
      PortfolioDataService
    ) as jasmine.SpyObj<PortfolioDataService>;
    portfolioMock.getProjects.and.returnValue(
      of(
        (mockShared.projects as any[]).map((p: any) => ({
          id: p.id,
          title: p.title.pt,
          shortDescription: p.shortDescription.pt,
          features: p.features.pt,
          skills: mockShared.skills,
          links: p.links,
        }))
      )
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects data', (done) => {
    fixture.detectChanges();
    component.vm$.subscribe((vm) => {
      expect(vm.title).toBe('Projetos');
      expect(vm.subtitle).toBe('Alguns dos projetos que desenvolvi');
      expect(vm.projects.length).toBe(1);
      done();
    });
  });

  it('should get technology color', () => {
    const color = component.getTechnologyColor({ id: 'dotnet' });
    expect(color).toBe('bg-purple-100 text-purple-800');
  });

  it('should open link', () => {
    spyOn(window, 'open');
    const testUrl = 'https://example.com';

    component.openLink(testUrl);

    expect(window.open).toHaveBeenCalledWith(
      testUrl,
      '_blank',
      'noopener noreferrer'
    );
  });
});
