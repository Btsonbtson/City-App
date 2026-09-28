/* Public safety notes and transit desks.
   Turin is sourced from the three pages the guide was given.
   Other cities get the same shape: emergency page, then the operator's notices. */
function tx(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  return v[state.lang] || v.en || "";
}
function bi(en, el) { return { en, el }; }

const COUNTRY_SOURCES = {
  AR: { title: "Argentina.gob.ar", url: "https://www.argentina.gob.ar/" },
  AT: { title: "BMI Austria", url: "https://www.bmi.gv.at/" },
  AU: { title: "Triple Zero", url: "https://www.triplezero.gov.au/" },
  BE: { title: "Police belge", url: "https://www.police.be/" },
  BR: { title: "Polícia Federal", url: "https://www.gov.br/pf/pt-br" },
  CA: { title: "Government of Canada", url: "https://www.canada.ca/en/services/policing.html" },
  CH: { title: "ch.ch emergencies", url: "https://www.ch.ch/en/safety-and-justice/emergencies/" },
  CN: { title: "Public numbers 110 / 120 / 119", url: "https://en.wikipedia.org/wiki/Emergency_telephone_number" },
  CZ: { title: "Policie ČR", url: "https://www.policie.cz/" },
  DE: { title: "Polizei", url: "https://www.polizei.de/" },
  DK: { title: "Politi", url: "https://politi.dk/" },
  EG: { title: "Public numbers 123 / 122", url: "https://en.wikipedia.org/wiki/Emergency_telephone_number" },
  ES: { title: "Policía Nacional", url: "https://www.policia.es/" },
  FR: { title: "Police nationale", url: "https://www.police-nationale.interieur.gouv.fr/" },
  GB: { title: "Contact the police", url: "https://www.gov.uk/contact-police" },
  GR: { title: "Ελληνική Αστυνομία", url: "https://www.astynomia.gr/" },
  HR: { title: "MUP", url: "https://mup.gov.hr/" },
  HU: { title: "Police.hu", url: "https://www.police.hu/" },
  IE: { title: "Garda", url: "https://www.garda.ie/" },
  IN: { title: "Ministry of Home Affairs", url: "https://www.mha.gov.in/" },
  IT: { title: "Polizia di Stato", url: "https://www.poliziadistato.it/" },
  JP: { title: "National Police Agency", url: "https://www.npa.go.jp/english/" },
  KR: { title: "Korean National Police", url: "https://www.police.go.kr/" },
  MA: { title: "Public numbers 15 / 19", url: "https://en.wikipedia.org/wiki/Emergency_telephone_number" },
  MX: { title: "Gobierno de México", url: "https://www.gob.mx/sspc" },
  NL: { title: "Politie", url: "https://www.politie.nl/" },
  NO: { title: "Politiet", url: "https://www.politiet.no/" },
  PL: { title: "Policja", url: "https://www.policja.pl/" },
  PT: { title: "PSP", url: "https://www.psp.pt/" },
  RO: { title: "Poliția Română", url: "https://www.politiaromana.ro/" },
  SE: { title: "Polisen", url: "https://polisen.se/" },
  TH: { title: "Public numbers 1669 / 191", url: "https://en.wikipedia.org/wiki/Emergency_telephone_number" },
  TR: { title: "EGM", url: "https://www.egm.gov.tr/" },
  US: { title: "USA.gov emergency calls", url: "https://www.usa.gov/emergency-calls" }
};

