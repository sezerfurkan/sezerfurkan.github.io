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
          v-for="project in featuredProjects" 
          :key="project.id"
          to="/projects"
          class="featured-card"
        >
          <img :src="project.image" :alt="project.title">
          <h3>{{ project.title }}</h3>
          <p>{{ project.category }}</p>
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
    featuredProjects() {
      return projects.slice(0, 3)
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.featured-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  text-decoration: none;
  color: inherit;
}

.featured-card:hover {
  transform: translateY(-5px);
}

.featured-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.featured-card h3 {
  padding: 1rem;
  margin: 0;
  background: rgba(255, 255, 255, 0.9);
}

.featured-card p {
  padding: 0 1rem 1rem;
  margin: 0;
  color: #666;
  background: rgba(255, 255, 255, 0.9);
}

section {
  margin-bottom: 4rem;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
