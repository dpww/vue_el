<template>
  <div id="app">
    <router-view v-if="isRouterAlive"  v-watermark="watermark" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      isRouterAlive: true
      //watermark:localStorage.getItem('employeeName')+' '+localStorage.getItem('username')
    }
  },
  computed:{
    watermark(){
      let mark=(this.$store.getters.userInfo.employeeName||'')+' '+(this.$store.getters.userInfo.username||'');
      mark= localStorage.getItem('employeeName')+" "+localStorage.getItem('username')
      return mark;
    }
  },
  methods:{
  }
}
</script>
<style lang="scss">
  @import url('./assets/css/t_cell.css');
  @import '@/styles/main.scss';
  .text-right {
    text-align: right;
  }
</style>
