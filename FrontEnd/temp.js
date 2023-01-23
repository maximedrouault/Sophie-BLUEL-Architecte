.then(function(response) {
	return response.json();
})
.then(function(data) {
	// Stockage de la réponse d'authentification dans le LOCAL-STORAGE
	console.log(data);
});