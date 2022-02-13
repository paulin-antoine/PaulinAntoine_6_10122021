<template>
<div class="#app">
  <banner />  
  <bannerNav />
  <router-view />
</div>
</template>

<script>

import banner from "@/components/banner.vue"

export default {
  name: 'App',
  components: {
      banner,
  }
}
</script>

<style>
* {
  margin: 0;
  background-color: #200e58;
}
html {
  margin: 0;
  width: 100%;
}
#app{
  width: 100%;
  text-align: center;
}  
h1, p, a {
        background-color: white;
        
  }
p, h1 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
a {
  text-decoration: none;
}
</style>
