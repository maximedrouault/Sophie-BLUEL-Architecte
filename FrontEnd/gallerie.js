// Récupération des données "WORKS" sur l'API.
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

// Parcours des données WORKS pour les ajouter au HTML (Gallerie de travaux).
for (let i = 0; i < works.length; i++) {

	const work = works[i];
	// Récupération de l'élément du DOM qui accueillera les fichies des différents travaux.
	const sectionGallerie = document.querySelector(".gallery");
	// Création d'une balise dédiée à une fiche de travaux.
	const gallerieElement = document.createElement("figure");
	// Création des balises.
	const imageElement = document.createElement("img");
	imageElement.src = work.imageUrl;
	imageElement.alt = work.title;
	imageElement.crossOrigin = "anonymous";  //à revoir avec DAVID !!!!!!
	console.log
	const figCaptionElement = document.createElement("figcaption");
	figCaptionElement.innerText = work.title;
	// Rattachement de la balise FIGURE à la section "Gallery".
	sectionGallerie.appendChild(gallerieElement);
	// Rattachement de la balise IMG à "sectionGallerie" (la balise figure).
	gallerieElement.appendChild(imageElement);
	gallerieElement.appendChild(figCaptionElement);
}