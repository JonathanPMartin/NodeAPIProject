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
		console.log('testing if it reads')
		console.log(data)
		const sql=`INSERT INTO homepage(userid, uploadname, filetype)\
    VALUES(${data.userid}, "${data.uploadname}", "${data.filetype}")`
		console.log(sql)
		await this.db.run(sql)
		return true
	}
	async all() {
		const sql='SELECT users.user, homepage.* FROM homepage, users\
      WHERE homepage.userid = users.id'
		const files = await this.db.all(sql)
		return files
	}
	async getByID(id) {
		const sql='SELECT users.user, From homepage, users\
        WHERE homepage.userid= users.id AND contacts.id=${id}'
		const files = await this.db.getByID(sql)
		return files
	}

	async close() {
		await this.db.close()
	}
}
export default Files
