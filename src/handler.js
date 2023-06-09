const books = require("./books")
const { nanoid } = require("nanoid")

const addHandler = (request, h) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading
	} = request.payload
	if(name === undefined) {
		const response = h.response({
			status: "fail",
			message: "Gagal menambahkan buku. Mohon isi nama buku"
		})
		response.code(400)
		return response
	}
	if(readPage > pageCount) {
		const response = h.response({
			status: "fail",
			message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
		})
		response.code(400)
		return response
	}
	const id = nanoid(16)
	const finished = readPage === pageCount ? true : false
	const insertedAt = new Date().toISOString()
	const updatedAt = insertedAt
	const book = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished,
		reading,
		insertedAt,
		updatedAt
	}
	books.push(book)

	const response = h.response({
		status: "success",
		message: "Buku berhasil ditambahkan",
		data: {
			bookId: id
		}
	})
	response.code(201)
	return response
}

const getAllHandler = (request, h) => {
	const { name, reading, finished } = request.query
	let filteredBooks = books
	if(name) {
		filteredBooks = books.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
	}
	if(reading) {
		filteredBooks = filteredBooks.filter(item => item.reading == reading)
	}
	if(finished) {
		filteredBooks = filteredBooks.filter(item => item.finished == finished)
	}
	const response = h.response({
		status: "success",
		data: {
			books: filteredBooks.map(item => {
				const { id, name, publisher } = item
				return { id, name, publisher }
			})
		}
	})
	response.code(200)
	return response
}

const getHandler = (request, h) => {
	const { bookId } = request.params
	const book = books.filter(item => item.id === bookId)[0]
	if(book) {
		const response = h.response({
			status: "success",
			data: {
				book
			}
		})
		response.code(200)
		return response
	}
	const response = h.response({
		status: "fail",
		message: "Buku tidak ditemukan"
	})
	response.code(404)
	return response
}

const updateHandler = (request, h) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading
	} = request.payload
	if(name === undefined) {
		const response = h.response({
			status: "fail",
			message: "Gagal memperbarui buku. Mohon isi nama buku"
		})
		response.code(400)
		return response
	}
	if(readPage > pageCount) {
		const response = h.response({
			status: "fail",
			message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
		})
		response.code(400)
		return response
	}
	const { bookId } = request.params
	const index = books.findIndex(item => item.id === bookId)
	if(index !== -1) {
		const updatedAt = new Date().toISOString()
		const finished = readPage === pageCount ? true : false
		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			finished,
			reading,
			updatedAt
		}
		const response = h.response({
			status: "success",
			message: "Buku berhasil diperbarui"
		})
		response.code(200)
		return response
	}
	const response = h.response({
		status: "fail",
		message: "Gagal memperbarui buku. Id tidak ditemukan"
	})
	response.code(404)
	return response
}

const deleteHandler = (request, h) => {
	const { bookId } = request.params
	const index = books.findIndex(item => item.id === bookId)
	if(index !== -1) {
		books.splice(index, 1)
		const response = h.response({
			status: "success",
			message: "Buku berhasil dihapus"
		})
		response.code(200)
		return response
	}
	const response = h.response({
		status: "fail",
		message: "Buku gagal dihapus. Id tidak ditemukan"
	})
	response.code(404)
	return response
}

module.exports = {
	addHandler,
	getAllHandler,
	getHandler,
	updateHandler,
	deleteHandler
}