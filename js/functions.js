function filtrage(catalogue) {

  return $.grep( catalogue, function( n, i ) {
    return n.website==='google';
  });

}
