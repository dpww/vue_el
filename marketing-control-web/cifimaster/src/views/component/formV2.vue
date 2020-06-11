<template>
  <div class="form-container">
    <el-row class="container" v-if="title">
      <div class="title">
        <h2>{{title}}</h2>
      </div>
    </el-row>
    <el-row class="form-list">
      <el-form :label-width="labelwidth||'180px'" :model="values" :rules="rules" :label-position="labelPosition">
        <!-- 主表内容-->
        <el-collapse v-model="defaultOpen">
          <!-- 每个表单块-->
          <el-collapse-item class="form_item" v-for="(item,index) in list" :title="item.title" :name="index" :key="index">
            <template slot="title">
              <i v-if="item.icon" class="header-icon" :class="item.icon"></i>
              <h3 class="form_item_title">{{item.title}} <small v-if="item.titleInfo">{{item.titleInfo}}</small></h3>
            </template>

            <template v-for="(render,eIndex) in item.formList">
              <h4 class="subtitle" v-if= "item.subtitle&&item.subtitle[eIndex]">
                <i class="el-input__icon" v-if= "item.subtitleIcon&&item.subtitleIcon[eIndex]" :class="item.subtitleIcon[eIndex]" :style="item.subtitleStyle&&item.subtitleStyle[eIndex]"></i>
                <span>{{item.subtitle[eIndex]}}</span>
              </h4>
              <!-- 横版 -->
              <el-row v-if="render[0][0]" class="topMar">
                <!-- 每个表单元素 -->
                  <el-row  v-for="(render_item,renderIndex) in render" :key="renderIndex">
                    <el-col v-for="(form_item,formIndex) in render_item" :span="24/(form_item.numbers||2)" :key="formIndex">
                      <el-form-item v-if="!(values[form_item.name]===''&&form_item.emptyNotShow)" :prop="form_item.name" :class="{isLongText:form_item.type==='longTextarea'||form_item.type==='textareaInfo'}" :label="form_item.label+(form_item.label?':':'')" :label-width="form_item.labelWidth">
                        <y-input :values="values" :form_item="form_item" :params="{detail:form_item,value:values}" :label-width="form_item.labelWidth">
                        </y-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
              </el-row>
              <!-- 竖向-->
              <el-row v-else-if="render[0].mode==='vertical'">
                <el-col>
                  <!-- 按钮组-->
                  <template v-if="!readonly">
                    <el-row class="btns" style="text-align: right;"  v-if= "item.btns&&item.btns.length>0" >
                      <template v-if= "item.btns[eIndex]&&item.btns[eIndex].length>0">
                        <el-button type="primary"
                        v-for="(btn,btnIndex) in item.btns[eIndex]"
                        @click="tableBtnHandle(btn.callback,render,item,item.dataName&&values[item.dataName[eIndex]])"
                        class="xuHuiBtn" :class="item.classes?item.classes:'secondary'"
                        :key="btnIndex">{{btn.name}}
                        </el-button>
                      </template>
                    </el-row>
                  </template>
                  <el-table :show-summary="item.showSummary&&Boolean(item.showSummary[eIndex])" border :summary-method="item.showSummary&&item.showSummary[eIndex]" :data="item.dataName&&(values[item.dataName[eIndex]]||[])" style="width: 100%">
                    <el-table-column v-if="item.hasIndex||(item.hasIndex&&item.hasIndex[eIndex])" label="序号" width="50" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.$index+1}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column-child v-for="(renderItem,rIndex) in render" :theadItem="renderItem" :key="rIndex" :tabledata="item.dataName&&values[item.dataName[eIndex]]"></el-table-column-child>
                  </el-table>
                </el-col>
              </el-row>
              <!-- 外部组件-->
              <el-row v-else-if="render[0].mode==='custom'">
                <el-col v-for="(custom,customIndex) in render" :key="customIndex" :span="24/(custom.numbers||1)">
                  <component :is="custom.component" :value="values" :readonly="readonly" @comEvent="comEvent(custom.comEvent)"></component>
                </el-col>
              </el-row>
            </template>
          </el-collapse-item>
        </el-collapse>
        <el-col class="btns text-center" v-if="btns.length">
          <el-button v-for="(btn,btnKey) in btns" :key="btnKey" type="primary" @click="formBtnHandle(btn.callback)" class="xuHuiBtn" :class="btn.classes?btn.classes:(btnKey?'secondary':'main')">{{btn.name}}</el-button>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
  let toStr=Object.prototype.toString;
  import components from './comp.config.js';
  export default {
    components:{
      yInput:()=>import('./input.vue'),
      elTableColumnChild:()=>import('./elTableColumnChild.vue'),
      ...components
    },
    name: "processForm",
    watch:{
      value:{
        handler(newv){
          this.getValue(newv);
        },
        deep:true
      },
      formlist:{
        handler(newv){
          this.renders(newv);
        },
        deep:true
      }
    },
    methods: {
      comEvent(callback){
        if(callback){
          callback();
        }
      },
      uploadSuccess(res) {
        this.$message.success("上传成功");
      },
      uploadError() {
        this.$message.error("上传失败");
      },
      /* table外的点击事件 */
      tableBtnHandle(callback,render,item,value) {
        let keys={};
        render.forEach(item=>{
          if(item.name)
          keys[item.name]='';
        });
        callback.bind(this)(keys,value,item);
      },
      /* form表单的点击事件 */
      formBtnHandle(callback){
        if(callback){
          callback.bind(this)(this.values,this.list);
        }

      },
      /* 获取value值*/
      getValue(value){
         /* 判断prop value 的长度是否大于0 如果小于0则根据list的name渲染*/
         /*
          *因为后台传来的数据不一定完整所以校检时不一定可以校检所有的值，在获取到value初始化时将后台没有传来并在表单中使用的值初始化为空
          *将后台传来的值全部赋值给value并补齐
          */

        if(Object.keys(value).length>0){
          this.values = value;
        }else{
          let keys = {};
          Object.assign(keys,value);
          let whiteList=['button','fileList'];
          this.list.forEach(formItem => {
            let {mode}=formItem;
            formItem.inputList.forEach(inputItem => {
              if (inputItem.mode!="custom"&&!whiteList.some(item=>item===inputItem.type)) {
                if(!inputItem.name){
                  console.log(inputItem); throw Error(`${inputItem.title}缺少关键字name`)
                }else if((mode==="transverse"&&inputItem.mode!=="vertical")||inputItem.mode==="transverse"){
                  if(!keys.hasOwnProperty(inputItem.name)){
                    keys[inputItem.name] ='';
                  }
                }
              };
              //当父类的mode为transverse并且inputItem的mode不为vertical或者当父类的mode为vertical子类的mode为transverse时直接赋值
            });
            if(formItem.dataName&&formItem.dataName.length>0){
              formItem.dataName.forEach(item=>{
                if(item&&!keys.hasOwnProperty(item))
                keys[item]=new Array();
              })
            }
          })
          this.values = keys;
        }
      },
      renders(formlist){
        this.getValue(this.value);
        /*将组件值formlist转换为list*/
        let listClone = [];
        formlist.forEach(item => { //每个表单区域选项
          let cloneItem = {};
          Object.keys(item).forEach(key=>{
            cloneItem[key]=item[key];
          });
          /* 如果dataName为string*/
          if(typeof cloneItem.dataName ==='string'){
            cloneItem.dataName=[cloneItem.dataName];
          }
          cloneItem.formList=[];

          let level = [...new Set(item.inputList.map(inp => {
            inp.level = inp.level || 0;
            return inp.level.toString();
          }))].sort((x, y) => x - y); //获取分级的数组,默认为0

          //为每个等级创建数组
          level.forEach(() => {
            cloneItem.formList.push([]);
          });

          let num=0,prevIndex;
          item.inputList.forEach(formItem => { //每个输入框选项
            let cloneFormItem = {};
            Object.keys(formItem).forEach(key => {
              cloneFormItem[key] = formItem[key];
            });
            cloneFormItem.mode = formItem.mode || item.mode; //排列方式不存在时继承父级的排列方式
            cloneFormItem.numbers = formItem.numbers || item.numbers; //每行个数
            cloneFormItem.labelWidth = formItem.labelWidth || this.labelwidth; //每行宽度
            //当整个表为只读时
            if(this.readonly){
              switch(formItem.type){
                case "upFile":
                cloneFormItem.type="fileList";
                break;
                case "longTextarea":
                cloneFormItem.type="textareaInfo";
                break;
                case "textarea":
                cloneFormItem.type="textareaInfo";
                break;
                default:
                //不需要修改的类型
                let immuneList=["button","computed","fileList","info"];
                if(!immuneList.some(item=>item===formItem.type)){
                  cloneFormItem.type="info";
                }
              }
            }else{
              let validate=null;
              if(formItem.validate){
                validate=formItem.validate;
              }else if(formItem.validate!==false){
                validate=[{ required: true, message: '内容不能为空', trigger: 'blur'}];
              }
              if(validate)
              this.rules[formItem.name]=validate;
            }

            /* 由于长textarea加了中文冒号,并且有padding所以让longTextarea的宽度为字数加二个em*/
            if(cloneFormItem.type==='longTextarea'||cloneFormItem.type==='textareaInfo')cloneFormItem.labelWidth=cloneFormItem.label.length+4+'em';
            /*根据input等级进行渲染顺序排序*/
            formItem.level=formItem.level.toString();

            if (level.indexOf(formItem.level) != -1) {
              let index = level.indexOf(formItem.level);//获取当前等级的位置
              if(cloneFormItem.mode==='transverse'){
                if((!prevIndex&&prevIndex!=0)||prevIndex!=index){
                  num=0;
                  prevIndex=index;
                }
                //cloneItem.formList[index].push(cloneFormItem);
                if(num==0||num+24/cloneItem.numbers>24){//当num为0或num+当前条目大于24时新增一条数据
                  cloneItem.formList[index].push([]);
                  num=0;
                }
                num+=24/cloneFormItem.numbers;
                let i=cloneItem.formList[index].length-1;
                cloneItem.formList[index][i].push(cloneFormItem);
              }else{
                cloneItem.formList[index].push(cloneFormItem);
              }
            }
          });

          /* 当值不为一个表格时为dataName等列表添加一个空位置*/
          if(cloneItem.formList.some(item=>toStr.call(item[0])!=="[object Array]")){
            cloneItem.formList.forEach((item,index)=>{
              if(toStr.call(item[0])==="[object Array]"||item[0].mode!=='vertical'){
                //为dataName 添加一个空位置
                if (cloneItem.dataName[index]!==false){
                  cloneItem.dataName.splice(index,0,false);
                  cloneItem.btns&&cloneItem.btns.splice(index,0,false);
                };
              }
            })
          }
          listClone.push(cloneItem);
        })
        this.list = listClone;

      },

    },

    props: {
      formlist: {
        type: Array,
        default:()=> []
      },
      defaultOpenTree:{
        type:Array,
        default:()=>[]
      },
      title: {
        type: String,
        default: ''
      },
      value: {
        type: Object,
        default:()=> {}
      },
      labelwidth: {
        type: String,
        default: '180px'
      },
      btns:{
        type:Array,
        default:()=>[]
      },
      readonly:{
        type:Boolean,
        default:false
      },
      labelPosition:{
        type:String,
        default:'right'
      }
    },
    created() {
      this.renders(this.formlist);
      this.defaultOpen=this.defaultOpenTree;
        console.log(this.defaultOpen,"listClonelistClonelistClonelistClone");

    },
    data() {
      return {
        values: {},
        list: [],
        rules:{},
        defaultOpen:[],
      }
    },
    mounted(){

    },
    updated(){
      this.$emit("updated");
    }
  }
