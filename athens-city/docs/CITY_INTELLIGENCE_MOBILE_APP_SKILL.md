---
name: city-intelligence-mobile-app
description: >
  Build a city-agnostic mobile application that acts as a continuously updated
  personal city guide and city-intelligence system for visitors, students,
  expatriates, and new residents. The system discovers, verifies, structures,
  personalizes, monitors, and presents information about a city using reliable
  web sources and real-time APIs where available. It covers tourism, history,
  neighbourhoods, safety, transport, events, city/university news, shopping,
  essential services, student housing, airport/port transfers, itineraries from
  3 days to 3–5 months, saved places and activities, personalized alerts, and
  continuous information refresh. Use this skill when designing, architecting,
  researching, implementing, testing, or extending such an application.
---

# CITY INTELLIGENCE MOBILE APP DEVELOPMENT SKILL

## 0. ROLE

Act as a combined:

- Product Architect
- Mobile UX Architect
- Information Architect
- Web Research & Source Verification Agent
- Data Architect
- AI Agent Architect
- API/Integration Architect
- Travel/City Information Designer
- Safety Information Designer
- Software Engineer
- QA/Test Architect
- Product Operations Designer

Do not behave as a generic consultant.

Produce implementation-ready specifications, data models, workflows, prompts,
API contracts, screen definitions, acceptance criteria, tests, and code when
requested.

The objective is to build a working product, not merely describe one.

---

# 1. PRODUCT DEFINITION

The product is a:

> PERSONAL CITY INTELLIGENCE & GUIDE

It is not simply a tourist guide.

It continuously builds a structured, source-backed model of a city and then
creates a personalized subset of that city for each user.

Core principle:

    CITY KNOWLEDGE
        +
    VERIFIED LIVE INFORMATION
        +
    USER PROFILE & PLACES
        +
    USER INTERESTS
        +
    TIME / LOCATION CONTEXT
        =
    PERSONAL CITY GUIDE

The user should be able to arrive in an unfamiliar city and progressively use
the application as a personal local guide.

Typical users:

1. Short-term visitor
2. Tourist staying 2–7 days
3. Student
4. Exchange student
5. International student
6. New resident
7. Expatriate
8. Business traveller
9. Family visitor
10. Long-stay temporary resident

---

# 2. CORE PRODUCT PROMISE

The application should answer questions such as:

- What should I see today?
- What can I do tonight?
- What is happening near me?
- What should I know about this neighbourhood?
- How do I get from home to university?
- Is there a disruption on my normal route?
- How much will the journey cost?
- What is the next bus/train/metro?
- What happened in the city today?
- What happened at my university?
- Where can I buy groceries?
- Where is the nearest pharmacy?
- Where can I find affordable student accommodation?
- How do I get from the airport to my home?
- How do I get from the port to the city?
- What are the important historical places?
- Which places have I saved?
- What have I not yet explored?
- What should I do if I have three days?
- What should I do if I live here for five months?
- What changed since I last opened the app?

The product should progressively move from:

    "Tell me about the city"

to:

    "Tell me about MY life in this city."

---

# 3. CITY-AGNOSTIC ARCHITECTURE

Never hard-code the application around one city.

The same application architecture must support:

- Athens
- Budapest
- Warsaw
- Prague
- London
- Paris
- Istanbul
- Dubai
- New York
- any other supported city

A city is a configurable data environment.

Minimum city configuration:

```yaml
city:
  id:
  name:
  country:
  country_code:
  language:
  timezone:
  currency:
  coordinates:
  metropolitan_area:
  official_domains:
  transport_authorities:
  airport_sources:
  port_sources:
  university_sources:
  municipal_sources:
  police_or_safety_sources:
  tourism_sources:
  event_sources:
  local_news_sources:
  emergency_sources:
  health_sources:          # hospitals, on-duty rotas, pharmacies
  embassy_sources:
  civil_protection_sources:
  media_sources:           # licensed image sources (§17A)
  phrasebook_language:     # §17B
  legal_media_restrictions:
```

---

# 4. INFORMATION ARCHITECTURE

The application must organize city information into these primary domains.

## 4.1 Explore

- landmarks
- attractions
- museums
- monuments
- archaeological sites
- historical places
- architecture
- neighbourhoods
- parks
- beaches
- viewpoints
- cultural venues
- religious sites
- local markets
- hidden gems
- food and drink
- nightlife
- shopping
- family activities
- student activities
- sports
- nature

Every Explore item should carry at least one licensed image where available
(§17A).

## 4.2 History & Culture

For each important historical/cultural item:

- name
- description
- historical period
- significance
- dates
- location
- opening hours
- admission
- official source
- related places
- estimated visit duration
- accessibility
- source confidence

Do not invent historical claims.

Prefer:

1. museums
2. universities
3. archaeological authorities
4. government
5. recognized cultural institutions
6. established reference sources

---

# 5. THREE TIME HORIZONS

The product must explicitly support different residence durations.

## 5.1 Three Days

Generate a practical itinerary.

Consider:

- opening hours
- travel time
- geography
- user interests
- weather if available
- events
- meal/rest periods
- ticket requirements
- current closures

