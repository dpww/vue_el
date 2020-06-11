<template>
  <div class="app-container">
    <div class="container-header">
      <div class="project-input">
        <div class="rule-introduce">基本信息</div>
        <el-form ref="form" :model="form" label-width="170px">
          <el-row :gutter="20">
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="姓名：">
                  <el-input v-model="customerName" placeholder="" disabled />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="性别：">
                  <el-input v-model="customerGender" placeholder="" disabled />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="电话：">
                  <el-input v-model="customerMobile" placeholder="" disabled />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="证件类型：">
                  <el-input v-model="customerCardTypeDesc" placeholder="" disabled />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="证件号码：">
                  <el-input v-model="customerCardNum" placeholder="" disabled />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="标签：">
                  <el-input v-model="label" placeholder="" disabled />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="project-input" style="margin-top:12px;">
        <div class="rule-introduce">报备信息</div>

        <el-form ref="form" :model="form" label-width="170px">
          <el-row :gutter="20">
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="报备人：">
                  <el-input v-model="reportUserName" placeholder="" disabled />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="电话：">
                  <el-input v-model="reportMobile" placeholder="" disabled />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="所属团队：">
                  <el-input v-model="reportTeamName" placeholder="" disabled />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="预计到访时间：">
                  <el-input v-model="expectedVisitDate" placeholder="" disabled />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="意向等级：">
                  <el-input v-model="level" placeholder="" disabled />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="认知途径：">
                  <el-input v-model="salesVisitExpireDate" placeholder="" disabled />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="备注：">
                  <el-input v-model="remarks" placeholder="" disabled />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="project-input project-input-style">
        <div class="rule-introduce">节点记录</div>
        <div class="el-step-vertical el-step-div">
          <el-steps direction="vertical" :active="1">
            <el-step v-for="(item,index) in elstep" :key="index"  :title="item.followUpWay" :description="item.employeeName"></el-step>
          </el-steps>
        </div>

        <div class="btn el-button-style-node">
          <el-button class="anNiu one" @click='dealDrawer' style="display: none;">交易信息</el-button>
          <!--<el-button class="anNiu two" @click="hisFirstDrawer">首访问卷</el-button>
          <el-button class='anNiu three' @click="referralDrawer">转介记录</el-button>-->
        </div>

      </div>

      <!-- 表格 -->
      <div class="e-el-row" :style="height">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <div :style="heightleft" class="etablediv">
                <el-table :data="tableData" class="table-list etable">
                   <el-table-column label="序号" width="140">
                     <template slot-scope="scope">
                       <span>{{ scope.row.rownum }}</span>
                     </template>
                  </el-table-column>

                  <el-table-column label="跟进时间">
                    <template slot-scope="scope">
                      <span>{{ scope.row.followUpDate }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="跟进方式">
                    <template slot-scope="scope">
                      <span>{{ scope.row.followUpWay }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="跟进内容">
                    <template slot-scope="scope">
                      <span>{{ scope.row.followUpDetail }}</span>
                    </template>
                  </el-table-column>

                </el-table>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="page-submit">
          <!-- 保存取消 -->
         <!-- <div class="form-btn">
            <el-row>
              <el-button type="primary" @click="updateRule">保存</el-button>
              <el-button type="info" plain>取消</el-button>
            </el-row>
          </div>-->
          <!-- 分页 -->
          <!--<div class="block">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[2, 4, 8, 10,20]"
            :page-size="2"
            :pager-count="3"
            layout=" sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
          </div>-->
        </div>
      </div>

      <!-- 弹框: 第一个: 交易信息 -->
      <el-drawer title="交易信息" :visible.sync="dealDrawerShow" direction="rtl" size="40%">
        <div class="dealInfo">
          <div class="dealInfo_title">房号: 旭辉城32号楼1单元101室</div>
          <el-row>
            <el-col class="dealBoder" :span='8'>成交面积(m²): 100.00</el-col>
            <el-col class="dealBoder" :span='8'>成交金额(元): 2.000.000.00</el-col>
            <el-col class="dealBoder" :span='8'>实收款(元): 1.000.000.00</el-col>
          </el-row>
        </div>
        <div class="dealInfo">
          <div class="dealInfo_title">房号: 旭辉城32号楼1单元101室</div>
          <el-row>
            <el-col class="dealBoder" :span='8'>成交面积(m²): 100.00</el-col>
            <el-col class="dealBoder" :span='8'>成交金额(元): 2.000.000.00</el-col>
            <el-col class="dealBoder" :span='8'>实收款(元): 1.000.000.00</el-col>
          </el-row>
        </div>
        <div class="dealInfo">
          <div class="dealInfo_title">房号: 旭辉城32号楼1单元101室</div>
          <el-row>
            <el-col class="dealBoder" :span='8'>成交面积(m²): 100.00</el-col>
            <el-col class="dealBoder" :span='8'>成交金额(元): 2.000.000.00</el-col>
            <el-col class="dealBoder" :span='8'>实收款(元): 1.000.000.00</el-col>
          </el-row>
        </div>
      </el-drawer>
      <!-- 弹框: 第二个: 首访问卷 -->
      <el-drawer title="首访问卷" :visible.sync="hisFirstDrawerShow" direction="rtl" size="40%">
        <div class="dealInfo">
          <div class="dealInfo_title">个人信息</div>
          <el-row>
            <el-col class="dealBoder" :span='8'><em>年龄段: </em><span v-model="AgeGroupDesc"></span></el-col>
            <el-col class="dealBoder" :span='8'><em>工作区域: </em><span>闵行区</span></el-col>
            <el-col class="dealBoder" :span='8'><em>所属行业: </em><span>金融</span></el-col>
          </el-row>
          <el-row>
            <el-col class="dealBoder" :span='8'><em>生活区域: </em><span>浦东区</span></el-col>
            <el-col class="dealBoder" :span='8'><em>家庭结构: </em><span>单身(1人)</span></el-col>
            <el-col class="dealBoder" :span='8'><em>家庭收入: </em><span>年收入10万以下</span></el-col>
          </el-row>
        </div>

        <div class="dealInfo">
          <div class="dealInfo_title">置业信息</div>
          <el-row>
            <el-col class="dealBoder" :span='8'><em>置业目的: </em><span>居住</span></el-col>
            <el-col class="dealBoder" :span='8'><em>置业次数: </em><span>1</span></el-col>
            <el-col class="dealBoder" :span='8'><em>现居住房型: </em><span>1房</span></el-col>
          </el-row>
          <el-row>
            <el-col class="dealBoder" :span='8'><em>意向面积: </em><span>70平米以下</span></el-col>
            <el-col class="dealBoder" :span='8'><em>意向楼层: </em><span>高层</span></el-col>
            <el-col class="dealBoder" :span='8'><em>接收单价: </em><span></span></el-col>
          </el-row>
          <el-row>
            <el-col class="dealBoder" :span='8'><em>是否具备购房资格: </em><span>是</span></el-col>
            <el-col class="dealBoder" :span='8'><em>买点: </em><span>公寓; 环境; 价格</span></el-col>
            <el-col class="dealBoder" :span='8'><em>抗性: </em><span>面积; 户型; 交通</span></el-col>
          </el-row>
          <div class="dealInfo_title">备注: </div>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
      </el-drawer>
      <!-- 弹框: 第三个: 转介记录 -->
      <el-drawer title="转介记录" :visible.sync="referralDrawerShow" direction="rtl" size="40%">
        <el-table :data="referralData" height="400" border style="width: 100%">
          <el-table-column label="序号" type='index'></el-table-column>
          <el-table-column prop="confirmTime" label="接手时间" ></el-table-column>
          <el-table-column prop="salesName" label="置业顾问"></el-table-column>
          <el-table-column prop="reason" label="接手方式"></el-table-column>
          <el-table-column prop="confirmPersonName" label="操作人/审核人"></el-table-column>
        </el-table>
      </el-drawer>
    </div>
  </div>
</template>

<script>
  import { essentialInformation, followUpRecord, toMoveRecord, nodeRecord, firstInterviewQuestionnaire } from "@/api/table";

  export default {
    filters: {
      toTime(val) {
        //{y}-{m}-{d} {h}:{i}:{s}
        if(val==undefined || val==='' || val===null){
          return '';
        }
        return parseTime(val, '{y}-{m}-{d}');
      }
    },
    data() {
      return {
        elstep:[
          {followUpWay:'',employeeName:''}
        ],
        height: {
          height: ""
        },
        heightleft: {
          height: ""
        },
        arry: [[]],
        activeNames: ["1"],
        options: [
          {
            value: 0,
            label: "是"
          },
          {
            value: 1,
            label: "否"
          }
        ],
        standbyMode: "",
        standbyModes: [
          {
            value: 0,
            label: "隐号"
          },
          {
            value: 1,
            label: "全号"
          }
        ],
        tableData: [],
        currentPage: 1,
        pageSize: 2,
        total: 10,
        projectId: localStorage.getItem("pojid"),
        projectClueId: this.$route.query.projectClueId,
        opportunityClueId: this.$route.query.opportunityClueId,
        customerName:"",
        customerGender:"",
        customerMobile:"",
        customerCardTypeDesc:"",
        customerCardNum:"",
        label:"",
        salesAttributionName:"",
        sourceTypeDesc:"",
        theFirstVisitDate:"",
        salesTheLatestFollowDate:"",
        salesVisitExpireDate:"",
        reportUserName: "", // 报备人姓名
        reportMobile:"",// 报备人电话
        reportTeamName: "", // 报备人团队
        expectedVisitDate: "",//预计到访时间
        level:"",//意向等级
        mainMediaName:"",//认知途径（媒体大类和媒体子类合为认知途径）
        nodeTitle:"", // 节点记录标题
        remarks:"", // 备注
        dealDrawerShow: false,
        hisFirstDrawerShow: false,
        referralDrawerShow: false,
        referralData: [{
          confirmTime: '', // 接手时间
          salesName: '',  // 置业顾问
          confirmPersonName: '', // 操作人
          reason: '' // 接收方式
        }],
      //  首访问卷
        AgeGroupDesc:"",
        associatelist: [{
          Mobile: "",
          Address: "",
          name: "",
          Gender: "",
          cardTypeName: ""
        }]
      };
    },
    created() {
      this.hh();
      this.essentialInformation();
      this.followUpRecord();
      this.toMoveRecord();
      this.nodeRecord();
      this.firstInterviewQuestionnaire();
    },
    methods: {
      // 交易信息
      dealDrawer(){
        this.dealDrawerShow = true;
      },
      // 首访问卷
      hisFirstDrawer(){
        this.hisFirstDrawerShow = true;
      },
      // 转介记录
      referralDrawer(){
        this.referralDrawerShow = true;
      },
      // 获取高度
      hh() {
        this.height.height = window.innerHeight - 400 + "px";
        this.heightleft.height = window.innerHeight - 500 + "px";
      },
      // 折叠菜单
      handleChange(val) {
        console.log(val);
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },

      //基本信息
      essentialInformation(){
        essentialInformation({
          projectClueId:this.projectClueId
        }).then(res => {
          console.log("asd")
          console.log(res)
          this.customerName = res.result.customerName;
          this.customerGender = res.result.customerGender;
          this.customerMobile = res.result.customerMobile;
          this.customerCardTypeDesc = res.result.customerCardTypeDesc;
          this.customerCardNum = res.result.customerCardNum;
          this.label = res.result.label;
          this.salesAttributionName = res.result.salesAttributionName;
          this.sourceTypeDesc = res.result.sourceTypeDesc;
          this.theFirstVisitDate = res.result.theFirstVisitDate;
          this.salesTheLatestFollowDate = res.result.salesTheLatestFollowDate;
          this.salesVisitExpireDate = res.result.salesVisitExpireDate;
          this.reportUserName = res.result.reportUserName;
          this.reportTeamName = res.result.reportTeamName;
          this.expectedVisitDate = res.result.expectedVisitDate;
          this.level = res.result.level;
          this.mainMediaName = res.result.mainMediaName+"-"+res.result.subMediaName;
          this.remarks = res.result.remarks;
          this.reportMobile = res.result.reportMobile;
        })
      },
      followUpRecord(){
        followUpRecord({
          projectClueId:this.projectClueId
        }).then(res => {
          this.tableData = res.result;
        })
      },
      toMoveRecord(){
        toMoveRecord({
          projectClueId:this.projectClueId
        }).then(res => {
          res.result.forEach(item=>{
            if(item.type==1){
              item.reason = `${item.note}`;
            }
          })
          this.referralData = res.result;
        })
      },
      nodeRecord(){
        nodeRecord({
          projectClueId:this.projectClueId
        }).then(res => {
          res.result.forEach(item=>{
            if(item.orgName === undefined || item.orgName===""){
              item.orgName = "置业顾问";
            }
            item.followUpWay=`${item.followUpWay}${item.followUpDate}`;
            item.employeeName=`${item.orgName}${item.employeeName}${item.followUpDetail}`;
          })
          this.elstep = res.result;
        })
      },
      firstInterviewQuestionnaire(){
        firstInterviewQuestionnaire({
          opportunityClueId:this.opportunityClueId
        }).then(res => {
          console.log(res.result);
        })
      }
    }
  };
</script>
<style scoped>
  .project-input-style{
    position: relative;
  }
  .project-input-style .el-steps--vertical{
    min-height: 100px !important;
  }
  .el-button-style-node{
    position: absolute !important;
    bottom: 30px !important;
    left: 30% !important;
    transform: translate(-0%,-0%);
  }
  .el-button-style-node button{
    background: #2761FF;
    color: #fff;
  }
</style>
<style  lang='less' scoped>
  .el-drawer__header{
    font-size: 16px;
    color: #000;
  }
  .dealInfo{
    padding: 0 15px;
    margin-bottom: 20px;
    .dealInfo_title{
      font-size: 14px;
      margin-bottom: 10px;
    }
    .dealBoder{
      height: 30px;
      line-height: 30px;
      border: 1px solid #ccc;
      border-radius: 0px !important;
      em{
        font-style: normal;
      }
    }
  }
  textarea{
    width: 100%;
    resize: none;
    padding: 10px;
  }
  .el-step-div{
    padding-left: 8px !important;
  }

  .el-step-vertical{
    padding: 20px 0;
    height: auto;
  }
  .el-form-item {
    margin-bottom: 4px !important;
  }
  .project-input {
    clear: both;
    width: 100%;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #f0f0f0;
    box-shadow: 0 0 8px #ebeef5;
    position: relative;
    .el-step__title.is-process{
      font-weight: 500;
    }
    .el-step__title.is-wait{
      color: #303133;
    }
    .el-step__description.is-wait{
      color: #303133;
    }
    .el-step__head.is-wait{
      border-color:#303133;
      color: #303133;
    }
  }
  /*.btn .anNiu{*/
    /*position: absolute;*/
    /*height: 30px;*/
    /*font-size: 14px;*/
    /*background-color: #2761FF;*/
    /*color: #fff;*/
  /*}*/
  /*.btn .one {*/
    /*position: absolute;*/
    /*left: 350px;*/
    /*top: 110px;*/
  /*}*/
  /*.btn .two {*/
    /*position: absolute;*/
    /*left: 230px;*/
    /*top: 110px;*/
  /*}*/
  /*.btn .three {*/
    /*position: absolute;*/
    /*left: 120px;*/
    /*top: 110px;*/
  /*}*/
</style>
<style src="@/assets/css/rules.css" scoped>
</style>
