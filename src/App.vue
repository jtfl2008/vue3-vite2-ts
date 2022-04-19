<script setup lang="ts" name="App">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <div class="app-header">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        |
        <RouterLink to="/about">About</RouterLink>
        <el-button>aaaaa</el-button>
      </nav>
    </div>
    <div class="app-body">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
  @import '@/assets/base.css';

  .app-container {
    margin: 0 auto;
    width: 1200px;
  }

  a,
  .green {
    text-decoration: none;
    color: hsl(160deg 100% 37% / 100%);
    transition: 0.4s;
  }

  nav {
    margin-top: 2rem;
    width: 100%;
    font-size: 12px;
    text-align: center;

    a {
      display: inline-block;
      padding: 0 1rem;
    }

    a.router-link-exact-active {
      color: var(--color-text);
    }

    a.router-link-exact-active:hover {
      background-color: transparent;
    }
  }
</style>
