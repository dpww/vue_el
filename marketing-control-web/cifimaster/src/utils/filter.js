/* 整数过滤 */
export function number(val) {
  if (!(/^[1-9]\d*$/.test(val))) {
    if (Number.isNaN(parseInt(val))) {
      return '';
    } else {
      return parseInt(val);
    }
  }
  return val;
}
/* 小数过滤 */
export function decimal(val) {
  if (/^[1-9]\d*$/.test(val)||val==0) {
    return val;
  } else if (!(/^[0-9]+\.[0-9]{0,2}$/.test(val))) {
    if (Number.isNaN(parseFloat(val))) {
      return '';
    } else{
      let n=parseFloat(val).toFixed(2)
      return parseFloat(val).toFixed(2);
    }
  }
  return parseFloat(val).toFixed(2);
}

export function tableFixed(val) {
  if (/^[1-9]\d*$/.test(val)||val==0) {
    return val;
  } else if (!(/^[0-9]+\.[0-9]{0,2}$/.test(val))) {
    if (Number.isNaN(parseFloat(val))) {
      return '';
    } else{
      let n=parseFloat(val).toFixed(4)
      return parseFloat(val).toFixed(4);
    }
  }
  return parseFloat(val).toFixed(4);
}
