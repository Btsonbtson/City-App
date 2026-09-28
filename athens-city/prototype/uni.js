/* My University: registration name + faculty, then a chapter built from
   the city folder, Wikipedia and Wikidata. Housing is ranked by area safety first. */

const TURIN_AREAS = [
  {
    name: "Crocetta", lat: 45.0626, lng: 7.6622, safety: 1,
    note: bi(
      "Turin's safety notes call Crocetta calmer and well lit, with the Politecnico in the neighbourhood. Search here before a closer but empty night street.",
      "Οι σημειώσεις ασφάλειας του Τορίνο λένε την Crocetta πιο ήσυχη και φωτισμένη, με το Politecnico στη γειτονιά. Ψάξε εδώ πριν από έναν πιο κοντινό αλλά έρημο δρόμο τη νύχτα."
    )
  },
  {
    name: "Centro, Via Roma–Via Lagrange", lat: 45.068, lng: 7.682, safety: 1,
    note: bi(
      "The same guides point to the grid between Via Roma and Via Lagrange: patrols, arcades, people in the evening. A short walk there beats a nearer side street.",
      "Οι ίδιοι οδηγοί δείχνουν το τετράγωνο ανάμεσα σε Via Roma και Via Lagrange: περιπολίες, στοές, κόσμος το βράδυ. Μια σύντομη διαδρομή εκεί μετράει περισσότερο από έναν πιο κοντινό παράδρομο."
    )
  },
  {
    name: "San Salvario, Via Madama Cristina", lat: 45.058, lng: 7.682, safety: 2,
    note: bi(
      "Near Via Po, but the guide says to stay on Via Madama Cristina and avoid side streets after midnight. Closer is not the first reason to rent here.",
      "Κοντά στη Via Po, αλλά ο οδηγός λέει να μένεις στη Via Madama Cristina και να αποφεύγεις τους παράδρομους μετά τα μεσάνυχτα. Το «πιο κοντά» δεν είναι ο πρώτος λόγος να νοικιάσεις εδώ."
    )
  },
  {
    name: "Aurora / Porta Palazzo", lat: 45.082, lng: 7.681, safety: 3,
    note: bi(
      "Morning markets are described as fine. Evenings need more care. Do not rank a listing here above a safer area only because it is closer to campus.",
      "Οι πρωινές αγορές περιγράφονται ως εντάξει. Το βράδυ θέλει περισσότερη προσοχή. Μην βάλεις μια αγγελία εδώ πάνω από μια ασφαλέστερη περιοχή μόνο επειδή είναι πιο κοντά στη σχολή."
    )
  }
];

const PORTALS = {
  GR: [
    { name: "Spitogatos", url: "https://www.spitogatos.gr/" },
    { name: "XE", url: "https://www.xe.gr/property/s/enoikiasi-katoikies" }
  ],
  FR: [{ name: "SeLoger", url: "https://www.seloger.com/" }],
  ES: [{ name: "Idealista", url: "https://www.idealista.com/" }],
  DE: [{ name: "ImmoScout24", url: "https://www.immobilienscout24.de/" }],
  GB: [{ name: "Rightmove", url: "https://www.rightmove.co.uk/" }],
  US: [{ name: "Zillow", url: "https://www.zillow.com/" }],
  NL: [{ name: "Funda", url: "https://www.funda.nl/" }],
  PT: [{ name: "Idealista", url: "https://www.idealista.pt/" }],
  AT: [{ name: "Willhaben", url: "https://www.willhaben.at/iad/immobilien/mietwohnungen/" }]
};

function kmBetween(a, b) {
  if (!a || !b || a.lat == null || b.lat == null) return 99;
  const r = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * r * Math.asin(Math.min(1, Math.sqrt(s)));
}

function localCampusPhotos(place, city) {
  if (!place) return [];
  const id = (place.id || "").toLowerCase();
  const fromFolder = (city.photos || []).filter((p) => {
    const file = (p.file || "").toLowerCase();
    return id && (file.startsWith(id + "-") || file.startsWith(id + "."));
  }).map((p) => ({ file: p.file, caption: p.caption, credit: p.credit, local: true }));
  if (fromFolder.length) return fromFolder;
  if (place.photo) return [{ file: place.photo, caption: place.local || place.name, local: true }];
  return [];
}

