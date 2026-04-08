# 🥷 Red Team Operations: Initial Access & Evasion
**Foco:** Offensive Security, Evasão de Antivírus e Privilege Escalation

## 1. Visão Geral
Este é um recorte focado exclusivamente na parte ofensiva do meu laboratório de simulação cibernética. O objetivo aqui é demonstrar na prática técnicas de ataque, enfrentando defesas reais e utilizando táticas de evasão para estabelecer controle sobre um endpoint Windows 11.

## 2. Acesso Inicial e Evasão de Defesas
A primeira etapa de compromisso envolveu a geração de um payload malicioso e o enfrentamento da primeira camada de defesa: o Endpoint Protection.

* **O Confronto:** Ao tentar executar o payload gerado via Metasploit, o Windows Defender interceptou a assinatura imediatamente.
* **Evasão Avançada (AMSI):** A segunda tentativa envolveu execução diretamente em memória via PowerShell (Fileless). O Antimalware Scan Interface (AMSI) da Microsoft bloqueou os scripts de bypass baseados em *Reflection*, exigindo a emulação de um Zero-day para a progressão do laboratório.

▶️ **[Assista à Emulação de Acesso Inicial](pictures/ataque1.mp4)**

## 3. Privilege Escalation e Living off the Land (LotL)
Com a evasão estabelecida, a próxima fase foi escalar privilégios e garantir a persistência.

* **Bypass UAC:** Utilização do exploit `fodhelper` para contornar o User Account Control do Windows, subindo a sessão para privilégios `SYSTEM`.
* **Persistência Stealth:** Em vez de enviar binários maliciosos, utilizei comandos nativos do Windows (`net user` e `net localgroup`) para criar furtivamente a conta "hackerzinho" e elevá-la ao grupo de Administradores.

![Bypass UAC e Criação de Conta](pictures/Ataque%20Privilege%20Escalation%20e%20Novas%20Contas.png)

▶️ **[Assista à Escalação de Privilégios e Persistência](pictures/ataque2.mp4)**