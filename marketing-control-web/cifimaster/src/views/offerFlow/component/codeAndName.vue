<template>
  <div class="codeAndName">
    <span>流程编号:</span>
    <span class="appcode">{{appcode}}</span>
    <span>发起日期:</span>
    <span>{{appname}}</span>
  </div>
</template>

<script>
export default {
  props:{
    codeAndName:{
      type:Array,
      default:[
        {}
      ]
    }
  },
  computed:{
    appcode(){
      return this.codeAndName[0]&&this.codeAndName[0].flow_id
    },
    appname(){
      return this.codeAndName[0]&&this.codeAndName[0].ApplyDate

    }
  }
}
</script>

<style lang="less" scoped>
  .codeAndName{
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding-right: 20px;
    .appcode{
      margin-right: 10px;
    }
  }
</style>
