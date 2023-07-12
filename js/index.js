const blogPostsHtml = document.querySelector(".blog-posts");
const newPost = document.querySelector(".new-post");
let postsArray = [];

function renderPosts() {
	var html = "";
	for (let post of postsArray) {
		html += `
		<h3>${post.title}</h3>
		<p>${post.body}</p>
		<hr />`;
	}
	blogPostsHtml.innerHTML = html;
}

const postHtml = fetch("https://apis.scrimba.com/jsonplaceholder/posts")
	.then((res) => res.json())
	.then((data) => {
		postsArray = data.slice(0, 8);
		renderPosts();
	});

newPost.addEventListener("submit", (e) => {
	e.preventDefault();
	const postTitle = document.querySelector(".post-title").value;
	const postBody = document.querySelector(".post-body").value;
	const data = {
		title: postTitle,
		body: postBody,
	};
	fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((post) => {
			postsArray.unshift(post);
			renderPosts();
			newPost.reset();
		});
});
