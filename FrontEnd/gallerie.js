// Récupération des données "WORKS" sur l'API.
const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

// Fonction pour générer la gallerie en fonction des filtres de type de travaux.
function generateGallery(works) {
	// Parcours des données WORKS pour les ajouter au HTML (Gallerie de travaux).
	for (let i = 0; i < works.length; i++) {

		const work = works[i];
		// Récupération de l'élément du DOM qui accueillera les fichies des différents travaux.
		const sectionGallery = document.querySelector(".gallery");
		// Création d'une balise dédiée à une fiche de travaux.
		const galleryElement = document.createElement("figure");
		// Création des balises.
		const imageElement = document.createElement("img");
		imageElement.src = work.imageUrl;
		imageElement.alt = work.title;
		imageElement.crossOrigin = "";  //à revoir avec DAVID !!!!!!-----------------
		const figCaptionElement = document.createElement("figcaption");
		figCaptionElement.innerText = work.title;
		// Rattachement de la balise FIGURE à la section "Gallery".
		sectionGallery.appendChild(galleryElement);
		// Rattachement de la balise IMG à "sectionGallery" (la balise figure).
		galleryElement.appendChild(imageElement);
		galleryElement.appendChild(figCaptionElement);
	}
}

generateGallery(works);


// Fonction pour filtrer les projets de la "Gallery"

// Bouton TOUS seul pour l'instant

const buttonFilterAll = document.querySelector(".button-filter-all");

buttonFilterAll.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(works);
});

// Bouton OBJETS seul pour l'instant

const buttonFilterObjects = document.querySelector(".button-filter-objects");

buttonFilterObjects.addEventListener("click", function () {
    const worksFiltered = works.filter(function (work) {
        return work.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(worksFiltered);
});

// Bouton APPARTEMENTS seul pour l'instant

const buttonFilterApartments = document.querySelector(".button-filter-apartments");

buttonFilterApartments.addEventListener("click", function () {
    const worksFiltered = works.filter(function (work) {
        return work.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(worksFiltered);
});

// Bouton HOTELS ET RESTAURANTS seul pour l'instant

const buttonFilterHotelsAndRestaurants = document.querySelector(".button-filter-hotels-and-restaurants");

buttonFilterHotelsAndRestaurants.addEventListener("click", function () {
    const worksFiltered = works.filter(function (work) {
        return work.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(worksFiltered);
});