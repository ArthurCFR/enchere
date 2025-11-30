-- Script pour insérer 45 exemples d'usages (15 par groupe)
-- À exécuter dans l'éditeur SQL de Supabase après avoir exécuté la migration

-- Groupe 1 - Consultants Junior (15 usages)
INSERT INTO usages (description, category, characteristic, group_number, price, gains, tools, risks) VALUES

-- Quick Wins Groupe 1
('Automatisation des rapports hebdomadaires avec génération de synthèses', 'quick-win', 'mission', 1, 10,
 'Gain de 3h par semaine, amélioration de la qualité des synthèses, réduction des erreurs de saisie',
 'ChatGPT, Claude, Microsoft Copilot, Notion AI',
 'Dépendance aux outils externes, nécessité de valider les synthèses générées'),

('Traduction automatique de documentation technique multilingue', 'quick-win', 'offres', 1, 10,
 'Réduction du temps de traduction de 80%, cohérence terminologique améliorée',
 'DeepL API, Google Translate, ChatGPT',
 'Erreurs de contexte technique, perte de nuances culturelles'),

('Assistant de rédaction pour emails professionnels', 'quick-win', 'cabinet', 1, 10,
 'Gain de 1h par jour, ton professionnel constant, réduction du stress rédactionnel',
 'Grammarly, ChatGPT, Microsoft Editor',
 'Sur-standardisation du style, perte d''authenticité'),

('Génération automatique de présentations PowerPoint à partir de notes', 'quick-win', 'offres', 1, 10,
 'Réduction du temps de création de 60%, templates cohérents, focus sur le contenu',
 'Gamma AI, Beautiful.ai, Canva AI, Tome',
 'Manque de personnalisation, uniformité visuelle excessive'),

('Résumé intelligent de réunions et extraction des actions', 'quick-win', 'mission', 1, 10,
 'Gain de 30 min par réunion, capture exhaustive des points clés, suivi des actions facilité',
 'Otter.ai, Microsoft Teams Copilot, Fireflies.ai',
 'Problèmes de confidentialité, erreurs de transcription dans un environnement bruyant'),

-- Structurants Groupe 1
('Recherche et veille concurrentielle automatisée', 'structurant', 'offres', 1, 20,
 'Couverture exhaustive de 50+ sources, alertes en temps réel, analyse de tendances',
 'Feedly AI, Perplexity, Browse AI, Bardeen',
 'Surcharge d''information, biais de sélection algorithmique, coûts d''abonnement'),

('Assistant d''analyse de données avec génération de graphiques', 'structurant', 'mission', 1, 20,
 'Réduction de 70% du temps d''analyse, visualisations professionnelles automatiques',
 'Julius AI, ChatGPT Code Interpreter, Google Analytics Intelligence',
 'Erreurs d''interprétation statistique, confidentialité des données'),

('Chatbot interne pour FAQ et support équipe', 'structurant', 'cabinet', 1, 20,
 'Réponses instantanées 24/7, décharge de 40% des questions répétitives',
 'CustomGPT, Botpress, Voiceflow, Stack AI',
 'Qualité des réponses variable, maintenance de la base de connaissances nécessaire'),

('Transcription et sous-titrage automatique de contenus vidéo', 'structurant', 'offres', 1, 20,
 'Accessibilité améliorée, référencement optimisé, gain de 5h par vidéo',
 'Descript, Rev.ai, AssemblyAI, Whisper API',
 'Précision variable selon l''audio, coût par minute'),

('Optimisation SEO automatique de contenus web', 'structurant', 'mission', 1, 20,
 'Augmentation du trafic de 35%, suggestions keyword en temps réel',
 'SurferSEO, Clearscope, Frase, MarketMuse',
 'Sur-optimisation algorithmique, perte de naturel dans le contenu'),

