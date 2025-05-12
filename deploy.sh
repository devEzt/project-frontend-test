#!/bin/bash

# Cores para saída
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # Sem cor

echo -e "${BLUE}=== Iniciando processo de deploy ===${NC}"

# Verificar se há alterações não commitadas
echo -e "${BLUE}Verificando alterações não commitadas...${NC}"
if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}Alterações não commitadas encontradas. Commite suas alterações antes de continuar.${NC}"
    
    # Perguntar se deseja commitar automaticamente
    read -p "Deseja commitar todas as alterações automaticamente? (s/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        echo -e "${BLUE}Adicionando todas as alterações...${NC}"
        git add .
        echo -e "${BLUE}Commitando alterações...${NC}"
        git commit -m "Auto-commit para deploy"
    else
        echo -e "${RED}Abortando processo de deploy.${NC}"
        exit 1
    fi
fi

# Fazer push para o GitHub
echo -e "${BLUE}Enviando alterações para o GitHub...${NC}"
git push

# Verificar se o push foi bem-sucedido
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Alterações enviadas com sucesso para o GitHub!${NC}"
    echo -e "${GREEN}A Vercel iniciará automaticamente o deploy se estiver conectada ao seu repositório.${NC}"
    echo
    echo -e "${BLUE}Para verificar o status do deploy, acesse:${NC}"
    echo -e "${GREEN}https://vercel.com/dashboard${NC}"
else
    echo -e "${RED}Erro ao enviar alterações para o GitHub. Verifique seu acesso e tente novamente.${NC}"
    exit 1
fi

# Perguntar se deseja fazer deploy manual usando a CLI da Vercel
echo
read -p "Deseja também fazer deploy manualmente usando a CLI da Vercel? (s/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    # Verificar se a CLI da Vercel está instalada
    if ! command -v vercel &> /dev/null; then
        echo -e "${BLUE}CLI da Vercel não encontrada. Instalando...${NC}"
        npm install -g vercel
    fi
    
    echo -e "${BLUE}Iniciando deploy manual com a CLI da Vercel...${NC}"
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Deploy manual concluído com sucesso!${NC}"
    else
        echo -e "${RED}Erro no deploy manual. Verifique os logs acima.${NC}"
    fi
else
    echo -e "${BLUE}Deploy manual ignorado. Aguarde o deploy automático pela Vercel.${NC}"
fi

echo -e "${GREEN}Processo de deploy concluído!${NC}" 