/* Opening flow: name, language, country, then a city.
   A city with a folder (Torino) keeps that folder and only adds new web finds. */
const LANGS = [["en", "English"], ["el", "Ελληνικά"], ["it", "Italiano"], ["fr", "Français"], ["es", "Español"], ["de", "Deutsch"]];
const I18N = {
  en: {
    welcome: "Welcome", askName: "What should we call you?", namePh: "Your name", continue: "Continue",
    hello: "Hello, {name}", pickCountry: "Choose a country", pickCity: "Then choose a city",
    cityHint: "No city is open yet. Pick a country and its cities will appear.",
    searchCountry: "Search countries", gathering: "Gathering {city}…", couldntOpen: "That city could not be opened.",
    changeName: "Not you? Change name", today: "Today", places: "Places", map: "Map", words: "Words", you: "You",
    pharmacies: "Pharmacies", onDuty: "On duty", sample: "Sample rota", findPharmacy: "Find one on the map", seeOpen: "See who's open",
    aRoute: "A route", onFoot: "Go on foot", pictures: "Photographs",
    folderPics: "{n} photographs. Everything already in this city's folder is included.",
    webPics: "{n} photographs gathered from Wikipedia for this city.",
    phraseDay: "Phrase of the day", listen: "Listen", show: "Show", save: "Save", saved: "Saved", removed: "Removed",
    close: "Close", liveMaps: "Live Google Maps", openMaps: "Open in Google Maps",
    walk: "Walk", transit: "Transit", drive: "Drive", fromCentre: "From {place}", fromYou: "From you",
    startFromMe: "Start from my location", startingFromYou: "Starting from you",
    helpNow: "Help now", otherNumbers: "Other numbers", hospitals: "Hospitals", sayIt: "Say it",
    showAddress: "Show my address", home: "Home", university: "University", whereStudy: "Where you study",
    savedPlaces: "Saved places", nothingSaved: "Nothing saved yet.", firstDays: "First days",
    routeHome: "Route home on the map", addAddress: "Add your address first", usingCentre: "Using the city centre",
    phraseGap: "A local should check this before you rely on it.", publicNumbers: "Public numbers",
    wordsLead: "Show the screen to someone.", yourCity: "Your {city}", stays: "Saved on this phone.",
    chooseCountry: "Choose a country", folderTag: "Photo folder",
    uni: "School", myUni: "My university", uniAsk: "Your university", uniPh: "University name",
    facultyAsk: "Faculty, if there is one", facultyPh: "Faculty or school, if you have one",
    uniGathering: "Gathering the university…", uniMissing: "Add the university name to open this chapter.",
    programs: "Programs", events: "Events", contacts: "Contacts", residences: "Student residences",
    rentAreas: "Where to look for a room", safetyFirst: "Safety of the area comes before how close, how cheap, or how new the listing is.",
    exampleSearch: "Example search, not a live advert", showOnMap: "Mark it on the map",
    website: "Website", phone: "Phone", address: "Address", email: "Email",
    noEvents: "There is no live events list here. Open the university calendar.",
    coursesOnSite: "Courses on the university site", openCalendar: "Search events",
    noResidence: "No student-residence list is connected for this city. Check the university site, then the search below.",
    residenceSearch: "Search student residences",
    edisuNear: "EDISU residences near {name}",
    edisuNote: "Addresses published by EDISU Piemonte. The pin is the building, not a free bed. Places are being updated for 2026/27.",
    hallKm: "About {km} km from this university.",
    safestTitle: "Safest areas",
    rideTitle: "Transit to the university",
    rideNote: "These are the lines GTT lists at this stop. The map opens a transit route from the centre. Today's diversions stay on the GTT page.",
    rideGeneric: "Transit from the centre to the university. Line numbers stay on the operator's site.",
    toward: "Toward {place}",
    lifeTitle: "Food, art and night",
    lifeLead: "Places with a published address are on the map. Calendars and ticket prices stay on the linked sites.",
    costTitle: "Indicative cost of living",
    costLead: "Figures from the sources below, for orientation. They are not a rent quote. When you look for a room, the safety of the area still comes first.",
    placesLead: "Tap a card for the story and a live route.",
    filter_all: "All", filter_sights: "Sights", filter_museums: "Museums", filter_squares: "Squares",
    filter_parks: "Parks", filter_cafes: "Cafés", filter_galleries: "Galleries", filter_night: "Night",
    filter_study: "Study", filter_streets: "Streets",
    aboutKm: "About {km} km from the campus. Distance comes after safety.",
    contactsGap: "No phone, address or email came back from Wikidata. Use the university site before you rely on a number.",
    transitTo: "Transit from the city centre",
    safetyTitle: "Useful to know", transitTitle: "Transit notices", openNotices: "Open live notices",
    transitUnread: "The live feed is on the operator's site. This page cannot read it from the browser.",
    sources: "Sources", onThisPhone: "On this phone", offlineLead: "Saves this city's text, and the photographs that already live in its folder. Pictures gathered from the web still need a connection.",
    saveOffline: "Download for offline", savedOffline: "Saved on this phone", yourFolder: "Your city folder",
    addFolder: "Add a city folder", folderLead: "Choose a folder that contains city.json and, if you have them, photographs.",
    cityLooking: "Looking up the city of your university…",
    uniCityTag: "Your university",
    uniCityOther: "In {country}",
    addCity: "Add a city that is not in the list",
    addCityPh: "City name",
    addCityGo: "Add this city",
    folderNeedsJson: "That folder needs a city.json file.", folderBadJson: "city.json could not be read.",
    folderNeedsName: "city.json needs a name.", folderAdded: "Folder added", yourFolderTag: "Your folder"
  },
  el: {
    welcome: "Καλώς ήρθες", askName: "Πώς να σε φωνάζουμε;", namePh: "Το όνομά σου", continue: "Συνέχεια",
    hello: "Γεια σου, {name}", pickCountry: "Διάλεξε χώρα", pickCity: "Μετά διάλεξε πόλη",
    cityHint: "Καμία πόλη δεν είναι ανοιχτή ακόμη. Διάλεξε χώρα και θα εμφανιστούν οι πόλεις της.",
    searchCountry: "Αναζήτηση χώρας", gathering: "Μαζεύω την πόλη {city}…", couldntOpen: "Η πόλη δεν άνοιξε.",
    changeName: "Δεν είσαι εσύ; Άλλαξε όνομα", today: "Σήμερα", places: "Μέρη", map: "Χάρτης", words: "Λέξεις", you: "Εσύ",
    pharmacies: "Φαρμακεία", onDuty: "Εφημερία", sample: "Δείγμα εφημερίας", findPharmacy: "Βρες ένα στον χάρτη", seeOpen: "Δες ποια είναι ανοιχτά",
    aRoute: "Μια διαδρομή", onFoot: "Με τα πόδια", pictures: "Φωτογραφίες",
    folderPics: "{n} φωτογραφίες. Όσες είναι ήδη στον φάκελο της πόλης περιλαμβάνονται.",
    webPics: "{n} φωτογραφίες από τη Wikipedia για αυτή την πόλη.",
    phraseDay: "Φράση της ημέρας", listen: "Άκου", show: "Δείξε", save: "Αποθήκευση", saved: "Αποθηκεύτηκε", removed: "Αφαιρέθηκε",
    close: "Κλείσιμο", liveMaps: "Ζωντανοί χάρτες Google", openMaps: "Άνοιγμα στο Google Maps",
    walk: "Περπάτημα", transit: "Συγκοινωνία", drive: "Οδήγηση", fromCentre: "Από {place}", fromYou: "Από σένα",
    startFromMe: "Ξεκίνα από τη θέση μου", startingFromYou: "Ξεκινά από σένα",
    helpNow: "Βοήθεια τώρα", otherNumbers: "Άλλα νούμερα", hospitals: "Νοσοκομεία", sayIt: "Πες το",
    showAddress: "Δείξε τη διεύθυνσή μου", home: "Σπίτι", university: "Πανεπιστήμιο", whereStudy: "Πού σπουδάζεις",
    savedPlaces: "Αποθηκευμένα μέρη", nothingSaved: "Τίποτα αποθηκευμένο ακόμη.", firstDays: "Πρώτες μέρες",
    routeHome: "Διαδρομή για το σπίτι", addAddress: "Πρόσθεσε πρώτα τη διεύθυνσή σου", usingCentre: "Χρησιμοποιείται το κέντρο",
    phraseGap: "Καλό είναι να το ελέγξει κάποιος ντόπιος.", publicNumbers: "Δημόσια νούμερα",
    wordsLead: "Δείξε την οθόνη σε κάποιον.", yourCity: "Η {city} σου", stays: "Μένουν σε αυτό το τηλέφωνο.",
    chooseCountry: "Διάλεξε χώρα", folderTag: "Φάκελος φωτογραφιών",
    uni: "Σχολή", myUni: "Το Πανεπιστήμιο μου", uniAsk: "Το πανεπιστήμιό σου", uniPh: "Όνομα πανεπιστημίου",
    facultyAsk: "Σχολή, αν υπάρχει", facultyPh: "Σχολή ή τμήμα, αν έχεις",
    uniGathering: "Μαζεύω το πανεπιστήμιο…", uniMissing: "Γράψε το όνομα του πανεπιστημίου για να ανοίξει αυτό το κεφάλαιο.",
    programs: "Προγράμματα", events: "Εκδηλώσεις", contacts: "Επικοινωνία", residences: "Φοιτητικές εστίες",
    rentAreas: "Πού να ψάξεις δωμάτιο", safetyFirst: "Η ασφάλεια της περιοχής έρχεται πριν από το πόσο κοντά, φθηνά ή καινούργια είναι η αγγελία.",
    exampleSearch: "Παράδειγμα αναζήτησης, όχι ζωντανή αγγελία", showOnMap: "Σημείωσέ το στον χάρτη",
    website: "Ιστότοπος", phone: "Τηλέφωνο", address: "Διεύθυνση", email: "Email",
    noEvents: "Δεν υπάρχει εδώ ζωντανή λίστα εκδηλώσεων. Άνοιξε το ημερολόγιο του ιδρύματος.",
    coursesOnSite: "Προγράμματα στον ιστότοπο του ιδρύματος", openCalendar: "Αναζήτηση εκδηλώσεων",
    noResidence: "Δεν είναι συνδεδεμένη λίστα εστιών για αυτή την πόλη. Κοίτα τον ιστότοπο του ιδρύματος και μετά την αναζήτηση.",
    residenceSearch: "Αναζήτηση φοιτητικών εστιών",
    edisuNear: "Εστίες EDISU κοντά στο {name}",
    edisuNote: "Διευθύνσεις όπως τις δημοσιεύει το EDISU Piemonte. Η πινέζα είναι το κτίριο, όχι ελεύθερο κρεβάτι. Οι θέσεις ενημερώνονται για το 2026/27.",
    hallKm: "Περίπου {km} χλμ από αυτό το πανεπιστήμιο.",
    safestTitle: "Ασφαλέστερες περιοχές",
    rideTitle: "Συγκοινωνία ως τη σχολή",
    rideNote: "Αυτές είναι οι γραμμές που η GTT δείχνει σε αυτή τη στάση. Ο χάρτης ανοίγει διαδρομή με μέσα από το κέντρο. Οι σημερινές παρακάμψεις μένουν στη σελίδα της GTT.",
    rideGeneric: "Διαδρομή με μέσα από το κέντρο ως τη σχολή. Οι αριθμοί γραμμών μένουν στον ιστότοπο του φορέα.",
    toward: "Προς {place}",
    lifeTitle: "Φαγητό, τέχνη και νύχτα",
    lifeLead: "Τα μέρη με δημοσιευμένη διεύθυνση είναι στον χάρτη. Ημερολόγια και τιμές εισιτηρίων μένουν στους συνδέσμους.",
    costTitle: "Ενδεικτικό κόστος ζωής",
    costLead: "Νούμερα από τις πηγές πιο κάτω, για προσανατολισμό. Δεν είναι προσφορά ενοικίου. Όταν ψάχνεις δωμάτιο, η ασφάλεια της περιοχής έρχεται πρώτη.",
    placesLead: "Πάτα μια κάρτα για την ιστορία και μια ζωντανή διαδρομή.",
    filter_all: "Όλα", filter_sights: "Αξιοθέατα", filter_museums: "Μουσεία", filter_squares: "Πλατείες",
    filter_parks: "Πάρκα", filter_cafes: "Καφέ", filter_galleries: "Γκαλερί", filter_night: "Νύχτα",
    filter_study: "Σπουδές", filter_streets: "Δρόμοι",
    aboutKm: "Περίπου {km} χλμ από τη σχολή. Η απόσταση έρχεται μετά την ασφάλεια.",
    contactsGap: "Δεν ήρθαν τηλέφωνο, διεύθυνση ή email από τα Wikidata. Χρησιμοποίησε τον ιστότοπο του ιδρύματος πριν βασιστείς σε αριθμό.",
    transitTo: "Συγκοινωνία από το κέντρο",
    safetyTitle: "Χρήσιμο να ξέρεις", transitTitle: "Ειδοποιήσεις συγκοινωνιών", openNotices: "Άνοιγμα ζωντανών ανακοινώσεων",
    transitUnread: "Η ζωντανή ροή είναι στον ιστότοπο του φορέα. Αυτή η σελίδα δεν τη διαβάζει από τον browser.",
    sources: "Πηγές", onThisPhone: "Σε αυτό το τηλέφωνο", offlineLead: "Αποθηκεύει το κείμενο της πόλης και τις φωτογραφίες που είναι ήδη στον φάκελό της. Όσες μαζεύτηκαν από τον ιστό θέλουν σύνδεση.",
    saveOffline: "Λήψη για χωρίς δίκτυο", savedOffline: "Αποθηκεύτηκε σε αυτό το τηλέφωνο", yourFolder: "Ο δικός σου φάκελος",
    addFolder: "Πρόσθεσε φάκελο πόλης", folderLead: "Διάλεξε έναν φάκελο που έχει city.json και, αν έχεις, φωτογραφίες.",
    cityLooking: "Ψάχνω την πόλη του πανεπιστημίου…",
    uniCityTag: "Το πανεπιστήμιό σου",
    uniCityOther: "{country}",
    addCity: "Πρόσθεσε πόλη που δεν είναι στη λίστα",
    addCityPh: "Όνομα πόλης",
    addCityGo: "Πρόσθεσε την πόλη",
    folderNeedsJson: "Ο φάκελος χρειάζεται αρχείο city.json.", folderBadJson: "Το city.json δεν διαβάστηκε.",
    folderNeedsName: "Το city.json χρειάζεται όνομα.", folderAdded: "Ο φάκελος προστέθηκε", yourFolderTag: "Ο φάκελός σου"
  },
  it: {
    welcome: "Benvenuto", askName: "Come ti chiamiamo?", namePh: "Il tuo nome", continue: "Continua",
    hello: "Ciao, {name}", pickCountry: "Scegli un paese", pickCity: "Poi scegli una città",
    cityHint: "Nessuna città è aperta. Scegli un paese e compariranno le sue città.",
    searchCountry: "Cerca un paese", gathering: "Raccolgo {city}…", couldntOpen: "Non sono riuscito ad aprire la città.",
    changeName: "Non sei tu? Cambia nome", today: "Oggi", places: "Luoghi", map: "Mappa", words: "Parole", you: "Tu",
    pharmacies: "Farmacie", onDuty: "Di turno", sample: "Turno di esempio", findPharmacy: "Trovane una sulla mappa", seeOpen: "Vedi chi è aperto",
    aRoute: "Un percorso", onFoot: "A piedi", pictures: "Fotografie",
    folderPics: "{n} fotografie. Quelle già nella cartella della città sono incluse.",
    webPics: "{n} fotografie raccolte da Wikipedia per questa città.",
    phraseDay: "Frase del giorno", listen: "Ascolta", show: "Mostra", save: "Salva", saved: "Salvato", removed: "Rimosso",
    close: "Chiudi", liveMaps: "Google Maps dal vivo", openMaps: "Apri in Google Maps",
    walk: "A piedi", transit: "Mezzi", drive: "Auto", fromCentre: "Da {place}", fromYou: "Da te",
    startFromMe: "Parti dalla mia posizione", startingFromYou: "Si parte da te",
    helpNow: "Aiuto ora", otherNumbers: "Altri numeri", hospitals: "Ospedali", sayIt: "Dillo",
    showAddress: "Mostra il mio indirizzo", home: "Casa", university: "Università", whereStudy: "Dove studi",
    savedPlaces: "Luoghi salvati", nothingSaved: "Niente di salvato.", firstDays: "Primi giorni",
    routeHome: "Percorso verso casa", addAddress: "Aggiungi prima l'indirizzo", usingCentre: "Uso il centro città",
    phraseGap: "Fallo controllare da una persona del posto.", publicNumbers: "Numeri pubblici",
    wordsLead: "Mostra lo schermo a qualcuno.", yourCity: "La tua {city}", stays: "Restano su questo telefono.",
    chooseCountry: "Scegli un paese"
  },
  fr: {
    welcome: "Bienvenue", askName: "Comment vous appeler ?", namePh: "Votre nom", continue: "Continuer",
    hello: "Bonjour, {name}", pickCountry: "Choisissez un pays", pickCity: "Puis une ville",
    cityHint: "Aucune ville n'est ouverte. Choisissez un pays pour voir ses villes.",
    searchCountry: "Chercher un pays", gathering: "Je rassemble {city}…", couldntOpen: "Impossible d'ouvrir cette ville.",
    changeName: "Ce n'est pas vous ? Changer le nom", today: "Aujourd'hui", places: "Lieux", map: "Carte", words: "Mots", you: "Vous",
    pharmacies: "Pharmacies", onDuty: "De garde", sample: "Garde d'exemple", findPharmacy: "En trouver une sur la carte", seeOpen: "Voir qui est ouvert",
    aRoute: "Un itinéraire", onFoot: "À pied", pictures: "Photographies",
    folderPics: "{n} photographies. Celles déjà dans le dossier de la ville sont incluses.",
    webPics: "{n} photographies réunies depuis Wikipédia.",
    phraseDay: "Phrase du jour", listen: "Écouter", show: "Montrer", save: "Enregistrer", saved: "Enregistré", removed: "Retiré",
    close: "Fermer", liveMaps: "Google Maps en direct", openMaps: "Ouvrir dans Google Maps",
    walk: "À pied", transit: "Transports", drive: "Voiture", fromCentre: "Depuis {place}", fromYou: "Depuis vous",
    startFromMe: "Partir de ma position", startingFromYou: "Départ depuis vous",
    helpNow: "Aide maintenant", otherNumbers: "Autres numéros", hospitals: "Hôpitaux", sayIt: "Dites-le",
    showAddress: "Montrer mon adresse", home: "Domicile", university: "Université", whereStudy: "Où vous étudiez",
    savedPlaces: "Lieux enregistrés", nothingSaved: "Rien d'enregistré.", firstDays: "Premiers jours",
    routeHome: "Itinéraire vers chez vous", addAddress: "Ajoutez d'abord l'adresse", usingCentre: "Depuis le centre",
    phraseGap: "Faites vérifier par quelqu'un du pays.", publicNumbers: "Numéros publics",
    wordsLead: "Montrez l'écran à quelqu'un.", yourCity: "Votre {city}", stays: "Restent sur ce téléphone.",
    chooseCountry: "Choisir un pays"
  },
  es: {
    welcome: "Bienvenida", askName: "¿Cómo te llamamos?", namePh: "Tu nombre", continue: "Seguir",
    hello: "Hola, {name}", pickCountry: "Elige un país", pickCity: "Luego elige una ciudad",
    cityHint: "Ninguna ciudad está abierta. Elige un país y aparecerán sus ciudades.",
    searchCountry: "Buscar país", gathering: "Reuniendo {city}…", couldntOpen: "No se pudo abrir la ciudad.",
    changeName: "¿No eres tú? Cambia el nombre", today: "Hoy", places: "Lugares", map: "Mapa", words: "Palabras", you: "Tú",
    pharmacies: "Farmacias", onDuty: "De guardia", sample: "Turno de muestra", findPharmacy: "Buscar una en el mapa", seeOpen: "Ver cuáles están abiertas",
    aRoute: "Una ruta", onFoot: "A pie", pictures: "Fotografías",
    folderPics: "{n} fotografías. Las que ya están en la carpeta de la ciudad se incluyen.",
    webPics: "{n} fotografías reunidas de Wikipedia.",
    phraseDay: "Frase del día", listen: "Escuchar", show: "Mostrar", save: "Guardar", saved: "Guardado", removed: "Quitado",
    close: "Cerrar", liveMaps: "Google Maps en vivo", openMaps: "Abrir en Google Maps",
    walk: "A pie", transit: "Transporte", drive: "Coche", fromCentre: "Desde {place}", fromYou: "Desde ti",
    startFromMe: "Empezar desde mi ubicación", startingFromYou: "Empieza desde ti",
    helpNow: "Ayuda ahora", otherNumbers: "Otros números", hospitals: "Hospitales", sayIt: "Dilo",
    showAddress: "Mostrar mi dirección", home: "Casa", university: "Universidad", whereStudy: "Dónde estudias",
    savedPlaces: "Lugares guardados", nothingSaved: "Nada guardado todavía.", firstDays: "Primeros días",
    routeHome: "Ruta a casa", addAddress: "Añade primero tu dirección", usingCentre: "Usando el centro",
    phraseGap: "Conviene que lo revise alguien del lugar.", publicNumbers: "Números públicos",
    wordsLead: "Enséñale la pantalla a alguien.", yourCity: "Tu {city}", stays: "Se quedan en este teléfono.",
    chooseCountry: "Elegir un país"
  },
  de: {
    welcome: "Willkommen", askName: "Wie sollen wir dich nennen?", namePh: "Dein Name", continue: "Weiter",
    hello: "Hallo, {name}", pickCountry: "Wähle ein Land", pickCity: "Dann wähle eine Stadt",
    cityHint: "Noch keine Stadt geöffnet. Wähle ein Land, dann erscheinen seine Städte.",
    searchCountry: "Land suchen", gathering: "Ich sammle {city}…", couldntOpen: "Die Stadt ließ sich nicht öffnen.",
    changeName: "Nicht du? Namen ändern", today: "Heute", places: "Orte", map: "Karte", words: "Wörter", you: "Du",
    pharmacies: "Apotheken", onDuty: "Notdienst", sample: "Beispieldienst", findPharmacy: "Eine auf der Karte finden", seeOpen: "Sehen, wer offen hat",
    aRoute: "Eine Route", onFoot: "Zu Fuß", pictures: "Fotos",
    folderPics: "{n} Fotos. Was schon im Ordner der Stadt liegt, ist dabei.",
    webPics: "{n} Fotos, von Wikipedia für diese Stadt gesammelt.",
    phraseDay: "Satz des Tages", listen: "Anhören", show: "Zeigen", save: "Sichern", saved: "Gesichert", removed: "Entfernt",
    close: "Schließen", liveMaps: "Live Google Maps", openMaps: "In Google Maps öffnen",
    walk: "Zu Fuß", transit: "ÖPNV", drive: "Auto", fromCentre: "Ab {place}", fromYou: "Von dir",
    startFromMe: "Von meinem Standort starten", startingFromYou: "Start bei dir",
    helpNow: "Hilfe jetzt", otherNumbers: "Weitere Nummern", hospitals: "Krankenhäuser", sayIt: "Sag es",
    showAddress: "Meine Adresse zeigen", home: "Zuhause", university: "Universität", whereStudy: "Wo du studierst",
    savedPlaces: "Gesicherte Orte", nothingSaved: "Noch nichts gesichert.", firstDays: "Erste Tage",
    routeHome: "Route nach Hause", addAddress: "Zuerst die Adresse eintragen", usingCentre: "Ab der Stadtmitte",
    phraseGap: "Lass das von jemandem vor Ort prüfen.", publicNumbers: "Öffentliche Nummern",
    wordsLead: "Zeig jemandem den Bildschirm.", yourCity: "Dein {city}", stays: "Bleibt auf diesem Telefon.",
    chooseCountry: "Land wählen"
  }
};

