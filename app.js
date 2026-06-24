// ═══════════════════════════════════════════════════════════════
// FIREBASE CONFIG
// Firebase konsolundan (console.firebase.google.com) alıp buraya yapıştır
// ═══════════════════════════════════════════════════════════════
const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const FIREBASE_READY = FIREBASE_CONFIG.apiKey !== "";
let db, auth, fbFieldValue;

if (FIREBASE_READY) {
  firebase.initializeApp(FIREBASE_CONFIG);
  db = firebase.firestore();
  auth = firebase.auth();
  fbFieldValue = firebase.firestore.FieldValue;
}

// ═══════════════════════════════════════════════════════════════
// QUEST DATA
// ═══════════════════════════════════════════════════════════════
const QUESTS = [
  // ── PERSONAL ──────────────────────────────────────────────────
  { id: 'p1', category: 'personal', difficulty: 'easy', xp: 40,
    title: 'Yabancıya Beklenmedik İltifat',
    desc: 'Tamamen tanımadığın birine samimi bir iltifat et — saçı, kıyafeti, enerjisi, her şey sayılır. Tepkisini gözlemle.' },

  { id: 'p2', category: 'personal', difficulty: 'easy', xp: 50,
    title: '"Sizi Tanıyor muyum?" Denemesi',
    desc: 'Bir yabancıya yaklaş ve "Sizi bir yerden tanıyor muyum?" diye sor. Konuşmayı en az 2 dakika sürdür.' },

  { id: 'p3', category: 'personal', difficulty: 'medium', xp: 100,
    title: 'Toplu Taşımada Şarkı',
    desc: 'Metrobüs, metro ya da otobüste yüksek sesle şarkı söyle. En az 30 saniye, en az 3 yolcu duymalı.' },

  { id: 'p4', category: 'personal', difficulty: 'medium', xp: 90,
    title: 'Tam Zıt Stil Günü',
    desc: 'Normalde hiç giymeyeceğin bir stilde giyinerek dışarı çık. Gün boyunca bu kıyafetle kal, kimseye açıklama yapma.' },

  { id: 'p5', category: 'personal', difficulty: 'hard', xp: 220,
    title: 'Yabancıyı Çaya Davet Et',
    desc: 'Kafede veya sokakta tamamen tanımadığın birine "Sizi çaya davet edebilir miyim?" diye sor. Kabul etsin ya da etmesin, teklifi yap.' },

  { id: 'p6', category: 'personal', difficulty: 'hard', xp: 250,
    title: 'Kamu Alanında Performans',
    desc: 'Alışveriş merkezi, meydan veya park gibi kalabalık bir alanda 1 dakika boyunca bir şey performans olarak yap — şarkı, dans, her neyse.' },

  { id: 'p7', category: 'personal', difficulty: 'medium', xp: 120,
    title: 'Eski Crush\'a Mesaj',
    desc: 'Yıllardır konuşmadığın eski bir crush\'ına veya arkadaşına mesaj at. Samimi ve direkt ol.' },

  { id: 'p8', category: 'personal', difficulty: 'medium', xp: 80,
    title: 'Yabancıyla Fotoğraf',
    desc: 'Tamamen tanımadığın birine yaklaş ve "Seninle bir fotoğraf çektirebilir miyim?" diye sor. Neden istediğini açıklamak zorunda değilsin.' },

  { id: 'p9', category: 'personal', difficulty: 'hard', xp: 200,
    title: 'Random Şehir Macerası',
    desc: 'Hiç gitmediğin yakın bir şehre git ve orada yaşayan birini bul, onunla en az 30 dakika geçir.' },

  { id: 'p10', category: 'personal', difficulty: 'easy', xp: 35,
    title: 'Kasıtlı Yanlış Sıra',
    desc: 'Kafede ya da restorantta kasıtlı olarak "yanlış" bir yere otur — meşgul masanın yanı, servis noktasının önü. İptal etme, orada kal.' },

  // ── WORKPLACE ─────────────────────────────────────────────────
  { id: 'w1', category: 'workplace', difficulty: 'medium', xp: 110,
    title: 'Anlamsız Hediye',
    desc: 'Müdürüne veya bir iş arkadaşına tamamen anlamsız bir obje hediye et (peluş oyuncak, garip taş). Ciddi bir gerekçe sun.' },

  { id: 'w2', category: 'workplace', difficulty: 'medium', xp: 120,
    title: 'Toplantıda Absürd Fikir',
    desc: 'Bir toplantıda tamamen saçma ama ciddi bir fikir öner. Savun. Kimseyi güldürmeden 2 dakika boyunca devam et.' },

  { id: 'w3', category: 'workplace', difficulty: 'medium', xp: 80,
    title: 'Koridor Dansı',
    desc: 'Ofis koridorunda en az 3 iş arkadaşı görürken 10 saniyeliğine dans et. Açıklama yapma.' },

  { id: 'w4', category: 'workplace', difficulty: 'easy', xp: 60,
    title: 'Creepy Sürpriz',
    desc: 'Bir iş arkadaşının masasına zararsız ama creepy bir şey bırak (küçük peluş, göz göz kağıt) ve ne zaman fark ettiğini gözlemle.' },

  { id: 'w5', category: 'workplace', difficulty: 'hard', xp: 180,
    title: '"Bunu Niye Yapıyoruz?" Sorusu',
    desc: 'Müdürüne veya proje sahibine "Bu proje gerçekten mantıklı mı? Neden yapıyoruz?" diye gerçekten sor. Savunmacı olmadan.' },

  { id: 'w6', category: 'workplace', difficulty: 'easy', xp: 45,
    title: 'Uydurma Kutlama',
    desc: 'Takımına tamamen uydurma bir kutlama organize et — "Bugün ofiste 3. kez çay içiliyor!" gibi. İkram olursa bonus.' },

  { id: 'w7', category: 'workplace', difficulty: 'hard', xp: 200,
    title: 'Sessiz Gerçek',
    desc: 'Herkesin düşündüğü ama kimsenin söylemediği bir şeyi toplantıda veya takım ortamında sesli söyle.' },

  { id: 'w8', category: 'workplace', difficulty: 'medium', xp: 95,
    title: 'Tanımadığın Departmana Kahve',
    desc: 'Hiç tanımadığın bir departmana git ve "Bölümünüze kahve getirdim" de. Açıklama yapmadan çık.' },

  { id: 'w9', category: 'workplace', difficulty: 'easy', xp: 55,
    title: 'Garip Zoom Arka Planı',
    desc: 'Online toplantıya tamamen alakasız bir sanal arka planla gir. Kimse sormadan değiştirme.' },

  // ── CREATIVE ──────────────────────────────────────────────────
  { id: 'c1', category: 'creative', difficulty: 'medium', xp: 90,
    title: 'Sokak Ressam',
    desc: 'Halka açık bir yerde otur ve resim yap. İnsanlar baksın. En az 30 dakika çiz.' },

  { id: 'c2', category: 'creative', difficulty: 'easy', xp: 50,
    title: 'Çatışan Stil',
    desc: 'İki tamamen zıt stili birleştirerek giyinerek çık — spor + elegant, vintage + modern, alaturka + rock.' },

  { id: 'c3', category: 'creative', difficulty: 'medium', xp: 100,
    title: 'Unpopular Fikir Savunusu',
    desc: 'Sosyal medyada çoğunluğun katılmayacağı bir fikri samimi ve güçlü bir şekilde paylaş. Silme.' },

  { id: 'c4', category: 'creative', difficulty: 'hard', xp: 230,
    title: 'Sokakta Şarkı',
    desc: 'Kalabalık bir sokakta veya meydanda yüksek sesle şarkı söyle. En az 1 dakika, en az 5 kişi duymalı.' },

  { id: 'c5', category: 'creative', difficulty: 'easy', xp: 40,
    title: 'Anonim Sanat',
    desc: 'Garip veya düşündürücü bir şey çiz/yaz ve halka açık bir yerde ya da bir yabancının masasında bırak.' },

  { id: 'c6', category: 'creative', difficulty: 'medium', xp: 110,
    title: 'Fotoğraf Projesi',
    desc: 'Gün içinde 10 yabancıdan fotoğraf çekme izni iste. Kaç kişi kabul etti, kaç kişi reddetti? Hikayeyi anlat.' },

  { id: 'c7', category: 'creative', difficulty: 'hard', xp: 200,
    title: 'Açık Mikrofon',
    desc: 'Bir açık mikrofon etkinliğine katıl ve 2 dakika boyunca bir şey performans yap — şiir, stand-up, hikaye.' },

  // ── BUSINESS ──────────────────────────────────────────────────
  { id: 'b1', category: 'business', difficulty: 'hard', xp: 200,
    title: '5 Kişiye Pitch',
    desc: 'Fikrini veya projeyi 5 farklı kişiye pitch et. Her birinden gerçek geri bildirim al.' },

  { id: 'b2', category: 'business', difficulty: 'medium', xp: 150,
    title: '10 Soğuk Mesaj',
    desc: 'LinkedIn veya e-posta üzerinden 10 kişiye soğuk mesaj at. Bir şey iste — bilgi, destek, işbirliği.' },

  { id: 'b3', category: 'business', difficulty: 'hard', xp: 220,
    title: 'Müdürüne İş Fikri',
    desc: 'Müdürüne veya üst yöneticiye kendi iş fikrini ya da yan projeyi ciddi bir şekilde anlat. Geri bildirim iste.' },

  { id: 'b4', category: 'business', difficulty: 'hard', xp: 300,
    title: 'Podcast\'e Konuk Ol',
    desc: 'Herhangi bir podcast\'e konuk olmak için resmi istek gönder. En az 1 istek göndermek yeterli.' },

  { id: 'b5', category: 'business', difficulty: 'medium', xp: 130,
    title: 'Halka Açık Demo',
    desc: 'Ürünü veya projeyi halka açık bir alanda (kafe, etkinlik) birine canlı demo yap.' },

  { id: 'b6', category: 'business', difficulty: 'easy', xp: 70,
    title: 'Reddetme Terapisi',
    desc: 'Kesinlikle reddedileceğini düşündüğün bir şeyi iste — büyük indirim, imkansız deadline, aşırı talep.' },

  { id: 'b7', category: 'business', difficulty: 'medium', xp: 140,
    title: 'Networking Etkinliği',
    desc: 'Hiç tanımadığın insanların olduğu bir etkinliğe git ve 5 kişiyle samimi konuşma yap.' },
];

