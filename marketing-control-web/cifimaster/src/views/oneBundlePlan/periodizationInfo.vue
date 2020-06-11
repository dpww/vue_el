<template>
  <div ref="refGetfpi_H">
    <process-form
      :formlist.sync="list"
      :readonly="true"
      :defaultOpenTree="defaultOpen"
      @updated="changeOpen"
      :value.sync="value"
    ></process-form>
  </div>
</template>
<script>
import { sendJSON } from "@/api/request.js";
import { getDetails } from "@/api/commentpublic";
const timeDelay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
export default {
  name: "periodizationInfo",
  components: {
    processForm:()=>import("@/views/component/formV2.vue")
  },
  mounted() {
    if (window.cifioa) {
      window.cifioa.sendMessage({
        type: "height",
        height: this.$refs.refGetfpi_H.offsetHeight
      });
    } else {
      console.warn("缺少cifioa插件");
    }
  },
  created() {
    this.getInstallMentLsit();
  },
  methods: {
    // 获取一揽子分期
    getInstallMentLsit() {
      getDetails({
        baseId: this.jizhouId
      }).then(res => {
        this.value.applicantName =
          res.data.basicInfo.applicantName ||
          localStorage.getItem("employeeName");
        this.value.applicantId =
          res.data.basicInfo.applicantId || localStorage.getItem("id");
        this.value.departmentName =
          res.data.basicInfo.departmentName ||
          JSON.parse(localStorage.getItem("userInfo")).job.JobDesc.split("-")[
            JSON.parse(localStorage.getItem("userInfo")).job.JobDesc.split("-")
              .length - 1
          ];
        this.value.departmentId = res.data.basicInfo.departmentId;
        this.value.applicantTime = new Date(
          res.data.basicInfo.applicantTime
        ).getAppointedFormatTime("YYYY-MM-DD");
        this.value.projectName = res.data.basicInfo.projectName;
        this.value.projectId = res.data.basicInfo.projectId;
        this.value.itemName = res.data.basicInfo.itemName || "";
        this.value.stageType = res.data.basicInfo.stageType;
        this.value.stageDataType = res.data.basicInfo.stageDataType;
        this.value.profitNetprofit = res.data.basicInfo.profitNetprofit;
        this.value.startTime = new Date(
          res.data.basicInfo.startTime
        ).getAppointedFormatTime("YYYY-MM-DD");
        this.value.endTime = new Date(
          res.data.basicInfo.endTime
        ).getAppointedFormatTime("YYYY-MM-DD");
        this.value.numTotal = res.data.basicInfo.numTotal;
        this.value.policyInfo = res.data.itemInfo;
      });
    },
    changeOpen() {
      timeDelay(() => {
        if (window.cifioa) {
          console.log(this.$refs.refGetfpi_H.offsetHeight);
          window.cifioa.sendMessage({
            type: "height",
            height: this.$refs.refGetfpi_H.offsetHeight
          });
        } else {
          console.warn("缺少cifioa插件");
        }
      }, 300);
    }
  },
  computed: {},
  data() {
    let _self = this;
    return {
      // 接收参数
      jizhouId: this.$route.query.BOID,
      projectId: "", //项目Id
      dialogFormVisible: false, //dialog
      floorInfo: [],
      defaultInfo: [],
      defaultIndex: 0,
      generExample: "",
      defaultOpen: [0, 1, 2, 3, 4, 5],
      value: {
        applicantName: "",
        applicantId: "",
        departmentName: "",
        departmentId: "",
        applicantTime: "",
        projectName: "",
        projectId: "",
        itemName: "",
        stageType: "",
        stageDataType: "",
        profitNetprofit: "",
        startTime: "",
        endTime: "",
        numTotal: 0,
        policyInfo: []
      },
      list: [
        {
          title: "基础信息",
          mode: "transverse",
          numbers: 3,
          inputList: [
            {
              label: "申请人",
              type: "text",
              name: "applicantName",
              disable: true
            },
            {
              label: "申请人部门",
              type: "text",
              name: "departmentName",
              disable: true
            },
            {
              label: "申请时间",
              type: "date",
              name: "applicantTime"
            },
            {
              label: "项目名称",
              type: "select",
              name: "projectName",
              options: [],
              changeEvent(info) {
                info.options.every(item => {
                  _self.projectId = info.value;
                  if (item.value === info.value) {
                    _self.value.projectName = item.label;
                    return false;
                  }
                  return true;
                });
              }
            }
          ]
        },
        {
          title: "政策信息",
          mode: "transverse",
          numbers: 3,
          inputList: [
            {
              label: "关键事项名称",
              type: "text",
              name: "itemName",
              numbers: 1
            },
            {
              label: "一揽子分期政策类别",
              type: "text",
              name: "stageType"
            },
            {
              label: "分期时间类别",
              type: "text",
              name: "stageDataType"
            },

            {
              label: "政策开始时间",
              type: "date",
              name: "startTime"
            },
            {
              label: "政策结束时间",
              type: "date",
              name: "endTime"
            },
            {
              label: "合计套数",
              type: "text",
              name: "numTotal"
            }
          ]
        },
        {
          title: "政策明细",
          mode: "vertical",
          dataName: ["policyInfo"],
          btns: [
            [
              {
                name: "添加",
                callback(keys, dataList) {
                  dataList.push(keys);
                }
              }
            ]
          ],
          hasIndex: true,
          inputList: [
            {
              label: "分期开始天数",
              type: "number",
              name: "startDay"
            },
            {
              label: "分期结束天数",
              type: "number",
              name: "endDay"
            },
            {
              label: "楼栋",
              type: "custom",
              name: "buildingType",
              callback(name, value, params) {
                _self.example = _self.selectFloor(value, params);
                _self.example.next();
              }
            },
            {
              label: "套数",
              type: "text",
              name: "num"
            },
            {
              label: "申请正文",
              type: "longTextarea",
              name: "content",
              level: 1,
              numbers: 1,
              mode: "transverse"
            }
          ]
        }
      ]
    };
  }
};
</script>
<style>
</style>
