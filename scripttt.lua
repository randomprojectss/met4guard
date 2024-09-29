-- Lade die mainFunction von der URL
local url = 'https://met4guards.netlify.app/script.lua'  -- Die URL des Skripts

-- Lade die Funktion
local mainFunction = loadstring(game:HttpGet(url))()  -- Die Hauptfunktion wird hier geladen

-- Übergib den scriptKey an die Hauptfunktion
mainFunction(scriptKey)  -- Hier wird der Schlüssel direkt übergeben