const NEAR_KM = 1.6;
const EDISU_HALLS = [
  { short: "Verdi", street: "Via Giuseppe Verdi, 15", cap: "10124", phone: "+39 011 6531300", lat: 45.0691658, lng: 7.6905579 },
  { short: "Palazzo degli Stemmi", street: "Via Montebello, 1", cap: "10124", phone: "+39 011 6531300", lat: 45.0675478, lng: 7.6916466 },
  { short: "Giulia di Barolo", street: "Via Giuseppe Verdi, 26/G", cap: "10124", phone: "+39 011 6531300", lat: 45.0672689, lng: 7.695198 },
  { short: "Cappel Verde", street: "Via Cappel Verde, 5", cap: "10122", phone: "+39 011 6531430", lat: 45.0727736, lng: 7.6834449 },
  { short: "Cavour", street: "Piazza Cavour, 5", cap: "10123", phone: "+39 011 6531500", lat: 45.0624807, lng: 7.6900601 },
  { short: "Liborio", street: "Via San Domenico, 10", cap: "10122", phone: "+39 011 6531410", lat: 45.074642, lng: 7.6806063 },
  { short: "Farini", street: "Corso Farini, 32", cap: "10153", phone: "+39 011 08292500", lat: 45.0729325, lng: 7.70182 },
  { short: "Olimpia", street: "Lungo Dora Siena, 104", cap: "10153", phone: "+39 011 08292500", lat: 45.0746255, lng: 7.7021971 },
  { short: "Vanchiglia", street: "Lungo Po Machiavelli, 37", cap: "10153", phone: "+39 011 19464800", lat: 45.0669619, lng: 7.7018724 },
  { short: "Artigianelli", street: "Corso Palestro, 14", cap: "10122", phone: "+39 347 8151187", lat: 45.0736146, lng: 7.672142 },
  { short: "Alexandra", street: "Lungo Dora Napoli, 14", cap: "10152", phone: "+39 0458352732", lat: 45.082722, lng: 7.6849301 },
  { short: "Marconi", street: "Via Belfiore, 23", cap: "10100", phone: "+39 011 4363473", lat: 45.0554106, lng: 7.6789768 },
  { short: "Duca", street: "Corso Duca degli Abruzzi 48/E", cap: "10129", phone: "+39 352 000 5843", lat: 45.0588375, lng: 7.6598075 },
  { short: "Borsellino", street: "Via Paolo Borsellino, 42", cap: "10138", phone: "+39 011 4308758 / +39 011 4474001", lat: 45.066123, lng: 7.6571376 },
  { short: "Codegone", street: "Via Paolo Borsellino, 38 int.9", cap: "10138", phone: "+39 011 19743600", lat: 45.0686996, lng: 7.6590984 },
  { short: "Carlo Mollino", street: "Corso Peschiera, 90", cap: "10138", phone: "+39 011 1975200", lat: 45.0641746, lng: 7.6508246 },
  { short: "Sacchi", street: "Via Sacchi, 55", cap: "10125", phone: "", lat: 45.0559958, lng: 7.6727226 },
  { short: "Turati", street: "C.so Filippo Turati, 6", cap: "10128", phone: "+39 351 6373117", lat: 45.0546016, lng: 7.6705787 }
].map((h) => ({ ...h, query: `${h.street}, ${h.cap} Torino`, address: `${h.street}, ${h.cap} Torino` }));

function hallsNearPoint(point) {
  if (!point || point.lat == null) return [];
  return EDISU_HALLS
    .map((h) => ({ ...h, km: kmBetween(point, h) }))
    .filter((h) => h.km <= NEAR_KM)
    .sort((a, b) => a.km - b.km);
}

function edisuGroups(city, placeId) {
  if (!city || city.id !== "turin") return [];
  const ids = placeId ? [placeId, ...["albertina", "unito", "polito"].filter((id) => id !== placeId)] : ["albertina", "unito", "polito"];
  return ids.map((id) => {
    const place = (city.places || []).find((p) => p.id === id);
    if (!place) return null;
    const halls = hallsNearPoint(place);
    return halls.length ? { id, name: place.local || place.name, halls } : null;
  }).filter(Boolean);
}

function edisuMarks(city) {
  const seen = new Set();
  const marks = [];
  edisuGroups(city).forEach((group) => group.halls.forEach((h) => {
    if (seen.has(h.query)) return;
    seen.add(h.query);
    marks.push(h);
  }));
  return marks;
}

