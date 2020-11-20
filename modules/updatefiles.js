import sqlite from 'sqlite-async'
class Files{
  constructor(dbName =':memory:',uid =':memory',uname =':memory',ftype =':memory'){
    return(async()=>{
      this.db=await sqlite.open(dbName)
      const sql='INSERT INTO homepage(userid, uploadname, filetype) VALUES(uid,uname,ftye)'
      })()
           }
}
export default Files 
