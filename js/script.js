document.addEventListener('DOMContentLoaded', () => {
    const cyberLabRepoTreeBase = 'https://github.com/CarvsL/Cyber-Defense-Lab-Adversary-Emulation-Automated-SOC/tree/main';
    const cyberLabRepos = {
        completo: `${cyberLabRepoTreeBase}/projeto%20cyber%20-%20COMPLETO`,
        blueTeam: `${cyberLabRepoTreeBase}/projeto%20cyber%20-%20blue%20team`,
        redTeam: `${cyberLabRepoTreeBase}/projeto%20cyber%20-%20red%20team`,
        forense: `${cyberLabRepoTreeBase}/projeto%20cyber%20-%20forense`
    };

    const gate = document.getElementById('gate');
    const app = document.getElementById('app');
    const enterPortfolio = document.getElementById('enterPortfolio');
    const backToGate = document.getElementById('backToGate');

    const projectsGrid = document.getElementById('projectsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const navTabs = document.querySelectorAll('.main-nav-btn');
    const aboutSection = document.getElementById('sobre');
    const projectsSection = document.getElementById('projetos');

    const modal = document.getElementById('projectModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalCategory = document.getElementById('modalProjectCategory');
    const modalTabs = document.querySelectorAll('.modal-tab');
    const modalPanels = {
        docs: document.getElementById('modal-panel-docs'),
        media: document.getElementById('modal-panel-media'),
        repo: document.getElementById('modal-panel-repo')
    };
    const mediaLightbox = document.getElementById('mediaLightbox');
    const mediaLightboxImage = document.getElementById('mediaLightboxImage');
    const mediaLightboxCaption = document.getElementById('mediaLightboxCaption');
    const closeMediaLightboxBtn = document.getElementById('closeMediaLightbox');
    const screenTransitionMs = 220;
    let isScreenTransitionRunning = false;


    const projects = [
        {
            id: 'proj-1',
            title: 'Projeto TechSafe - Redes e Seguranca',
            category: 'redes',
            categoryLabel: 'Redes',
            displayTags: ['Redes'],
            summary: 'Arquitetura corporativa segura com firewall, segmentacao, DMZ e VPN site-to-site.',
            description: 'Projeto TechSafe – Redes & Segurança Desenvolvimento de arquitetura corporativa segura com foco em segmentação e criptografia ponta a ponta. Utiliza Firewall Cisco ASA, túneis VPN IPsec para conexão Matriz-Filial e controle granular de acesso via ACLs para proteção de ativos críticos e mitigação de ameaças.',
            docs: [
                'README tecnico do projeto TechSafe',
                'Arquitetura de rede, DMZ, ACLs e VPN',
                'Troubleshooting e conclusoes de seguranca'
            ],
            githubDocPath: 'README.md',
            readmePath: 'projects/projeto cisco/readme.md',
            repoUrl: 'https://github.com/CarvsL/infraestrutura-techsafe',
            media: [
                { type: 'image', label: 'Filial TechSafe', src: 'projects/projeto cisco/Pictures/Filial TechSafe.png' },
                { type: 'image', label: 'Matriz TechSafe', src: 'projects/projeto cisco/Pictures/Matriz TechSafe.png' },
                { type: 'image', label: 'Rede TechSafe', src: 'projects/projeto cisco/Pictures/Rede TechSafe.png' },
                { type: 'video', label: 'Security Acess', src: 'projects/projeto cisco/Videos/Security Acess.mp4' },
                { type: 'video', label: 'Site VPN', src: 'projects/projeto cisco/Videos/Site VPN.mp4' }
            ]
        },
        {
            id: 'proj-cyber-geral',
            title: 'Full-Stack Cyber Defense Lab: Adversary Emulation & Automated SOC',
            category: 'geral',
            categoryLabel: 'Completo',
            displayTags: ['Red Team', 'Blue Team', 'Forense'],
            summary: 'Visao completa do laboratorio com arquitetura, ataque, deteccao, resposta ativa e investigacao.',
            description: 'Este projeto consolida todo o ciclo operacional do laboratorio: desenho da topologia isolada com 3 VMs, emulacao de ataque no endpoint Windows, deteccao e correlacao no Wazuh com Sysmon, automacao de bloqueio no firewall via Active Response e triagem forense dos rastros. Ele funciona como base unica para entender o contexto completo antes de aprofundar nos recortes de Red Team, Blue Team e Forense.',
            docs: [
                'Topologia de rede local (pfSense, Windows Server, Wazuh)',
                'Configuracao de regras e eventos do Sysmon',
                'Taticas e Tecnicas (MITRE ATT&CK)'
            ],
            githubDocPath: 'projeto cyber - COMPLETO/README.md',
            readmePath: 'projects/projeto cyber/projeto cyber - COMPLETO/Readme.md',
            repoUrl: cyberLabRepos.completo,
            media: [
                { type: 'image', label: 'Configuração: IPS & Active Response', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/active response.png' },
                { type: 'video', label: 'Investigação: SOC Dashboard Drill-down', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/Análise.mp4' },
                { type: 'image', label: 'Infraestrutura: Lab Environment Overview', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/as 3 maquinas virtuais.png' },
                { type: 'image', label: 'Evidência: SYSTEM Shell & Local Persistence', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/Ataque Privilege Escalation e Novas Contas.png' },
                { type: 'video', label: 'Exploit: Initial Access & Reverse Shell', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/ataque1.mp4' },
                { type: 'video', label: 'Post-Exploitation: Privilege Escalation', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/ataque2.mp4' },
                { type: 'image', label: 'Detecção: Baseline Admin Login', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/blockempresa.png' },
                { type: 'video', label: 'Resposta: Drop de Conexão (Nmap Scan)', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/nmap bloqueado!.mp4' },
                { type: 'image', label: 'Regra Customizada: Monitoramento de Contas', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/rule login admin.png' },
                { type: 'image', label: 'Regra de Correlação: Detecção de Reconhecimento', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/rule port scan.png' },
                { type: 'image', label: 'Automação: soc-block.cmd Source Code', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/script de Active Response.png' },
                { type: 'image', label: 'Alerta: Escalação de Privilégio (T1484)', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/siem alerta administrator group changed.png' },
                { type: 'image', label: 'Alerta: Malware Drop Detectado (T1105)', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/siem alerta executable file dropped.png' },
                { type: 'image', label: 'Alerta: Criação de Conta Furtiva (T1098)', src: 'projects/projeto cyber/projeto cyber - COMPLETO/pictures/siem alerta user account created.png' }
            ]
        },
        {
            id: 'proj-cyber-redteam',
            title: 'Full-Stack Cyber Defense Lab: Red Team Scope',
            category: 'red-team',
            categoryLabel: 'Red Team',
            displayTags: ['Red Team'],
            summary: 'Recorte ofensivo do projeto geral: acesso inicial, escalacao de privilegio e persistencia.',
            description: 'Este projeto mostra apenas a trilha ofensiva do laboratorio geral, para quem quer entender rapidamente como a cadeia de ataque foi executada no endpoint. O foco e a progressao do atacante: payload, execucao, elevacao para SYSTEM e uso de comandos nativos para manutencao de acesso.',
            docs: [
                'Acesso inicial via Macro e Payload',
                'Enumeracao de processos (tasklist, netstat)',
                'Escalacao de privilegios (AlwaysInstallElevated)',
                'Persistencia via Tarefa Agendada e Registro'
            ],
            githubDocPath: 'projeto cyber - red team/README.md',
            readmePath: 'projects/projeto cyber/projeto cyber - red team/README.md',
            repoUrl: cyberLabRepos.redTeam,
            media: [
                { type: 'image', label: 'Evidência: SYSTEM Shell & Local Persistence', src: 'projects/projeto cyber/projeto cyber - red team/pictures/Ataque Privilege Escalation e Novas Contas.png' },
                { type: 'video', label: 'Exploit: Initial Access & Reverse Shell', src: 'projects/projeto cyber/projeto cyber - red team/pictures/ataque1.mp4' },
                { type: 'video', label: 'Post-Exploitation: Privilege Escalation', src: 'projects/projeto cyber/projeto cyber - red team/pictures/ataque2.mp4' }
            ]
        },
        {
            id: 'proj-cyber-blueteam',
            title: 'Full-Stack Cyber Defense Lab: Blue Team Scope',
            category: 'blue-team',
            categoryLabel: 'Blue Team',
            displayTags: ['Blue Team'],
            summary: 'Recorte defensivo do projeto geral: regras de deteccao, correlacao e resposta automatizada.',
            description: 'Este recorte destaca somente a engenharia de deteccao e resposta do laboratorio geral. Reune a calibragem das regras no Wazuh, uso de telemetria do Sysmon, logica de correlacao para port scan e acao automatizada de bloqueio com o script soc-block.cmd.',
            docs: [
                'Integracao Sysmon & Wazuh Agent',
                'Regras costumizadas em local_rules.xml',
                'Gatilhos de Active Response (soc-block.cmd)'
            ],
            githubDocPath: 'projeto cyber - blue team/README.md',
            readmePath: 'projects/projeto cyber/projeto cyber - blue team/README.md',
            repoUrl: cyberLabRepos.blueTeam,
            media: [
                { type: 'image', label: 'Configuração: IPS & Active Response', src: 'projects/projeto cyber/projeto cyber - blue team/pictures/active response.png' },
                { type: 'video', label: 'Análise de Visibilidade: Acesso Inicial', src: 'projects/projeto cyber/projeto cyber - blue team/pictures/ataque1.mp4' },
                { type: 'video', label: 'Análise de Visibilidade: Pós-Exploração', src: 'projects/projeto cyber/projeto cyber - blue team/pictures/ataque2.mp4' },
                { type: 'image', label: 'Detecção: Baseline Admin Login', src: 'projects/projeto cyber/projeto cyber - blue team/pictures/blockempresa.png' },
                { type: 'video', label: 'Resposta: Drop de Conexão (Nmap Scan)', src: 'projects/projeto cyber/projeto cyber - blue team/pictures/nmap bloqueado!.mp4' },
                { type: 'image', label: 'Regra Customizada: Monitoramento de Contas', src: 'projects/projeto cyber/projeto cyber - blue team/pictures/rule login admin.png' },
                { type: 'image', label: 'Regra de Correlação: Detecção de Reconhecimento', src: 'projects/projeto cyber/projeto cyber - blue team/pictures/rule port scan.png' },
                { type: 'image', label: 'Automação: soc-block.cmd Source Code', src: 'projects/projeto cyber/projeto cyber - blue team/pictures/script de Active Response.png' },
                { type: 'image', label: 'Alerta: Escalação de Privilégio (T1484)', src: 'projects/projeto cyber/projeto cyber - blue team/pictures/siem alerta administrator group changed.png' },
                { type: 'image', label: 'Alerta: Malware Drop Detectado (T1105)', src: 'projects/projeto cyber/projeto cyber - blue team/pictures/siem alerta executable file dropped.png' },
                { type: 'image', label: 'Alerta: Criação de Conta Furtiva (T1098)', src: 'projects/projeto cyber/projeto cyber - blue team/pictures/siem alerta user account created.png' }
            ]
        },
        {
            id: 'proj-cyber-forense',
            title: 'Full-Stack Cyber Defense Lab: Forensics Scope',
            category: 'forense',
            categoryLabel: 'Forense',
            displayTags: ['Forense'],
            summary: 'Recorte de investigacao: triagem rapida e leitura tecnica dos eventos apos o ataque.',
            description: 'Recorte curto e direto da fase forense do projeto geral, voltado para quem quer ver somente a analise dos rastros no SIEM.',
            docs: [
                'Top 5 eventos reportados durante o incidente',
                'Query KQL/Lucene para rastreio',
                'Visao geral dos logs do SOC'
            ],
            githubDocPath: 'projeto cyber - forense/README.md',
            readmePath: 'projects/projeto cyber/projeto cyber - forense/readme.md',
            repoUrl: cyberLabRepos.forense,
            media: [
                { type: 'video', label: 'Investigação: SOC Dashboard Drill-down', src: 'projects/projeto cyber/projeto cyber - forense/pictures/Análise.mp4' }
            ]
        }
    ];

    let currentModalProjectId = null;

    function escapeHtml(text) {
        return String(text)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function sanitizeUrl(url) {
        if (!url) {
            return '#';
        }

        const trimmedUrl = url.trim();
        if (/^javascript:/i.test(trimmedUrl)) {
            return '#';
        }

        return escapeHtml(trimmedUrl);
    }

    function decodeBase64Utf8(base64Text) {
        const sanitized = String(base64Text).replace(/\s+/g, '');
        const binary = atob(sanitized);
        const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
        return new TextDecoder().decode(bytes);
    }

    function getGitHubRepoInfo(repoUrl) {
        if (!repoUrl) {
            return null;
        }

        try {
            const parsedUrl = new URL(repoUrl.trim());
            if (!/^github\.com$/i.test(parsedUrl.hostname)) {
                return null;
            }

            const pathSegments = parsedUrl.pathname
                .split('/')
                .filter(Boolean)
                .map((segment) => decodeURIComponent(segment));

            if (pathSegments.length < 2) {
                return null;
            }

            const owner = pathSegments[0];
            const repo = pathSegments[1].replace(/\.git$/i, '');
            let treePath = '';

            if (pathSegments[2] === 'tree' && pathSegments.length >= 5) {
                treePath = pathSegments.slice(4).join('/');
            }

            return {
                repoPath: `${owner}/${repo}`,
                treePath
            };
        } catch (_error) {
            return null;
        }
    }

    function decodeUriComponentSafe(value) {
        try {
            return decodeURIComponent(value);
        } catch (_error) {
            return value;
        }
    }

    function normalizeRepoFilePath(path) {
        const segments = String(path || '')
            .split('/')
            .map((segment) => segment.trim())
            .filter(Boolean);
        const normalized = [];

        segments.forEach((segment) => {
            if (segment === '.') {
                return;
            }

            if (segment === '..') {
                normalized.pop();
                return;
            }

            normalized.push(segment);
        });

        return normalized.join('/');
    }

    function resolveRelativeRepoPath(baseDirectory, relativePath) {
        const cleanedBase = String(baseDirectory || '').replace(/^\/+|\/+$/g, '');
        const cleanedRelative = String(relativePath || '').replace(/^\/+/, '');

        if (!cleanedBase) {
            return normalizeRepoFilePath(cleanedRelative);
        }

        return normalizeRepoFilePath(`${cleanedBase}/${cleanedRelative}`);
    }

    function splitUrlParts(urlValue) {
        const raw = String(urlValue || '');
        const hashIndex = raw.indexOf('#');
        const queryIndex = raw.indexOf('?');

        let pathEnd = raw.length;
        if (queryIndex >= 0) {
            pathEnd = queryIndex;
        }
        if (hashIndex >= 0 && hashIndex < pathEnd) {
            pathEnd = hashIndex;
        }

        const path = raw.slice(0, pathEnd);
        const query = queryIndex >= 0 ? raw.slice(queryIndex, hashIndex >= 0 ? hashIndex : undefined) : '';
        const hash = hashIndex >= 0 ? raw.slice(hashIndex) : '';

        return { path, query, hash };
    }

    function absolutizeGithubMarkdownLinks(html, repoPath, options = {}) {
        const branch = options.branch || 'main';
        const baseDirectory = options.baseDirectory || '';
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        doc.querySelectorAll('a[href]').forEach((anchor) => {
            const href = anchor.getAttribute('href');
            if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#') || href.startsWith('mailto:')) {
                return;
            }

            if (href.startsWith('/')) {
                anchor.setAttribute('href', `https://github.com${href}`);
                return;
            }

            const { path, query, hash } = splitUrlParts(href);
            const resolvedPath = resolveRelativeRepoPath(baseDirectory, decodeUriComponentSafe(path));
            const encodedPath = encodeGitHubPath(resolvedPath);
            anchor.setAttribute('href', `https://github.com/${repoPath}/blob/${branch}/${encodedPath}${query}${hash}`);
        });

        doc.querySelectorAll('img[src]').forEach((image) => {
            const src = image.getAttribute('src');
            if (!src || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
                return;
            }

            if (src.startsWith('/')) {
                image.setAttribute('src', `https://github.com${src}`);
                return;
            }

            const { path, query, hash } = splitUrlParts(src);
            const resolvedPath = resolveRelativeRepoPath(baseDirectory, decodeUriComponentSafe(path));
            const encodedPath = encodeGitHubPath(resolvedPath);
            image.setAttribute('src', `https://raw.githubusercontent.com/${repoPath}/${branch}/${encodedPath}${query}${hash}`);
        });

        return doc.body.innerHTML;
    }

    async function renderGithubReadme(repoPath) {
        const readmeResponse = await fetch(`https://api.github.com/repos/${repoPath}/readme`, {
            headers: {
                Accept: 'application/vnd.github+json'
            }
        });

        if (!readmeResponse.ok) {
            throw new Error(`Falha ao buscar README no GitHub: ${readmeResponse.status}`);
        }

        const readmeData = await readmeResponse.json();
        if (!readmeData.content) {
            throw new Error('Resposta do GitHub sem conteudo de README.');
        }

        const markdown = decodeBase64Utf8(readmeData.content);

        const renderedResponse = await fetch('https://api.github.com/markdown', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github+json'
            },
            body: JSON.stringify({
                text: markdown,
                mode: 'gfm',
                context: repoPath
            })
        });

        if (!renderedResponse.ok) {
            throw new Error(`Falha ao renderizar markdown no GitHub: ${renderedResponse.status}`);
        }

        const renderedHtml = await renderedResponse.text();
        const normalizedHtml = absolutizeGithubMarkdownLinks(renderedHtml, repoPath);

        return `<article class="markdown-body github-markdown-view">${normalizedHtml}</article>`;
    }

    function encodeGitHubPath(path) {
        return String(path)
            .split('/')
            .map((segment) => encodeURIComponent(decodeUriComponentSafe(segment)))
            .join('/');
    }

    function getMarkdownBaseDirectory(path) {
        const normalizedPath = normalizeRepoFilePath(path);
        const lastSlash = normalizedPath.lastIndexOf('/');
        if (lastSlash < 0) {
            return '';
        }

        return normalizedPath.slice(0, lastSlash);
    }

    function getBranchFromFileMetadata(fileData) {
        const htmlUrl = String(fileData?.html_url || '');
        const branchMarker = '/blob/';
        const markerIndex = htmlUrl.indexOf(branchMarker);
        if (markerIndex < 0) {
            return 'main';
        }

        const afterMarker = htmlUrl.slice(markerIndex + branchMarker.length);
        const slashIndex = afterMarker.indexOf('/');
        if (slashIndex < 0) {
            return 'main';
        }

        return decodeUriComponentSafe(afterMarker.slice(0, slashIndex)) || 'main';
    }

    async function renderGithubMarkdownFile(repoPath, filePath) {
        const normalizedPath = String(filePath || '').replace(/^\/+/, '');
        if (!normalizedPath) {
            throw new Error('Caminho do arquivo markdown no GitHub nao informado.');
        }

        const fileResponse = await fetch(
            `https://api.github.com/repos/${repoPath}/contents/${encodeGitHubPath(normalizedPath)}`,
            {
                headers: {
                    Accept: 'application/vnd.github+json'
                }
            }
        );

        if (!fileResponse.ok) {
            throw new Error(`Falha ao buscar arquivo markdown no GitHub: ${fileResponse.status}`);
        }

        const fileData = await fileResponse.json();
        if (!fileData.content) {
            throw new Error('Arquivo markdown encontrado sem conteudo retornado pela API.');
        }

        const markdown = decodeBase64Utf8(fileData.content);
        const baseDirectory = getMarkdownBaseDirectory(normalizedPath);
        const branch = getBranchFromFileMetadata(fileData);

        const renderedResponse = await fetch('https://api.github.com/markdown', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github+json'
            },
            body: JSON.stringify({
                text: markdown,
                mode: 'gfm',
                context: repoPath
            })
        });

        if (!renderedResponse.ok) {
            throw new Error(`Falha ao renderizar markdown do arquivo no GitHub: ${renderedResponse.status}`);
        }

        const renderedHtml = await renderedResponse.text();
        const normalizedHtml = absolutizeGithubMarkdownLinks(renderedHtml, repoPath, {
            branch,
            baseDirectory
        });

        return `<article class="markdown-body github-markdown-view">${normalizedHtml}</article>`;
    }

    async function renderGithubProjectDoc(repoPath, preferredPath, repoTreePath = '') {
        const normalized = String(preferredPath || '').trim();
        if (!normalized) {
            return await renderGithubReadme(repoPath);
        }
        return await renderGithubMarkdownFile(repoPath, normalized);
    }

    function renderInlineMarkdown(text) {
        let html = escapeHtml(text);

        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
            const safeHref = sanitizeUrl(href);
            return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
        });

        return html;
    }

    function markdownToHtml(markdown) {
        const lines = markdown.replace(/\r\n/g, '\n').split('\n');
        let html = '';
        let inList = false;
        let inCodeBlock = false;
        let codeBuffer = [];

        const closeList = () => {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
        };

        const flushCodeBlock = () => {
            html += `<pre><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`;
            inCodeBlock = false;
            codeBuffer = [];
        };

        lines.forEach((line) => {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('```')) {
                closeList();

                if (inCodeBlock) {
                    flushCodeBlock();
                } else {
                    inCodeBlock = true;
                    codeBuffer = [];
                }

                return;
            }

            if (inCodeBlock) {
                codeBuffer.push(line);
                return;
            }

            if (!trimmedLine) {
                closeList();
                return;
            }

            if (/^---+$/.test(trimmedLine)) {
                closeList();
                html += '<hr>';
                return;
            }

            const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.*)$/);
            if (headingMatch) {
                closeList();
                const level = headingMatch[1].length;
                html += `<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`;
                return;
            }

            const quoteMatch = trimmedLine.match(/^>\s?(.*)$/);
            if (quoteMatch) {
                closeList();
                html += `<blockquote>${renderInlineMarkdown(quoteMatch[1])}</blockquote>`;
                return;
            }

            const unorderedListMatch = trimmedLine.match(/^[-*]\s+(.*)$/);
            const orderedListMatch = trimmedLine.match(/^\d+\.\s+(.*)$/);
            if (unorderedListMatch || orderedListMatch) {
                if (!inList) {
                    html += '<ul>';
                    inList = true;
                }

                const listText = (unorderedListMatch || orderedListMatch)[1];
                html += `<li>${renderInlineMarkdown(listText)}</li>`;
                return;
            }

            closeList();
            html += `<p>${renderInlineMarkdown(trimmedLine)}</p>`;
        });

        closeList();
        if (inCodeBlock) {
            flushCodeBlock();
        }

        return `<article class="markdown-view">${html}</article>`;
    }

    function renderDocsList(docs) {
        return `
            <p>Documentacao prevista para este projeto:</p>
            <ul>
                ${(docs || []).map((doc) => `<li>${escapeHtml(doc)}</li>`).join('')}
            </ul>
        `;
    }

    function renderLocalReadmePreview(readmePath) {
        const safePath = escapeHtml(encodeURI(readmePath));
        return `
            <div class="doc-file-panel">
                <p>Visualizacao direta do arquivo de documentacao local:</p>
                <iframe class="doc-file-frame" src="${safePath}" title="Documentacao do projeto"></iframe>
            </div>
        `;
    }

    async function renderDocumentation(project) {
        const repoInfo = getGitHubRepoInfo(project.repoUrl);
        if (repoInfo) {
            try {
                return await renderGithubProjectDoc(repoInfo.repoPath, project.githubDocPath, repoInfo.treePath);
            } catch (_error) {
                const safeRepoUrl = sanitizeUrl(project.repoUrl);
                return `
                    <div class="doc-fallback" style="text-align: center; padding: 3rem 1rem;">
                        <p style="color: #ff5555; margin-bottom: 1rem;">O acesso à API do GitHub as vezes bloqueia por um tempo. (Erro 403 / Rate Limit)</p>
                        <p style="margin-bottom: 2rem;">Mas não se preocupe, você pode ver os detalhes e a documentação completa direto no repositório oficial:</p>
                        <a href="${safeRepoUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 24px; background-color: var(--primary-purple); color: var(--bg-dark); text-decoration: none; border-radius: 4px; font-weight: bold; font-family: monospace;">Acessar Projeto no GitHub</a>
                    </div>
                `;
            }
        }

        if (project.repoUrl) {
            const safeRepoUrl = sanitizeUrl(project.repoUrl);
            return `
                <div class="doc-fallback" style="text-align: center; padding: 3rem 1rem;">
                    <p style="margin-bottom: 2rem;">Documentacao indisponivel no momento. Acesse diretamente no repositório oficial:</p>
                    <a href="${safeRepoUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 24px; background-color: var(--primary-purple); color: var(--bg-dark); text-decoration: none; border-radius: 4px; font-weight: bold; font-family: monospace;">Acessar Projeto no GitHub</a>
                </div>
            `;
        }

        return '<p>Documentacao indisponivel no momento.</p>';
    }

    function openMediaLightbox(src, caption = '') {
        if (!src) {
            return;
        }

        mediaLightboxImage.src = src;
        mediaLightboxCaption.textContent = caption;
        mediaLightbox.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeMediaLightbox() {
        mediaLightbox.hidden = true;
        mediaLightboxImage.src = '';
        mediaLightboxCaption.textContent = '';
        document.body.style.overflow = modal.hidden ? '' : 'hidden';
    }

    function attachMediaZoomHandlers() {
        const expandableImages = modalPanels.media.querySelectorAll('.js-expandable-media');
        expandableImages.forEach((image) => {
            image.addEventListener('click', () => {
                const src = image.getAttribute('data-media-src') || image.getAttribute('src') || '';
                const label = image.getAttribute('data-media-label') || image.getAttribute('alt') || '';
                openMediaLightbox(src, label);
            });
        });
    }

    function renderRepository(project) {
        if (!project.repoUrl) {
            return '<p>Repositorio ainda nao informado para este projeto.</p>';
        }

        const safeRepoUrl = sanitizeUrl(project.repoUrl);
        return `
            <div class="repo-panel">
                <p>Codigo-fonte e historico tecnico do projeto:</p>
                <a class="repo-link" href="${safeRepoUrl}" target="_blank" rel="noopener noreferrer">
                    Acessar repositorio
                </a>
            </div>
        `;
    }

    function renderProjects(filter = 'all') {
        const normalizeFilter = (value) => String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const activeFilter = normalizeFilter(filter);
        const filtered = projects.filter((project) => {
            if (!activeFilter || activeFilter === 'all') {
                return true;
            }

            const projectFilters = [project.category, project.categoryLabel, ...(project.displayTags || [])]
                .map((tag) => normalizeFilter(tag));

            return projectFilters.includes(activeFilter);
        });

        projectsGrid.innerHTML = filtered.map((project) => `
            <article class="project-card" data-project-id="${project.id}" data-category="${project.category}">
                <h3>${escapeHtml(project.title)}</h3>
                <p>${escapeHtml(project.summary)}</p>
                <div class="project-tags">
                    ${(project.displayTags || [project.categoryLabel]).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
            </article>
        `).join('');

        const cards = projectsGrid.querySelectorAll('.project-card');
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project-id');
                const project = projects.find((item) => item.id === projectId);
                if (project) {
                    openModal(project);
                }
            });
        });
    }

    function switchModalTab(tabName) {
        modalTabs.forEach((tab) => {
            tab.classList.toggle('active', tab.getAttribute('data-modal-tab') === tabName);
        });

        Object.keys(modalPanels).forEach((key) => {
            modalPanels[key].classList.toggle('active', key === tabName);
        });
    }

    function renderMedia(mediaItems) {
        if (!mediaItems || mediaItems.length === 0) {
            return '<p>Nenhuma midia cadastrada para este projeto.</p>';
        }

        return `
            <div class="media-grid">
                ${mediaItems.map((item) => `
                    <article class="media-item">
                        <div class="media-preview">
                            ${item.src
                ? item.type === 'video'
                    ? `<video class="media-asset" controls preload="metadata">
                                        <source src="${escapeHtml(encodeURI(item.src))}" type="video/mp4">
                                        Seu navegador nao suporta video HTML5.
                                      </video>`
                    : `<img class="media-asset js-expandable-media" src="${escapeHtml(encodeURI(item.src))}" data-media-src="${escapeHtml(encodeURI(item.src))}" data-media-label="${escapeHtml(item.label || 'Midia do projeto')}" alt="${escapeHtml(item.label || 'Midia do projeto')}" loading="lazy">`
                : item.type === 'video' ? 'VIDEO' : 'IMAGEM'}
                        </div>
                        <p>${escapeHtml(item.label)}</p>
                    </article>
                `).join('')}
            </div>
        `;
    }

    async function openModal(project) {
        currentModalProjectId = project.id;
        modalTitle.textContent = project.title;
        modalCategory.textContent = (project.displayTags || [project.categoryLabel]).join(' | ');

        modalPanels.docs.innerHTML = '<p>Carregando documentacao...</p>';
        modalPanels.media.innerHTML = renderMedia(project.media);
        attachMediaZoomHandlers();
        modalPanels.repo.innerHTML = renderRepository(project);

        switchModalTab('docs');
        modal.hidden = false;
        document.body.style.overflow = 'hidden';

        const docsHtml = await renderDocumentation(project);
        if (currentModalProjectId === project.id) {
            modalPanels.docs.innerHTML = docsHtml;
        }
    }

    function closeModal() {
        currentModalProjectId = null;
        modal.hidden = true;
        closeMediaLightbox();
        document.body.style.overflow = '';
    }

    function waitForTransition(element, durationMs = screenTransitionMs) {
        return new Promise((resolve) => {
            let resolved = false;

            const finish = () => {
                if (resolved) {
                    return;
                }

                resolved = true;
                element.removeEventListener('transitionend', handleTransitionEnd);
                resolve();
            };

            const handleTransitionEnd = (event) => {
                if (event.target === element) {
                    finish();
                }
            };

            element.addEventListener('transitionend', handleTransitionEnd);
            window.setTimeout(finish, durationMs + 120);
        });
    }

    function setActiveNav(targetId) {
        navTabs.forEach((tab) => {
            tab.classList.toggle('active', tab.getAttribute('data-scroll-target') === targetId);
        });
    }

    function scrollToSection(targetId) {
        const targetElement = targetId === 'projetos' ? projectsSection : aboutSection;
        if (!targetElement) {
            return;
        }

        setActiveNav(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    async function executeLoginAnimation() {
        if (isScreenTransitionRunning) return;
        isScreenTransitionRunning = true;

        const gatePanelContent = document.getElementById('gatePanelContent');
        const loginTerminal = document.getElementById('loginTerminal');
        const termUser = document.getElementById('termUser');
        const termPass = document.getElementById('termPass');
        const termStatus = document.getElementById('termStatus');

        // Hide regular panel, show terminal
        gatePanelContent.hidden = true;
        loginTerminal.hidden = false;
        termUser.textContent = '';
        termPass.textContent = '';
        termStatus.textContent = '';

        // Type username
        const username = 'Visitante';
        for (let i = 0; i < username.length; i++) {
            termUser.textContent += username[i];
            await new Promise(r => setTimeout(r, 60 + Math.random() * 40));
        }

        await new Promise(r => setTimeout(r, 300));

        // Type password
        const passwordLength = 8;
        for (let i = 0; i < passwordLength; i++) {
            termPass.textContent += '*';
            await new Promise(r => setTimeout(r, 40 + Math.random() * 50));
        }

        await new Promise(r => setTimeout(r, 400));
        termStatus.textContent = 'AUTHENTICATING...';

        await new Promise(r => setTimeout(r, 800));
        termStatus.textContent = 'ACCESS GRANTED.';
        termStatus.style.color = 'var(--line)'; // Highlight color

        await new Promise(r => setTimeout(r, 500));

        // Allow entering the app 
        isScreenTransitionRunning = false;
        await enterApp();

        // Reset terminal state AFTER transition, while the gate is hidden
        gatePanelContent.hidden = false;
        loginTerminal.hidden = true;
        termStatus.style.color = '';
    }

    async function enterApp() {
        if (isScreenTransitionRunning || !gate || !app) {
            return;
        }

        isScreenTransitionRunning = true;
        gate.hidden = false;

        app.hidden = false;
        app.classList.add('is-pre-enter');
        void app.offsetWidth;

        setActiveNav('sobre');

        app.classList.remove('is-pre-enter');
        gate.classList.add('is-exiting');

        await Promise.all([
            waitForTransition(gate),
            waitForTransition(app)
        ]);

        gate.hidden = true;
        gate.classList.remove('is-exiting');
        setActiveNav('sobre');
        window.scrollTo({ top: 0, behavior: 'auto' });
        isScreenTransitionRunning = false;
    }

    async function showGate() {
        if (isScreenTransitionRunning || !gate || !app) {
            return;
        }

        isScreenTransitionRunning = true;

        gate.hidden = false;
        gate.classList.add('is-pre-enter');
        void gate.offsetWidth;
        gate.classList.remove('is-pre-enter');

        app.classList.add('is-exiting');

        await Promise.all([
            waitForTransition(gate),
            waitForTransition(app)
        ]);

        app.hidden = true;
        app.classList.remove('is-exiting');
        window.scrollTo({ top: 0, behavior: 'auto' });
        isScreenTransitionRunning = false;
    }

    enterPortfolio.addEventListener('click', () => {
        executeLoginAnimation();
    });
    backToGate.addEventListener('click', showGate);

    navTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-scroll-target');
            if (targetId === 'projetos' || targetId === 'sobre') {
                scrollToSection(targetId);
            }
        });
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        const visibleSections = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length === 0) {
            return;
        }

        const visibleId = visibleSections[0].target.id;
        if (visibleId === 'sobre' || visibleId === 'projetos') {
            setActiveNav(visibleId);
        }
    }, {
        threshold: [0.25, 0.45, 0.65],
        rootMargin: '-20% 0px -55% 0px'
    });

    if (aboutSection) {
        sectionObserver.observe(aboutSection);
    }

    if (projectsSection) {
        sectionObserver.observe(projectsSection);
    }

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((button) => button.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter') || 'all';
            renderProjects(filter);
        });
    });

    modalTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-modal-tab');
            if (tabName) {
                switchModalTab(tabName);
            }
        });
    });

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.dataset.closeModal === 'true') {
            closeModal();
        }
    });

    closeMediaLightboxBtn.addEventListener('click', closeMediaLightbox);

    mediaLightbox.addEventListener('click', (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.dataset.closeMediaLightbox === 'true') {
            closeMediaLightbox();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !mediaLightbox.hidden) {
            closeMediaLightbox();
            return;
        }

        if (event.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
        if (event.key === 'Enter' && !gate.hidden) {
            executeLoginAnimation();
        }
    });

    renderProjects();

    // Teia tecnologica em canvas com conexoes dinamicas
    const canvas = document.getElementById('cyberNetwork');
    const ctx = canvas.getContext('2d');

    let width;
    let height;
    const particles = [];
    const baseParticleCount = 250;
    const baseViewportArea = 1920 * 1080;
    const minParticleCount = 40;
    const maxParticleCount = 420;
    const connectionDistance = 100;
    const mouseConnectionDistance = 180;
    const mouse = { x: null, y: null };

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.2;
            this.vy = (Math.random() - 0.5) * 1.2;
            this.size = Math.random() * 1.8 + 0.6;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = '#ff2248';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function getResponsiveParticleCount() {
        const currentViewportArea = width * height;
        const scaledCount = Math.round(baseParticleCount * (currentViewportArea / baseViewportArea));
        return Math.max(minParticleCount, Math.min(maxParticleCount, scaledCount));
    }

    function initCanvas() {
        resizeCanvas();
        const particleCount = getResponsiveParticleCount();
        particles.length = 0;
        for (let i = 0; i < particleCount; i += 1) {
            particles.push(new Particle());
        }
    }

    function connectParticles(x1, y1, x2, y2, distance, maxDistance, color) {
        if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `${color}${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i += 1) {
            const particle = particles[i];
            particle.update();
            particle.draw();

            if (mouse.x !== null && mouse.y !== null) {
                const dxMouse = mouse.x - particle.x;
                const dyMouse = mouse.y - particle.y;
                const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                connectParticles(
                    particle.x,
                    particle.y,
                    mouse.x,
                    mouse.y,
                    distanceMouse,
                    mouseConnectionDistance,
                    'rgba(255, 45, 81, '
                );
            }

            for (let j = i + 1; j < particles.length; j += 1) {
                const other = particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                connectParticles(
                    particle.x,
                    particle.y,
                    other.x,
                    other.y,
                    distance,
                    connectionDistance,
                    'rgba(130, 18, 38, '
                );
            }
        }

        requestAnimationFrame(animateCanvas);
    }

    canvas.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    canvas.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        initCanvas();
    });

    initCanvas();
    animateCanvas();
});