const GLOSS = {
  help: { en: "Help!", el: "Βοήθεια!", it: "Aiuto!", fr: "Au secours !", es: "¡Ayuda!", de: "Hilfe!" },
  ambulance: { en: "Please call an ambulance", el: "Καλέστε ασθενοφόρο", it: "Chiami un'ambulanza", fr: "Appelez une ambulance", es: "Llame a una ambulancia", de: "Rufen Sie einen Krankenwagen" },
  doctor: { en: "I need a doctor", el: "Χρειάζομαι γιατρό", it: "Ho bisogno di un medico", fr: "J'ai besoin d'un médecin", es: "Necesito un médico", de: "Ich brauche einen Arzt" },
  pharmacy: { en: "Where is the nearest pharmacy?", el: "Πού είναι το κοντινότερο φαρμακείο;", it: "Dov'è la farmacia più vicina?", fr: "Où est la pharmacie la plus proche ?", es: "¿Dónde está la farmacia más cercana?", de: "Wo ist die nächste Apotheke?" },
  thanks: { en: "Thank you", el: "Ευχαριστώ", it: "Grazie", fr: "Merci", es: "Gracias", de: "Danke" },
  hello: { en: "Hello", el: "Γεια σας", it: "Buongiorno", fr: "Bonjour", es: "Hola", de: "Guten Tag" },
  water: { en: "Water, please", el: "Νερό, παρακαλώ", it: "Acqua, per favore", fr: "De l'eau, s'il vous plaît", es: "Agua, por favor", de: "Wasser, bitte" },
  bill: { en: "The bill, please", el: "Τον λογαριασμό, παρακαλώ", it: "Il conto, per favore", fr: "L'addition, s'il vous plaît", es: "La cuenta, por favor", de: "Die Rechnung, bitte" },
  dont: { en: "I don't speak the language", el: "Δεν μιλάω τη γλώσσα", it: "Non parlo la lingua", fr: "Je ne parle pas la langue", es: "No hablo el idioma", de: "Ich spreche die Sprache nicht" },
  cost: { en: "How much is it?", el: "Πόσο κάνει;", it: "Quanto costa?", fr: "C'est combien ?", es: "¿Cuánto cuesta?", de: "Wie viel kostet das?" }
};
const LOCAL = {
  it: { help: ["Aiuto!", "ah-YOO-toh"], ambulance: ["Chiami un'ambulanza, per favore.", "KYAH-mee oon am-boo-LAHN-tsa"], doctor: ["Ho bisogno di un medico.", "oh bee-ZOH-nyo dee oon MEH-dee-ko"], pharmacy: ["Dov'è la farmacia più vicina?", "doh-VEH la far-ma-CHEE-ah"], thanks: ["Grazie", "GRAH-tsyeh"], hello: ["Buongiorno", "bwon-JOR-no"], water: ["Un bicchiere d'acqua, per favore.", "oon bee-KYEH-reh DAH-kwa"], bill: ["Il conto, per favore.", "eel KON-to"], dont: ["Non parlo italiano.", "non PAR-lo ee-tah-LYAH-no"], cost: ["Quanto costa?", "KWAHN-to KOH-sta"] },
  el: { help: ["Βοήθεια!", "Voíthia"], ambulance: ["Καλέστε ασθενοφόρο, παρακαλώ.", "Kaléste asthenofóro"], doctor: ["Χρειάζομαι γιατρό.", "Chriázome yatró"], pharmacy: ["Πού είναι το πλησιέστερο φαρμακείο;", "Pou íne to plisiéstero farmakío"], thanks: ["Ευχαριστώ", "Efcharistó"], hello: ["Γεια σας", "Ya sas"], water: ["Νερό, παρακαλώ.", "Neró, parakaló"], bill: ["Τον λογαριασμό, παρακαλώ.", "Ton logariasmó"], dont: ["Δεν μιλάω ελληνικά.", "Den miláo elliniká"], cost: ["Πόσο κάνει;", "Póso káni"] },
  fr: { help: ["Au secours !", "oh suh-KOOR"], ambulance: ["Appelez une ambulance, s'il vous plaît.", "ah-play zoon am-boo-LAWNS"], doctor: ["J'ai besoin d'un médecin.", "zhay buh-ZWAN dun may-SAN"], pharmacy: ["Où est la pharmacie la plus proche ?", "oo eh la far-mah-SEE"], thanks: ["Merci", "mair-SEE"], hello: ["Bonjour", "bon-ZHOOR"], water: ["De l'eau, s'il vous plaît.", "duh LOH"], bill: ["L'addition, s'il vous plaît.", "la-dee-SYON"], dont: ["Je ne parle pas français.", "zhuh nuh parl pah frahn-SEH"], cost: ["C'est combien ?", "seh kom-BYAN"] },
  es: { help: ["¡Ayuda!", "ah-YOO-dah"], ambulance: ["Llame a una ambulancia, por favor.", "YAH-meh ah OO-nah am-boo-LAHN-syah"], doctor: ["Necesito un médico.", "neh-seh-SEE-toh oon MEH-dee-ko"], pharmacy: ["¿Dónde está la farmacia más cercana?", "DON-deh es-TAH la far-MAH-syah"], thanks: ["Gracias", "GRAH-syahs"], hello: ["Hola", "OH-lah"], water: ["Agua, por favor.", "AH-gwah"], bill: ["La cuenta, por favor.", "la KWEN-tah"], dont: ["No hablo español.", "no AH-bloh es-pah-NYOL"], cost: ["¿Cuánto cuesta?", "KWAN-toh KWES-tah"] },
  de: { help: ["Hilfe!", "HIL-fuh"], ambulance: ["Rufen Sie bitte einen Krankenwagen.", "ROO-fen zee BIH-tuh I-nen KRAN-ken-vah-gen"], doctor: ["Ich brauche einen Arzt.", "ich BROW-khuh I-nen artst"], pharmacy: ["Wo ist die nächste Apotheke?", "voh ist dee NEKH-stuh ah-poh-TEH-kuh"], thanks: ["Danke", "DAHN-kuh"], hello: ["Guten Tag", "GOO-ten tahk"], water: ["Wasser, bitte.", "VAH-ser BIH-tuh"], bill: ["Die Rechnung, bitte.", "dee REKH-noong"], dont: ["Ich spreche kein Deutsch.", "ich SHPREH-khuh kine doytch"], cost: ["Wie viel kostet das?", "vee feel KOS-tet dahs"] },
  pt: { help: ["Socorro!", "soo-KOH-roo"], ambulance: ["Chame uma ambulância, por favor.", "SHAH-meh OO-mah am-boo-LAHN-syah"], doctor: ["Preciso de um médico.", "preh-SEE-zoo deh oom MEH-dee-koo"], pharmacy: ["Onde fica a farmácia mais próxima?", "ON-deh FEE-kah ah far-MAH-syah"], thanks: ["Obrigado", "oh-bree-GAH-doo"], hello: ["Bom dia", "bom DEE-ah"], water: ["Água, por favor.", "AH-gwah"], bill: ["A conta, por favor.", "ah KON-tah"], dont: ["Não falo português.", "now FAH-loo por-too-GEZH"], cost: ["Quanto custa?", "KWAN-too KOOSH-tah"] },
  ja: { help: ["助けて！", "tah-skeh-teh"], ambulance: ["救急車を呼んでください。", "kyoo-kyoo-shah oh yon-deh koo-dah-sigh"], doctor: ["医者が必要です。", "ee-shah gah hee-tsoo-yoh dess"], pharmacy: ["一番近い薬局はどこですか？", "ee-chee-bahn chee-kai yah-kyoh-koo wah doh-koh dess kah"], thanks: ["ありがとうございます", "ah-ree-gah-toh goh-zai-mass"], hello: ["こんにちは", "kon-nee-chee-wah"], water: ["水をください。", "mee-zoo oh koo-dah-sigh"], bill: ["お会計をお願いします。", "oh-kai-keh oh oh-neh-gai shee-mass"], dont: ["日本語が話せません。", "nee-hon-go gah hah-nah-seh-mah-sen"], cost: ["いくらですか？", "ee-koo-rah dess kah"] },
  tr: { help: ["İmdat!", "im-DAHT"], ambulance: ["Ambulans çağırın, lütfen.", "am-boo-LAHNS chah-uh-run"], doctor: ["Bir doktora ihtiyacım var.", "beer dok-TOR-ah ee-tee-YAH-jum var"], pharmacy: ["En yakın eczane nerede?", "en yah-KUN ej-ZAH-neh neh-reh-DEH"], thanks: ["Teşekkürler", "teh-shek-kur-LEHR"], hello: ["Merhaba", "mer-hah-BAH"], water: ["Su, lütfen.", "soo loot-FEN"], bill: ["Hesap, lütfen.", "heh-SAHP"], dont: ["Türkçe bilmiyorum.", "turk-CHEH bil-mee-yo-rum"], cost: ["Ne kadar?", "neh kah-DAR"] },
  en: { help: ["Help!", "help"], ambulance: ["Please call an ambulance.", "please call an ambulance"], doctor: ["I need a doctor.", "I need a doctor"], pharmacy: ["Where is the nearest pharmacy?", "where is the nearest pharmacy"], thanks: ["Thank you", "thank you"], hello: ["Hello", "hello"], water: ["Water, please.", "water please"], bill: ["The bill, please.", "the bill please"], dont: ["I don't speak the language well.", "I don't speak the language well"], cost: ["How much is it?", "how much is it"] }
};
const PHRASE_CAT = { help: "help", ambulance: "help", doctor: "help", pharmacy: "help", hello: "everyday", thanks: "everyday", dont: "everyday", water: "food", bill: "food", cost: "food" };
const SPEAK = { it: "it-IT", el: "el-GR", fr: "fr-FR", es: "es-ES", de: "de-DE", pt: "pt-PT", ja: "ja-JP", tr: "tr-TR", en: "en-GB" };
const EMERGENCY = {
  IT: { primary: ["112", "Any emergency"], others: [["118", "Ambulance"], ["113", "Police"], ["115", "Fire"]] },
  GR: { primary: ["112", "Any emergency"], others: [["166", "Ambulance"], ["100", "Police"], ["199", "Fire"]] },
  FR: { primary: ["112", "Any emergency"], others: [["15", "Ambulance"], ["17", "Police"], ["18", "Fire"]] },
  DE: { primary: ["112", "Any emergency"], others: [["110", "Police"]] },
  ES: { primary: ["112", "Any emergency"], others: [["091", "Police"]] },
  PT: { primary: ["112", "Any emergency"], others: [] },
  GB: { primary: ["999", "Any emergency"], others: [["112", "Also works"]] },
  IE: { primary: ["112", "Any emergency"], others: [["999", "Also works"]] },
  US: { primary: ["911", "Any emergency"], others: [] },
  CA: { primary: ["911", "Any emergency"], others: [] },
  JP: { primary: ["119", "Ambulance and fire"], others: [["110", "Police"]] },
  AU: { primary: ["000", "Any emergency"], others: [["112", "From a mobile"]] },
  TR: { primary: ["112", "Any emergency"], others: [] },
  BR: { primary: ["192", "Ambulance"], others: [["190", "Police"], ["193", "Fire"]] },
  MX: { primary: ["911", "Any emergency"], others: [] },
  KR: { primary: ["119", "Ambulance and fire"], others: [["112", "Police"]] },
  CN: { primary: ["120", "Ambulance"], others: [["110", "Police"], ["119", "Fire"]] },
  IN: { primary: ["112", "Any emergency"], others: [] },
  EG: { primary: ["123", "Ambulance"], others: [["122", "Police"]] },
  TH: { primary: ["1669", "Ambulance"], others: [["191", "Police"]] },
  MA: { primary: ["15", "Ambulance"], others: [["19", "Police"]] }
};

