# 🛡️ Full-Stack Cyber Defense Lab: Adversary Emulation & Automated SOC
**Autor:** Lucas Carvalho  
**Área:** Cybersecurity (Red Team / Blue Team / SOC)  
**Status:** Concluído  

## 1. Visão Geral do Projeto
Este projeto consiste na criação de um laboratório virtualizado isolado para simular um ambiente corporativo real. O objetivo principal foi emular o ciclo de vida completo de um incidente de segurança (Ataque, Detecção e Resposta), utilizando ferramentas Open Source. O laboratório cobre desde o **Acesso Inicial** e **Escalação de Privilégios (Red Team)** até a **Detecção Comportamental (SIEM)**, **Resposta Automatizada (Active Response)** e **Análise Forense (Blue Team)**.

---

## 2. Topologia e Infraestrutura
Para garantir a segurança do host físico e o isolamento dos ataques, foi configurada uma rede NAT segmentada no Oracle VM VirtualBox (`SOC_Lab_Network`).

### **ARQUITETURA - Topologia do Laboratório**
**Infraestrutura de Red Team e Blue Team**

Como pode ser observado na imagem abaixo, o ambiente é composto por três sistemas operacionais distintos integrados na mesma rede virtual:

* **SIEM-Wazuh (SOC / Manager - Crítico)**

  * **Sistema Operacional:** `Ubuntu Server`

  * **Função no Lab:** `Cérebro do SOC / Manager`

  * **IP:** `10.0.0.4`

---

* **Win11-Vitima (Endpoint - Usuário)**

  * **Sistema Operacional:** `Windows 11 Enterprise`

  * **Função no Lab:** `Endpoint (Alvo/Vítima)`

  * **IP:** `10.0.0.3`

---

* **Kali-Attacker (Red Team / Atacante)**

  * **Sistema Operacional:** `Kali Linux`

  * **Função no Lab:** `Máquina do Atacante (Red Team)`

  * **IP:** `10.0.0.5`
    
![Topologia do Laboratório](pictures/as%203%20maquinas%20virtuais.png)

---

## 3. Engenharia de Detecção e Baseline (Blue Team)

### **DETECÇÃO - Validação de Monitoramento de Linha de Base**
**Verificação da Eficácia das Regras Customizadas antes da Emulação de Ataques**

Antes de iniciar a emulação do adversário, foi fundamental validar a capacidade do SOC de monitorar atividades legítimas, porém críticas. Foram criadas regras de monitoramento de acessos privilegiados no arquivo `local_rules.xml`.

![Regra de Login Admin](pictures/rule%20login%20admin.png)

A análise do JSON no dashboard isolou o login bem-sucedido do usuário corporativo humano (`targetUserName: EMPRESA`) na máquina alvo. O evento foi automaticamente correlacionado à técnica **MITRE ATT&CK T1078 (Valid Accounts)**, validando que o monitoramento de contas sensíveis está totalmente operacional.

![Regra de Login Admin](pictures/blockempresa.png)

---

## 4. Emulação de Ataques (Red Team)

### **ATAQUE 1 - Tentativa de Acesso Inicial e Bloqueio por Endpoint Protection**
**Simulação de Acesso Inicial: O Confronto com o Windows Defender**

A primeira fase de um compromisso de segurança demonstra a tentativa de obter Acesso Inicial (Initial Access) num ambiente Windows 11, ilustrando por que as ferramentas de ataque padrão já não são suficientes.

💻 **Passo a Passo da Simulação:**
* **Ação:** Geração de payload com `msfvenom` (`payload.exe`) e tentativa de download na vítima.
* **Reação:** O Windows Defender detecta a assinatura e bloqueia o download instantaneamente.
* **Evasão (Emulação):** Para continuidade do lab, a proteção é desativada manualmente para simular um cenário onde o atacante utilizou uma técnica de evasão avançada (Zero-day) e estabelecer a sessão Meterpreter.

📊 **Visibilidade no SIEM (Wazuh):**
Como evidenciado na imagem abaixo, o ataque não passou despercebido. O SIEM registrou o alerta de telemetria do Sysmon correspondente à criação do executável suspeito no disco.

![Alerta de Executável](pictures/siem%20alerta%20executable%20file%20dropped.png)

▶️ **[Assista ao Vídeo do Ataque 1](pictures/ataque1.mp4)**

---

