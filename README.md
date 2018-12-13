# seplan

## Deployment

1. Registrer App.
   - Kopier alt som ligger i repoet over på webserver
   - Logg inn på ArcGIS Online 
   - Finn elementet som inneholder applikasjonen. (Geonorgeskart - webapp)
   - Under Innstillinger, gå helt ned og klikk Registrert Info
   - Kopier App-ID strengen og lim denne inn i "appId" i config.json
   
2. Endre url-er for språkskifte.
   - Gå inn i configs\About\config_About.json
   - Søk etter localhost. Det skal være to plasser.
   - Bytt disse ut med skikkelig url for deployet app
