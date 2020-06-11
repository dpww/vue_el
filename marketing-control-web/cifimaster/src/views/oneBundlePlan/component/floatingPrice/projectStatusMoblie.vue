<template>
  <div class="container_list">
    <el-row>
      <el-col :span="12"><strong>城市能级：</strong>{{value[projectLevel.name]&&projectLevel.options.filter(item=>item.value==value[projectLevel.name])[0].label}}</el-col>
      <el-col :span="12"><strong>项目规模：</strong>{{value.projectScale}}万方</el-col>
      <el-col :span="12"><strong>城市去化周期：</strong>{{value.cityPeriod}}月</el-col>
      <el-col :span="12"><strong>板块存量：</strong>{{value.plateStock}}万方</el-col>
      <el-col :span="12"><strong>板块去化周期：</strong>{{value.platePeriod}}月</el-col>
      <el-col :span="12"><strong>已售户数：</strong>{{value.soldNum}}户</el-col>
      <el-col :span="12"><strong>已售比例：</strong>{{value.soldPer}}%</el-col>
      <el-col :span="12"><strong>是否限价：</strong>{{value.islimitPrice==0?"否":'是'}}</el-col>
      <el-col :span="24"><strong>限价说明：</strong>{{value.islimitExplain}}</el-col>
      <el-col :span="12"><strong>并表情况：</strong>{{value.ismerge==0?"否":'是'}}</el-col>
      <el-col :span="24"><strong>营销费率约定：</strong>{{value.marketingExplain}}</el-col>
      <el-col :span="12"><strong>股权比例：</strong>{{value.stockPer}}%</el-col>
      <el-col :span="24"><strong>另合作方为：</strong>{{value.stockPartner}}</el-col>
      <el-col :span="24"><strong>股东方意见是否统一：</strong>{{value.stockIdea==0?"否":'是'}}</el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name:'projectStatusMoblie',
    props:{
      value: {
        type: Object,
        default: () => ({
          projectLevel: 0,
          projectScale: ''
        })
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        projectLevel: {
          name: 'cityLevel',
          type: 'radio',
          options: [{
            label: '一线',
            value: 1
          }, {
            label: '二线',
            value: 2
          }, {
            label: '三线',
            value: 3
          }, {
            label: '四五线',
            value: 4
          }],
        }
      }
    }
  }
</script>
<style lang="scss">
.container_list{
  .el-col-12{
    vertical-align: middle;
    line-height: 30px;
  }
  strong{
    font-size: 12px;
    color:#606266;
  }
}
</style>
