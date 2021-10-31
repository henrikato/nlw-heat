# Aplicativo DoWhile2021

## Este repositório contem código desenvolvido durante o NLW/Heat de 2021, na trilha _Impulse_
O projeto desenvolvido é composto de API, Página Web e Aplicativo Mobile para que pessoas possam compartilhar as suas expectativas sobre o evento DoWhile2021.

O aplicativo conta com um sistema de acesso que funciona com o auxílio do GitHub OAuth para autenticação, persiste dados de novos usuários em banco de dados e gera um token de autorização utilizando JWT.

O usuário recebe mensagens persistidas no banco de dados e mensagens enviadas em tempo real através da utilização de websockets, assim como consegue enviar novas mensagens e notificar todos os outros.
----

## Nos 3 projetos foram utilizadas as seguintes bibliotecas principais, além de outras para auxiliar o desenvolvimento ou a experiência do usuário:
- node_api: API desenvolvida com NodeJS, Express, Prisma, Socket.io, JWT, TypeScript
- web: Interface Web feita com React, Vite, SASS, Socket.io client, TypeScript
- mobile: Aplicativo móvel feito com React Native, Expo (+ plugins), Moti, Socket.io Client