// ═══════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════
let currentUser = null;
let currentUserData = null;
let activeQuestId = null;
let categoryFilter = 'all';
let difficultyFilter = 'all';

const CATEGORY_LABELS = { personal: 'Kişisel', workplace: 'İşyeri', creative: 'Yaratıcı', business: 'Girişim' };
const DIFFICULTY_LABELS = { easy: 'Kolay', medium: 'Orta', hard: 'Zor' };

// ═══════════════════════════════════════════════════════════════
// ROUTER
// ═══════════════════════════════════════════════════════════════
function navigate(view, questId) {
  document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
  const el = document.getElementById('view-' + view);
  if (el) el.style.display = 'block';

  if (view === 'quest' && questId) {
    activeQuestId = questId;
    renderQuestDetail(questId);
  } else if (view === 'leaderboard') {
    loadLeaderboard('alltime');
  } else if (view === 'profile') {
    if (!currentUser) { openAuthModal(); navigate('home'); return; }
    renderProfile();
  }

  window.scrollTo(0, 0);
}

// ═══════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════
function openAuthModal() {
  document.getElementById('auth-modal').classList.add('open');
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('open');
  document.getElementById('login-error').textContent = '';
  document.getElementById('reg-error').textContent = '';
}

function showRegister() {
  document.getElementById('auth-view-login').style.display = 'none';
  document.getElementById('auth-view-register').style.display = 'block';
}

