
export default {
  inserted(el, vDir, vNode) {
    // vDir.value 有指令的参数
    let content;
    //按键按下=>只允许输入 数字/小数点
    el.addEventListener("keypress", event => {
      let e = event || window.event;
      let inputKey = String.fromCharCode(typeof e.charCode === 'number' ? e.charCode : e.keyCode);
      let re = /\d|\-/;
      if (vDir.value.precision) {
        re = /\d|\.|\-/;
      }
      if (vDir.value.min >= 0) {
        re = /\d/;
        if (vDir.value.precision) {
          re = /\d|\./;
        }
      }
      content = e.target.value;
      //定义方法,阻止输入
      function preventInput() {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
      if (!re.test(inputKey) && !e.ctrlKey) {
        preventInput();
      } else if (content.indexOf(".") > 0 && inputKey == ".") {
        //已有小数点,再次输入小数点
        preventInput();
      }
      if (e.target.value.split('.')[1] && vDir.value.precision) {
        if (e.target.value.split('.')[1].length > vDir.value.precision - 1) {
          preventInput()
        }
      }

    });
    //按键弹起=>并限制最大最小
    el.addEventListener("keyup", event => {
      let e = event || window.event;
      // let len = content.indexOf(".");
      // let num = content.length;
      // let flost = num - len;
      // if (flost > vDir.value.precision) {

      // }
      content = parseFloat(e.target.value);
      if (!content) {
        content = 0.00;
      }
      let arg_max = "";
      let arg_min = "";
      if (vDir.value) {
        arg_max = parseFloat(vDir.value.max);
        arg_min = parseFloat(vDir.value.min);
      }
      if (arg_max && content > arg_max) {
        e.target.value = arg_max;
        content = arg_max;
      }
      if (arg_min && content < arg_min) {
        e.target.value = arg_min;
        content = arg_min;
      }
    });
    //失去焦点=>保留指定位小数
    el.addEventListener("focusout", event => {//此处会在 el-input 的 @change 后执行
      let e = event || window.event;
      content = parseFloat(e.target.value);
      let arg_precision = 0;//默认保留至整数

      if (vDir.value.precision) {
        arg_precision = parseFloat(vDir.value.precision);
      }
      if (arg_precision > 0) {
        let num = parseFloat(content).toFixed(arg_precision + 1)
        // e.target.value =   ( parseInt( content * 1000 ) / 1000 ).toFixed(arg_precision)
        e.target.value =
          num.substring(0, num.lastIndexOf('.') + arg_precision + 1)
        //  num.substring(0, num.tostring().length-1)
      } else {
        e.target.value = parseInt(content)
      }

      if (vDir.value.natural && e.target.value < 0) {
        e.target.value = 0
      }
      // }
      // -- callback写法1
      // vNode.data.model.callback = ()=>{
      //     e.target.value = content.toFixed(arg_precision)
      // }
      // vNode.data.model.callback();
      // -- callback 写法2
      // vNode.data.model.callback(
      //     e.target.value = content.toFixed(arg_precision)
      // )
    })
  }
}
