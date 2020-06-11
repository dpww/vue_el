<template>
  <div class="y_input">
    <div
      :style="{width:isLong()?'100%':form_item.width,color:form_item.color,lineHeight:isLong()?'1.7em':'initial'}"
      style="display:inline-block;"
    >
      <!-- 文本模式 -->
      <template v-if="form_item.type==='info'">
        <span class="info" v-html="values[form_item.name]"></span>
      </template>
      <!-- input 类型-->
      <template v-else-if="form_item.type==='input'||form_item.type==='text'">
        <el-input
          :clearable="form_item.clear"
          :disabled="form_item.disable"
          v-model="values[form_item.name]"
          :placeholder="form_item.placeholder||''"
          @input="inputEvent"
          @blur="blurEvent"
        ></el-input>
      </template>
      <!-- number 类型-->
      <template v-else-if="form_item.type==='number'">
        <!-- <el-input-number :disabled="form_item.disable"  v-model.number="values[form_item.name]"
        :placeholder="form_item.placeholder||''"  :min="form_item.min||0" :max="form_item.max||1000000000">
        </el-input-number>-->
        <el-input
          :disabled="form_item.disable"
          @input="inputEvent"
          @keyup.native="values[form_item.name]=values[form_item.name].replace(/[^0-9]/g,'')"
          v-model="values[form_item.name]"
        ></el-input>
      </template>
      <!-- select 类型-->
      <el-select
        v-else-if="form_item.type==='select'"
        @change="selectChange(form_item.changeEvent,{...form_item,value:values[form_item.name]})"
        :disabled="form_item.disable"
        v-model="values[form_item.name]"
        :placeholder="form_item.placeholder||''"
      >
        <el-option
          v-for="(ops,opsIndex) in form_item.options"
          :label="ops.label"
          :value="ops.value"
          :key="opsIndex"
        ></el-option>
      </el-select>
      <!-- 单选框类型 -->
      <el-radio-group v-else-if="form_item.type==='radio'" v-model="values[form_item.name]">
        <el-radio
          v-for="(ops,opsIndex) in form_item.options"
          :disabled="ops.disable"
          :key="opsIndex"
          :label="ops.value"
        >{{ops.label}}</el-radio>
      </el-radio-group>
      <!--复选框类型 -->
      <el-checkbox-group v-else-if="form_item.type==='checkbox'" v-model="values[form_item.name]">
        <el-checkbox
          v-for="(ops,opsIndex) in form_item.options"
          :disabled="ops.disable"
          :key="opsIndex"
          :label="ops.value"
        >{{ops.label}}</el-checkbox>
      </el-checkbox-group>
      <!-- 时间选择-->
      <el-time-picker
        v-else-if="form_item.type==='time'"
        :placeholder="form_item.placeholder||''"
        :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
        :disabled="form_item.disable"
        v-model="values[form_item.name]"
      ></el-time-picker>
      <!-- 时间范围选择-->
      <el-time-picker
        v-else-if="form_item.type==='timeRange'"
        is-range
        :range-separator="form_item.spacer||'至'"
        v-model="values[form_item.name]"
        :start-placeholder="form_item.startPlaceholder||'开始时间'"
        :end-placeholder="form_item.endPlaceholder||'结束时间'"
        :clearable="form_item.clear"
        :disabled="form_item.disable"
      ></el-time-picker>
      <!-- 日期选择-->
      <el-date-picker
        v-else-if="form_item.type==='date'"
        value-format="yyyy-MM-dd"
        :type="form_item.dateType"
        :clearable="form_item.clear"
        :placeholder="form_item.placeholder||''"
        :start-placeholder="form_item.startPlaceholder||'开始日期'"
        :end-placeholder="form_item.endPlaceholder||'结束日期'"
        :disabled="form_item.disable"
        v-model="values[form_item.name]"
      ></el-date-picker>
      <!-- 附件-->
      <template v-else-if="form_item.type==='upFile'">
        <el-upload
          :action="form_item.action"
          multiple
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :on-preview="preview"
          :file-list="values[form_item.fileList]||[]"
          style="margin-top: 8px;"
          :before-remove="beforeRemove"
        >
          <el-button
            v-if="!form_item.disable"
            type="primary"
            class="xuHuiBtn secondary"
          >{{form_item.btnInfo}}</el-button>
        </el-upload>
        <div slot="tip" class="el-upload__tip" v-if="form_item.info" v-html="form_item.info"></div>
      </template>
      <!-- 附件列表-->
      <div v-else-if="form_item.type==='fileList'">
        <ul>
          <template v-if="values[form_item.fileList]&&values[form_item.fileList].length>0">
            <li v-for="(file,fileIndex) in values[form_item.fileList]" :key="fileIndex">
              <a
                v-if="!isMobile"
                @click="openPage(form_item.click,file)"
                download="download"
              >{{file.name}}</a>
              <span v-else @click="YZ_link(file)">{{file.name}}</span>
            </li>
          </template>
          <li v-else style="color: #999;text-align: center; font-size: 12px;">暂无内容</li>
        </ul>
      </div>
      <!-- 满宽textarea类型-->
      <template v-else-if="form_item.type==='longTextarea'">
        <el-input
          :clearable="form_item.clear"
          type="textarea"
          style="padding-left: 10px;"
          maxlength="1200"
          show-word-limit
          :disabled="form_item.disable"
          v-model="values[form_item.name]"
          :placeholder="form_item.placeholder||''"
        ></el-input>
      </template>
      <!-- 满宽textareaInfo类型-->
      <template v-else-if="form_item.type==='textareaInfo'">
        <span v-html="text()"></span>
      </template>
      <!-- 按钮-->
      <div v-else-if="form_item.type==='button'">
        <el-button
          size="small"
          type="text"
          v-for="(btn,btnIndex) in form_item.btns"
          :key="btnIndex"
          @click="btnHandle(btn.callback,params)"
          class="xuHuiBtn"
          :class="btn.classes?btn.classes:'secondary'"
        >{{btn.name}}</el-button>
      </div>
      <template v-else-if="form_item.type==='computed'">
        <span class="computed">{{form_item.computed(params)}}</span>
      </template>
      <!-- 自定义模式 -->
      <template v-else-if="form_item.type==='custom'">
        <el-input
          :clearable="form_item.clear"
          :disabled="form_item.disable"
          :value="values[form_item.name]"
          :placeholder="form_item.placeholder||''"
        >
          <i
            slot="suffix"
            class="el-input__icon"
            :class="'el-icon-'+(form_item.icon||'edit-outline')"
            @click="inputHandle(form_item,values,params)"
          ></i>
        </el-input>
      </template>
      <!-- 任意el-input -->
      <el-input
        v-else
        :clearable="form_item.clear"
        :type="form_item.type"
        :disabled="form_item.disable"
        v-model="values[form_item.name]"
        :placeholder="form_item.placeholder||''"
      ></el-input>
    </div>
    <span v-if="form_item.unit">{{form_item.unit}}</span>
  </div>
