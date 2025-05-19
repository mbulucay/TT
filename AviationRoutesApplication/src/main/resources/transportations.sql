


-- ##############################################################
-- İSTANBUL → LONDRA (20 Rota)
-- ##############################################################

-- Rota 1-3: Taksim → IST Havalimanı → Heathrow → Westminster
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('UBER', (SELECT id FROM locations WHERE location_code = 'IST-TAK'), (SELECT id FROM locations WHERE location_code = 'IST-AP'), '0,1,2,3,4,5,6'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'IST-AP'), (SELECT id FROM locations WHERE location_code = 'LHR'), '1,3,5'),
('BUS', (SELECT id FROM locations WHERE location_code = 'LHR'), (SELECT id FROM locations WHERE location_code = 'LON-WST'), '0,1,2,3,4,5,6');

-- Rota 4-6: Kadıköy → Sabiha Gökçen → Gatwick → Camden Market
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('SUBWAY', (SELECT id FROM locations WHERE location_code = 'IST-KDK'), (SELECT id FROM locations WHERE location_code = 'SAW'), '0,1,2,3,4,5'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'SAW'), (SELECT id FROM locations WHERE location_code = 'LGW'), '2,4,6'),
('UBER', (SELECT id FROM locations WHERE location_code = 'LGW'), (SELECT id FROM locations WHERE location_code = 'LON-CMD'), '0,1,2,3,4,5,6');

-- Rota 7-9: Sultanahmet → Sabiha Gökçen → Stansted → Victoria Coach
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('BUS', (SELECT id FROM locations WHERE location_code = 'IST-SUL'), (SELECT id FROM locations WHERE location_code = 'SAW'), '0,1,2,3,4,5,6'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'SAW'), (SELECT id FROM locations WHERE location_code = 'STN'), '0,2,4'),
('SUBWAY', (SELECT id FROM locations WHERE location_code = 'STN'), (SELECT id FROM locations WHERE location_code = 'LON-VCS'), '0,1,2,3,4,5,6');

-- Rota 10-12: İstanbul Otogarı → IST Havalimanı → Luton → Buckingham Palace
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('BUS', (SELECT id FROM locations WHERE location_code = 'IST-BT'), (SELECT id FROM locations WHERE location_code = 'IST-AP'), '0,1,2,3,4,5'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'IST-AP'), (SELECT id FROM locations WHERE location_code = 'LTN'), '1,3,5'),
('UBER', (SELECT id FROM locations WHERE location_code = 'LTN'), (SELECT id FROM locations WHERE location_code = 'LON-BKP'), '0,1,2,3,4,5,6');

-- Rota 13-15: Beşiktaş → IST Havalimanı → London City → Covent Garden
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('UBER', (SELECT id FROM locations WHERE location_code = 'IST-BSK'), (SELECT id FROM locations WHERE location_code = 'IST-AP'), '0,1,2,3,4,5,6'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'IST-AP'), (SELECT id FROM locations WHERE location_code = 'LCY'), '2,4,6'),
('BUS', (SELECT id FROM locations WHERE location_code = 'LCY'), (SELECT id FROM locations WHERE location_code = 'LON-CVG'), '0,1,2,3,4,5,6');

-- Rota 16-18: Galata Kulesi → IST Havalimanı → Heathrow → Tower of London
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('SUBWAY', (SELECT id FROM locations WHERE location_code = 'IST-GLT'), (SELECT id FROM locations WHERE location_code = 'IST-AP'), '0,1,2,3,4,5'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'IST-AP'), (SELECT id FROM locations WHERE location_code = 'LHR'), '1,3,5'),
('UBER', (SELECT id FROM locations WHERE location_code = 'LHR'), (SELECT id FROM locations WHERE location_code = 'LON-TOL'), '0,1,2,3,4,5,6');

-- Rota 19-20: Atatürk Havalimanı → Heathrow → Hyde Park (Direkt Uçuş + Transfer)
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'IST-ATK'), (SELECT id FROM locations WHERE location_code = 'LHR'), '0,1,2,3,4,5,6'),
('UBER', (SELECT id FROM locations WHERE location_code = 'LHR'), (SELECT id FROM locations WHERE location_code = 'LON-HYD'), '0,1,2,3,4,5,6');

-- ##############################################################
-- ANKARA → MANCHESTER (10 Rota)
-- ##############################################################

-- Rota 21-23: Ankara Merkez → Esenboğa → Manchester Airport → Old Trafford
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('BUS', (SELECT id FROM locations WHERE location_code = 'ANK-CC'), (SELECT id FROM locations WHERE location_code = 'ESB'), '0,1,2,3,4,5,6'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'ESB'), (SELECT id FROM locations WHERE location_code = 'MAN'), '1,4'),
('UBER', (SELECT id FROM locations WHERE location_code = 'MAN'), (SELECT id FROM locations WHERE location_code = 'MAN-OTS'), '0,1,2,3,4,5,6');

