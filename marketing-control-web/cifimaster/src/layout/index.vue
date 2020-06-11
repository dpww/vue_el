<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar
      class="sidebar-container"
      :class="{removeTranstion:dragging}"
      :style="{width:width+'px'}"
      v-show="isShowSidebar"
    />
    <div
      class="main-container"
      :class="{removeTranstion:dragging,hiddleSide:!isShowSidebar}"
      :style="{marginLeft:width+'px',}"
      v-loading.fullscreen.lock="loading"
      element-loading-text="加载中..."
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div :class="{'fixed-header':fixedHeader,removeTranstion:dragging}">
        <navbar v-bind:isShowSidebar="isShowSidebar"></navbar>
      </div>
      <app-main />
    </div>
  </div>
</template>
<script>
import ResizeMixin from "./mixin/ResizeHandler";
export default {
  name: "Layout",
  components: {
    Navbar:()=>import('./components/Navbar'),
    Sidebar:()=>import('./components/Sidebar'),
    AppMain:()=>import('./components/AppMain'),
  },
  data() {
    return {
      routeList: ["planControl", "rateWatch"],
      editList: [
        "getLand",
        "setFirst",
        "setSecond",
        "threeMonth",
        "twoMonth",
        "twentyOneDays",
        "sevenDays",
        "opening",
        "afterAMonth",
        "salesOffice",
        "modelDistrict",
        "modelHouses"
      ],
      equipment: ""
    };
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    },
    loading() {
      return this.$store.state.app.loading;
    },
    width() {
      return this.$store.state.app.sidebar.width;
    },
    dragging() {
      return this.$store.state.app.sidebar.dragging;
    },
    isShowSidebar() {
      let name = this.$route.name;
      if (
        this.$route.query.type == "view" &&
        this.editList.some(item => item == name) &&
        this.equipment == "pad"
      ) {
        return false;
      } else if (
        this.routeList.some(item => item == name) &&
        this.equipment == "pad"
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    }
  },
  created() {
    var os = (function() {
      var ua = navigator.userAgent;
      let isWindowsPhone = /(?:Windows Phone)/.test(ua);
      let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
      let isAndroid = /(?:Android)/.test(ua);
      let isFireFox = /(?:Firefox)/.test(ua);
      let isChrome = /(?:Chrome|CriOS)/.test(ua);
      let isTablet =
        /(?:iPad|PlayBook)/.test(ua) ||
        (isAndroid && !/(?:Mobile)/.test(ua)) ||
        (isFireFox && /(?:Tablet)/.test(ua));
      let isPhone = /(?:iPhone)/.test(ua) && !isTablet;
      let isPc = !isPhone && !isAndroid && !isSymbian;
      return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
      };
    })();

    let screenWidth=window.screen.width>=480?true:false
    if ( os.isAndroid || os.isPhone) {
      this.equipment = "phone";
    }
     if (os.isTablet || (os.isAndroid&&screenWidth)) {
      this.equipment = "pad";
    } else if (os.isPc) {
      this.equipment = "computer";
    }
    localStorage.setItem("CurrentDevice", this.equipment);
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
@import "~@/assets/css/style.scss";
.main-container {
  background-color: $mainBgColor;
}
.hiddleSide {
  margin-left: 0 !important;
  height: 100vh !important;
}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.removeTranstion {
  transition: width 0s ease 0s !important;
  user-select: none;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
.mobile .fixed-header {
  width: 100%;
}
</style>