state.lang = localStorage.getItem("cg:lang") || "en";
if (!I18N[state.lang]) state.lang = "en";
state.userName = localStorage.getItem("cg:user") || "";
state.uniName = localStorage.getItem("cg:uni") || "";
state.faculty = localStorage.getItem("cg:faculty") || "";
state.world = null;
state.countryCode = "";
state.step = "welcome";

function t(key, vars) {
  const table = I18N[state.lang] || I18N.en;
  let s = table[key] || I18N.en[key] || key;
  if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replaceAll("{" + k + "}", v); });
  return s;
}
function countryName(code) {
  try { return new Intl.DisplayNames([state.lang], { type: "region" }).of(code) || code; }
  catch { return code; }
}
function flagSrc(code) { return `https://flagcdn.com/24x18/${code.toLowerCase()}.png`; }
function findCity(id) {
  for (const country of state.world.countries) {
    const city = country.cities.find((c) => c.id === id);
    if (city) return { country, city };
  }
  return null;
}

photoURL = function (file) {
  if (!file) return "";
  if (/^https?:|^blob:/i.test(file)) return file;
  if (state.city && state.city.blobUrls && state.city.blobUrls[file]) return state.city.blobUrls[file];
  return `cities/${state.city.id}/photos/${encodeURIComponent(file)}`;
};
modeButtons = function (attr) {
  const label = { w: "walk", r: "transit", d: "drive" };
  return `<div class="modes" role="group" aria-label="${esc(t("aRoute"))}">${MODES.map(([k]) =>
    `<button type="button" class="btn pale" ${attr}="${k}" aria-pressed="${state.mode === k}">${esc(t(label[k]))}</button>`).join("")}</div>`;
};

