var notes = [9, 2, 2, 2, 2, 2, 2, 2, 4, 0, 1, 2, 3, 3, 3, 3, 2, 2, 2, 1, 1, 2, 1, 4, 2, 2, 2, 2, 2, 2, 2, 4, 0, 1, 2, 3, 3, 3, 3, 2, 2, 4, 4, 3, 1, 0];

var tempos = [4, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 4, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 4, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 4];

var notas = $('.sonidos');

$('.note').click(function() {
  let num = parseInt(this.id);
  tocar(num);
});

function tocar(num) {
  notas[num].pause();
  notas[num].currentTime = 0;
  notas[num].play();
  $('#' + num).css('box-shadow', '0px 0px 10px black');
  setTimeout(function() {
    $('#' + num).css('box-shadow', 'none');
  }, 300);
}

$('.boton').click(function() {
  for (var x = 0, ln = notes.length; x < ln; x++) {
    setTimeout(function(y) {
      tocar(notes[y]);
    }, ritmo(x) * 350, x);
  }
});

function ritmo(num) {
  suma = 0;
  for (c = 0; c < num ; c++) {
    suma = suma + tempos[c];
  }
  return suma;
}