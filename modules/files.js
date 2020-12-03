import sqlite from 'sqlite-async'
class Files {
	constructor(dbName =':memory:') {
		return(async() => {
			this.db=await sqlite.open(dbName)
			const sql='CREATE TABLE IF NOT EXISTS homepage(\
        id INTEGER PRIMARY KEY AUTOINCREMENT,\
        userid INTEGER,\
        uploadname TEXT NOT NULL,\
        filetype TEXT NOT NULL,\
        file TEXT NOT NULL,\
        filesize TEXT NOT NULL,\
        description TEXT,\
        FOREIGN KEY(userid) REFERENCES users(id)\
      );'
			await this.db.run(sql)
			return this
		})()
	}
	async add(data) {
		if (typeof data.uid==='string'&& typeof data.uploadname==='string' && typeof data.filetype==='string') {
			console.log('testing if it reads')
			console.log(data)
			const sql=`INSERT INTO homepage(userid, uploadname, filetype)\
    VALUES(${data.uid}, "${data.uploadname}", "${data.filetype}")`
			console.log(sql)
			await this.db.run(sql)
			return true
		}else{
			if(typeof data.uid==='undefined'|| typeof data.uploadname==='undefined' || typeof data.filetype==='undefined') {
				throw new Error('data is missing from one or more inputs')
			}else{

				throw new Error('one or more inputs have the wrong datatype')
			}
		}
	}
	async all(userid) {
		if (typeof userid==='string') {
			const sql=`SELECT users.user, homepage.* FROM homepage, users\
      WHERE homepage.userid = users.id AND homepage.userid="${userid}"`
			const files = await this.db.all(sql)
			return files
		}else{
			throw new Error('expected interger')
		}
	}
  async delete(id){
    const sql=`DELETE FROM homepage\
    WHERE homepage.id="${id}"`
    await this.db.run(sql)
  }
  async column(id){
    const sql=`SELECT homepage.* FROM homepage\
     WHERE homepage.id="${id}"`
		const files = await this.db.all(sql)
		return files
  }

	async close() {
		await this.db.close()
	}
}
export default Files