function applyChrome() {
  document.querySelectorAll("[data-tab]").forEach((b) => { if (I18N.en[b.dataset.tab]) b.textContent = t(b.dataset.tab); });
  const close = document.getElementById("placeClose");
  if (close) close.textContent = t("close");
  const live = document.querySelector("#place .live-label");
  if (live) live.textContent = t("liveMaps");
  const ext = document.getElementById("placeExternal");
  if (ext) ext.textContent = t("openMaps");
  const sosTitle = document.getElementById("sosTitle");
  if (sosTitle) sosTitle.textContent = t("helpNow");
  const sosClose = document.getElementById("sosClose");
  if (sosClose) sosClose.textContent = t("close");
  const showClose = document.getElementById("showClose");
  if (showClose) showClose.textContent = t("close");
  const lightClose = document.getElementById("lightClose");
  if (lightClose) lightClose.textContent = t("close");
  syncSave();
  syncOriginButton();
}
function setLang(code) {
  if (!I18N[code]) return;
  state.lang = code;
  localStorage.setItem("cg:lang", code);
  document.documentElement.lang = code;
  paintLang();
  if (state.step === "welcome") paintWelcome();
  else paintCountry();
  applyChrome();
  if (state.city && state.city.spoken) {
    if (!state.city.fromFolder) state.city.phrases = phraseList(state.city.spoken);
    if (state.tab === "words") renderWords();
    if (state.tab === "today") renderToday();
  }
  if (state.city) renderUni();
}
function paintLang() {
  const row = document.getElementById("langRow");
  if (!row) return;
  row.innerHTML = LANGS.map(([code, label]) =>
    `<button type="button" data-lang="${code}" aria-pressed="${code === state.lang}">${label}</button>`).join("");
}
function paintWelcome() {
  state.step = "welcome";
  document.getElementById("stepWelcome").hidden = false;
  document.getElementById("stepCountry").hidden = true;
  document.getElementById("welcomeTitle").textContent = t("welcome");
  document.getElementById("welcomeLead").textContent = t("askName");
  document.getElementById("userName").placeholder = t("namePh");
  document.getElementById("userName").value = state.userName || "";
  document.getElementById("uniLabel").textContent = t("uniAsk");
  document.getElementById("uniName").placeholder = t("uniPh");
  document.getElementById("uniName").value = state.uniName || "";
  document.getElementById("facultyLabel").textContent = t("facultyAsk");
  document.getElementById("uniFaculty").placeholder = t("facultyPh");
  document.getElementById("uniFaculty").value = state.faculty || "";
  document.getElementById("nameGo").textContent = t("continue");
  paintLang();
}
function paintCountry() {
  if (!state.world) return;
  state.step = "country";
  document.getElementById("stepWelcome").hidden = true;
  document.getElementById("stepCountry").hidden = false;
  document.getElementById("helloTitle").textContent = t("hello", { name: state.userName });
  document.getElementById("countryLead").textContent = t("cityHint");
  document.getElementById("editName").textContent = t("changeName");
  const add = document.getElementById("addFolder");
  if (add) add.textContent = t("addFolder");
  const btn = document.getElementById("countryBtn");
  if (!state.countryCode) {
    btn.innerHTML = esc(t("chooseCountry"));
    document.getElementById("cityList").hidden = true;
    document.getElementById("cityList").innerHTML = "";
  }
  paintCountryList();
  paintLang();
  const status = document.getElementById("gateStatus");
  if (status && status.textContent !== t("cityLooking")) status.textContent = "";
  if (state.countryCode) selectCountry(state.countryCode);
  else {
    const form = document.getElementById("cityAddForm");
    if (form) form.hidden = true;
  }
  paintUniCity();
  ensureUniLookup();
}
function paintCountryList() {
  const q = (document.getElementById("countrySearch").value || "").trim().toLowerCase();
  const list = state.world.countries
    .map((c) => ({ c, label: countryName(c.code) }))
    .sort((a, b) => a.label.localeCompare(b.label, state.lang));
  document.getElementById("countryList").innerHTML = list
    .filter((x) => !q || x.label.toLowerCase().includes(q) || x.c.code.toLowerCase().includes(q))
    .map((x) => `<button type="button" data-pick-country="${x.c.code}" role="option"><img class="flag" alt="" src="${flagSrc(x.c.code)}"><span>${esc(x.label)}</span></button>`)
    .join("");
}
function foldPlace(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "");
}
function sameCity(city, meta) {
  const names = [city.name, city.wiki, city.id].map(foldPlace).filter(Boolean);
  const wanted = [meta.name, meta.wiki, meta.id].map(foldPlace).filter(Boolean);
  return wanted.some((w) => names.includes(w));
}
function citySlug(name) {
  const base = (name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
  return base || "city";
}
function countryBucket(code) {
  let country = state.world.countries.find((c) => c.code === code);
  if (!country) {
    country = { code, lang: "en", tz: "UTC", cities: [] };
    state.world.countries.push(country);
  }
  return country;
}
function ensureListed(country, meta) {
  const hit = country.cities.find((c) => sameCity(c, meta));
  if (hit) return hit;
  const id = country.cities.some((c) => c.id === meta.id) ? meta.id + "-" + country.code.toLowerCase() : meta.id;
  const city = { ...meta, id };
  country.cities.unshift(city);
  return city;
}
function paintUniCity() {
  const box = document.getElementById("uniCityOffer");
  const place = state.uniPlace;
  if (!box) return;
  if (!place || state.city) { box.hidden = true; box.innerHTML = ""; return; }
  box.hidden = false;
  const here = state.countryCode === place.countryCode;
  const note = here ? t("uniCityTag") : t("uniCityOther", { country: countryName(place.countryCode) });
  box.innerHTML = `<button type="button" class="uni-city" data-uni-city="1"><span>${esc(place.city.name)}</span><small>${esc(note)}</small></button>`;
}
function paintCityAdd() {
  const form = document.getElementById("cityAddForm");
  if (!form) return;
  form.hidden = !state.countryCode;
  const label = document.getElementById("cityAddLabel");
  const input = document.getElementById("cityAddInput");
  const go = document.getElementById("cityAddGo");
  if (label) label.textContent = t("addCity");
  if (input) input.placeholder = t("addCityPh");
  if (go) go.textContent = t("addCityGo");
}
function selectCountry(code) {
  state.countryCode = code;
  const country = countryBucket(code);
  const place = state.uniPlace;
  if (place && place.countryCode === code) ensureListed(country, place.city);
  const btn = document.getElementById("countryBtn");
  btn.innerHTML = `<img class="flag" alt="" src="${flagSrc(code)}"><span>${esc(countryName(code))}</span>`;
  btn.setAttribute("aria-expanded", "false");
  document.getElementById("countryPanel").hidden = true;
  document.getElementById("countryLead").textContent = t("pickCity");
  const box = document.getElementById("cityList");
  box.hidden = false;
  let cities = country.cities.slice();
  if (place && place.countryCode === code) {
    const i = cities.findIndex((c) => sameCity(c, place.city));
    if (i > 0) cities.unshift(cities.splice(i, 1)[0]);
  }
  box.innerHTML = cities.map((c) =>
    `<button type="button" data-city="${esc(c.id)}"></button>`).join("");
  box.querySelectorAll("button").forEach((b) => {
    const city = country.cities.find((c) => c.id === b.dataset.city);
    const saved = offlineIndex().includes(city.id) || (city.pack && offlineIndex().includes(city.pack));
    const fromUni = place && place.countryCode === code && sameCity(city, place.city);
    const tags = [fromUni ? t("uniCityTag") : "", city.pack ? t("folderTag") : "", saved ? t("savedOffline") : ""].filter(Boolean);
    if (fromUni) b.classList.add("uni-city");
    b.innerHTML = `<span>${esc(city.name)}</span>${tags.length ? `<small>${esc(tags.join(" · "))}</small>` : ""}`;
  });
  ownIndex().filter((c) => !c.countryCode || c.countryCode === code).forEach((c) => {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.city = c.id;
    b.innerHTML = `<span>${esc(c.name)}</span><small>${esc(t("yourFolderTag"))}</small>`;
    box.appendChild(b);
  });
  paintCityAdd();
  paintUniCity();
}

function phraseList(spoken) {
  const pack = LOCAL[spoken] || LOCAL.en;
  const gap = !LOCAL[spoken];
  return Object.keys(GLOSS).map((key) => ({
    cat: PHRASE_CAT[key] || "everyday",
    en: (GLOSS[key][state.lang] || GLOSS[key].en),
    local: pack[key][0],
    tr: pack[key][1],
    note: gap ? t("phraseGap") : ""
  }));
}
function emergencyFor(code) {
  const row = EMERGENCY[code] || { primary: ["112", "Any emergency"], others: [] };
  return {
    primary: { n: row.primary[0], label: row.primary[1], note: t("publicNumbers") },
    othersNote: t("publicNumbers"),
    others: row.others.map(([n, en]) => ({ n, en }))
  };
}
async function wiki(params) {
  const u = new URL("https://en.wikipedia.org/w/api.php");
  Object.entries({ origin: "*", format: "json", ...params }).forEach(([k, v]) => u.searchParams.set(k, String(v)));
  const res = await fetch(u);
  if (!res.ok) throw new Error("wiki");
  return res.json();
}
function kindOf(description) {
  const d = (description || "").toLowerCase();
  if (/museum|gallery/.test(d)) return "museums";
  if (/park|garden/.test(d)) return "parks";
  if (/university|academy/.test(d)) return "study";
  if (/café|cafe|market|restaurant/.test(d)) return "cafes";
  return "sights";
}
async function wd(params) {
  const u = new URL("https://www.wikidata.org/w/api.php");
  Object.entries({ origin: "*", format: "json", ...params }).forEach(([k, v]) => u.searchParams.set(k, String(v)));
  const res = await fetch(u);
  if (!res.ok) throw new Error("wd");
  return res.json();
}
function claimId(entity, prop) {
  const value = entity?.claims?.[prop]?.[0]?.mainsnak?.datavalue?.value;
  return value && value.id;
}
function claimIds(entity, prop) {
  return (entity?.claims?.[prop] || []).map((row) => row?.mainsnak?.datavalue?.value?.id).filter(Boolean);
}
function coordOf(entity) {
  const value = entity?.claims?.P625?.[0]?.mainsnak?.datavalue?.value;
  if (!value || typeof value.latitude !== "number") return null;
  return { lat: value.latitude, lng: value.longitude };
}
async function wdEntities(ids) {
  const data = await wd({
    action: "wbgetentities", ids: ids.join("|"),
    props: "labels|descriptions|claims|sitelinks", languages: "en|el"
  });
  return data.entities || {};
}
const CITY_KIND = new Set(["Q515", "Q1549591", "Q3957", "Q7930989", "Q15284", "Q1637706", "Q1093829", "Q174844", "Q262166", "Q747074", "Q15078955"]);
const COUNTRY_ALIAS = { Q21: "GB", Q22: "GB", Q25: "GB", Q26: "GB" };
async function countryCodeOf(id, depth) {
  if (!id || depth > 2) return "";
  if (COUNTRY_ALIAS[id]) return COUNTRY_ALIAS[id];
  const bag = await wdEntities([id]);
  const item = bag[id];
  if (!item || item.missing) return "";
  const iso = item.claims?.P297?.[0]?.mainsnak?.datavalue?.value;
  if (typeof iso === "string" && /^[A-Za-z]{2}$/.test(iso)) return iso.toUpperCase();
  const parent = claimId(item, "P17");
  if (parent && parent !== id) return countryCodeOf(parent, depth + 1);
  return "";
}
async function cityItem(startId) {
  let id = startId;
  const seen = new Set();
  for (let i = 0; i < 4 && id && !seen.has(id); i++) {
    seen.add(id);
    const bag = await wdEntities([id]);
    const item = bag[id];
    if (!item || item.missing) return null;
    if (claimIds(item, "P31").some((kind) => CITY_KIND.has(kind))) return item;
    id = claimId(item, "P131");
  }
  return null;
}
function labelOf(entity) {
  return entity?.labels?.[state.lang]?.value || entity?.labels?.en?.value || "";
}
async function locateUniversity(name) {
  const langs = [...new Set([state.lang || "en", "en"])];
  const hits = [];
  for (const language of langs) {
    const search = await wd({ action: "wbsearchentities", search: name, language, type: "item", limit: "5" });
    (search.search || []).forEach((hit) => hits.push(hit));
  }
  const asked = name.trim().toLowerCase();
  const ranked = [...new Map(hits.map((hit) => [hit.id, hit])).values()].sort((a, b) => {
    const score = (hit) => {
      const label = (hit.label || "").toLowerCase();
      if (label === asked) return 0;
      if (label.startsWith(asked)) return 1;
      if (/department|faculty|school of/.test((hit.description || "").toLowerCase())) return 3;
      return 2;
    };
    return score(a) - score(b);
  }).slice(0, 4);
  if (!ranked.length) return null;
  const bag = await wdEntities(ranked.map((hit) => hit.id));
  const uni = ranked.map((hit) => bag[hit.id]).find((item) => item && (claimId(item, "P159") || claimId(item, "P131") || claimId(item, "P276")));
  if (!uni) return null;
  let place = null;
  for (const prop of ["P159", "P131", "P276"]) {
    const start = claimId(uni, prop);
    if (!start) continue;
    place = await cityItem(start);
    if (place) break;
  }
  if (!place) return null;
  const countryCode = await countryCodeOf(claimId(place, "P17") || claimId(uni, "P17"), 0);
  const point = coordOf(place) || coordOf(uni);
  const wikiTitle = place.sitelinks?.enwiki?.title || place.labels?.en?.value || "";
  const cityName = labelOf(place) || wikiTitle;
  if (!countryCode || !point || !cityName) return null;
  const country = countryBucket(countryCode);
  const meta = {
    id: citySlug(wikiTitle || cityName),
    name: cityName,
    lat: point.lat,
    lng: point.lng,
    wiki: wikiTitle || cityName,
    tz: country.tz
  };
  return { countryCode, city: ensureListed(country, meta) };
}
async function wikiPlace(name, country) {
  const data = await wiki({
    action: "query", generator: "search", gsrsearch: `${name} ${countryName(country.code)}`, gsrlimit: "5",
    prop: "coordinates|description"
  });
  const pages = Object.values(data.query?.pages || {}).filter((p) => (p.coordinates || [])[0]);
  const wanted = foldPlace(name);
  const page = pages.find((p) => foldPlace(p.title).startsWith(wanted)) || pages[0];
  if (!page) return null;
  const coord = page.coordinates[0];
  const title = page.title.replace(/,.*/, "");
  return ensureListed(country, {
    id: citySlug(title),
    name: title,
    lat: coord.lat,
    lng: coord.lon,
    wiki: page.title,
    tz: country.tz
  });
}
function ensureUniLookup() {
  const name = (state.uniName || "").trim();
  if (!name || state.uniLookup === name || state.city) return;
  state.uniLookup = name;
  state.uniPlace = null;
  const status = document.getElementById("gateStatus");
  if (status) status.textContent = t("cityLooking");
  locateUniversity(name).then((place) => {
    if ((state.uniName || "").trim() !== name || state.city) return;
    state.uniPlace = place;
    if (status && status.textContent === t("cityLooking")) status.textContent = "";
    paintUniCity();
    if (place && state.countryCode === place.countryCode) selectCountry(state.countryCode);
  }).catch(() => {
    if (status && status.textContent === t("cityLooking")) status.textContent = "";
  });
}
async function openUniCity() {
  const place = state.uniPlace;
  if (!place) return;
  if (state.countryCode !== place.countryCode) selectCountry(place.countryCode);
  else ensureListed(countryBucket(place.countryCode), place.city);
  await enterCity(place.city.id);
}
async function addTypedCity(raw) {
  const name = (raw || "").trim();
  const country = state.countryCode ? countryBucket(state.countryCode) : null;
  if (!name || !country) return;
  const known = country.cities.find((c) => sameCity(c, { name, wiki: name }));
  if (known) { await enterCity(known.id); return; }
  const status = document.getElementById("gateStatus");
  if (status) status.textContent = t("gathering", { city: name });
  try {
    const city = await wikiPlace(name, country);
    if (!city) throw new Error("city");
    await enterCity(city.id);
  } catch {
    if (status) status.textContent = t("couldntOpen");
  }
}
async function crawlCity(country, meta) {
  const leadData = await wiki({
    action: "query", prop: "extracts|pageimages", exintro: "1", explaintext: "1", exchars: "280",
    piprop: "thumbnail", pithumbsize: "1400", redirects: "1", titles: meta.wiki
  });
  const lead = Object.values(leadData.query?.pages || {})[0] || {};
  const nearData = await wiki({
    action: "query", generator: "geosearch", ggscoord: `${meta.lat}|${meta.lng}`, ggsradius: "4500", ggslimit: "12",
    prop: "pageimages|description|coordinates", piprop: "thumbnail", pithumbsize: "1000", pilimit: "12"
  });
  const skip = /marathon|disambiguation|railway|metro station|tram|airport|list of|timeline/i;
  const pages = Object.values(nearData.query?.pages || {})
    .filter((p) => p.thumbnail && p.description && !skip.test(p.title) && !skip.test(p.description) && p.title !== meta.wiki)
    .slice(0, 8);
  const photos = [];
  if (lead.thumbnail?.source) photos.push({ file: lead.thumbnail.source, caption: meta.name, credit: "Wikipedia" });
  pages.forEach((p) => photos.push({ file: p.thumbnail.source, caption: p.title, credit: `${p.description} · Wikipedia` }));
  const places = pages.map((p, i) => {
    const coord = (p.coordinates || [])[0] || { lat: meta.lat, lon: meta.lng };
    return {
      id: "w" + (p.pageid || i), name: p.title.replace(/,.*/, ""), local: p.title,
      kind: p.description, area: meta.name, cat: kindOf(p.description), photo: p.thumbnail.source,
      lat: coord.lat, lng: coord.lon, query: p.title, blurb: p.description
    };
  });
  const stops = [{ name: meta.name, lat: meta.lat, lng: meta.lng }, ...places.slice(0, 3).map((p) => ({ name: p.name, lat: p.lat, lng: p.lng }))];
  const spoken = country.lang;
  const tag = (lead.extract || "").split(/(?<=\.)\s/)[0] || meta.name;
  return {
    id: meta.id, name: meta.name, localName: meta.name, lang: spoken, speakLang: SPEAK[spoken] || "en-GB", spoken,
    country: countryName(country.code), tagline: tag.slice(0, 220),
    timezone: meta.tz || country.tz, accent: "#c4a574",
    center: { lat: meta.lat, lng: meta.lng, label: meta.name },
    hero: photos.slice(0, 4).map((p) => p.file),
    youTitle: t("yourCity", { city: meta.name }),
    filters: [["all", "All"], ["sights", "Sights"], ["museums", "Museums"], ["parks", "Parks"], ["cafes", "Cafés"], ["study", "Study"]],
    phraseFilters: [["help", "Help"], ["everyday", "Everyday"], ["food", "Food"]],
    photos, places,
    walks: stops.length > 1 ? [{ id: "centre", title: meta.name, minutes: 40, blurb: tag.slice(0, 160), stops }] : [],
    phrases: phraseList(spoken),
    emergency: emergencyFor(country.code),
    pharmacy: { kind: "search", query: `pharmacy ${meta.wiki}`, note: t("findPharmacy") },
    hospitals: t("publicNumbers"),
    universities: [], uniPlace: {},
    checklist: [["uni", "uni"], ["sos", "sos"], ["phrases", "phrases"], ["place", "place"]],
    addressHint: t("home"), addressPlaceholder: meta.name, fromFolder: false
  };
}
async function loadPack(meta) {
  const res = await fetch(`cities/${meta.pack}/city.json`);
  if (!res.ok) throw new Error("pack");
  const city = await res.json();
  city.id = meta.pack;
  if (city.pharmacy?.rotaFile) city.pharmacy.rota = await fetch(`cities/${meta.pack}/${city.pharmacy.rotaFile}`).then((r) => r.json());
  city.folderPhotos = await listPhotos(meta.pack);
  city.fromFolder = true;
  city.spoken = (city.speakLang || "en").slice(0, 2).toLowerCase();
  return city;
}
function mergeFolderFirst(base, extra) {
  const names = new Set(base.places.map((p) => (p.name || "").toLowerCase()));
  const files = new Set((base.photos || []).map((p) => p.file));
  extra.places.forEach((p) => {
    const n = p.name.toLowerCase();
    if ([...names].some((have) => have && (have.includes(n) || n.includes(have)))) return;
    names.add(n);
    base.places.push(p);
  });
  extra.photos.forEach((p) => { if (!files.has(p.file)) { files.add(p.file); base.photos.push(p); } });
  base.fromFolder = true;
  return base;
}

function showCity(city) {
  clearInterval(state.heroTimer);
  const found = state.world && findCity(city.id);
  applyGuide(city, city.countryCode || (found && found.country.code) || state.countryCode || "");
  state.city = city;
  state.tab = "today";
  state.filter = "all";
  state.phraseFilter = (city.phraseFilters[0] || ["help"])[0];
  state.mode = "w";
  state.originMode = "center";
  state.walkFromMe = false;
  state.walkId = city.walks[0]?.id || null;
  state.mapPlaceId = null;
  state.mapQuery = null;
  state.campus = null;
  state.campusFocus = false;
  state.rideTo = null;
  state.rideLine = null;
  state.openPlace = null;
  state.when = "now";
  state.heroIndex = 0;
  const listedUni = (city.universities || []).find((u) => {
    const n = (state.uniName || "").trim().toLowerCase();
    const v = u.toLowerCase();
    return n && (v === n || v.includes(n) || n.includes(v));
  });
  if (listedUni) store.set("uni", listedUni);
  document.documentElement.style.setProperty("--accent", city.accent || "#d7b56d");
  document.title = `CITY GUIDE · ${city.name}`;
  document.getElementById("topName").textContent = state.userName ? `${state.userName} · ${city.localName || city.name}` : (city.localName || city.name);
  document.getElementById("topName").lang = city.lang || "";
  document.getElementById("gate").hidden = true;
  document.getElementById("app").hidden = false;
  document.getElementById("place").hidden = true;
  document.getElementById("sos").hidden = true;
  applyChrome();
  renderToday();
  renderPlaces();
  renderMap();
  renderWords();
  renderYou();
  renderSos();
  renderUni();
  const cityId = city.id;
  gatherCampus().then((campus) => {
    if (!state.city || state.city.id !== cityId) return;
    state.campus = campus;
    renderUni();
  }).catch(() => {});
  setTab("today");
  pickVoice();
}

enterCity = async function (id) {
  if (entering) return;
  if (String(id).startsWith("own-")) {
    entering = true;
    document.getElementById("gateStatus").textContent = t("gathering", { city: id });
    try {
      const own = await loadOwnCity(id);
      if (!own) throw new Error("own");
      showCity(own);
    } catch {
      document.getElementById("gateStatus").textContent = t("couldntOpen");
    } finally { entering = false; }
    return;
  }
  const found = findCity(id);
  if (!found) return;
  entering = true;
  document.getElementById("gateStatus").textContent = t("gathering", { city: found.city.name });
  try {
    if (found.city.pack) {
      const packed = await loadPack(found.city);
      showCity(packed);
      entering = false;
      crawlCity(found.country, found.city).then((extra) => {
        if (!state.city || state.city.id !== packed.id) return;
        mergeFolderFirst(state.city, extra);
        if (!state.openPlace) {
          renderPlaces();
          if (state.tab === "today") renderToday();
        }
      }).catch(() => {});
      return;
    }
    const city = await crawlCity(found.country, found.city);
    showCity(city);
  } catch {
    const saved = await loadOfflineCity(found.city.pack || id);
    if (saved) showCity(saved);
    else document.getElementById("gateStatus").textContent = t("couldntOpen");
  } finally { entering = false; }
};

leaveCity = function () {
  clearInterval(state.heroTimer);
  document.getElementById("app").hidden = true;
  document.getElementById("place").hidden = true;
  document.getElementById("sos").hidden = true;
  document.getElementById("show").hidden = true;
  document.getElementById("light").hidden = true;
  document.getElementById("gate").hidden = false;
  state.city = null;
  state.campus = null;
  state.campusFocus = false;
  state.rideTo = null;
  state.rideLine = null;
  state.countryCode = "";
  document.title = "CITY GUIDE";
  paintCountry();
};

document.getElementById("nameForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("userName").value.trim();
  const uni = document.getElementById("uniName").value.trim();
  const faculty = document.getElementById("uniFaculty").value.trim();
  if (!name || !uni) return;
  state.userName = name;
  state.uniName = uni;
  state.faculty = faculty;
  localStorage.setItem("cg:user", name);
  localStorage.setItem("cg:uni", uni);
  localStorage.setItem("cg:faculty", faculty);
  state.countryCode = "";
  state.uniLookup = "";
  state.uniPlace = null;
  state.goCountry = true;
  paintCountry();
});
document.getElementById("cityAddForm").addEventListener("submit", (e) => {
  e.preventDefault();
  addTypedCity(document.getElementById("cityAddInput").value);
});
document.getElementById("editName").addEventListener("click", paintWelcome);
document.getElementById("countryBtn").addEventListener("click", () => {
  const panel = document.getElementById("countryPanel");
  panel.hidden = !panel.hidden;
  document.getElementById("countryBtn").setAttribute("aria-expanded", String(!panel.hidden));
  if (!panel.hidden) document.getElementById("countrySearch").focus();
});
document.getElementById("countrySearch").addEventListener("input", paintCountryList);
document.addEventListener("click", (e) => {
  const lang = e.target.closest("[data-lang]");
  if (lang) { setLang(lang.dataset.lang); return; }
  const country = e.target.closest("[data-pick-country]");
  if (country) { selectCountry(country.dataset.pickCountry); return; }
  if (e.target.closest("[data-uni-city]")) { openUniCity(); return; }
  if (!e.target.closest(".picker")) {
    document.getElementById("countryPanel").hidden = true;
    document.getElementById("countryBtn").setAttribute("aria-expanded", "false");
  }
});

fetch("world.json").then((r) => r.json()).then((world) => {
  state.world = world;
  if (state.goCountry) paintCountry();
  else paintWelcome();
  applyChrome();
}).catch(() => { document.getElementById("gateStatus").textContent = t("couldntOpen"); });
