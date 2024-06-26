/**
 * Gets Character Information from the Warcraft Logs API
 *
 * @param characterName The name of the in-game character
 * @param serverName The name of the server that the in-game character is on
 * @param serverRegion The region of the server
 * @param raidSize Size of the raid (10 or 25)
 * @param role Role you want to use to show parses for this character (Any, DPS, Healer, Tank)
 * @return A parsable JSON response from the Warcraft Logs API
 * @customfunction
 */

function getMedianPerformanceAverage (char, role = 'DPS', zoneID = 1020, serverName = 'Faerlina', serverRegion = 'US', raidSize = 25) {
    switch (role.toUpperCase()) {
        case 'TANK':
            role = 'Tank';
            break;
        case 'HEALER':
            role = 'Healer';
            break;
        default:
            role = 'DPS';
    }
    const data = getCharacterData(char, role, zoneID, serverName, serverRegion, raidSize);
    const median = parseProperty(data, 'medianPerformanceAverage') || 50.0;
    console.log(char, median);
    return isNaN(median) ? 50.0 : median;
}

const TOKEN = getAccessToken();

function getCharacterData(characterName, role, zoneID, serverName = 'Faerlina', serverRegion = 'US', raidSize = 25) {
    const query = `
      query {
        characterData {
          character(name: "${characterName}", serverSlug: "${serverName}", serverRegion: "${serverRegion}") {
            id
            canonicalID
            classID
            server {
              name
            }
            faction {
              id
              name
            }
            zoneRankings(zoneID: ${zoneID}, size: ${raidSize}, role: ${role}) 
          }     
        }
      }`;
  
    const ql = 'https://classic.warcraftlogs.com/api/v2/client';
    const response = UrlFetchApp.fetch(ql, {
      method: "GET",
      contentType: 'application/json', 
      headers: { Authorization: 'Bearer ' + TOKEN},
      payload: JSON.stringify({query: query})
    });
  
    const data = response.getContentText();
    return data;
  }
  
  /**
   * Parses the WCL Data and returns the specified property
   *
   * @param wclData The WCL Data (json)
   * @param property The property to return
   * @return The specified property
   * @customfunction
   */
  function parseProperty(wclData, property) {
    const jsonObject = JSON.parse(wclData);
    return jsonObject.data.characterData.character.zoneRankings[property];
  }
  
  /**
   * Parses the WCL Data and returns the number of kills for the provided encounterID.
   *
   * @param wclData The WCL Data (json)
   * @param encounterID The ID of the encounter per WarcraftLogs.
   * @return Total Encounter Kills
   * @customfunction
   */
  function parseEncounterKills(wclData, encounterID) {
    const jsonObject = JSON.parse(wclData);
    const encounterTotalKills = jsonObject.data.characterData.character.zoneRankings.rankings
      .find(rankings => rankings.encounter.id == encounterID).totalKills;
    return encounterTotalKills;
  }

// Retrieve API keys
function getKeys() {
  const documentProperties = PropertiesService.getDocumentProperties();
  const clientId = documentProperties.getProperty('CLIENT_ID');
  const clientSecret = documentProperties.getProperty('CLIENT_SECRET');
  
  return [clientId, clientSecret];
}


function getAccessToken() {
    const [clientId, clientSecret] = getKeys();
    const url = 'https://www.warcraftlogs.com/oauth/token';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Utilities.base64Encode(clientId + ':' + clientSecret)
        },
        payload: 'grant_type=client_credentials'
    };

    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());

    //Logger.log(data.access_token);
    return data.access_token;
}