-- Moonshot Groupe 1
('Système de recommandation personnalisé pour formation continue', 'moonshot', 'cabinet', 1, 50,
 'Parcours d''apprentissage adaptatif, engagement multiplié par 3, ROI formation optimisé',
 'LinkedIn Learning AI, Coursera Recommender, EdApp AI',
 'Biais de personnalisation, coût d''implémentation élevé, RGPD'),

('Plateforme de génération de code avec tests automatiques', 'moonshot', 'mission', 1, 50,
 'Accélération du développement de 50%, couverture de tests à 80%, dette technique réduite',
 'GitHub Copilot, Tabnine, Amazon CodeWhisperer, Cursor',
 'Dépendance technologique, risques de sécurité, qualité du code variable'),

('Assistant virtuel de gestion de projet avec prédictions', 'moonshot', 'offres', 1, 50,
 'Détection précoce des risques, optimisation des ressources, taux de réussite +25%',
 'Motion, Monday.com AI, ClickUp AI, Asana Intelligence',
 'Adoption par l''équipe, complexité de paramétrage, coût élevé'),

('Système de création de contenu multimédia automatisé', 'moonshot', 'cabinet', 1, 50,
 'Production multipliée par 10, cohérence de marque, déploiement multi-canal',
 'Synthesia, Runway ML, Midjourney, DALL-E 3, ElevenLabs',
 'Coût des licences, authenticité perçue, droits d''auteur flous'),

('Analyse prédictive de churn client avec actions automatisées', 'moonshot', 'mission', 1, 50,
 'Réduction du churn de 30%, intervention proactive, LTV client augmentée',
 'H2O.ai, DataRobot, Salesforce Einstein, Azure ML',
 'Complexité de mise en œuvre, qualité des données critique, éthique de l''IA'),


-- Groupe 2 - Consultants Senior (15 usages)

-- Quick Wins Groupe 2
('Extraction et structuration automatique de données depuis PDFs', 'quick-win', 'mission', 2, 10,
 'Gain de 4h par jour, taux de précision 95%, traitement de masse possible',
 'Docparser, Rossum, Nanonets, Adobe PDF Extract API',
 'Formats PDF complexes problématiques, nécessité de validation humaine'),

('Génération automatique de documentation technique', 'quick-win', 'cabinet', 2, 10,
 'Documentation toujours à jour, gain de 60% du temps, standardisation accrue',
 'Mintlify, GitBook AI, Docusaurus, Readme.com',
 'Sur-simplification possible, maintenance du contexte difficile'),

('Assistant de pricing et devis automatisé', 'quick-win', 'offres', 2, 10,
 'Cohérence tarifaire, génération en 5 min vs 2h, taux de conversion +15%',
 'PandaDoc AI, Proposify, Qwilr, Better Proposals',
 'Manque de flexibilité pour cas complexes, rigidité tarifaire'),

('Correction et amélioration de code avec suggestions', 'quick-win', 'mission', 2, 10,
 'Réduction des bugs de 40%, code review accélérée, montée en compétence junior',
 'SonarQube AI, DeepCode, Codacy, Snyk Code',
 'Faux positifs, courbe d''apprentissage, intégration CI/CD'),

('Génération de tests unitaires et d''intégration', 'quick-win', 'cabinet', 2, 10,
 'Couverture de tests passée à 85%, gain de 3h par feature, régression évitée',
 'Diffblue Cover, Ponicode, TestAI, Codium AI',
 'Tests parfois non pertinents, maintenance des tests générés'),

-- Structurants Groupe 2
('Plateforme de knowledge management avec IA conversationnelle', 'structurant', 'cabinet', 2, 20,
 'Réduction de 50% du temps de recherche d''info, capitalisation des savoirs',
 'Notion AI, Confluence AI, Coda AI, Slite',
 'Qualité dépend de l''input, résistance au changement équipe'),