const TRANSIT = {
  "buenos-aires": { operator: "Subte / Colectivos", url: "https://www.buenosaires.gob.ar/" },
  vienna: { operator: "Wiener Linien", url: "https://www.wienerlinien.at/" },
  salzburg: { operator: "Salzburg AG", url: "https://www.salzburg-ag.at/" },
  sydney: { operator: "Transport for NSW", url: "https://transportnsw.info/alerts" },
  melbourne: { operator: "PTV", url: "https://www.ptv.vic.gov.au/live-travel-updates/" },
  brussels: { operator: "STIB-MIVB", url: "https://www.stib-mivb.be/" },
  bruges: { operator: "De Lijn", url: "https://www.delijn.be/" },
  rio: { operator: "MetrôRio", url: "https://www.metrorio.com.br/" },
  "sao-paulo": { operator: "Metrô SP", url: "https://www.metro.sp.gov.br/" },
  toronto: { operator: "TTC", url: "https://www.ttc.ca/service-alerts" },
  montreal: { operator: "STM", url: "https://www.stm.info/" },
  vancouver: { operator: "TransLink", url: "https://www.translink.ca/" },
  zurich: { operator: "ZVV", url: "https://www.zvv.ch/" },
  geneva: { operator: "TPG", url: "https://www.tpg.ch/" },
  shanghai: { operator: "Shanghai Metro", url: "https://www.shmetro.com/" },
  beijing: { operator: "Beijing Subway", url: "https://www.bjsubway.com/" },
  prague: { operator: "DPP", url: "https://www.dpp.cz/" },
  berlin: { operator: "BVG", url: "https://www.bvg.de/en" },
  munich: { operator: "MVG", url: "https://www.mvg.de/" },
  hamburg: { operator: "HVV", url: "https://www.hvv.de/" },
  cologne: { operator: "KVB", url: "https://www.kvb.koeln/" },
  copenhagen: { operator: "Rejseplanen", url: "https://www.rejseplanen.dk/" },
  cairo: { operator: "Cairo Metro" },
  madrid: { operator: "Metro de Madrid", url: "https://www.metromadrid.es/" },
  barcelona: { operator: "TMB", url: "https://www.tmb.cat/" },
  seville: { operator: "TUSSAM", url: "https://www.tussam.es/" },
  valencia: { operator: "Metrovalencia", url: "https://www.metrovalencia.es/" },
  paris: { operator: "RATP", url: "https://www.ratp.fr/infos-trafic" },
  lyon: { operator: "TCL", url: "https://www.tcl.fr/" },
  marseille: { operator: "RTM", url: "https://www.rtm.fr/" },
  nice: { operator: "Lignes d'Azur", url: "https://www.lignesdazur.com/" },
  london: { operator: "TfL", url: "https://tfl.gov.uk/tube-dlr-overground/status/" },
  edinburgh: { operator: "Lothian", url: "https://www.lothianbuses.com/" },
  manchester: { operator: "TfGM", url: "https://tfgm.com/" },
  athens: { operator: "OASA", url: "https://www.oasa.gr/", more: "https://telematics.oasa.gr/" },
  thessaloniki: { operator: "OASTH", url: "https://www.oasth.gr/" },
  heraklion: { operator: "KTEL Ηρακλείου" },
  patras: { operator: "KTEL Αχαΐας" },
  zagreb: { operator: "ZET", url: "https://www.zet.hr/" },
  dubrovnik: { operator: "Libertas" },
  budapest: { operator: "BKK", url: "https://bkk.hu/" },
  dublin: { operator: "Transport for Ireland", url: "https://www.transportforireland.ie/" },
  delhi: { operator: "DMRC", url: "https://www.delhimetrorail.com/" },
  mumbai: { operator: "Mumbai Metro" },
  turin: {
    operator: "GTT",
    url: "https://www.gtt.to.it/",
    more: "https://www.muoversiatorino.it/",
    apps: "TO Move",
    notes: bi(
      "Published guides say to pay with Tap & Go or the TO Move app, and to validate the ticket. Lines 4 and 10 near Porta Nuova are the ones they name for pickpockets. Live notices stay on GTT and Muoversi Torino; this page cannot read that feed.",
      "Οι οδηγοί λένε να πληρώνεις με Tap & Go ή την εφαρμογή TO Move, και να ακυρώνεις το εισιτήριο. Οι γραμμές 4 και 10 κοντά στην Porta Nuova είναι αυτές που κατονομάζουν για πορτοφολάδες. Οι ζωντανές ανακοινώσεις μένουν στην GTT και στο Muoversi Torino· αυτή η σελίδα δεν διαβάζει εκείνη τη ροή."
    )
  },
  rome: { operator: "ATAC", url: "https://www.atac.roma.it/" },
  milan: { operator: "ATM", url: "https://www.atm.it/" },
  florence: { operator: "Autolinee Toscane", url: "https://www.at-bus.it/" },
  naples: { operator: "ANM", url: "https://www.anm.it/" },
  venice: { operator: "ACTV", url: "https://actv.avmspa.it/" },
  tokyo: { operator: "Tokyo Metro", url: "https://www.tokyometro.jp/en/" },
  kyoto: { operator: "Kyoto City Bus" },
  osaka: { operator: "Osaka Metro", url: "https://subway.osakametro.co.jp/en/" },
  seoul: { operator: "Seoul Metro", url: "https://www.seoulmetro.co.kr/" },
  marrakesh: { operator: "Alsa" },
  casablanca: { operator: "Casa Transport" },
  "mexico-city": { operator: "Metro CDMX", url: "https://www.metro.cdmx.gob.mx/" },
  cancun: { operator: "Local buses" },
  amsterdam: { operator: "GVB", url: "https://www.gvb.nl/" },
  rotterdam: { operator: "RET", url: "https://www.ret.nl/" },
  oslo: { operator: "Ruter", url: "https://ruter.no/" },
  warsaw: { operator: "ZTM Warszawa", url: "https://www.ztm.waw.pl/" },
  krakow: { operator: "MPK Kraków", url: "https://www.mpk.krakow.pl/" },
  lisbon: { operator: "Metro de Lisboa", url: "https://www.metrolisboa.pt/" },
  porto: { operator: "Metro do Porto", url: "https://www.metrodoporto.pt/" },
  bucharest: { operator: "Metrorex", url: "https://www.metrorex.ro/" },
  stockholm: { operator: "SL", url: "https://sl.se/" },
  bangkok: { operator: "BTS", url: "https://www.bts.co.th/" },
  istanbul: { operator: "Metro İstanbul", url: "https://www.metro.istanbul/" },
  ankara: { operator: "EGO", url: "https://www.ego.gov.tr/" },
  "new-york": { operator: "MTA", url: "https://new.mta.info/" },
  "los-angeles": { operator: "Metro", url: "https://www.metro.net/" },
  chicago: { operator: "CTA", url: "https://www.transitchicago.com/" },
  "san-francisco": { operator: "SFMTA", url: "https://www.sfmta.com/" }
};

