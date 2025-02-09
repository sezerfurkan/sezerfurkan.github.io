<template>
  <div class="projects">
    <h2>My Projects</h2>
    <div class="category-filters">
      <button 
        v-for="category in categories" 
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectCategory(category)"
      >
        {{ category }}
      </button>
    </div>
    <div class="projects-grid">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id" 
        class="project-card"
      >
        <div class="project-content">
          <img v-if="project.image" :src="project.image" :alt="project.title" class="project-image">
          <span class="project-date">{{ project.date }}</span>
          <div class="project-header">
            <h3>{{ project.title }}</h3>
          </div>
          <p class="project-description">{{ project.description }}</p>
        </div>
        <div class="project-footer">
          <div class="category-tag">{{ project.category }}</div>
          <div class="tech-stack">
            <span v-for="tech in project.technologies" :key="tech">{{ tech }}</span>
          </div>
          <div class="project-links">
            <a :href="project.link" target="_blank" class="demo-link">View Demo</a>
            <a v-if="project.github" :href="project.github" target="_blank" class="github-link">
              <i class="fab fa-github"></i> View Code
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projectCategories, projects } from '@/config/projects'

export default {
  name: 'ProjectsView',
  data() {
    return {
      selectedCategory: 'All',
      categories: projectCategories,
      projects: projects
    }
  },
  computed: {
    filteredProjects() {
      if (this.selectedCategory === 'All') {
        return this.projects;
      }
      return this.projects.filter(project => project.category === this.selectedCategory);
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    }
  }
}
</script>

<style scoped>
.projects {
  padding: 2rem;
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;  /* Increased from 2rem to 3rem */
  padding: 2rem;
  row-gap: 4rem;  /* Add specific row gap that's larger than column gap */
}
.project-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;
  background: white;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border-color: #42b983;
}

.project-content {
  flex-grow: 1;
  position: relative;
  padding-bottom: 1rem;  /* Reduced from 2rem */
}

.project-description {
  margin: 1rem 0;
  min-height: 3em;
  overflow-y: auto;
  max-height: 150px;
  margin-bottom: 1rem;  /* Reduced from 2rem */
}

.project-footer {
  margin-top: 0.5rem;  /* Reduced from auto */
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.category-filters {
  margin: 2rem 0;
  text-align: center;
}

.category-filters button {
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border: 2px solid #42b983;
  background: transparent;
  color: #42b983;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.category-filters button.active {
  background: #42b983;
  color: white;
}

.category-tag {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: #42b983;
  color: white;
  border-radius: 15px;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.tech-stack {
  margin: 1rem 0;
}

.tech-stack span {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: #f5f5f5;
  border-radius: 12px;
  margin: 0.2rem;
  font-size: 0.8rem;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.project-links a {
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.demo-link {
  background-color: #42b983;
  color: white;
}

.github-link {
  background-color: #24292e;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.github-link:hover, .demo-link:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.fa-github {
  font-size: 1.1rem;
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: fill;
  object-position: center;
  border-radius: 4px;
  display: block;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  border: 4px solid #42b983;  /* Add this line for the border */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);  /* Add this line for subtle shadow */
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-date {
  display: block;
  font-size: 0.9rem;
  color: #666;
  background-color: #f5f5f5;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  margin: 0.5rem 0;
  width: fit-content;
}
</style>
