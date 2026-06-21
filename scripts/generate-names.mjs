import fs from 'fs';

// Korean Revised Romanization
const CHO  = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
const JUNG = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
const JONG = ['','k','k','k','n','n','n','t','l','k','m','l','l','l','p','l','m','p','p','t','t','ng','t','t','k','t','p','t'];

function syllRo(ch) {
  const cp = ch.charCodeAt(0);
  if (cp < 0xAC00 || cp > 0xD7A3) return ch;
  const o = cp - 0xAC00;
  return CHO[Math.floor(o/28/21)] + JUNG[Math.floor(o/28)%21] + JONG[o%28];
}
function nameRo(name) {
  const r = [...name].map(syllRo).join('');
  return r[0].toUpperCase() + r.slice(1);
}

// Syllable meaning database
const SM = {
  '서':'clear grace','윤':'bright harmony','연':'lotus flower','지':'wisdom',
  '하':'summer warmth','우':'universe','은':'silver grace','민':'bright sky',
  '현':'wise virtue','채':'colorful brilliance','소':'pure gentleness',
  '나':'graceful','다':'abundant','가':'beautiful','아':'elegant beauty',
  '유':'gentle flow','빈':'refined elegance','린':'precious jade',
  '진':'precious gem','원':'garden wish','율':'harmonious rhythm',
  '안':'peaceful serenity','온':'warm gentleness','수':'pure excellence',
  '시':'poetry','예':'art and beauty','도':'righteous path','정':'still purity',
  '이':'joyful spirit','희':'bright joy','태':'great peace',
  '주':'precious pearl','혜':'wise grace','규':'bright star',
  '성':'sincere brightness','재':'brilliant talent','보':'treasure',
  '영':'eternal brightness','경':'beautiful scenery','준':'outstanding talent',
  '한':'vast and noble','건':'strong and healthy','승':'rising victory',
  '호':'vast lake','환':'bright joy','후':'generous spirit','찬':'brilliant radiance',
  '혁':'brilliant change','욱':'rising sun','석':'firm rock',
  '동':'eastern light','선':'goodness and virtue',
  '결':'crystal clarity','인':'benevolence','람':'blue sky',
  '설':'snow white','솔':'pine tree','봄':'spring',
  '별':'star','산':'mountain','달':'moon','빛':'light','래':'future',
  '기':'spirit','운':'fortunate cloud','름':'beautiful',
  '미':'beautiful','르':'dragon','슬':'glistening water',
  '여':'graceful','울':'flowing stream','초':'fresh start',
  '롱':'clear bright','노':'sunset glow','담':'pure heart','오':'dawn',
  '누':'world','루':'height','마':'forest','새':'new beginning',
  '벽':'morning sky','랑':'bright wave','늘':'always',
  '든':'abundant','로':'path','라':'joyful','단':'upright honesty',
  '양':'sun energy','훈':'noble training','리':'reason and beauty',
  '사':'thoughtful love','랑':'flowing love','름':'beautiful name',
  '솔':'pine strength','온':'warmth','결':'clarity',
  '효':'devotion','림':'forest','주':'pearl','오':'dawn',
};