const TURIN_NOTE = bi(
  "As published by About Turin. Confirm before you rely on it.",
  "Όπως το δημοσιεύει το About Turin. Επιβεβαίωσέ το πριν το βασιστείς."
);

const TURIN = {
  safety: {
    headline: bi("Useful to know", "Χρήσιμο να ξέρεις"),
    tips: [
      {
        title: bi("Bags on the tram", "Τσάντες στο τραμ"),
        body: bi(
          "The guides name crowded trams, especially lines 4 and 10 around Porta Nuova and the ride between the station and the Egyptian Museum. Zip the bag. Keep the phone off the café table.",
          "Οι οδηγοί κατονομάζουν τα γεμάτα τραμ, ιδίως τις γραμμές 4 και 10 γύρω από την Porta Nuova και τη διαδρομή από τον σταθμό προς το Αιγυπτιακό Μουσείο. Κλείσε το φερμουάρ. Το τηλέφωνο όχι πάνω στο τραπέζι του καφέ."
        )
      },
      {
        title: bi("Scooters and arcades", "Πατίνια και στοές"),
        body: bi(
          "Electric scooters pass close on the pavements around Piazza Castello and Via Roma. The arcades are the easier place to walk.",
          "Τα ηλεκτρικά πατίνια περνούν ξυστά στα πεζοδρόμια γύρω από την Piazza Castello και τη Via Roma. Οι στοές είναι το πιο άνετο μέρος για να περπατήσεις."
        )
      },
      {
        title: bi("After midnight", "Μετά τα μεσάνυχτα"),
        body: bi(
          "Stay on lit streets. Book a taxi rather than an unmarked car outside Porta Nuova late at night.",
          "Μείνε σε φωτισμένους δρόμους. Κλείσε ταξί, όχι άγνωστο αυτοκίνητο έξω από την Porta Nuova αργά τη νύχτα."
        )
      },
      {
        title: bi("Pharmacies and hospitals", "Φαρμακεία και νοσοκομεία"),
        body: bi(
          "A green cross marks a pharmacy. The on-duty list is not connected; the map searches for one. Published names for emergency departments: Mauriziano on Corso Turati, Città della Salute, and CTO on Via Zuretti. That is not a duty rota. EU visitors should carry the European Health Insurance Card.",
          "Ο πράσινος σταυρός είναι φαρμακείο. Η εφημερία δεν είναι συνδεδεμένη· ο χάρτης ψάχνει ένα. Δημοσιευμένα ονόματα επειγόντων: Mauriziano στην Corso Turati, Città della Salute, και CTO στην Via Zuretti. Δεν είναι εφημερία. Οι επισκέπτες από την ΕΕ καλό είναι να έχουν την Ευρωπαϊκή Κάρτα Ασφάλισης."
        )
      }
    ]
  },
  sources: [
    { title: "Things to do in Turin — Safety", url: "https://thingstodointurin.com/safety/" },
    { title: "Torino.in — Staying safe", url: "https://www.torino.in/turin/useful-tips/staying-safe-while-traveling-in-turin" },
    { title: "About Turin — Useful numbers", url: "https://www.aboutturin.com/en/turin-useful-numbers.html" }
  ],
  numbers: [
    { n: "011 5747", en: bi("Night and holiday medical service", "Ιατρική υπηρεσία νύχτας και αργιών"), note: TURIN_NOTE },
    { n: "011 5621606", en: bi("Pediatric emergency", "Παιδιατρικά επείγοντα"), note: TURIN_NOTE },
    { n: "011 6637637", en: bi("Anti-poison centre", "Κέντρο δηλητηριάσεων"), note: TURIN_NOTE },
    { n: "011 55881", en: bi("Police headquarters, Via Grattoni 3", "Αστυνομική διεύθυνση, Via Grattoni 3"), note: TURIN_NOTE },
    { n: "116", en: bi("ACI roadside assistance", "Οδική βοήθεια ACI"), note: TURIN_NOTE },
    { n: "011 4429246", en: bi("Lost property, Via Vigone 80, after 48 hours", "Απολεσθέντα, Via Vigone 80, μετά από 48 ώρες"), note: TURIN_NOTE },
    { n: "011 4421111", en: bi("Municipality switchboard", "Τηλεφωνικό κέντρο δήμου"), note: TURIN_NOTE }
  ]
};

