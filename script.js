// Dados do mapa - oportunidades de emprego
const jobOpportunities = [
    {
        id: 1,
        title: "Desenvolvedor Full Stack",
        company: "Tech Solutions SA",
        location: [-23.5505, -46.6333],
        sector: "tecnologia",
        type: "clt",
        salary: "R$ 8.000",
        description: "Vaga para desenvolvedor com experiência em React e Node.js",
        contact: "rh@techsolutions.com"
    },
    {
        id: 2,
        title: "Enfermeiro Plantonista",
        company: "Hospital Vida",
        location: [-23.5510, -46.6340],
        sector: "saude",
        type: "clt",
        salary: "R$ 5.200",
        description: "Plantões 12x36, experiência em emergência",
        contact: "selecao@hospitalvida.com"
    },
    {
        id: 3,
        title: "Professor de Matemática",
        company: "Colégio Excelência",
        location: [-23.5490, -46.6320],
        sector: "educacao",
        type: "clt",
        salary: "R$ 4.500",
        description: "Ensino médio, 40h semanais",
        contact: "direcao@colegioexcelencia.com"
    },
    {
        id: 4,
        title: "Operador de Máquinas",
        company: "Indústria Forte",
        location: [-23.5520, -46.6350],
        sector: "industria",
        type: "clt",
        salary: "R$ 3.200",
        description: "Experiência com CNC, turnos rotativos",
        contact: "rh@industriaforte.com"
    },
    {
        id: 5,
        title: "Vendedor Experiente",
        company: "Mega Store",
        location: [-23.5480, -46.6310],
        sector: "comercio",
        type: "clt",
        salary: "R$ 2.800 + comissão",
        description: "Atendimento ao cliente e vendas",
        contact: "vagas@megastore.com"
    },
    {
        id: 6,
        title: "Estágio em TI",
        company: "Startup Inovação",
        location: [-23.5530, -46.6360],
        sector: "tecnologia",
        type: "estagio",
        salary: "R$ 1.800",
        description: "Estágio para estudantes de computação",
        contact: "estagio@startupinovacao.com"
    }
];

// Inicialização do mapa
let map;
let markers = [];

function initMap() {
    // Centralizar no Brasil
    map = L.map('map').setView([-23.5505, -46.6333], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Adicionar marcadores
    addMarkersToMap();
}

function addMarkersToMap() {
    // Limpar marcadores existentes
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Obter filtros
    const setorFiltro = document.getElementById('setorFiltro').value;
    const tipoFiltro = document.getElementById('tipoFiltro').value;

    // Adicionar novos marcadores
    jobOpportunities.forEach(job => {
        if ((setorFiltro === 'todos' || job.sector === setorFiltro) &&
            (tipoFiltro === 'todos' || job.type === tipoFiltro)) {
            
            const marker = L.marker(job.location).addTo(map);
            
            // Popup com informações da vaga
            marker.bindPopup(`
                <div class="popup-content">
                    <h3>${job.title}</h3>
                    <p><strong>Empresa:</strong> ${job.company}</p>
                    <p><strong>Setor:</strong> ${getSectorName(job.sector)}</p>
                    <p><strong>Tipo:</strong> ${getTypeName(job.type)}</p>
                    <p><strong>Salário:</strong> ${job.salary}</p>
                    <p><strong>Descrição:</strong> ${job.description}</p>
                    <p><strong>Contato:</strong> ${job.contact}</p>
                    <button class="btn btn-primary" onclick="applyForJob(${job.id})">Candidatar-se</button>
                </div>
            `);

            // Estilizar marcador baseado no setor
            const sectorColors = {
                tecnologia: '#FF6B6B',
                saude: '#4ECDC4',
                educacao: '#45B7D1',
                industria: '#96CEB4',
                comercio: '#FFEAA7'
            };

            marker.setIcon(
                L.divIcon({
                    className: 'custom-marker',
                    html: `<div style="background-color: ${sectorColors[job.sector]}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
                    iconSize: [24, 24]
                })
            );

            markers.push(marker);
        }
    });
}

function getSectorName(sector) {
    const sectors = {
        tecnologia: 'Tecnologia',
        saude: 'Saúde',
        educacao: 'Educação',
        industria: 'Indústria',
        comercio: 'Comércio'
    };
    return sectors[sector] || sector;
}

function getTypeName(type) {
    const types = {
        estagio: 'Estágio',
        clt: 'CLT',
        pj: 'PJ',
        freelancer: 'Freelancer'
    };
    return types[type] || type;
}

function applyForJob(jobId) {
    const job = jobOpportunities.find(j => j.id === jobId);
    if (job) {
        alert(`Candidatura para: ${job.title}\nEntre em contato: ${job.contact}`);
    }
}

// Modal de Login
const loginModal = document.getElementById('loginModal');
const btnPesquisadores = document.getElementById('btnPesquisadores');
const closeModal = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');

btnPesquisadores.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulação de login
    if (email && password) {
        alert('Login realizado com sucesso! Redirecionando para área restrita...');
        loginModal.style.display = 'none';
        loginForm.reset();
    }
});

// Ferramentas de pesquisa
document.querySelectorAll('[data-tool]').forEach(button => {
    button.addEventListener('click', (e) => {
        const tool = e.target.getAttribute('data-tool');
        loginModal.style.display = 'block';
    });
});

// Filtros do mapa
document.getElementById('setorFiltro').addEventListener('change', addMarkersToMap);
document.getElementById('tipoFiltro').addEventListener('change', addMarkersToMap);

// Animação de números nas estatísticas
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target.toFixed(1) + (target > 10 ? '%' : '%');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '%';
            }
        }, 16);
    });
}

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Formulário de contato
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    e.target.reset();
});

// Observador de interseção para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animar números quando a seção de estatísticas for visível
            if (entry.target.id === 'estatisticas') {
                animateNumbers();
            }
        }
    });
}, observerOptions);

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar mapa
    initMap();
    
    // Observar seções para animações
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Botão do mapa no hero
    document.getElementById('btnMapa').addEventListener('click', () => {
        document.getElementById('mapa').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efeito de digitação no título do hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Iniciar efeito de digitação quando a página carregar
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h2');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 80);
});