import {  foreignLogin } from "@/api/offerFlow";

export const initMenu = (router, menu) => {
    if (menu.length === 0) {
      return
    }
    const unfound = {
      path: '*',
      redirect: '/404',
      isshow: 0
    }
    menu.push(unfound);
    router.addRoutes(menu)
}
export function appSetToken(){
  // localStorage.clear()
  // foreignLogin({
  //   accessToken: document.cookie.replace(
  //     /(?:(?:^|.*;\s*)SIAMTGT\s*\=\s*([^;]*).*$)|^.*$/,
  //     "$1"
  //   )
  // }).then(res => {
  //   if(res.code==0){
  //   const token = res.result.token;
  //   const expiration = res.result.expiration;
  //   const user = res.result.user;
  //   const job = res.result.user.job;
  //   const employeeName = res.result.user.employeeName;
  //   const JobName = res.result.user.job.JobName;
  //   const ProductID = res.result.user.job.ProductID;
  //   const JobOrgID = res.result.user.job.JobOrgID;
  //   const AuthCompanyID = res.result.user.job.AuthCompanyID;
  //   const authCompanyId = res.result.user.authCompanyId;
  //   const projectId = res.result.user.projectId;
  //   const productId = res.result.user.productId;
  //   const id = res.result.user.id;
  //   const username = res.result.user.username;
  //   const ID = res.result.user.job.ID;
  //   const CommonJobID = res.result.user.job.CommonJobID;
  //   window.localStorage.setItem("userInfo", JSON.stringify(user));
  //   window.localStorage.setItem("id", id);
  //   window.localStorage.setItem("username", username);
  //   window.localStorage.setItem("ID", ID);
  //   window.localStorage.setItem("employeeName", employeeName);
  //   window.localStorage.setItem("ProductID", ProductID);
  //   window.localStorage.setItem("JobOrgID", JobOrgID);
  //   window.localStorage.setItem("AuthCompanyID", AuthCompanyID);
  //   window.localStorage.setItem("token", token);
  //   window.localStorage.setItem("expiration", expiration);
  //   window.localStorage.setItem("JobName", JobName);
  //   window.localStorage.setItem("job", job);
  //   window.localStorage.setItem("pojid", projectId);
  //   window.localStorage.setItem("CommonJobID", CommonJobID);
  //   }
  // });
}



