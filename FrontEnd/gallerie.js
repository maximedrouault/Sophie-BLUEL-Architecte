// Import de la fonction "editMode" à partir de "editMode.js" permettant d'actualiser la page INDEX.HTML si authentifié.
import {editMode} from "./editMode.js";
// Import de la fonction "modale" à partir de "modale.js" permettant de gérer l'affichage de la MODALE dans INDEX.HTML.
import {modale} from "./modale.js";


// Récupération des données "WORKS" sur l'API.
const responseWorks = await fetch("http://localhost:5678/api/works");
const works = await responseWorks.json();

// Récupération des données "CATEGORIES" sur l'API.
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();



// Fonction pour générer la gallerie en fonction des filtres de type de travaux.
function generateGallery(works) {
	// Parcours des données WORKS pour les ajouter au HTML (Gallerie de travaux).
	for (let i = 0; i < works.length; i++) {

		const work = works[i];
		// Récupération de l'élément du DOM qui accueillera les fiches des différents travaux.
		const sectionGallery = document.querySelector(".gallery");
		// Création d'une balise dédiée à une fiche de travaux.
		const galleryElement = document.createElement("figure");
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


// Parcours des données de CATEGORIES pour les ajouter au HTML (Filtres des types de travaux).
for (let i = 0; i < categories.length; i++) {

	const category = categories[i];
	// Récupération de l'élément du DOM qui accueilera les boutons des différentes catégories.
	const categoryFilterSection = document.querySelector(".category-filter-section");
	// Création d'une balise dédiée à une catégorie de travaux.
	const categoryButton = document.createElement("button");
	categoryButton.innerText = category.name;
	categoryButton.id = category.id;
	// Rattachement des balises BUTTON à la section CATEGORY-FILTER-SECTION
	categoryFilterSection.appendChild(categoryButton);
}


// Filtrage des projets de la "Gallery" à l'aide des boutons de "Catégories"
const buttonFilter = document.querySelectorAll(".category-filter-section button");

for(let i = 0; i < buttonFilter.length; i++){
    buttonFilter[i].addEventListener("click", function() {
        const buttonFilterId = this.id;
            if (buttonFilterId == categoryAll.id) {
				document.querySelector(".gallery").innerHTML = "";
				generateGallery(works);
			} else {
				const worksFiltered = works.filter(function (work) {
					return work.categoryId == buttonFilterId;
			});
        document.querySelector(".gallery").innerHTML = "";
        generateGallery(worksFiltered);
		}
    });
}

// Appel de la fonction "editMode" de "editMode.js" qui permet d'actualiser la page INDEX.HTML si authentifié.
editMode ();

// Appel de la fonction de gestion de la "Modale" dans "modale.JS" qui permet de gérer les projets si authentifié.
modale ();