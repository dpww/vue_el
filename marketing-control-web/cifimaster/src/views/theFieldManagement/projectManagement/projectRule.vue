<template>
  <div class="app-container projectRule-box">
    <h5 class="title_top">项目管理-规则说明: 规则修改后,已过期的用户不受新规则影响,保护期内客户按规则计算</h5>
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content">
            <div>状态逾期后强制回收客户：</div>
            <div>
              <el-select v-model="isFouceRecycle" placeholder>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="optionvule"
                />
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content">
            <div>强制通过分接岗判客：</div>
            <div>
              <el-select v-model="isFouceRecycle1" placeholder style="margin-left: 28px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="optionvule"
                />
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content">
            <div>未到访领走是否要审核：</div>
            <div>
              <el-select v-model="isFouceRecycle2" placeholder style="margin-left: 14px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="optionvule"
                />
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>

    <div class="content">
      <h5 class="title_top">自销团队</h5>
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content">
            <div style="width: 110px">报备逾期(天):</div>
            <el-input v-model="input" placeholder="请输入内容" />
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content">
            <div style="width: 110px">到访逾期(天):</div>
            <el-input v-model="input1" placeholder="请输入内容" />
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content">
            <div style="width: 125px">跟进逾期(天)：</div>
            <el-input v-model="input2" placeholder="请输入内容" />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7" style="margin-top: 15px;">
          <div class="grid-content">
            <div>跟进逾期后强制回收客户：</div>
            <div>
              <el-select v-model="isFouceRecycle3" placeholder>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="optionvule"
                />
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="7" style="margin-top: 15px;">
          <div class="height_center">(强制回收客户后,原置业顾问无法再查阅该客户的详情)</div>
        </el-col>
      </el-row>
    </div>

    <div class="footer">
      <el-button type="primary" class="bgc_blue">保存</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: '0',
        label: '是'
      }, {
        value: '1',
        label: '否'
      }],
      value: '',
      isFouceRecycle: '', // 是否强制回收客户
      isFouceRecycle1: '', // 强制通过分接岗判客
      isFouceRecycle2: '', // 未到访领走是否要审核
      // 自销团队
      isFouceRecycle3: '',
      input: '',
      input1: '',
      input2: ''

    }
  },
  methods: {
    // 搜索
    search() {

    }
  }
}
</script>

<style lang='less'>
.projectRule-box{
  .title_top{
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 10px;
  }
 .top{
    padding: 8px;
    border: 1px solid #f0f0f0;
    background: #fcfcfc;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .kuang{
    border: 1px solid #f0f0f0;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 40px;
    justify-content: flex-start;
    display: flex;
    font-size: 14px;
    border: 1px solid #ccc;
    padding-left: 20px;
  }
  .el-input__inner{
    border: none;
    width: 224px;
  }
  .el-row{
    margin-bottom: 0;
  }
  .el-col{
    margin-bottom: 0;
  }
  .content{
    padding: 8px;
    background: #fcfcfc;
    border: 1px solid #f0f0f0;
  }
  .height_center{
    line-height: 40px;
    font-size: 14px;
    margin-left: 15px;
  }
  .footer{
    margin-top: 15px;
  }
}
</style>