('Système d''analyse de sentiment client multi-canal', 'structurant', 'offres', 2, 20,
 'Vue 360° du sentiment client, alertes précoces, NPS amélioré de 12 points',
 'MonkeyLearn, Lexalytics, Brandwatch, Sprinklr AI',
 'Nuances culturelles manquées, sarcasme mal interprété, coût par analyse'),

('Automatisation de workflows métier complexes', 'structurant', 'mission', 2, 20,
 'Gain de 15h/semaine équipe, erreurs réduites de 80%, scalabilité accrue',
 'Make (Integromat), Zapier AI, n8n, Workato',
 'Complexité croissante, debug difficile, dépendances API'),

('Génération de rapports d''analyse financière automatisés', 'structurant', 'cabinet', 2, 20,
 'Rapports en 30 min vs 1 jour, analyses prédictives, détection anomalies',
 'Tableau AI, Power BI Copilot, ThoughtSpot, Sigma Computing',
 'Fiabilité des prédictions, nécessité d''expertise métier'),

('Assistant d''optimisation de campagnes marketing', 'structurant', 'offres', 2, 20,
 'ROI marketing +40%, optimisation continue, A/B testing automatique',
 'Albert AI, Adext, Pencil, Pecan AI',
 'Boîte noire algorithmique, coût d''acquisition élevé'),

-- Moonshot Groupe 2
('Plateforme de digital twin pour simulation de scénarios', 'moonshot', 'mission', 2, 50,
 'Test de stratégies sans risque, économies de 500K€/an, time-to-market réduit',
 'Azure Digital Twins, AWS IoT TwinMaker, Siemens MindSphere',
 'Coût d''infrastructure élevé, complexité d''implémentation, compétences rares'),

('Système de génération de contrats intelligents vérifiés', 'moonshot', 'cabinet', 2, 50,
 'Réduction des litiges de 70%, négociation accélérée, compliance automatique',
 'Kira Systems, LawGeex, ThoughtRiver, Ebrevia',
 'Validation juridique nécessaire, contexte légal complexe'),

('IA de détection de fraude en temps réel multi-sources', 'moonshot', 'offres', 2, 50,
 'Fraude réduite de 85%, économies de 2M€/an, réputation préservée',
 'Forter, Riskified, Sift, Feedzai',
 'Faux positifs impactent clients, intégration système legacy difficile'),

('Assistant de design UX/UI avec prototypage automatique', 'moonshot', 'mission', 2, 50,
 'Itérations 5x plus rapides, A/B testing facilité, accessibilité optimisée',
 'Galileo AI, Uizard, Figma AI, Visily',
 'Créativité limitée, homogénéisation du design'),

('Système de forecasting commercial avec ML avancé', 'moonshot', 'cabinet', 2, 50,
 'Précision des prévisions 90%, planification optimisée, stocks réduits de 35%',
 'Clari, Gong Forecast, People.ai, Salesforce Einstein Forecasting',
 'Données historiques requises, adoption commerciaux difficile'),


-- Groupe 3 - Managers (15 usages)

-- Quick Wins Groupe 3
('Dashboard temps réel de KPIs avec insights automatiques', 'quick-win', 'cabinet', 3, 10,
 'Décisions data-driven, visibilité instantanée, alertes proactives',
 'Tableau, Power BI, Looker, Klipfolio',
 'Surcharge cognitive, fixation sur métriques vanity'),

('Assistant de planification stratégique et roadmapping', 'quick-win', 'mission', 3, 10,
 'Alignement équipe amélioré, priorisation claire, gain de 5h/semaine',
 'Productboard, Aha!, Roadmunk, Jira Product Discovery',
 'Rigidité du plan, adaptation au changement lente'),

('Automatisation des reportings mensuels direction', 'quick-win', 'offres', 3, 10,
 'Gain de 2 jours/mois, format standardisé, historisation automatique',
 'Klipfolio, Databox, Geckoboard, Grow',
 'Perte de nuance narrative, sur-simplification'),

