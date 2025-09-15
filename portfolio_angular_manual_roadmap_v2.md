# Portfolio Angular — Guia de Construção (Mão na Massa) · v2
> Projeto: Portfólio pessoal em **Angular 18** (standalone) com **i18n (EN/PT‑BR)**, **camada de dados desacoplada** (JSON hoje, **sua API** amanhã) e **deploy** simples (Vercel ou GitHub Pages).

## 1) O que é este projeto?
Um guia **prático** para você construir um portfólio profissional de ponta a ponta: iniciar o app, estruturar pastas, configurar internacionalização, separar a **fonte de dados** via `InjectionToken`, criar páginas chave (Home, Projects, Experience, Stack, Contact), aplicar SEO básico e publicar.

**Por que existe?** Para refletir, no frontend, as mesmas **boas práticas** que você já aplica no backend (.NET, Clean Architecture): **baixo acoplamento**, **alta coesão**, **testabilidade** e **facilidade de evolução**. A ideia é **fazer à mão**, entendendo cada decisão.

---

## 2) Quais páginas tem (e qual o propósito de cada uma)
- **Home**: bloco “hero” com nome, título, resumo curto, links (GitHub, LinkedIn, CV). É seu **elevator pitch**.
- **Projects**: projetos autorais (ex.: *PopCultureMashup*). Mostre o problema, a solução, a stack e links (demo/GitHub).
- **Experience**: experiências profissionais (ex.: Invillia / Bradesco P2) e **impacto** (o que você entregou).
- **Stack**: sua pilha técnica em **cartões com ícones** (ex.: .NET, C#, EF Core, PostgreSQL, Angular).
- **Contact**: canais de contato (email, LinkedIn, WhatsApp) e, opcional, link para **download do CV**.

> **Dica:** mantenha as páginas curtas, escaneáveis e com **CTA** visível (ex.: “Ver projetos”, “Baixar CV”).

---

## 3) Tecnologias escolhidas — o que e por quê
### 3.1 Angular 18 (Standalone + Routing)
- **O que**: Angular 18 com **Standalone Components** e rotas lazy via `loadComponent`.
- **Por quê**: Menos boilerplate que módulos, **carregamento sob demanda** (performance) e **API moderna** do Angular.
- **Trade-off**: Se usar libs antigas baseadas em módulos, pode precisar de adaptação.

### 3.2 i18n em **runtime** com `@ngx-translate`
- **O que**: `@ngx-translate/core` + `@ngx-translate/http-loader` para carregar JSON de tradução em `/assets/i18n`.
- **Por quê**: **Troca de idioma sem rebuild e sem recarregar a página**; ideal para portfólio e para testes rápidos.
- **Alternativa**: i18n nativo do Angular (compile-time) gera bundles por idioma; excelente para SEO/SSR, mas **exige rebuild**.

### 3.3 Camada de dados **desacoplada** via `InjectionToken`
- **O que**: `DATA_SERVICE` (InjectionToken) com duas implementações:
  - **`AssetsDataService`**: lê `/assets/data/data.<lang>.json` (mock hoje).
  - **`HttpDataService`**: lê da SUA API `GET /portfolio?lang=en|pt-BR` (futuro).
- **Por quê**: Trocar fonte de dados **sem tocar em componentes**; mantém **baixo acoplamento** e facilita testes.
- **Como alternar**: `environment.useAssetsData: true|false` decide o provider no `app.config.ts`.

### 3.4 SEO básico (Title + Meta Description)
- **O que**: `SeoService` para setar título/descrição por página.
- **Por quê**: Ajuda indexação, **melhora compartilhamento** (rich previews) e mostra maturidade de entrega.

### 3.5 Estilos (tema escuro com CSS vars)
- **O que**: CSS simples com variáveis (`--bg`, `--fg`, `--brand`).
- **Por quê**: Visual limpo, **dark** consistente com “dark luxury” que você já usa em e‑commerce; fácil de evoluir.
- **Alternativa**: Tailwind (se quiser escalar componentes) — dá velocidade, mas aqui priorizamos **didática** e controle.

### 3.6 Ícones da Stack via **Simple Icons CDN**
- **O que**: `https://cdn.simpleicons.org/<nome>` para logos (ex.: `/dotnet`, `/angular`).
- **Por quê**: Sem dependência local de SVGs; **lazy** por natureza via `<img loading="lazy">`.

### 3.7 Estado e RxJS (mínimo necessário)
- **O que**: `BehaviorSubject` no `I18nService` e streams (`getData$()`).
- **Por quê**: Simples e suficiente; só adote NgRx/Zustand-like se o app crescer muito.

---

## 4) Estrutura de pastas (resumo)
```
src/
  app/
    core/
      services/
        i18n.service.ts         # troca de idioma (runtime)
        seo.service.ts          # título e meta description
        data.token.ts           # contrato (InjectionToken)
        data.assets.service.ts  # dados de /assets (mock)
        data.http.service.ts    # dados de API (futuro)
      models/
        portfolio.model.ts      # interfaces tipadas
    layout/
      components/               # navbar, footer
      layout.component.ts
    shared/
      components/               # section-title, badge, cards
      pipes/                    # ex.: safe-url.pipe
    pages/
      home/ projects/ experience/ contact/ stack/
    app.routes.ts               # rotas com loadComponent
    app.config.ts               # providers (Translate, Data, Router, Http)
  assets/
    i18n/ en.json pt-BR.json
    data/ data.en.json data.pt-BR.json
    cv/ atila-cv.pdf (opcional)
    img/ (logos, screenshots)
styles.css
vercel.json
```

---

## 5) Passo a passo (mão na massa)
### 5.1 Pré-requisitos
- Node 18.x ou 20.x, Angular CLI 18, Git, conta na Vercel (ou GitHub Pages).
```bash
node -v
npm i -g @angular/cli
ng version
```

### 5.2 Criar projeto e instalar i18n
```bash
ng new portfolio --standalone --routing --style=css
cd portfolio
npm i @ngx-translate/core @ngx-translate/http-loader
```

### 5.3 Registrar Translate + Loader (`app.config.ts`)
```ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] }
    }))
  ]
};
```

### 5.4 Serviço de i18n (troca sem reload)
```ts
@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly key = 'lang';
  private langSubject = new BehaviorSubject<string>(this.initLang());
  lang$ = this.langSubject.asObservable();
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'pt-BR']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.langSubject.value);
  }
  private initLang(): 'en' | 'pt-BR' {
    const saved = localStorage.getItem(this.key);
    return (saved === 'pt-BR') ? 'pt-BR' : 'en';
  }
  setLang(lang: 'en' | 'pt-BR') {
    localStorage.setItem(this.key, lang);
    this.langSubject.next(lang);
    this.translate.use(lang);
  }
}
```

### 5.5 Camada de dados com alternância (Assets ↔ API)
**Contrato (`data.token.ts`):**
```ts
export interface PortfolioDataService {
  getData$(): Observable<PortfolioData>;
}
export const DATA_SERVICE = new InjectionToken<PortfolioDataService>('DATA_SERVICE');
```

**Assets (mock de hoje):**
```ts
@Injectable({ providedIn: 'root' })
export class AssetsDataService implements PortfolioDataService {
  private cache$?: Observable<PortfolioData>;
  constructor(private http: HttpClient, private i18n: I18nService) {}
  getData$(): Observable<PortfolioData> {
    return this.cache$ ??= this.i18n.lang$.pipe(
      switchMap(lang => this.http.get<PortfolioData>(`/assets/data/data.${lang}.json`)),
      shareReplay(1)
    );
  }
}
```

**HTTP (sua API futura):**
```ts
@Injectable({ providedIn: 'root' })
export class HttpDataService implements PortfolioDataService {
  private cache$?: Observable<PortfolioData>;
  constructor(private http: HttpClient, private i18n: I18nService) {}
  getData$(): Observable<PortfolioData> {
    return this.cache$ ??= this.i18n.lang$.pipe(
      switchMap(lang => this.http.get<PortfolioData>(`${environment.apiBaseUrl}/portfolio?lang=${encodeURIComponent(lang)}`)),
      shareReplay(1)
    );
  }
}
```

**Provider dinâmico (`app.config.ts`):**
```ts
const DATA_PROVIDER = environment.useAssetsData
  ? { provide: DATA_SERVICE, useExisting: AssetsDataService }
  : { provide: DATA_SERVICE, useExisting: HttpDataService };

export const appConfig: ApplicationConfig = {
  providers: [
    /* ... Translate/Router/Http ... */
    DATA_PROVIDER
  ]
};
```

### 5.6 Páginas e rotas (lazy)
```ts
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Home' },
  { path: 'projects', loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent), title: 'Projects' },
  { path: 'experience', loadComponent: () => import('./pages/experience/experience.component').then(m => m.ExperienceComponent), title: 'Experience' },
  { path: 'stack', loadComponent: () => import('./pages/stack/stack-page.component').then(m => m.StackPageComponent), title: 'Stack' },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent), title: 'Contact' },
  { path: '**', redirectTo: '' }
];
```

### 5.7 SEO básico
```ts
@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}
  set(titleText: string, description: string) {
    this.title.setTitle(titleText);
    this.meta.updateTag({ name: 'description', content: description });
  }
}
```

### 5.8 Estilos (tema escuro)
```css
:root { color-scheme: dark; --bg:#0b0c10; --fg:#e5e7eb; --muted:#9ca3af; --card:#111216; --border:#1f2937; --brand:#22d3ee; }
html, body { margin:0; padding:0; background:var(--bg); color:var(--fg); font-family:system-ui, Arial, sans-serif; }
a { color: var(--brand); text-decoration: none; }
.container { max-width:1100px; margin:0 auto; padding:24px; }
.card { background: var(--card); border:1px solid var(--border); border-radius: 12px; padding:16px; }
.btn { padding:8px 12px; border:1px solid var(--border); border-radius:10px; background:transparent; color:var(--fg); }
.btn.active { background: var(--brand); color:#001014; border-color: transparent; }
```

---

## 6) Como isso conversa com seu currículo e objetivo
- **Back-end sólido (.NET, EF Core, PostgreSQL, MongoDB)** → aqui você mostra **arquitetura semelhante** no front (injeção, contratos, mocks → API).
- **Projeto autoral PopCultureMashup** → vira **case** na página *Projects* com link para o GitHub e descrição do algoritmo.
- **Experiência Invillia/Bradesco P2** → destaca **impacto** (integrações, serviços de vouchers) e stack.
- **E-commerce (M. Adriane Joias)** → reforça **sensibilidade estética e SEO** (dark theme, meta tags), mesmo sendo backend.
- **Objetivo**: um portfólio **bilingue**, **publicado** e com **camada de dados plugável**, pronto para recrutar e evoluir com sua API .NET.

---

## 7) Checklist de pronto (Definition of Done)
- [ ] Alternância de idioma (EN/PT‑BR) **sem recarregar**
- [ ] Páginas: **Home**, **Projects**, **Experience**, **Stack**, **Contact**
- [ ] Dados vindos de `/assets/data/data.<lang>.json` via `DATA_SERVICE`
- [ ] Troca para API alterando **apenas** `environment.useAssetsData`
- [ ] SEO básico por página (Title + Description)
- [ ] Build de produção ok e **deploy público** (Vercel ou GitHub Pages)

---

## 8) Próximos passos (quando plugar sua API)
1. Implementar no backend: `GET /portfolio?lang=en|pt-BR` → retorna `PortfolioData`.
2. `environment.ts`: `useAssetsData: false` e `apiBaseUrl` para sua API.
3. (Opcional) Adicionar **interceptor** para JWT e **cache** com `HttpContext`/ETag.
4. (Opcional) Substituir CSS por **Tailwind** e criar **Design System** (cards, badges, grid).

---

## 9) FAQ rápido
- **Por que não usei i18n nativo Angular?** Aqui priorizamos troca de idioma sem rebuild (agilidade). Se for fazer SSR/SEO hardcore, considere migrar para i18n nativo.
- **Quando adotar NgRx?** Se o estado e a orquestração crescerem (forms complexos, muitos efeitos). Enquanto simples, RxJS + Services bastam.
- **Posso trocar Simple Icons por SVG local?** Sim, se quiser controle total de assets e build.

Bom trabalho — e publique o link no seu LinkedIn! 🚀
