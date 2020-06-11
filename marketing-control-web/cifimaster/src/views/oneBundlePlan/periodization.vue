<template>
  <div class="periodization">
    <process-form
      title="一揽子分期政策编制"
      :formlist="list"
      :defaultOpenTree="defaultOpen"
      :value="value"
      :btns="btns"
    ></process-form>
    <el-dialog title="请选择政策楼栋" :visible.sync="dialogFormVisible">
      <el-form>
        <el-tree
          ref="floor"
          :default-checked-keys="defaultCheckeds"
          :data="floorInfo"
          :props="{label:'building_name',children:'buildData'}"
          node-key="building_id"
          show-checkbox
        ></el-tree>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getSelectedFloor">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { sendJSON, get } from "@/api/request.js";
import { getDetails } from "@/api/commentpublic";
export default {
  components: {
    processForm:()=>import("@/views/component/formV2.vue")
  },
  created() {
    this.getProject();
    this.getInstallMentLsit();
  },
  methods: {
    /* 获取项目信息*/
    getProject() {
      sendJSON("/package/getProjects", {
        userId: localStorage.getItem("id")
      }).then(res => {
        this.$set(
          this.list[0].inputList[3],
          "options",
          res.result.map(item => ({
            label: item.ProjectName,
            value: item.projectId
          }))
        );
      });
    },
    // 获取一揽子分期
    getInstallMentLsit() {
      if (this.jizhouId) {
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
              JSON.parse(localStorage.getItem("userInfo")).job.JobDesc.split(
                "-"
              ).length - 1
            ];
          this.value.departmentId = res.data.basicInfo.departmentId;
          this.value.applicantTime = new Date(
            res.data.basicInfo.applicantTime
          ).getAppointedFormatTime("YYYY-MM-DD hh:mm:ss");
          this.value.projectName = res.data.basicInfo.projectName;
          this.value.projectId = res.data.basicInfo.projectId;
          this.value.itemName = res.data.basicInfo.itemName || "";
          this.value.stageType = res.data.basicInfo.stageType;
          this.value.stageDataType = res.data.basicInfo.stageDataType;
          this.value.profitNetprofit = res.data.basicInfo.profitNetprofit;
          this.value.startTime = new Date(
            res.data.basicInfo.startTime
          ).getAppointedFormatTime("YYYY-MM-DD hh:mm:ss");
          this.value.endTime = new Date(
            res.data.basicInfo.endTime
          ).getAppointedFormatTime("YYYY-MM-DD hh:mm:ss");
          this.value.numTotal = res.data.basicInfo.numTotal;
          this.value.policyInfo = res.data.itemInfo;
          this.value.content = res.data.basicInfo.content;
          this.projectId = res.data.basicInfo.projectId;
          this.getInfo = res.data;
        });
      } else {
        this.value.applicantName = localStorage.getItem("employeeName");
        this.value.applicantId = localStorage.getItem("id");
        this.value.departmentName = JSON.parse(
          localStorage.getItem("userInfo")
        ).job.JobDesc.split("-")[
          JSON.parse(localStorage.getItem("userInfo")).job.JobDesc.split("-")
            .length - 1
        ];
        this.value.applicantTime = new Date().getAppointedFormatTime(
          "YYYY-MM-DD hh:mm:ss"
        );
        this.value.startTime = new Date().getAppointedFormatTime(
          "YYYY-MM-DD hh:mm:ss"
        );
        this.value.endTime = new Date().getAppointedFormatTime(
          "YYYY-MM-DD hh:mm:ss"
        );
        this.value.numTotal = "0";
        this.value.policyInfo = [];
        this.getInfo = {
          itemInfo: []
        };
      }
    },
    /* 获取楼栋信息*/
    getFloor(index) {
      if (this.projectId) {
        sendJSON("/package/getBuildingAndFormatsData", {
          projectId: this.projectId
        }).then(res => {
          this.floorInfo = [
            {
              building_name: res.result.data.projectName,
              building_id: this.projectId,
              buildData: res.result.data.buildAndFormat
            }
          ];
          this.defaultCheckeds = [];
          if (this.getInfo.itemInfo.length > 0) {
            this.getInfo.itemInfo[index].buildData.forEach(item => {
              this.defaultCheckeds.push(item.building_id);
            });
          }
          this.dialogFormVisible = true;
        });
      } else {
        this.$message.error("请先选择项目");
      }
    },
    /* 获取已选楼栋*/
    getSelectedFloor() {
      this.example.next(this.$refs.floor.getCheckedNodes()); //获取已选楼栋
      this.dialogFormVisible = false;
    },
    selectFloor: function*(value, params) {
      let selectedFloor = yield this.getFloor(params.index);
      /* 向默认展开项中添加默认展开的元素*/
      this.defaultInfo.splice(
        params.index,
        1,
        selectedFloor.map(item => item.building_id)
      );
      //设置已选项的字符串
      let type = "";
      selectedFloor.forEach((item, index) => {
        type += (index != 0 ? "," : "") + item.building_name;
      });
      value.buildingType = type;
      value.building = selectedFloor.map(item => ({
        building_name: item.building_name,
        building_id: item.building_id
      }));
    }
  },
  computed: {},
  watch: {},
  data() {
    let _self = this;
    return {
      // 接收参数
      jizhouId: this.$route.query.BOID,
      projectId: "", //项目Id
      dialogFormVisible: false, //dialog
      floorInfo: [],
      defaultInfo: [],
      defaultOpen: [0, 1, 2, 3, 4, 5],
      defaultIndex: 0,
      generExample: "",
      defaultCheckeds: [],
      getInfo: {},
      userId: JSON.parse(localStorage.getItem("userInfo")).username,
      btns: [
        {
          name: "提交审核",
          callback(v, l) {
            if (
              this.value.stageType.length <= 0 ||
              this.value.stageDataType.length <= 0 ||
              this.value.projectId.length <= 0 ||
              this.value.itemName.length <= 0
            ) {
              this.$message.error("有必填项未填写!");
              return;
            } else if (
              this.value.policyInfo.length <= 0 ||
              this.value.policyInfo.some(
                item =>
                  item.buildingType.trim().length <= 0 ||
                  item.num <= 0 ||
                  item.startDay <= 0 ||
                  item.endDay <= 0
              )
            ) {
              this.$message.error("请填写楼栋详细信息!");
              return;
            }
            let data = JSON.parse(JSON.stringify(v));
            data.applicantTime = new Date(
              data.applicantTime
            ).getAppointedFormatTime("YYYY-MM-DD");
            data.startTime = new Date(data.startTime).getAppointedFormatTime(
              "YYYY-MM-DD"
            );
            data.endTime = new Date(data.endTime).getAppointedFormatTime(
              "YYYY-MM-DD"
            );
            data.userName = localStorage.getItem("username");
            data.departName = JSON.parse(
              localStorage.getItem("userInfo")
            ).job.jobfullCode;
            data.stageType = this.value.stageType;
            data.content = this.value.content;
            data.stageDataType = this.value.stageDataType;
            data.baseId = _self.BOID;

            sendJSON("/package/insertPackageStages", data).then(res => {
              if (res.result.code == 200) {
                _self.BOID = res.result.data.baseId;
                this.$message.success("提交成功");
                if (res.result.data.baseId) {
                  get(
                    `/Workflow/MTStart2.aspx?BSID=My_Sales&BTID=My_Package_Stage&BOID=${res.result.data.baseId}&UserID=${_self.userId}&LoginKey=''`
                  ).then(res => {
                    open(res.data);
                  });
                } else {
                  this.$message.error("未获取到审批单id");
                }
              } else {
                this.$message.error(res.result.messages || "提交失败");
              }
            });
          }
        },
        {
          name: "暂存",
          callback(v, l) {
            if (
              this.value.stageType.length <= 0 ||
              this.value.stageDataType.length <= 0 ||
              this.value.projectId.length <= 0 ||
              this.value.itemName.length <= 0
            ) {
              this.$message.error("有必填项未填写!");
              return;
            } else if (
              this.value.policyInfo.length <= 0 ||
              this.value.policyInfo.some(
                item =>
                  item.buildingType.trim().length <= 0 ||
                  item.num <= 0 ||
                  item.startDay <= 0 ||
                  item.endDay <= 0
              )
            ) {
              this.$message.error("请填写楼栋详细信息!");
              return;
            }
            let data = JSON.parse(JSON.stringify(v));
            data.applicantTime = new Date(
              data.applicantTime
            ).getAppointedFormatTime("YYYY-MM-DD hh:mm:ss");
            data.startTime = new Date(data.startTime).getAppointedFormatTime(
              "YYYY-MM-DD hh:mm:ss"
            );
            data.endTime = new Date(data.endTime).getAppointedFormatTime(
              "YYYY-MM-DD hh:mm:ss"
            );
            data.userName = localStorage.getItem("username");
            data.departName = JSON.parse(
              localStorage.getItem("userInfo")
            ).job.jobfullCode;
            data.stageType = this.value.stageType;
            data.content = this.value.content;
            data.stageDataType = this.value.stageDataType;
            data.baseId = _self.BOID;
            data.isTs = "1";
            sendJSON("/package/insertPackageStages", data).then(res => {
              if (res.result.code == 200) {
                _self.BOID = res.result.data.baseId;
                this.$message.success("暂存成功");
              } else {
                this.$message.error(res.result.messages || "暂存失败");
              }
            });
          }
        }
      ],
      value: {
        applicantName: localStorage.getItem("employeeName"),
        applicantId: localStorage.getItem("id"),
        departmentName: JSON.parse(
          localStorage.getItem("userInfo")
        ).job.JobDesc.split("-")[
          JSON.parse(localStorage.getItem("userInfo")).job.JobDesc.split("-")
            .length - 1
        ],
        applicantTime: "",
        projectName: "",
        projectId: "",
        itemName: "",
        stageType: "",
        stageDataType: "",
        startTime: "",
        endTime: "",
        numTotal: 0,
        policyInfo: [],
        content: ""
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
              name: "projectId",
              options: [],
              changeEvent(info) {
                if (_self.value.policyInfo.length > 0) {
                  _self.value.policyInfo = [];
                }
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
          numbers: 2,
          inputList: [
            {
              label: "关键事项名称",
              type: "text",
              name: "itemName",
              numbers: 1
            },
            {
              label: "一揽子分期政策类别",
              type: "select",
              name: "stageType",
              options: [
                { label: "首付分期", value: "首付分期" },
                { label: "全款分期", value: "全款分期" }
              ],
              changeEvent(info) {
                if (info.value.includes("首付分期")) {
                  _self.$set(_self.list[1].inputList[2], "options", [
                    { label: "首付分期>3个月", value: "首付分期>3个月" },
                    { label: "首付分期≤3个月", value: "首付分期≤3个月" }
                  ]);
                } else if (info.value.includes("全款分期")) {
                  _self.$set(_self.list[1].inputList[2], "options", [
                    { label: "全款分期>6个月", value: "全款分期>6个月" },
                    { label: "全款分期≤6个月", value: "全款分期≤6个月" }
                  ]);
                }
              }
            },
            {
              label: "分期时间类别",
              type: "select",
              name: "stageDataType",
              options: [
                { label: "首付分期>3个月", value: "首付分期>3个月" },
                { label: "首付分期≤3个月", value: "首付分期≤3个月" },
                { label: "全款分期>6个月", value: "全款分期>6个月" },
                { label: "全款分期≤6个月", value: "全款分期≤6个月" }
              ],
              changeEvent(info) {
                if (info.value.includes("首付分期")) {
                  _self.$set(_self.list[1].inputList[1], "options", [
                    { label: "首付分期", value: "首付分期" }
                  ]);
                } else if (info.value.includes("全款分期")) {
                  _self.$set(_self.list[1].inputList[1], "options", [
                    { label: "全款分期", value: "全款分期" }
                  ]);
                }
              }
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
              type: "number",
              name: "numTotal",
              disable: true
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
              type: "number",
              name: "num",
              inputEvent(info, value) {
                let sum = 0;
                _self.value.policyInfo.forEach(
                  item => (sum += parseInt(item.num))
                );
                if (isNaN(sum)) {
                  _self.value.numTotal = 0 + "";
                } else {
                  _self.value.numTotal = sum + "";
                }
              }
            },
            {
              label: "操作",
              type: "button",
              btns: [
                {
                  name: "删除",
                  callback(key, list) {
                    console.log(key.index);
                    _self.value.policyInfo = _self.value.policyInfo.filter(
                      (item, index) => index != key.index
                    );
                  }
                }
              ]
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

<style lang="less">
.periodization {
  padding-bottom: 45px;
}
.el-form > .el-collapse > .el-collapse-item > div[role="tab"] {
  display: block !important;
}
.el-form > .el-collapse > .el-collapse-item:first-child > div[role="tab"],
.el-form > .el-collapse > .el-collapse-item:nth-child(2) > div[role="tab"] {
  display: block !important;
}
</style>