function genericSafety() {
  return {
    headline: bi("Useful to know", "Χρήσιμο να ξέρεις"),
    tips: [
      {
        title: bi("The number to save", "Το νούμερο που κρατάς"),
        body: bi(
          "Save the emergency number on Help. It is free from any phone. Extra local numbers, where we have them, stay labelled with their source.",
          "Κράτα το νούμερο ανάγκης στο SOS. Είναι δωρεάν από οποιοδήποτε τηλέφωνο. Τα τοπικά νούμερα, όπου υπάρχουν, μένουν με την πηγή τους."
        )
      },
      {
        title: bi("Crowded transport", "Συνωστισμός"),
        body: bi(
          "On busy trams, metros and stations, keep the bag zipped and the phone in a pocket. The notices for today's delays are on the operator's own site.",
          "Σε γεμάτα τραμ, μετρό και σταθμούς, κλείσε το φερμουάρ και κράτα το τηλέφωνο στην τσέπη. Οι ανακοινώσεις για σημερινές καθυστερήσεις είναι στον ιστότοπο του φορέα."
        )
      }
    ]
  };
}

function applyGuide(city, code) {
  if (!city || city.guide) return;
  const src = COUNTRY_SOURCES[code];
  const local = city.id === "turin" ? TURIN : null;
  const transit = TRANSIT[city.id] || null;
  city.guide = {
    safety: local ? local.safety : genericSafety(),
    sources: local ? local.sources : (src ? [src] : []),
    transit
  };
  if (local && city.emergency) {
    const have = new Set(
      [city.emergency.primary?.n, ...(city.emergency.others || []).map((n) => n.n)]
        .filter(Boolean)
        .map((n) => String(n).replace(/\s/g, ""))
    );
    local.numbers.forEach((n) => {
      const key = String(n.n).replace(/\s/g, "");
      if (have.has(key)) return;
      have.add(key);
      city.emergency.others.push({ n: n.n, en: n.en, note: n.note });
    });
  }
  city.countryCode = city.countryCode || code || "";
}
