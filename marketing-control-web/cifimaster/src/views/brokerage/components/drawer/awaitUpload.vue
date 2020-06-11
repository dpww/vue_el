<template>
  <div class="awaitUpload">
    <div class="awaitUpload_top">
      <el-button @click="payUpload">上传</el-button>
    </div>
    <div class="awaitUpload_bottom">
      <el-table
        :data="mainData.awaitUploadList"
        style="width: 100%"
        :header-cell-style="{'background-color':'#FAFAFA'}"
      >
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="name" label="文件名称"></el-table-column>
        <!-- <el-table-column prop="address" label="上传人"></el-table-column> -->
        <!-- <el-table-column prop="address" label="上传时间"></el-table-column> -->
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="openFile(scope.row.url)">下载</el-button>
            <el-button type="text" @click="delFilelist(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {delFile} from "@/api/brokerage"
export default {
  props: {
    mainData: {
      type: Object,
      dafault: {}
    }
  },
  watch: {
    mainData: {
      handler(newv) {},
      deep: true
    }
  },
  computed:{
    local() {
      let host;
      // if (location.origin.includes("test")) {
        host = "https://salesmgt-test.cifi.com.cn";
      // } else if (location.origin.includes("uat")) {
      //   host = "https://salesmgt-uat.cifi.com.cn";
      // } else {
      //   host = "https://salesmgt.cifi.com.cn";
      // }
      return host;
    },
  },
  methods: {
    //打开附件
    openFile(url){
      window.open(this.local+url)
    },
    //删除附件
    delFilelist(id){
      delFile({
        id
      }).then(res=>{
        console.log(res);
        if(res.code==200){
          this.$emit('randerFileList')
        }
      })
    },
    //上传
    payUpload() {
      this.mainData.importFile = true;
      this.mainData.action =
        process.env.VUE_APP_BASE_API + "/Upload/uploadFile_2";
      this.mainData.actionData = {
        filePath: "receiptDetail",
        bizID: this.mainData.paymentUploadID,
        orderIndex: 0
      };
    }
  }
};
</script>

<style lang='less' scoped>
.awaitUpload {
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;
  padding: 15px 15px 75px;
  border-radius: 4px;
  background-color: #fff;
  .awaitUpload_top {
    height: 40px;
    position: relative;
    margin-bottom: 3px;
    .el-button {
      position: absolute;
      top: 0;
      right: 15px;
      height: 32px;
      width: 65px;
      color: #225dfc;
      font-size: 14px;
      border-color: #225dfc;
    }
  }
}
</style>
