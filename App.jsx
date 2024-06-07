import React, { useState } from 'react';
import './App.css';

function App() {
  const [id, setId] = useState();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [status, setStatus] = useState("");
  const [created, setCreated] = useState("");
  const [gender, setGender] = useState("");
  const [origin, setOrigin] = useState("");
  const [location, setLocation] = useState("");
  const [episode, setEpisode] = useState([]);
  const [suma_comeco, setSuma_comeco] = useState("");
  const [suma_invisivel, setSuma_invisivel] = useState("d-none");

  const fetchApi = async (id) => {
    return fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("dados api :", data);
        return data;
      });
  };

  const DadosPersonagens = async (id) => {
    const result = await fetchApi(id);

    if (result) {
      setImage(result.image);
      setName(result.name);
      setSpecies(result.species);
      setStatus(result.status);
      setCreated(result.created);
      setGender(result.gender);
      setOrigin(result.origin.name);
      setLocation(result.location.name);

      const episodioNUMEROS = result.episode.map(url => url.split('/').pop());
      const episódios = episodioNUMEROS.join(', ');
      setEpisode(episódios);

      setSuma_comeco("d-none");
      setSuma_invisivel("");
    } else {
      console.error("null");
    }
  };

  const btn = async (e) => {
    e.preventDefault();
    await DadosPersonagens(id);
  };

  const anterior_btn = async () => {
    const newId = Math.max(id - 1, 1);
    setId(newId);
    await DadosPersonagens(newId);
  };

  const proximo_btn = async () => {
    const newId = id + 1;
    setId(newId);
    await DadosPersonagens(newId);
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "rgb(7, 12, 14)" }}>
          <div className="container">
            <div className="d-flex">
            <a className="log" href="./index.html">
                <img src="./src/imglog/Rick-And-Morty-Emblema.png" alt="" width="240px" height="100px" />
              </a>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              <form action="" method="get" className="d-flex" role="search">
                <input className="form-control me-2" type="number" placeholder="Id Personagem" aria-label="Search" id="characterId" value={id}
                  onChange={(element) => setId(element.target.value)} />
                <button className="btn btn-outline-success" type="submit" onClick={btn} id="btn-go" style={{ color: "rgb(31, 230, 213)", backgroundColor: "rgb(7, 12, 14)",fontFamily:"cursive" }}>Search</button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section id="comeco" className={`d-flex pt-5 ${suma_comeco} imagem`} >
          <img src="./src/imglog/roxo.jpg" alt=""/>
        </section>
        <section className={`d-flex pt-2 ${suma_invisivel} imagem`} style={{ justifyContent: "center", paddingTop: "120px !important", backgroundImage: "url(./src/imglog/-rick-e-morty-a.jpg)" }} id="invisivel">
          <div className="card" style={{ width: "17rem"}}>
            <img src={image} className="card-img-top" alt={name} id="img" />
            <div className="card-body">
              <h5 className="card-title" id="name">{name}</h5>
              <p className="card-text" id="status">{status}</p>
              <i className="fa-solid fa-circle fa-flip-both fa-2xs" style={{ color: "#31da1b" }}></i>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item" id="species">{species}</li>
              <li className="list-group-item" id="gender">{gender}</li>
              <li className="list-group-item" id="origin">{origin}</li>
              <li className="list-group-item" id="location">{location}</li>
              <li className="list-group-item" id="created">{created}</li>
            </ul>
            <div className="card-body">
              <h3 style={{fontSize:"15px"}}>Episódios :</h3>
              <p className="card-link" style={{fontSize:"13px"}} >{episode}</p>
            </div>
            <div>
              <button type="button" className="btn btn-outline-primary" onClick={anterior_btn} id="Anterior">Anterior</button>
              <button type="button" className="btn btn-outline-primary" onClick={proximo_btn} id="Proximo">Próximo</button>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p>Desenvolvedor - Alex Adrian </p>
        <a className="linkgithub"    href="https://github.com/Alex7Adrian/projeto-api-RickandMorty">Github - projeto-api-RickandMorty </a>
      </footer>
    </>
  );
}

export default App;
