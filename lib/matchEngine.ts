import fs from 'fs';
import path from 'path';
import { computeAxes, getGender, AxisScores } from './axes';
import { KoreanNameResult } from '@/types/result';

// Korean surnames weighted by population frequency (per 10,000)
const SURNAMES = [
  { ko: '김', ro: 'Kim',   w: 215 },
  { ko: '이', ro: 'Lee',   w: 148 },
  { ko: '박', ro: 'Park',  w: 84  },
  { ko: '최', ro: 'Choi',  w: 47  },
  { ko: '정', ro: 'Jung',  w: 44  },
  { ko: '강', ro: 'Kang',  w: 23  },
  { ko: '조', ro: 'Jo',    w: 22  },
  { ko: '윤', ro: 'Yoon',  w: 21  },
  { ko: '장', ro: 'Jang',  w: 20  },
  { ko: '임', ro: 'Lim',   w: 17  },
  { ko: '한', ro: 'Han',   w: 14  },
  { ko: '오', ro: 'Oh',    w: 13  },
  { ko: '신', ro: 'Shin',  w: 13  },
  { ko: '서', ro: 'Seo',   w: 11  },
  { ko: '권', ro: 'Kwon',  w: 11  },
  { ko: '황', ro: 'Hwang', w: 8   },
  { ko: '안', ro: 'An',    w: 8   },
  { ko: '송', ro: 'Song',  w: 7   },
  { ko: '전', ro: 'Jeon',  w: 7   },
  { ko: '홍', ro: 'Hong',  w: 5   },
  { ko: '류', ro: 'Ryu',   w: 6   },
  { ko: '유', ro: 'Yoo',   w: 6   },
  { ko: '고', ro: 'Ko',    w: 5   },
  { ko: '문', ro: 'Moon',  w: 5   },
  { ko: '양', ro: 'Yang',  w: 5   },
  { ko: '손', ro: 'Son',   w: 4   },
  { ko: '배', ro: 'Bae',   w: 4   },
  { ko: '백', ro: 'Baek',  w: 4   },
  { ko: '허', ro: 'Heo',   w: 4   },
  { ko: '남', ro: 'Nam',   w: 3   },
  { ko: '심', ro: 'Sim',   w: 3   },
  { ko: '노', ro: 'Noh',   w: 3   },
  { ko: '하', ro: 'Ha',    w: 3   },
  { ko: '곽', ro: 'Gwak',  w: 3   },
  { ko: '성', ro: 'Seong', w: 3   },
  { ko: '차', ro: 'Cha',   w: 3   },
  { ko: '주', ro: 'Ju',    w: 3   },
  { ko: '우', ro: 'Woo',   w: 2   },
  { ko: '구', ro: 'Gu',    w: 2   },
  { ko: '민', ro: 'Min',   w: 2   },
  { ko: '진', ro: 'Jin',   w: 2   },
  { ko: '지', ro: 'Ji',    w: 2   },
  { ko: '엄', ro: 'Eom',   w: 2   },
  { ko: '채', ro: 'Chae',  w: 2   },
  { ko: '원', ro: 'Won',   w: 1   },
];

// First-letter → phonetically similar Korean surnames (multiple = random pick)
const LETTER_MAP: Record<string, Array<{ ko: string; ro: string }>> = {
  a: [{ ko: '안', ro: 'An' }],
  b: [{ ko: '배', ro: 'Bae' }],
  c: [{ ko: '최', ro: 'Choi' }, { ko: '차', ro: 'Cha' }],
  d: [{ ko: '도', ro: 'Do' }],
  e: [{ ko: '이', ro: 'Lee' }],
  f: [{ ko: '방', ro: 'Bang' }],
  g: [{ ko: '강', ro: 'Kang' }],
  h: [{ ko: '한', ro: 'Han' }, { ko: '황', ro: 'Hwang' }, { ko: '홍', ro: 'Hong' }],
  i: [{ ko: '이', ro: 'Lee' }],
  j: [{ ko: '장', ro: 'Jang' }, { ko: '정', ro: 'Jung' }, { ko: '조', ro: 'Jo' }],
  k: [{ ko: '김', ro: 'Kim' }, { ko: '강', ro: 'Kang' }, { ko: '권', ro: 'Kwon' }],
  l: [{ ko: '이', ro: 'Lee' }, { ko: '임', ro: 'Lim' }],
  m: [{ ko: '문', ro: 'Moon' }],
  n: [{ ko: '남', ro: 'Nam' }],
  o: [{ ko: '오', ro: 'Oh' }],
  p: [{ ko: '박', ro: 'Park' }],
  q: [{ ko: '권', ro: 'Kwon' }],
  r: [{ ko: '류', ro: 'Ryu' }],
  s: [{ ko: '서', ro: 'Seo' }, { ko: '신', ro: 'Shin' }, { ko: '송', ro: 'Song' }],
  t: [{ ko: '태', ro: 'Tae' }],
  u: [{ ko: '우', ro: 'Woo' }],
  v: [{ ko: '방', ro: 'Bang' }],
  w: [{ ko: '윤', ro: 'Yoon' }],
  x: [{ ko: '서', ro: 'Seo' }],
  y: [{ ko: '윤', ro: 'Yoon' }, { ko: '양', ro: 'Yang' }],
  z: [{ ko: '장', ro: 'Jang' }],
};

function pickSurnameFromName(userName: string): { ko: string; ro: string; origin: string } | null {
  const letter = userName.trim()[0]?.toLowerCase();
  if (!letter || !/[a-z]/.test(letter)) return null;
  const options = LETTER_MAP[letter];
  if (!options || options.length === 0) return null;
  const chosen = options[Math.floor(Math.random() * options.length)];
  return { ...chosen, origin: `${letter.toUpperCase()} → ${chosen.ko} (${chosen.ro})` };
}

