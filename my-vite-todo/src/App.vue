<script setup>
import CompHeader from './components/CompHeader.vue'
import CompFooter from './components/CompFooter.vue'
import CompMainTodo from './components/CompMainTodo.vue'
</script>

<template>
  <div class="wrap">
    <CompHeader/>
      <main class="main">
        <nav>
          
            <router-link :to="{ name: 'About'}">About</router-link>
            <router-link :to="{ name: 'MainTodo'}">MainTodo</router-link>
          
        </nav>
        <router-view></router-view>
      </main>
    <CompFooter/>
  </div>
</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
nav {
  display:flex;
  justify-content:space-around;
  background-color:#03a9f4;
}
nav > a{
  display:inline-block;
  width:100%;
  text-align: center;
  border:1px solid white;
  color: white;
  padding: 8px;
}
nav > a:hover{
  color: red;
}
/* nav > div{
  width:90%;
  text-align: center;
  border:1px solid white;
  color: white;
  padding: 8px;
}
nav > div > a{
  display:inline-block;
  width:100%;
}
nav > div:hover{
  color: red;
} */
</style>