Do not create impossible itineraries.

## 5.2 Three Weeks

Move beyond headline attractions.

Include:

- neighbourhood discovery
- museums
- local experiences
- markets
- cultural events
- day trips
- recurring activities
- local food
- practical services

## 5.3 Three to Five Months

Treat the user as a temporary resident.

Build progressive discovery:

```text
WEEK 1
Essentials

WEEKS 2–4
City orientation

MONTH 2
Culture & neighbourhoods

MONTH 3
Local life

MONTH 4
Hidden / deeper experiences

MONTH 5
Remaining interests + seasonal events
```

The system should avoid repeatedly recommending places already completed.

---

# 6. USER CITY PROFILE

The user can establish:

```yaml
user_city_profile:
  city:
  stay_type:
  arrival_date:
  departure_date:
  home_location:
  university_location:
  work_location:
  favourite_places:
  saved_places:
  saved_activities:
  interests:
  budget:
  mobility_preferences:
  accessibility_preferences:
  language_preferences:
  notification_preferences:
```

Sensitive location information must be handled according to applicable privacy
requirements.

Exact home location should not be unnecessarily exposed or transmitted.

Where possible, store a privacy-preserving location representation rather than
a raw address.

---

# 7. MY PLACES

Users must be able to select and save:

- Home
- University
- Work
- Gym
- Favourite café
- Favourite restaurant
- Supermarket
- Doctor
- Pharmacy
- Library
- Sports venue
- Train station
- Airport
- Port
- Any custom place

Each saved place becomes a context anchor.

Example:

```text
HOME
  ↓
UNIVERSITY
  ↓
FAVOURITE CAFÉ
  ↓
GYM
```

The application uses these anchors to personalize:

- transport
- nearby events
- news
- disruptions
- services
- recommendations
- alerts

---

# 8. PERSONAL CITY SET

The user can explicitly select information.

Examples:

- save a museum
- follow a football club
- follow a university department
- follow a neighbourhood
- save a restaurant
- follow a transport line
- follow an event venue
- follow an airport
- follow a port
- follow a city news category

The resulting set becomes:

```text
MY CITY
```

The app must prioritize monitoring this set.

---

# 9. SOURCE-FIRST INFORMATION MODEL

Every important factual item must have provenance.

Minimum schema:

```yaml
information_item:
  id:
  type:
  title:
  description:
  city:
  location:
  source:
    name:
    url:
    type:
    publisher:
  discovered_at:
  last_verified_at:
  next_verification_at:
  valid_from:
  valid_until:
  confidence:
  status:
  evidence:
  change_history:
```

Never silently turn uncertain information into fact.

---

# 10. SOURCE HIERARCHY

Use sources in this order where applicable.

## Tier 1 — Primary / Official

- government
- municipality
- police
- transport authority
- airport
- port authority
- university
- museum
- event organizer
- venue
- official tourism organization
- official operator

## Tier 2 — Established Institutional

- universities
- recognized cultural organizations
- chambers
- reputable public institutions

## Tier 3 — Established Media

- reputable local newspapers
- broadcasters
- established news organizations

## Tier 4 — Commercial / Aggregator

- accommodation platforms
- event platforms
- mapping platforms
- booking platforms
- commercial directories

## Tier 5 — Community / Social

- forums
- Reddit
- social media
- blogs
- user-generated content

Tier 5 can be useful for discovery but should not automatically be treated as
verified factual evidence.

---

# 11. RESEARCH PIPELINE

All automated city research should follow:

```text
DISCOVER
   ↓
COLLECT
   ↓
NORMALIZE
   ↓
DEDUPLICATE
   ↓
CLASSIFY
   ↓
VERIFY
   ↓
DATE-CHECK
   ↓
SCORE CONFIDENCE
   ↓
STORE
   ↓
MONITOR
```

For potentially volatile information:

```text
DISCOVER
   ↓
VERIFY AGAINST PRIMARY SOURCE
   ↓
PUBLISH
```

---

# 12. REAL-TIME INFORMATION

Real-time information should use APIs whenever possible.

Potential domains:

- public transport
- traffic
- road closures
- weather
- events
- flight information
- airport transport
- port transport
- university announcements
- city alerts
- emergency information

If no real-time API exists, use the most reliable available web source and
clearly indicate freshness.

Never describe stale data as live.

---

# 13. MOBILITY ENGINE

The mobility engine is a core component.

It should support:

- walking
- cycling
- bus
- tram
- metro
- subway
- train
- ferry
- taxi
- ride-hailing
- combinations

For each route:

```yaml
route:
  origin:
  destination:
  mode:
  departure:
  arrival:
  duration:
  transfers:
  cost:
  tickets:
  accessibility:
  realtime_status:
  disruptions:
  source:
  retrieved_at:
```

## Personal Routes

Users can define:

- Home → University
- Home → Work
- Home → Airport
- Home → Port
- University → Home
- University → Gym

The app should monitor frequently used routes.

---

# 14. TRANSPORT DISRUPTION ENGINE

When a monitored route changes:

```text
DETECT CHANGE
    ↓
VERIFY
    ↓
CHECK USER IMPACT
    ↓
CALCULATE ALTERNATIVE
    ↓
NOTIFY IF MATERIAL
```

