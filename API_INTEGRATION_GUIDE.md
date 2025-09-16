# 🔄 Guia de Integração com API - Portfolio Angular

## 📋 **Como Funciona Hoje (Mock/Assets)**

### 🏗️ **Arquitetura Atual**

A aplicação utiliza uma **arquitetura desacoplada** baseada em **Dependency Injection** que permite trocar a fonte de dados sem modificar os componentes.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │────│  DATA_SERVICE   │────│ AssetsDataService│
│                 │    │   (Interface)   │    │   (Mock atual)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                  │
                                  │
                           ┌─────────────────┐
                           │ HttpDataService │
                           │  (API futura)   │
                           └─────────────────┘
```

### 📁 **Estrutura de Dados Atual**

**Arquivos Mock em `/assets/data/`:**

```
assets/data/
├── data.pt-BR.json    # Dados localizados em português
├── data.en.json       # Dados localizados em inglês
└── shared.json        # Dados compartilhados (skills, projetos, links)
```

**Fluxo de Dados:**

1. `AssetsDataService` lê os arquivos JSON via `HttpClient`
2. Combina dados localizados + compartilhados
3. Aplica cache com `shareReplay(1)`
4. Componentes recebem dados através da interface `PortfolioDataService`

### 🔧 **Configuração por Environment**

```typescript
// src/environments/environment.ts (desenvolvimento)
export const environment = {
  production: false,
  useAssetsData: true, // 👈 USA MOCK
  apiBaseUrl: "http://localhost:5000/api",
};

// src/environments/environment.prod.ts (produção)
export const environment = {
  production: true,
  useAssetsData: false, // 👈 USA API
  apiBaseUrl: "https://sua-api.com/api",
};
```

### ⚙️ **Provider Dinâmico**

```typescript
// app.config.ts
const DATA_PROVIDER = environment.useAssetsData
  ? { provide: DATA_SERVICE, useExisting: AssetsDataService } // Mock
  : { provide: DATA_SERVICE, useExisting: HttpDataService }; // API

export const appConfig: ApplicationConfig = {
  providers: [
    // ... outros providers
    DATA_PROVIDER, // 👈 Injeta automaticamente o serviço correto
  ],
};
```

---

## 🚀 **Migração para API - Passo a Passo**

### 1️⃣ **Implementar Endpoints na API**

Sua API deve expor um endpoint que retorne os dados no formato esperado:

```http
GET /api/portfolio?lang=pt-BR
GET /api/portfolio?lang=en
```

### 2️⃣ **Estrutura de Resposta da API**

A API deve retornar um objeto `PortfolioData` com esta estrutura:

```typescript
interface PortfolioData {
  navbar: {
    menu: {
      home: string;
      about: string;
      skills: string;
      projects: string;
      contact: string;
    };
    brand: string;
    socialLinks: {
      linkedin: string;
      github: string;
    };
  };
  hero: {
    title: string;
    summary: string;
    name: string;
    links: {
      linkedin?: string;
      github?: string;
      email?: string;
      cv?: string;
    };
  };
  about: {
    title: string;
    description: string;
  };
  skills: {
    title: string;
    categories: {
      backend: string;
      frontend: string;
      tools: string;
    };
    levels: {
      beginner: string;
      intermediate: string;
      advanced: string;
    };
  };
  projects: {
    title: string;
  };
  shared: {
    personal: {
      name: string;
      brand: string;
      githubUsername: string;
    };
    links: {
      linkedin: string;
      github: string;
      email: string;
      cv: string;
    };
    contact: {
      title: string;
      email: string;
      linkedin: string;
      github: string;
    };
    projects: Array<{
      id: string;
      skills: string[];
      links?: any;
    }>;
    skills: Record<string, Skill[]>;
  };
}
```

### 3️⃣ **Exemplo de Resposta da API**

```json
{
  "navbar": {
    "menu": {
      "home": "Início",
      "about": "Sobre",
      "skills": "Habilidades",
      "projects": "Projetos",
      "contact": "Contato"
    },
    "brand": "Atila Alcântara",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/atila-alcantara",
      "github": "https://github.com/atilao4501"
    }
  },
  "hero": {
    "title": "Desenvolvedor Full Stack",
    "summary": "Apaixonado por criar soluções tecnológicas...",
    "name": "Atila Alcântara",
    "links": {
      "linkedin": "https://linkedin.com/in/atila-alcantara",
      "github": "https://github.com/atilao4501",
      "email": "atila@email.com"
    }
  },
  "about": {
    "title": "Sobre Mim",
    "description": "Desenvolvedor com experiência em..."
  },
  "skills": {
    "title": "Minhas Habilidades",
    "categories": {
      "backend": "Backend",
      "frontend": "Frontend",
      "tools": "Ferramentas"
    },
    "levels": {
      "beginner": "Iniciante",
      "intermediate": "Intermediário",
      "advanced": "Avançado"
    }
  },
  "projects": {
    "title": "Meus Projetos"
  },
  "shared": {
    // ... dados compartilhados
  }
}
```

### 4️⃣ **Configurar Environment para API**

**Para desenvolvimento local:**

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  useAssetsData: false, // 👈 MUDA PARA false
  apiBaseUrl: "http://localhost:5000/api", // 👈 URL da sua API local
};
```

