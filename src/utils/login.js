// created() {
//     this.login();
//     // this.logout()
//   },
//   methods: {
//     async logout() {
//       const data = await this.$Parse.User.logOut()
//       console.log('退出登录',data)
//     },
//     async login() {
//       const {data} = await this.$Parse.Cloud.run("login");
//       const user = await this.$Parse.User.become(data.sessionToken)
//       console.log('我带着token又登录啦',user);
//     },
//     back() {
//       this.$router.go(-1);
//     }
//   }