</script>
<style lang="scss">
  @import "@/styles/form.scss";
  $fontSize:13px;
  $marginTop:10px;
  #vue-watermark-directive{
  display: none!important;
}
  .form-container {
    .isLongText>.el-form-item__content{
      margin-left: 0!important;
    }
    padding: 10px;

    .el-input {
      width: auto;
    }
    .title {
      margin: 10px 0;

      h2 {
        text-align: center;
        font-size: 14px;
        line-height: 1.7em;
      }
    }
    .subtitle{
      margin-top: $marginTop;
      font-size: $fontSize;
    }
     .btns{
       margin-top: $marginTop;
     }
     .el-table{
       margin-top: 10px;
     }
     .topMar{
       margin: 5px 0;
     }
     .text-center{
       text-align: center;
     }
    .el-collapse-item__header.is-active {
      border-bottom-color: #EBEEF5;
    }
    // .el-form-item {
    // }
    .form_item {
      padding: 15px;
      background-color: #fff;
      margin-top: $marginTop;
      padding-top: 0;
      box-shadow: 0 0 2px #ccc;
      &:first-child {
        margin-top: 0;
      }
      .form_item_title {
        border-left: 3px solid #2661FF;
        height: 20px;
        line-height: 20px;
        text-indent: 1em;
        font-size: $fontSize;
      }
    }
      .el-form-item__label{
        line-height: 40px;
      }
      .el-form-item__content {
        margin: 0 auto;
        line-height: 40px;
      }
      @media (max-width:1024px) {
        .el-form-item__label{
          line-height: 25px;
        }
        .el-form-item__content{
          line-height: 25px;
        }
      }
    .el-collapse {
      border-top: none;
      border-bottom: none;
    }
    .el-table th{
      background-color: #f0f0f0;
    }
    .el-table th.is-leaf{
      border-bottom-color: #e6e6e6;
      border-right-color: #e6e6e6;
      color: #878787;
    }
    .el-table__body td{
      border-bottom-color: #e6e6e6;
      border-right-color: #e6e6e6;
      color: #878787;
    }
    .btns.text-center{
      height: 50px;
      line-height: 50px;
      position: fixed;
      bottom: 0px;
      text-align: center;
      z-index: 99;
      background-color: #fff;
      .el-button{
        margin-right: 100px;
      }
      .secondary{
        margin-right: 100px!important;
        transform: translateX("-30px")!important;
      }
    }
  }

</style>
