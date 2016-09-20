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

    // Création de la structure niveau 1 si nécessaire
    if (typeof retour[row[0]] === 'undefined'){
      retour[row[0]] = new Object();
      retour[row[0]].label = row[0];
      retour[row[0]].items = [];
      retour[row[0]].rowspan = 0
    }

    // Création de la structure niveau 2 si nécessaire
    if (typeof retour[row[0]].items[row[1]] === 'undefined'){
      retour[row[0]].items[row[1]] = new Object();
      retour[row[0]].items[row[1]].label = row[1];
      retour[row[0]].items[row[1]].items = [];
      retour[row[0]].items[row[1]].rowspan = 0
    }

    // Création de la structure niveau 3 si nécessaire
    if (typeof retour[row[0]].items[row[1]].items[row[2]] === 'undefined'){
      retour[row[0]].items[row[1]].items[row[2]] = new Object();
      retour[row[0]].items[row[1]].items[row[2]].label = row[2];
      retour[row[0]].items[row[1]].items[row[2]].items = [];
      retour[row[0]].items[row[1]].items[row[2]].rowspan = 0
    }

    // Création de la structure niveau 4 si nécessaire
    if (typeof retour[row[0]].items[row[1]].items[row[2]].items[row[3]] === 'undefined'){
      retour[row[0]].items[row[1]].items[row[2]].items[row[3]] = new Object();
      retour[row[0]].items[row[1]].items[row[2]].items[row[3]].label = row[3];
      retour[row[0]].items[row[1]].items[row[2]].items[row[3]].items = [];
      retour[row[0]].items[row[1]].items[row[2]].items[row[3]].rowspan = 0
    }

    // Création de la structure niveau 5 (produit)
    retour[row[0]].items[row[1]].items[row[2]].items[row[3]].items[row[4]] = new Object();
    retour[row[0]].items[row[1]].items[row[2]].items[row[3]].items[row[4]].code = row[4];
    retour[row[0]].items[row[1]].items[row[2]].items[row[3]].items[row[4]].libelle = row[5];

    // On incrémente les rowspan
    retour[row[0]].rowspan = retour[row[0]].rowspan + 1;
    retour[row[0]].items[row[1]].rowspan = retour[row[0]].items[row[1]].rowspan + 1;
    retour[row[0]].items[row[1]].items[row[2]].rowspan = retour[row[0]].items[row[1]].items[row[2]].rowspan + 1;
    retour[row[0]].items[row[1]].items[row[2]].items[row[3]].rowspan = retour[row[0]].items[row[1]].items[row[2]].items[row[3]].rowspan + 1;

  }
  return retour;
}

function toHtml(catalogue){

  var retour = "";
  // Boucle sur pave
  for (var pave_prop in catalogue){
    var pave = catalogue[pave_prop];
    // Affichage d'un pave
    retour +="<div class='pave'>"+pave.label+"</div>";

    // Boucle sur marche
    for (var marche_prop in pave.items){
        var marche = pave.items[marche_prop];
        // Affichage marche
        retour +="<div class='marche'>"+marche.label+"</div>";

        // Boucle sur famille
        for (var famille_prop in marche.items){
            var famille = marche.items[famille_prop];
            // Affichage famille
            retour +="<div class='famille'>"+famille.label+"</div>";

            retour += "<table class='produits'>";
            // Boucle sur sous-famille
            for (var sousfamille_prop in famille.items){
                var sousfamille = famille.items[sousfamille_prop];
                // Affichage sous-famille
                retour +="<tr><td rowspan='"+sousfamille.rowspan+"'>"+sousfamille.label+"</td>";
                var tr_produit = ''; // Pas de nouvelle ligne sur le premier produit
                for (var produit_prop in sousfamille.items){
                    var produit = sousfamille.items[produit_prop];
                    retour += tr_produit + "<td>"+produit.code+"</td><td>"+produit.libelle+"</td></tr>";
                    tr_produit = "<tr>";
                }

            }

            retour += "</table>"
        }

    }
  }

  return retour;
}
