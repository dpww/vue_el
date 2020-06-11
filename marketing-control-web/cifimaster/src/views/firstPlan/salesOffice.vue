<template>
  <div class="salesOffice">
    <navbarLink></navbarLink>
    <div class="top" v-if="isType != 'view'">
      <el-row>
        <el-button @click="$router.push({ path: '/planWrite' })"
          >返回列表</el-button
        >
        <el-button v-if="isSubmit == 4" type="primary" @click="createVersions()"
          >创建版本</el-button
        >
      </el-row>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="选择版本:">
          <el-select
            v-model="thisVersion"
            @change="switchVersion(thisVersion)"
            placeholder="请选择版本"
          >
            <el-option
              v-for="item in versionData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="containter">
      <div class="list" id="list">
        <p class="bold">附件清单</p>
        <div class="accessory">
          <el-table
            :data="accessoryData"
            style="width: 100%"
            :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
          >
            <el-table-column
              prop="type"
              label="附件名称"
              align="left"
              width="250"
            ></el-table-column>
            <el-table-column prop="name" label="附件" align="left">
              <template slot-scope="scope">
                <a :href="local + scope.row.url">{{ scope.row.name }}</a>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <div
                  class="fileBox"
                  v-if="scope.$index < accessoryData.length - 1"
                >
                  <el-upload
                    v-if="isSubmit != 4 && !scope.row.name"
                    :on-exceed="exceed"
                    :action="action"
                    :data="{
                      filePath: 'salesOffice',
                      bizID: '',
                      orderIndex: scope.$index
                    }"
                    :on-success="fileSuccess"
                    :file-list="fileList__[scope.$index]"
                    :on-remove="fileRemove"
                    :on-error="fileError"
                  >
                    <el-button type="text">{{ scope.row.handle }}</el-button>
                  </el-upload>
                  <el-button
                    type="text"
                    v-if="isSubmit != 4 && scope.row.name"
                    @click="delFielList(scope.$index)"
                    >删除</el-button
                  >
                </div>
                <div
                  class="fileBox"
                  :style="{ height: fileHeight * 40 + 'px' }"
                  v-else
                >
                  <el-upload
                    :action="action"
                    :on-success="fileSuccess"
                    :data="{
                      filePath: 'salesOffice',
                      bizID: '',
                      orderIndex: scope.$index
                    }"
                    :on-remove="fileRemove"
                    :on-error="fileError"
                  >
                    <el-button v-if="isSubmit != 4" type="text">+{{
                      scope.row.handle
                    }}</el-button>
                  </el-upload>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="bottom" v-if="isType != 'view'">
      <el-button type="primary" v-if="isSubmit != 4" @click="saveData('submit')"
        >提交</el-button
      >
      <el-button type="primary" v-if="isSubmit != 4" @click="saveData('save')"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  queryPlanNodeVersionByPlanId,
  queryOpenMonth,
  insertOpenBack,
  subApprovePlanNode,
  delFile
} from "@/api/firstPlan";
import { post } from "../../api/request";
export default {
  components: {
    navbarLink: () => import("./components/navbarLink")
  },
  data() {
    return {
      isType: "",
      thisVersion: "",
      otherIndex: 1,
      fileHeight: 1,
      fileList__: [],
      fileList: [],
      accessoryData: [
        {
          type: "《三大件开放评审表》-售楼处",
          handle: "上传"
        },
        {
          type: "《三大件意见反馈表》-售楼处",
          handle: "上传"
        },
        {
          type: "《售楼处开放检查报告 》",
          handle: "上传"
        },
        {
          type: "《三大件营销需求表》",
          handle: "上传"
        },
        {
          type: "",
          handle: "其他上传"
        }
      ],

      versionData: [
        {
          id: "",
          name: "",
          plan_approval: "0"
        }
      ],
      isSubmit: 0,
      node_level: this.$route.query.node_level,
      fileList: [],
      form: {
        versions: ""
      },
      listData: [
        {
          name: "",
          url: "",
          id: ""
        }
      ]
    };
  },
  computed: {
    action() {
      let href = process.env.VUE_APP_BASE_API;
      return href + "/Upload/uploadFile_2";
    },
    local() {
      let host;
      if (location.origin.includes("test")) {
        host = "https://salesmgt-test.cifi.com.cn";
      } else if (location.origin.includes("uat")) {
        host = "https://salesmgt-uat.cifi.com.cn";
      } else {
        host = "https://salesmgt.cifi.com.cn";
      }
      return host;
    }
  },
  methods: {
    reload() {
      this.queryPlanNodeVersionByPlanId();
    },
    deleteData(index, object) {
      delFile({
        id: object.id
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: res.messages,
            type: "success"
          });
          this.listData.splice(index, 1);
        } else {
          this.$message({
            showClose: true,
            message: res.messages,
            type: "error"
          });
        }
      });
    },
    queryPlanNodeVersionByPlanId() {
      queryPlanNodeVersionByPlanId({
        plan_id: this.$route.query.plan_id,
        node_level: this.node_level
      }).then(res => {
        this.versionData = res.result;
        this.thisVersion = res.result[0].id;
        if (
          res.result[0].plan_approval != undefined &&
          res.result[0].plan_approval != null
        ) {
          this.isSubmit = res.result[0].plan_approval;
        } else {
          this.isSubmit = 0;
        }
        if (this.$route.query.disabled) {
          this.isSubmit = 4;
        }
        this.queryOpenMonth();
      });
    },
    createVersions() {
      insertOpenBack({
        plan_id: this.$route.query.plan_id,
        node_level: this.node_level
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "版本创建成功",
            type: "success"
          });
          this.queryPlanNodeVersionByPlanId();
        } else {
          this.$message({
            showClose: true,
            message: "版本创建失败",
            type: "error"
          });
        }
      });
    },
    switchVersion(thisVersion) {
      for (var i = 0; i < this.versionData.length; i++) {
        if (this.versionData[i].id == thisVersion) {
          if (
            this.versionData[i].plan_approval != undefined &&
            this.versionData[i].plan_approval != null
          ) {
            this.isSubmit = this.versionData[i].plan_approval;
          } else {
            this.isSubmit = 0;
          }
          if (this.$route.query.disabled) {
            this.isSubmit = 4;
          }
        }
      }
      this.thisVersion = thisVersion;
      this.queryOpenMonth();
    },
    queryOpenMonth() {
      //监控进入只查看
      if (this.$route.query.type != null && this.$route.query.type == "view") {
        this.isType = this.$route.query.type;
        this.thisVersion = this.$route.query.plan_node_id;
        this.isSubmit = 4;
      }
      queryOpenMonth({
        id: this.thisVersion,
        node_level: this.node_level
      }).then(res => {
        let arr5 = res.result;

        this.accessoryData = [
          {
            type: "《三大件开放评审表》-售楼处",
            handle: "上传",
            id: "",
            name: "",
            url: ""
          },
          {
            type: "《三大件意见反馈表》-售楼处",
            handle: "上传",
            id: "",
            name: "",
            url: ""
          },
          {
            type: "《售楼处开放检查报告 》",
            handle: "上传",
            id: "",
            name: "",
            url: ""
          },
          {
            type: "《三大件营销需求表》",
            handle: "上传",
            id: "",
            name: "",
            url: ""
          },
          {
            type: "",
            handle: "其他上传"
          }
        ];
        if (arr5.length > 0) {
          let temp = this.accessoryData.pop();
          arr5.forEach((item, index) => {
            if (item.orderIndex >= 4) {
              this.accessoryData.push({
                type: "其他上传",
                handle: "上传",
                id: item.id,
                name: item.name,
                url: item.url,
                orderIndex: item.orderIndex
              });
            } else {
              this.accessoryData[index].id = item.id;
              this.accessoryData[index].name = item.name;
              this.accessoryData[index].url = item.url;
              this.accessoryData[index].orderIndex = item.orderIndex;
            }
          });
          this.accessoryData.push(temp);
        }
      });
    },
    fileUpload: function(event) {
      // 上传文件
      let file = event.target.files;
      let formData = new FormData();
      formData.append("filePath", "salesoffice");
      formData.append("bizID", this.thisVersion);
      formData.append("file", file[0]);
      console.log(formData);
      post(this.action, formData).then(res => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: res.messages,
            type: "success"
          });
          this.listData.push(res.data);
          file = [];
        } else {
          this.$message({
            showClose: true,
            message: res.messages,
            type: "error"
          });
        }
      });
    },
    saveData(type) {
      if (this.accessoryData.length == 0) {
        this.$message.error("当前没有需要提交或者保存的文件");
        return;
      }
      if (
        this.accessoryData.some(i => i.type && i.type !== "其他上传" && !i.name)
      ) {
        this.$message({
          type: "error",
          message: "必须上传附件清单"
        });
        return;
      }
      subApprovePlanNode({
        plan_node_id: this.thisVersion,
        button: type,
        fileList: this.accessoryData,
        node_level: this.$route.query.node_level
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: type == "save" ? "保存成功" : "提交成功",
            type: "success"
          });
          this.isSubmit = 4;
          this.otherIndex = 1;
          this.queryPlanNodeVersionByPlanId();
          if (type == "submit") {
            this.$router.push("planWrite");
          }
        } else {
          this.$message({
            showClose: true,
            message: "提交失败",
            type: "error"
          });
        }
      });
    },

    exceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件`);
    },
    fileError() {
      this.$message.error("上传失败");
    },
    delFielList(idx) {
      let namelist = [
        "《三大件开放评审表》-售楼处",
        "《三大件意见反馈表》-售楼处",
        "《售楼处开放检查报告 》",
        "《三大件营销需求表》"
      ];
      if (idx <= 3) {
        this.accessoryData.splice(idx, 1, {
          type: namelist[idx],
          handle: "上传"
        });
      } else {
        this.accessoryData.splice(idx, 1);
      }
    },
    fileRemove(file, fileList) {
      console.log(file, "this.fileList ");
    },
    fileSuccess(res, file, fileList) {
      if (!res.data) {
        this.$message.error(res.messages);
        return;
      }
      if (res.data.orderIndex < this.accessoryData.length - 1) {
        this.$set(
          this.accessoryData[res.data.orderIndex],
          "name",
          res.data.name
        );
        this.$set(this.accessoryData[res.data.orderIndex], "id", res.data.id);
        this.$set(this.accessoryData[res.data.orderIndex], "url", res.data.url);
      } else {
        let temp = this.accessoryData[this.accessoryData.length - 1];
        this.accessoryData.pop();
        this.accessoryData.push({
          type: "其他上传",
          handle: "上传",
          name: res.data.name,
          id: res.data.id,
          url: res.data.url
        });
        this.accessoryData.push(temp);
      }
    }
  },
  created() {
    if (this.$route.query.disabled) {
      this.isSubmit = 4;
    }
    this.reload();
  }
};
</script>

<style lang="less" scoped>
.salesOffice {
  .navbarLink {
    background: #fff;
    margin-top: 5px;
  }
  .top {
    background: #fff;
    color: #333;
    font-size: 14px;
    height: 50px;

    ::v-deep .el-button {
      height: 30px;
      float: right;
      margin-left: 10px;
      margin-top: 10px;
    }

    ::v-deep .el-button:first-child {
      margin-right: 15px;
    }
  }

  .list {
    padding: 0 15px;
    margin-bottom: 15px;

    p {
      height: 30px;
      line-height: 30px;
      color: #333;
      font-size: 14px;
    }

    .bold {
      font-weight: 700 !important;
      color: #333333;
      font-family:PingFangSC-Medium,PingFang SC;
    }
    ::v-deep .el-table th:first-child .cell:first-child {
      text-indent: 8px;
    }
  }

  margin: 10px;
  background-color: #fff;
  ::v-deep .el-input__inner {
    width: 270px;
  }
  .containter{
  margin-top: 50px;
}
.accessory {
  padding: 0 10px;
  background: #fff;
  margin-bottom: 10px;
  margin-top: 10px;
  p {
    font-weight: 700;

    height: 30px;
    line-height: 30px;
  }
  .cell {
    overflow: visible;
  }
  .fileBox {
    position: relative;
    left: -18px;
    ::v-deep .el-upload-list {
      display: none !important;
      position: absolute;
      top: 0;
      left: -100%;
      z-index: 10;
    }
  }
  ::v-deep .el-table th {
    background: #EFEFEF;
  }
  ::v-deep .is-leaf{
    color: #999999 !important;
    font-size: 12px !important;
  }
}
.bottom {
  text-align: center;
  height: 60px;
  line-height: 60px;
  background: #fff;
  margin: 0 15px;
  position: fixed;
  z-index: 100;
  width: 100%;
  bottom: 0px;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  .el-button {
    height: 30px;
  }
}
    ::v-deep .el-input__inner{
  color: #333333 !important;
  font-size: 14px !important;
}
}

</style>
