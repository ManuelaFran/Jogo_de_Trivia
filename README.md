# :question: Jogo de Trivia
![Captura de tela de 2022-08-14 13-19-47](https://user-images.githubusercontent.com/95245210/216848434-1c76b206-ab53-4929-913f-fde8db4bd1ec.png)

# Contexto
Neste projeto foi desenvolvido um jogo de perguntas e respostas baseado no jogo Trivia, parecido um show do milhão americano, utilizando React e Redux.

O app começa com uma tela na qual a pessoa que joga coloca seu nome e seu e-mail. O e-mail será usado para buscar a foto associada no site Gravatar, se houver.

Logo após, ela é redirecionada para o jogo em que deve escolher uma das respostas disponíveis para cada uma das perguntas. A resposta deve ser marcada antes de o contador de tempo chegar a zero; caso contrário, a resposta deve ser considerada como errada.

Cada acerto dá pontos que deverão ser computados num placar, no header da aplicação, à pessoa que joga. Após 5 perguntas respondidas, a pessoa que joga é redirecionada para uma tela de score, em que o texto mostrado vai depender do número de acertos. No fim de cada jogo, a pessoa que joga pode acessar o ranking com as melhores pontuações.

A pessoa que joga pode configurar algumas opções para o jogo em uma tela de configurações acessível a partir do header do app.



## Tecnologias usadas

Front-end:
> Desenvolvido usando: React, Redux, CSS3


## Instalando Dependências

> Frontend
```bash
cd src/
npm install
``` 
## Executando aplicação

* Para rodar o front-end:

  ```
    cd src/ && npm start
  ```

## Executando Testes

* Para rodar todos os testes:

  ```
    npm test
  ```