// Curated name meanings
const NM = {
  // FEMALE
  '서윤':'Clear grace that shines with bright harmony',
  '서연':'Graceful as lotus blooms along a clear stream',
  '지우':'Wisdom that fills the vast universe',
  '하윤':'Summer warmth shining with bright harmony',
  '서현':'Clear grace and wise virtue combined',
  '하은':'Silver grace of a warm summer',
  '민서':'Bright as the sky with clear grace',
  '지유':'Wisdom that flows gently',
  '윤서':'Bright harmony with clear grace',
  '채원':'Colorful brilliance blooming in a garden of wishes',
  '수아':'Pure excellence with elegant beauty',
  '지아':'Wisdom and elegant beauty',
  '서아':'Clear graceful elegance',
  '지민':'Wisdom bright as the sky',
  '지안':'Wisdom and peaceful serenity',
  '지윤':'Wisdom that shines harmoniously',
  '다은':'Abundant silver grace',
  '은서':'Silver grace that flows clearly',
  '하린':'Summer jade, rare and beautiful',
  '예린':'Beautiful art like precious jade',
  '소율':'Pure harmonious rhythm',
  '예은':'Beautiful art graced with silver',
  '유나':'Gentle flow with graceful beauty',
  '수빈':'Pure excellence with refined elegance',
  '소윤':'Pure harmony shining brightly',
  '예원':'Beautiful art in a garden of wishes',
  '지원':'Wisdom flowering in a garden of wishes',
  '아린':'Elegant jade beauty',
  '시은':'Poetic silver grace',
  '시아':'Poetry and elegant beauty',
  '윤아':'Bright harmony with elegant beauty',
  '채은':'Colorful brilliance and silver grace',
  '유진':'Gentle flow like a precious gem',
  '예나':'Beautiful and graceful art',
  '아윤':'Elegant harmonious beauty',
  '예서':'Beautiful art with clear grace',
  '유주':'Gentle flow, precious as a pearl',
  '하율':'Summer harmony and rhythm',
  '연우':'Lotus flower and the universe',
  '가은':'Beautiful silver grace',
  '주아':'Precious pearl with elegant beauty',
  '다인':'Abundant benevolence',
  '예진':'Beautiful art like a precious gem',
  '서영':'Clear grace that shines eternally',
  '민지':'Bright sky and wisdom',
  '연서':'Lotus with clear grace',
  '서우':'Clear grace and the universe',
  '아인':'Elegant benevolence',
  '나은':'Graceful silver',
  '서하':'Clear grace in summer warmth',
  '수연':'Pure excellence like a lotus flower',
  '수민':'Pure excellence bright as the sky',
  '채윤':'Colorful harmonious brilliance',
  '서은':'Clear grace and silver',
  '채아':'Colorful brilliance with elegant beauty',
  '시연':'Poetry blooming like lotus',
  '서율':'Clear harmonious rhythm',
  '나윤':'Graceful harmony',
  '하연':'Summer lotus flower',
  '지율':'Wisdom in harmonious rhythm',
  '다연':'Abundant lotus flowers',
  '이서':'Joyful and clear grace',
  '현서':'Wise and clear grace',
  '다현':'Abundant wisdom',
  '유빈':'Gentle and refined elegance',
  '소은':'Pure silver grace',
  '서진':'Clear and precious gem',
  '예지':'Beautiful wisdom',
  '사랑':'Love that overflows from the heart',
  '세아':'Worldly elegant beauty',
  '수현':'Pure excellence with wisdom',
  '나연':'Graceful lotus flower',
  '은채':'Silver colorful brilliance',
  '지은':'Wisdom and grace',
  '다윤':'Abundant harmony',
  '시현':'Poetry and wisdom',
  '예빈':'Beautiful and refined',
  '주하':'Precious pearl in summer warmth',
  '채린':'Colorful jade beauty',
  '유하':'Gentle summer flow',
  '다온':'Abundant warmth and gentleness',
  '민주':'Bright sky and precious pearl',
  '지수':'Wisdom and pure excellence',
  '윤지':'Bright harmony and wisdom',
  '지현':'Wisdom and wise virtue',
  '소연':'Pure lotus flower',
  '소민':'Pure brightness',
  '소이':'Pure joyful spirit',
  '하영':'Summer warmth shining eternally',
  '승아':'Rising elegant beauty',
  '윤슬':'Glistening water that shines brightly',
  '리아':'Pear blossom beauty',
  '세은':'Worldly silver grace',
  '민아':'Bright sky with elegant beauty',
  '혜원':'Wise grace in a garden',
  '재이':'Talented joyful spirit',
  '서희':'Clear and joyful brightness',
  '아현':'Elegant wisdom',
  '나현':'Graceful wisdom',
  '아영':'Elegant eternal brightness',
  '도연':'Righteous lotus flower',
  '채이':'Colorful joyful brilliance',
  '규리':'Star-bright jade',
  '연아':'Lotus flower with elegant beauty',
  '민채':'Bright colorful brilliance',
  '가윤':'Beautiful harmony',
  '시윤':'Poetry in harmonious rhythm',
  '봄':'Spring that brings new life and renewal',
  '지연':'Wisdom and lotus flower',
  '태희':'Great peaceful bright joy',
  '주은':'Precious pearl and silver grace',
  '설아':'Snow-white elegant beauty',
  '예림':'Beautiful art in a forest',
  '윤하':'Bright harmony in summer warmth',
  '유정':'Gentle stillness',
  '정원':'Pure and still garden wish',
  '로아':'Path to elegant beauty',
  '라희':'Joyful bright happiness',
  '소현':'Pure wisdom',
  '보민':'Precious bright treasure',
  '세연':'Worldly lotus flower',
  '수진':'Pure precious gem',
  '하늘':'Vast sky that embraces everything',
  '민정':'Bright stillness',
  '현지':'Wise and knowing',
  '태리':'Great jade beauty',
  '지효':'Wisdom and devotion',
  '가현':'Beautiful wisdom',
  '나경':'Graceful beautiful scenery',
  '하나':'One beautiful summer',
  '가온':'Beautiful warmth at the center',
  '민경':'Bright beautiful scenery',
  '이현':'Joyful wisdom',
  '한별':'One bright shining star',
  '가연':'Beautiful lotus flower',
  '은지':'Silver wisdom',
  '태린':'Great jade beauty',
  '소희':'Pure bright joy',
  '단아':'Upright and elegant beauty',
  '예슬':'Beautiful glistening art',
  '도아':'Righteous elegant beauty',
  '채연':'Colorful lotus flower',
  '이나':'Joyful graceful beauty',
  '하랑':'Summer bright wave',
  '하진':'Summer precious gem',
  '은솔':'Silver pine tree',
  '채민':'Colorful brightness',
  '유리':'Gentle jade beauty',
  '현아':'Wise elegant beauty',
  '은유':'Silver gentle flow',
  '다솜':'Abundant warmth',
  '이솔':'Joyful pine tree',
  '유림':'Gentle forest',
  '효주':'Devoted precious pearl',
  '예주':'Beautiful precious pearl',
  '다빈':'Abundant refined elegance',
  '다희':'Abundant bright joy',
  '유민':'Gentle brightness',
  '태연':'Greatly peaceful and serene',
  '지온':'Wisdom and warm gentleness',
  // MALE
  '서준':'Clear grace and outstanding talent',
  '민준':'Bright sky and outstanding talent',
  '도윤':'Righteous bright harmony',
  '시우':'Poetry and the universe',
  '하준':'Summer outstanding talent',
  '예준':'Beautiful outstanding talent',
  '지호':'Wisdom vast as a lake',
  '주원':'Precious pearl and garden wish',
  '도현':'Righteous and wise',
  '지후':'Wisdom and generous spirit',
  '준우':'Outstanding talent and the universe',
  '준서':'Outstanding grace',
  '우진':'Universe and precious gem',
  '건우':'Strong healthy universe',
  '현우':'Wise universe',
  '선우':'Goodness and the universe',
  '지훈':'Wisdom and noble training',
  '유준':'Gentle and outstanding talent',
  '은우':'Silver universe',
  '이준':'Joyful and outstanding talent',
  '서진':'Clear precious gem',
  '민재':'Bright and talented',
  '정우':'Pure universe',
  '현준':'Wise and outstanding talent',
  '윤우':'Bright harmony and universe',
  '수호':'Pure vast lake',
  '유찬':'Gentle brilliance',
  '승우':'Rising universe',
  '이안':'Joyful peaceful serenity',
  '승현':'Rising wisdom',
  '지환':'Wisdom bright and joyful',
  '준혁':'Outstanding brilliant transformation',
  '시후':'Poetry and generous spirit',
  '진우':'Precious and vast universe',
  '승민':'Rising brightness',
  '민성':'Bright sincerity',
  '수현':'Pure excellence and wisdom',
  '우주':'Vast universe filled with wonder',
  '준영':'Outstanding eternal brightness',
  '은호':'Silver vast lake',
  '재윤':'Talented harmony',
  '지한':'Wisdom vast as the sky',
  '태윤':'Great bright harmony',
  '한결':'One consistent and noble spirit',
  '시온':'Poetry and warm gentleness',
  '서우':'Clear grace and universe',
  '윤호':'Bright vast lake',
  '은찬':'Silver brilliance',
  '시원':'Poetry and garden wish',
  '민우':'Bright universe',
  '동현':'Eastern wisdom',
  '도하':'Righteous summer warmth',
  '우빈':'Universe and refined elegance',
  '로운':'Path of good fortune',
  '재원':'Talented garden wish',
  '민규':'Bright star',
  '율':'Harmonious rhythm that flows naturally',
  '민찬':'Bright brilliance',
  '재민':'Talented brightness',
  '하율':'Summer harmonious rhythm',
  '윤재':'Bright talent',
  '태오':'Great dawn',
  '준호':'Outstanding vast lake',
  '준':'Outstanding and talented spirit',
  '하민':'Summer brightness',
  '지민':'Wisdom brightness',
  '민호':'Bright vast lake',
  '성민':'Sincere brightness',
  '승준':'Rising outstanding talent',
  '이든':'Joyful abundant spirit',
  '재현':'Talented wisdom',
  '태민':'Great brightness',
  '현서':'Wise grace',
  '지성':'Wisdom and sincerity',
  '하람':'Summer blue sky',
  '성현':'Sincere wisdom',
  '예성':'Beautiful sincerity',
  '태현':'Great wisdom',
  '규민':'Star brightness',
  '다온':'Abundant warmth and gentleness',
  '윤성':'Bright sincerity',
  '태양':'Great sun with boundless energy',
  '성준':'Sincere outstanding talent',
  '주안':'Precious pearl and peaceful serenity',
  '도훈':'Righteous noble training',
  '정민':'Pure brightness',
  '민혁':'Bright brilliant transformation',
  '지오':'Wisdom at dawn',
  '주호':'Precious pearl vast lake',
  '도영':'Righteous eternal brightness',
  '은성':'Silver sincerity',
  '예찬':'Beautiful brilliance',
  '준희':'Outstanding bright joy',
  '건':'Strong healthy and heavenly spirit',
  '준수':'Outstanding excellence',
  '도율':'Righteous harmonious rhythm',
  '민석':'Bright firm rock',
  '하랑':'Summer bright wave',
  '도준':'Righteous outstanding talent',
  '강민':'Strong brightness',
  '태준':'Great outstanding talent',
};

