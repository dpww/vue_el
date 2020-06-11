<template>
  <div class="discount">
    <process-form title="一揽子折扣政策编制" :formlist="list" :value="value" :defaultOpenTree="defaultOpen" :btns="btns" labelwidth="210px"></process-form>
    <el-dialog title="请选择政策楼栋" :visible.sync="dialogFormVisible">
      <el-form>
        <el-tree ref="floor" :default-checked-keys="defaultCheckeds" :data="floorInfo" :props="{label:'building_name',children:'buildData'}" node-key="building_id" show-checkbox></el-tree>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getSelectedFloor">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  import {sendJSON,get} from "@/api/request.js";
  import {getDetails} from "@/api/commentpublic";


  export default {
    components: {
      processForm:()=>import("@/views/component/formV2.vue")
    },
    methods:{
      /* 获取项目信息*/
      getProject(){
        sendJSON("/package/getProjects",{userId:localStorage.getItem('id')}).then(res=>{
          this.$set(this.list[0].inputList[3],'options',res.result.map(item=>({label:item.ProjectName,value:item.projectId})));
        });
      },
       // 获取一揽子分期
     getInstallMentLsit(){
       if(this.jizhouId){
         getDetails({
          baseId:this.jizhouId
        }).then(res=>{
          this.value.applicantName=res.data.basicInfo.applicantName||localStorage.getItem('employeeName')
          this.value.applicantId=res.data.basicInfo.applicantId||localStorage.getItem('id')
          this.value.departmentName=res.data.basicInfo.departmentName||JSON.parse(localStorage.getItem('userInfo')).job.JobDesc.split("-")[JSON.parse(localStorage.getItem('userInfo')).job.JobDesc.split("-").length-1]
          this.value.departmentId=res.data.basicInfo.departmentId
          this.value.applicantTime=new Date(res.data.basicInfo.applicantTime).getAppointedFormatTime("YYYY-MM-DD hh:mm:ss")
          this.value.projectName=res.data.basicInfo.projectName
          this.value.projectId=res.data.basicInfo.projectId
          this.value.itemName=res.data.basicInfo.itemName||""
          this.value.stageType=res.data.basicInfo.stageType
          this.value.stageDataType=res.data.basicInfo.stageDataType
          this.value.profitNetprofit=res.data.basicInfo.profitNetprofit
          this.value.startTime=new Date(res.data.basicInfo.startTime).getAppointedFormatTime("YYYY-MM-DD hh:mm:ss")
          this.value.endTime=new Date(res.data.basicInfo.endTime).getAppointedFormatTime("YYYY-MM-DD hh:mm:ss")
          this.value.basePolicy=res.data.basicInfo.basePolicy
          this.value.allLossPrice=res.data.basicInfo.allLossPrice
          this.value.numTotal=res.data.basicInfo.numTotal
          this.value.policyInfo=res.data.itemInfo
          this.value.content=res.data.basicInfo.content
          this.projectId=res.data.basicInfo.projectId
          this.getInfo=res.data
        })
       }else{
          this.value.applicantName=localStorage.getItem('employeeName')
          this.value.applicantId=localStorage.getItem('id')
          this.value.departmentName=JSON.parse(localStorage.getItem('userInfo')).job.JobDesc.split("-")[JSON.parse(localStorage.getItem('userInfo')).job.JobDesc.split("-").length-1]
          this.value.applicantTime=new Date().getAppointedFormatTime("YYYY-MM-DD hh:mm:ss")
          this.value.startTime=new Date().getAppointedFormatTime("YYYY-MM-DD hh:mm:ss")
          this.value.endTime=new Date().getAppointedFormatTime("YYYY-MM-DD hh:mm:ss")
          this.value.numTotal="0"
          this.value.policyInfo=[]
          this.getInfo={
            itemInfo:[]
          }
       }

     },
      /* 获取楼栋信息*/
      getFloor(index){
        if(this.projectId){
          sendJSON("/package/getBuildingAndFormatsData",{projectId:this.projectId}).then(res=>{
            if(res.result.code==200){
              this.floorInfo=[{building_name:res.result.data.projectName,building_id:this.projectId,buildData:res.result.data.buildAndFormat}];
              this.defaultCheckeds=[]
              if(this.getInfo.itemInfo.length>0){
                 this.getInfo.itemInfo[index].buildData.forEach(item=>{
                this.defaultCheckeds.push(item.building_id)
              })
              }
              this.dialogFormVisible = true;
            }
          })
        }else{
          this.$message.error("请先选择项目");
        }
      },
      /* 获取已选楼栋*/
      getSelectedFloor(){
        this.example.next(this.$refs.floor.getCheckedNodes());//获取已选楼栋
        this.dialogFormVisible = false;
      },
      selectFloor:function*(value,params){
        let selectedFloor=yield this.getFloor(params.index);
        /* 向默认展开项中添加默认展开的元素*/
        this.defaultInfo.splice(params.index,1,selectedFloor.map(item=>item.building_id));
        //设置已选项的字符串
        let type='';
        selectedFloor.forEach((item,index)=>{type+=(index!=0?',':'')+item.building_name;});
        value.buildingType=type;
        value.building=selectedFloor.map(item=>({building_name:item.building_name,building_id:item.building_id}));
      }
    },
    created(){
      this.getProject();
      this.getInstallMentLsit()
    },
    data() {
      let _self=this;
      return {
        jizhouId:this.$route.query.BOID,
        defaultCheckeds:[],
        projectId:'',//项目Id
        dialogFormVisible: false,//dialog
        floorInfo:[],
        defaultInfo:[],
        defaultIndex:0,
        defaultOpen:[0,1,2,3,4,5],
        generExample:'',
        baseId:"",
        userId:JSON.parse(localStorage.getItem("userInfo")).username,
        btns:[
          {name:"提交审核",callback(v,l){
             if(this.value.projectName.length<=0||this.value.itemName.length<=0||this.value.basePolicy.length<=0
             ||this.value.allLossPrice.length<=0||this.value.profitNetprofit.length<=0||this.value.startTime.length<=0||this.value.endTime.length<=0){
                this.$message.error("有必填项未填写!")
                return
              }
              else if(this.value.policyInfo.length<=0||this.value.policyInfo.some(item=>item.basePolicy<0||item.itemAllLoss<0||item.itemAllLossNetprofit<0||item.iitemProfitLoss<0||item.iitemNetprofitLoss<0||item.buildingType.trim().length<=0||item.itemNum<0)){
                this.$message.error("请填写楼栋详细信息!")
                return
              }
            let data=JSON.parse(JSON.stringify(v));
            data.applicantTime=new Date(data.applicantTime).getAppointedFormatTime("YYYY-MM-DD");
            data.startTime=new Date(data.startTime).getAppointedFormatTime("YYYY-MM-DD");
            data.endTime=new Date(data.endTime).getAppointedFormatTime("YYYY-MM-DD");
            data.userName=localStorage.getItem("username");
            data.departName=JSON.parse(localStorage.getItem('userInfo')).job.jobfullCode
            data.baseId=_self.baseId
            data.content=this.value.content

            sendJSON("/package/insertPackageDis",data).then(res=>{
              if(res.result.code==200){
                _self.baseId=res.result.data.baseId
                this.$message.success("提交成功");
                if(res.result.data.baseId){
                  get(`/Workflow/MTStart2.aspx?BSID=My_Sales&BTID=My_Package_Dis&BOID=${res.result.data.baseId}&UserID=${_self.userId}&LoginKey=''`)
                  .then(res=>{
                    open(res.data)
                  })
                }else{
                this.$message.error("未获取到审批单id");
                }
              }else{
                this.$message.error(res.result.messages||"提交失败")
              }
            });
          }},
          {
            name:"暂存",callback(v,l){
              if(this.value.projectName.length<=0||this.value.itemName.length<=0||this.value.basePolicy.length<=0
             ||this.value.allLossPrice.length<=0||this.value.profitNetprofit.length<=0||this.value.startTime.length<=0||this.value.endTime.length<=0){
                this.$message.error("有必填项未填写!")
                return
              }
              else if(this.value.policyInfo.length<=0||this.value.policyInfo.some(item=>item.basePolicy<0||item.itemAllLoss<0||item.itemAllLossNetprofit<0||item.iitemProfitLoss<0||item.iitemNetprofitLoss<0||item.buildingType.trim().length<=0||item.itemNum<0)){
                this.$message.error("请填写楼栋详细信息!")
                return
              }
               let data=JSON.parse(JSON.stringify(v));
                data.applicantTime=new Date(data.applicantTime).getAppointedFormatTime("YYYY-MM-DD");
                data.startTime=new Date(data.startTime).getAppointedFormatTime("YYYY-MM-DD");
                data.endTime=new Date(data.endTime).getAppointedFormatTime("YYYY-MM-DD");
                data.userName=localStorage.getItem("username");
                data.departName=JSON.parse(localStorage.getItem('userInfo')).job.jobfullCode
                data.isTs="1"
                data.content=this.value.content

                data.baseId=_self.baseId
                sendJSON("/package/insertPackageDis",data).then(res=>{
              if(res.result.code==200){
                _self.baseId=res.result.data.baseId
                this.$message.success("暂存成功");
              }else{
                this.$message.error(res.result.messages||"暂存失败")
              }
            });
            }
          }
        ],
        value:{
          applicantName:localStorage.getItem('employeeName'),
          applicantId:localStorage.getItem('id'),
          departmentName:localStorage.getItem('JobName'),
          departmentId:localStorage.getItem('ID'),
          applicantTime:new Date().toLocaleDateString().split('/').join('-'),
          projectName:'',
          projectId:'',
          itemName:"",
          basePolicy:'',
          allLossPrice:"",
          profitNetprofit:'',
          startTime:new Date().toLocaleDateString().split('/').join('-'),
          endTime:new Date().toLocaleDateString().split('/').join('-'),
          numTotal:0,
          policyInfo:[],
          content:""
        },
        list: [{
          title: "基础信息",
          mode: 'transverse',
          numbers: 3,
          inputList: [{
              label: '申请人',
              type: "text",
              name: "applicantName",
              disable:true
            },
            {
              label: '申请人部门',
              type: "text",
              name: "departmentName",
              disable:true
            },
            {
              label: '申请时间',
              type: "date",
              name: "applicantTime"
            },
            {
              label: '项目名称',
              type: "select",
              name: "projectId",
              options:[],
              changeEvent(info){

                if(_self.value.policyInfo.length>0){
                  _self.value.policyInfo=[]
                }
                info.options.every(item=>{
                  _self.projectId=info.value;
                  if(item.value===info.value){
                    _self.value.projectName=item.label;
                    return false;
                  }
                  return true;
                })
              }
            }
          ]

        }, {
          title: "政策信息",
          mode: 'transverse',
          numbers: 2,
          inputList: [{
              label: '关键事项名称',
              type: "text",
              name: "itemName"
            },
            {
              label: '破底政策',
              type: "select",
              name: "basePolicy",
              options:[
                {label:"一揽子破底政策审批(3个点以上)",value:"一揽子破底政策审批(3个点以上)"},
                {label:"一揽子破底政策审批(3个点以内)",value:"一揽子破底政策审批(3个点以内)"}
              ],
            },
            {
              label: '整盘货值折损(万元)',
              type: "select",
              name: "allLossPrice",
              options:[
                {label:"整盘货值≥2%折损",value:"整盘货值≥2%折损"},
                {label:"整盘货值<2%折损",value:"整盘货值<2%折损"}
              ],
            },
            {
              label: '战规版利润额or战规版净利率变化',
              type: "select",
              name: "profitNetprofit",
              options:[
                {label:"对标战规版利润额<3000万or战规版净利率<3%折损",value:"对标战规版利润额<3000万or战规版净利率<3%折损"},
                {label:"对标战规版利润额≥3000万or战规版净利率≥3%折损",value:"对标战规版利润额≥3000万or战规版净利率≥3%折损"}
              ],
            },
            {
              label: '时间范围开始',
              type: "date",
              name: "startTime"
            },
            {
              label: '时间范围结束',
              type: "date",
              name: "endTime"
            },
            {
              label: '合计套数',
              type: "text",
              name: "numTotal",
              disable:true
            }
          ]
        }, {
          title: "政策明细",
          mode: 'vertical',
          dataName:['policyInfo'],
          hasIndex:true,
          btns: [
            [{
              name: "添加",
              callback(keys, dataList) {
                dataList.push(keys);
              }
            }]
          ],
          showSummary:[function(params){
            const { columns, data } = params;
            const sums = [];
            const unitList=['itemAllLossNetprofit','iitemNetprofitLoss'];
            columns.forEach((column, index) => {
              if (index === 0) {
                sums[index] = '合计';
                return;
              }
              const values = data.map(item =>{
                return Number(item[column.property])
              } );
              if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                if(unitList.indexOf(column.property)!=-1)
                sums[index] += '%';
              } else {
                sums[index] = '';
              }
            });
            return sums;
          }],
          inputList: [{
              label: '破底政策',
              type: "number",
              name: "basePolicy"
            },
            {
              label: '整盘货值折损',
              type: "number",
              name: "itemAllLoss"
            },
            {
              label: '整盘货值折损率(%)',
              type: "number",
              name: "itemAllLossNetprofit",
            },
            {
              label: '战规版利润额折损（万元）',
              type: "number",
              name: "iitemProfitLoss",

            },
            {
              label: '战规版净利率折损(%)',
              type: "number",
              name: "iitemNetprofitLoss",
            },
            {
              label: '楼栋',
              type: "custom",
              name: "buildingType",
              callback(name,value,params){
                _self.example=_self.selectFloor(value,params);
                _self.example.next();
              }
            },
            {
              label: '套数',
              type: "number",
              name: "itemNum",
              inputEvent(info,value){
                let sum=0
                _self.value.policyInfo.forEach(item=>sum+=parseInt(item.itemNum))
                if(isNaN(sum)){
                  _self.value.numTotal=0+""
                }else{
                  _self.value.numTotal=sum+""
                }
              }
            },
            {
              label: '操作',
              type: "button",
              btns:[
                {
                  name:"删除",callback(key,list){
                    console.log(key.index);
                    _self.value.policyInfo=_self.value.policyInfo.filter((item,index)=>index!=key.index)}
                 }
              ]
            },
            {
              label: '申请正文',
              type: "longTextarea",
              name: "content",
              level: 1,
              numbers: 1,
              mode: 'transverse',
              labelWidth:'90px'
            }
          ]
        }]
      }
    }
  }
</script>

<style lang="less">
    .discount{
    padding-bottom: 45px;
    }
    .el-form>.el-collapse>.el-collapse-item>div[role=tab]{
      display: block!important;
    }
    .el-form>.el-collapse>.el-collapse-item:first-child>div[role=tab], .el-form>.el-collapse>.el-collapse-item:nth-child(2)>div[role=tab] {
          display: block!important;
    }
</style>
