const responses = [
  {
    success: true,
    cards: [
      {
        image: "https://deckofcardsapi.com/static/img/KH.png",
        value: "KING",
        suit: "HEARTS",
        code: "KH"
      },
      {
        image: "https://deckofcardsapi.com/static/img/8C.png",
        value: "8",
        suit: "CLUBS",
        code: "8C"
      }
    ],
    deck_id: "3p40paa87x90",
    remaining: 50
  }
];

export default function get(path, id) {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () =>
        responses[id]
          ? resolve(responses[id])
          : reject({
              error: "Mock response not found."
            })
    );
  });
}
