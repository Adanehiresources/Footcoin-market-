// ===== Football Market - Core App Logic =====

const STORAGE_KEY = 'footballMarketData';

// Sample players data (worldwide)
const PLAYERS = [
  { id: 1, name: "Kylian Mbappé", position: "ST", country: "France", flag: "🇫🇷", club: "Real Madrid", age: 25, rating: 91, pace: 97, shooting: 89, price: 1200, rarity: "Legendary" },
  { id: 2, name: "Erling Haaland", position: "ST", country: "Norway", flag: "🇳🇴", club: "Man City", age: 24, rating: 91, pace: 89, shooting: 94, price: 1150, rarity: "Legendary" },
  { id: 3, name: "Vinícius Jr", position: "LW", country: "Brazil", flag: "🇧🇷", club: "Real Madrid", age: 24, rating: 89, pace: 95, shooting: 83, price: 980, rarity: "Epic" },
  { id: 4, name: "Jude Bellingham", position: "CM", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", club: "Real Madrid", age: 21, rating: 88, pace: 80, shooting: 82, price: 920, rarity: "Epic" },
  { id: 5, name: "Bukayo Saka", position: "RW", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", club: "Arsenal", age: 23, rating: 87, pace: 86, shooting: 82, price: 850, rarity: "Epic" },
  { id: 6, name: "Pedri", position: "CM", country: "Spain", flag: "🇪🇸", club: "Barcelona", age: 22, rating: 86, pace: 78, shooting: 74, price: 780, rarity: "Rare" },
  { id: 7, name: "Jamal Musiala", position: "CAM", country: "Germany", flag: "🇩🇪", club: "Bayern", age: 21, rating: 86, pace: 85, shooting: 80, price: 800, rarity: "Rare" },
  { id: 8, name: "Victor Osimhen", position: "ST", country: "Nigeria", flag: "🇳🇬", club: "Galatasaray", age: 26, rating: 88, pace: 90, shooting: 87, price: 890, rarity: "Epic" },
  { id: 9, name: "Khvicha Kvaratskhelia", position: "LW", country: "Georgia", flag: "🇬🇪", club: "Napoli", age: 23, rating: 86, pace: 88, shooting: 81, price: 750, rarity: "Rare" },
  { id: 10, name: "Florian Wirtz", position: "CAM", country: "Germany", flag: "🇩🇪", club: "Leverkusen", age: 21, rating: 87, pace: 82, shooting: 81, price: 820, rarity: "Epic" },
  { id: 11, name: "Lamine Yamal", position: "RW", country: "Spain", flag: "🇪🇸", club: "Barcelona", age: 17, rating: 84, pace: 91, shooting: 78, price: 950, rarity: "Epic" },
  { id: 12, name: "Rodri", position: "CDM", country: "Spain", flag: "🇪🇸", club: "Man City", age: 28, rating: 91, pace: 66, shooting: 80, price: 1050, rarity: "Legendary" },
  { id: 13, name: "William Saliba", position: "CB", country: "France", flag: "🇫🇷", club: "Arsenal", age: 23, rating: 85, pace: 82, shooting: 45, price: 720, rarity: "Rare" },
  { id: 14, name: "Alphonso Davies", position: "LB", country: "Canada", flag: "🇨🇦", club: "Bayern", age: 24, rating: 84, pace: 96, shooting: 68, price: 680, rarity: "Rare" },
  { id: 15, name: "Achraf Hakimi", position: "RB", country: "Morocco", flag: "🇲🇦", club: "PSG", age: 26, rating: 85, pace: 93, shooting: 72, price: 710, rarity: "Rare" },
  { id: 16, name: "Son Heung-min", position: "LW", country: "South Korea", flag: "🇰🇷", club: "Tottenham", age: 32, rating: 87, pace: 88, shooting: 88, price: 650, rarity: "Rare" },
  { id: 17, name: "Mohamed Salah", position: "RW", country: "Egypt", flag: "🇪🇬", club: "Liverpool", age: 32, rating: 89, pace: 90, shooting: 89, price: 900, rarity: "Epic" },
  { id: 18, name: "Kevin De Bruyne", position: "CAM", country: "Belgium", flag: "🇧🇪", club: "Man City", age: 33, rating: 90, pace: 72, shooting: 86, price: 980, rarity: "Legendary" },
  { id: 19, name: "Harry Kane", position: "ST", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", club: "Bayern", age: 31, rating: 90, pace: 70, shooting: 93, price: 870, rarity: "Epic" },
  { id: 20, name: "Martin Ødegaard", position: "CAM", country: "Norway", flag: "🇳🇴", club: "Arsenal", age: 26, rating: 87, pace: 76, shooting: 82, price: 790, rarity: "Rare" },
  { id: 21, name: "Rafael Leão", position: "LW", country: "Portugal", flag: "🇵🇹", club: "Milan", age: 25, rating: 86, pace: 92, shooting: 80, price: 740, rarity: "Rare" },
  { id: 22, name: "Lautaro Martínez", position: "ST", country: "Argentina", flag: "🇦🇷", club: "Inter", age: 27, rating: 88, pace: 84, shooting: 88, price: 830, rarity: "Epic" },
  { id: 23, name: "Bruno Fernandes", position: "CAM", country: "Portugal", flag: "🇵🇹", club: "Man United", age: 30, rating: 87, pace: 73, shooting: 84, price: 700, rarity: "Rare" },
  { id: 24, name: "Declan Rice", position: "CDM", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", club: "Arsenal", age: 25, rating: 86, pace: 74, shooting: 72, price: 760, rarity: "Rare" },
];

// Ads data
const ADS = [
  { id: 1, title: "Nike Football", desc: "Just Do It. New boots collection.", reward: 50, duration: 15 },
  { id: 2, title: "EA Sports FC", desc: "Play the world's game.", reward: 80, duration: 20 },
  { id: 3, title: "Adidas Predator", desc: "Control the game.", reward: 60, duration: 18 },
  { id: 4, title: "Red Bull", desc: "Gives you wings on the pitch.", reward: 40, duration: 12 },
  { id: 5, title: "Puma Future", desc: "Unleash your creativity.", reward: 55, duration: 16 },
  { id: 6, title: "Bet365 Sports", desc: "Bet on the beautiful game.", reward: 100, duration: 25 },
  { id: 7, title: "Coca-Cola", desc: "Share a Coke after the match.", reward: 45, duration: 14 },
  { id: 8, title: "Samsung Galaxy", desc: "Watch every goal in 8K.", reward: 70, duration: 22 },
];

// App State
let state = {
  coins: 150,
  ownedPlayers: [],
  totalAdsWatched: 0,
  totalSpent: 0,
};

// Load / Save
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      state = { ...state, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not load state', e);
  }
  updateCoinDisplay();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateCoinDisplay();
}

function updateCoinDisplay() {
  document.querySelectorAll('#coinBalance, .coin-balance').forEach(el => {
    el.textContent = state.coins.toLocaleString();
  });
}

// Toast notifications
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : '❌'}</span>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => toast.classList.add('show'));
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Buy Player
function buyPlayer(playerId) {
  const player = PLAYERS.find(p => p.id === playerId);
  if (!player) return;

  if (state.ownedPlayers.includes(playerId)) {
    showToast('You already own this player!', 'error');
    return;
  }

  if (state.coins < player.price) {
    showToast(`Not enough coins! Need ${player.price - state.coins} more.`, 'error');
    return;
  }

  state.coins -= player.price;
  state.ownedPlayers.push(playerId);
  state.totalSpent += player.price;
  saveState();
  showToast(`🎉 You signed ${player.name} for ${player.price} coins!`);
  
  // Refresh UI if on players or myteam page
  if (typeof renderPlayers === 'function') renderPlayers();
  if (typeof renderMyTeam === 'function') renderMyTeam();
  if (typeof renderDashboard === 'function') renderDashboard();
}

// Watch Ad Simulation
let adInterval = null;

function startWatchingAd(adId) {
  const ad = ADS.find(a => a.id === adId);
  if (!ad) return;

  const overlay = document.getElementById('adModal');
  const progressFill = document.getElementById('adProgress');
  const timerText = document.getElementById('adTimer');
  const rewardText = document.getElementById('adRewardText');
  const claimBtn = document.getElementById('claimRewardBtn');

  if (!overlay) return;

  overlay.classList.add('active');
  progressFill.style.width = '0%';
  claimBtn.style.display = 'none';
  rewardText.textContent = `Watch to earn ${ad.reward} coins`;
  timerText.textContent = `${ad.duration}s remaining`;

  let elapsed = 0;
  const total = ad.duration;

  if (adInterval) clearInterval(adInterval);

  adInterval = setInterval(() => {
    elapsed += 0.1;
    const pct = Math.min((elapsed / total) * 100, 100);
    progressFill.style.width = pct + '%';
    const remaining = Math.ceil(total - elapsed);
    timerText.textContent = remaining > 0 ? `${remaining}s remaining` : 'Almost done...';

    if (elapsed >= total) {
      clearInterval(adInterval);
      adInterval = null;
      timerText.textContent = 'Ad complete!';
      claimBtn.style.display = 'inline-flex';
      claimBtn.onclick = () => claimAdReward(ad);
    }
  }, 100);
}

function claimAdReward(ad) {
  state.coins += ad.reward;
  state.totalAdsWatched += 1;
  saveState();
  showToast(`+${ad.reward} coins earned from "${ad.title}"!`);
  closeAdModal();
  if (typeof renderAds === 'function') renderAds();
  if (typeof renderDashboard === 'function') renderDashboard();
}

function closeAdModal() {
  const overlay = document.getElementById('adModal');
  if (overlay) overlay.classList.remove('active');
  if (adInterval) {
    clearInterval(adInterval);
    adInterval = null;
  }
}

// Render helpers
function getRarityColor(rarity) {
  switch (rarity) {
    case 'Legendary': return '#f5c518';
    case 'Epic': return '#a855f7';
    case 'Rare': return '#3b82f6';
    default: return '#94a3b8';
  }
}

function createPlayerCard(player, showBuy = true) {
  const owned = state.ownedPlayers.includes(player.id);
  return `
    <div class="player-card ${owned ? 'owned' : ''}" data-id="${player.id}">
      <div class="player-image">
        <span style="font-size: 4rem;">⚽</span>
        <span class="player-badge" style="background:${getRarityColor(player.rarity)}; color:${player.rarity === 'Legendary' ? '#000' : '#fff'}">
          ${player.rarity}
        </span>
      </div>
      <div class="player-info">
        <div class="player-name">${player.name}</div>
        <div class="player-meta">
          <span class="flag">${player.flag}</span>
          <span>${player.position}</span>
          <span>${player.club}</span>
          <span>Age ${player.age}</span>
        </div>
        <div class="player-stats">
          <div class="stat">
            <div class="stat-value">${player.rating}</div>
            <div class="stat-label">OVR</div>
          </div>
          <div class="stat">
            <div class="stat-value">${player.pace}</div>
            <div class="stat-label">PAC</div>
          </div>
          <div class="stat">
            <div class="stat-value">${player.shooting}</div>
            <div class="stat-label">SHO</div>
          </div>
        </div>
        <div class="player-price">
          <div class="price">
            <span class="coin-icon">₵</span>
            ${player.price}
          </div>
          ${showBuy ? (
            owned 
              ? `<button class="btn btn-outline" disabled>Owned ✓</button>`
              : `<button class="btn btn-primary" onclick="buyPlayer(${player.id})">Buy</button>`
          ) : ''}
        </div>
      </div>
    </div>
  `;
}

// Initialize on every page
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  
  // Highlight active nav
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
