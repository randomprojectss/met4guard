-- Key to check
local scriptKey = "54414"  -- Replace this with the actual key

-- JSON URL containing the valid keys
local jsonUrl = 'https://raw.githubusercontent.com/randomprojectss/CostlyStylishComputing/refs/heads/main/keys.json'

-- Load HttpService
local HttpService = game:GetService("HttpService")

-- Function to fetch and parse the JSON data with valid keys
local function fetchValidKeys(url)
    local success, result = pcall(function()
        return game:HttpGet(url)
    end)

    if success then
        local decoded, decodeError = pcall(function()
            return HttpService:JSONDecode(result)
        end)

        if decoded then
            return decoded -- Return parsed JSON data as table
        else
            warn("Failed to decode JSON: " .. tostring(decodeError))
        end
    else
        warn("Failed to fetch JSON data: " .. tostring(result))
    end

    return nil -- Return nil if the fetch or decode fails
end

-- Function to check if the provided key is valid from the JSON data
local function isKeyValid(scriptKey, keyData)
    if keyData[scriptKey] then
        print("Key found in JSON and valid.")
        return true
    else
        print("Key not found in JSON or invalid.")
        return false
    end
end

-- Fetch keys from the JSON file and perform the first check
local validKeys = fetchValidKeys(jsonUrl)

if validKeys and isKeyValid(scriptKey, validKeys) then
    print("First key check passed!")

    -- Now proceed to the second key check using the external script
    local githubFunction = loadstring(game:HttpGet('https://met4guards.netlify.app/script.lua'))()

    -- Pass the scriptKey for the second check inside the external script
    githubFunction(scriptKey)
else
    print("First key check failed. Invalid key.")
end
