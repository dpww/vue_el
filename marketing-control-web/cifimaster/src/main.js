
import BabelPolyfill from "babel-polyfill";
import Vue from 'vue'
import {
  Divider,
  Pagination,
  Dialog,
  // Autocomplete,
  Drawer,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  // RadioButton,
  Checkbox,
  // CheckboxButton,
  // CheckboxGroup,
  Switch,
  Select,
  Option,
  // OptionGroup,
  Button,
  // ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  // BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  // Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  // Spinner,
  Badge,
  Card,
  // Rate,
  Steps,
  Step,
  // Carousel,
  // CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  // ColorPicker,
  // Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  // Timeline,
  // TimelineItem,
  Link,
  // Divider,
  // Image,
  Calendar,
  // Backtop,
  // PageHeader,
  CascaderPanel,
  Loading,
  MessageBox,
  Message,
  Notification,
  Scrollbar,
  CheckboxGroup
} from 'element-ui';
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
// import echarts from 'echarts'
import onlyNumber from '@/directive/el-input'; //自定义全局指令
import AFTableColumn from 'af-table-column';  //表格列宽撑开

//水印
import watermark from '@/utils/watermark'
import {setCookie,getCookie,delCookie} from '@/utils/cookie'
Vue.use(Divider);
Vue.use(Pagination);
Vue.use(Dialog);
// Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
// Vue.use(RadioButton);
Vue.use(Checkbox);
// Vue.use(CheckboxButton);
// Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
// Vue.use(OptionGroup);
Vue.use(Button);
// Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
// Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
// Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
// Vue.use(Spinner);
Vue.use(Badge);
Vue.use(Card);
// Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
// Vue.use(ColorPicker);
// Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
// Vue.use(Timeline);
// Vue.use(TimelineItem);
Vue.use(Link);
// Vue.use(Divider);
// Vue.use(Image);
Vue.use(Calendar);
// Vue.use(Backtop);
// Vue.use(PageHeader);
Vue.use(CascaderPanel);
Vue.use(Loading.directive);
Vue.use(Scrollbar);
Vue.use(Drawer);
Vue.use(CheckboxGroup)
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$cookieStore = {setCookie,getCookie,delCookie}
//水印配置
const DEFAULT_CONFIG = {
  zIndex: 1000,
  font: '16px microsoft yahei',
  color: 'rgba(0,0,0,0.1)',
  content: '旭辉集团',
  rotate: 20,
  width: 300,
  height: 200,
  repeat: true
}
Vue.prototype.$echarts = echarts
watermark.install(Vue,DEFAULT_CONFIG);
import '@/icons' // icon
import '@/permission' // permission control
import '@/utils/plugIn' // permission control
// set ElementUI lang to EN
Vue.use(BabelPolyfill)
Vue.use(onlyNumber); // 全局指令
Vue.use(AFTableColumn);//表格列宽撑开

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
