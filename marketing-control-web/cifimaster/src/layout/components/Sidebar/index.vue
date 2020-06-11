<template>
  <div :class="{'has-logo':showLogo}" class="parent" ref="getWidth">
    <div class="iTem" ref="getWidth">
      <div class="box" :class="{'iscoll':isCollapse}">
        <BottomIcon
          ref="navBottomIcon"
          :is-active="sidebar.opened"
          class="hamburger-container"
          @toggleClick="toggleSideBar"
        />
      </div>

      <logo v-if="showLogo" :collapse="isCollapse" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <div
          class="imglogo"
          style="background:#fff;height:40px;position: relative;background:#002140;"
        >
          <svg-icon
            v-show="sidebar.opened"
            icon-class="xsLog"
            style="box-sizing:border-box;width:100%;height:40px;"
          />
          <svg-icon
            v-show="!sidebar.opened"
            icon-class="log"
            style="box-sizing:border-box;width:100%;height:40px;padding:12px 10px 12px 10px;"
          ></svg-icon>
        </div>
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item
            v-for="route in routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
            class="menuspan"
          />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="telescopic" @mousedown="telescopic"></div>
    <div class="null"></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import variables from "@/styles/variables.scss";
export default {
  data() {
    return {
      getWidths:0,
      IconPos: true,
      bottomIcon: ""
    };
  },
  components: {
    SidebarItem: () => import("./SidebarItem"),
    Logo: () => import("./Logo"),
    BottomIcon: () => import("../../../components/Hamburger/index")
  },
  methods: {
    toggleSideBar() {
      this.getWidths = this.$refs.getWidth.style.width
      this.bottomIcon = this.$refs.navBottomIcon.isActive;
      this.$store.dispatch(
        "app/toggleSideBar",
        !this.$store.state.app.sidebar.opened
      );
    },
    telescopic(e) {
      let startWidth = this.sidebar.width;
      let { clientX } = e;
      this.$store.dispatch("app/drag"); //进入拖动中的状态
      let _self = this;
      function move(e) {
        let { clientX: x } = e;
        let currentWidth = x - clientX + startWidth;
        if (currentWidth <= 50) {
          currentWidth = 50;
        }
        _self.$store.dispatch("app/changeWidth", currentWidth);
      }
      function up() {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        _self.$store.dispatch("app/drag"); //移出拖动中的状态
      }
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    }
  },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$store.getters.menu;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  mounted() {

  },
};
</script>
<style scoped>
.imglogo {
  width: 100%;
}
.telescopic {
  width: 2px;
  height: 100%;
  background-color: transparent;
  cursor: ew-resize;
}
.iTem {
  height: 100vh;
  position: relative;
  z-index: 1;
}

.box {
  position: absolute;
  left: 160px;
  bottom: 20px;
  transform: translateX(-40%);
  z-index: 80;
}
.iscoll {
  position: absolute;
  bottom: 40px;
  left: 25px;
}
</style>
