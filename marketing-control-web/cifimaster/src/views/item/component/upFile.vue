<template>
  <div class="sendFile">
    <el-upload class="upload-demo" :on-success="uploadSuccess" :action="upFiles('/projectmanager/Upload')" :data="{BizID:$route.query.projectId,UserID:id,BizType:'abc' }"
      :on-preview="handlePreview" :on-remove="before" :before-remove="beforeRemove" multiple
      :file-list="fileList"  v-if="$store.state.user.userPower.includes('附件上传')">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-row v-else>
      <el-col :span="24" v-for="(item,index) in fileList" :key="index"><a class="list_item" download="download" @click="total(item.name)" :href="item.SaveUrl">{{item.name}}</a></el-col>
    </el-row>
    <el-row style="text-align:center;">
      <el-button type='primary' class="xuHuiBtn secondary" @click='$router.back(-1)' style='margin-top:15px'>返回</el-button>
    </el-row>
  </div>
</template>
<script>
  import {
    upFile,
    downLoad,
    restful
  } from "@/api/request.js";
  import {
    /**
     * 附件传到前端
     *
     * @return
     */
    selectAttach,
    /**
     * 附件的删除
     *
     * @return
     */
    deleteAttach

  } from "@/api/ProjectMonthlyPlan.js";
  export default {
    created() {
      /**
       * 附件传到前端
       * @return
       */
      restful("/projectmanager/selectAttach",[this.$route.query.projectId]).then(res => {
        res.result.forEach(item => {
          item.name = item.FileNameOld, item.id = item.ID
        });
        this.$data.fileList.push(...res.result);
      });
    },
    computed:{
      readonly() {
        return this.$store.state.settings.projectStatus!=2&&this.$store.state.settings.projectReadonly;
      },
      isAdmin(){
        return this.$store.state.user.userJobType=='admin';
      },
      isRegion(){
        return this.$store.state.settings.regionItem
      }
    },
    data() {
      return {
        fileList: [],
        id: window.localStorage.getItem('id'),
        isProjectPost:localStorage.getItem('CommonJobID') == "1c1d3cf6-e37a-11e9-8c08-00163e05721e"
      };
    },
    methods: {
      upFiles(url) {
        _paq.push(['trackEvent', '点击', '点击上传', '项目月度计划附件上传']);
        return upFile(url);
      },
      total(name){
        _paq.push(['setDownloadExtensions', name]);
      },
      downLoad,
      handleRemove(file, fileList) {

      },
      handlePreview(file) {
        open(file.SaveUrl);
      },
      before(file, fileList) {
        if (!this.$store.state.user.userPower.includes('项目月度计划附件删除')) {
          this.$message.error("没有删除权限");
          return false;
        }
      },
      beforeRemove(file,fileList){
        if(confirm(`确定移除 ${ file.name }？`)){
          _paq.push(['trackEvent', '点击', '删除附件', '项目月度计划附件删除' + file.name]);
          deleteAttach({
            "fileID": file.id,
            "IsDel": 1
          })
        }
        else{
          return false;
        }
      },
      uploadSuccess(res, file, fileList) {
        this.$message.success("上传成功");
        let id = res.result[0].ID;
        file.id = id;
        file.SaveUrl=res.result[0].SaveUrl;
        //this.$data.fileList.push(...res.result.ID);
      }
    }
  }
</script>
<style lang="scss">
  @import "@/styles/item/upFile.scss";
  .list_item{
    line-height: 35px;
  }
</style>
