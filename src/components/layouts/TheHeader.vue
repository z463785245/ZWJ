<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
          <button class="navbar-toggle" @click="toggleNav">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>


        <!-- <a href="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img :src="logo.src" :alt="logo.title">
        </a> -->
        <router-link to="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img :src="logo.src" :alt="logo.title">        
        </router-link>
      </div>

      <div id="top-navbar-collapse" :class="['collapse','navbar-collapse',{in:showCollapseNav}]">
        <ul class="nav navbar-nav">
          <li v-for="(item,index) in navList" :class="{active : index === activeNavIndex} " :key="item">
            <a href="#" @click="changeNavIndex(index)">{{ item }}</a>
          </li>


        </ul>
          <div class="navbar-right">
            <SearchInput/>
            <TheEntry/>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheEntry from '@/components/layouts/TheEntry.vue'
import SearchInput from '@/components/layouts/SearchInput.vue'
export default {
  name: 'TheHeader',
  components: {
    TheEntry,
    SearchInput
  },
  data() {
    return {
      logo: {
        src: 'http://www.cm24.com.cn/themes/cm2020/public/images/index/1.gif',
        title: '美美咨询'
      },
      navList: ['社区', '头条', '问答', '教程'],
      activeNavIndex: 0,
      showCollapseNav:false,
    }
  },
  // beforeCreate() {
  //   this.uploadsUrl = 'https://cdn.learnku.com/uploads/'
  // },
  methods:{
      changeNavIndex(index){
          this.activeNavIndex = index
      },
      toggleNav(){
          this.showCollapseNav = !this.showCollapseNav
      }
  }
}
</script>


<style scoped>
.title { display: none;}
.navbar-default .navbar-nav > .active > a { background: rgba(0,0,0,.03);}
</style>