Example:

> Your usual Home → University route has a service disruption today.
> The alternative route adds approximately 11 minutes.

Do not send alerts for trivial changes unless the user explicitly requests
high-frequency notifications.

---

# 15. AIRPORT & PORT GATEWAY

The app must support:

```text
AIRPORT → CITY
CITY → AIRPORT

PORT → CITY
CITY → PORT
```

For every available option:

- operator
- transport type
- departure point
- arrival point
- schedule
- frequency
- journey duration
- price
- ticket method
- booking requirement
- accessibility
- official source
- last verification

Include:

- airport bus
- metro
- train
- suburban railway
- ferry/shuttle where relevant
- taxi
- private transfer
- coach

Do not assume a service exists. Discover and verify it for the selected city.

---

# 16. STUDENT HOUSING

Support online discovery of:

- student residences
- private rooms
- shared apartments
- studios
- apartments
- university accommodation

For each listing:

```yaml
housing_listing:
  title:
  location:
  monthly_price:
  currency:
  deposit:
  bills:
  room_type:
  availability:
  contract:
  furnished:
  distance_to_university:
  transport:
  platform:
  source_url:
  discovered_at:
  last_checked:
```

Housing platforms may change frequently.

Never imply that a listing remains available without verification.

Clearly distinguish:

- listing price
- estimated total monthly cost
- deposit
- fees
- utilities
- platform/service fees

---

# 17. SAFETY INTELLIGENCE

Safety information requires special handling.

Never create an unsupported "dangerous neighbourhood" ranking.

Instead collect:

- official crime statistics
- police alerts
- municipal warnings
- transport safety information
- emergency information
- documented incidents
- reputable reporting
- temporal patterns when supported by data

Represent safety information as evidence.

Example:

```yaml
safety_item:
  area:
  category:
  statement:
  evidence:
  source:
  date:
  geographic_scope:
  temporal_scope:
  confidence:
```

Use neutral language.

Example:

> Official police data reports X incidents in this area during the stated
> period.

Avoid:

> This is a dangerous neighbourhood.

unless quoting an identified source and clearly attributing the statement.

Safety information must include its date.

Historical crime data must not automatically be presented as current conditions.

---

# 17A. VISUAL MEDIA (PLACE IMAGERY)

Images make Explore, History & Culture and itineraries far more engaging, but
every image is a licensed asset with provenance, exactly like a factual claim.

## Rule

An image without a known licence, author and source is not shown.

Do NOT use bulk image downloaders or browser extensions (e.g. Imageye or
similar "download all images from a page" tools) to populate the app. They
copy images from third-party websites with no licence information, violate
most site terms (see §37), and cannot be automated server-side anyway. They
may be used by a human only for internal mood boards / design exploration,
never as a production data source.

## Image Source Hierarchy

```text
1. Wikimedia Commons (via Wikidata)        — free licences, per-file metadata
2. Official tourism / museum media libraries — only with written permission
3. Google Places Photos API                 — per Google terms, attribution
4. Unsplash API / Pexels API                — generic city & mood imagery
5. User-submitted photos                    — explicit consent + moderation
6. Commissioned / own photography           — full rights
```

### 1. Wikimedia Commons (default for landmarks & historical sites)

- Resolve each Place to a Wikidata QID during entity matching (§23).
- Image: Wikidata property P18 (image); gallery: P373 (Commons category).
- Fetch metadata via the MediaWiki API
  (`action=query&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=<px>`).
- Store `LicenseShortName`, `Artist`, `Credit`, `AttributionRequired`,
  `UsageTerms` from `extmetadata`.
- Accept only licences on an allow-list (CC0, Public Domain, CC BY, CC BY-SA).
  Reject NC / ND / unknown.
- Display credit line: `Photo: <Artist>, <Licence>, via Wikimedia Commons`.

### 3. Google Places Photos

- Requires API key server-side (§46) and billing.
- Must display the author attributions returned with each photo.
- Respect caching limits in Google's terms; do not build a permanent
  photo archive from this source.

### 4. Unsplash / Pexels

- Use for generic imagery (neighbourhood mood, city header, category banners),
  not as proof of what a specific place looks like.
- Unsplash: hotlink the returned URLs, trigger the download endpoint when a
  photo is used, credit photographer + Unsplash.
- Pexels: credit photographer + Pexels.

## Legal checks per country

- Freedom of panorama differs by country; some modern buildings/installations
  may not be freely reproducible in commercial products.
- Some countries restrict commercial reproduction of images of state
  archaeological sites and museum objects (Greece requires permission for
  commercial use of images of monuments/archaeological sites under its
  cultural-heritage legislation). Treat this as a per-country legal check
  in City Onboarding (§41) before monetising the app.

## Media entity

```yaml
media_asset:
  id:
  entity_id:            # place / attraction / neighbourhood / event
  type: photo | illustration | panorama
  url:
  thumbnail_url:
  width:
  height:
  blurhash:             # placeholder while loading
  alt_text:             # required (§45); localised
  caption:
  author:
  licence:
  licence_url:
  attribution_text:     # exact string shown in UI
  source:
    name:
    url:
    tier:
  hotlink_required:
  cache_policy: allowed | limited | forbidden
  retrieved_at:
  last_verified_at:
  status: active | licence_changed | removed_at_source | rejected
  is_representative:    # true only if it actually depicts this entity
```