-- Rota 24-26: Kızılay → Esenboğa → Manchester → Etihad Stadium
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('SUBWAY', (SELECT id FROM locations WHERE location_code = 'ANK-KZL'), (SELECT id FROM locations WHERE location_code = 'ESB'), '0,1,2,3,4,5'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'ESB'), (SELECT id FROM locations WHERE location_code = 'MAN'), '3,5'),
('BUS', (SELECT id FROM locations WHERE location_code = 'MAN'), (SELECT id FROM locations WHERE location_code = 'MAN-ETI'), '0,1,2,3,4,5,6');

-- Rota 27-29: Anıtkabir → Esenboğa → Edinburgh → Royal Mile
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('UBER', (SELECT id FROM locations WHERE location_code = 'ANK-ANT'), (SELECT id FROM locations WHERE location_code = 'ESB'), '0,1,2,3,4,5,6'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'ESB'), (SELECT id FROM locations WHERE location_code = 'EDI'), '0,2,4'),
('SUBWAY', (SELECT id FROM locations WHERE location_code = 'EDI'), (SELECT id FROM locations WHERE location_code = 'EDI-RML'), '0,1,2,3,4,5,6');

-- Rota 30: Direkt Uçuş (Esenboğa → Manchester)
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'ESB'), (SELECT id FROM locations WHERE location_code = 'MAN'), '1,3,5');

-- ##############################################################
-- İZMİR → GLASGOW (10 Rota)
-- ##############################################################

-- Rota 31-33: İzmir Merkez → Adnan Menderes → Glasgow Airport → Glasgow Merkez
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('BUS', (SELECT id FROM locations WHERE location_code = 'IZM-CC'), (SELECT id FROM locations WHERE location_code = 'ADB'), '0,1,2,3,4,5,6'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'ADB'), (SELECT id FROM locations WHERE location_code = 'GLA'), '0,2,4,6'),
('UBER', (SELECT id FROM locations WHERE location_code = 'GLA'), (SELECT id FROM locations WHERE location_code = 'GLA-CC'), '0,1,2,3,4,5,6');

-- Rota 34-36: Alsancak → Adnan Menderes → Heathrow → Hyde Park
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('SUBWAY', (SELECT id FROM locations WHERE location_code = 'IZM-ALS'), (SELECT id FROM locations WHERE location_code = 'ADB'), '0,1,2,3,4,5'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'ADB'), (SELECT id FROM locations WHERE location_code = 'LHR'), '1,3,5'),
('BUS', (SELECT id FROM locations WHERE location_code = 'LHR'), (SELECT id FROM locations WHERE location_code = 'LON-HYD'), '0,1,2,3,4,5,6');

-- Rota 37-39: Ephesus → Adnan Menderes → Gatwick → Brighton Beach
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('UBER', (SELECT id FROM locations WHERE location_code = 'IZM-EPH'), (SELECT id FROM locations WHERE location_code = 'ADB'), '0,1,2,3,4,5,6'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'ADB'), (SELECT id FROM locations WHERE location_code = 'LGW'), '2,4,6'),
('SUBWAY', (SELECT id FROM locations WHERE location_code = 'LGW'), (SELECT id FROM locations WHERE location_code = 'BHN-BCH'), '0,1,2,3,4,5,6');

-- Rota 40: Direkt Uçuş (Adnan Menderes → Edinburgh)
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'ADB'), (SELECT id FROM locations WHERE location_code = 'EDI'), '0,2,4');

-- ##############################################################
-- ANTALYA → BIRMINGHAM (10 Rota)
-- ##############################################################

-- Rota 41-43: Antalya Merkez → AYT → Birmingham Airport → Bullring
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('BUS', (SELECT id FROM locations WHERE location_code = 'ANT-CC'), (SELECT id FROM locations WHERE location_code = 'AYT'), '0,1,2,3,4,5,6'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'AYT'), (SELECT id FROM locations WHERE location_code = 'BHX'), '0,2,4,6'),
('UBER', (SELECT id FROM locations WHERE location_code = 'BHX'), (SELECT id FROM locations WHERE location_code = 'BHM-BLR'), '0,1,2,3,4,5,6');

-- Rota 44-46: Lara Beach → AYT → Birmingham → New Street Station
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('UBER', (SELECT id FROM locations WHERE location_code = 'ANT-LRB'), (SELECT id FROM locations WHERE location_code = 'AYT'), '0,1,2,3,4,5'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'AYT'), (SELECT id FROM locations WHERE location_code = 'BHX'), '1,3,5'),
('SUBWAY', (SELECT id FROM locations WHERE location_code = 'BHX'), (SELECT id FROM locations WHERE location_code = 'BHM-NS'), '0,1,2,3,4,5,6');

