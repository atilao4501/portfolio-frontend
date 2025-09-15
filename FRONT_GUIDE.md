Perfeito 👌 Vou montar um guia completinho que você pode mandar direto pro Copilot (ou até pro seu front) sem precisar explicar de novo.
Ele cobre **mock agora** + **API depois**, com os models e a forma de trabalhar.

---

# 📌 Guia para o Frontend do Portfólio

## 1. Estrutura de Dados

Enquanto a API não existe, vamos trabalhar com **3 arquivos JSON** estáticos:

- `data.pt-BR.json` → Conteúdo em português.
- `data.en.json` → Conteúdo em inglês.
- `shared.json` → Dados comuns (skills, links, contatos, projetos base).

Eles já estão prontos e seguem um padrão pensado para depois migrarmos para a API real sem quebrar nada.

---

## 2. Models

Crie os **models** no front para refletir exatamente os objetos que virão da API no futuro.

### 🔹 Skill

```ts
export interface Skill {
  id: string; // ex: "dotnet"
  name: string; // ex: ".NET"
  type: string; // backend | frontend | database | devops | messaging | observability | tool
  level: string; // beginner | intermediate | advanced
  svg: { url: string }; // link para o SVG (Devicon)
}
```

### 🔹 Project

```ts
export interface Project {
  id: string; // ex: "pairprogress"
  title?: string; // vem do data.json
  shortDescription?: string; // vem do data.json
  features?: string[]; // vem do data.json
  skills: Skill[]; // vem do shared.json (resolvido por id → objeto)
  links?: {
    github?: string;
    site?: string;
    swagger?: string;
  };
}
```

---

## 3. Como funciona o **mock** (fase atual)

Enquanto não temos backend, os dados virão dos JSONs estáticos.
O fluxo deve ser:

1. Carregar `data.pt-BR.json` (ou `data.en.json`) dependendo do idioma.
2. Carregar `shared.json`.
3. Fazer o **merge pelo `id`**:

   - Projetos → `data.projects` + `shared.projects`.
   - Skills → usar `shared.skills` (todas já estão lá).

### Exemplo de merge em Angular:

```ts
const projectData = data.projects.find((p) => p.id === sharedProj.id);

const mergedProject: Project = {
  ...sharedProj,
  ...projectData,
  skills: sharedProj.skills.map((skillId) => allSkills.find((s) => s.id === skillId)!),
};
```

> Assim, o front já renderiza os projetos com `title`, `shortDescription`, `features`, `skills` e `links`.

---

## 4. Preparando para a API

Quando a API estiver pronta, os endpoints principais serão:

- **GET /skills** → retorna todas as habilidades (`Skill[]`).
- **GET /projects** → retorna todos os projetos (`Project[]` já com os objetos de skills embutidos).

Ou seja, o front só vai precisar trocar **de onde pega os dados**:

- Hoje:

  ```ts
  this.http.get<Project[]>("/assets/data.pt-BR.json");
  this.http.get<Skill[]>("/assets/shared.json");
  ```

- Futuro:

  ```ts
  this.http.get<Project[]>("/api/projects?lang=pt-BR");
  this.http.get<Skill[]>("/api/skills");
  ```

> **Os models e os componentes não mudam.**
> Só muda a origem dos dados (mock → API real).

---

## 5. Exemplo de resposta futura da API `/projects`

Para referência, o backend vai devolver os projetos já **expandidos** (sem precisar de merge manual no front):

```json
[
  {
    "id": "pairprogress",
    "title": "PairProgress - Aplicativo de Produtividade (Full Stack)",
    "shortDescription": "Aplicação de produtividade com backend .NET e frontend Angular.",
    "features": ["API REST para tarefas e sessões de pareamento", "Frontend em Angular com deploy estático", "Integração com Swagger para exploração da API"],
    "skills": [
      {
        "id": "dotnet",
        "name": ".NET",
        "type": "backend",
        "level": "advanced",
        "svg": { "url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnet/dotnet-original.svg" }
      },
      {
        "id": "angular",
        "name": "Angular",
        "type": "frontend",
        "level": "intermediate",
        "svg": { "url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" }
      }
    ],
    "links": {
      "github": "https://github.com/atilao4501/PairProgress.Backend",
      "site": "https://atilao4501.github.io/PairProgress/",
      "swagger": "https://pairprogress.runasp.net/swagger/index.html"
    }
  }
]
```

---

## ✅ Resumindo para você usar no Copilot

> - Use `data.pt-BR.json` / `data.en.json` + `shared.json` como mock inicial.
> - Crie models `Skill` e `Project` conforme descrito.
> - Faça merge dos dados de `projects` pelo campo `id`.
> - Renderize já com `skills` (resolvidas de ids → objetos).
> - Quando a API existir, basta trocar a fonte de dados, pois o formato será o mesmo.
