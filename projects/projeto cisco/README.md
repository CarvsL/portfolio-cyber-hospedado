# 🛡️ Projeto de Infraestrutura e Segurança - Matriz TechSafe
**Autor:** Lucas Carvalho  
**Área:** Redes (Networking)  
**Status:** Concluído  



## 1. Planejamento de Rede e Endereçamento (IPs)
Definição da segmentação lógica para isolamento de departamentos e controle de acesso.

* **VLAN 10 (Setor Administrativo - Crítico)**
  * **Rede IP:** `192.168.10.0/24`
  * **Gateway (ASA):** `192.168.10.1`
* **VLAN 20 (Setor de Desenvolvimento)**
  * **Rede IP:** `192.168.20.0/24`
  * **Gateway (ASA):** `192.168.20.1`
* **VLAN 30 (WIFI / Visitantes)**
  * **Rede IP:** `192.168.30.0/24`
  * **Gateway (ASA):** `192.168.30.1`

---

## 2. Camada de Acesso e Segurança Física
**Equipamento:** Switch Cisco  
**Objetivo:** Isolar o tráfego local, aplicar hardening em portas físicas e mitigar o uso da VLAN padrão.

**2.1 Criação das VLANs:**
```bash
vlan 10
 name ADM
vlan 20
 name DEV
vlan 30
 name WIFI
```

**2.2 Atribuição das Portas:**
```bash
interface fa0/1
 switchport access vlan 10
interface fa0/2
 switchport access vlan 20
interface fa0/3
 switchport access vlan 30
```

**2.3 Hardening Físico:**
```bash
interface range fa0/4 - 24
 shutdown
```
> 💡 **Justificativa de Segurança:** Evitar a "Rede Plana" movendo as portas da VLAN 1 (padrão de fábrica) para VLANs específicas impede o "Movimento Lateral" e mitiga ataques de *VLAN Hopping*. O `shutdown` impede conexões não autorizadas de invasores locais (mitigação de ataques de Camada 2).

*(Nota: O modelo legado de Router-on-a-Stick foi descontinuado neste ambiente em favor da arquitetura de Firewall a seguir).*

---

## 3. Evolução para Firewall Stateful (Cisco ASA)
**Objetivo:** Implementar inspeção profunda de pacotes, segmentação física total e segurança baseada em níveis de confiança (*Security Levels*).

**3.1 Segmentação Física (Estratégia de Portas Dedicadas)**
* **Gig1/1 (ADM):** Conectada ao Switch (VLAN 10). IP: `192.168.10.1`
* **Gig1/2 (DEV):** Conectada ao Switch (VLAN 20). IP: `192.168.20.1`
* **Gig1/3 (WIFI):** Conectada ao Switch (VLAN 30). IP: `192.168.30.1`
* **Gig1/4 (OUTSIDE):** Conectada ao Roteador de Internet. IP: `200.100.50.2/24`
* **Gig1/5 (DMZ):** Conectada diretamente ao Servidor Web. IP: `172.16.50.1/24`

**3.2 Hierarquia de Confiança (Security Levels)**
O fluxo nativo permite tráfego do nível MAIOR para o MENOR, bloqueando o inverso.
* `nameif ADM` -> **security-level 100** *(Rede de maior confiança)*
* `nameif DEV` -> **security-level 50** *(Rede intermediária)*
* `nameif DMZ` -> **security-level 40** *(Área isolada de serviços - "Aquário")*
* `nameif WIFI` -> **security-level 10** *(Rede de visitantes - Baixa confiança)*
* `nameif OUTSIDE` -> **security-level 0** *(Internet - Confiança Zero)*

**3.3 Inspeção de Estado (Stateful ICMP Inspection)**
```bash
policy-map global_policy
 class inspection_default
  inspect icmp
```
> 💡 **Justificativa:** Força o firewall a monitorar o estado dos Pings, permitindo o tráfego de retorno sem comprometer o bloqueio nativo do nível de segurança.

---

## 4. Zona Desmilitarizada (DMZ) e Serviços Web
**Objetivo:** Hospedar serviços que precisam ser acessados sem comprometer a rede interna corporativa.

