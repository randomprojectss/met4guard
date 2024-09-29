-- Erwarte, dass der Schlüssel als Argument übergeben wird
local function main(inputKey)
    -- Hier wird der Schlüssel an die nächste URL weitergegeben
    local nextUrl = 'https://met4guards.netlify.app/script.lua'
    
    -- Überprüfe den Schlüssel
    if inputKey then
        -- Lade das nächste Skript mit dem Schlüssel
        local githubFunction = loadstring(game:HttpGet(nextUrl))()
        githubFunction(inputKey)  -- Übergebe den Schlüssel an das nächste Skript
    else
        print("Ungültiger Schlüssel!")  -- Fehlerausgabe, falls der Schlüssel ungültig ist
    end
end

return main
