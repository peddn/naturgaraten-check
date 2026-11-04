// Zeichnungen für das Gartenbild. Jede Pflanze steht auf y = 0 und wächst nach oben.
// Stufe 1 = teilweise erfüllt, Stufe 2 = voll erfüllt.

const GREEN = '#3f7a3a'
const LEAF = '#5f9a45'
const SPROUT = '#a9cf6e'
const DARK = '#2c5039'
const POLLEN = '#edb92e'
const ROSEHIP = '#c8503c'
const VIOLET = '#8d6bb5'
const WHITE = '#fbfdf4'
const WOOD = '#7a5639'
const SOIL = '#5a4030'
const STONE = '#a8ad9c'
const WATER = '#7fb7c9'

const stem = (x, h, color = GREEN) =>
  `<path d="M${x} 0V${-h}" stroke="${color}" stroke-width="2" stroke-linecap="round"/>`

function flower(x, h, petals, center = POLLEN, r = 3.4) {
  const ring = [0, 60, 120, 180, 240, 300]
    .map((a) => {
      const rad = (a * Math.PI) / 180
      return `<circle cx="${x + Math.cos(rad) * r}" cy="${-h + Math.sin(rad) * r}" r="${r * 0.72}" fill="${petals}"/>`
    })
    .join('')
  return `${stem(x, h)}${ring}<circle cx="${x}" cy="${-h}" r="${r * 0.62}" fill="${center}"/>`
}

const blade = (x, h, lean = 3, color = LEAF) =>
  `<path d="M${x - 1.6} 0Q${x + lean * 0.3} ${-h * 0.6} ${x + lean} ${-h}Q${x + lean * 0.5} ${-h * 0.5} ${x + 1.6} 0Z" fill="${color}"/>`

const bush = (x, y, r, color = GREEN) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const trunk = (w, h) => `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="1.5" fill="${WOOD}"/>`

