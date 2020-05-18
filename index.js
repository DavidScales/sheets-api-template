const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

/**
 * Authenticate and append data to spreadsheet.
 * @param {object} authClient - credentials for authenticating with sheets API
 * @param {string} spreadsheetId - TensorFlow Certification Alumni sheet
 * @param {string} sheetId - name of the sheet tab
 * @param {array} row - data to write to sheet
 * @returns {promise} Sheets API append() request
 */
const appendSheetRow = async (authClient, spreadsheetId, sheetId, data) => {
    const sheets = google.sheets({ version: 'v4', auth: authClient});
    const body = {
      values: [data]
    };
    const request = {
      spreadsheetId: spreadsheetId,
      range: `${sheetId}!1:1`,
      valueInputOption: 'RAW',
      resource: body
    };
    try {
      const response = sheets.spreadsheets.values.append(request);
      return response;
    } catch (err) {
      throw new Error(`[appendSheetRow] Could not append request: ${err}`);
    }
};


const main = async () => {
    const row = [
        1,2,3,
    ];
    try {
        const spreadsheetId = '1xgNCtg802UlLk1uqJCW46Cml69ipopDShQrPlMawVQo';
        const sheetId = 'Sheet1';
        const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
        const auth = new GoogleAuth({
          scopes: SCOPES
        });
        const authClient = await auth.getClient();
        const response = await appendSheetRow(authClient, spreadsheetId, sheetId, row);
        console.log(`success, ${response.data}`);
    } catch (err) {
        console.error(`Could not append row to sheet: ${err}`);
        return;
    }
};

main();

