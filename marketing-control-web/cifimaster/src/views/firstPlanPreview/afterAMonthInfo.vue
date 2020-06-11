<template>
  <div class="afterAMonthInfo" ref="afterAMonthInfo">
    <el-collapse v-model="openList" @change="openChange">
      <el-collapse-item title="基础信息" name="1">
        <template slot="title">
          <h3 class="titleText">基础信息</h3>
        </template>
        <ul class="baseInfo">
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">项目名称 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{resData.projectName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人部门 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{resData.post_name}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请时间 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{resData.zddate}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{resData.EmployeeName}}</el-col>
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="审批信息" name="2">
        <template slot="title">
          <h3 class="titleText">审批信息</h3>
        </template>
        <div class="afterAMonthInfoinput">
          <div class="list" id="list">
            <p class="bold">附件清单</p>
            
            <div class="accessory">
              <el-table
                :data="accessoryData"
                style="width: 100%"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              >
                <el-table-column prop="type" label="附件名称" align="left" width="200"></el-table-column>
                <el-table-column prop="name" label="附件" align="left">
                  <template slot-scope="scope">
                    <!-- <a :href="local+scope.row.url">{{scope.row.name}}</a> -->
                    <a v-if="!isMobile" :href="local+scope.row.url">{{scope.row.name}}</a>
                    <span v-else @click="YZ_link(scope.row)">{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="status" label="状态" align="center"></el-table-column> -->
              </el-table>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="text-align: center;">
    <el-button
      type
      @click="approveOpenNodeInfo()"
      v-if="this.$route.query.isKSAP"
    >快速审批</el-button>

    <Buttons/>
    </div>

  </div>
</template>

<script>
let width = document.body.offsetWidth;
import { getOpenMonth,approveOpenNodeInfo } from "@/api/firstPlan";
import { post } from "../../api/request";
import $ from "jquery";
export default {
  components:{
    Buttons:()=>import('../../views/offerFlow/component/index')
  },
  data() {
    let isMobile = width <= 1024;    //获取屏幕宽度判断是否为pad?
    return {
      isMobile:width <= 1024,
      openList: ["1", "2"],
      isShowKS:
        localStorage.getItem("employeeName")
      =='管理员',
      accessoryData: [
        {
          type: "《XX项目首开复盘报告》",
          handle: "上传"
        },
        {
          type: "",
          handle: "其他上传"
        }
      ],
      fileList: [],
      otherIndex: 1,
      fileHeight: 1,
      resData: {}
    };
  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.afterAMonthInfo.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.afterAMonthInfo.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
   updated() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.afterAMonthInfo.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.afterAMonthInfo.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
  computed: {
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
    },
    action() {
      let href = process.env.VUE_APP_BASE_API;
      return href + "/Upload/uploadFile_2";
    }
  },
  methods: {
    openChange(val) {},
     YZ_link(file) {
      // console.log(this.isMobile);
      if (this.isMobile) {
        var isTest = ["salesmgt-uat", "salesmgt-test"].some(function(item) {
          return window.location.href.indexOf(item) !== -1;
        });
        let wm = {
          htmlTitle: "拿地后",
          wmContent: this.userID || "旭辉集团",
          wmSize: 10,
          wmFont: "microsoft yahei",
          wmColor: 7,
          isDelSrc: 1
        };
        // let resquestUrl=isTest?`${location.origin}/dcs.web/onlinefile`:`${location.origin}/dcs.web/onlinefile`
        let resquestUrl = `https://oadoc.cifi.com.cn/dcs.web/onlinefile`;
        let requrl = file.url.split("?n=")[0];
        let end = requrl.split(".")[requrl.split(".").length - 1];
        let convertType;
        if (end == "pdf") {
          convertType = "20";
        } else if (end == "tif") {
          convertType = "17";
        } else {
          convertType = "0";
        }
        // var tempwindow=window.open('about:blank');
        $.ajax({
          url: resquestUrl,
          data: {
            ...wm,
            downloadUrl: location.origin + requrl,
            convertType
          },
          dataType: "json",
          async: false,
          type: "post",
          success: function(data) {
            if (data.result == 0) {
              if (parent) {
                parent.window.location.href = data.data[0];
              } else {
                window.location.href = data.data[0];
              }
            } else {
              this.$message.error("转换失败");
            }
          },
          error: function(data) {
            alert("报错:" + JSON.stringify(data));
            open(file.url);
          }
        });
      } else {
        let requrl = file.url.split("?")[0];
        open(file.url);
      }
    },
    approveOpenNodeInfo() {
      approveOpenNodeInfo({
        businesskey: this.$route.query.BOID,
        orgName:"fp_open_one_month"
      }).then(res => {
        window.close()
      });
    },
    getOpenMonth() {
      getOpenMonth({
        plan_node_id: this.$route.query.BOID,
        node_level: this.node_level
      }).then(res => {
        this.resData = res.result.info;
        let arr5 = res.result.fileList;
        this.fileList = arr5;
        if (arr5.length > 0) {
          this.otherIndex = arr5.length;
          let temp = this.accessoryData.pop();
          arr5.forEach((item, index) => {
            this.accessoryData[item.orderIndex] = {
              type: "附件",
              id: item.id,
              name: item.name,
              url: item.url,
              orderIndex: item.orderIndex
            };
          });
          this.accessoryData.push(temp);
        }
      });
    }
  },
  created() {
    this.getOpenMonth();
  },

};
</script>

<style lang="less" scoped>
.afterAMonthInfo {
  .titleText {
    border-left: 3px solid #2661ff;
    height: 20px;
    line-height: 20px;
    text-indent: 1em;
    font-size: 16px;
    margin-left: 5px;
  }
  .lightFather {
    height: 20px;
    line-height: 20px;
    padding-left: 10px;
    .light {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      // background-color: red;
      float: left;
      margin-top: 2px;
    }
    span {
      padding-left: 10px;
    }
  }
  .green {
    background-color: green;
  }
  .red {
    background-color: red;
  }
  .baseInfo {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 33.33%;
      padding-left: 10px;
    }
  }

  ::v-deep .form_item_title {
    border: none !important;
  }
  ::v-deep .form-container .form_item {
    padding: 0px;
    margin-top: 0px;
  }
  @media (max-width: 1024px) {
    .baseInfo {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 100%;
        padding-left: 10px;
      }
    }
   ::v-deep .el-form-item__label {
      width: 120px !important;
    }
   ::v-deep .el-form-item__content {
      margin-left: 120px !important;
    }

   ::v-deep .inputForm .el-col-8 {
      width: 100% !important;
    }
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
    font-weight: 700;
  }
}
</style>
