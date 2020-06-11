export function getUUID() {
  let  uuid = require('node-uuid');
  return uuid.v1();
}