**Para produção:**

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  useAssetsData: false, // 👈 MUDA PARA false
  apiBaseUrl: "https://sua-api.com/api", // 👈 URL da sua API em produção
};
```

### 5️⃣ **Testar a Integração**

1. **Inicie sua API** na porta configurada
2. **Execute o frontend:**
   ```bash
   npm run start
   ```
3. **Verifique no DevTools** se as requisições estão sendo feitas corretamente
4. **Teste a mudança de idioma** para garantir que ambos endpoints funcionam

---

## ✅ **Vantagens da Arquitetura Atual**

### 🔄 **Zero Refatoração Necessária**

- ✅ Componentes não precisam ser alterados
- ✅ Templates permanecem iguais
- ✅ Apenas configuração de environment muda

### 🧪 **Facilita Testes**

- ✅ Pode usar mock nos testes unitários
- ✅ Pode testar com API real nos testes E2E
- ✅ Isolamento completo entre camadas

### 📱 **Suporte Nativo a I18n**

- ✅ Mudança de idioma automática
- ✅ Cache por idioma
- ✅ Fallback para idioma padrão

### ⚡ **Performance Otimizada**

- ✅ Cache inteligente com `shareReplay(1)`
- ✅ Evita requisições desnecessárias
- ✅ Lazy loading quando necessário

---

## 🔍 **Verificações e Troubleshooting**

### ✅ **Checklist de Migração**

- [ ] API implementada com endpoint `/api/portfolio?lang=<lang>`
- [ ] Estrutura de resposta da API conforme `PortfolioData`
- [ ] Environment configurado com `useAssetsData: false`
- [ ] URL da API correta no `apiBaseUrl`
- [ ] CORS configurado na API (se necessário)
- [ ] Testes realizados para ambos os idiomas

### 🐛 **Problemas Comuns**

**Erro de CORS:**

```typescript
// Configure sua API para aceitar requisições do frontend
headers: {
  'Access-Control-Allow-Origin': 'http://localhost:4200',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}
```

**Erro 404 na API:**

- Verifique se a API está rodando na porta correta
- Confirme se o endpoint está implementado
- Teste o endpoint diretamente no browser/Postman

**Dados não aparecem:**

- Verifique no DevTools > Network se a requisição está sendo feita
- Confirme se a estrutura de resposta está correta
- Verifique se não há erros no console

---

## 🎯 **Resumo**

A aplicação já está **100% preparada** para integração com APIs. A arquitetura desacoplada permite:

1. **Hoje**: Trocar apenas `useAssetsData: false` no environment
2. **Futuro**: Adicionar autenticação, cache avançado, offline-first, etc.

**A única coisa que você precisa fazer é:**

1. Implementar a API com o endpoint correto
2. Alterar `environment.useAssetsData` para `false`
3. Configurar a URL da API
4. Pronto! 🚀

---

_Este guia garante uma migração suave e sem riscos do mock para a API real._
