import transport from "./transport"; //wrapper around fetch
/**
 * api has 3 types of methods:
 *  helper:
 *    getData - All API calls are made using this method
 *              This reduces complexity for anyone unfamiliar with how transport works.
 *              Returns the fetch promise.
 *  actions:
 *    startGame - Retrieves the data to start the game,
 *                Helpers are used to process the data to make it match what the action requires.
 *                Returns a promise.
 *    drawGame - Retrieves data to draw a single card from the API.
 *                Helps are used to process the data so that the component is cleaner.
 *                Returns a promise.
 *    flipCard - Only action that does not call the API.
 *                Returns a promise so that its behavior is consistent with startGame and drawCard
 *  reducers:
 *    getValues - Gets the values of the cards in the hand it's mapping and returns a new array of those numeric values.
 *                Returns an array.
 *    sum - Reduce function that is meant to sum the values from getValues and visibleValues
 *          Returns a number.
 *    visibleValues - Reduce function almost exactly the same as getValues, however returns 0 for any cards that have not been flipped.
 *          Returns an array.
 */
const api = {
  getData: (path, API_URL) => {
    API_URL = !!API_URL ? API_URL : "https://deckofcardsapi.com/api/deck/";
    let callPath = API_URL + path;
    return transport.get(callPath);
  },
  startGame: () => {
    let path = "new/draw/?count=4";
    return api.getData(path).then(json => {
      //these 2 cards go to the player, so we flip over 1 of them
      json.cards[0].flipped = true;
      json.cards[2].flipped = false;
      //these 2 card go to the dealer, they are placed face down.
      json.cards[1].flipped = false;
      json.cards[3].flipped = false;

      let player = [json.cards[0], json.cards[2]]; //mimic dealing every other card to the player
      let playerValues = api.getValues(player);
      let playerSum = playerValues.reduce(api.sum, 0);
      let playerVisible = api.visibleValues(player);
      let pVsum = playerVisible.reduce(api.sum, 0);

      let dealer = [json.cards[1], json.cards[3]]; //mimic dealing every 2nd card to the dealer
      let dealerValues = api.getValues(dealer);
      let dealerSum = dealerValues.reduce(api.sum, 0);
      let dealerVisible = api.visibleValues(dealer);
      let dVsum = dealerVisible.reduce(api.sum, 0);

      return [
        dealer,
        dealerSum,
        dVsum,
        dealerValues,
        json.deck_id,
        player,
        playerSum,
        pVsum,
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
      if (turn === "dealer") {
        card.flipped = true;
      }
      drawer.push(card);

      let drawerValues = api.getValues(drawer);
      let drawerSum = drawerValues.reduce(api.sum, 0);
      let drawerVisible = api.visibleValues(drawer);
      let vSum = drawerVisible.reduce(api.sum, 0);
      newProps[turn] = drawer;

      if (turn === "player") {
        newProps.playerValues = drawerValues;
        newProps.playerSum = drawerSum;
        newProps.pVsum = vSum;
      } else {
        newProps.dealerValues = drawerValues;
        newProps.dealerSum = drawerSum;
        newProps.dVsum - vSum;
      }

      //only return the data we want to send to the action, not ALL the props!
      //keep the mess in one place :)
      return [
        newProps.dealer,
        newProps.dealerSum,
        newProps.dVsum,
        newProps.dealerValues,
        newProps.player,
        newProps.playerSum,
        newProps.pVsum,
        newProps.playerValues
      ];
    });
  },
  flipCard: (cardIndex, turn, flip, props) => {
    //keep the Promise struture the same as the rest if the methods
    return new Promise((resolve, reject) => {
      return resolve(props);
    }).then(passed_props => {
      let newProps = Object.assign({}, passed_props);
      newProps[turn][cardIndex].flipped = !newProps[turn][cardIndex].flipped;
      //only return the data we want to send to the action, not ALL the props!
      //keep the mess in one place :)
      return [newProps.dealer, newProps.player];
    });
  },
  getValues: array => {
    return array.map(card => {
      if (card.value === "ACE") {
        return 1;
      } else if (isNaN(Number(card.value))) {
        return 10;
      } else {
        return Number(card.value);
      }
    });
  },
  sum: (a, b) => {
    return ~~a + ~~b;
  },
  visibleValues: array => {
    return array.map(card => {
      if (!card.flipped) {
        return 0;
      }

      if (card.value === "ACE") {
        return 1;
      } else if (isNaN(Number(card.value))) {
        return 10;
      } else {
        return Number(card.value);
      }
    });
  }
};

export default api;
