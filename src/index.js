const ShipFactory = (shipName, shipLength) => ({
  shipName: `${shipName}`,
  hitpoints: Array(shipLength).fill(0),
  sunk: false,
  hit(position) {
    return this.hitpoints[position] = 1;
  },
  isSunk(hitpoints) {
    if (this.hitpoints.every(hit => hit === 1)) {
      this.sunk = true;
      return true;
    } return false;
  }
});

const carrier = ShipFactory('Carrier', 5)

const gameboard = (ship) => ({
  createShip(coords) {
    let newShip = {[`${ship.shipName}`]: coords}
    Object.assign(this.ships, newShip);
  },
  ships: {},
  // receiveAttack() will go here
})

const testBoard = gameboard(carrier);

// testBoard.createShip([[1,2], [1,3], [1,4], [1,5], [1,6]]);

module.exports = { ShipFactory, gameboard }