## Quality rules

- Prefer images showing the actual place, not a similar one.
- Flag seasonal/outdated images (e.g. a building under scaffolding).
- Re-check licence and availability periodically (monthly).
- Always show credit (small overlay or info sheet), never strip it.

---

# 17B. LANGUAGE HELPER (EVERYDAY PHRASES)

Goal: help the user function in daily life in the local language from day 1.

## Phrase categories (minimum)

```text
EMERGENCY & HEALTH      (always first, always offline)
Greetings & politeness
Numbers, time, days
Directions & getting around
Public transport & taxi
Café / restaurant / ordering / allergies
Shopping & supermarket
Pharmacy
Accommodation / landlord / repairs
University / administration (students)
Bank / phone / SIM
Small talk
```

## Phrase entity

```yaml
phrase:
  id:
  language:               # target, e.g. el
  locale_variant:         # e.g. el-GR, pt-BR
  category:
  intent:                 # e.g. ask_for_bill
  source_text:            # in user's UI language
  target_text:            # in local script
  transliteration:        # Latin script when local script differs
  pronunciation_hint:     # simplified phonetic
  register: formal | informal | neutral
  usage_note:             # when/how to use; cultural notes
  audio:
    type: human_recording | tts
    url_or_voice_id:
    offline_available:
  priority: essential | useful | nice_to_have
  reviewed_by_native_speaker: true | false
  reviewed_at:
  source:
```

## Rules

- Phrases generated or translated by AI must pass native-speaker review
  before publication (§25 Human Approval). Unreviewed phrases are hidden.
- Emergency and medical phrases require the highest review standard.
- Provide a "Show to a local" mode: full-screen, large text in local script,
  with the user's language underneath.
- Provide "Show my address to the driver": renders a saved place (§7) in
  local language/script. This must remain on-device (§6 privacy).
- Audio: prefer human recordings for essential phrases; otherwise on-device
  TTS (iOS AVSpeechSynthesizer / Android TextToSpeech). Check that an offline
  voice exists for the language; otherwise pre-generate and cache audio.
- Support favourites and "phrase of the day" for long stays (§5.3).
- Currency/number helper: read prices aloud, convert to home currency.

---

# 17C. EMERGENCY, HEALTH & ESSENTIAL SERVICES

This domain is safety-critical. Wrong information can cause harm.
Every item is Tier 1 sourced (§10), dated, and verified on a strict schedule.

## Content

```text
Emergency numbers
  - general emergency (e.g. 112 across the EU)
  - police, ambulance, fire, coast guard / sea rescue
  - tourist police (where it exists)
  - poison control
  - roadside assistance
  - domestic-violence / crisis / mental-health helplines
Hospitals
  - public hospitals with 24h emergency departments
  - on-duty rotation (where hospitals take emergencies on a schedule)
  - private hospitals / clinics
  - children's hospital, maternity, burns, eye, dental emergency
Pharmacies
  - on-duty / 24h pharmacies (daily rotation in many countries)
Other essential services
  - embassies and consulates (by user's nationality)
  - lost & found (city, transport, airport)
  - lost passport / lost card procedures
  - health insurance guidance (e.g. EHIC for EU citizens), how to see a doctor
  - civil-protection alerts (heatwave, wildfire, flood, earthquake)
```

## Example — Greece (verify against official sources before production)

```yaml
country: GR
numbers:
  - {service: general_emergency, number: "112"}
  - {service: police,            number: "100"}
  - {service: ambulance,         number: "166"}
  - {service: fire,              number: "199"}
  - {service: coast_guard,       number: "108"}
  - {service: tourist_police,    number: "1571"}
notes:
  - Athens public hospitals take emergencies on a daily on-duty rotation
    (εφημερεύοντα νοσοκομεία); treat as daily volatile data.
  - On-duty pharmacies (εφημερεύοντα φαρμακεία) rotate daily; primary source
    is the regional pharmacists' association; commercial directories
    (e.g. xo.gr) are Tier 4 and used only as secondary cross-check.
```

## Entities

```yaml
emergency_contact:
  id:
  country_code:
  city_id:              # null if nationwide
  service:
  number:
  languages_supported:
  hours:
  sms_or_text_available:
  source: {name, url, tier}
  last_verified_at:
  next_verification_at:

health_facility:
  id:
  type: public_hospital | private_hospital | clinic | pharmacy | dental | urgent_care
  name_local:
  name_translated:
  address_local:
  location:
  phone:
  emergency_department: true | false
  specialties:
  on_duty_schedule:     # list of {date, from, to}
  languages_spoken:     # only if sourced
  accepts: [public_insurance, ehic, private, cash]
  accessibility:
  source: {name, url, tier}
  last_verified_at:
```

## UX rules

- A persistent SOS entry is reachable in one tap from every screen.
- SOS works fully offline: numbers, nearest hospitals list, key phrases,
  user's own address in local language.
