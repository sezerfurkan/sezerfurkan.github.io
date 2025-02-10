<template>
  <div class="home">
    <section class="hero">
      <h1>Sezer Furkan</h1>
      <p class="subtitle">Software Developer & Image Processing Engineer</p>
      <div class="social-links">
        <a href="https://github.com/sezerfurkan" target="_blank" rel="noopener">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener">
          <i class="fab fa-linkedin"></i>
        </a>
      </div>
    </section>

    <section class="intro">
      <h2>About Me</h2>
      <p>I'm a passionate software developer specializing in image processing and game development. 
         With expertise in Python and computer vision, I create innovative solutions for complex problems.</p>
    </section>

    <section class="featured-skills">
      <h2>Core Skills</h2>
      <div class="skills-grid">
        <div class="skill-card">
          <i class="fas fa-laptop-code"></i>
          <h3>Software Development</h3>
          <p>Python, JavaScript, C#</p>
        </div>
        <div class="skill-card">
          <i class="fas fa-camera"></i>
          <h3>Image Processing</h3>
          <p>OpenCV, Computer Vision</p>
        </div>
        <div class="skill-card">
          <i class="fas fa-gamepad"></i>
          <h3>Game Development</h3>
          <p>Unity, Mobile Games</p>
        </div>
      </div>
    </section>

    <section class="featured-projects">
      <h2>Featured Projects</h2>
      <div class="featured-grid">
        <router-link 
          v-for="project in projects" 
          :key="project.id"
          to="/projects"
          class="featured-card"
        >
          <img :src="project.image" :alt="project.title">
          <div class="card-content">
            <h3>{{ project.title }}</h3>
            <p class="category">{{ project.category }}</p>
            <p class="description">{{ project.description }}</p>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { projects } from '@/config/projects'

export default {
  name: 'HomeView',
  computed: {
    projects() {
      return projects
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 0;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
}

.social-links {
  margin-top: 2rem;
}

.social-links a {
  font-size: 1.5rem;
  margin: 0 1rem;
  color: #2c3e50;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #42b983;
}

.intro {
  text-align: center;
  max-width: 800px;
  margin: 4rem auto;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.skill-card {
  padding: 2rem;
  text-align: center;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s;
}

.skill-card:hover {
  transform: translateY(-5px);
}

.skill-card i {
  font-size: 2.5rem;
  color: #42b983;
  margin-bottom: 1rem;
}

.featured-grid {
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding: 1rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.featured-grid::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.featured-card {
  flex: 0 0 300px;
  scroll-snap-align: start;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  text-decoration: none;
  color: inherit;
  background: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.featured-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.featured-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 3px solid #42b983;
}

.card-content {
  padding: 1rem;
}

.card-content h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.category {
  color: #42b983;
  font-weight: bold;
  margin: 0.5rem 0;
}

.description {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .featured-card {
    flex: 0 0 280px;
  }
}

section {
  margin-bottom: 4rem;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