function showLogin() {
  document.getElementById('auth-view-register').style.display = 'none';
  document.getElementById('auth-view-login').style.display = 'block';
}

async function loginUser(e) {
  e.preventDefault();
  if (!FIREBASE_READY) { showFirebaseNotice(); return; }
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  try {
    await auth.signInWithEmailAndPassword(email, password);
    closeAuthModal();
  } catch (err) {
    errEl.textContent = authErrorMsg(err.code);
  }
}

async function registerUser(e) {
  e.preventDefault();
  if (!FIREBASE_READY) { showFirebaseNotice(); return; }
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const errEl = document.getElementById('reg-error');
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection('users').doc(cred.user.uid).set({
      displayName: name,
      email,
      xp: 0,
      completedQuests: 0,
      reputation: 0,
      createdAt: fbFieldValue.serverTimestamp(),
    });
    closeAuthModal();
  } catch (err) {
    errEl.textContent = authErrorMsg(err.code);
  }
}

function authErrorMsg(code) {
  const map = {
    'auth/email-already-in-use': 'Bu e-posta zaten kullanımda.',
    'auth/weak-password': 'Şifre çok zayıf (min 6 karakter).',
    'auth/user-not-found': 'Kullanıcı bulunamadı.',
    'auth/wrong-password': 'Yanlış şifre.',
    'auth/invalid-email': 'Geçersiz e-posta.',
    'auth/invalid-credential': 'E-posta veya şifre hatalı.',
  };
  return map[code] || 'Hata: ' + code;
}

