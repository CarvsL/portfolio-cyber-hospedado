const fs = require('fs');
let code = fs.readFileSync('js/script.js', 'utf8');

// Replace renderGithubProjectDoc
let startBlock1 = code.indexOf('async function renderGithubProjectDoc(');
let endBlock1 = code.indexOf('function renderInlineMarkdown(');

let newBlock1 = sync function renderGithubProjectDoc(repoPath, preferredPath, repoTreePath = '') {
        const normalized = String(preferredPath || '').trim();
        if (!normalized) {
            return await renderGithubReadme(repoPath);
        }
        return await renderGithubMarkdownFile(repoPath, normalized);
    }

    ;

code = code.substring(0, startBlock1) + newBlock1 + code.substring(endBlock1);

// Replace renderDocumentation
let startBlock2 = code.indexOf('async function renderDocumentation(project) {');
let endBlock2 = code.indexOf('function openMediaLightbox(');

let newBlock2 = sync function renderDocumentation(project) {
        const repoInfo = getGitHubRepoInfo(project.repoUrl);
        if (repoInfo) {
            try {
                return await renderGithubProjectDoc(repoInfo.repoPath, project.githubDocPath, repoInfo.treePath);
            } catch (_error) {
                const safeRepoUrl = sanitizeUrl(project.repoUrl);
                return \
                    <div class="doc-fallback" style="text-align: center; padding: 2rem;">
                        <p style="color: #ff5555; margin-bottom: 1rem;">Acesso excedido na API (Rate Limit).</p>
                        <p style="margin-bottom: 1.5rem;">A documentacao oficial deste projeto esta hospedada no repositorio.</p>
                        <a href="\" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; background-color: var(--primary-purple); color: var(--bg-dark); text-decoration: none; border-radius: 4px; font-weight: bold;">Acessar Documentacao no GitHub</a>
                        <div style="margin-top: 2rem; border-top: 1px solid #333; padding-top: 1.5rem; text-align: left;">
                            \
                        </div>
                    </div>
                \;
            }
        }

        return renderDocsList(project.docs);
    }

    ;

code = code.substring(0, startBlock2) + newBlock2 + code.substring(endBlock2);

fs.writeFileSync('js/script.js', code, 'utf8');
console.log('Fixed block!');