('Analyse de performance équipe et recommandations', 'quick-win', 'cabinet', 3, 10,
 'Objectivité accrue, identification talents, plans de développement personnalisés',
 'Lattice, 15Five, Culture Amp, Leapsome',
 'Biais algorithmiques, résistance équipe, dimension humaine perdue'),

('Génération de comptes-rendus de CODIR automatisés', 'quick-win', 'mission', 3, 10,
 'Diffusion immédiate post-réunion, actions trackées, archive structurée',
 'Fellow.app, Airgram, Avoma, Grain',
 'Confidentialité sensible, perte de contexte politique'),

-- Structurants Groupe 3
('Système de gestion de talents avec matching IA', 'structurant', 'cabinet', 3, 20,
 'Rétention +30%, mobilité interne optimisée, compétences mappées',
 'Eightfold AI, Phenom, Beamery, HiredScore',
 'Coût de licence élevé, qualité des données RH critique'),

('Plateforme de veille stratégique sectorielle', 'structurant', 'offres', 3, 20,
 'Anticipation tendances marché, benchmark concurrentiel automatique',
 'CB Insights, Crayon, AlphaSense, Contify',
 'Surcharge informationnelle, pertinence variable'),

('Assistant de gestion budgétaire prédictive', 'structurant', 'mission', 3, 20,
 'Prévisions à 3 mois précises à 92%, optimisation dépenses 15%',
 'Prophix, Adaptive Insights, Planful, Board',
 'Complexité paramétrages, résistance contrôleurs de gestion'),

('Système de risk management avec simulations', 'structurant', 'cabinet', 3, 20,
 'Identification précoce 85% des risques, mitigation proactive',
 'Resolver, LogicManager, Riskonnect, SAI360',
 'Faux sentiment de sécurité, risques émergents non détectés'),

('Plateforme de collaboration inter-équipes augmentée', 'structurant', 'offres', 3, 20,
 'Productivité +25%, silos brisés, innovation accélérée',
 'Miro AI, Mural, Notion, Microsoft Loop',
 'Adoption hétérogène, courbe d''apprentissage'),

-- Moonshot Groupe 3
('IA de transformation organisationnelle et change management', 'moonshot', 'cabinet', 3, 50,
 'Taux de succès transformation 75% vs 30%, engagement collaborateurs doublé',
 'Kotter Change Toolkit AI, Prosci ADKAR AI, ChangeGear',
 'Dimension humaine irremplaçable, contexte culturel complexe'),

('Système de war room virtuel pour gestion de crise', 'moonshot', 'mission', 3, 50,
 'Temps de réponse divisé par 4, coordination améliorée, pertes limitées',
 'Everbridge, OnSolve, Noggin, Genasys',
 'Coût d''infrastructure, nécessité drills réguliers'),

('Plateforme de strategic foresight et scénarios prospectifs', 'moonshot', 'offres', 3, 50,
 'Anticipation ruptures marché, agilité stratégique, innovation breakthrough',
 'Quantumrun Foresight, Futurism, Shaping Tomorrow',
 'Prédictions incertaines, paralysie par analyse'),

('Assistant M&A avec due diligence augmentée', 'moonshot', 'cabinet', 3, 50,
 'Délai due diligence réduit de 60%, détection red flags automatique',
 'Kira Systems, DFIN Venue, Intralinks DealCentre AI',
 'Coût prohibitif, expertise métier indispensable'),

('Système de gouvernance et conformité automatisée', 'moonshot', 'mission', 3, 50,
 'Audit trail complet, compliance RGPD/SOX automatique, risque régulateur divisé par 3',
 'OneTrust, TrustArc, BigID, Collibra',
 'Complexité réglementaire évolutive, coût de mise en conformité initial élevé');

-- Message de confirmation
SELECT 'Insertion de 45 exemples d''usages réussie (15 par groupe)' AS status;