</template>
<script>
import { sendJSON, sendJSONAllPath, get, post } from "@/api/request.js";
export default {
  name: "yInput",
  data() {
    let isMobile = document.body.offsetWidth <= 1024;
    return {
      url: process.env.VUE_APP_BASE_API
    };
  },
  methods: {
    YZ_link(file) {
      // console.log(this.isMobile);
      if (this.isMobile) {
        var isTest = ["salesmgt-uat", "salesmgt-test"].some(function(item) {
          return window.location.href.indexOf(item) !== -1;
        });
        let appTitle = "审批";
        let nameObj = {
          businessIncome: "电商收入项目挪腾发起",
          businessPayment: "电商管理费支出发起",
          costEntering: "表外费用录入审批发起",
          costExamine: "费用合同审批发起",
          costExamineLegal: "费用合同审批发起",
          costExamineLink: "费用合同审批发起",
          costPay: "费用付款申请发起",
          costPayPoint: "费用付款申请发起",
          costPurchase: "费用采购方案发起",
          yearPay: "年度预算调整(支付口径)",
          yearReport: "年度预算调整(合同口径)"
        };
        if (nameObj[this.$route.name]) {
          appTitle = nameObj[this.$route.name];
        }
        let wm = {
          htmlTitle: appTitle,
          wmContent: this.userID || "旭辉集团",
          wmSize: 10,
          wmFont: "microsoft yahei",
          wmColor: 7,
          isDelSrc: 1
        };
        //https://sales-uat.cifi.com.cn/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&Password=4076f862096d1536b6cac6866e386685&PageUrl=https%3a%2f%2fsales-uat.cifi.com.cn%2fapi%2fMysoft.Map6.FileManager.AppServices.FileManagerAppService%2fDownLoad.aspx%3fdocumentGuid%3da7dae8d9-669e-ea11-80c9-005056a35e5f
        // let resquestUrl=isTest?`${location.origin}/dcs.web/onlinefile`:`${location.origin}/dcs.web/onlinefile`
        let resquestUrl = `https://oadoc.cifi.com.cn/dcs.web/onlinefile`;
        let requrl = file.FILENAME;
        let end = requrl.split(".")[requrl.split(".").length - 1];
        let convertType;
        if (end == "pdf") {
          convertType = "20";
        } else if (end == "tif") {
          convertType = "17";
        } else if (end == "jpg") {
          // convertType = "6";
          open(file.URL);
          return;
        } else if (end == "png") {
          // convertType = "10";
          open(file.URL);
          return;
        } else {
          convertType = "0";
        }
        // var tempwindow=window.open('about:blank');
        $.ajax({
          url: resquestUrl,
          data: {
            ...wm,
            downloadUrl: file.URL,
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
            open(file.URL);
          }
        });
      } else {
        let requrl = file.url.split("?")[0];
        open(file.url);
      }
    },
    openPage(callback, file) {
      if (callback) {
        callback(file);
      } else {
        window.open(file.url);
      }
    },
    inputEvent() {
      if (this.form_item.inputEvent) {
        this.form_item.inputEvent(this.form_item, this.values);
      }
    },
    keyupEvent() {
      if (this.form_item.keyupEvent) {
        this.form_item.keyupEvent(this.form_item, this.values);
      }
    },
    blurEvent() {
      if (this.form_item.blurEvent) {
        this.form_item.blurEvent(this.form_item, this.values);
      }
    },
    reg(event) {
      console.log(event);
      if (!event.target.value.trim()) {
        event.target.classList.add("error");
      } else {
        event.target.classList.remove("error");
      }
    },
    uploadSuccess(res, file, fileList) {
      if (res.result.code == 200) {
        this.values[this.form_item.fileList].push({
          ...res.result.data,
          name: file.name
        });
        fileList[fileList.length - 1].id = res.result.data.id;
        this.$message.success("上传成功");
      }
    },
    uploadError() {
      this.$message.error("上传失败");
    },
    btnHandle(callback, params) {
      if (callback) callback(params);
    },
    beforeRemove(file) {
      if (confirm(`确认删除${file.name}吗？`)) {
        sendJSON("/pricing/deleteFile", { id: file.id }).then(res => {
          if (res.result.code == 200) {
            let index = this.values[this.form_item.fileList].findIndex(
              item => item.id == file.id
            );
            if (index != -1)
              this.values[this.form_item.fileList].splice(index, 1);
            this.$message.success(res.result.messages);
          } else {
            this.$message.error(res.result.messages);
          }
        });
      } else {
        return false;
      }
    },
    /* 自定义图标的按钮*/
    inputHandle(formItem, value, params) {
      if (formItem.callback) {
        formItem.callback.bind(this)(formItem.name, value, params);
      } else {
        console.warn("没有回调函数");
      }
    },
    selectChange(callback, item) {
      callback && callback(item);
    },
    calculation(format) {
      Object.keys(this.values).forEach(key => {
        //format.indexOf(key)
      });
    },
    isLong() {
      return (
        this.form_item.type === "longTextarea" ||
        this.form_item.type === "textareaInfo"
      );
    },
    text() {
      if (this.values[this.form_item.name]) {
        let str = this.values[this.form_item.name].replace(/\n/g, "</br>");
        str = str.replace(/\s/g, "&nbsp;");
        return str;
      }
    },
    preview(file) {
      if (typeof this.form_item.preview === "function") {
        this.form_item.preview(file);
      }
    }
  },
  props: {
    form_item: {
      //输入框详情
      type: Object,
      default: () => {
        type: "info";
      }
    },
    values: {
      //表单值
      type: Object,
      default: () => {}
    },
    params: {
      //表单参数
      type: Object,
      default: () => {}
    },
    labelWidth: {
      type: String,
      default: "180px"
    }
  }
};
</script>

<style lang="scss">
.y_input {
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  display: inline-block;
  vertical-align: middle;
  [class*=" el-icon-"],
  [class^="el-icon-"] {
    margin-right: 0;
    color: inherit;
    opacity: 0.85;
    cursor: pointer;
    text-shadow: 0px 0px 2px transparent;
    &:hover {
      opacity: 1;
      text-shadow: 0px 0px 2px #ccc;
    }
  }

  .error {
    border-color: #f56c6c;
  }
  div.el-input {
    width: 100%;
  }
  .el-input-number {
    span.el-input-number__increase,
    span.el-input-number__decrease {
      width: 30px;
      height: 27px;
      margin-top: 4px;
      line-height: 27px;
    }
  }
  ul {
    list-style: none;
    li a {
      color: #2761ff;
    }
  }
}
</style>
