Vue.component('offerRename', {
  props: [],
  name:"offerRename",
  template: `
  <div ref="offerRename_H" class="offerRename app-container">
    <el-row class="container">
      <codeAndName :codeAndName="codeAndName"/>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <h3 class="titleText">基本信息</h3>
          </template>
          <div class="content" v-if="!isMobile">
            <div class="data_row">
              <div class="data_col">
                <span>事业部:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input1}}</span>
              </div>
              <div class="data_col">
                <span>项目名称:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input2}}</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>发起人:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input3}}</span>
              </div>
              <div class="data_col">
                <span>发起日期:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input4}}</span>
              </div>
            </div>
          </div>
          <div v-else class="phone_content">
            <p><span>事业部:</span><span>{{input1}}</span></p>
            <p><span>项目名称:</span><span>{{input2}}</span></p>
            <p><span>发起人:</span><span>{{input3}}</span></p>
            <p><span>发起日期:</span><span>{{input4}}</span></p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="titleText">审批要点</h3>
          </template>
          <div class="content contents_raidos">
            <el-row class="lightFather">
              <i class="light" :style="{'background-color':radioList?'green':'red'}"></i>
              <span :style="{'display':radioList?'block':'none'}">直系亲属间更名</span>
              <span :style="{'display':radioList?'none':'block'}">非直系亲属更名</span>
              <!-- {{radioList}} -->
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="titleText">认购信息</h3>
          </template>
          <div class="content" v-if="!isMobile">
            <div class="data_row">
              <div class="data_col">
                <span>客户姓名:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input6}}</span>
              </div>
              <div class="data_col">
                <span>置业顾问:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input7}}</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>房间:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input8}}</span>
              </div>
              <div class="data_col">
                <span>认购日期:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input9}}</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>认购面积:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input10}}㎡</span>
              </div>
              <div class="data_col">
                <span>认购单价:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input11}}元/㎡</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>认购总价:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input12}}元</span>
              </div>
              <div class="data_col">
                <span>已到账金额:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{GetAmount}}</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>成交渠道:</span>
              </div>
              <div class="data_col flex_all">
                <span>{{Jyqd}}</span>
              </div>
            </div>
          </div>
          <div v-else class="phone_content">
            <p><span>客户姓名:</span><span>{{input6}}</span></p>
            <p><span>置业顾问:</span><span>{{input7}}</span></p>
            <p><span>房间:</span><span>{{input8}}</span></p>
            <p><span>认购日期:</span><span>{{input9}}</span></p>
            <p><span>认购面积:</span><span>{{input10}}㎡</span></p>
            <p><span>认购单价:</span><span>{{input11}}元/㎡</span></p>
            <p><span>认购总价:</span><span>{{input12}}元</span></p>
            <p><span>已到账金额:</span><span>{{GetAmount}}</span></p>
            <p><span>成交渠道:</span><span>{{Jyqd}}</span></p>

          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <h3 class="titleText">更新信息</h3>
          </template>
          <el-row>
            <el-col :span="isMobile?24:12">
              <p class="pText">更名前客户信息</p>
              <div class="more">
                <el-row class="bd_w">
                  <el-row class="bd_bottom">
                    <el-col :span="12" class="bd_left">姓名</el-col>
                    <el-col :span="12" class="bd_left bd_r">认知途径</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="bd_left">
                      <span>{{input16}}</span>
                    </el-col>
                    <el-col :span="12" class="bd_left bd_r">
                      <span>{{OldMainMediaName}}</span>
                    </el-col>
                  </el-row>
                </el-row>
              </div>
            </el-col>
            <el-col :span="isMobile?24:12">
              <p class="pText">更名后客户信息</p>
              <div class="more">
                <el-row class="bd_w">
                  <el-row class="bd_bottom">
                    <el-col :span="12" class="bd_left">姓名</el-col>
                    <el-col :span="12" class="bd_left bd_r">认知途径</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="bd_left">
                      <span>{{input17}}</span>
                    </el-col>
                    <el-col :span="12" class="bd_left bd_r">
                      <span>{{MainMediaName}}</span>
                    </el-col>
                  </el-row>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <h3 class="titleText">更名原因</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">更名类型:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{AlterType}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">变更原因:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{input19}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="24">
                <el-row>
                  <el-col :span="isMobile?8:4" class="bd_n">更名费:</el-col>
                  <el-col :span="isMobile?16:20" class="bd_n bd_r">
                    <span>{{RenamingFee}}元</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w" style="border-left:1px solid #ccc">
              <el-col :span="24">
                <el-row>
                  <el-col :span="isMobile?8:4" style="border:none;border-right:1px solid #ccc" class="bd_n">原因说明:</el-col>
                  <el-col :span="isMobile?16:20" class="bd_n bd_r">
                    <div style="word-wrap:break-word;" v-html="input21"></div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <h3 class="titleText">附件</h3>
          </template>
          <div class="content">
            <div class="footer">
              <ul class="footer_list">
                <li v-for="(item,index) in ATTACHMENTS" :key="index">
                  <a :href="item.URL">{{item.FILENAME}}</a>
                </li>
              </ul>
            </div>
          </div>

        </el-collapse-item>
      </el-collapse>
    </el-row>
    <Buttons />
  </div>
  `,
  computed: {
    radioList() {
      if (this.AlterType == "直系亲属更名") {
        return true;
      }
      return this.AlterType == "直系亲属间更名" ? true : false;
    }
  },
  data() {
    return {
        codeAndName:[],

      ATTACHMENTS: [],
      isMobile: width <= 1024,
      list: [
        {
          title: "基本信息",
          type: "transverse",
          formList: [
            {
              title: "事业部",
              type: "input",
              name: "input"
            },
            {
              title: "事业部",
              type: "select",
              name: "select",
              options: [
                {
                  label: "选项1",
                  value: 1
                },
                {
                  label: "选项2",
                  value: "2"
                }
              ]
            },
            {
              title: "radio",
              type: "radio",
              options: [
                {
                  label: "选项1",
                  value: "1"
                },
                {
                  label: "选项2",
                  value: "2"
                }
              ]
            }
          ]
        },
        {
          title: "基本信息2",
          formList: [
            {
              title: "事业部",
              type: "input",
              name: "input2"
            }
          ]
        },
        {
          title: "基本信息3",
          formList: [
            {
              title: "事业部",
              type: "input",
              name: "input3"
            }
          ]
        }
      ],
      values: {
        input: 123,
        select: 1,
        input2: 12,
        input3: 1,
        radio: 2
      },
      activeNames: ["1", "2", "3", "4", "5", "6"],
      value1: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
      input9: "",
      input10: "",
      input11: "",
      input12: "",
      input13: "",
      Jyqd: "",
      GetAmount: "",
      input16: "",
      input17: "",
      AlterType: "",
      input19: "",
      RenamingFee: "",
      input21: "",
      input22: "",
      OldMainMediaName: "",
      input24: "",
      MainMediaName: ""
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    getInfo() {
      examineInfo({
        json_id: this.$route.query.BOID
      }).then(res => {
          this.codeAndName=res.result
        let json = JSON.parse(res.result[0].flow_json);
        console.log(json);
        this.input1 = json.BName;
        this.input2 = json.ProjectFullName;
        this.input3 = json.UserName;
        this.input4 = json.ApplyDate;
        this.input5 = "";
        this.input6 = json.CstName;
        this.input7 = json.Zygw;
        this.input8 = json.RoomInfo;
        this.input9 = json.QSDate;
        this.input10 = json.BldArea;
        this.input11 = json.CjBldPrice;
        this.input12 = json.CjRmbTotal;
        this.input13 = " ";
        this.Jyqd = json.Jyqd;
        this.GetAmount = json.GetAmount;
        this.input16 = json.OldName;
        this.input17 = json.NewName;
        this.AlterType = json.AlterType;
        this.input19 = json.AlterReason;
        this.input21 = json.Reason;
        this.OldMainMediaName = json.OldMainMediaName;
        this.MainMediaName = json.MainMediaName;
        this.RenamingFee = json.RenamingFee;

        if (json.ATTACHMENTS) {
          if (
            Object.prototype.toString.call(json.ATTACHMENTS.Item) ==
            "[object Array]"
          ) {
            json.ATTACHMENTS.Item.forEach(item => {
              this.ATTACHMENTS.push({
                FILENAME: item.FILENAME,
                URL: item.URL
              });
            });
          } else {
            let obj = {
              URL: json.ATTACHMENTS.Item.URL,
              FILENAME: json.ATTACHMENTS.Item.FILENAME
            };
            this.ATTACHMENTS = [obj];
          }
        }
      });
    }
  },
  created() {
    this.getInfo();
    /*
      //加载周计划程序已加载至2028年如果需要重新初始化打开注释重新发送，发送结束后请注释掉一下的代码
      let sendList=[];
      for(let i=2018;i<=2028;i++){
        for(let j=1;j<=12;j++){
          sendList.push(...weekPlanSort(`${i}-${j}-01`,true));
        }
      }
      sendJSONAllPath('http://192.168.34.66:8001/weekRule/getCommonWeekRule',{_param:sendList}); */
  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.offerRename_H.offsetHeight
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
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.offerRename_H.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  }
});


Vue.component('codeAndName', {
  name:"codeAndName",
  props: {
    codeAndName: {
      type: Array,
      default: [
        {}
      ]
    }
  },
  template: `
  <div class="codeAndName">
    <span>流程编号:</span>
    <span class="appcode">{{appcode}}</span>
    <span>发起日期:</span>
    <span>{{appname}}</span>
  </div>
  `
});

Vue.component('Buttons', {
  props: [],
  name:"Buttons",
  template: `
<div class="buttonBox" v-if="buttonflag">
<el-button type="primary" v-if="isShowDiscard" @click="discard">废弃</el-button>
<el-button type="primary" v-if="isPreview" @click="preview">查看审批</el-button>
</div>
  `,
  data() {
    return {
      flow_id: "",
      buttonflag: false,
      isShowDiscard: true,
      isPreview:true
    };
  },
  methods: {
    discard() {
      this.$confirm(
        "此操作将废弃该流程,若还需重复发起该流程请勿进行此操作, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          if(this.$route.query.taskId){
               get(`/WorkflowChoose/end?instanceId=${this.flow_id}`).then(res => {
            if (res.code == 200) {
              this.isShowDiscard = false;
              this.$message.success('作废成功');
            }
          });
          }else{
               get(`WorkflowChoose/delete?instanceId=${this.flow_id}`).then(res => {
              this.isShowDiscard = false;
              this.$message.success('作废成功');
              window.close()
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    preview() {
      toHistoryUrl({
        proInstId: this.flow_id
      }).then(res => {
        console.log(res);
        window.open(res.data);
      });
    }
  },
  created() {
    if (
      localStorage.getItem("expiration") &&
      new Date().getTime() > localStorage.getItem("expiration")
    ) {
      window.localStorage.removeItem("token");
    }
    // if (this.$route.query.taskId) {
      queryFlowId({}, this.$route.query.BOID).then(res => {
        if (res.code == 200) {
          if (this.$route.query.taskId) {
            this.buttonflag = true;
          }
          if (res.data.flow_status == 7) {
            this.isShowDiscard = false;
          }else if(res.data.flow_status == 2&&this.$route.query.action==="modify"){
            this.buttonflag = true;
            this.isShowDiscard = true;
            this.isPreview=false
          }
          console.log(res.data)
          this.flow_id = res.data.flow_id;
        }
      });
  }
});