function readCSV(file) {
  return fs.readFileSync(file, 'utf8')
    .trim().split('\n').slice(1)
    .map(line => { const [r, n] = line.split(','); return { rank: parseInt(r), name: n?.trim() }; })
    .filter(r => r.name);
}

function axes(rank, total) {
  const p = 1 - (rank - 1) / total;
  const rnd = () => Math.round((Math.random() - 0.5) * 4); // ±2 noise for more spread
  const clamp = v => Math.max(1, Math.min(10, v));
  return {
    creative:    clamp(Math.round(9 - p * 5) + rnd()),
    warm:        clamp(Math.round(4 + p * 5) + rnd()),
    urban:       clamp(Math.round(4 + p * 4) + rnd()),
    independent: clamp(Math.round(5 + (1 - p) * 4) + rnd()),
    elegant:     clamp(Math.round(5 + p * 3) + rnd()),
  };
}

function axisKey(n) {
  return `${n.creative},${n.warm},${n.urban},${n.independent},${n.elegant}`;
}

function breakTies(list) {
  const AXES = ['creative','warm','urban','independent','elegant'];
  const clamp = v => Math.max(1, Math.min(10, v));
  const byGender = {};
  for (const n of list) {
    if (!byGender[n.gender]) byGender[n.gender] = [];
    byGender[n.gender].push(n);
  }
  for (const group of Object.values(byGender)) {
    let changed = true;
    while (changed) {
      changed = false;
      const seen = new Map();
      for (const n of group) {
        const key = axisKey(n);
        if (seen.has(key)) {
          // nudge one random axis by ±1
          const ax = AXES[Math.floor(Math.random() * AXES.length)];
          n[ax] = clamp(n[ax] + (Math.random() < 0.5 ? 1 : -1));
          changed = true;
          break;
        }
        seen.set(key, n);
      }
    }
  }
}