function logoutUser() {
  if (!FIREBASE_READY) return;
  auth.signOut();
  navigate('home');
}

function showFirebaseNotice() {
  alert('Firebase henüz yapılandırılmamış. app.js dosyasına Firebase config bilgilerini ekle.');
}

if (FIREBASE_READY) {
  auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    if (user) {
      const snap = await db.collection('users').doc(user.uid).get();
      currentUserData = snap.exists ? snap.data() : { displayName: user.email.split('@')[0], xp: 0, completedQuests: 0 };
    } else {
      currentUserData = null;
    }
    updateNavUser();
  });
}

function updateNavUser() {
  const userEl = document.getElementById('nav-user');
  const loginBtn = document.getElementById('nav-login-btn');
  const profileLink = document.getElementById('nav-profile-link');
  if (currentUser && currentUserData) {
    userEl.style.display = 'flex';
    loginBtn.style.display = 'none';
    profileLink.style.display = 'inline';
    document.getElementById('nav-xp').textContent = (currentUserData.xp || 0).toLocaleString('tr-TR') + ' XP';
    document.getElementById('nav-avatar').textContent = (currentUserData.displayName || 'U').charAt(0).toUpperCase();
  } else {
    userEl.style.display = 'none';
    loginBtn.style.display = 'block';
    profileLink.style.display = 'none';
  }
}

// ═══════════════════════════════════════════════════════════════
// QUEST GRID
// ═══════════════════════════════════════════════════════════════
function renderQuests() {
  const grid = document.getElementById('quests-grid');
  const filtered = QUESTS.filter(q =>
    (categoryFilter === 'all' || q.category === categoryFilter) &&
    (difficultyFilter === 'all' || q.difficulty === difficultyFilter)
  );

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">Bu filtreye uygun görev bulunamadı.</div>';
    return;
  }

  grid.innerHTML = filtered.map(q => `
    <div class="quest-card" data-difficulty="${q.difficulty}" onclick="navigate('quest','${q.id}')">
      <div class="quest-card-top">
        <span class="category-badge ${q.category}">${CATEGORY_LABELS[q.category]}</span>
        <span class="difficulty-badge ${q.difficulty}">${DIFFICULTY_LABELS[q.difficulty]}</span>
      </div>
      <div class="quest-title">${q.title}</div>
      <div class="quest-desc">${q.desc}</div>
      <div class="quest-card-bottom">
        <div class="xp-badge">⚡ ${q.xp} <span>XP</span></div>
        <div class="completion-count" id="cc-${q.id}">— tamamlama</div>
      </div>
    </div>
  `).join('');

  if (FIREBASE_READY) loadCompletionCounts(filtered);
}