function pickSurnameRandom(): { ko: string; ro: string } {
  const total = SURNAMES.reduce((sum, s) => sum + s.w, 0);
  let r = Math.random() * total;
  for (const s of SURNAMES) {
    r -= s.w;
    if (r <= 0) return { ko: s.ko, ro: s.ro };
  }
  return { ko: SURNAMES[0].ko, ro: SURNAMES[0].ro };
}

interface NameRecord {
  id: number;
  name_korean: string;
  name_romanized: string;
  gender: 'male' | 'female' | 'neutral';
  creative: number;
  warm: number;
  urban: number;
  independent: number;
  elegant: number;
  meaning: string;
  characters: Array<{ char: string; romanized: string; meaning: string }>;
}

interface PlaceRecord {
  id: number;
  name: string;
  name_ko: string;
  description: string;
  gender_affinity: string;
  creative: number;
  warm: number;
  urban: number;
  independent: number;
  elegant: number;
  lat: number;
  lng: number;
  keywords: string[];
}

interface MediaRecord {
  id: number;
  title: string;
  title_en: string;
  year: string;
  genre: string;
  reason: string;
  platform: string;
  gender_affinity: string;
  creative: number;
  warm: number;
  urban: number;
  independent: number;
  elegant: number;
}

function dist(user: AxisScores, item: AxisScores): number {
  return (
    Math.abs(user.creative - item.creative) +
    Math.abs(user.warm - item.warm) +
    Math.abs(user.urban - item.urban) +
    Math.abs(user.independent - item.independent) +
    Math.abs(user.elegant - item.elegant)
  );
}

function load<T>(filename: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), filename), 'utf8')) as T;
}

// Pick `count` items from the top `poolSize` candidates, shuffled for variety
function pickFromPool<T>(items: { item: T; d: number }[], poolSize: number, count: number): T[] {
  const pool = items.slice(0, poolSize);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(({ item }) => item);
}

export function match(answers: string[], userName?: string): KoreanNameResult {
  const axes = computeAxes(answers);
  const gender = getGender(answers);

  const namedSurname = userName ? pickSurnameFromName(userName) : null;
  const surname = namedSurname ?? pickSurnameRandom();

  const names = load<NameRecord[]>('names.json');
  const places = load<PlaceRecord[]>('places.json');
  const dramas = load<MediaRecord[]>('dramas.json');
  const movies = load<MediaRecord[]>('movies.json');

  const filteredNames = names.filter((n) => n.gender === gender);
  const sortedNames = filteredNames
    .map((n) => ({ n, d: dist(axes, n) }))
    .sort((a, b) => a.d - b.d);
  const best = sortedNames[0];

  const compatibilityScore = Math.min(100, Math.max(0, Math.round((1 - best.d / 50) * 100)));

  // neutral users only get 'all' tagged items; male/female also include their own gender
  const allowed = gender === 'neutral' ? ['all'] : [gender, 'all'];

  const sortedPlaces = places
    .filter((p) => allowed.includes(p.gender_affinity))
    .map((p) => ({ item: { name: p.name, name_ko: p.name_ko, description: p.description, lat: p.lat, lng: p.lng, keywords: p.keywords }, d: dist(axes, p) }))
    .sort((a, b) => a.d - b.d);

  const sortedDramas = dramas
    .filter((d) => allowed.includes(d.gender_affinity))
    .map((d) => ({
      item: { title: d.title, title_en: d.title_en, year: d.year, genre: d.genre, reason: d.reason, platform: d.platform, match_score: 0 },
      d: dist(axes, d),
    }))
    .sort((a, b) => a.d - b.d);

  const sortedMovies = movies
    .filter((m) => allowed.includes(m.gender_affinity))
    .map((m) => ({
      item: { title: m.title, title_en: m.title_en, year: m.year, genre: m.genre, reason: m.reason, platform: m.platform, match_score: 0 },
      d: dist(axes, m),
    }))
    .sort((a, b) => a.d - b.d);

  const topPlaces = pickFromPool(sortedPlaces, 5, 3);
  // Media: top-1 is always the best match; 2nd and 3rd are drawn from the next pool for variety
  const topDramas = [
    sortedDramas[0],
    ...([...sortedDramas.slice(1, 6)].sort(() => Math.random() - 0.5).slice(0, 2)),
  ].map(({ item, d: itemDist }) => ({
    ...item,
    match_score: Math.min(100, Math.max(0, Math.round((1 - itemDist / 50) * 100))),
  }));
  const topMovies = [
    sortedMovies[0],
    ...([...sortedMovies.slice(1, 6)].sort(() => Math.random() - 0.5).slice(0, 2)),
  ].map(({ item, d: itemDist }) => ({
    ...item,
    match_score: Math.min(100, Math.max(0, Math.round((1 - itemDist / 50) * 100))),
  }));

  const name = best.n;

  const alternativeNames = sortedNames.slice(1, 5).map(({ n, d }) => ({
    name_korean: n.name_korean,
    name_romanized: n.name_romanized,
    compatibility_score: Math.min(100, Math.max(0, Math.round((1 - d / 50) * 100))),
    name_meaning: n.meaning,
  }));

  return {
    surname_korean: surname.ko,
    surname_romanized: surname.ro,
    ...(namedSurname ? { surname_origin: namedSurname.origin } : {}),
    name_korean: name.name_korean,
    name_romanized: name.name_romanized,
    compatibility_score: compatibilityScore,
    name_meaning: name.meaning,
    name_characters: name.characters,
    alternative_names: alternativeNames,
    your_korea: topPlaces,
    kdrama_recommendations: topDramas,
    movie_recommendations: topMovies,
  };
}
