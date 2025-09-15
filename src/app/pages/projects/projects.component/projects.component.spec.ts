import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProjectsComponent } from './projects.component';
import { AssetsDataService } from '../../../core/services/data.assets.service';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let mockAssetsDataService: jasmine.SpyObj<AssetsDataService>;

  const mockData = {
    navbar: {
      menu: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact',
      },
    },
    hero: {
      title: 'Developer',
      summary: 'I build things',
    },
    about: {
      title: 'About',
      description: 'About me',
    },
    skills: {
      title: 'Skills',
      categories: {
        backend: 'Backend',
        frontend: 'Frontend',
        tools: 'Tools',
      },
      levels: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
      },
    },
    projects: {
      title: 'Projetos',
      subtitle: 'Alguns dos projetos que desenvolvi',
      categories: {
        professional: 'Experiência Profissional',
        personal: 'Projetos Pessoais',
        freelance: 'Projetos Freelance',
      },
      highlightsTitles: {
        professional: 'Principais Contribuições:',
        personal: 'Funcionalidades Principais:',
        freelance: 'Principais Entregas:',
      },
      professional: [
        {
          id: 'test-project',
          title: 'Projeto Teste',
          description: 'Descrição do projeto teste',
          technologies: ['.NET', 'Angular'],
        },
      ],
      personal: [],
      freelance: [],
    },
    experience: {
      title: 'Experience',
      corporate: 'Corporate',
      freelance: 'Freelance',
    },
    education: {
      title: 'Education',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in touch',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send',
      },
    },
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AssetsDataService', ['getData$']);

    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [{ provide: AssetsDataService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    mockAssetsDataService = TestBed.inject(
      AssetsDataService
    ) as jasmine.SpyObj<AssetsDataService>;
    mockAssetsDataService.getData$.and.returnValue(of(mockData));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects data', () => {
    fixture.detectChanges();
    component.vm$.subscribe((vm) => {
      expect(vm.title).toBe('Projetos');
      expect(vm.subtitle).toBe('Alguns dos projetos que desenvolvi');
      expect(vm.professional.length).toBe(1);
    });
  });

  it('should get technology color', () => {
    const color = component.getTechnologyColor('.NET');
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
