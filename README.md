# Contatinho

Aplicativo de agenda de contatos personalizada para o curso de Engenharia de Software da UEPG. 

## Equipe
Nome | Email | Função
---- | ----- | ------
Anderson Antonio Rubel | andersonrubel@gmail.com | -
Gabriel Ferreira Roque | gfroque1@gmail.com | Desenvolvedor
Henry Krzywy | henrykr93@gmail.com | - 
Mario Fabio Lechka Kopacz | fabiokopacz@gmail.com | -

## 🚢 Deploy
- Faça import do arquivo dump_inicial.sql e rode o script em modificacao.sql;
- Na pasta do app, rode `npm install` para instalar dependências;
- Na pasta do backend, rode `composer install`, `npm install`, `cp .env.example .env`, `php artisan key:generate`;
- Verifique em todos os projetos variáveis como url do ambiente, usuário, senha e nome do db, etc;
- Para rodar backend: `php artisan serve --host 0.0.0.0 --port 8000` (substitua 0.0.0.0 pelo seu ip);
- Para rodar app: `expo r` (utilize parâmetro -c para limpar cache quando necessário).

## 🔀 Dependências e versões
 - MySQL 8.0;
 - PHP 7.4;
 - Laravel 8.22;
 - ExpoCli 4.0.15;
 
 ## Licença
    MIT License
