const {
	addHandler,
	getAllHandler,
	getHandler,
	updateHandler,
	deleteHandler
} = require("./handler")

const routes = [
	{
		method: "POST",
		path: "/books",
		handler: addHandler
	},
	{
		method: "GET",
		path: "/books",
		handler: getAllHandler
	},
	{
		method: "GET",
		path: "/books/{bookId}",
		handler: getHandler
	},
	{
		method: "PUT",
		path: "/books/{bookId}",
		handler: updateHandler
	},
	{
		method: "DELETE",
		path: "/books/{bookId}",
		handler: deleteHandler
	}
]

module.exports = routes