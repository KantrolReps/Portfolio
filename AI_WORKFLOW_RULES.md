# Diretrizes de Operação do Assistente IA (Antigravity)

Este documento estabelece as regras de fluxo de trabalho que o Assistente de Inteligência Artificial deve seguir ao interagir com o repositório da Kantrol.

---

## 🛑 REGRA DE ENCERRAMENTO DE EXPEDIENTE (DAILY REPORT)

**GATILHO DE ATIVAÇÃO:** 
Sempre que o usuário sinalizar que as implementações do dia foram finalizadas (ex: *"finalizamos por hoje"*, *"tudo concluído"*, *"fim do expediente"*).

**AÇÃO OBRIGATÓRIA:**
Ao detectar o gatilho, o assistente IA **DEVE AUTOMATICAMENTE** compilar um relatório gerencial consolidando todas as tarefas realizadas na sessão atual e gerar um arquivo `.html` formatado para impressão.

### Instruções para a Geração do Relatório:

1. **Nome do Arquivo:** Criar e salvar o arquivo na raiz do projeto com o nome `Relatorio_Atualizacoes_[Data_de_Hoje].html`.
2. **Estrutura de Conteúdo:**
   - **Cabeçalho:** Título com o nome do projeto (Kantrol) e a data atual.
   - **Objetivo do Dia:** Um parágrafo resumindo a meta das tarefas.
   - **Tópicos de Melhoria:** Separar as ações realizadas em categorias claras (ex: *1. Mudanças Visuais (UI)*, *2. Melhorias de Experiência (UX)*, *3. Ajustes Técnicos e Versionamento*).
   - **Tom de Voz:** Profissional, corporativo e claro, focado em transmitir valor para colaboradores, gestores e stakeholders (não deve ser excessivamente técnico).
3. **Formatação Visual (Obrigatório):**
   - O documento HTML deve ser auto-contido.
   - Usar a tag `<style>` para simular uma folha de papel A4.
   - **Exemplo de CSS Base Exigido:**
     ```css
     body { font-family: "Segoe UI", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 40px auto; padding: 40px; background: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
     h1, h2 { color: #0b1d2f; }
     h3 { color: #3db7c5; }
     @media print { body { box-shadow: none; margin: 0; padding: 0; } }
     ```
4. **Instruções ao Usuário:** Na mensagem final da conversa, a IA deve avisar o usuário de que o arquivo HTML foi gerado e lembrar que ele pode abri-lo no navegador e dar `Ctrl+P` para salvar como PDF, ou abrir diretamente no Microsoft Word.

---

*Nota: Esta regra visa manter uma comunicação transparente com a equipe de desenvolvimento e diretoria, automatizando a documentação de Changelogs e relatórios de progresso da Kantrol.*
