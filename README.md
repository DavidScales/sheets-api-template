create roleless SA
share sheet with SA email

export GOOGLE_APPLICATION_CREDENTIALS="surveyr-service-acct.json"

    # test on node 10
    nvm use 10

    node index.js

    # needed to enable sheets API on project
    https://console.developers.google.com/apis/api/sheets.googleapis.com/overview?project=693993250205