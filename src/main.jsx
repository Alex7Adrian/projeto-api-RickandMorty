import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';



const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const image = document.getElementById('img');
const name = document.getElementById('name');
const species = document.getElementById('species');
const status = document.getElementById('status');
const created = document.getElementById('created');
const gender = document.getElementById('gender');
const origin = document.getElementById('origin');
const location = document.getElementById('location');
const episode = document.getElementById('episode');
const anterior = document.getElementById('Anterior');
const proximo = document.getElementById('Proximo');

// Função para fazer a requisição à API
const fetchApi = (value) => {
  if (value === null){
    console.error('Por favor, insira um ID de personagem válido.');
    // Retornar uma promise rejeitada com uma mensagem de erro
    return Promise.reject(new Error('ID inválido'));
  }
  return fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("dados api :",data);
      return data;
    });
};

// Função para carregar os dados do personagem
const DadosPersonagens = async (characterId) => {
  const result = await fetchApi(characterId);

   if(result){
    image.src = result.image;
    name.innerText = result.name;
    species.innerText = result.species;
    status.innerText = result.status;
    created.innerText = result.created;
    gender.innerText = result.gender;
    origin.innerText = result.origin.name;
    location.innerText = result.location.name;
  

     // Adicionando o trecho de código fornecido para processar os episódios
     const episodioNUMEROS = result.episode.map(url => url.split('/').pop());
     const episódios = episodioNUMEROS.join(', ');
     episode.innerText = episódios;
      
 } else {
   console.error("null");
 }

};



// Função para obter o parâmetro de consulta "id" da URL
const getIdFromUrl = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id');
};
// Função para carregar o proximo personagem 
const CarregarProx = async () => {
  const ProxID = parseInt(characterId.value) + 1;
  await DadosPersonagens(ProxID);
  characterId.value = ProxID;
};

// Função para carregar o personagem anterior
const CarregarAnt = async () => {
  const AntID = parseInt(characterId.value) - 1;
  await DadosPersonagens(AntID);
  characterId.value = AntID;
};

// Event listener para o botão "Próximo"
proximo.addEventListener('click', async () => {
  await CarregarProx();
});

// Event listener para o botão "Anterior"
anterior.addEventListener('click', async () => {
  await CarregarAnt();
});

// Event listener para o botão de busca
btnGo.addEventListener('click', async (event) => {
  event.preventDefault();
  document.getElementById('comeco').classList.add('d-none');
  document.getElementById('invisivel').classList.remove('d-none');

  await DadosPersonagens(characterId.value);
});

  

// Renderizar o componente React
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

