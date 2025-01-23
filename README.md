# ViteBoilerplate

[![Quality Gate Status](https://sonar.sajermann.com/api/project_badges/measure?project=ViteBoilerplate&metric=alert_status&token=c20b031754297367f9ae878250ca398015d0b245)]()
[![Coverage](https://sonar.sajermann.com/api/project_badges/measure?project=ViteBoilerplate&metric=coverage&token=c20b031754297367f9ae878250ca398015d0b245)]()
[![Bugs](https://sonar.sajermann.com/api/project_badges/measure?project=ViteBoilerplate&metric=bugs&token=c20b031754297367f9ae878250ca398015d0b245)]()
[![Code Smells](https://sonar.sajermann.com/api/project_badges/measure?project=ViteBoilerplate&metric=code_smells&token=c20b031754297367f9ae878250ca398015d0b245)]()
[![Duplicated Lines (%)](https://sonar.sajermann.com/api/project_badges/measure?project=ViteBoilerplate&metric=duplicated_lines_density&token=c20b031754297367f9ae878250ca398015d0b245)]()

Esse Boilerplate tem como finalidade entregar os principais recursos necessários para se iniciar um projeto frontend com React e Typescript.

Sabemos que cada caso é um caso, cada projeto demanda uma necessidade diferente, será necessário adicionar outras libs, ou até mesmo remover alguma que não está sendo utilizada, mas em um mundo perfeito, tentando abrangir a maior parte dos projetos, esse boilerplate que eu criei é a minha escolha.

## Principais Recursos e Configurações Desse Boilerplate

### Vite
Vite hoje é sem dúvidas a melhor escolha para se iniciar um projeto frontent, além de moderno, sua principal característica é a velocidade de compilação, o que leva ao desenvolvedor uma produtividade incrível, Vite utiliza por de baixo dos panos o Rollup, que na minha opinião possui uma configuração muito simples.

### Typescript
Projetos profissionais utilizam o Typescript para desenvolvimento, com ele o desenvolvedor tem mais segurança para desenvolver localizando mais rapidamente os bugs e dando mais manutenibilidade ao projeto.

### Tailwind CSS
Tailwind CSS é um framework CSS que me lembra muito o Bootstrap, porém melhorado, depois de instalado e configurado basta adicionar as classes necessárias para ver o resultado em tela, por exemplo utilizando a classe `flex`, o tailwind já converte para `display: flex;`, esse é só um exemplo das facilidades que o tailwind entrega. Vale lembrar que o Tailwind não entrega componentes prontos como por exemplo o MUI, a criação do componente em si continua a cargo do desenvolvedor.

### React Router Dom
React Router Dom é uma lib que gerencia o roteamento da aplicação e que dificilmente fica de fora de qualquer projeto que tenha mais de uma rota.

### BiomeJs
Nova ferramenta que une o melhor do Eslint e do Prettier, reescrita em rust, sendo muito mais rápida que ambas e com configurações centralizadas.

### ~~EsLint~~
EsLint tem como objetivo padronizar o código entre diversos desenvolvedores no mesmo projeto. Vale lembrar que para o EsLint funcionar corretamente nesse projeto, são necessários algumas configurações no Vs Code do desenvolvedor.

### ~~Prettier~~
Prettier formata e corrige seu código de acordo com as regras do EsLint, por isso ambos utilizados em conjunto são uma verdadeira mão na roda para qualquer desenvolvedor. Assim como o EsLint, para o Prettier funcionar corretamente são necessários algumas configurações no Vs Code do desenvolvedor.

### Vitest
Vitest é uma alternativa ao Jest, além de ter sido criado pela equipe do Vite, ele promete ser mais rápido que seus concorrentes, nesse boilerplate já deixei ele todo configurado para além de testar também gerar os coverages, para executar os testes bastar executar o comando `npm run vitest`.

### Sonarqube
Sonarqube é uma ferramenta de inspeção de qualidade de código, nesse projeto já está configurado para ser executado através do comando `npm run sonar` e colher as informações corretas, o desenvolvedor deve apenas fazer as alterações necessárias de acordo com o seu próprio Sonarqube.

### Dark Mode
Utilizando o recurso Dark Mode do Tailwind, já deixei configurado um hook para alteração do modo escuro na aplicação, para fazer a alteração nas classes o desenvolvedor deve utilizar o seletor `dark:`.

### i18n
Internacionalização é fundamental em projetos de multiplas linguagens, utilizando a lib i18n eu já deixei configurado um hook para alteração da linguagem da aplicação, deixei como exemplo 2 linguagens completas sendo o `pt-BR` e o `en` e mais uma linguagem com apenas uma tradução que é a `de`.


## Demonstração

**Aplicação com linguagem EN**
![Aplicação com linguagem EN](https://lh3.googleusercontent.com/pw/AL9nZEXEJZkHBSTkbkTwkK7uqVyQLmJo_4tE7iDEjUppV1tZ9Wh_BzwkFkJWPkFFFrgTPDQvyTIa2bRUcm-qed1AVOA3OBqwm2Be5DjEUd0xYqwGfXfbTGZdY1eQrdNpUjOrSPnep0jNKl7k8aht05-kScsS=w687-h607-no?authuser=0)

**Aplicação com linguagem PT-BR**
![Aplicação com linguagem PT-BR](https://lh3.googleusercontent.com/pw/AL9nZEVelwcjNe40-MUB5ETLvbzCQ8UVFvkSAQYFLl43TnRySfy7VuAXoDMdIoNxpAzAt0gr8LU64tH9BZ0dM5N3yiluWW30mgnOFj-vQ7NlLL79b4HJRAj329sfzgBJV_B2DHUHKeV-x04qChwNU5r-0qy9=w686-h599-no?authuser=0)

**Aplicação com Tema Claro**
![Aplicação com Tema Claro](https://lh3.googleusercontent.com/pw/AL9nZEXAyrbBZFN2OLjhWh1EowBTukKZDhhRrs6GOs7JvITj7BRHBn7RO7fTKLvQo96snXDbD40XOPRMMgxEJeIRzIr5qjPJiu7bfcJyLlN0TX9n3hn5Ys2H8CIMW_rZ7PG_xjXnLo8nKAFG15A_4cCSrDIJ=w693-h619-no?authuser=0)

**Vitest Coverage**
![Vitest Coverage](https://lh3.googleusercontent.com/pw/AL9nZEUDS6zefrh0HC5Fhrg_mGfSiLYwmg_7YbplfzBcjPnnbRBVCb5lEtUqR-IqoDj6XMT9qO-BXSTlcWyfc8XKDM-jZKf9JcOHEOvXf6JoHWfsORU6-uHbmN5xHWa59BKCJJYJrUdKsfuT5h67zIDgd6ST=w802-h685-no?authuser=0)

**Sonarqube**
![Sonarqube](https://lh3.googleusercontent.com/pw/AL9nZEXrP0eon6XwURjNEnxpN0GJuk1RknnjUbCKLaHwaCsaj2rapnWuqQ0wRhWCMmQ1NZlyFqsUrcXj85ZWdJQ_4-Oc2uT_OTPMy-mI0fhlui-_zsdzPh7JEjaQoeHgBeGxmEbHFKyU08hBWIH4xO8gB0Kn=w1291-h931-no?authuser=0)