async function loadCompletionCounts(quests) {
  for (const q of quests) {
    try {
      const snap = await db.collection('submissions')
        .where('questId', '==', q.id)
        .where('status', '==', 'approved')
        .get();
      const el = document.getElementById('cc-' + q.id);
      if (el) el.textContent = snap.size + ' tamamlama';
    } catch (_) {}
  }
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filterType = btn.dataset.filter;
    const val = btn.dataset.value;
    if (filterType === 'category') {
      categoryFilter = val;
      document.querySelectorAll('[data-filter="category"]').forEach(b => b.classList.remove('active'));
    } else {
      difficultyFilter = val;
      document.querySelectorAll('[data-filter="difficulty"]').forEach(b => b.classList.remove('active'));
    }
    btn.classList.add('active');
    renderQuests();
  });
});

// ═══════════════════════════════════════════════════════════════
// QUEST DETAIL
// ═══════════════════════════════════════════════════════════════
async function renderQuestDetail(questId) {
  const q = QUESTS.find(q => q.id === questId);
  if (!q) { navigate('home'); return; }

  const view = document.getElementById('view-quest');
  view.innerHTML = `
    <div class="quest-detail">
      <button class="back-btn" onclick="navigate('home')">← Görevlere Dön</button>
      <div>
        <div class="quest-detail-badges">
          <span class="category-badge ${q.category}">${CATEGORY_LABELS[q.category]}</span>
          <span class="difficulty-badge ${q.difficulty}">${DIFFICULTY_LABELS[q.difficulty]}</span>
        </div>
        <h1 class="quest-detail-title">${q.title}</h1>
        <p class="quest-detail-desc">${q.desc}</p>
      </div>
      <div class="quest-detail-meta">
        <div class="meta-item">
          <div class="meta-label">XP Ödülü</div>
          <div class="meta-value">⚡ ${q.xp}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Zorluk</div>
          <div class="meta-value white">${DIFFICULTY_LABELS[q.difficulty]}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Kategori</div>
          <div class="meta-value green">${CATEGORY_LABELS[q.category]}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Tamamlama</div>
          <div class="meta-value white" id="detail-cc">—</div>
        </div>
      </div>
      <div class="complete-btn-wrap">
        <button class="btn-primary" onclick="openProofModal('${q.id}')">✓ Görevi Tamamladım</button>
      </div>
      <div class="submissions-section">
        <h3>Topluluk Deneyimleri</h3>
        <div id="submissions-list"><div class="empty-state">Yükleniyor...</div></div>
      </div>
    </div>
  `;

  if (FIREBASE_READY) {
    loadSubmissions(q.id);
  } else {
    document.getElementById('submissions-list').innerHTML =
      '<div class="empty-state">Firebase yapılandırıldıktan sonra topluluk deneyimleri burada görünecek.</div>';
    document.getElementById('detail-cc').textContent = '0';
  }
}