* **Servidor Web Isolado:** IP `172.16.50.10`.
> 💡 **Justificativa de Arquitetura:** Ao alocar o servidor no *Security Level 40*, as redes ADM (100) e DEV (50) possuem acesso nativo para manutenção. Se o servidor for comprometido, o atacante fica restrito ao nível 40, sendo barrado de realizar movimentos laterais para as redes corporativas internas.

---

## 5. Conectividade Externa (NAT e Roteamento)
**Objetivo:** Permitir o acesso da infraestrutura interna à Internet, mascarando a topologia real da empresa.

**5.1 Rota Padrão (Gateway of Last Resort)**
```bash
route OUTSIDE 0.0.0.0 0.0.0.0 200.100.50.1
```

**5.2 Dynamic PAT (Network Address Translation)**
```bash
object network REDE_INTERNA
 subnet 192.168.0.0 255.255.0.0
 nat (any,OUTSIDE) dynamic interface
```
> 💡 **Justificativa:** Todos os IPs privados (`192.168.x.x`) são camuflados e saem para a internet usando o IP público da interface OUTSIDE do firewall, impedindo mapeamento direto de fora para dentro e economizando endereços IPv4.

---

## 6. Controle Granular de Acesso (ACLs Explícitas)
**Objetivo:** Aplicar o Princípio do Menor Privilégio. Contornar bloqueios nativos de níveis de segurança para garantir estritamente as respostas (`echo-reply`) e tráfego de aplicações autorizadas.

**6.1 ACL RETORNO_DMZ:**
```bash
access-list RETORNO_DMZ extended permit tcp host 172.16.50.10 eq www 192.168.10.0 255.255.255.0
access-list RETORNO_DMZ extended permit tcp host 172.16.50.10 eq www 192.168.20.0 255.255.255.0
access-list RETORNO_DMZ extended permit icmp host 172.16.50.10 192.168.0.0 255.255.0.0 echo-reply
access-group RETORNO_DMZ in interface DMZ
```
* **Ação:** Permite que o Servidor Web responda com páginas HTTP (porta 80) e respostas de ping para as redes ADM e DEV. O resto é descartado pela regra invisível `deny ip any any`.

**6.2 ACL VOLTA_OUTSIDE:**
```bash
access-list VOLTA_OUTSIDE extended permit icmp any 192.168.0.0 255.255.0.0 echo-reply
access-group VOLTA_OUTSIDE in interface OUTSIDE
```
* **Ação:** Permite que equipamentos na internet (ou filiais remotas) respondam aos pings iniciados pelos PCs internos.

**6.3 ACLs de Intercomunicação (DEV e WIFI):**
```bash
access-list RETORNO_DEV extended permit icmp any 192.168.10.0 255.255.255.0 echo-reply
access-group RETORNO_DEV in interface DEV

access-list VOLTA_WIFI extended permit icmp any 192.168.10.0 255.255.255.0 echo-reply
access-list VOLTA_WIFI extended permit icmp any 192.168.20.0 255.255.255.0 echo-reply
access-group VOLTA_WIFI in interface WIFI
```
* **Ação:** Garante que setores de menor nível possam devolver pacotes ICMP caso sejam auditados/pingados pela gerência (nível 100), sem conceder o direito de iniciar uma conexão.

---

## 7. Interconexão de Unidades (VPN Site-to-Site)
**Objetivo:** Estabelecer um túnel de comunicação seguro entre a Matriz e a Filial através da internet pública, garantindo Confidencialidade, Integridade e Disponibilidade.

**7.1 Topologia de Borda**
* **Matriz (ASA 5506-X):** IP Público `200.100.50.2`
* **Filial (Router 2811):** IP Público `200.200.10.2`

**7.2 Protocolo de Segurança: IPsec (IKEv1)**
A implementação utiliza o protocolo IPsec para criar o túnel criptografado.
* **Fase 1 (ISAKMP Policy 10):** Criptografia `AES`, Hash `SHA`, Autenticação `Pre-shared Key` (Senha forte), Diffie-Hellman `Group 2`.
* **Fase 2 (Transform-Set):** Encapsulamento `esp-aes` e `esp-sha-hmac`.