function safestAreas(city) {
  if (!city) return [];
  if (city.id === "turin") {
    return TURIN_AREAS.filter((area) => area.safety === 1).map((area) => ({
      name: area.name,
      query: area.name.startsWith("Crocetta") ? "Crocetta, Torino" : "Via Roma, Torino",
      note: area.note
    }));
  }
  if (city.center?.lat == null) return [];
  return [{
    name: city.center.label || city.name,
    query: `${city.center.lat},${city.center.lng}`,
    note: bi(
      "The busiest, best-lit part of the centre. Start here before a quieter street.",
      "Το πιο ζωντανό και φωτισμένο κομμάτι του κέντρου. Ξεκίνα από εδώ πριν από έναν πιο ήσυχο δρόμο."
    )
  }];
}

const ALBERTINA_RIDE = {
  stop: "474 Accademia Albertina",
  where: "Via Po / Via Accademia Albertina",
  query: "Fermata Accademia Albertina, Via Po, Torino",
  url: "https://www.gtt.to.it/cms/percorari/urbano?bacino=U&linea=13&palina=474&view=palina",
  lines: [
    { name: "13", toward: "Piazza Gran Madre" },
    { name: "13+", toward: "Piazza Vittorio Veneto" },
    { name: "15", toward: "Piazza Coriolano (Sassi)" }
  ]
};
const POLITO_RIDE = {
  stop: "376 Politecnico",
  where: "Corso Duca degli Abruzzi",
  query: "Fermata Politecnico, Corso Duca degli Abruzzi, Torino",
  url: "https://www.gtt.to.it/cms/percorari/urbano?bacino=U&linea=15&palina=376&view=palina",
  lines: [
    { name: "15" },
    { name: "10" },
    { name: "33" },
    { name: "58" },
    { name: "58B" },
    { name: "91" },
    { name: "W15" }
  ]
};

function campusRide(city) {
  if (!city) return null;
  const place = matchCampusPlace(state.uniName || "", city);
  const query = place?.query || state.campus?.query || "";
  if (city.id === "turin" && place && (place.id === "albertina" || place.id === "unito")) {
    return { ...ALBERTINA_RIDE, campus: place.local || place.name };
  }
  if (city.id === "turin" && place && place.id === "polito") {
    return { ...POLITO_RIDE, campus: place.local || place.name };
  }
  if (!query) return null;
  const transit = city.guide && city.guide.transit;
  return {
    stop: "",
    where: "",
    query,
    url: (transit && transit.url) || "",
    operator: (transit && transit.operator) || "",
    campus: place?.local || place?.name || state.uniName || "",
    lines: []
  };
}

function matchCampusPlace(name, city) {
  const n = (name || "").toLowerCase();
  const places = city?.places || [];
  if (!n || !places.length) return null;
  const rules = [
    [/politecnico|polito|πολυτεχν/, (p) => /politecnico|polito/.test((p.id + p.name + (p.local || "")).toLowerCase())],
    [/albertina|αλμπερτ/, (p) => /albertina/.test((p.id + p.name + (p.local || "")).toLowerCase())],
    [/universit[àa].*torino|torino.*universit|university of turin|unito|πανεπιστ[ήη]μιο.*(τορ[ίι]νο|τουρ[ίι]νο)/, (p) => p.id === "unito"]
  ];
  for (const [re, test] of rules) {
    if (re.test(n)) return places.find(test) || null;
  }
  return places.find((p) => {
    const blob = (p.name + " " + (p.local || "")).toLowerCase();
    return blob.length > 6 && (n.includes(blob) || blob.includes(n));
  }) || null;
}

async function wikiFind(q) {
  const u = new URL("https://en.wikipedia.org/w/api.php");
  const params = {
    origin: "*", format: "json", action: "query", generator: "search", gsrsearch: q, gsrlimit: "1",
    prop: "extracts|pageimages|coordinates|pageprops|info", inprop: "url", redirects: "1",
    exintro: "1", explaintext: "1", exchars: "420", piprop: "thumbnail", pithumbsize: "1000", ppprop: "wikibase_item"
  };
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  const res = await fetch(u);
  if (!res.ok) throw new Error("wiki");
  const data = await res.json();
  const page = Object.values(data.query?.pages || {})[0];
  if (!page || page.missing != null || page.pageid < 0) return null;
  return page;
}

