// Protótipo Visual - IA na Personalização do Ensino Corporativo

const app = document.getElementById('app');

// Toast de sucesso
function showToast(msg) {
    let toast = document.createElement('div');
    toast.className = 'toast-success';
    toast.innerHTML = `<i class='fa fa-check-circle'></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = 0; }, 1800);
    setTimeout(() => { toast.remove(); }, 2300);
}

// Estado simples para navegação
let state = {
    userType: null, // 'funcionario' ou 'gestor'
    nome: '',
    progresso: 60, // Exemplo de progresso
    area: 'Tecnologia da Informação',
    historico: [
        { nome: 'Introdução à IA', status: 'Concluído' },
        { nome: 'Segurança da Informação', status: 'Em andamento' }
    ],
    preferencia: 'Vídeo aulas',
    notificacoes: true
};

function renderLogin() {
    app.innerHTML = `
        <h1>Bem-vindo!</h1>
        <p>Faça login para acessar o sistema de aprendizagem personalizada.</p>
        <form onsubmit="return false;">
            <input type="text" id="nome" placeholder="Seu nome" required />
            <select id="tipo">
                <option value="funcionario">Funcionário</option>
                <option value="gestor">Gestor</option>
            </select>
            <input type="submit" value="Entrar" onclick="login()" />
        </form>
    `;
}

window.login = function() {
    const nome = document.getElementById('nome').value.trim();
    const tipo = document.getElementById('tipo').value;
    if (!nome) return;
    state.nome = nome;
    state.userType = tipo;
    if (tipo === 'funcionario') renderDashboardFuncionario();
    else renderDashboardGestor();
};

function renderMenu(active) {
    if (state.userType === 'funcionario') {
        return `
        <div class="menu">
            <button class="${active==='dashboard'?'active':''}" onclick="renderDashboardFuncionario()"><i class='fa fa-home'></i> Início</button>
            <button class="${active==='perfil'?'active':''}" onclick="renderPerfil()"><i class='fa fa-user'></i> Perfil</button>
            <button class="${active==='recomendacoes'?'active':''}" onclick="renderRecomendacoes()"><i class='fa fa-lightbulb'></i> Recomendações</button>
            <button class="${active==='feedback'?'active':''}" onclick="renderFeedback()"><i class='fa fa-comment-dots'></i> Feedback</button>
            <button class="${active==='config'?'active':''}" onclick="renderConfig()"><i class='fa fa-cog'></i> Configurações</button>
            <button class="${active==='ajuda'?'active':''}" onclick="renderAjuda()"><i class='fa fa-circle-info'></i> Ajuda</button>
            <button onclick="logout()"><i class='fa fa-sign-out-alt'></i> Sair</button>
        </div>
        `;
    } else {
        return `
        <div class="menu">
            <button class="${active==='dashboard'?'active':''}" onclick="renderDashboardGestor()"><i class='fa fa-home'></i> Painel</button>
            <button class="${active==='relatorios'?'active':''}" onclick="renderRelatorios()"><i class='fa fa-chart-bar'></i> Relatórios</button>
            <button class="${active==='ajuda'?'active':''}" onclick="renderAjuda()"><i class='fa fa-circle-info'></i> Ajuda</button>
            <button onclick="logout()"><i class='fa fa-sign-out-alt'></i> Sair</button>
        </div>
        `;
    }
}

window.logout = function() {
    state = {
        userType: null, nome: '', progresso: 60, area: 'Tecnologia da Informação',
        historico: [
            { nome: 'Introdução à IA', status: 'Concluído' },
            { nome: 'Segurança da Informação', status: 'Em andamento' }
        ],
        preferencia: 'Vídeo aulas', notificacoes: true
    };
    renderLogin();
};

function renderDashboardFuncionario() {
    app.innerHTML = `
        ${renderMenu('dashboard')}
        <div class="avatar"><i class="fa fa-user"></i></div>
        <h2>Olá, ${state.nome}!</h2>
        <div class="card">
            <div class="card-title"><span class="card-icon"><i class="fa fa-chart-line"></i></span> Progresso Geral</div>
            <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
                <div style="text-align:center;">
                    <div class="progress-circle">
                        <svg width="54" height="54">
                            <circle cx="27" cy="27" r="24" stroke="#e0e7eb" stroke-width="6" fill="none"/>
                            <circle cx="27" cy="27" r="24" stroke="#3b2f7f" stroke-width="6" fill="none" stroke-dasharray="150.72" stroke-dashoffset="${150.72 - (150.72 * state.progresso / 100)}" style="transition: stroke-dashoffset 0.7s;"/>
                        </svg>
                        <span class="progress-circle-text">${state.progresso}%</span>
                    </div>
                    <div style="font-size:0.95rem; color:#3b2f7f; margin-top:4px;">Total</div>
                </div>
                <div>
                    <div style="font-size:0.98rem; margin-bottom:6px;"><i class="fa fa-graduation-cap"></i> IA no Trabalho <span class="badge naoiniciado">Novo</span></div>
                    <div class="progress" style="margin-bottom:4px;"><div class="progress-bar" style="width: 30%"></div></div>
                    <span style="font-size:0.92rem; color:#888;">30% concluído</span>
                </div>
                <div>
                    <div style="font-size:0.98rem; margin-bottom:6px;"><i class="fa fa-shield-alt"></i> Segurança da Informação <span class="badge andamento">Em andamento</span></div>
                    <div class="progress" style="margin-bottom:4px;"><div class="progress-bar" style="width: 60%"></div></div>
                    <span style="font-size:0.92rem; color:#888;">60% concluído</span>
                </div>
                <div>
                    <div style="font-size:0.98rem; margin-bottom:6px;"><i class="fa fa-lightbulb"></i> Inovação e Tecnologia <span class="badge naoiniciado">Novo</span></div>
                    <div class="progress" style="margin-bottom:4px;"><div class="progress-bar" style="width: 0%"></div></div>
                    <span style="font-size:0.92rem; color:#888;">Não iniciado</span>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-title"><span class="card-icon"><i class="fa fa-calendar-alt"></i></span> Próximos Treinamentos</div>
            <ul>
                <li><i class="fa fa-calendar-check"></i> Workshop: Soft Skills (18/07/2025) <span class="badge naoiniciado">Inscrições abertas</span></li>
                <li><i class="fa fa-calendar-check"></i> Palestra: LGPD na Prática (25/07/2025) <span class="badge naoiniciado">Novo</span></li>
            </ul>
        </div>
        <div class="card">
            <div class="card-title"><span class="card-icon"><i class="fa fa-trophy"></i></span> Conquistas Recentes</div>
            <ul>
                <li><i class="fa fa-medal" style="color:#22c55e"></i> Certificado: Introdução à IA <span class="badge concluido">Concluído</span></li>
                <li><i class="fa fa-medal" style="color:#facc15"></i> 30 dias de acesso contínuo <span class="badge andamento">Em andamento</span></li>
            </ul>
        </div>
        <div class="card">
            <div class="card-title"><span class="card-icon"><i class="fa fa-clipboard-list"></i></span> Resumo de Atividades</div>
            <ul>
                <li><i class="fa fa-check-circle"></i> 2 cursos concluídos este mês</li>
                <li><i class="fa fa-clock"></i> 12h de estudo em julho</li>
                <li><i class="fa fa-comments"></i> 3 feedbacks enviados</li>
            </ul>
        </div>
        <div class="card">
            <div class="card-title"><span class="card-icon"><i class="fa fa-lightbulb"></i></span> Recomendações de IA</div>
            <ul>
                <li><a href="#" onclick="renderDetalhesCurso('Inteligência Artificial no Trabalho')"><i class='fa fa-graduation-cap'></i> Curso: Inteligência Artificial no Trabalho <span class='badge naoiniciado'>Novo</span></a></li>
                <li><a href="#" onclick="renderDetalhesCurso('Segurança da Informação')"><i class='fa fa-shield-alt'></i> Treinamento: Segurança da Informação <span class='badge andamento'>Em andamento</span></a></li>
                <li><a href="#" onclick="renderDetalhesCurso('Inovação e Tecnologia')"><i class='fa fa-lightbulb'></i> Workshop: Inovação e Tecnologia <span class='badge naoiniciado'>Novo</span></a></li>
            </ul>
            <button onclick="renderRecomendacoes()"><i class='fa fa-list'></i> Ver todas recomendações</button>
        </div>
    `;
}
window.renderDashboardFuncionario = renderDashboardFuncionario;

function renderPerfil() {
    app.innerHTML = `
        ${renderMenu('perfil')}
        <div class="avatar"><i class="fa fa-user"></i></div>
        <h2>Perfil do Funcionário</h2>
        <div class="card">
            <div class="card-title"><span class="card-icon"><i class="fa fa-id-badge"></i></span> Dados Pessoais</div>
            <strong>Nome:</strong> ${state.nome}<br>
            <strong>Área de Atuação:</strong> ${state.area}<br>
            <strong>Preferência de Aprendizagem:</strong> ${state.preferencia}<br>
            <strong>Notificações:</strong> ${state.notificacoes ? 'Ativadas' : 'Desativadas'}
        </div>
        <div class="card">
            <div class="card-title"><span class="card-icon"><i class="fa fa-history"></i></span> Histórico de Treinamentos</div>
            <ul>
                ${state.historico.map(h => `<li><i class='fa fa-${h.status==='Concluído'?'check-circle':'spinner'}'></i> ${h.nome} <span class='badge ${h.status==='Concluído'?'concluido':'andamento'}'>${h.status}</span></li>`).join('')}
            </ul>
        </div>
        <button onclick="renderDashboardFuncionario()"><i class='fa fa-arrow-left'></i> Voltar</button>
    `;
}
window.renderPerfil = renderPerfil;

function renderDetalhesCurso(nome) {
    let detalhes = {
        'Inteligência Artificial no Trabalho': {
            desc: 'Curso introdutório sobre IA aplicada ao ambiente corporativo.',
            carga: '8h',
            publico: 'Todos os colaboradores',
            status: 'Não iniciado'
        },
        'Segurança da Informação': {
            desc: 'Treinamento sobre práticas de segurança digital.',
            carga: '6h',
            publico: 'Todos os colaboradores',
            status: 'Em andamento'
        },
        'Inovação e Tecnologia': {
            desc: 'Workshop para estimular a criatividade e inovação.',
            carga: '4h',
            publico: 'Interessados em inovação',
            status: 'Não iniciado'
        }
    };
    let c = detalhes[nome] || {desc:'', carga:'', publico:'', status:''};
    let badge = c.status === 'Concluído' ? 'concluido' : (c.status === 'Em andamento' ? 'andamento' : 'naoiniciado');
    app.innerHTML = `
        ${renderMenu('recomendacoes')}
        <h2>${nome}</h2>
        <div class="card">
            <strong>Descrição:</strong> ${c.desc}<br>
            <strong>Carga horária:</strong> ${c.carga}<br>
            <strong>Público-alvo:</strong> ${c.publico}<br>
            <strong>Status:</strong> <span class='badge ${badge}'>${c.status}</span>
        </div>
        <button onclick="renderRecomendacoes()"><i class='fa fa-arrow-left'></i> Voltar</button>
    `;
}
window.renderDetalhesCurso = renderDetalhesCurso;

function renderRecomendacoes() {
    app.innerHTML = `
        ${renderMenu('recomendacoes')}
        <h2>Recomendações Personalizadas</h2>
        <div class="card">
            <strong>Baseado no seu perfil e progresso, sugerimos:</strong>
            <ul>
                <li><a href="#" onclick="renderDetalhesCurso('Inteligência Artificial no Trabalho')"><b>Curso:</b> <i class='fa fa-graduation-cap'></i> Inteligência Artificial no Trabalho</a> <br><small>Ideal para sua área de atuação</small></li>
                <li><a href="#" onclick="renderDetalhesCurso('Segurança da Informação')"><b>Treinamento:</b> <i class='fa fa-shield-alt'></i> Segurança da Informação</a> <br><small>Recomendado para todos os colaboradores</small></li>
                <li><a href="#" onclick="renderDetalhesCurso('Inovação e Tecnologia')"><b>Workshop:</b> <i class='fa fa-lightbulb'></i> Inovação e Tecnologia</a> <br><small>Para quem busca crescimento profissional</small></li>
            </ul>
        </div>
        <button onclick="renderDashboardFuncionario()"><i class='fa fa-arrow-left'></i> Voltar</button>
    `;
}
window.renderRecomendacoes = renderRecomendacoes;

function renderFeedback() {
    app.innerHTML = `
        ${renderMenu('feedback')}
        <h2>Feedback do Treinamento</h2>
        <form onsubmit="return false;">
            <label>Como você avalia o conteúdo?</label>
            <select id="avaliacao">
                <option value="excelente">Excelente</option>
                <option value="bom">Bom</option>
                <option value="regular">Regular</option>
                <option value="ruim">Ruim</option>
            </select>
            <label>Comentários ou sugestões:</label>
            <textarea id="comentario" rows="3" placeholder="Digite aqui..."></textarea>
            <input type="submit" value="Enviar" onclick="enviarFeedback()" />
        </form>
        <button onclick="renderDashboardFuncionario()"><i class='fa fa-arrow-left'></i> Voltar</button>
    `;
}
window.renderFeedback = renderFeedback;

window.enviarFeedback = function() {
    showToast('Feedback enviado com sucesso!');
    renderDashboardFuncionario();
};

function renderConfig() {
    app.innerHTML = `
        ${renderMenu('config')}
        <h2>Configurações</h2>
        <form onsubmit="return false;">
            <label>Preferência de aprendizagem:</label>
            <select id="pref">
                <option value="Vídeo aulas" ${state.preferencia==='Vídeo aulas'?'selected':''}>Vídeo aulas</option>
                <option value="Textos e artigos" ${state.preferencia==='Textos e artigos'?'selected':''}>Textos e artigos</option>
                <option value="Exercícios práticos" ${state.preferencia==='Exercícios práticos'?'selected':''}>Exercícios práticos</option>
            </select>
            <label><input type="checkbox" id="notif" ${state.notificacoes?'checked':''}/> Receber notificações</label>
            <input type="submit" value="Salvar" onclick="salvarConfig()" />
        </form>
        <button onclick="renderDashboardFuncionario()"><i class='fa fa-arrow-left'></i> Voltar</button>
    `;
}
window.renderConfig = renderConfig;

window.salvarConfig = function() {
    state.preferencia = document.getElementById('pref').value;
    state.notificacoes = document.getElementById('notif').checked;
    showToast('Configurações salvas!');
    renderConfig();
};

function renderAjuda() {
    app.innerHTML = `
        ${renderMenu('ajuda')}
        <h2>Ajuda & Sobre</h2>
        <div class="card">
            <strong>Sobre o sistema:</strong><br>
            Este protótipo simula um sistema de personalização do ensino corporativo com uso de Inteligência Artificial.<br><br>
            <strong>Objetivo:</strong><br>
            Oferecer recomendações de cursos e treinamentos adaptados ao perfil de cada colaborador, promovendo aprendizagem eficiente e inovadora.<br><br>
            <strong>Contato:</strong><br>
            suporte@empresa.com.br
        </div>
        <button onclick="${state.userType==='funcionario' ? 'renderDashboardFuncionario()' : 'renderDashboardGestor()'}"><i class='fa fa-arrow-left'></i> Voltar</button>
    `;
}
window.renderAjuda = renderAjuda;

function renderDashboardGestor() {
    app.innerHTML = `
        ${renderMenu('dashboard')}
        <h2>Painel do Gestor</h2>
        <div class="card">
            <strong>Visão geral dos colaboradores:</strong>
            <ul>
                <li><i class='fa fa-user'></i> Colaborador A - 80% concluído</li>
                <li><i class='fa fa-user'></i> Colaborador B - 60% concluído</li>
                <li><i class='fa fa-user'></i> Colaborador C - 40% concluído</li>
            </ul>
        </div>
        <div class="card">
            <strong>Recomendações de IA:</strong>
            <ul>
                <li><i class='fa fa-lightbulb'></i> Incentivar participação em cursos de IA</li>
                <li><i class='fa fa-shield-alt'></i> Promover treinamentos de segurança</li>
            </ul>
        </div>
    `;
}
window.renderDashboardGestor = renderDashboardGestor;

function renderRelatorios() {
    app.innerHTML = `
        ${renderMenu('relatorios')}
        <h2>Relatórios de Desempenho</h2>
        <div class="card">
            <strong>Resumo:</strong>
            <ul>
                <li>Média de conclusão dos cursos: 60%</li>
                <li>Colaboradores engajados: 75%</li>
                <li>Sugestão: Personalizar ainda mais os conteúdos</li>
            </ul>
        </div>
        <button onclick="renderDashboardGestor()"><i class='fa fa-arrow-left'></i> Voltar</button>
    `;
}
window.renderRelatorios = renderRelatorios;

// Toast CSS
const style = document.createElement('style');
style.innerHTML = `.toast-success { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); background: linear-gradient(90deg,#22c55e,#16a34a); color: #fff; padding: 14px 32px; border-radius: 24px; font-size: 1.1rem; font-weight: 600; z-index: 9999; box-shadow: 0 4px 24px #16a34a33; opacity: 1; transition: opacity 0.5s; display: flex; align-items: center; gap: 10px; }`;
document.head.appendChild(style);

// Inicialização
renderLogin(); 