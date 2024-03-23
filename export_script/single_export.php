<?php

// Connessione al database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "atv";

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Verifica della connessione
if (!$conn) {
    die("Connessione al database fallita: " . mysqli_connect_error());
}

// Query per creare la tabella bus_stops se non esiste già
$sql_create_table_stops = "CREATE TABLE IF NOT EXISTS bus_stops (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                name VARCHAR(255) NOT NULL,
                                latitude DECIMAL(10, 8) NOT NULL,
                                longitude DECIMAL(11, 8) NOT NULL,
                                qr_code_number VARCHAR(256),
                                UNIQUE KEY (latitude, longitude)
                            )";

if (mysqli_query($conn, $sql_create_table_stops)) {
    echo "Tabella bus_stops creata con successo o già esistente.\n";
} else {
    echo "Errore durante la creazione della tabella bus_stops: " . mysqli_error($conn);
}

// Query per creare la tabella bus_numbers se non esiste già
$sql_create_table_numbers = "CREATE TABLE IF NOT EXISTS bus_numbers (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                number VARCHAR(10) NOT NULL UNIQUE,
                                qr_code_number VARCHAR(256)
                            )";

if (mysqli_query($conn, $sql_create_table_numbers)) {
    echo "Tabella bus_numbers creata con successo o già esistente.\n";
} else {
    echo "Errore durante la creazione della tabella bus_numbers: " . mysqli_error($conn);
}

// Query per creare la tabella di associazione tra bus_stops e bus_numbers
$sql_create_table_stops_bus_numbers = "CREATE TABLE IF NOT EXISTS stops_bus_numbers (
                                        id INT AUTO_INCREMENT PRIMARY KEY,
                                        stop_id INT NOT NULL,
                                        bus_number_id INT NOT NULL,
                                        FOREIGN KEY (stop_id) REFERENCES bus_stops(id) ON DELETE CASCADE ON UPDATE CASCADE,
                                        FOREIGN KEY (bus_number_id) REFERENCES bus_numbers(id) ON DELETE CASCADE ON UPDATE CASCADE
                                    )";

if (mysqli_query($conn, $sql_create_table_stops_bus_numbers)) {
    echo "Tabella stops_bus_numbers creata con successo o già esistente.\n";
} else {
    echo "Errore durante la creazione della tabella stops_bus_numbers: " . mysqli_error($conn);
}

// Query per creare la tabella di bus_paths 
$sql_create_bus_paths  = "CREATE TABLE IF NOT EXISTS bus_paths (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            bus_number_id INT NOT NULL,
                            latitude DECIMAL(10, 8) NOT NULL,
                            longitude DECIMAL(11, 8) NOT NULL,
                            FOREIGN KEY (bus_number_id) REFERENCES bus_numbers(id)
                        )";

if (mysqli_query($conn, $sql_create_bus_paths)) {
    echo "Tabella bus_paths creata con successo o già esistente.\n";
} else {
    echo "Errore durante la creazione della tabella bus_paths: " . mysqli_error($conn);
}

$file_content = file_get_contents("export.geojson");
$data = json_decode($file_content, true);

if ($data === null) {
    die("Errore nella decodifica del file GeoJSON.");
}

$bus_number_id = -1;

// Itera sui dati delle fermate degli autobus e li inserisce nel database
foreach ($data['features'] as $feature) {
    // Verifica il tipo di feature
    if ($feature['type'] === 'Feature') {
        $properties = $feature['properties'];
        $geometry = $feature['geometry'];

        // Se la feature è una fermata degli autobus
        if ($geometry['type'] === 'Point') {
            $name = $properties['name'];
            $coordinates = $geometry['coordinates'];

            // Query per inserire i dati nella tabella delle fermate degli autobus
            $sql_insert_stop = "INSERT IGNORE INTO bus_stops (name, latitude, longitude) VALUES ('$name', '$coordinates[1]', '$coordinates[0]')";

            if (mysqli_query($conn, $sql_insert_stop)) {
                // echo "Dati della fermata degli autobus inseriti correttamente.\n";
            } else {
                echo "Errore nell'inserimento dei dati della fermata degli autobus: " . mysqli_error($conn);
            }

            // Id della fermata appena inserita
            $stop_id = mysqli_insert_id($conn);

            // Se la fermata è associata a @relations
            if (isset($properties['@relations'])) {
                foreach ($properties['@relations'] as $relation) {
                    $bus_number = $relation['reltags']['ref'];

                    // Query per inserire i dati del numero del bus nella tabella bus_numbers
                    $sql_insert_bus_number = "INSERT IGNORE INTO bus_numbers (number) VALUES ('$bus_number')";

                    if (mysqli_query($conn, $sql_insert_bus_number)) {
                        // echo "Numero del bus inserito correttamente.\n";
                    } else {
                        echo "Errore nell'inserimento del numero del bus: " . mysqli_error($conn);
                    }

                    $id = mysqli_insert_id($conn);

                    if ($bus_number_id == -1) {
                        $bus_number_id = $id;
                    }

                    // Query per inserire l'associazione tra fermata e numero del bus nella tabella stops_bus_numbers
                    $sql_insert_stop_bus_number = "INSERT INTO stops_bus_numbers (stop_id, bus_number_id) VALUES ('$stop_id', '$bus_number_id')";

                    if (mysqli_query($conn, $sql_insert_stop_bus_number)) {
                        // echo "Associazione fermata-bus inserita correttamente.\n";
                    } else {
                        echo "Errore nell'inserimento dell'associazione fermata-bus: " . mysqli_error($conn);
                    }
                }
            }
        }

        // Se la feature è una linea di percorso del bus
        if ($geometry['type'] === 'MultiLineString') {
            if (isset($properties['ref'])) {
                // Id del numero del bus dalla relazione
                $bus_number = $properties['ref'];

                // Query per inserire i dati del numero del bus nella tabella bus_numbers
                $sql_insert_bus_number = "INSERT IGNORE INTO bus_numbers (number) VALUES ('$bus_number')";

                if (mysqli_query($conn, $sql_insert_bus_number)) {
                    // echo "Numero del bus inserito correttamente.\n";
                } else {
                    echo "Errore nell'inserimento del numero del bus: " . mysqli_error($conn);
                }

                $id = mysqli_insert_id($conn);

                if ($bus_number_id == -1) {
                    $bus_number_id = $id;
                }
            }

            // Itera sui segmenti della linea di percorso
            foreach ($geometry['coordinates'] as $segment) {
                // Itera attraverso le coordinate del segmento
                foreach ($segment as $coordinate) {
                    $latitude = $coordinate[1];
                    $longitude = $coordinate[0];
                    
                    // Query per inserire i dati del segmento della linea di percorso nella tabella bus_paths
                    $sql_insert_path_segment = "INSERT IGNORE INTO bus_paths (bus_number_id, latitude, longitude) VALUES ('$bus_number_id', '$latitude', '$longitude')";

                    if (mysqli_query($conn, $sql_insert_path_segment)) {
                        // echo "Segmento della linea di percorso del bus inserito correttamente.\n";
                    } else {
                        echo "Errore nell'inserimento del segmento della linea di percorso del bus: " . mysqli_error($conn);
                    }
                }
            }
        }
    }
}

// Chiusura della connessione al database
mysqli_close($conn);

?>