const BAD_PIC = /logo|icon|map|flag|signature|coat|banner|\.svg|pictogram|sigil|seal|emblem/i;
function keepPhoto(url) { return !!url && !BAD_PIC.test(url); }
function wikiPageFits(page, name) {
  if (!page) return false;
  const blob = ((page.title || "") + " " + (page.extract || "")).toLowerCase();
  const asked = (name || "").toLowerCase();
  if (/albertina|αλμπερτ/.test(asked) && /firenze|florence|vienna|wien/.test(blob) && !/turin|torino/.test(blob)) return false;
  if (/albertina|αλμπερτ/.test(asked) && !/albertina|turin|torino/.test(blob)) return false;
  return true;
}

function usableText(text) {
  if (!text) return "";
  if (/may refer to|disambiguation|following is a list|^list of /i.test(text)) return "";
  return text;
}

async function wikiPictures(title) {
  const u = new URL("https://en.wikipedia.org/w/api.php");
  const params = {
    origin: "*", format: "json", action: "query", generator: "images", titles: title, gimlimit: "8",
    prop: "imageinfo", iiprop: "url", iiurlwidth: "900"
  };
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  const res = await fetch(u);
  if (!res.ok) return [];
  const data = await res.json();
  return Object.values(data.query?.pages || {})
    .map((p) => p.imageinfo && p.imageinfo[0])
    .filter((info) => info && keepPhoto(info.thumburl) && keepPhoto(info.descriptionurl || info.thumburl))
    .slice(0, 4)
    .map((info) => ({ file: info.thumburl, caption: title, credit: "Wikipedia" }));
}

function claimValue(claims, prop) {
  const snak = claims?.[prop]?.[0]?.mainsnak;
  const v = snak && snak.datavalue && snak.datavalue.value;
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (v.text) return v.text;
  if (v.latitude != null) return { lat: v.latitude, lng: v.longitude };
  return "";
}

async function wikiDataClaims(id) {
  if (!id) return {};
  const u = new URL("https://www.wikidata.org/w/api.php");
  u.searchParams.set("origin", "*");
  u.searchParams.set("format", "json");
  u.searchParams.set("action", "wbgetentities");
  u.searchParams.set("ids", id);
  u.searchParams.set("props", "claims");
  const res = await fetch(u);
  if (!res.ok) return {};
  const data = await res.json();
  return data.entities?.[id]?.claims || {};
}

function housingAreas(city, point) {
  if (city.id === "turin") {
    return TURIN_AREAS
      .map((area) => ({ ...area, km: point ? kmBetween(point, area) : null }))
      .sort((a, b) => a.safety - b.safety || (a.km ?? 99) - (b.km ?? 99));
  }
  const centre = {
    name: city.center?.label || city.name, lat: city.center?.lat, lng: city.center?.lng, safety: 1,
    km: point ? kmBetween(point, city.center) : null,
    note: bi(
      "Start with the busiest, best-lit part of the centre. A longer walk is the right trade when that street is still active in the evening.",
      "Ξεκίνα από το πιο ζωντανό και φωτισμένο κομμάτι του κέντρου. Μεγαλύτερη διαδρομή είναι η σωστή ανταλλαγή όταν ο δρόμος έχει κόσμο το βράδυ."
    )
  };
  const around = point ? {
    name: bi("Streets around the campus", "Δρόμοι γύρω από τη σχολή"),
    lat: point.lat, lng: point.lng, safety: 2, km: 0,
    note: bi(
      "Look here only after the safer area. Choose a street that still has people and light after dark, not the closest quiet door.",
      "Κοίτα εδώ μόνο αφού δεις την ασφαλέστερη περιοχή. Διάλεξε δρόμο με κόσμο και φως μετά το σούρουπο, όχι την πιο κοντινή έρημη πόρτα."
    )
  } : null;
  return [centre, around].filter(Boolean);
}