### **ATAQUE 2 - Bypass UAC e Criação de Conta Furtiva (LotL)**
**Escalação de Privilégios e Persistência através de Living off the Land**

Após obter o acesso inicial, o atacante busca controle total do sistema através da Escalação de Privilégios (Privilege Escalation) e criação de persistência.

⚙️ **Técnicas Demonstradas:**
* **Bypass UAC:** Uso do exploit `fodhelper` para elevar a sessão Meterpreter ao nível de **SYSTEM**.
* **Living off the Land (LotL):** Uso de uma *shell* interativa e comandos nativos do Windows (`net user` e `net localgroup`) para criar o usuário "hackerzinho" e elevá-lo ao grupo de Administradores, evitando o uso de módulos de malware que gerariam alertas de assinatura conhecidas.

![Bypass UAC e Criação de Conta](pictures/Ataque%20Privilege%20Escalation%20e%20Novas%20Contas.png)

▶️ **[Assista ao Vídeo do Ataque 2](pictures/ataque2.mp4)**

---

## 5. Análise Forense e Triage (Blue Team)

### **ANÁLISE - Análise Forense em SIEM: Detectando Persistência no Wazuh**
**Triage de Alertas e Investigação de Artefatos Pós-Comprometimento**

Demonstração da visibilidade do Blue Team e a capacidade de investigação profunda (drill-down) através do painel do Wazuh.

🔍 **Foco da Investigação Forense:**
* **Drill-down (JSON):** Inspeção profunda dos logs brutos gerados pelo agente do Wazuh para extrair Indicadores de Comprometimento (IOCs), como SIDs de usuários e nomes de processos.
* **Mapeamento MITRE ATT&CK:** Confirmação das táticas de Persistência através de manipulação de conta (**T1098**) e Evasão de Defesa/Escalação de Privilégios via alteração de grupo (**T1484**).

🛡️ **Artefatos Isolados:**
Foram validados os registros nativos de auditoria do Windows, capturando com exatidão o momento do Bypass UAC e da injeção do usuário "hackerzinho".

![Alerta de Criação de Conta](pictures/siem%20alerta%20user%20account%20created.png)
![Alerta de Grupo Modificado](pictures/siem%20alerta%20administrator%20group%20changed.png)

▶️ **[Assista ao Vídeo de Análise Forense](pictures/Análise.mp4)**

---

## 6. Resposta Ativa e Automação de Defesa

### **AUTOMAÇÃO - SOC Bloqueando Port Scan (Nmap) Automaticamente**
**Implementação de IPS via Active Response**

Para transformar o SIEM em um IPS (Intrusion Prevention System), foi implementada uma automação para conter ameaças de rede (como Port Scans e Brute Force) em tempo real. O "cérebro" da configuração está nas regras de correlação customizadas (`local_rules.xml`) e no gatilho de execução configurado no Manager (`ossec.conf`).

![Regra de Port Scan](pictures/rule%20port%20scan.png)
![Configuração de Active Response](pictures/active%20response.png)

🛠️ **Componentes da Resposta Ativa:**
* **Script de Bloqueio:** O script customizado `soc-block.cmd` em Batch/PowerShell extrai dinamicamente o IP do atacante do JSON de alerta e injeta regras de bloqueio direto no Windows Firewall via `netsh`.
* **Execução:** O Red Team perde instantaneamente o acesso (ping time-out) segundos após iniciar um scan agressivo de rede.

![Script de Active Response](pictures/script%20de%20Active%20Response.png)

▶️ **[Assista ao Vídeo do Bloqueio Automático](pictures/nmap%20bloqueado!.mp4)**

---

## 7. Resultados Alcançados
A conclusão deste laboratório comprova o funcionamento efetivo de um SOC moderno. Foi possível demonstrar na prática que:
1. **Ferramentas de assinatura (Antivírus)** são essenciais e atuam como a primeira barreira, mas são insuficientes contra técnicas evasivas ou malwares *Zero-days*.
2. **Telemetria avançada (Sysmon)** aliada a um **SIEM (Wazuh)** é fundamental para detectar técnicas de *Living off the Land (LotL)* e movimentação lateral, focando no comportamento da ameaça em vez de sua assinatura.
3. **Automação (Active Response)** reduz drasticamente o MTTR (Mean Time to Respond), bloqueando invasores de forma autônoma e em tempo real antes que possam consolidar o acesso na rede.