- Tap-to-call; show the number in large text as well (user may use another
  phone).
- Show "open now / on duty tonight" only from verified same-day data;
  otherwise say "schedule unavailable — call 112 / <local number>".
- Never display stale on-duty information as current. Show verification time.
- Optional personal medical card (blood type, allergies, medication,
  emergency contact, insurance) stored ON-DEVICE ONLY, encrypted, never
  synced without explicit opt-in (special-category data under GDPR, §36).
- The AI assistant must not give medical diagnoses; it directs to the
  appropriate service and emergency number.

---

# 18. EVENTS ENGINE

Discover:

- concerts
- exhibitions
- theatre
- cinema
- festivals
- sports
- conferences
- university events
- student events
- public events
- markets
- workshops
- lectures

Event model:

```yaml
event:
  title:
  category:
  organizer:
  venue:
  address:
  start:
  end:
  price:
  currency:
  ticket_url:
  official_url:
  description:
  audience:
  source:
  last_verified_at:
  status:
```

Remove cancelled or expired events.

---

# 19. CITY NEWS

Create two distinct feeds.

## City News

- transport
- municipality
- infrastructure
- culture
- major events
- local business
- public announcements
- weather-related disruption
- significant local developments

## University News

- academic calendar
- registration
- exams
- closures
- student services
- campus events
- student organizations
- scholarships
- accommodation
- major announcements

News must show:

- publication date
- source
- source link
- summary
- affected location/topic
- relevance to user

Do not present old news as current.

---

# 20. "WHAT CHANGED?" ENGINE

A major product feature.

Monitor user-selected information and detect:

- price change
- opening hours change
- closure
- relocation
- event cancellation
- new event
- transport disruption
- timetable change
- route change
- housing listing change
- university announcement
- airport/port disruption
- local warning

Present:

```text
WHAT CHANGED
```

rather than forcing the user to rediscover information.

---

# 21. PERSONAL DAILY BRIEF

Optional personalized briefing:

```text
YOUR CITY TODAY

Weather
Transport
University
Events
News
Saved Places
Things Near You
Alerts
```

The briefing must be generated from the user's selected information set.

Avoid generic content overload.

---

# 22. RECOMMENDATION ENGINE

Recommendations should consider:

```text
USER INTEREST
+
DISTANCE
+
TIME AVAILABLE
+
OPEN/CLOSED STATUS
+
BUDGET
+
WEATHER
+
TRANSPORT
+
PREVIOUSLY VISITED
+
CURRENT EVENTS
```

Example:

If user has two free hours near university:

```text
Find:
  interesting
  open now
  within reasonable distance
  compatible with budget
  not already visited
```

---

# 23. CITY KNOWLEDGE GRAPH

Where practical, model relationships between entities.

Example:

```text
University
 ├── Campus
 ├── Library
 ├── Student Union
 ├── Events
 ├── Accommodation
 └── Transport Routes

Airport
 ├── Bus
 ├── Metro
 ├── Train
 ├── Taxi
 └── City Destinations
```

Entities should be linkable.

Example:

```text
Museum
  → Neighbourhood
  → Metro Station
  → Events
  → Historical Period
  → Nearby Restaurants
```

---

# 24. AI AGENT ARCHITECTURE

Use specialized agents rather than one giant prompt.

Recommended agents:

## City Discovery Agent

Finds candidate city information.

## Source Verification Agent

Checks provenance and freshness.

## Transport Agent

Handles routes, schedules, prices and disruptions.

## Events Agent

Discovers and monitors events.

## News Agent

Collects and summarizes local/university news.

## Safety Agent

Collects and contextualizes evidence-based safety information.

## Housing Agent

Finds and monitors housing listings.

## City Historian Agent

Structures historical/cultural information.

## Personalization Agent

Maps city information to the user.

## Change Detection Agent

Detects updates.

## Notification Agent

Decides what deserves user attention.

## Quality Control Agent

Checks unsupported claims, stale data, contradictions and source quality.

---

# 25. HUMAN APPROVAL

Human approval is required before publishing or activating high-impact
automated changes involving:

- safety warnings
- emergency claims
- major factual corrections
- sensitive incidents
- potentially defamatory claims
- major housing warnings
- policy-sensitive content
- significant changes to source trust

The architecture must support:

```text
AI DISCOVERY
     ↓
AI PROPOSES
     ↓
HUMAN REVIEW
     ↓
APPROVE / REJECT / EDIT
     ↓
PUBLISH
```

---

# 26. DATA FRESHNESS

Every data category needs an appropriate refresh policy.

Example:

```yaml
transport_realtime:
  refresh: minutes

events:
  refresh: hours

news:
  refresh: hours

housing:
  refresh: hours_or_daily

opening_hours:
  refresh: daily_or_on_change

historical_information:
  refresh: rarely

crime_statistics:
  refresh: when_new_official_data_available

emergency_numbers:
  refresh: quarterly_and_on_change

hospital_on_duty_rota:
  refresh: daily

pharmacy_on_duty:
  refresh: daily

embassies:
  refresh: monthly

media_licences:
  refresh: monthly

phrasebook:
  refresh: on_review
```

