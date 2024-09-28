exports.handler = async (event, context) => {
    const { key } = event.queryStringParameters; // Get the key from query params

    // Validate the key
    if (key === "54414336041") { // Replace with your actual key
        // Return your Lua script
        return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain" },
            body: `
        local HttpService = game:GetService("HttpService")
        local Players = game:GetService("Players")
        local StarterGui = game:GetService("StarterGui")

        -- Ensure the game is loaded
        repeat wait() until game:IsLoaded()
        wait(2)

        -- Get the LocalPlayer's username and Client ID (HWID)
        local player = Players.LocalPlayer
        local username = player and player.Name or "Unknown"
        local clientId = game:GetService("RbxAnalyticsService"):GetClientId()

        -- Define the URL of your Discord webhook
        local webhookURL = "https://discord.com/api/webhooks/1281744707323695156/BsB0-2druVQuGaqfLBCsW6Jd76ooMEh0d-vhehEyP0UKe4aJpuUF0gThhEDCgIBSMINn"

        -- Set clipboard to the Client ID (if required)
        setclipboard(clientId)

        -- URL for the JSON file containing key statuses
        local jsonUrl = 'https://raw.githubusercontent.com/randomprojectss/CostlyStylishComputing/refs/heads/main/keys.json'

        -- Function to send a message to the Discord webhook
        local function sendWebhookMessage(content)
            local message = {
                content = content,
                username = "Meta",
                avatar_url = "https://www.roblox.com/asset/?id=1234567890" -- Custom avatar (optional)
            }

            local jsonData = HttpService:JSONEncode(message)
            local headers = {
                ["Content-Type"] = "application/json"
            }

            local success, response = pcall(function()
                local httpRequest = http_request or request or syn.request or HttpService.RequestAsync
                return httpRequest({
                    Url = webhookURL,
                    Method = "POST",
                    Headers = headers,
                    Body = jsonData
                })
            end)

            if success then
                print("Message sent successfully.")
            else
                warn("Failed to send message:", response)
            end
        end

        -- Function to fetch and parse JSON data with cache-busting
        local function fetchAndParseJson(url)
            local cacheBuster = tostring(os.time())
            local fullUrl = url .. "?t=" .. cacheBuster

            local success, jsonData = pcall(function()
                return game:HttpGet(fullUrl)
            end)

            if not success then
                warn("Failed to fetch JSON data: " .. jsonData)
                return nil
            end

            local parsedData
            success, parsedData = pcall(function()
                return HttpService:JSONDecode(jsonData)
            end)

            if not success then
                warn("Failed to parse JSON data: " .. parsedData)
                return nil
            end

            return parsedData
        end

        -- Refresh mechanism
        local refreshInterval = 600 -- 10 minutes
        local lastFetchTime = 0
        local validKeys = {}

        local function refreshData()
            local currentTime = os.time()
            if currentTime - lastFetchTime >= refreshInterval then
                print("Refreshing data...")
                validKeys = fetchAndParseJson(jsonUrl)
                if validKeys then
                    print("Data refreshed successfully.")
                else
                    print("Failed to refresh data.")
                end
                lastFetchTime = currentTime
            end
        end

        -- Function to check if the provided key is valid (redeemed) and HWID matches
        local function isValidKeyAndHWID(key)
            local keyData = validKeys[key]
            if keyData then
                print("Key found.")
                if keyData.status == "redeemed" then
                    local requiredHwid = keyData.hwid
                    print("Checking HWID...")
                    if requiredHwid == nil or requiredHwid == clientId then
                        print("HWID matches.")
                        return true
                    else
                        print("HWID mismatch: Required:", requiredHwid, "Provided:", clientId)
                    end
                else
                    print("Key is not redeemed.")
                end
            else
                print("Key not found.")
            end
            return false
        end

        -- Function to show notification to the player
        local function showNotification(title, text)
            StarterGui:SetCore("SendNotification", {
                Title = title,
                Text = text,
                Duration = 5 -- Duration of the notification in seconds
            })
        end

        -- Check if the scriptKey is valid (redeemed) and HWID matches
        refreshData() -- Ensure data is fresh before checking
        local whitelisted = isValidKeyAndHWID(scriptKey)

        if whitelisted then
            print("Success: You are whitelisted!") -- Console success message
            showNotification("Success", "You are whitelisted!")

            -- Fetch and execute the external script
            local scriptUrl = 'https://raw.githubusercontent.com/randomprojectss/random/refs/heads/main/urscript'
            local scriptContent = game:HttpGet(scriptUrl)

            -- Safely execute the script
            local scriptFunction, errorMessage = loadstring(scriptContent)

            if scriptFunction then
                scriptFunction()
            else
                warn("Failed to load external script: " .. errorMessage)
            end

            -- Notify via Discord webhook
            sendWebhookMessage("User: " .. username .. "\\nClient ID: " .. clientId .. "\\nScript Key: " .. scriptKey .. "\\nStatus: Whitelisted")
        else
            -- Kick the player with a custom message
            print("Player not whitelisted. Kicking...")
            player:Kick("Key is linked to a different HWID. Use the command .resethwid to reset your HWID.")

            -- Notify via Discord webhook
            sendWebhookMessage("User: " .. username .. "\\nClient ID: " .. clientId .. "\\nScript Key: " .. scriptKey .. "\\nStatus: Not Whitelisted")
        end
            `
        };
    } else {
        return {
            statusCode: 403,
            body: "Forbidden"
        };
    }
};
