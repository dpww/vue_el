<template>
  <div class="app-container projectAttribute-box">
    <el-form ref="form" class="projectFrom" :model="projectFrom" label-width="80px">
      <el-form-item label="项目名称">
        <el-input v-model="projectFrom.name" placeholder="请输入项目名称" />
      </el-form-item>
      <el-form-item label="所属组织">
        <el-select v-model="projectFrom.region" placeholder="请选择活动区域" style="width: 100%">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目编号">
        <el-input v-model="projectFrom.name" placeholder="请输入编号" />
      </el-form-item>
      <el-form-item label="项目状态">
        <el-select v-model="projectFrom.region" placeholder="请选择活动区域" style="width: 100%">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-select v-model="projectFrom.region" placeholder="请选择活动区域" style="width: 100%">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否打印">
        <el-select v-model="projectFrom.region" placeholder="请选择活动区域" style="width: 100%">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>

    <div class="selectKang">
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="value" placeholder="请选择" class="lr20">
        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <div class="radioText">
      <p>项目支持重分配的客户状态: 丢弃与过期默认支持重分配</p>
      <div class="ziTuo">
        自拓团队: <el-radio v-model="radio" label="1">未到访</el-radio>
        <el-radio v-model="radio" label="2">已到访</el-radio>
        <el-radio v-model="radio" label="3">已认筹</el-radio>
        <el-radio v-model="radio" label="4">已认购</el-radio>
        <el-radio v-model="radio" label="5">已签约</el-radio>
      </div>
      <div class="anChang">
        案场团队: <el-radio v-model="radio1" label="1">未到访</el-radio>
        <el-radio v-model="radio1" label="2">已到访</el-radio>
        <el-radio v-model="radio1" label="3">已认筹</el-radio>
        <el-radio v-model="radio1" label="4">已认购</el-radio>
        <el-radio v-model="radio1" label="5">已签约</el-radio>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary">保存</el-button>
      <el-button type="primary" style="margin-left: 20px">取消</el-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      projectFrom: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        resource: '',
        desc: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      options1: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      options2: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      // 单选
      radio: '1',
      radio1: '2'

    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang='less'>
.projectAttribute-box{
  .projectFrom{
    width: 30%;
  }
  .selectKang{
    .lr20{
      margin: 0 20px;
    }
  }
  .radioText{
    font-size: 14px;
    margin-top: 20px;
    .ziTuo{
      margin-left: 30px;
      margin-top: 15px;
    }
    .anChang{
      margin-left: 30px;
      margin-top: 15px;
    }
  }
  .btn{
    margin-top: 20px;
  }
}
.el-form-item{
  margin-bottom: 15px;
}
</style>
