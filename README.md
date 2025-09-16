# Portfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

## Performance

O projeto aplica otimizações:

- Lazy loading via `loadComponent` para páginas.
- Change Detection `OnPush` em componentes de páginas e compartilhados.
- Funções `trackBy` em todos os _ngFor_ principais para evitar recriação de DOM.
- Estratégia de preloading custom baseada em prioridade (ver `app.config.ts`).
- `NgOptimizedImage` (ngSrc) para imagens de perfil e ícones de skills/projetos com dimensões explícitas.
- Coalescing de eventos (`provideZoneChangeDetection({ eventCoalescing: true })`).
- Headers `<link rel="preconnect" ...>` e `dns-prefetch` no `index.html`.

### Próximos passos sugeridos

- Adicionar compressão/otimização de imagens (WebP/AVIF) se hospedar assets locais.
- Configurar análise de bundle: `ng build --configuration production --stats-json` e usar `npx webpack-bundle-analyzer dist/portfolio/stats.json`.
- Implementar caching HTTP para assets estáticos no servidor/Vercel.
- Considerar hydration parcial / defer de scripts adicionais se forem incluídos no futuro.

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
