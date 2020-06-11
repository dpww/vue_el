<template>
  <div class="form-container">
    <el-row class="container">
      <div class="title">
        <h2>{{title}}</h2>
      </div>
    </el-row>
    <el-row class="form-list">
      <el-form :label-width="labelwidth||'180px'" label-position="right">
        <!-- 主表内容-->
        <el-collapse :value="list.map((item,index)=>index)">
          <!-- 每个表单块-->
          <el-collapse-item class="form_item" v-for="(item,index) in list" :title="item.title" :name="index" :key="index">
            <template slot="title">
              <i v-if="item.icon" class="header-icon" :class="item.icon"></i>
              <h3 class="form_item_title">{{item.title}} <small v-if="item.subtitle">{{item.subtitle}}</small></h3>
            </template>
            <!-- 横版-->
            <el-row v-if="item.mode==='transverse'">
              <!-- 每个表单元素-->
              <el-col v-for="(form_item,formIndex) in item.formList" :span="24/(form_item.numbers?form_item.numbers:(item.numbers?item.numbers:2))"
                :key="formIndex">
                <el-form-item :label="form_item.label">
                  <!-- 值类型-->
                  <template v-if="form_item.type==='info'">
                    <span>{{values[form_item.name]}}</span>
                    <span v-if="form_item.unit">{{form_item.unit}}</span>
                  </template>
                  <!-- input 类型-->
                  <template v-if="form_item.type==='input'">
                    <el-input :clearable="form_item.clear" :disabled="form_item.disable" v-model="values[form_item.name]"
                      :placeholder="form_item.placeholder||''"></el-input>
                    <span v-if="form_item.unit">{{form_item.unit}}</span>
                  </template>
                  <!-- select 类型-->
                  <el-select v-else-if="form_item.type==='select'" :disabled="form_item.disable" v-model="values[form_item.name]"
                    :placeholder="form_item.placeholder||''">
                    <el-option v-for="(ops,opsIndex) in form_item.options" :label="ops.label" :value="ops.value" :key="opsIndex"></el-option>
                  </el-select>
                  <!-- 单选框类型 -->
                  <el-radio-group v-else-if="form_item.type==='radio'" v-model="values[form_item.name]">
                    <el-radio v-for="(ops,opsIndex) in form_item.options" :disabled="ops.disable" :key="opsIndex"
                      :label="ops.value">{{ops.label}}</el-radio>
                  </el-radio-group>
                  <!--复选框类型 -->
                  <el-checkbox-group v-else-if="form_item.type==='checkbox'" v-model="values[form_item.name]">
                    <el-checkbox v-for="(ops,opsIndex) in form_item.options" :disabled="ops.disable" :key="opsIndex"
                      :label="ops.value">{{ops.label}}</el-checkbox>
                  </el-checkbox-group>
                  <!-- 时间选择-->
                  <el-time-picker v-else-if="form_item.type==='time'" :placeholder="form_item.placeholder||''"
                    :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" :disabled="form_item.disable" v-model="values[form_item.name]"></el-time-picker>
                  <!-- 时间范围选择-->
                  <el-time-picker v-else-if="form_item.type==='timeRange'" is-range :range-separator="form_item.spacer||'至'"
                    v-model="values[form_item.name]" :start-placeholder="form_item.startPlaceholder||'开始时间'"
                    :end-placeholder="form_item.endPlaceholder||'结束时间'" :clearable="form_item.clear" :disabled="form_item.disable"></el-time-picker>
                  <!-- 日期选择-->
                  <el-date-picker v-else-if="form_item.type==='date'" :type="form_item.dateType" :clearable="form_item.clear"
                    :placeholder="form_item.placeholder||''" :start-placeholder="form_item.startPlaceholder||'开始日期'"
                    :end-placeholder="form_item.endPlaceholder||'结束日期'" :disabled="form_item.disable" v-model="values[form_item.name]"></el-date-picker>
                  <!-- 附件-->
                  <el-upload v-else-if="form_item.type==='upFile'" :action="form_item.action" multiple :limit="3"
                    :on-success="uploadSuccess" :on-error="uploadError">
                    <el-button size="small" v-if="form_item.disable" type="primary" class="xuHuiBtn secondary">{{form_item.btnInfo}}</el-button>
                    <div slot="tip" class="el-upload__tip" v-if="form_item.info">{{form_item.info}}</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 竖向-->
            <el-row v-else-if="item.mode==='vertical'">
              <el-col>
                <el-table :data="item.dataList" style="width: 100%">
                  <el-table-column v-if="item.hasIndex" label="序号">
                    <template slot-scope="scope">
                      <span>{{scope.$index}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-for="(form_item,formIndex) in item.formList" :label="form_item.label" :width="form_item.width"
                    :key="formIndex">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row[form_item.name]"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <template v-if="item.slot">
                <el-col v-for="(form_item,formIndex) in item.slotList" :span="24/(form_item.numbers?form_item.numbers:(item.numbers?item.numbers:2))"
                  :key="formIndex">
                  <el-form-item :label="form_item.label">
                    <!-- input 类型-->
                    <div v-if="form_item.type==='input'">
                      <el-input :clearable="form_item.clear" :disabled="form_item.disable" v-model="values[form_item.name]"
                        :placeholder="form_item.placeholder||''"></el-input> <span v-if="form_item.unit">{{form_item.unit}}</span>
                    </div> <!-- select 类型-->
                    <el-select v-else-if="form_item.type==='select'" :disabled="form_item.disable" v-model="values[form_item.name]"
                      :placeholder="form_item.placeholder||''">
                      <el-option v-for="(ops,opsIndex) in form_item.options" :label="ops.label" :value="ops.value" :key="opsIndex"></el-option>
                    </el-select> <!-- 单选框类型 -->
                    <el-radio-group v-else-if="form_item.type==='radio'" v-model="values[form_item.name]">
                      <el-radio v-for="(ops,opsIndex) in form_item.options" :disabled="ops.disable" :key="opsIndex"
                        :label="ops.value">{{ops.label}}</el-radio>
                    </el-radio-group>
                    <!--复选框类型 -->
                    <el-checkbox-group v-else-if="form_item.type==='checkbox'" v-model="values[form_item.name]">
                      <el-checkbox v-for="(ops,opsIndex) in form_item.options" :disabled="ops.disable" :key="opsIndex"
                        :label="ops.value">{{ops.label}}</el-checkbox>
                    </el-checkbox-group> <!-- 时间选择-->
                    <el-time-picker v-else-if="form_item.type==='time'" :placeholder="form_item.placeholder||''"
                      :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" :disabled="form_item.disable" v-model="values[form_item.name]"></el-time-picker>
                    <!-- 时间范围选择-->
                    <el-time-picker v-else-if="form_item.type==='timeRange'" is-range :range-separator="form_item.spacer||'至'"
                      v-model="values[form_item.name]" :start-placeholder="form_item.startPlaceholder||'开始时间'"
                      :end-placeholder="form_item.endPlaceholder||'结束时间'" :clearable="form_item.clear" :disabled="form_item.disable"></el-time-picker>
                    <!-- 日期选择-->
                    <el-date-picker v-else-if="form_item.type==='date'" :type="form_item.dateType" :clearable="form_item.clear"
                      :placeholder="form_item.placeholder||''" :start-placeholder="form_item.startPlaceholder||'开始日期'"
                      :end-placeholder="form_item.endPlaceholder||'结束日期'" :disabled="form_item.disable" v-model="values[form_item.name]"></el-date-picker>
                    <!-- 附件-->
                    <el-upload v-else-if="form_item.type==='upFile'" :action="form_item.action" multiple :limit="3"
                      :on-success="uploadSuccess" :on-error="uploadError">
                      <el-button size="small" v-if="form_item.disable" type="primary" class="xuHuiBtn secondary">{{form_item.btnInfo}}</el-button>
                      <div slot="tip" class="el-upload__tip" v-if="form_item.info">{{form_item.info}}</div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </template>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: "processForm",
    methods: {
      uploadSuccess(res) {
        this.$message.success("上传成功");
      },
      uploadError() {
        this.$message.error("上传失败");
      }
    },
    props: {
      formlist: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: '表单信息'
      },
      value: {
        type: Object,
        dafault: {}
      },
      labelwidth: {
        type: String,
        default: '180px'
      }
    },
    created() {
      /* 判断prop value 的长度是否大于0 如果小于0则根据list的name渲染*/
      if (Object.keys(this.value).length) {
        this.values = this.value;
      } else {
        let keys = {};
        this.list.forEach(formItem => {
          formItem.formList.forEach(inputItem => {
            console.log(inputItem.name);
            keys[inputItem.name] = '';
          })
        })
        this.values = keys;
      }
      /*将组件值formlist转换为list*/
      this.list = this.formlist;
    },
    data() {
      return {
        values: {},
        list: []
      }
    }
  }
</script>
<style lang="scss">
  .form-container {
    padding: 10px;
    .el-input {
      width: auto;
    }
    .title {
      h2 {
        text-align: center;
        font-size: 20px;
      }
    }
    .el-collapse-item__header.is-active {
      border-bottom-color: #EBEEF5;
    }
    .el-form-item{
      margin: 10px 0;
    }
    .form_item {
      padding: 20px;
      background-color: #fff;
      margin-top: 10px;
      padding-top: 0;
      box-shadow: 0 0 2px #ccc;
      &:first-child{
        margin-top: 0;
      }
      .form_item_title {
        border-left: 3px solid #2661FF;
        height: 20px;
        line-height: 20px;
        text-indent: 1em;
        font-size: 16px;
      }
    }
    .el-collapse {
      border-top: none;
      border-bottom: none;
    }
  }
</style>