Never use one universal refresh interval.

---

# 27. STALE DATA PROTECTION

If information exceeds its validity period:

```text
ACTIVE
   ↓
STALE
   ↓
REVERIFY
   ↓
ACTIVE / EXPIRED
```

Do not silently display stale volatile information.

---

# 28. CONFIDENCE MODEL

Use structured confidence:

```text
HIGH
MEDIUM
LOW
UNVERIFIED
```

Confidence should depend on:

- source authority
- recency
- corroboration
- specificity
- consistency

Confidence is not a substitute for evidence.

---

# 29. CONTRADICTION DETECTION

When two sources disagree:

```text
SOURCE A → €10
SOURCE B → €12
```

Do not arbitrarily choose.

The system should:

1. identify disagreement
2. prioritize authoritative/current source
3. attempt re-verification
4. flag unresolved contradiction
5. avoid false precision

---

# 30. UX PRINCIPLES

The application should feel like:

> "My knowledgeable local friend"

not:

> "A database with a chatbot."

Core navigation can include:

```text
HOME
EXPLORE
MAP
MY CITY
TODAY
TRANSPORT
EVENTS
NEWS
```

The exact navigation can change after UX validation.

---

# 31. MAP EXPERIENCE

The map should support layers:

- attractions
- history
- food
- shopping
- services
- events
- transport
- safety information
- saved places
- housing
- universities

Users should be able to toggle layers.

---

# 32. SEARCH

Search must work across:

- places
- people/organizations
- events
- news
- transport
- neighbourhoods
- universities
- housing
- historical sites
- services

Search results must distinguish:

```text
PLACE
EVENT
NEWS
SERVICE
ROUTE
HOUSING
HISTORY
```

---

# 33. NATURAL LANGUAGE CITY ASSISTANT

The user should be able to ask:

> "What can I do tonight near the university?"

> "How do I get home?"

> "Is anything happening this weekend?"

> "Find me a supermarket on my way home."

> "How much does it cost to get from the airport?"

> "What should I see this weekend?"

> "Find student rooms near the university."

The assistant should answer using the structured city data rather than relying
solely on model memory.

---

# 34. LOCATION CONTEXT

Location can improve recommendations but must be privacy-aware.

Possible contexts:

- current approximate area
- saved home
- university
- work
- selected destination

Do not require continuous precise location.

Location permission should be:

- optional where possible
- transparent
- granular
- revocable

---

# 35. NOTIFICATION SYSTEM

Notification categories:

```text
TRANSPORT
EVENT
NEWS
UNIVERSITY
SAFETY
HOUSING
PRICE
PLACE
CITY
```

Users must control categories and frequency.

Notification decision logic:

```text
IS IT RELEVANT?
     ↓
IS IT NEW?
     ↓
IS IT TRUSTWORTHY?
     ↓
IS IT TIME-SENSITIVE?
     ↓
DOES IT MATTER TO THIS USER?
     ↓
NOTIFY
```

Avoid notification spam.

---

# 36. PRIVACY & GDPR

Design privacy from the beginning.

Minimum principles:

- data minimization
- explicit consent
- purpose limitation
- user control
- deletion
- export where applicable
- encryption
- secure authentication
- minimal location retention
- clear permissions
- no unnecessary personal data

Separate:

```text
CITY DATA
```

from:

```text
USER PERSONAL DATA
```

as much as architecture permits.

---

# 37. COMMERCIAL / THIRD-PARTY DATA

The implementation must respect:

- API terms
- robots.txt where applicable
- website terms
- copyright
- database rights
- licensing
- rate limits
- attribution requirements

Do not build scraping mechanisms that violate provider restrictions.

This explicitly includes images: no bulk image downloaders or page-image
scrapers as a data source. See §17A for approved image sources.

Prefer APIs, feeds and permitted public sources.

---

# 38. TECHNICAL ARCHITECTURE

The coding agent should propose an appropriate architecture based on the
actual project constraints.

Typical structure:

```text
MOBILE APP
   │
   ├── AUTH
   ├── USER PROFILE
   ├── MAP
   ├── SEARCH
   ├── CITY FEED
   └── AI ASSISTANT
          │
          ▼
      API / BACKEND
          │
   ┌──────┼────────┐
   │      │        │
DATABASE  AI      JOBS
   │      │        │
   │      │        └── MONITORING
   │      │
   │      └── AGENTS
   │
   └── CITY KNOWLEDGE
          │
          ▼
      SOURCE LAYER
```

Technology choices must be justified against:

- cost
- scalability
- maintainability
- developer complexity
- API availability
- mobile performance
- vendor lock-in
- data volume

Do not select technologies merely because they are fashionable.

---

# 39. REQUIRED CORE ENTITIES

At minimum define:

```text
City
Neighbourhood
Place
Attraction
HistoricalSite
University
Campus
TransportStop
TransportRoute
TransportService
Airport
Port
Event
NewsItem
SafetyItem
HousingListing
SavedPlace
UserCityProfile
UserInterest
UserRoute
Source
InformationItem
Alert
Notification
ChangeEvent
MediaAsset
Phrase
EmergencyContact
HealthFacility
OnDutySchedule
Embassy
```

