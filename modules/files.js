import sqlite from 'sqlite-async'
class Files {
	constructor(dbName =':memory:') {
		return(async() => {
			this.db=await sqlite.open(dbName)
			const sql='CREATE TABLE IF NOT EXISTS files(\
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
		for (const item in data) {
			if (typeof data[item]!=='string') throw new Error(data.item)
		}
		console.log('testing if it reads')
		console.log(data)
		const sql=`INSERT INTO files(userid, uploadname, filetype,file,filesize,description)\
    VALUES(${data.uid}, "${data.uploadname}", "${data.filetype}", "${data.file}", "${data.filesize}", "${data.des}")`
		console.log(sql)
		await this.db.run(sql)
		return true
	}
	async all(userid) {
		if (typeof userid==='string') {
			const sql=`SELECT users.user, files.* FROM files, users\
      WHERE files.userid = users.id AND files.userid="${userid}"`
			const files = await this.db.all(sql)
			return files
		}else{
			throw new Error('expected interger')
		}
	}
	async delete(id) {
		const sql=`DELETE FROM files\
    WHERE files.id="${id}"`
		await this.db.run(sql)
	}
	async column(id) {
		const sql=`SELECT files.* FROM files\
     WHERE files.id="${id}"`
		const files = await this.db.all(sql)
		return files
	}

	async close() {
		await this.db.close()
	}
}
export default Files
