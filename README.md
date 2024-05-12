# e-go

<img src="https://github.com/Talhaimran03/e-go/assets/101459540/a299921e-48cd-44f2-82a8-3720f209509e" width="60%"> 

## Progetto

Benvenuti nel repository di e-go, un progetto sviluppato presso l'ITS LAST come parte del nostro project work. e-go è una web app progettata per incentivare l'utilizzo dei mezzi pubblici a Verona attraverso un approccio basato sulla consapevolezza. Il nostro obiettivo con e-go è quello di promuovere un cambiamento positivo nel sistema di trasporto pubblico di Verona, incoraggiando i residenti a utilizzare mezzi più sostenibili e ridurre l'impatto ambientale.

## Funzionalità Principali

- Monitoraggio del risparmio di CO2 con grafici
- Accumulo di punti per gli utenti in base all'utilizzo del bus
- Riscatto di premi e sconti
- Classifica degli utenti con punteggio migliore

## Dipendenze

Segui i passaggi seguenti per scaricare e installare le dipendenze necessarie:

- **Node.js**: Puoi scaricare Node.js dal [sito ufficiale](https://nodejs.org/).
- **Java**: Puoi scaricare Java dal [sito ufficiale di Oracle](https://www.oracle.com/java/technologies/javase-downloads.html).
- **Maven**: Puoi scaricare Maven dal [sito ufficiale di Apache Maven](https://maven.apache.org/download.cgi).
- **Redis**: Le istruzioni di installazione specifiche per il tuo sistema operativo sono disponibili sul [sito ufficiale di Redis](https://redis.io/download).
- **MySQL**: Puoi scaricare MySQL dal [sito ufficiale di MySQL](https://dev.mysql.com/downloads/).

## Utilizzo

1. Clona il repository sul tuo computer.
2. Avvia MySQL su porta 3306.
3. Su MySQL, crea un database chiamato `atv` e importa i dati utilizzando il file `atv.sql` presente nella directory `/backend/database`. Successivamente, crea un altro database chiamato `e-go`. Per quest'ultimo, è sufficiente crearlo senza importare dati
4. Avvia il server Redis con il comando `redis-server`.
5. Esegui i due moduli Java presenti nella directory `/backend/api-ego`. Per farlo, apri il la directory `/backend/api-ego` con un IDE come VSCode, apri uno qualsiasi dei file Java presenti nella cartella src e esegui i due moduli separatamente.
6.  Esegui npm install nella directory `/frontend`. Se stai utilizzando un Mac, è consigliabile modificare la configurazione nel file package.json, rimuovendo il proxy dalla sezione di configurazione e impostando il comando `start` come `react-scripts start`.
7. Accedi alla web app nel tuo browser tramite l'indirizzo `https://localhost:3000` se stai usando Windows e `http://localhost:3000` se stai usando macOS. Potresti ricevere una notifica riguardante la validità del certificato SSL, poiché il certificato è autofirmato. Per procedere, fai clic su 'Avanzate' e poi su 'Continua' per confermare l'accesso."
8. Registrati e inizia ad accumulare punti.

## Contribuisci

Fornisci istruzioni su come contribuire al progetto o segnala problemi aprendo una nuova issue.

## Team

- Talha Imran
- Lorenzo Russo
- Anna Benettoni
- Claudia Garofolin
- Achille Bamfi
