import React from 'react';

const Tutorial = props => {
    return (
        <div className="tutorial">
            <h2>Tutorial</h2>
            <p>Willkommen zum Minigolf PDF Generator. Bitte ziehen Sie eine JSON Datei in das Upload-Feld.</p>
            <p>Anschließend können Sie über das Menü "Statistiken" das gewünschte Diagramm auswählen. 
                Nun befinden Sie sich in der Vorschau und können das Diagramm bearbeiten.</p>
            <p>Über die nun angezeigten Menüs können die Daten, die im Diagramm angezeigt werden, gefiltert werden.
                Außerdem kann dem Diagramm noch ein eigener Titel gegeben werden. </p>
            <p>Wenn Sie mit dem Diagramm zufrieden sind, können Sie es mit einem Klick auf "Hinzufügen" in das Dokument einfügen.
                Dieser Vorgang lässt sich beliebig oft wiederholen.</p>
            <p>Ist das Dokument erstellt, so lässt sich das PDF über den "PDF Generieren" Button erzeugen. 
                Wählen Sie im Dialog des Browsers "PDF" als Ausgabe.</p> 
        </div>
    )
}

export default Tutorial;