const dots = (points, color, r = 2) =>
  points.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`).join('')

export const plants = {
  blumen: [
    flower(-5, 22, WHITE) + flower(6, 16, VIOLET),
    flower(-14, 24, WHITE) + flower(-4, 36, VIOLET) + flower(7, 26, ROSEHIP) + flower(16, 18, POLLEN, SOIL),
  ],
  hecke: [
    bush(-8, -11, 11) + bush(8, -9, 9, LEAF),
    bush(-16, -13, 13) + bush(0, -19, 16, LEAF) + bush(16, -13, 13) +
      dots([[-17, -15], [-6, -8], [2, -25], [9, -16], [19, -10]], ROSEHIP),
  ],
  baum: [
    trunk(5, 26) + bush(0, -35, 16, LEAF),
    trunk(8, 44) + bush(-14, -54, 19) + bush(14, -56, 20, DARK) + bush(0, -72, 23, LEAF),
  ],
  lebensraum: [
    `<ellipse cx="0" cy="-5" rx="15" ry="5.5" fill="${WATER}" stroke="${WOOD}" stroke-width="2"/>`,
    `<ellipse cx="-3" cy="-3" rx="20" ry="7" fill="${WATER}"/>` + blade(-16, 18, -2, DARK) + blade(-12, 13, 2, DARK) +
      `<path d="M9 0h20l-3-8h-5l-2-6h-5l-2 6h-3Z" fill="${STONE}"/>`,
  ],
  wiese: [
    blade(-8, 15) + blade(-2, 19, -3) + blade(4, 16) + blade(10, 13, -2),
    blade(-18, 20) + blade(-10, 26, -3) + blade(-2, 29) + blade(6, 24, -3) + blade(14, 25) + blade(21, 18, -3) +
      flower(-14, 32, POLLEN, SOIL, 2.4) + flower(3, 38, WHITE, POLLEN, 2.4) + flower(17, 31, VIOLET, POLLEN, 2.4),
  ],
  wildesEck: [
    blade(-6, 16, -2, DARK) + blade(1, 21, 2, DARK) + `<rect x="1" y="-5" width="16" height="5" rx="2.5" fill="${WOOD}"/>`,
    blade(-16, 24, -2, DARK) + blade(-9, 31, 2, DARK) + blade(-2, 34, -2, DARK) + blade(5, 28, 3, DARK) +
      `<rect x="-20" y="-7" width="26" height="7" rx="3.5" fill="${WOOD}"/><rect x="-6" y="-13" width="24" height="6" rx="3" fill="#8f6a4a"/>` +
      dots([[12, -3], [18, -5], [21, -2]], STONE, 3.4),
  ],
  wildkraut: [
    flower(-5, 11, POLLEN, POLLEN, 2.6) + flower(6, 8, WHITE, POLLEN, 2.2),
    flower(-14, 15, POLLEN, POLLEN, 3) + flower(-3, 21, WHITE, POLLEN, 2.5) + flower(9, 13, POLLEN, POLLEN, 2.8) +
      flower(17, 19, WHITE, POLLEN, 2.5) + blade(-8, 10) + blade(4, 9, -2),
  ],
  gemuese: [
    blade(-7, 11) + blade(-3, 13, -2) + `<path d="M7 0q-5-10 0-14q5 4 0 14Z" fill="${SPROUT}"/>`,
    [-16, -5, 6, 17]
      .map((x) => `<path d="M${x - 5} 1h10l-5 11Z" fill="#dd8a2c"/>${blade(x - 2, 16, -2)}${blade(x + 2, 18, 3)}`)
      .join(''),
  ],
  kompost: [
    `<path d="M-14 0Q0 -17 14 0Z" fill="${SOIL}"/>` + dots([[-3, -4], [4, -3]], SPROUT, 1.5),
    `<path d="M-18 -21h36v21h-36Z" fill="none" stroke="${WOOD}" stroke-width="3"/><path d="M-18 -7h36M-18 -14h36" stroke="${WOOD}" stroke-width="2"/>` +
      `<path d="M-16 -19Q0 -33 16 -19V0H-16Z" fill="${SOIL}" opacity=".85"/><path d="M-18 -21h3v21h-3ZM15 -21h3v21h-3Z" fill="${WOOD}"/>` +
      dots([[-6, -23], [3, -19], [8, -24]], SPROUT, 1.8),
  ],
  boden: [
    `<path d="M-14 1h28" stroke="#8f6a4a" stroke-width="4" stroke-linecap="round"/>` + blade(-6, 9) + blade(6, 10, -2),
    `<path d="M-23 1h46" stroke="#8f6a4a" stroke-width="5" stroke-linecap="round"/>` +
      blade(-17, 13) + blade(-9, 17, -2) + flower(-1, 21, POLLEN, SOIL, 2.4) + blade(8, 14) + blade(16, 12, -2),
  ],
  nuetzlinge: [
    `<path d="M-1.5 0V-14h3V0Z" fill="${WOOD}"/><path d="M-9 -14V-25L0 -32L9 -25V-14Z" fill="#b98d5e"/><circle cx="0" cy="-21" r="3" fill="${DARK}"/>`,
    `<path d="M-1.5 0V-24h3V0Z" fill="${WOOD}"/><path d="M-11 -24V-37L0 -46L11 -37V-24Z" fill="#b98d5e"/><path d="M-13 -36L0 -47L13 -36" fill="none" stroke="${WOOD}" stroke-width="3"/><circle cx="0" cy="-33" r="3.5" fill="${DARK}"/>` +
      `<rect x="9" y="-12" width="16" height="12" fill="${WOOD}"/>` + dots([[13, -9], [18, -9], [22, -9], [13, -4], [18, -4], [22, -4]], DARK, 1.5) +
      `<path d="M-23 0Q-15 -12 -6 0Z" fill="${SOIL}"/>`,
  ],
  obst: [
    trunk(4, 18) + bush(0, -26, 12, LEAF) + dots([[-4, -23], [5, -29]], ROSEHIP, 2.2),
    trunk(6, 28) + bush(-9, -36, 13) + bush(9, -37, 14, LEAF) + bush(0, -48, 15) +
      dots([[-13, -34], [-4, -44], [3, -35], [8, -49], [15, -38]], ROSEHIP, 2.8) +
      bush(20, -7, 7, LEAF) + dots([[18, -8], [22, -5]], VIOLET, 1.5),
  ],
  regen: [
    `<path d="M-8 -17h16l-2 17h-12Z" fill="#7a8c7a"/><ellipse cx="0" cy="-17" rx="8" ry="2.4" fill="${WATER}"/>`,
    `<path d="M-13 -30h26l-3 30h-20Z" fill="#7a8c7a"/><path d="M-12 -20h24M-11 -10h22" stroke="${DARK}" stroke-width="1.6"/><ellipse cx="0" cy="-30" rx="13" ry="3.4" fill="${WATER}"/>` +
      `<path d="M13 -5h7v5h-7Z" fill="${WOOD}"/><path d="M20 -4q5 0 5 5" stroke="${WATER}" stroke-width="2" fill="none"/>`,
  ],
  material: [
    [-9, 0, 9].map((x) => `<path d="M${x - 3} -1v-15l3 -4l3 4v15Z" fill="#b98d5e"/>`).join('') +
      `<path d="M-14 -11h28" stroke="${WOOD}" stroke-width="2.4"/>`,
    [-20, -10, 0, 10, 20].map((x) => `<path d="M${x - 3.4} -5v-17l3.4 -5l3.4 5v17Z" fill="#b98d5e"/>`).join('') +
      `<path d="M-25 -19h50M-25 -10h50" stroke="${WOOD}" stroke-width="2.4"/>`,
  ],
}
