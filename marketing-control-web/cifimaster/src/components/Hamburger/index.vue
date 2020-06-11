<template>
  <div @click="toggleClick">
    <div class='iconBox' @click='tab'> 
      <i class="el-icon-s-fold" :class="{'is-active':isActive}"></i>
      <span>{{isActive? '收起' : '展开'}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isShow:'aaa',
      noShow:'bbb'
    }
  },
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    tab(){
    },
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width:14px;
  height:12px;
  background:rgba(255,255,255,1)
}

.is-active {
  transform: rotate(180deg);
}
::v-deep.el-icon-s-fold{
  font-size:18px;
  color: rgb(191, 203, 217);
  /* vertical-align: middle; */
}
p{
  font-size:12px; 
  color: rgb(191, 203, 217);
  display:block;
}
.iconBox{
  width:50px;
  height:20px;
  position: relative;
}
span{
    font-size:12px;
    color: rgb(191, 203, 217);
    margin-left:-10px;
    position: absolute;
    top: 3px;
}
</style>
