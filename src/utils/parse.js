import Parse from 'parse'
Parse.initialize(process.env.VUE_APP_ID);
Parse.serverURL = process.env.VUE_APP_URL
export default Parse