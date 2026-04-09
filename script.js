const weapons = [
  { name: "Vector 7 DMR", type: "sniper" },
  { name: "Chaos Reloader Shotgun", type: "shotgun" },
  { name: "Bouncing Boomstick", type: "shotgun" },
  { name: "Overdrive Grenade", type: "utility" },
  { name: "Skyline Deployer", type: "movement" },
  { name: "Combat Assault Rifle", type: "ar" },
  { name: "Nemesis AR", type: "ar" },
  { name: "Thunder Burst SMG", type: "flex" },
  { name: "Iron Pump Shotgun", type: "shotgun" },
  { name: "Twin Hammer Shotguns", type: "shotgun" },
  { name: "Twin Mag SMG", type: "flex" },
  { name: "Mythic Goldfish", type: "utility" },
  { name: "FlowBerry Mist Grenade", type: "healing" },
  { name: "Port-A-Bunker", type: "utility" },
  { name: "Shield Bubble Jr.", type: "utility" },
  { name: "Seven Power Gloves", type: "utility" },
  { name: "Ice King's Gauntles", type: "utility" },
  { name: "Seven Cannon", type: "utility" },
  { name: "Slapperoni Pizza", type: "healing" },
  { name: "The Foundation's Rift Rifle", type: "sniper" },
  { name: "Enhanced Harpoon Gun", type: "utility" }
];

let currentLoot = [];

function startGame() {
  document.getElementById("result").innerText = "";
  generateLoot();
  renderLoot();
}

function generateLoot() {
  currentLoot = [];
  while (currentLoot.length < 6) {
    const random = weapons[Math.floor(Math.random() * weapons.length)];
    currentLoot.push(random);
  }
}

function renderLoot() {
  const lootDiv = document.getElementById("loot");
  lootDiv.innerHTML = "";

  currentLoot.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerText = item.name;
    div.draggable = true;

    div.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", index);
    });

    lootDiv.appendChild(div);
  });
}

document.querySelectorAll(".slot").forEach(slot => {
  slot.addEventListener("dragover", (e) => e.preventDefault());

  slot.addEventListener("drop", (e) => {
    const index = e.dataTransfer.getData("text");
    const item = currentLoot[index];
    slot.innerText = item.name;
    slot.dataset.type = item.type;
  });
});

function checkLoadout() {
  let score = 0;

  document.querySelectorAll(".slot").forEach(slot => {
    const slotNum = slot.dataset.slot;
    const type = slot.dataset.type;

    if (!type) return;

    if (slotNum == 1 && type === "ar") score++;
    if (slotNum == 2 && type === "shotgun") score++;
    if (slotNum == 3 && (type === "shotgun" || type === "healing" || type === "flex")) score++;
    if (slotNum == 4 && type === "movement") score++;
    if (slotNum == 5 && type === "sniper") score++;
  });

  document.getElementById("result").innerText = "Score: " + score + "/5";
}