function getMeaning(name) {
  if (NM[name]) return NM[name];
  const parts = [...name].map(c => SM[c] || 'beautiful');
  const s = parts.join(', ');
  return s[0].toUpperCase() + s.slice(1);
}

function getChars(name) {
  return [...name].map(c => ({
    char: c,
    romanized: syllRo(c),
    meaning: SM[c] || 'beautiful',
  }));
}

let id = 1;
const out = [];

for (const [file, gender] of [
  ['Korean_womenname.csv', 'female'],
  ['Korean_menname.csv', 'male'],
  ['Korean_neutralname.csv', 'neutral'],
]) {
  const list = readCSV(file);
  for (const { rank, name } of list) {
    out.push({
      id: id++,
      name_korean: name,
      name_romanized: nameRo(name),
      gender,
      ...axes(rank, list.length),
      meaning: getMeaning(name),
      characters: getChars(name),
    });
  }
}

// Break ties within each gender pool
breakTies(out);

// Re-assign sequential IDs after tie-breaking
out.forEach((n, i) => { n.id = i + 1; });

const byGender = { female: 0, male: 0, neutral: 0 };
out.forEach(n => byGender[n.gender]++);
fs.writeFileSync('names.json', JSON.stringify(out, null, 2), 'utf8');
console.log(`Done: ${out.length} names written (female: ${byGender.female}, male: ${byGender.male}, neutral: ${byGender.neutral})`);
