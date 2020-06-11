<template>
  <div class="checkProject">
    <div class="area">{{mainData.nowArea}} / {{mainData.nowCity}}</div>
    <el-popover
      @after-leave="hidePopover"
      placement="bottom"
      width="200"
      ref="popover"
      trigger="click"
    >
      <el-input placeholder="请输入搜索内容" v-model="mainData.searchVal">
        <i class="el-icon-search el-input__icon" slot="suffix" @click="searchIcon"></i>
      </el-input>
      <el-tree :data="mainData.treeData" :props="defaultProps" @node-click="treeClick"></el-tree>
    </el-popover>
    <div class="project" v-popover:popover @click="showDilog=!showDilog">
      {{mainData.nowProject}}
      <i v-if="showDilog" class="el-icon-arrow-up"></i>
      <i v-if="!showDilog" class="el-icon-arrow-down"></i>
    </div>
  </div>
</template>

<script>
import { projectSelect } from "@/api/firstPlan";
export default {
  data() {
    return {
      showDilog: false,
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  props: {
    mainData: {
      type: Object,
      dafault: {}
    }
  },
  watch: {
    mainData: {
      handler(newv) {},
      deep: true
    }
  },
  methods: {
    hidePopover() {
      this.showDilog = false;
    },
    searchIcon() {
      this.getProject();
    },
    treeClick(data) {
      // if(data.level==1){
      //   this.mainData.nowArea=data.name
      // }else if(data.level==2){
      //   this.mainData.nowCity=data.name
      // }else if(data.level==3){
      //   this.mainData.nowProject=data.name
      //   this.$refs.popover.doClose();
      // }
      if (data.Levels == 99) {
        this.mainData.project_id = data.ID;
        this.mainData.treeData.forEach(lv1 => {
          lv1.children.forEach(lv2 => {
            lv2.children.forEach(lv3 => {
              if (lv3.ID == data.ID) {
                this.mainData.nowCity = lv2.name;
                this.mainData.nowArea = lv1.name;
                this.$store.state.user.firstPlanItem = lv3.name;
                this.mainData.nowProject = lv3.name;
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
        this.mainData.treeData.forEach(lv1 => {
          lv1.children.forEach(lv2 => {
            if (lv2.ID == data.ID) {
              this.mainData.nowCity = lv2.name;
              this.mainData.nowArea = lv1.name;
              this.mainData.nowProject = "";
              this.mainData.project_id = "";
            }
          });
        });
      } else if (data.Levels == 0) {
        this.mainData.treeData.forEach(lv1 => {
          if (lv1.ID == data.ID) {
            this.mainData.nowCity = "";
            this.mainData.nowArea = lv1.name;
            this.mainData.nowProject = "";
            this.mainData.project_id = "";
          }
        });
      }
    },
    getProject() {
      projectSelect({
        name: this.mainData.searchVal
      }).then(res => {
        console.log(res);
        let defaultItem = JSON.parse(localStorage.getItem("nowProject"));
        if (!defaultItem) {
          if ((this.mainData.nowArea = res.result[0])) {
            this.mainData.nowArea = res.result[0].name;
          }
          if (res.result[0].children[0]) {
            this.mainData.nowCity = res.result[0].children[0].name;
          }
          if ((this.mainData.nowProject = res.result[0].children[0].child[0])) {
            this.mainData.nowProject = res.result[0].children[0].child[0].name;
            this.mainData.project_id = res.result[0].children[0].child[0].ID;
          }
          localStorage.setItem(
            "nowProject",
            JSON.stringify({
              nowArea: this.mainData.nowArea,
              nowCity: this.mainData.nowCity,
              nowProject: this.mainData.nowProject,
              project_id: this.mainData.project_id
            })
          );
        } else {
          let { nowArea, nowCity, nowProject, project_id } = defaultItem;
          this.mainData.nowArea = nowArea;
          this.mainData.nowCity = nowCity;
          this.mainData.nowProject = nowProject;
          this.mainData.project_id = project_id;
        }
        res.result.forEach(item => {
          item.children.forEach(obj => {
            obj.children = obj.child;
          });
        });
        this.mainData.treeData = res.result;

        this.reload();
      });
    },
    reload() {
      this.$emit("reload");
    }
  },
  created() {
    // if(this.mainData.treeData&&this.mainData.treeData[0].children.length>0){
    //   this.mainData.nowArea=this.mainData.treeData[0].name
    //   this.mainData.nowCity=this.mainData.treeData[0].children[0].name
    //   this.mainData.nowProject=this.mainData.treeData[0].children[0].children[0].name
    // }
    this.getProject();
  }
};
</script>
<style>
.el-tree {
  height: 500px;
  max-height: 500px;
  overflow: auto;
}
</style>
<style lang="less" scoped>
.checkProject {
  width: 100%;
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
}
</style>
