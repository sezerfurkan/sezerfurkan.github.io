<template>
  <div class="about">
    <h2>About Me</h2>
    <div class="about-content">
      <p>I'm a passionate software developer with experience in web technologies.</p>
      <div class="skills">
        <h3>Skills</h3>
        <ul>
          <li>JavaScript/TypeScript</li>
          <li>Vue.js</li>
          <li>Node.js</li>
          <li>HTML/CSS</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about {
  padding: 2rem;
}
.about-content {
  max-width: 800px;
  margin: 0 auto;
}
.skills {
  margin-top: 2rem;
}
</style>
