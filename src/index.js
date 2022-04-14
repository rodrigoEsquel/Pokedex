const baseAPI = 'https://pokeapi.co/api/v2/pokemon/';
const $inputText = document.querySelector('input');
const regexNombrePokemon = /^[a-zA-Z]*$/;
const regexNumeroPokemon = /^[0-9]*$/;

document.querySelector('#buscar').onclick = function () {
  if (regexNombrePokemon.test($inputText.value) || regexNumeroPokemon.test($inputText.value)) {
    const url = baseAPI + $inputText.value;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.querySelector('image').setAttribute('href', data.sprites.front_default);
        document.querySelector('#numero').innerHTML = 'ID ' + data.id;
      })
      .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        $inputText.value = 'Pokemon no encontrado';
      });
  }
};
