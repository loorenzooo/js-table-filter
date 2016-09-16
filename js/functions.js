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
      retour[row[0]] = new Object();
      retour[row[0]].label = row[0];
      retour[row[0]].items = [];
      retour[row[0]].rowspan = 0
    }
    // Ajout de la valeur de la feuille
    retour[row[0]].items.push(row[1]);
    retour[row[0]].rowspan = retour[row[0]].rowspan + 1;
  }
  return retour;
}

function toHtml(catalogue){

  var retour = "<table>";
  for (var niv1_prop in catalogue){
    // Niveau 1
    var niv1 = catalogue[niv1_prop];
    retour += "<tr rowspan='"+niv1.rowspan+"'>";
    retour += "<td>"+niv1.label+"</td>";
    retour += "</tr>";

    // Niveau 1 container
    retour += "<div class='left'>";
    // Niveau 2
    for (var niv2_prop in niv1.items){
      var niv2 = niv1.items[niv2_prop];
      retour += "<div>";
      retour += niv2;
      retour += "</div>";
    }
    retour += "</div>";
  }
  retour += "</div>";
  return retour;
}
