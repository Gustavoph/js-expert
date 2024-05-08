# Mocks
- Em testes de software, um "mock" é um objeto simulado que simula o comportamento de um objeto real de forma controlada. Eles são frequentemente usados para isolar o código sob teste de suas dependências externas, como bancos de dados, APIs externas ou outros sistemas.

- Quando você está escrevendo um teste para uma determinada função ou método, você pode querer testar apenas o comportamento dessa função, sem envolver seus componentes externos. Para fazer isso, você pode substituir esses componentes externos por mocks.

- Algumas razões pelas quais os mocks são úteis em testes:
  - Isolamento de Dependências: Eles permitem testar uma unidade de código isoladamente, sem depender do comportamento de outras partes do sistema.
  - Controle de Comportamento: Você pode especificar exatamente como você quer que o mock responda a diferentes entradas, permitindo testar diferentes cenários.
  - Velocidade de Execução: Às vezes, as dependências reais podem ser lentas ou difíceis de configurar para testes. Mocks permitem que os testes sejam executados rapidamente e de forma previsível.
  - Testes Reprodutíveis: Como você controla o comportamento do mock, os testes se tornam mais previsíveis e reprodutíveis, facilitando a detecção e correção de problemas.