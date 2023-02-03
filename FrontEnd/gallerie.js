// Import de la liste de tous les travaux du FETCH sur l'API, à partir de FETCHDATAS.JS
import { works } from "./fetchDatas.js";
// Import de la liste de toutes les catégories de travaux du FETCH sur l'API, à partir de FETCHDATAS.JS
import { categories } from "./fetchDatas.js";
// Import de la fonction "editMode" à partir de "editMode.js" permettant d'actualiser la page INDEX.HTML si authentifié.
import { editMode } from "./editMode.js";
// Import de la fonction "modale" à partir de "modale.js" permettant de gérer l'affichage de la MODALE dans INDEX.HTML.
import { modale } from "./modale.js";
// Export de la fonction "generateGallery" dans "modale.js" pour actualisation de l'affichage des "Galleries" après ajout ou suppression d'un projet.
export { generateGallery };


// Fonction pour générer la gallerie en fonction des filtres de type de travaux.
function generateGallery(works) {
	// Parcours des données WORKS pour les ajouter au HTML (Gallerie de travaux).
	for (let i = 0; i < works.length; i++) {

		const work = works[i];
		// Récupération de l'élément du DOM qui accueillera les fiches des différents travaux.
		const sectionGallery = document.querySelector(".gallery");
		// Création d'une balise dédiée à une fiche de travaux.
		const galleryElement = document.createElement("figure");
		galleryElement.dataset.id = work.id;
		// Création des balises.
		const imageElement = document.createElement("img");
		imageElement.src = work.imageUrl;
		imageElement.alt = work.title;
		imageElement.crossOrigin = "";
		const figCaptionElement = document.createElement("figcaption");
		figCaptionElement.innerText = work.title;
		// Rattachement de la balise FIGURE à la section "Gallery".
		sectionGallery.appendChild(galleryElement);
		// Rattachement des balises IMG et FIGCAPTION à "galleryElement" (la balise FIGURE).
		galleryElement.appendChild(imageElement);
		galleryElement.appendChild(figCaptionElement);
	}
}

generateGallery(works);


// Ajout du bouton filtre "TOUS" au tableau de catégories récupéré sur l'API.
const categoryAll = {"id": 0,"name": "Tous"};
categories.unshift(categoryAll);


// Parcours des données de CATEGORIES pour les ajouter au HTML et créer les "boutons de catégories" (Filtres des types de travaux).
for (let i = 0; i < categories.length; i++) {
	const category = categories[i];
	// Récupération de l'élément du DOM qui accueilera les boutons des différentes catégories.
	const categoryFilterSection = document.querySelector(".category-filter-section");
	// Création d'une balise dédiée à une catégorie de travaux.
	const categoryButton = document.createElement("button");
	categoryButton.innerText = category.name;
	// Ajout des Listerner sur les boutons de catégories en même temps que leurs générations.
	categoryButton.addEventListener("click", function() {
		categoryFilter(category.id);
	});
	// Rattachement des balises BUTTON à la section CATEGORY-FILTER-SECTION
	categoryFilterSection.appendChild(categoryButton);
}


// Fonction de "Filtrage des projets" de la "Gallery" à l'aide des boutons de "Catégories"
async function categoryFilter(categoryButtonId) {

	if (categoryButtonId == categoryAll.id) {
		document.querySelector(".gallery").innerHTML = "";
		generateGallery(works);
	} else {
		const worksFiltered = works.filter(function (work) {
		return work.categoryId == categoryButtonId;
	});

	document.querySelector(".gallery").innerHTML = "";
	generateGallery(worksFiltered);
	}
};


// Appel de la fonction "editMode" de "editMode.js" qui permet d'actualiser la page INDEX.HTML si authentifié.
editMode ();

// Appel de la fonction de gestion de la "Modale" dans "modale.JS" qui permet de gérer les projets si authentifié.
modale ();