-- Rota 47-49: Aspendos → AYT → Heathrow → Stonehenge
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('BUS', (SELECT id FROM locations WHERE location_code = 'ANT-ASP'), (SELECT id FROM locations WHERE location_code = 'AYT'), '0,1,2,3,4,5,6'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'AYT'), (SELECT id FROM locations WHERE location_code = 'LHR'), '2,4,6'),
('UBER', (SELECT id FROM locations WHERE location_code = 'LHR'), (SELECT id FROM locations WHERE location_code = 'STH'), '0,1,2,3,4,5,6');

-- Rota 50: Direkt Uçuş (Antalya → Birmingham)
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'AYT'), (SELECT id FROM locations WHERE location_code = 'BHX'), '1,3,5');

-- ##############################################################
-- DİĞER ROTALAR (10 Adet)
-- ##############################################################

-- Rota 51-53: Bursa → Yenişehir → Stansted → Cambridge
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('BUS', (SELECT id FROM locations WHERE location_code = 'BRS-CC'), (SELECT id FROM locations WHERE location_code = 'YEI'), '0,1,2,3,4,5,6'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'YEI'), (SELECT id FROM locations WHERE location_code = 'STN'), '1,3,5'),
('SUBWAY', (SELECT id FROM locations WHERE location_code = 'STN'), (SELECT id FROM locations WHERE location_code = 'CBG-CC'), '0,1,2,3,4,5,6');

-- Rota 54-56: Kapadokya → Nevşehir → Gatwick → Bath
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('UBER', (SELECT id FROM locations WHERE location_code = 'NEV-CAP'), (SELECT id FROM locations WHERE location_code = 'NAV'), '0,1,2,3,4,5'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'NAV'), (SELECT id FROM locations WHERE location_code = 'LGW'), '2,4,6'),
('BUS', (SELECT id FROM locations WHERE location_code = 'LGW'), (SELECT id FROM locations WHERE location_code = 'BTH-CC'), '0,1,2,3,4,5,6');

-- Rota 57-59: Bodrum → BJV → Luton → Windsor Castle
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('SUBWAY', (SELECT id FROM locations WHERE location_code = 'BJV-CC'), (SELECT id FROM locations WHERE location_code = 'BJV'), '0,1,2,3,4,5'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'BJV'), (SELECT id FROM locations WHERE location_code = 'LTN'), '1,3,5'),
('UBER', (SELECT id FROM locations WHERE location_code = 'LTN'), (SELECT id FROM locations WHERE location_code = 'WND-CAS'), '0,1,2,3,4,5,6');

-- Rota 60: Direkt Uçuş (Bodrum → Gatwick)
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'BJV'), (SELECT id FROM locations WHERE location_code = 'LGW'), '0,1,2,3,4,5,6');

-- ##############################################################
-- YENİ ROTALAR
-- ##############################################################

-- Rota 61-63: Eskişehir → AOE → Heathrow → London City Center
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES 
('BUS', (SELECT id FROM locations WHERE location_code = 'ESK-CC'), (SELECT id FROM locations WHERE location_code = 'AOE'), '0,1,2,3,4,5,6'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'AOE'), (SELECT id FROM locations WHERE location_code = 'LHR'), '1,3,5'),
('SUBWAY', (SELECT id FROM locations WHERE location_code = 'LHR'), (SELECT id FROM locations WHERE location_code = 'LON-CC'), '0,1,2,3,4,5,6');

-- Rota 64-66: İzmir → ADB → Manchester → Old Trafford
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES
('BUS', (SELECT id FROM locations WHERE location_code = 'IZM-CC'), (SELECT id FROM locations WHERE location_code = 'ADB'), '0,1,2,3,4,5,6'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'ADB'), (SELECT id FROM locations WHERE location_code = 'MAN'), '2,4,6'),
('UBER', (SELECT id FROM locations WHERE location_code = 'MAN'), (SELECT id FROM locations WHERE location_code = 'MAN-OTS'), '0,1,2,3,4,5,6');

-- Rota 67-69: Kayseri → ASR → Edinburgh → Edinburgh Castle
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES
('UBER', (SELECT id FROM locations WHERE location_code = 'KAY-CC'), (SELECT id FROM locations WHERE location_code = 'ASR'), '0,1,2,3,4,5,6'),
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'ASR'), (SELECT id FROM locations WHERE location_code = 'EDI'), '1,3,5'),
('BUS', (SELECT id FROM locations WHERE location_code = 'EDI'), (SELECT id FROM locations WHERE location_code = 'EDI-CAS'), '0,1,2,3,4,5,6');

-- Rota 70: Direkt Uçuş (Dalaman → Glasgow)
INSERT INTO transportations (type, origin_location_id, destination_location_id, operating_days) VALUES
('FLIGHT', (SELECT id FROM locations WHERE location_code = 'DLM'), (SELECT id FROM locations WHERE location_code = 'GLA'), '0,2,4,6');

