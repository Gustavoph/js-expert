# Instala a versão 20
- nvm install 20

# Lista as versões disponíveis
- nvm list

# Instala a versão de long-term support (LTS)
- nvm install --lts

# Troca a versão para a desejada
- nvm use 20

# Define a versão padrão do computador
- nvm alias default 20

# Define a versão que o projeto está usando
- .nvmrc: anota a versão
- nvm use: verifica o .nvmrc e troca para a versão
- node -v > .nvmrc: verifica a versão e já cria um .nvmrc
- engines: adiciona a versão do node no package.json