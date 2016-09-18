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
    var niv2 = new Object();
    niv2.label = row[1];
    retour[row[0]].items[row[1]] = niv2;
    retour[row[0]].rowspan = retour[row[0]].rowspan + 1;
  }
  return retour;
}

function toHtml(catalogue){

  var retour = "<table>";
  for (var niv1_prop in catalogue){
    // Niveau 1
    var niv1 = catalogue[niv1_prop];
    retour += "<tr><td rowspan='"+niv1.rowspan+"'>"+niv1.label+"</td>";

    // Boucle sur niveau 2
    var niv2_tr = '';
    for (var niv2_prop in niv1.items){
        var niv2 = niv1.items[niv2_prop];
        retour += niv2_tr+"<td>"+niv2.label+"</td></tr>";
        niv2_tr="<tr>";
    }
  }
  retour += "</table>";
  return retour;
}
