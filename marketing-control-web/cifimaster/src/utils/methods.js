/* 周计划指标排列*/
export function weekPlanSort(time, output = false) {
  let weekList = [];
  let currentDate = time ? new Date(time) : new Date();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let nextMonth = month != 12 ? (new Date(`${year}/${month+1}/1`)) : new Date(`${year+1}/1/1`);
  //本月第一天
  let firstDay = new Date(`${year}/${month}/1`);
  //本月最后一天
  let lastDay = new Date(nextMonth.getTime() - 1000);

  const week = firstDay.getDay() || 7;

  let currentDay = 1;
  for (let i = 0; i < 5; i++) { //每月最多五周
    let weekIndex = ["一", "二", "三", "四", "五"];
    let days = 7; //天数
    if (i == 0) {
      days = week <= 3 ? 7 - week : 7 + (7 - week);
    }
    if (currentDay + 7 > lastDay.getDate()) {
      if (lastDay.getDate() - currentDay >= 3) {
        days = lastDay.getDate() - currentDay;
        if (!output)
          weekList.push({
            years: `${year}年${month}月`,
            week: `第${weekIndex[i]}周`,
            timeRange: `${month}月${currentDay+1}日-${month}月${currentDay+days}日`
          });
        else weekList.push({
          this_time: `${year}-${month}-${currentDay+days}`,
          how_week: `${i+1}`,
          start_time: `${year}-${month}-${currentDay+1}`,
          end_time: `${year}-${month}-${currentDay+days}`,
          day_num: days
        });
      } else {
        if (!output)
        weekList[weekList.length - 1].timeRange = `${month}月${currentDay}日-${month}月${lastDay.getDate()}日`;
        else {
          weekList[weekList.length - 1].start_time=`${year}-${month}-${currentDay}`;
          weekList[weekList.length - 1].end_time=`${year}-${month}-${lastDay.getDate()}`;
        }
      }
      break;
    }
    if (!output)
      weekList.push({
        years: `${year}年${month}月`,
        week: `第${weekIndex[i]}周`,
        timeRange: `${month}月${i!=0?currentDay+1:currentDay}日-${month}月${currentDay+days}日`,
      });
    else
      weekList.push({
        this_time: `${year}-${month}-${currentDay+days}`,
        how_week: `${i+1}`,
        start_time: `${year}-${month}-${i!=0?currentDay+1:currentDay}`,
        end_time: `${year}-${month}-${currentDay+days}`,
        day_num: days
      });
    currentDay += days;
  }
  return weekList;
};
/*
金额合计
 */
/* 三个参数分别为合计的数组,需要合计的键,值为数组,初始值 */
export function total(list, target, totalObj = {}) {
  target.forEach(item => {
    totalObj[item] = 0;
  });
  list.forEach(item => {
    if (!item.children||!item.children.length) {
      target.forEach(key => {
        totalObj[key] += Number(item[key]);
      });
    }else {
      let totals = total(item.children, target);
      target.forEach(key => {
        item[key] = totals[key];
        totalObj[key] += Number(totals[key]);
      });
    }
  });
  return totalObj;
}


/* 排序集团分级列表 */
export function sortList(list, key, parentKey, levelKey, lazy = false, hasChildrenKey = "father_count") { //1.列表，2.当前字段的key3.父级的key4.等级关键字的key 5.共几个等级6.是否需要最后一级懒加载

  let level = [...new Set(list.map(item => item[levelKey]))].sort((x, y) => x - y); //获取分级的数组
  /* 创建一个等级数组用来存放改等级的列表*/
  let levelArray = level.map(item => new Array);

  level = level.map(item => item.toString()); //不论等级的值是不是数字都转换为字符串

  /* 遍历数组将所有的元素选择不同等级并插入levelArray*/
  list.forEach(item => {
    let index = level.indexOf(item[levelKey].toString());
    if (index === -1) throw "等级列表参数有误，请确认等级参数";
    if (lazy && index == level.length - 1) {
      item.hasChildren = item[hasChildrenKey] > 0;
      item.children = new Array;
    }
    levelArray[index].push(item);
  });
  /* levelArray中第一个索引的数组为最顶级的元素，遍历这个数组确定父级ID，并存储*/
  let len = level.length - 1;
  for (len; len > 0; len--) { //从下向上查找
    levelArray[len].forEach(child => { //子集元素
      levelArray[len - 1].forEach(parent => { //父级元素
        if (child[parentKey] === parent[key]) { //如果父级的key和子级的parentKey相等
          if (!parent.children) parent.children = new Array;
          parent.children.push(child); //将子级添加到父级中。
        }
      });
    });
  }
  return levelArray.shift();
}
