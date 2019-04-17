$('#videoModal').on('shown.bs.modal', function(e) {
  //console.log('modal has appeared');
});

$('#videoModal').on('hidden.bs.modal', function(e) {
  // console.log('modal has been closed');
  $('#videoModal iframe').attr('src', $('#videoModal iframe').attr('src'));
});
