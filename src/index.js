const ShipFactory = (shipLength) => ({
  hitpoints: Array(shipLength).fill(0) ,
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

const gameboard = (a, b) => {
  return a + b;
}

module.exports = { ShipFactory, gameboard }