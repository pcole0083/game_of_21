import transport from "./transport";
const api = {
  getData: path => {
    const API_URL = "https://deckofcardsapi.com/api/deck/";
    let callPath = API_URL + path;
    return transport.get(callPath);
  },
  startGame: () => {
    let path = "new/draw/?count=4";
    return api.getData(path).then(json => {
      let player = [json.cards[0], json.cards[2]];
      let playerValues = player.map(api.getValues);
      let playerSum = playerValues.reduce(api.sum, 0);

      let dealer = [json.cards[1], json.cards[3]];
      let dealerValues = dealer.map(api.getValues);
      let dealerSum = dealerValues.reduce(api.sum, 0);

      return [
        dealer,
        dealerSum,
        dealerValues,
        json.deck_id,
        player,
        playerSum,
        playerValues
      ];
    });
  },
  drawCard: (deck_id, turn, props) => {
    let path = deck_id + "/draw/?count=1";
    return api.getData(path).then(json => {
      let newProps = Object.assign({}, props);
      let card = json.cards[0];
      let drawer = newProps[turn];
      drawer.push(card);
      let drawerValues = drawer.map(api.getValues);
      let drawerSum = drawerValues.reduce(api.sum, 0);
      newProps[turn] = drawer;
      if (turn === "player") {
        newProps.playerValues = drawerValues;
        newProps.playerSum = drawerSum;
      } else {
        newProps.dealerValues = drawerValues;
        newProps.dealerSum = drawerSum;
      }

      //only return the data we want to send to the action, not ALL the props!
      //keep the mess in one place :)
      return [
        newProps.dealer,
        newProps.dealerSum,
        newProps.dealerValues,
        newProps.player,
        newProps.playerSum,
        newProps.playerValues
      ];
    });
  },
  getValues: card => {
    if (card.value === "Ace") {
      return 1;
    } else if (isNaN(Number(card.value))) {
      return 10;
    } else {
      return Number(card.value);
    }
  },
  sum: (a, b) => {
    return ~~a + ~~b;
  }
};

export default api;