function rentLinks(country, cityName, areaName) {
  const q = `student room for rent ${areaName} ${cityName}`;
  const links = [
    { name: "Google Maps", url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` },
    { name: "Search listings", url: `https://www.google.com/search?q=${encodeURIComponent(q)}` }
  ];
  if (country === "IT") links.push(...italyPortals(cityName));
  else (PORTALS[country] || []).forEach((p) => links.push(p));
  links.push({ name: "HousingAnywhere", url: `https://housinganywhere.com/s/${encodeURIComponent(cityName)}` });
  links.push({ name: "Uniplaces", url: "https://www.uniplaces.com/" });
  return links;
}
function italyPortals(cityName) {
  const slug = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
  const known = { torino: "torino", turin: "torino", roma: "roma", rome: "roma", milano: "milano", milan: "milano", firenze: "firenze", florence: "firenze", napoli: "napoli", naples: "napoli", venezia: "venezia", venice: "venezia" };
  const path = known[slug];
  return [
    { name: "Immobiliare.it", url: path ? `https://www.immobiliare.it/affitto-case/${path}/` : "https://www.immobiliare.it/" },
    { name: "Idealista", url: path ? `https://www.idealista.it/affitto-case/${path}/` : "https://www.idealista.it/" }
  ];
}

async function gatherCampus() {
  const name = (state.uniName || "").trim();
  const faculty = (state.faculty || "").trim();
  const city = state.city;
  if (!name || !city) return null;
  const place = matchCampusPlace(name, city);
  const localPhoto = localCampusPhotos(place, city);
  let page = null;
  let facultyPage = null;
  let claims = {};
  try { page = await wikiFind(`${name} ${city.name}`); } catch { page = null; }
  if (page && !wikiPageFits(page, name)) page = null;
  if (faculty) {
    try { facultyPage = await wikiFind(`${faculty} ${name} ${city.name}`); } catch { facultyPage = null; }
  }
  try { claims = await wikiDataClaims(page?.pageprops?.wikibase_item); } catch { claims = {}; }
  const coord = claimValue(claims, "P625");
  const point = (coord && coord.lat) ? coord : (page?.coordinates?.[0] ? { lat: page.coordinates[0].lat, lng: page.coordinates[0].lon } : null);
  const fromPlace = place ? { lat: place.lat, lng: place.lng } : null;
  const here = fromPlace || point;
  let pictures = [];
  if (page?.title) {
    try { pictures = await wikiPictures(page.title); } catch { pictures = []; }
  }
  if (keepPhoto(page?.thumbnail?.source)) {
    pictures.unshift({ file: page.thumbnail.source, caption: page.title, credit: "Wikipedia" });
  }
  const seen = new Set();
  const photos = [...localPhoto, ...pictures].filter((p) => {
    if (!p.file || seen.has(p.file)) return false;
    seen.add(p.file);
    return true;
  }).slice(0, 8);
  const query = place?.query || (here ? `${here.lat},${here.lng}` : `${name}, ${city.name}`);
  const country = city.countryCode || state.countryCode || "";
  const areas = housingAreas(city, here).map((area) => ({
    ...area,
    links: rentLinks(country, city.name, typeof area.name === "string" ? area.name : (area.name.en || city.name))
  }));
  const website = claimValue(claims, "P856");
  return {
    name: place?.local || page?.title || name,
    asked: name,
    faculty,
    extract: usableText(page && wikiPageFits(page, name) ? page.extract : "") || place?.blurb || "",
    facultyExtract: usableText(facultyPage?.extract),
    website: typeof website === "string" ? website : "",
    phone: typeof claimValue(claims, "P1329") === "string" ? claimValue(claims, "P1329") : "",
    email: typeof claimValue(claims, "P968") === "string" ? claimValue(claims, "P968") : "",
    address: (typeof claimValue(claims, "P6375") === "string" && claimValue(claims, "P6375")) || "",
    photos,
    point: here,
    query,
    url: page?.fullurl || "",
    areas,
    hallGroups: edisuGroups(city, place?.id),
    residence: city.id === "turin" ? {
      name: "EDISU Piemonte",
      url: "https://www.edisu.piemonte.it/",
      note: bi(
        "EDISU Piemonte runs student residences for universities in Turin. The live list of halls is on their site, not a set of invented addresses.",
        "Το EDISU Piemonte διαχειρίζεται φοιτητικές εστίες για τα πανεπιστήμια του Τορίνο. Ο ζωντανός κατάλογος είναι στον ιστότοπό τους, όχι σε διευθύνσεις που επινοήθηκαν εδώ."
      )
    } : null,
    eventsUrl: `https://www.google.com/search?q=${encodeURIComponent(name + " events OR eventi OR agenda")}`
  };
}
