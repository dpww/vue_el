<template>
  <div class="planWrite">
    <div class="containter">
      <div class="planTitle">
        <div class="area">{{nowArea}}/{{nowCity}}</div>
        <el-popover
          @after-leave="hidePopover"
          placement="bottom"
          width="200"
          ref="popover"
          trigger="click"
        >
          <el-input placeholder="请输入搜索内容" v-model="searchVal">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="searchIcon"></i>
          </el-input>
          <el-tree :data="treeData" :props="defaultProps" @node-click="treeClick"></el-tree>
        </el-popover>
        <div class="project" v-popover:popover @click="showDilog=!showDilog">
          {{nowProject}}
          <i v-if="showDilog" class="el-icon-arrow-up"></i>
          <i v-if="!showDilog" class="el-icon-arrow-down"></i>
        </div>
        <div class="tips">
          <img class="img_light" src="../../assets/images/green.png" alt />
          按时完成
          <img class="img_light" src="../../assets/images/redRight.png" alt />
          逾期完成
          <img class="img_light" src="../../assets/images/red.png" alt />
          逾期未完成
          <img class="img_light" src="../../assets/images/warning.png" alt />
          预警提醒
          <img class="img_light" src="../../assets/images/edit.png" alt />
          待填报
        </div>
      </div>
      <div class="main">
        <el-collapse v-model="activePanel" @change="panelChange">
          <el-collapse-item :name="index+1" v-for="(item,index) in contentData" :key="index">
            <template slot="title">
              <div class="panelTitle" @click="panelClick(item,index)">
                <i
                  style="margin-left:20px;"
                  v-if="!activePanel.findIndex(item=>item==index+1)"
                  class="el-icon-arrow-down"
                ></i>
                <i style="margin-left:20px;" v-else class="el-icon-arrow-right"></i>
                <img
                  class="img_light"
                  v-if="contentData[index]&&contentData[index].light_stuat==3"
                  src="../../assets/images/green.png"
                  alt
                />
                <img
                  v-else-if="contentData[index]&&contentData[index].light_stuat==4"
                  class="img_light"
                  src="../../assets/images/redRight.png"
                  alt
                />
                <img
                  v-else-if="contentData[index]&&contentData[index].light_stuat==5"
                  class="img_light"
                  src="../../assets/images/red.png"
                  alt
                />
                <img
                  class="img_light"
                  v-else-if="contentData[index]&&contentData[index].light_stuat==6"
                  src="../../assets/images/warning.png"
                  alt
                />
                <img v-else class="img_light" src="../../assets/images/edit.png" alt />
                <span
                  class="status"
                  @click.stop="toEdit(routeList[item.node_level],contentData[index],item)"
                >
                  <span
                    v-if="item.node_order>=9||item.node_order<=5"
                  >{{item.node_order>=9?item.node_order-3:item.node_order}}.</span>
                  {{item.node_name}}
                </span>
                <span class="plan">计划完成:
                  <span style="margin-left:7px">{{contentData[index]&&contentData[index].plan_end_time | filterTime}}</span>
                  <!-- <span>2020年12月23日</span> -->
                </span>
                <span
                  class="target"
                >实际完成:
                <span style="margin-left:7px" :style="{color:changeColor(contentData[index].light_stuat)}">
                  {{ countsum(contentData[index],'actual_finish_time','plan_end_time','light_stuat') | filterTime}}
                  </span>
                  </span>
                <span v-if="contentData[index].node_order==12||contentData[index].node_order==11||contentData[index].node_order==10||contentData[index].node_order==9">
                <span
                  class="postpone "
                >延期计划完成 :
                <span style="margin-left:7px">
                 {{contentData[index]&&contentData[index].delay_open_time}}
                  </span>
                  </span>
                  </span>
                <el-button
                  class="aTextColor"
                  type="text"
                  @click.stop="toEdit(routeList[item.node_level],contentData[index],item)"
                >编制</el-button>
              </div>
            </template>
            <div class="content">
              <div class="contentTitle">
                <div>
                  <img src="../../assets/images/gongzuo-3 2@2x.png" alt /> 工作内容
                </div>
                <div>
                  <img src="../../assets/images/xinshouzhiyin 2@2x.png" alt />工作指引
                </div>
                <div class="textBold">
                  <img src="../../assets/images/chengguo 2@2x.png" alt />
                  <span>成果模板</span>
                </div>
              </div>
              <div class="conterInfo">
                <div>
                  <div style="white-space:pre-wrap">
                    <ul class="list">
                      <li v-for="(item, index) in contentMsg[index]" :key="index">{{item}}</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div style="white-space:pre-wrap" class="bg_F8F8F8">
                    <ul class="listBorder">
                      <li
                        class="listBorderItem"
                        v-for="(text,key) in contentData[index].work_guideline"
                        :key="key"
                      >
                        <span>{{text}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="templates">
                  <a
                    class="accessory"
                    v-for="(file,ix) in item.fileList"
                    :key="ix"
                    :href="local+file.url"
                    target="_blank"
                  >
                    <img
                      v-if="file.FileNameSuffix.includes('ppt')||file.FileNameSuffix.includes('pptx')"
                      class="accessoryIMG"
                      src="../../assets/images/ppt-2 2@2x.png"
                      alt
                    />
                    <img
                      v-else-if="file.FileNameSuffix.includes('doc')||file.FileNameSuffix.includes('txt')"
                      class="accessoryIMG"
                      src="../../assets/images/word-7 2@2x.png"
                      alt
                    />
                    <img
                      v-else-if="file.FileNameSuffix.includes('xls')||file.FileNameSuffix.includes('xlsx')"
                      class="accessoryIMG"
                      src="../../assets/images/excel-5备份 2@2x.png"
                      alt
                    />
                    <img v-else class="accessoryIMG" src="../../assets/images/word-7 2@2x.png" alt />
                    {{file.name}}
                    <span class="isShow">
                      <img src="../../assets/images/xiazai-3 2@2x.png" alt />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import {
  projectSelect,
  planContent,
  selectPlanNode,
  queryfile,
  nodeControl
} from "@/api/firstPlan";
import {getCookie} from "@/utils/cookie"
export default {
  data() {
    return {
      showDilog: false,
      searchVal: "",
      activePanel: [],
      treeData: [],
      nowCity: "",
      nowArea: "",
      nowProject: "",
      project_id: "",
      defaultProps: {
        children: "children",
        label: "name"
      },
      groupValue: "",
      areaValue: "",
      projectValue: "",
      contentData: [],
      contentData: [],
      contentMsg: [],
      workGuide: [],
      routeList: [
        "",
        "getLand",
        "setFirst",
        "setSecond",
        "threeMonth",
        "twoMonth",
        "twentyOneDays",
        "sevenDays",
        "opening",
        "afterAMonth",
        "salesOffice",
        "modelDistrict",
        "modelHouses"
      ]
    };
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
    }
  },
  filters: {
    filterTime(date) {
      if (!date) {
        return "";
      }
      let val = new Date(date);
      if(val=='Invalid Date'){
        return date
      }
      var Y = val.getFullYear();
      var M = val.getMonth() + 1;
      var D = val.getDate();
      var H = val.getHours();
      var MI = val.getMinutes();
      var S = val.getSeconds();
      return Y + "年" + M + "月" + D + "日";
    }
  },
  created() {
    console.log(this.$route);

    this.getProject();

  },
  methods: {
    getProject() {
      projectSelect({
        name: this.searchVal
      }).then(res => {
        let defaultItem = JSON.parse(localStorage.getItem("nowProject"));
        if (!defaultItem) {
          if ((this.nowArea = res.result[0])) {
            this.nowArea = res.result[0].name;
          }
          if (res.result[0].children[0]) {
            this.nowCity = res.result[0].children[0].name;
          }
          if ((this.nowProject = res.result[0].children[0].child[0])) {
            this.nowProject = res.result[0].children[0].child[0].name;
            this.project_id = res.result[0].children[0].child[0].ID;
          }
          localStorage.setItem(
            "nowProject",
            JSON.stringify({
              nowArea: this.nowArea,
              nowCity: this.nowCity,
              nowProject: this.nowProject,
              project_id: this.project_id
            })
          );
        } else {
          let { nowArea, nowCity, nowProject, project_id } = defaultItem;
          this.nowArea = nowArea;
          this.nowCity = nowCity;
          this.nowProject = nowProject;
          this.project_id = project_id;
        }
        res.result.forEach(item => {
          item.children.forEach(obj => {
            obj.children = obj.child;
          });
        });
        this.treeData = res.result;
        this.reload();
      });
    },
    reload() {
      this.$store.state.user.firstPlanItem = this.nowProject;
      planContent({
        project_id: this.project_id
      }).then(res => {
        if (res.data.mapContent) {
          let data = res.data.mapContent || [];
          if (!data[0].plan_end_time) {
            this.$data.contentData = data.sort((a, b) => {
              if (Number(a.node_order) > Number(b.node_order)) {
                return 1;
              } else if (Number(a.node_order) < Number(b.node_order)) {
                return -1;
              } else {
                return 0;
              }
            });
          } else {
            this.$data.contentData = data.sort((a, b) => {
              if (Number(a.plan_end_time) > Number(b.plan_end_time)) {
                return 1;
              } else if (Number(a.plan_end_time) < Number(b.plan_end_time)) {
                return -1;
              } else {
                return 0;
              }
            });
          }
          this.$data.contentData.forEach(item => {
            if(item.work_guideline){
            item.work_guideline = item.work_guideline.split("@_@");
            }else{
              item.work_guideline=[]
            }
          });
        } else {
          this.$data.contentData = [];
        }
        console.log(this.contentData, "contentData");

        this.contentData.forEach((item, index) => {
          this.$data.contentMsg.push(item.work_content.split("@_@"));
        });
      });
    },
    hidePopover() {
      this.showDilog = false;
    },
    panelChange(val) {},
    treeClick(data) {
      if (data.Levels == 99) {
        this.project_id = data.ID;
        this.treeData.forEach(lv1 => {
          lv1.children.forEach(lv2 => {
            lv2.children.forEach(lv3 => {
              if (lv3.ID == data.ID) {
                this.nowCity = lv2.name;
                this.nowArea = lv1.name;
                this.$store.state.user.firstPlanItem = lv3.name;
                this.nowProject = lv3.name;
                console.log(lv3);
                localStorage.setItem(
                  "nowProject",
                  JSON.stringify({
                    nowArea: lv1.name,
                    nowCity: lv2.name,
                    nowProject: lv3.name,
                    project_id: lv3.ID
                  })
                );
                this.reload();
              }
            });
          });
        });
        this.$refs.popover.doClose();
      } else if (data.Levels == 1) {
        this.treeData.forEach(lv1 => {
          lv1.children.forEach(lv2 => {
            if (lv2.ID == data.ID) {
              this.nowCity = lv2.name;
              this.nowArea = lv1.name;
              this.nowProject = "";
              this.project_id = "";
            }
          });
        });
      } else if (data.Levels == 0) {
        this.treeData.forEach(lv1 => {
          if (lv1.ID == data.ID) {
            this.nowCity = "";
            this.nowArea = lv1.name;
            this.nowProject = "";
            this.project_id = "";
          }
        });
      }
    },
    searchIcon() {
      this.getProject();
    },
    FomartDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var H = date.getHours();
      var M = date.getMinutes();
      var S = date.getSeconds();
      function Covering(num) {
        return num >= 10 ? num : "0" + num;
      }
      return y + "-" + Covering(m) + "-" + Covering(d);
    },
    panelClick(item, index) {
      console.log(item, index);
      if (item.template_node_id) {
        queryfile({
          id: item.template_node_id
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$set(this.contentData[index], "fileList", res.result);
          }
        });
      }
    },
    toEdit(route, obj, item) {
      let disabled = "disabled";
      if (this.$store.state.user.userPower.includes(`${item.node_name}编制`)) {
        disabled = "";
      } else if (
        this.$store.state.user.userPower.includes(`${item.node_name}查看`)
      ) {
        disabled = true;
        if (obj.plan_approval != 4 && obj.plan_approval != 3) {
          this.$message.warning("当前无可查看版本");
          return;
        }
      }
      if (disabled == "disabled") {
        this.$message.warning("当前用户无查看权限");
        return;
      }
      if (!this.project_id) {
        this.$message.error("请选择项目");
      } else {
        let node_level = item.node_level;
        let plan_node_id = item.plan_node_id;
        let plan_id = item.plan_id;
        nodeControl({
          projectId: this.project_id,
          planNodeId: plan_node_id || "",
          node_order: item.node_order,
          node_level:item.node_level
        }).then(res => {
          console.log(res);
          if (!res.data.power && res.data.read) {
            disabled = true;
          } else if (!res.data.power && !res.data.read) {
            this.$message.error(res.data.error);
            return;
          }
          this.$router.push({
            path: `/${route}`,
            query: {
              project_id: this.project_id,
              plan_id: plan_id || "",
              plan_node_id: plan_node_id || "",
              node_level: node_level || "",
              disabled
            }
          });
        });
      }
    },
    changeColor(status){
      if(status==4){
        return "red"
      }else if(status==5){
        return "red"
      }else {
        return ""
      }
    },
    countsum(obj,name1,name2,name3){
      console.log(obj[name3]);
      if(!obj[name3]){
        return ""
      }
      if(obj[name1]){
        return obj[name1]
      }else if(obj[name3]==5){
        let date= (+new Date() - +new Date(obj[name2]))/86400000
        return "逾期"+Math.floor(date)+"天"
      }else{
        return  ""
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@planWriteTitleSize:14px;
.el-icon-arrow-right {
  color: #000000;
  opacity: 0.4;
}
.el-tree {
  height: 500px;
  max-height: 500px;
  overflow: auto;
}
</style>
<style lang="less" scoped>
.planWrite {
  .img_light {
    height: 18px;
    width: 18px;
    vertical-align: middle;
  }
  background: #f5f5f5;
  ::v-deep .el-collapse-item__header {
    border-bottom: none;
  }
  ::v-deep .el-collapse {
    border-top: none;
    border-bottom: none;
  }
  ::v-deep .el-collapse-item {
    margin-top: 6px;
  }
  ::v-deep .el-collapse-item__header {
    height: 46px !important;
    line-height: 46px;
    border-radius: 6px;
  }
  .containter {
    .planTitle {
      background: #fff;

      height: 60px;
      position: relative;
      .area {
        position: absolute;
        top: 10px;
        left: 20px;
        color: #999999;
        font-size: 14px;
      }

      .project {
        position: absolute;
        bottom: 10px;
        left: 20px;
        color: #333333;
        font-size: 16px;
        font-weight: 700;
      }
      .tips {
        position: absolute;
        right: 25px;
        bottom: 15px;
        font-size: 12px;
        color: #999;
        img {
          margin-left: 15px;
        }
        > i {
          margin-right: 0;
          margin-left: 10px;
          font-size: 14px;
        }
        .icon_edit {
          background: #c4c4c4;
          border-radius: 50%;
          overflow: hidden;
        }
        .icon_remind {
          display: inline-block;
          background: yellow;
          border-radius: 50%;
        }
        ::v-deep .el-icon-edit:before {
          font-size: 12px;
          line-height: 12px;
        }
        .icon_warning {
          display: inline-block;
          background: #ff4853;
          border-radius: 50%;
        }
      }
    }
    .main {
      margin: 10px;
      ::v-deep .el-collapse-item__arrow {
        display: none;
      }
      .panelTitle {
        position: relative;
        width: 100%;
        box-shadow: #000000 0.05;
        img {
          transform: translateY(-3px);
          margin-right: 3px;
        }
        .status {
          color: #333;
          font-size: 16px;
          font-weight: 700;
        }
        .icon_edit {
          background: #c4c4c4;
          border-radius: 50%;
          overflow: hidden;
          text-align: center;
          line-height: 14px;
        }
        .icon_remind {
          display: inline-block;
          background: yellow;
          border-radius: 50%;
        }
        .icon_warning {
          display: inline-block;
          background: #ff4853;
          border-radius: 50%;
        }
        ::v-deep .el-icon-edit:before {
          font-size: 12px;
          line-height: 12px;
        }
        i {
          height: 18px;
          width: 18px;
          font-size: 18px;
        }
        .plan {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 213px;
          width: 200px;
          color: #999999;
          font-size: 14px;
        }
        .target {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 402px;
          width: 200px;
          color: #999999;
          font-size: 14px;
        }
        .postpone{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 602px;
          // width: 180px;
          color: #999999;
          font-size: 14px;
        }
        .aTextColor {
          color: #2761ff;
        }
        ::v-deep .el-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 20px;
        }
      }
      .content {
        margin: 0 20px;
        background-color: #fff;
        border-top: 1px solid rgba(216, 216, 216, 0.34);
        .contentTitle {
          height: 35px;
          line-height: 35px;
          display: flex;
          > div {
            margin-left: 10px;
            flex: 1;
            font-size: 14px;
            font-weight: 600;
            color: #333;
            box-sizing: border-box;
            > img {
              height: 16px;
              width: 18px;
              vertical-align: middle;
              margin-right: 10px;
            }
            ::v-deep > .el-button {
              float: right;
              font-size: 12px;
              color: #215bff;
            }
          }
        }
        .conterInfo {
          display: flex;
          .list li {
            list-style: none;
            border-bottom: 3px dotted #f8f8f8;
          }
          .listBorder li:nth-of-type(odd) {
            list-style: none;
            background: #f8f8f8;
          }

          .listBorder .listBorderItem img {
            vertical-align: middle;
            margin-right: 10px;
            width: 20px;
          }
          .listBorder .listBorderItem {
            margin-bottom: 5px;
            display: inline-block;
            width: 100%;
            list-style: none;
          }
          ul li {
            list-style: none;
          }
          .accessory {
            display: inline-block;
            width: 100%;
            margin-bottom: 5px;
            color: #333333;
            span {
              float: right;
              img {
                width: 14px;
                height: 14px;
              }
            }
          }
          .accessory:nth-of-type(odd) {
            background: #f8f8f8;
            width: 100%;
            float: left;
          }
          .accessory .accessoryIMG {
            vertical-align: middle;
            width: 14px;
            height: 16px;
            float: left;
            margin-top: 3px;
          }
          > div {
            flex: 1;
            text-align: left;
            padding: 10px;
            > div {
              > img {
                width: 14px;
                height: 16px;
                vertical-align: middle;
                margin-right: 10px;
              }
              padding-bottom: 10px;
              color: #333;
              font-size: 14px;
            }
          }
          > div:last-child {
            a {
              color: #0079fe;
              font-size: 14px;
              display: block;
              > img {
                width: 14px;
                height: 16px;
                vertical-align: middle;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
    ::v-deep .el-input__inner{
  color: #333333 !important;
  font-size: 14px !important;
}
}
.planWrite .containter .main .content .conterInfo > div:last-child a {
  color: #333333;
}
.isShow {
  display: none;
}
.templates a:hover .isShow {
  display: block;
}
</style>