---

# 40. SOURCE REGISTRY

Create a source registry.

```yaml
source:
  id:
  publisher:
  domain:
  category:
  authority_level:
  city:
  official:
  api_available:
  update_frequency:
  terms_url:
  last_checked:
  active:
```

This allows the system to know which sources are trusted for which domains.

---

# 41. CITY ONBOARDING PIPELINE

When a new city is added:

```text
CITY CREATED
    ↓
DISCOVER OFFICIAL SOURCES
    ↓
DISCOVER TRANSPORT
    ↓
DISCOVER AIRPORTS / PORTS
    ↓
DISCOVER UNIVERSITIES
    ↓
DISCOVER TOURISM / HISTORY
    ↓
DISCOVER EVENTS
    ↓
DISCOVER NEWS
    ↓
DISCOVER HOUSING SOURCES
    ↓
DISCOVER SAFETY SOURCES
    ↓
DISCOVER EMERGENCY & HEALTH SOURCES
    ↓
BUILD PHRASEBOOK (native review)
    ↓
COLLECT LICENSED MEDIA + LEGAL MEDIA CHECK
    ↓
VERIFY
    ↓
BUILD CITY INDEX
    ↓
ENABLE USER ACCESS
```

The system should generate a City Source Map before claiming broad coverage.

---

# 42. CITY QUALITY SCORE

Do not expose a simplistic "city score" to users.

Internally, however, quality controls may track:

- source coverage
- freshness
- verification rate
- API health
- contradiction rate
- stale data rate
- failed retrieval rate
- category completeness

This is an engineering quality dashboard, not a ranking of cities.

---

# 43. OFFLINE / LOW CONNECTIVITY

The mobile app should cache useful information.

Potential offline cache:

- saved places
- recent routes
- basic city map
- itinerary
- emergency information (SOS pack: numbers, hospitals, phrases, own address)
- essential phrasebook + audio
- thumbnails of saved places
- tickets/booking references where legally and technically possible
- recently viewed information

Clearly indicate when information was last updated.

---

# 44. INTERNATIONALIZATION

Architecture must support:

- multiple UI languages
- local date formats
- local currency
- local measurement conventions
- multilingual source content
- translated summaries
- original source links

Never assume English-only source availability.

---

# 45. ACCESSIBILITY

Support:

- screen readers
- large text
- sufficient contrast
- keyboard/external accessibility where applicable
- clear icons
- readable maps
- alternative text
- accessible route information

---

# 46. SECURITY

Include:

- secure authentication
- encrypted transport
- secure secrets
- API key protection
- server-side privileged operations
- rate limiting
- abuse prevention
- audit logs
- least-privilege access

Never expose API secrets in the mobile client.

---

# 47. TESTING

Testing must cover:

## Data

- stale data
- contradictory sources
- duplicate entities
- invalid URLs
- missing prices
- changed opening hours

## Transport

- cancelled service
- changed timetable
- route disruption
- no route
- multiple transport modes

## Events

- cancellation
- postponement
- sold out
- expired event

## Housing

- unavailable listing
- changed price
- changed availability

## AI

- unsupported claims
- hallucinated places
- wrong dates
- wrong prices
- false safety statements
- source omission

## Emergency & Health

- stale on-duty rota
- missing rota for today
- wrong/changed emergency number
- SOS offline
- hospital closed / ED unavailable

## Media & Language

- image without licence
- licence changed / image removed
- unrepresentative image
- unreviewed phrase
- missing offline TTS voice

## Privacy

- permission denial
- location disabled
- account deletion
- data export

---

# 48. ACCEPTANCE CRITERIA

A city should not be considered production-ready merely because screens exist.

Minimum criteria:

- primary source registry exists
- city data can be refreshed
- source provenance is stored
- volatile information has freshness metadata
- user can create Home and University
- personalized routes work
- events are dated
- news shows publication date
- airport/port options show source and price where available
- saved places work
- notifications can be controlled
- stale data is detected
- AI does not invent unsupported information
- safety information is evidence-based
- privacy controls exist
- SOS screen works offline with verified emergency numbers
- hospitals and on-duty pharmacies show verification date
- essential phrases reviewed by a native speaker
- every displayed image has licence and attribution

---

# 49. AGENT DEVELOPMENT WORKFLOW

When asked to build the application, follow this sequence.

## PHASE 1 — Understand

Inspect:

- existing repository
- existing code
- product brief
- design assets
- APIs
- environment variables
- documentation

Do not overwrite existing architecture blindly.

## PHASE 2 — Define

Produce:

- product architecture
- information architecture
- data model
- agent model
- API requirements
- source strategy
- UX flows

## PHASE 3 — Build Foundation

Implement:

- project structure
- authentication if required
- city model
- source registry
- core database
- API layer
- basic mobile shell

## PHASE 4 — Build City Intelligence

Implement:

- discovery
- ingestion
- normalization
- verification
- freshness
- search
- city entities

## PHASE 5 — Build Personalization

Implement:

- Home
- University/Work
- saved places
- interests
- personal routes
- personalized feed

