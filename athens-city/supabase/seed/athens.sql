-- =============================================================================
-- Seed: Athens (first city)
-- Emergency numbers are seeded with status 'pending'. They must be verified
-- against Tier 1 sources and switched to 'verified' (with last_verified_at and
-- source_url) before release. See README "Verification checklist".
-- =============================================================================

insert into cities (id, name, name_local, country_code, language, timezone, currency, center, config)
values ('athens', 'Athens', 'Αθήνα', 'GR', 'el', 'Europe/Athens', 'EUR',
        st_setsrid(st_makepoint(23.7275, 37.9838), 4326)::geography,
        jsonb_build_object(
          'metropolitan_area', 'Attica basin incl. Piraeus',
          'phrasebook_language', 'el',
          'legal_media_restrictions', 'Commercial use of images of archaeological sites/monuments requires Ministry of Culture permission — legal check before monetisation'
        ));

insert into sources (id, city_id, name, publisher, url, tier, domain, access_method,
                     licence_notes, permission_status, refresh_policy) values
('gr.fsa.efimeries', 'athens',
 'Εφημερεύοντα Φαρμακεία (ΦΣΑ)', 'Φαρμακευτικός Σύλλογος Αττικής',
 'https://fsa-efimeries.gr/', 'tier1_official', 'pharmacy_rota', 'html',
 'Public web page, no published API or licence. One request per run. Permission request pending.',
 'not_requested', 'daily 08:20 + 14:30 + 20:30 Europe/Athens'),

('gr.moh.efimeries', 'athens',
 'Εφημερίες Νοσοκομείων', 'Υπουργείο Υγείας',
 'https://www.moh.gov.gr/articles/citizen/efhmeries-nosokomeiwn/', 'tier1_official', 'hospital_rota', 'manual',
 'Published as announcements/documents; ingestion format to be analysed. Manual review in MVP.',
 'not_required', 'daily 07:30 Europe/Athens'),

('gr.datagov.gtfs.stasy', 'athens',
 'GTFS Σταθερών Συγκοινωνιών (Μετρό, ΗΣΑΠ, Τραμ)', 'Σταθερές Συγκοινωνίες (ΣΤΑΣΥ) via data.gov.gr',
 'https://data.gov.gr/dataset/dromologia-statheron-sygkoinonion-metro-isap-tram', 'tier1_official', 'transport', 'gtfs',
 'Licence to confirm on dataset page before commercial use. Publisher disclaims accuracy beyond release date.',
 'not_required', 'weekly + on new release'),

('gr.oasa.telematics', 'athens',
 'OASA Telematics (real-time bus)', 'ΟΑΣΑ',
 'http://telematics.oasa.gr/', 'tier1_official', 'transport_realtime', 'api',
 'Undocumented endpoint (community-documented). No published terms/SLA. Use only behind adapter; request permission.',
 'not_requested', 'on demand, cached 30s');

-- Nationwide emergency numbers (GR) — status 'pending' until verified
insert into emergency_contacts (country_code, city_id, service, label_local, label_en, number, sort_order, status) values
('GR', null, 'general_emergency', 'Ευρωπαϊκός αριθμός έκτακτης ανάγκης', 'European emergency number', '112',  1, 'pending'),
('GR', null, 'ambulance',         'ΕΚΑΒ (Ασθενοφόρο)',                  'Ambulance (EKAB)',           '166',  2, 'pending'),
('GR', null, 'police',            'Αστυνομία',                           'Police',                     '100',  3, 'pending'),
('GR', null, 'fire',              'Πυροσβεστική',                        'Fire service',               '199',  4, 'pending'),
('GR', null, 'tourist_police',    'Τουριστική Αστυνομία',                'Tourist police',             '1571', 5, 'pending'),
('GR', null, 'coast_guard',       'Λιμενικό',                            'Coast guard',                '108',  6, 'pending');