async function loadSubmissions(questId) {
  const list = document.getElementById('submissions-list');
  try {
    const snap = await db.collection('submissions')
      .where('questId', '==', questId)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();

    const approved = snap.docs.filter(d => d.data().status === 'approved').length;
    const ccEl = document.getElementById('detail-cc');
    if (ccEl) ccEl.textContent = approved;

    if (snap.empty) {
      list.innerHTML = '<div class="empty-state">Henüz kimse bu görevi tamamlamamış. İlk sen ol!</div>';
      return;
    }

    let userVotes = {};
    if (currentUser) {
      const voteSnaps = await Promise.all(
        snap.docs.map(doc => db.collection('votes').doc(`${doc.id}_${currentUser.uid}`).get())
      );
      voteSnaps.forEach((v, i) => {
        if (v.exists) userVotes[snap.docs[i].id] = v.data().direction;
      });
    }

    list.innerHTML = snap.docs.map(doc => {
      const d = doc.data();
      const sid = doc.id;
      const date = d.createdAt ? new Date(d.createdAt.seconds * 1000).toLocaleDateString('tr-TR') : '';
      const initials = (d.displayName || 'U').charAt(0).toUpperCase();
      const myVote = userVotes[sid] || '';
      return `
        <div class="submission-card">
          <div class="submission-header">
            <div class="submission-user">
              <div class="submission-avatar">${initials}</div>
              <div>
                <div class="submission-username">${d.displayName || 'Anonim'}</div>
                <div class="submission-date">${date}${d.location ? ' · ' + d.location : ''}</div>
              </div>
            </div>
            <span class="submission-status ${d.status || 'pending'}">${statusLabel(d.status)}</span>
          </div>
          <div class="submission-text">${d.description}</div>
          <div class="submission-footer">
            <div class="submission-witnesses">👥 ${d.witnessCount || 0} tanık</div>
            <div class="vote-buttons">
              <button class="vote-btn upvote ${myVote === 'up' ? 'voted' : ''}" onclick="vote('${sid}','up','${questId}')">
                ✓ <span id="up-${sid}">${d.upvotes || 0}</span>
              </button>
              <button class="vote-btn downvote ${myVote === 'down' ? 'voted' : ''}" onclick="vote('${sid}','down','${questId}')">
                ✗ <span id="dn-${sid}">${d.downvotes || 0}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    if (list) list.innerHTML = '<div class="empty-state">Yüklenirken hata oluştu.</div>';
    console.error('loadSubmissions:', err);
  }
}

function statusLabel(s) {
  return { pending: '⏳ Beklemede', approved: '✓ Onaylı', rejected: '✗ Reddedildi' }[s] || '⏳ Beklemede';
}

// ═══════════════════════════════════════════════════════════════
// VOTING
// ═══════════════════════════════════════════════════════════════
async function vote(submissionId, direction, questId) {
  if (!currentUser) { openAuthModal(); return; }
  if (!FIREBASE_READY) return;

  const subRef = db.collection('submissions').doc(submissionId);
  const voteRef = db.collection('votes').doc(`${submissionId}_${currentUser.uid}`);

  try {
    const [subSnap, voteSnap] = await Promise.all([subRef.get(), voteRef.get()]);
    if (!subSnap.exists) return;

    if (subSnap.data().userId === currentUser.uid) {
      alert('Kendi gönderine oy veremezsin.'); return;
    }

    const existing = voteSnap.exists ? voteSnap.data().direction : null;
    if (existing === direction) return;

    const batch = db.batch();
    if (existing) {
      batch.update(subRef, { [`${existing}votes`]: fbFieldValue.increment(-1) });
    }
    batch.update(subRef, { [`${direction}votes`]: fbFieldValue.increment(1) });
    batch.set(voteRef, { direction, userId: currentUser.uid, createdAt: fbFieldValue.serverTimestamp() });
    await batch.commit();

    // Auto-approve / auto-reject
    const fresh = await subRef.get();
    const fd = fresh.data();
    const ups = fd.upvotes || 0;
    const dns = fd.downvotes || 0;

    if (ups >= 5 && fd.status === 'pending') {
      await subRef.update({ status: 'approved' });
      const quest = QUESTS.find(q => q.id === fd.questId);
      if (quest) {
        await db.collection('users').doc(fd.userId).update({
          xp: fbFieldValue.increment(quest.xp),
          completedQuests: fbFieldValue.increment(1),
        });
      }
    } else if (dns >= 3 && fd.status === 'pending') {
      await subRef.update({ status: 'rejected' });
    }

    loadSubmissions(questId);
  } catch (err) {
    console.error('vote:', err);
  }
}

// ═══════════════════════════════════════════════════════════════
// PROOF SUBMISSION
// ═══════════════════════════════════════════════════════════════
let proofQuestId = null;

document.getElementById('proof-desc').addEventListener('input', function () {
  const words = this.value.trim().split(/\s+/).filter(w => w).length;
  const el = document.getElementById('word-count');
  el.textContent = words + ' / min 50 kelime';
  el.className = 'word-count' + (words >= 50 ? ' ok' : '');
});

function openProofModal(questId) {
  if (!currentUser) { openAuthModal(); return; }
  proofQuestId = questId;
  const q = QUESTS.find(q => q.id === questId);
  document.getElementById('proof-quest-title').textContent = q ? q.title : '';
  document.getElementById('proof-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('proof-desc').value = '';
  document.getElementById('word-count').textContent = '0 / min 50 kelime';
  document.getElementById('word-count').className = 'word-count';
  document.getElementById('proof-error').textContent = '';
  document.getElementById('proof-modal').classList.add('open');
}

function closeProofModal() {
  document.getElementById('proof-modal').classList.remove('open');
  proofQuestId = null;
}

async function submitProof(e) {
  e.preventDefault();
  if (!FIREBASE_READY) { showFirebaseNotice(); return; }
  if (!currentUser || !proofQuestId) return;

  const desc = document.getElementById('proof-desc').value.trim();
  const wordCount = desc.split(/\s+/).filter(w => w).length;
  if (wordCount < 50) {
    document.getElementById('proof-error').textContent = `En az 50 kelime gerekli. Şu an: ${wordCount} kelime.`;
    return;
  }

  const btn = document.getElementById('proof-submit-btn');
  btn.disabled = true;
  btn.textContent = 'Gönderiliyor...';

  try {
    await db.collection('submissions').add({
      questId: proofQuestId,
      userId: currentUser.uid,
      displayName: currentUserData?.displayName || 'Anonim',
      description: desc,
      date: document.getElementById('proof-date').value,
      location: document.getElementById('proof-location').value.trim(),
      witnessCount: parseInt(document.getElementById('proof-witnesses').value) || 0,
      upvotes: 0,
      downvotes: 0,
      status: 'pending',
      createdAt: fbFieldValue.serverTimestamp(),
    });

    closeProofModal();
    document.getElementById('proof-form').reset();
    loadSubmissions(proofQuestId);
    alert('✓ Gönderildi! Topluluk oylayacak — 5 upvote gelince XP kazanacaksın.');
  } catch (err) {
    document.getElementById('proof-error').textContent = 'Hata: ' + err.message;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Gönder & XP Kazan';
  }
}

// ═══════════════════════════════════════════════════════════════
// LEADERBOARD
// ═══════════════════════════════════════════════════════════════
async function loadLeaderboard(period) {
  const list = document.getElementById('leaderboard-list');
  document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
  const tab = document.querySelector(`.lb-tab[data-period="${period}"]`);
  if (tab) tab.classList.add('active');

  if (!FIREBASE_READY) {
    list.innerHTML = '<div class="empty-state">Firebase yapılandırıldıktan sonra aktif olacak.</div>';
    return;
  }

  list.innerHTML = '<div class="empty-state">Yükleniyor...</div>';

  try {
    const snap = await db.collection('users').orderBy('xp', 'desc').limit(20).get();
    if (snap.empty) {
      list.innerHTML = '<div class="empty-state">Henüz kimse yok. İlk tamamlayan sen ol!</div>';
      return;
    }

    const rankEmoji = ['🥇', '🥈', '🥉'];
    const rankClass = ['gold', 'silver', 'bronze'];

    list.innerHTML = snap.docs.map((doc, i) => {
      const d = doc.data();
      const initials = (d.displayName || 'U').charAt(0).toUpperCase();
      const rankContent = i < 3
        ? `<span class="lb-rank ${rankClass[i]}">${rankEmoji[i]}</span>`
        : `<span class="lb-rank">${i + 1}</span>`;
      return `
        <div class="lb-row">
          ${rankContent}
          <div class="lb-avatar">${initials}</div>
          <div class="lb-info">
            <div class="lb-name">${d.displayName || 'Anonim'}</div>
            <div class="lb-quests">${d.completedQuests || 0} görev tamamlandı</div>
          </div>
          <div class="lb-xp">${(d.xp || 0).toLocaleString('tr-TR')} XP</div>
        </div>
      `;
    }).join('');
  } catch (err) {
    list.innerHTML = '<div class="empty-state">Yüklenirken hata oluştu.</div>';
    console.error('leaderboard:', err);
  }
}

document.querySelectorAll('.lb-tab').forEach(tab => {
  tab.addEventListener('click', () => loadLeaderboard(tab.dataset.period));
});

// ═══════════════════════════════════════════════════════════════
// PROFILE
// ═══════════════════════════════════════════════════════════════
async function renderProfile() {
  const content = document.getElementById('profile-content');
  if (!currentUser || !currentUserData) {
    content.innerHTML = '<div class="empty-state">Giriş yapman gerekiyor.</div>';
    return;
  }

  const initials = (currentUserData.displayName || 'U').charAt(0).toUpperCase();

  content.innerHTML = `
    <div class="profile-wrap">
      <div class="profile-header">
        <div class="profile-avatar-big">${initials}</div>
        <div>
          <div class="profile-name">${currentUserData.displayName || 'Kahraman'}</div>
          <div class="profile-email">${currentUser.email}</div>
        </div>
      </div>
      <div class="profile-stats">
        <div class="stat-card">
          <div class="stat-card-num">⚡ ${(currentUserData.xp || 0).toLocaleString('tr-TR')}</div>
          <div class="stat-card-label">Toplam XP</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-num">${currentUserData.completedQuests || 0}</div>
          <div class="stat-card-label">Tamamlanan Görev</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-num">${currentUserData.reputation || 0}</div>
          <div class="stat-card-label">İtibar Puanı</div>
        </div>
      </div>
      <div class="profile-section-title">Son Gönderimlerin</div>
      <div id="profile-submissions"><div class="empty-state">Yükleniyor...</div></div>
      <button class="logout-btn" onclick="logoutUser()">Çıkış Yap</button>
    </div>
  `;

  if (!FIREBASE_READY) {
    document.getElementById('profile-submissions').innerHTML =
      '<div class="empty-state">Firebase yapılandırıldıktan sonra görünecek.</div>';
    return;
  }

  try {
    const snap = await db.collection('submissions')
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    const subEl = document.getElementById('profile-submissions');
    if (snap.empty) {
      subEl.innerHTML = '<div class="empty-state">Henüz görev tamamlamadın. Hadi başla!</div>';
      return;
    }

    subEl.innerHTML = snap.docs.map(doc => {
      const d = doc.data();
      const q = QUESTS.find(q => q.id === d.questId);
      const date = d.createdAt ? new Date(d.createdAt.seconds * 1000).toLocaleDateString('tr-TR') : '';
      return `
        <div class="submission-card" style="cursor:pointer" onclick="navigate('quest','${d.questId}')">
          <div class="submission-header">
            <div>
              <div class="submission-username">${q ? q.title : d.questId}</div>
              <div class="submission-date">${date}</div>
            </div>
            <span class="submission-status ${d.status || 'pending'}">${statusLabel(d.status)}</span>
          </div>
          <div class="submission-text" style="-webkit-line-clamp:2;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden">${d.description}</div>
          <div class="submission-witnesses">👍 ${d.upvotes || 0} · 👎 ${d.downvotes || 0} · 👥 ${d.witnessCount || 0} tanık</div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('profile submissions:', err);
  }
}

// ═══════════════════════════════════════════════════════════════
// HERO STATS
// ═══════════════════════════════════════════════════════════════
async function loadHeroStats() {
  if (!FIREBASE_READY) return;
  try {
    const [usersSnap, subSnap] = await Promise.all([
      db.collection('users').get(),
      db.collection('submissions').where('status', '==', 'approved').get(),
    ]);
    document.getElementById('stat-users').textContent = usersSnap.size;
    document.getElementById('stat-completions').textContent = subSnap.size;
  } catch (_) {}
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════
renderQuests();
loadHeroStats();