**7.3 Tráfego Interessante (Crypto Maps)**
Definição exata de quais redes têm permissão para entrar no túnel VPN:
* **Permitido:** Rede `192.168.10.0` (Matriz ADM) <-> `192.168.50.0` (Filial LAN).
* **Permitido:** Rede `192.168.20.0` (Matriz DEV) <-> `192.168.50.0` (Filial LAN).

---

## 8. Segurança Ofensiva e Mitigação de Pivotagem
**Objetivo:** Aplicar o conceito de comunicação unidirecional para impedir que um comprometimento na Filial afete a integridade da Matriz.

**8.1 Implementação Técnica (Roteador da Filial):**
```bash
ip access-list extended REGRAS_LAN_FILIAL
 deny icmp 192.168.50.0 0.0.0.255 192.168.10.0 0.0.0.255 echo
 permit ip any any
```
> 💡 **Justificativa:** Bloqueia a capacidade de um host na Filial iniciar um ping ou varredura de rede (reconhecimento) contra o setor Administrativo da Matriz. No entanto, permite que o Admin da Matriz realize pings de diagnóstico (*One-Way Ping*).  
> 🛡️ **Mitigação:** Previne ataques de Movimentação Lateral originados de unidades remotas menos seguras (*Zero Trust Parcial*).

---

## 9. Integração de Serviços (DMZ <-> Filial) e Roteamento de Borda
**Objetivo:** Garantir que a Filial remota consiga consumir os serviços web e de resolução de nomes hospedados na DMZ da Matriz, atravessando a internet pública de forma roteada.

**9.1 Roteamento Estático no Core do ISP (Simulação de Provedor)**
Mapeamento das rotas de retorno (*Next Hop*) no roteador ISP:
```bash
ip route 172.16.50.0 255.255.255.0 200.100.50.2
ip route 192.168.50.0 255.255.255.0 200.200.10.2
```

**9.2 Resolução de Nomes Interna (DNS)**
* **Ação:** Configuração do IP do Servidor Web da DMZ (`172.16.50.10`) como o servidor DNS primário nas estações da Filial.
* **Justificativa:** Evita o vazamento de requisições DNS (*DNS Leak*) para servidores públicos ao tentar acessar a intranet da empresa (`www.techsafe.com.br`).

---

## 10. Gestão de Incidentes e Troubleshooting
Registro de ocorrências técnicas resolvidas durante a implementação.

* **10.1 Incidente de Licenciamento (Cisco 2911):** Comandos crypto rejeitados mesmo após ativação de licença por bug do emulador. *Solução:* Realizado "Hardware Swap" tático para o modelo Cisco 2811, permitindo a subida imediata do túnel IPsec.
* **10.2 Bug de Inspeção de NAT no ASA:** O tráfego da VPN saía "nu" pela internet pois o ASA aplicava NAT antes do Crypto Map. *Solução:* Ajuste na ordem de processamento das regras (*NAT Exempt*).
* **10.3 Bloqueio Nativo de ICMP (Stateful Firewall Drop):** Pings da Filial chegavam à DMZ, mas a resposta (`echo-reply`) era descartada na interface OUTSIDE. *Solução:* Ativação do módulo `inspect icmp` aliado à criação da ACL `VOLTA_OUTSIDE`.
* **10.4 Falha de Negociação de Camada 2 (Auto-MDIX):** Interfaces L3 diretas `Up/Up`, mas com 0% de sucesso na troca de pacotes. *Solução:* Substituição da mídia física para Cabo Cruzado (*Copper Cross-Over*).

---

## 11. Conclusão e Resultado Final da Arquitetura
A infraestrutura TechSafe agora opera sob uma topologia corporativa robusta e validada contra ataques comuns:

* 🔒 **Isolamento Interno:** Segmentação por VLANs e Security Levels estritos no ASA.
* 🛡️ **Acesso Remoto Seguro:** Túnel Site-to-Site blindando a comunicação inter-filiais.
* 🌐 **DMZ Funcional:** Serviços expostos com segurança (HTTP e DNS). O comprometimento da DMZ não garante pivotagem para as redes críticas devido ao nível de segurança 40.
* 🚦 **Controle de Fluxo:** A Gerência possui visibilidade da rede, mas a Filial e a DMZ não possuem privilégios para iniciar varreduras no núcleo corporativo.
