<template>
  <div class="noPayForm">
    <div class="noPayForm_top">
      <div class="noPayForm_title">申请人信息</div>
      <div class="flex_box">
        <div>申请人: {{person}}</div>
        <div>申请人部门: {{department}}</div>
      </div>
      <div class="remark">
          <div>
            申请描述:
          </div>
          <div>
            <el-input type="textarea" v-model="remark">
            </el-input>
          </div>
      </div>
    </div>
    <div class="noPayForm_bottom">
      <div class="noPayForm_title">全民营销</div>
      <div>
          <el-table
        :data="noPayTable"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background-color':'#FAFAFA'}"
       >
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="name" label="事业部" show-overflow-tooltip></el-table-column>
        <el-table-column prop="project" label="项目名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="房间信息" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="客户姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="报备人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="成交类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="经纪人身份" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="交易状态" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="认购时间" show-overflow-tooltip></el-table-column>
         <el-table-column prop="address" label="签约时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="成交金额" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="已回款" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="回款比例" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="置业顾问" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="客户电话" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="报备人电话" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="已录佣金" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="佣金点位" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="经办人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="备注" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      remark:"remark",
      department:"department",
      person:"person",
      noPayTable:[
        {
          name:"123",
          project:"456",
          address:"数据"
        },
        {
          name:"123",
          project:"456",
          address:"数据"
        },
        {
          name:"123",
          project:"456",
          address:"数据"
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.noPayForm{
  margin: 15px;
  padding: 10px;
  background: #fff;
  .noPayForm_title{
    font-weight: 700;
    font-size: 16px;
    color: #333;
  }
  .flex_box{
    display: flex;
    >div  {
      flex: 1;
      padding: 15px;
    }
  }
  .remark{
    display: flex;
    >div:last-child{
      flex: 1;
    }
    >div:first-child{
      width: 70px;
    }
  }
  .noPayForm_top{
    margin-bottom: 25px;
  }
  .noPayForm_bottom{
    padding-bottom: 25px;
  }
}
</style>
