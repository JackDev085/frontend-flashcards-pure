const cards = document.querySelector(".cards");
//const URL_BASE = "https://flash-cards-fastapi.vercel.app";
const URL_BASE = "http://127.0.0.1:8000";
const textFront = document.querySelector(".text-front");
const textBack = document.querySelector(".text-back");
const card = document.querySelector(".card");
const cardFront = document.querySelector(".card-front");
const cardBack = document.querySelector(".card-back");
const cardId = document.querySelector(".card-id");
const nextCard = document.querySelector(".next");
const listen = document.querySelector(".listen");
const audio = document.querySelector(".audio");
const uri = window.location.href;
const numDeck = uri.split("?").pop()[6];
const card_name = document.querySelector(".card-name");



function virarCarta() {
  if (cardBack.classList.contains("disabled")) {
    cardFront.classList.add("disabled");
    cardBack.classList.remove("disabled");
  } else {
    cardFront.classList.remove("disabled");
    cardBack.classList.add("disabled");
  }
}

function cardAleatorio() {
  fetch(`${URL_BASE}/api/aleatory_card/?theme=${numDeck}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      alert("Deck não encontrado!");
      window.location.href = "/index.html";
      throw new Error("Request failed!");
    })
    .then((data) => {
      // Se o a categoria for diferente de inglês, desabilita o botão de ouvir
      data.category_id !== 1 ? listen.classList.add("disabled") : listen.classList.remove("disabled");

      card_name.textContent = data.theme_name ?? "flashcard deck";
      let card = new Flashcard(data.question, data.answer, data.id);
      textFront.textContent = card.getQuestion()
      textBack.textContent = card.getAnswer();
      cardId.textContent = card.getId();
    })
    .catch((error) => {
      console.log(error);
    });
}
