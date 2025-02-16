document.addEventListener('DOMContentLoaded', () => {
    let contentData = null;
    let projectsData = null;

    // Fetch both content and projects data
    Promise.all([
        fetch('./data/content.json').then(response => response.json()),
        fetch('data/projects.json').then(response => response.json())
    ])
    .then(([content, projects]) => {
        contentData = content;
        projectsData = projects;
        initializeContent();
        initializeProjects();
    })
    .catch(error => console.error('Error loading data:', error));

    function initializeContent() {
        // Update page title
        document.title = contentData.title;

        // Update navigation
        const nav = document.querySelector('.terminal-nav');
        nav.innerHTML = Object.entries(contentData.navigation)
            .map(([key, value]) => `
                <button class="nav-btn ${key === 'about' ? 'active' : ''}" 
                        data-section="${key}">
                    ${value}
                </button>
            `).join('');

        // Update about section
        const aboutSection = document.getElementById('about');
        aboutSection.innerHTML = `
            <h1>${contentData.about.greeting}</h1>
            <p class="typing-text"></p>
            <div class="about-content">
                <p>${contentData.about.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
            </div>
        `;

        // Update skills section
        const skillsSection = document.getElementById('skills');
        skillsSection.innerHTML = `
            <h2>${contentData.skills.title}</h2>
            <div class="skills-grid">
                ${contentData.skills.categories.map(category => `
                    <div class="skill-category">
                        <h3>${category.title}</h3>
                        <div class="skill-items">
                            ${category.items.map(item => `
                                <span class="skill-item">${item}</span>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Update contact section
        const contactSection = document.getElementById('contact');
        contactSection.innerHTML = `
            <h2>${contentData.contact.title}</h2>
            <div class="contact-links">
                ${contentData.contact.links.map(link => `
                    <a href="${link.url}" target="_blank">
                        <i class="${link.icon}"></i> ${link.text}
                    </a>
                `).join('')}
            </div>
        `;

        // Update projects section
        const projectsSection = document.getElementById('projects');
        projectsSection.innerHTML = `
            <h2>${contentData.navigation.projects}</h2>
            <div class="project-filters">
                <!-- Category buttons will be dynamically added here -->
            </div>
            <div class="project-grid">
                <!-- Project cards will be dynamically added here -->
            </div>
        `;

        // Initialize typing effect with content from JSON
        initializeTypingEffect(contentData.about.title);
    }

    function initializeTypingEffect(text) {
        const typingText = document.querySelector('.typing-text');
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        typeWriter();
    }

    // Add navigation functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-btn')) {
            const buttons = document.querySelectorAll('.nav-btn');
            const sections = document.querySelectorAll('.terminal-section');
            
            buttons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            e.target.classList.add('active');
            const sectionId = e.target.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        }
    });

    // Projects functionality
    let currentCategory = 'All';

    function initializeProjects() {
        const projectsSection = document.getElementById('projects');
        const filterContainer = projectsSection.querySelector('.project-filters');
        const projectGrid = projectsSection.querySelector('.project-grid');
        
        if (!filterContainer || !projectGrid) {
            console.error('Required project elements not found');
            return;
        }

        createCategoryFilters();
        displayProjects();
    }

    function createCategoryFilters() {
        const filterContainer = document.querySelector('.project-filters');
        filterContainer.innerHTML = projectsData.categories.map(category => `
            <button class="filter-btn ${category === 'All' ? 'active' : ''}" 
                    data-category="${category}">
                ${category}
            </button>
        `).join('');

        // Add event listeners to filter buttons
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(btn => 
                    btn.classList.remove('active'));
                button.classList.add('active');
                currentCategory = button.getAttribute('data-category');
                displayProjects();
            });
        });
    }

    function displayProjects() {
        const projectGrid = document.querySelector('.project-grid');
        const filteredProjects = projectsData.projects.filter(project => 
            currentCategory === 'All' || project.category === currentCategory
        );

        projectGrid.innerHTML = filteredProjects.map(project => `
            <div class="project-card">
                <div class="project-header">
                    <div class="project-meta">
                        <span class="project-category">
                            <i class="fas fa-folder"></i> ${project.category}
                        </span>
                        <span class="project-date">
                            <i class="far fa-calendar-alt"></i> ${project.date}
                        </span>
                    </div>
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `
                            <span class="tag">${tag}</span>
                        `).join('')}
                    </div>
                    <div class="project-links">
                        <a href="#" class="project-link project-details" data-project-id="${project.id}">
                            <i class="fas fa-info-circle"></i> Details
                        </a>
                        ${project.demo ? `
                            <a href="${project.demo.url}" 
                               target="_blank" 
                               class="project-link demo-game"
                               onclick="return openWebGLDemo(event, this.href)">
                                <i class="fas fa-gamepad"></i> Play Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners for project details buttons
        document.querySelectorAll('.project-details').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = button.getAttribute('data-project-id');
                showProjectDetails(projectId);
            });
        });
    }

    function showProjectDetails(projectId) {
        const project = projectsData.projects.find(p => p.id === parseInt(projectId));
        if (!project) return;

        // Create modal with loading state
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${project.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-loading">
                        <i class="fas fa-spinner fa-spin"></i> Loading project details...
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.appendChild(modal);

        // Get repository name from GitHub URL
        const repoPath = new URL(project.github).pathname.substring(1);

        // Fetch README content from GitHub API
        fetch(`https://api.github.com/repos/${repoPath}/readme`, {
            headers: {
                'Accept': 'application/vnd.github.v3.html'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Content not found');
            }
            return response.text();
        })
        .then(readmeHtml => {
            // Update modal content with README
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="readme-content">
                    ${readmeHtml}
                </div>
            `;
        })
        .catch(error => {
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 2rem;">
                    <i class="fas fa-tools" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>Project details are coming soon!</p>
                    <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem;">
                        This section is currently under construction.
                    </p>
                </div>
            `;
        });

        // Add close functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Add this function to handle WebGL demos
    function openWebGLDemo(event, url) {
        event.preventDefault();
        const width = 1280;
        const height = 720;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;
        
        window.open(url, 'WebGL Demo', 
            `width=${width},height=${height},left=${left},top=${top},` +
            'menubar=no,toolbar=no,location=no,status=no'
        );
        return false;
    }
}); 