Date.prototype.getAppointedFormatTime=function(format){
  format=format||"YYYY-MM-DD hh:mm:ss week";
  var self=this,weekday=["日",'一',"二","三","四","五","六"];
  var methods=[{
      reg:/yyyy/i,
      val:self.getFullYear()
    },
    {
      reg:/MM/,
      val:self.getMonth()+1
    },{
      reg:/dd/i,
      val:self.getDate()
    },{
      reg:/hh/i,
      val:self.getHours()
    },{
      reg:/mm/,
      val:self.getMinutes()
    },{
      reg:/ss/i,
      val:self.getSeconds()
    },{
      reg:/week/i,
      val:"星期"+weekday[self.getDay()]
    }
  ];
  methods.map(function(item){
    if(item.reg.test(format)){
      format=format.replace(item.reg,item.val<10&&typeof item.val=='number'?'0'+item.val:item.val)
    }
  });
  return format;
}
const toStr=Object.prototype.toString;
/*
 *验证表单的内容是否符合验证
 *参数list验证的表单
 *参数excess,自定义的表单组件使用的值为一个数组时使用excess验证
 *参数notTestName,不需要验证的name列表
 *参数excessWarp,额外的外层校检列表
 */
Object.prototype.validate=function(list,excess=[],notTestName=[],excessWarp=[]){
  let valiRes=true;
  return new Promise((resolve,reject)=>{
    const vali=(target,parentkey,index)=>{
      if(valiRes){
        Object.keys(target).every(key=>{
          if(notTestName.includes(key)) return true;
          switch(toStr.call(target[key])){
            case"[object Array]":
            if(target[key].length==0){
              let res=false;
              res=list.some(item=>{
                if(item.dataName){
                  let nameIndex= item.dataName.findIndex(name=>key===name);
                  if(nameIndex!==-1){
                    valiRes=false;
                    reject(item.subtitle[nameIndex]+"未添加数据");
                    return true;
                  }
                }
              })
              return !res;
            }
            return target[key].every((obj,index)=>{
              let res= vali(obj,key,index);
              return vali(obj,key,index);
            })
            break;
            case"[object Object]":
            vali(target[key],key);
            break;
            default:
            /* 判断值是否为空*/
            const notTestList=['info','textareaInfo','computed','button','upFile'];//不需要验证的类型名单
            /* 监测是否在不需要验证列表中*/

            if(typeof target[key]==='string'&&target[key].toString().trim()===''){
              let names=[];
              //当本条数据可以在最外层找到.
              if(!parentkey&&index!==0&&!index){
                let res=false;
                res=list.some(item=>{
                  return item.inputList.some(inp=>{
                    if(inp.name===key&&!notTestList.some(item=>item===inp.type)&&!inp.noTest){
                      valiRes=false;
                      names.push(inp.label);
                      return true;
                    }
                  })
                });
                if(!res){
                  excessWarp.some(item=>{
                    if(item.name===key){
                      valiRes=false;
                      names.push(item.title);
                      return true;
                    }
                  });
                }
                if(names.length===1){
                  reject(names.toString()+"未填写");
                }
              }else{
                let str='';
                let eureka=false;
                /* some结束之后要么dataName中没有值,要么通过了验证,当dataName中没有值并且是最后一次查找时在excess中查找*/
                list.some(item=>{
                  //如果在dataName中找到
                  if(item.dataName){
                    let keyIndex=item.dataName.findIndex(item=>item===parentkey);
                    if(keyIndex===-1)return ;
                    eureka=true;
                    /* 从dataName中找到该区域名称*/
                    return item.formList[keyIndex].some(inp=>{
                      if(inp.name===key&&!notTestList.some(type=>type===inp.type)){
                        valiRes=false;
                        str+=item.subtitle[keyIndex]+"中的第"+(index+1)+"条数据的"+inp.label+"未填写";
                        reject(str);
                        return true;
                      }
                    });
                  }
                });
                /* 如果没有找到这个父键*/
                if(!eureka){
                  excess.some((excessItem,excessIndex)=>{
                    if(excessItem.name===parentkey){
                      let name="填写不完整";
                      if(excessItem.detail&&excess.detail.hasOwnProperty(key)){
                        name="的"+excess.detail[key]&&excess.detail[key].label+'未填写';
                      }
                      valiRes=false;
                      str+=(excessItem.title||parentkey)+"中的第"+(index+1)+"条数据"+name;
                      reject(str);
                      return true;
                    }
                  });
                }
              }
              return valiRes;
            }
          }
          return valiRes;
        });
      }
      return valiRes;
    };
    vali(this);
    if(!list||list.length===0){
      reject("没有表单可以验证");
    }
    if(valiRes){
      resolve();
    }
  })
};
/* 将对象的所有值转换为字符串 */
Object.prototype.toChar=function(){
  Object.keys(this).forEach(key=>{
    switch(toStr.call(this[key])){
      case "[object Array]":
      this[key].forEach(item=>{
        if(toStr.call(item)=="[object Object]"){
          item.toChar();
        }else{
          item.toString();
        }
      });
      break;
      case "[object Object]":
      this[key].toChar();
      break;
      case "[object Number]":
      this[key].toString();
      break;
    }
  });
}
/* 对字符串直接转换为小数,无法转换的转化为0*/
String.prototype.toFixed=function(n=2){
  //当时用number方法或者parseFloat方法转换结果为NaN时返回空
  if(isNaN(parseFloat(this))){
      return '';
  }
  else{
    return parseFloat(this).toFixed(n);
  }
}
Object.defineProperty(String.prototype,'toFixed',{enumerable:false,configurable:false});
Object.defineProperty(Object.prototype,'validate',{enumerable:false,configurable:false});
Object.defineProperty(Object.prototype,'toChar',{enumerable:false,configurable:false});
