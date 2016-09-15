/**
* Applique un filtre sur le catalogue
* Retourne le tableau contenant les éléments filtrés
**/
function filtrage(catalogue, filtres) {

  return $.grep( catalogue, function( n, i ) {
    var retour = true;
    // Boucle sur les filtres
    for (var i = 0; i < filtres.length; i++) {
      if (filtres[i] != null) {
        retour = filtres[i] === n[i];
        if (!retour) break;
      }
    }
    return retour;
  });

}

function toAssociativeArray(catalogue){
  var retour = new Object();
  // Boucle sur les enregistrements
  for (var i = 0; i < catalogue.length; i++) {
    var row = catalogue[i];
    // Si l'arbo jusqu'à la feuille n'existe pas on la créé
    if (typeof retour[row[0]] === 'undefined'){
      retour[row[0]] = []
    }
    // Ajout de la valeur de la feuille
    retour[row[0]].push(row[1]);
  }
  return retour;
}
