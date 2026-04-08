# 🔬 Forense Digital: Triage e Drill-down de Alertas no SIEM
**Foco:** Investigação Pós-Comprometimento, Caça a IOCs, Análise JSON e MITRE ATT&CK

## 1. Visão Geral
Este recorte documenta o trabalho analítico e investigativo do Analista de SOC / Incident Response após a ocorrência de um incidente de segurança. Através do painel do Wazuh, realizo a análise forense de um endpoint Windows 11 comprometido, remontando a cadeia de ataque deixada pelo Red Team.

## 2. A Investigação Pós-Exploração
O objetivo da análise é validar os alertas disparados no painel e extrair os artefatos técnicos da invasão (Living off the Land).

🔍 **Foco da Investigação no Vídeo:**
* **Drill-down (JSON):** Inspeção profunda dos logs brutos gerados pelo agente do Wazuh para extrair Indicadores de Comprometimento (IOCs), como SIDs de usuários e nomes de processos.
* **Isolamento de Artefatos:** Rastreamento das ações do invasor nos logs nativos de auditoria do Windows, capturando com exatidão o momento do Bypass UAC e da injeção de contas locais.
* **Mapeamento MITRE ATT&CK:** Confirmação das táticas de Persistência através de manipulação de conta (**T1098**) e Evasão de Defesa/Escalação de Privilégios via alteração de grupo (**T1484**).

▶️ **[Assista ao Vídeo Completo do Processo de Análise Forense no Painel do SIEM](pictures/Análise.mp4)**