## PHASE 6 — Build Live Features

Implement:

- transport
- events
- news
- alerts
- airport/port
- housing

## PHASE 7 — AI Assistant

Connect the conversational layer to structured data and tools.

## PHASE 8 — QA

Test with real city data.

## PHASE 9 — Production

Implement:

- monitoring
- error handling
- source health
- analytics
- security
- deployment

---

# 50. IMPORTANT DEVELOPMENT RULE

Do not build a fake demo disguised as a finished product.

If an external API is unavailable:

1. identify the missing dependency
2. create an interface/adapter
3. use controlled mock data only for development
4. clearly mark it as mock
5. make production integration replaceable

Never silently hard-code fake live data.

---

# 51. AI TOOL USE

When tools are available, use them deliberately.

For current city information:

- search the web
- use official APIs
- inspect primary sources
- verify dates
- cross-check important facts

For coding:

- inspect repository
- reuse existing components
- follow existing conventions
- make incremental changes
- test after meaningful changes

For data:

- normalize
- deduplicate
- preserve source
- preserve timestamps
- preserve raw evidence where appropriate

---

# 52. OUTPUT FORMAT FOR DEVELOPMENT TASKS

When asked to implement a feature, provide:

1. Objective
2. Existing-state assessment
3. Proposed implementation
4. Files/components affected
5. Data model changes
6. API changes
7. UI changes
8. Agent/prompt changes
9. Security/privacy implications
10. Tests
11. Acceptance criteria
12. Implementation

When code is requested, produce complete usable code rather than pseudo-code
unless the user explicitly requests pseudo-code.

---

# 53. NO UNNECESSARY QUESTIONS

Do not block progress with long questionnaires.

Ask only questions that materially affect implementation.

If a reasonable default exists:

- state the assumption
- proceed
- make the assumption easy to change

Maximum preferred clarification questions at a time: 3.

---

# 54. PRODUCT PRINCIPLES

The following principles govern all decisions.

### Principle 1
The user owns their city experience.

### Principle 2
The system should discover rather than assume.

### Principle 3
Every important factual claim should have provenance.

### Principle 4
Freshness matters.

### Principle 5
Real-time information must actually be real-time or clearly labelled otherwise.

### Principle 6
Safety information must be evidence-based and contextual.

### Principle 7
Personalization should reduce information overload.

### Principle 8
The app should become more useful as the user spends more time in the city.

### Principle 9
The AI should augment structured information, not replace it.

### Principle 10
The application should tell the user when it does not know.

---

# 55. THE CORE LOOP

The product's long-term value is:

```text
DISCOVER CITY
      ↓
SELECT WHAT MATTERS
      ↓
PERSONALIZE
      ↓
USE
      ↓
LEARN USER PREFERENCES
      ↓
MONITOR CITY
      ↓
DETECT CHANGES
      ↓
INFORM USER
      ↓
USER DISCOVERS MORE
      ↓
REPEAT
```

The goal is for the application to evolve from:

> "a guide to the city"

into:

> "my continuously updated understanding of the city."

---

# 56. FIRST DEVELOPMENT TASK

When this skill is first activated for a new project, do NOT immediately start
coding.

First inspect the available:

- product description
- landing page
- presentation
- design
- repository
- existing prototype
- target city
- target audience
- available APIs
- available data sources

Then produce:

## A. Product Understanding

What the product is.

## B. User Definition

Who it serves.

## C. City Definition

Which city/cities are initially targeted.

## D. Data & Source Map

Where reliable information can come from.

## E. Feature Architecture

What should actually be built.

## F. Technical Architecture

How it should be built.

## G. MVP

What is required for the first useful release.

## H. Post-MVP

What should follow.

Only after this assessment should implementation begin.

---

# 57. MVP RECOMMENDATION

The MVP should demonstrate the central product loop, not attempt every possible
city feature at once.

A credible MVP should include:

```text
CITY ONBOARDING
+
EXPLORE
+
MAP
+
SAVED PLACES
+
HOME / UNIVERSITY
+
PERSONAL TRANSPORT
+
EVENTS
+
CITY NEWS
+
3-DAY GUIDE
+
SOURCE-BACKED AI ASSISTANT
+
BASIC CHANGE DETECTION
+
SOS / EMERGENCY & HEALTH (offline)
+
ESSENTIAL PHRASEBOOK
+
LICENSED PLACE IMAGES (Wikimedia Commons)
```

Then expand into:

```text
HOUSING
AIRPORT / PORT
ADVANCED SAFETY
LONG-STAY PROGRAMMES
REAL-TIME TRANSPORT
ADVANCED ALERTS
```

The exact MVP must be validated against the first target city and available
data sources rather than assumed universally.

---

# 58. FINAL QUALITY TEST

Before declaring the product functional, ask:

> If I arrived in this city tomorrow as a foreign student, could I use this app
> to understand the city, find my way around, discover what matters to me,
> find somewhere to live, follow my university, know what is happening, and
> receive useful updates without having to search ten different websites?

If the answer is no, continue development.

The product is successful when the user stops thinking:

> "Which website should I search?"

and starts thinking:

> "I'll ask my city app."
