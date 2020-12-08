
import test from 'ava'
import Accounts from '../modules/accounts.js'
import Files from '../modules/files.js'
const dbName ='website.db'
test('REGISTER : register and log in with a valid account', async test => {
	test.plan(1)
	const account = await new Accounts() // no database specified so runs in-memory
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
	  const login = await account.login('doej', 'password')
		test.is(login, true, 'unable to log in')
	} catch(err) {
		test.fail('error thrown')
	} finally {
		account.close()
	}
})

test('REGISTER : register a duplicate username', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
		await account.register('doej', 'password', 'doej@gmail.com')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'username "doej" already in use', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('REGISTER : error if blank username', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('', 'password', 'doej@gmail.com')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'missing field', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('REGISTER : error if blank password', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', '', 'doej@gmail.com')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'missing field', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('REGISTER : error if blank email', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', '')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'missing field', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('REGISTER : error if duplicate email', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
		await account.register('bloggsj', 'newpassword', 'doej@gmail.com')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'email address "doej@gmail.com" is already in use', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('LOGIN    : invalid username', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
		await account.login('roej', 'password')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'username "roej" not found', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('LOGIN    : invalid password', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
		await account.login('doej', 'bad')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'invalid password for account "doej"', 'incorrect error message')
	} finally {
		account.close()
	}
})
test('ALL :error if invald  datatype given', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	try {
		await files.all(1)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'expected string')
	} finally {
		files.close()
	}
})
test('ADD :error if Missing  data', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	try {
		await files.add(1)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'SQLITE_ERROR: no such column: undefined')
	} finally {
		files.close()
	}
})
test('ADD :error if invald data type given', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	const data={
		uid: 2,
		uploadname: 'steve',
		filetype: 'text'
	}
	try {
		await files.add(data)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'string is expected for uid not number')
	} finally {
		files.close()
	}
})
test('DELETE:  eroor if no id given', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	try {
		await files.delete()
		test.fail('error not thrown')
	}catch(err) {
		test.is(err.message,'type of id is expected to be string not undefined')
	}finally{
		files.close()
	}
})
test('DELETE: error if int id given', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	try {
		await files.delete(1)
		test.fail('error not thrown')
	}catch(err) {
		test.is(err.message,'type of id is expected to be string not number')
	}finally{
		files.close()
	}
})
test('COLUMN: error if no id given', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	try {
		await files.column()
		test.fail('error not thrown')
	}catch(err) {
		test.is(err.message,'type of id is expected to be string not undefined')
	}finally{
		files.close()
	}
})
test('COLUMN: error if int id given', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	try {
		await files.column(1)
		test.fail('error not thrown')
	}catch(err) {
		test.is(err.message,'type of id is expected to be string not number')
	}finally{
		files.close()
	}
})