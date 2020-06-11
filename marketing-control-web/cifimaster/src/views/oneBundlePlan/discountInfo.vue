<template>
  <div ref="refGetdis_H">
    <process-form  :formlist="list" :value="value" :defaultOpenTree="defaultOpen" @updated="changeOpen" :readonly="true" labelwidth="210px"></process-form>
  </div>
</template>
<script>
  import {sendJSON} from "@/api/request.js";
  import {getDetails} from "@/api/commentpublic";

  const timeDelay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
  export default {
    name:"discountInfo",
    components: {
      processForm:()=>import("@/views/component/formV2.vue")
    },
    mounted() {
        if (window.cifioa) {
          window.cifioa.sendMessage({
            type: "height",
            height: this.$refs.refGetdis_H.offsetHeight
          });
        } else {
          console.warn("缺少cifioa插件");
        }
      },
    methods:{
      /* 获取项目信息*/
      getInstallMentLsit(){
        getDetails({
          baseId:this.jizhouId
        }).then(res=>{
          this.value.applicantName=res.data.basicInfo.applicantName||localStorage.getItem('employeeName')
          this.value.applicantId=res.data.basicInfo.applicantId||localStorage.getItem('id')
          this.value.departmentName=res.data.basicInfo.departmentName||JSON.parse(localStorage.getItem('userInfo')).job.JobDesc.split("-")[JSON.parse(localStorage.getItem('userInfo')).job.JobDesc.split("-").length-1]
          this.value.departmentId=res.data.basicInfo.departmentId
          this.value.applicantTime=new Date(res.data.basicInfo.applicantTime).getAppointedFormatTime("YYYY-MM-DD")
          this.value.projectName=res.data.basicInfo.projectName
          this.value.projectId=res.data.basicInfo.projectId
          this.value.itemName=res.data.basicInfo.itemName||""
          this.value.stageType=res.data.basicInfo.stageType
          this.value.basePolicy=res.data.basicInfo.basePolicy
          this.value.allLossPrice=res.data.basicInfo.allLossPrice
          this.value.content  =res.data.basicInfo.content

          this.value.stageDataType=res.data.basicInfo.stageDataType
          this.value.profitNetprofit=res.data.basicInfo.profitNetprofit
          this.value.startTime=new Date(res.data.basicInfo.startTime).getAppointedFormatTime("YYYY-MM-DD")
          this.value.endTime=new Date(res.data.basicInfo.endTime).getAppointedFormatTime("YYYY-MM-DD")
          this.value.numTotal=res.data.basicInfo.numTotal
          this.value.policyInfo=res.data.itemInfo
        })
     },
       changeOpen() {
        timeDelay(() => {
          if (window.cifioa) {
          console.log(this.$refs.refGetdis_H.offsetHeight);
            window.cifioa.sendMessage({
              type: "height",
              height: this.$refs.refGetdis_H.offsetHeight
            });
          } else {
            console.warn("缺少cifioa插件");
          }
        }, 300);
      }
    },
    created(){
      this.getInstallMentLsit()

    },
    data() {
      let _self=this;
      return {
        projectId:'',//项目Id
        jizhouId:this.$route.query.BOID,
        dialogFormVisible: false,//dialog
        floorInfo:[],
        defaultInfo:[],
        defaultIndex:0,
        generExample:'',
        defaultOpen:[0,1,2,3,4,5],
        btns:[
          {name:"提交审核",callback(v,l){
            let data=JSON.parse(JSON.stringify(v));
            data.applicantTime=new Date(data.applicantTime).getAppointedFormatTime("YYYY-MM-DD hh:mm:ss");
            data.startTime=new Date(data.startTime).getAppointedFormatTime("YYYY-MM-DD hh:mm:ss");
            data.endTime=new Date(data.endTime).getAppointedFormatTime("YYYY-MM-DD hh:mm:ss");
            sendJSON("/package/insertPackageDis",data).then(res=>{
              if(res.result.code==200){
                this.$message.success("提交成功");
              }else{
                this.$message.error(res.result.messages||"提交失败")
              }
            });
          }},
        ],
        value:{
          applicantName:'',
          applicantId:'',
          departmentName:'',
          departmentId:'',
          applicantTime:'',
          projectName:'',
          projectId:'',
          itemName:"",
          basePolicy:'',
          allLossPrice:"",
          profitNetprofit:'',
          startTime:'',
          endTime:'',
          numTotal:'',
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
              name: "applicantName"
            },
            {
              label: '申请人部门',
              type: "text",
              name: "departmentName"
            },
            {
              label: '申请时间',
              type: "date",
              name: "applicantTime"
            },
            {
              label: '项目名称',
              type: "select",
              name: "projectName",
              options:[],
              changeEvent(info){
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
          numbers: 3,
          inputList: [{
              label: '关键事项名称',
              type: "text",
              name: "itemName"
            },
            {
              label: '破底政策',
              type: "text",
              name: "basePolicy",
            },
            {
              label: '整盘货值折损(万元)',
              type: "text",
              name: "allLossPrice"
            },
            {
              label: '战规版利润额or战规版净利率变化',
              type: "text",
              name: "profitNetprofit"
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
              name: "numTotal"
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
              type: "text",
              name: "basePolicy"
            },
            {
              label: '整盘货值折损',
              type: "text",
              name: "itemAllLoss"
            },
            {
              label: '整盘货值折损率',
              type: "text",
              name: "itemAllLossNetprofit",
              unit:'%'
            },
            {
              label: '战规版利润额折损（万元）',
              type: "text",
              name: "iitemProfitLoss",

            },
            {
              label: '战规版净利率折损',
              type: "text",
              name: "iitemNetprofitLoss",
              unit:'%'
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
              type: "text",
              name: "itemNum"
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

<style>
</style>
