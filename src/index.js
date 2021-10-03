// constructs instances of new ships with name/length of ship as input
const ShipFactory = (shipName, shipLength) => ({
  shipName: `${shipName}`,
  hitpoints: Array(shipLength).fill(0),
  sunk: false,
  // records position of ship hit
  hit(position) {
    return this.hitpoints[position] = 1;
  },
  // determines whether all of a ship's points have been hit
  isSunk(hitpoints) {
    if (this.hitpoints.every(hit => hit === 1)) {
      this.sunk = true;
      return true;
    } return false;
  }
});

// tests equality of two objects based on the values of
// their properties rather than memory location, as is default
function deepEqual(x, y) {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
      ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
}

// creates gameboard instances one for each player
// stores ship names and coordinates of locations on board
const gameboard = () => ({
  // adds a new ship/coords to board
  createShip(ship, coords) {
    let newShip = {[`${ship.shipName}`]: coords};
    Object.assign(this.ships, newShip);
    return newShip;
  },
  // determines whether enemy shot is a hit
  receiveAttack(coords) {
    shipCoords = Object.values(this.ships)
    for (ship of shipCoords) {
      for (hitpoint of ship) {
        return (deepEqual(coords, hitpoint));
      }
    }
  },
  ships: {},
})

module.exports = { ShipFactory, gameboard }