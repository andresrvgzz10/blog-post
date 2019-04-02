const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();
const jsonParser = bodyParser.json(); 


const post = [
	{
		id: uuid.v4(),
		title: "Las cronicas de Narnia",
		content: "Viajes al fin del mundo, criaturas fantásticas y batallas épicas entre el bien y el mal",
		author: "C. S. Lewis",
		publishDate: 20022000
	},
	{
		id: uuid.v4(),
		title: "El Señor de los Anillos",
		content: "Basada en la primer historia épica de J.R.R. Tolkien, sobre la búsqueda para poseer o destruir todo el poder del Anillo.",
		author: "Peter Jackson",
		publishDate: 21122001
	},
	{
		id: uuid.v4(),
		title: "Juan",
		content: "Basada en la primer historia épica de J.R.R. Tolkien, sobre la búsqueda para poseer o destruir todo el poder del Anillo.",
		author: "Peter Jackson",
		publishDate: 21122001
	},

]

//GET request of all blog posts should go to /blog-posts
app.get('/blog-posts', (req,res) => {
	res.status(200).json({
		message : "Successfully sent the list of post",
		status	: 200,
		sports 	: post
	});
});

//GET by author requests should go to /blog-posts/:author
app.get('/blog-posts/:author', (req,res) => {
	let authorName = req.params.author;

	if (!authorName) 
	{
		res.status(406).json({
				message : "The author is not validate",
				status	: 406,
			});
	}

	var authorArray = [];




	post.forEach(item => {
		if (item.author == authorName){
			authorArray.push(item);
		}
	});

	if (authorArray.length > 0) 
	{
		res.status(200).json({
				message : "Successfully sent the Author Name",
				status	: 200,
				title 	: authorArray
			});
	}
	else{
		res.status(404).json({
				message : "Author not found",
				status	: 404,
			});
	}
	

});

//POST requests of a blog post should go to /blog-posts
app.post('/blog-posts',jsonParser,(req,res) =>{

	let titleNew = req.body.title;
	let contentNew = req.body.content;
	let authorNew = req.body.author;
	let publishDateNew = req.body.publishDate;

	if (!titleNew || !contentNew || !authorNew || !publishDateNew) 
	{
		res.status(406).json({
				message : "Not all the fields are complete",
				status	: 406,
			});
	}

	let newP = {
		id: uuid.v4(),
		title: titleNew,
		content: contentNew,
		author: authorNew,
		publishDate: publishDateNew
	}

	post.push(newP);

	res.status(201).json({
        message: "Post Added Successfully",
        status: 201,
        post: newP
    });

});

//DELETE requests should go to /blog-posts/:id
app.delete('/blog-posts/:id',jsonParser,(req,res)=>{
	let idAuthorBody = req.body.id;
	let idAuthorParam = req.params.id;

	if (!idAuthorParam || !idAuthorBody ) 
	{
		res.status(406).json({
            message: "Missing id in a field",
            status: 406
        });
	}

	post.forEach((item) => {

		if (idAuthorParam == item.id) 
		{
			//delete sometimes work and split always 
			post.splice(item,1);
			//delete post[item];
			res.status(204).json({
            message: "Delete complete",
            status: 204
        });
		}

	});

	res.status(404).json({
            message: "Not found",
            status: 404
        });


});

//PUT requests should go to /blog-posts/:id
app.put('/blog-posts/:id',jsonParser,(req,res) =>{

	let idPost = req.params.id;

	if (!idPost) 
	{
		res.status(406).json({
            message: "Validate Id",
            status: 406
        });
	}

	let newTitle = req.body.title;
	let newContent = req.body.content;
	let authorNew = req.body.author;
	let publishDateNew = req.body.publishDate;

	if (!newContent || !newTitle || !authorNew || !publishDateNew) 
	{
		res.status(404).json({
            message: "Validate params",
            status: 404
        });
	}

	post.forEach(item => {
		if (idPost == item.id) 
		{
			if (newTitle) 
			{
				item.title = newTitle;
			}
			if (newContent) 
			{
				item.content = newContent;
			}
			if (authorNew) 
			{
				item.author = authorNew;
			}
			if (publishDateNew) 
			{
				item.publishDate = publishDateNew;
			}

			res.status(200).json({
                    message: "Update",
                    status: 200,
                    post: item
                });
		}
	})

});

//local host
app.listen(8080, () => {
	console.log("Your app is running in port 8080")
});