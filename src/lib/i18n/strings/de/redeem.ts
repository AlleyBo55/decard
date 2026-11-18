import type { Strings } from "../en";
import type { Translation } from "../types";

export const redeem: Translation<Strings["redeem"]> = {
  "page": {
    "poweredBy": "Ermöglicht durch {logo}",
    "breadcrumb": "Brotkrümelnavigation",
    "home": "Start",
    "crumb": "Slab einlösen",
    "h1": "Hol deinen Slab nach Hause.",
    "h1Accent": "Vom Tresor bis an deine Tür.",
    "lede": "Löse ein Karten-NFT gegen den echten gegradeten Slab ein: sieben Stationen, zwei kostenlose Signaturen, eine Bestätigung, die verbrennt und bezahlt.",
    "how": {
      "kicker": "So funktioniert das Einlösen",
      "title": "Vom NFT zum Slab in deinen Händen",
      "steps": [
        {
          "title": "Einchecken",
          "text": "Verbinde die Solana-Wallet, in der die Karten liegen, und signiere zwei kostenlose Nachrichten: eine für Decard, eine für den Versandschalter von Slabz. Keine Transaktion, keine Gebühr."
        },
        { "title": "Team wählen", "text": "Wähle bis zu {max} gegradete Karten für ein gemeinsames Paket. Die Summe ihrer Versicherungswerte ist der deklarierte Wert des Pakets." },
        { "title": "Land wählen", "text": "Dreh den Globus oder durchsuche die Liste. Jede Versandzone hat einen veröffentlichten Tarif, den du schon bei der Auswahl siehst." },
        {
          "title": "Versandpreis prüfen",
          "text": "Gib die Adresse ein und hol dir den Live-Versandpreis vom Versandschalter: Versand, Versicherung und Gebühren, in USDC. Genau diesen Betrag zahlst du."
        },
        { "title": "Freigeben", "text": "Eine einzige Wallet-Bestätigung verbrennt die Karten-NFTs und bezahlt den Versand. Danach verpackt der Tresor die physischen Slabs." },
        { "title": "Reise verfolgen", "text": "Verfolge das Paket vom Verpacken bis zur Zustellung, mit der Sendungsnummer des Paketdienstes, sobald es verschickt ist." }
      ]
    },
    "costs": {
      "kicker": "Was es kostet",
      "title": "Veröffentlichte Versandtarife",
      "text": "Bezahlt wird in USDC bei der Freigabe. Die veröffentlichten Tarife geben dir während der Auswahl einen Richtpreis; abgebucht wird der Live-Versandpreis bei der Prüfung, inklusive etwaiger Bearbeitungsgebühren, und du bestätigst ihn, bevor sich deine Wallet öffnet.",
      "caption": "Versandtarife nach Zone",
      "zone": "Zone",
      "insurance": "Versicherung: 0,5 % des deklarierten Werts, fällig, wenn dieser über {over} liegt. Der deklarierte Wert ist die Summe der Versicherungswerte der Karten.",
      "signature": "Unterschrift bei Zustellung in den USA: {price}, wenn der deklarierte Wert über {over} liegt.",
      "networkFee": "Netzwerkgebühr: ein Bruchteil eines Cents in SOL, bezahlt von deiner Wallet wie bei jeder Solana-Transaktion."
    },
    "burn": {
      "kicker": "Was Verbrennen bedeutet",
      "title": "Eine Karte, ein Anspruch",
      "claim": "Dein Karten-NFT ist der Anspruch auf einen Slab im Tresor. Um den Slab freizugeben, wird das NFT verbrannt: auf Solana zerstört, in derselben Bestätigung, die den Versand bezahlt. So kann eine Karte nie verschickt und gleichzeitig weiter gehandelt werden.",
      "final": "Ein Burn ist endgültig. Das NFT kann nicht wiederhergestellt, gelistet, zurückverkauft oder zweimal eingelöst werden. Gelistete Karten werden zuerst vom Markt genommen, in derselben Bestätigung.",
      "ships": "Versand in die {count} Länder und Gebiete auf der Liste des Versanddienstleisters, bis zu {max} Slabs pro Paket. Du brauchst Karten zum Versenden? Zieh eine beim {rip} oder finde eine im {scanner}.",
      "rip": "Pack-Opening",
      "scanner": "Scanner"
    },
    "faq": {
      "kicker": "FAQ zum Einlösen",
      "title": "Bevor du versendest",
      "items": [
        {
          "q": "Was bedeutet es, eine Karte einzulösen?",
          "a": "Jedes Karten-NFT von Collector Crypt steht für einen echten gegradeten Slab (PSA, BGS oder CGC), der in einem Tresor lagert. Beim Einlösen tauschst du das NFT gegen den Slab selbst: Das NFT wird auf Solana verbrannt, und der Tresor schickt die physische Karte an deine Adresse."
        },
        {
          "q": "Was bedeutet es, das NFT zu verbrennen, und kann ich das rückgängig machen?",
          "a": "Beim Verbrennen wird das NFT on-chain zerstört, in derselben Bestätigung, die den Versand bezahlt. So kann eine Karte nie gleichzeitig verschickt und weiter gehandelt werden. Das ist endgültig: Ein verbranntes NFT kann nicht wiederhergestellt, gelistet, zurückverkauft oder erneut eingelöst werden. Decard bittet dich, ein Häkchen zu setzen und den Freigabe-Button gedrückt zu halten, bevor sich deine Wallet überhaupt öffnet."
        },
        {
          "q": "Was kostet der Versand?",
          "a": "Die veröffentlichten Tarife beginnen bei {usa} für den ersten Slab in die USA, {canada} nach Kanada, {europe} nach Europa und {oceania} nach Australien, Neuseeland und in den Rest der Welt, plus {extra} für jeden weiteren Slab im selben Paket. Eine Versicherung von 0,5 % kommt dazu, wenn der deklarierte Wert über {over} liegt. Der Live-Versandpreis bei der Prüfung, inklusive etwaiger Bearbeitungsgebühren, ist der Betrag, den du zahlst."
        },
        {
          "q": "Wie bezahle ich?",
          "a": "In USDC aus derselben Solana-Wallet, innerhalb der Transaktionen, die die NFTs verbrennen, plus ein Bruchteil eines Cents in SOL für die Netzwerkgebühr. Decard verwahrt nie dein Geld oder deine Schlüssel: Deine Wallet signiert jede Transaktion, und nichts wird abgebucht, bevor sie das tut."
        },
        {
          "q": "In welche Länder kann ich versenden?",
          "a": "Du wählst aus den {count} Ländern und Gebieten auf der Liste des Versanddienstleisters. Der Dienstleister prüft jede Adresse, und der Versandpreis bei der Prüfung bestätigt, dass dein Paket reisen kann, bevor etwas abgebucht wird."
        },
        {
          "q": "Wie lange dauert die Zustellung?",
          "a": "Das hängt von der Verpackungs-Warteschlange des Tresors und vom Paketdienst für dein Land ab. Die Reise zeigt jede Etappe: gebucht, wird verpackt, unterwegs mit der Sendungsnummer des Paketdienstes und zugestellt."
        },
        {
          "q": "Was passiert, wenn die Freigabe unterbrochen wird?",
          "a": "Schließt du das Wallet-Fenster, wird alles abgebrochen: Nichts wird verbrannt oder abgebucht. Sobald du bestätigst, wird die Sendung sofort auf deinem Gerät gespeichert, und eine unterbrochene Freigabe kannst du über deine Reisen für genau diese Sendung abschließen, sodass du nie doppelt zahlst."
        },
        {
          "q": "Speichert Decard meine Adresse?",
          "a": "Nein. Adressen liegen beim Versanddienstleister von Slabz und werden live gelesen, solange dein Versandpass gültig ist. Die Server von Decard leiten sie weiter, ohne sie zu speichern oder zu protokollieren, und diese Seite hält sie nur im Arbeitsspeicher."
        }
      ],
      "footer": "{slabz} und sein Versanddienstleister übernehmen Versand, Lagerung im Tresor und Abwicklung. Versicherungswerte sind keine garantierten Verkaufspreise."
    }
  },
  "steps": {
    "checkin": {
      "title": "Trainer-Check-in",
      "short": "Check-in",
      "lede": "Drei kostenlose Check-ins: deine Wallet, Decard und ein 14-Minuten-Versandpass. Keiner davon bewegt etwas."
    },
    "party": {
      "title": "Wähle dein Team",
      "short": "Team",
      "lede": "Wähle die Slabs, die nach Hause reisen, bis zu {max} in einer Sendung. Die Summe ihrer Versicherungswerte ist der deklarierte Wert."
    },
    "region": {
      "title": "Wähle deine Region",
      "short": "Region",
      "lede": "Dreh den Globus zu deinem Land oder such danach. Jede Versandzone hat ihren eigenen veröffentlichten Tarif."
    },
    "home": {
      "title": "Deine Heimatstadt",
      "short": "Heimatstadt",
      "lede": "Wo genau? Der Kurier braucht einen Namen, eine Straße, eine Telefonnummer und eine E-Mail-Adresse."
    },
    "review": {
      "title": "Prüfe die Route",
      "short": "Prüfung",
      "lede": "Die ganze Reise auf einer Seite. Lies sie wie einen Kontoauszug: Genau das wird abgebucht."
    },
    "release": {
      "title": "Freigabe",
      "short": "Freigabe",
      "lede": "Die NFTs werden verbrannt und der Versand wird in USDC bezahlt, mit einer einzigen Wallet-Bestätigung."
    },
    "journey": {
      "title": "Die Reise",
      "short": "Reise",
      "lede": "Vom Tresor bis an deine Tür, Station für Station."
    }
  },
  "stopOf": "Station {n} von {total}",
  "regions": {
    "usa": "USA",
    "canada": "Kanada",
    "europe": "Europa",
    "oceania": "Australien & Neuseeland",
    "world": "Rest der Welt"
  },
  "place": "{city}, {country}",
  "slabs": { "one": "{n} Slab", "other": "{n} Slabs" },
  "nfts": { "one": "{n} NFT", "other": "{n} NFTs" },
  "rates": {
    "firstSlab": "Erster Slab",
    "extraSlab": "Jeder weitere Slab"
  },
  "problems": {
    "ALREADY_REDEEMED": "Bereits eingelöst",
    "IN_OTHER_SHIPMENT": "In einer anderen Sendung",
    "UNAVAILABLE": "Gerade nicht versendbar",
    "OTHER": "Nicht versendbar"
  },
  "actions": {
    "back": "Zurück",
    "tryAgain": "Erneut versuchen",
    "change": "Ändern",
    "checkWallet": "Wallet prüfen",
    "signInAgain": "Erneut anmelden",
    "renewPass": "Pass erneuern",
    "renewTheLink": "Erneuere den Pass",
    "renewFree": "Pass erneuern (kostenlos)",
    "checkAgain": "Erneut prüfen",
    "backToReview": "Zurück zur Prüfung",
    "backToParty": "Zurück zum Team"
  },
  "errors": {
    "generic": "Etwas ist schiefgelaufen. Bitte versuch es noch einmal.",
    "network": "Netzwerkfehler. Prüfe deine Verbindung.",
    "timeout": "Keine rechtzeitige Antwort.",
    "cancelled": "Die Anfrage wurde abgebrochen.",
    "http": "Anfrage fehlgeschlagen ({status}).",
    "passNeeded": "Für diesen Schritt brauchst du einen Versandpass.",
    "connectFirst": "Verbinde zuerst deine Wallet und melde dich an.",
    "passClosed": "Du hast das Wallet-Fenster geschlossen. Der Pass ist eine kostenlose Nachricht: keine Transaktion, keine Gebühr.",
    "passAuth": "Deine Decard-Anmeldung ist abgelaufen. Melde dich erneut an und hol dir dann deinen Pass.",
    "passFailed": "Die Wallet konnte den Pass nicht signieren. Versuch es noch einmal.",
    "addressesPass": "Hol dir einen Versandpass, um deine gespeicherten Adressen zu sehen.",
    "addressesFailed": "Deine gespeicherten Adressen konnten nicht geladen werden.",
    "quoteFailed": "Für die Route konnte kein Preis ermittelt werden. Versuch es noch einmal.",
    "shipmentFailed": "Die Sendung konnte nicht gelesen werden."
  },
  "lab": {
    "loading": "Die Einlösung wird geladen",
    "authLost": "Deine Decard-Anmeldung ist abgelaufen. Melde dich erneut an, um weiterzumachen: Es wurde nichts Neues gesendet.",
    "passExpired": "Dein Versandpass ist abgelaufen. Erneuere ihn, um weiter Adressen, Versandpreise und Sendungen zu lesen: Das ist eine kostenlose Nachricht.",
    "summary": "Reiseübersicht",
    "passLeft": "Versandpass: noch {timer}. Läuft er ab, erneuert er sich mit einer kostenlosen Signatur.",
    "passAbout": "Der Versandpass ist eine kostenlose Nachricht, die deine Wallet signiert. Er öffnet den Versandschalter von Slabz für 14 Minuten.",
    "devnet": "Devnet: Deine Karten werden aus dem Devnet von Collector Crypt gelesen."
  },
  "route": {
    "label": "Route der Einlösung",
    "stop": "Station {n} von {total}: {title}",
    "stopDone": "Station {n} von {total}: {title}, erledigt",
    "stopLocked": "Station {n} von {total}: {title}, noch nicht erreicht",
    "stopDoneLocked": "Station {n} von {total}: {title}, erledigt, noch nicht erreicht"
  },
  "map": {
    "loading": "Die Landkarte wird entrollt…",
    "failed": "Die Landkarte konnte nicht geladen werden.",
    "vault": "Tresor",
    "zoomIn": "Hineinzoomen",
    "zoomOut": "Herauszoomen",
    "wholeRoute": "Ganze Route zeigen",
    "wholeGlobe": "Ganzen Globus zeigen",
    "hintPick": "Ziehe, wische oder nutze die Pfeiltasten, um den Globus zu drehen, und Plus und Minus zum Zoomen. Klicke oder tippe auf ein Land oder drücke Enter, um das Land in der Mitte zu wählen. Die Länderliste funktioniert genauso.",
    "hint": "Ziehe, wische oder nutze die Pfeiltasten, um den Globus zu drehen, und Plus und Minus zum Zoomen.",
    "centred": "In der Mitte: {country}.",
    "openSea": "Über offenem Meer.",
    "selected": "Ausgewählt: {country}.",
    "globePicked": "Globus. Ausgewählt: {country}.",
    "globeEmpty": "Globus mit den Ländern, in die die Slabs reisen können.",
    "globeRoute": "Globus mit der Route vom Slabz-Tresor nach {place}.",
    "cardLabel": "Landkarte: {country}, das ganze Land eingekreist",
    "cardLabelEmpty": "Landkarte",
    "pickFirst": "Wähle zuerst ein Land auf dem Globus.",
    "hometown": "Heimatstadt",
    "notPicked": "Noch nicht gewählt"
  },
  "picker": {
    "label": "Landkarte durchsuchen",
    "placeholderPicked": "{country} · zum Ändern neu eingeben",
    "placeholder": "Land eingeben ({count} zur Auswahl)",
    "clear": "Suche löschen",
    "list": "Länder",
    "noMatch": "Kein Land passt zu „{q}“. Versuch es mit dem englischen Namen oder dem zweistelligen Ländercode.",
    "matches": { "one": "{n} Land passt.", "other": "{n} Länder passen." },
    "popular": "Beliebte Ziele"
  },
  "checkIn": {
    "wallet": {
      "title": "Verbinde deine Wallet",
      "text": "Die Solana-Wallet, in der deine Collector-Crypt-Karten liegen.",
      "busy": "Wird verbunden…",
      "action": "Wallet verbinden"
    },
    "signIn": {
      "title": "Melde dich bei Decard an",
      "text": "Eine kostenlose Nachricht beweist, dass die Wallet dir gehört. Keine Transaktion, keine Gebühr.",
      "done": "Angemeldet",
      "action": "Anmelden"
    },
    "pass": {
      "title": "Hol dir deinen Versandpass",
      "text": "Eine weitere kostenlose Nachricht öffnet den Versandschalter von Slabz für 14 Minuten. Läuft der Pass ab, erneuert er sich von selbst.",
      "done": "Noch {timer} gültig",
      "action": "Pass holen"
    },
    "trainer": "Trainer",
    "switchWallet": "Wallet wechseln",
    "done": "Erledigt",
    "after": "Nach Schritt {n}",
    "next": "Team wählen",
    "journeys": "Deine Reisen ({n})",
    "allFree": "Drei schnelle Check-ins, alle kostenlos."
  },
  "walletPicker": {
    "title": "Wähle deine Wallet",
    "text": "Du signierst eine kurze Nachricht, die beweist, dass die Wallet dir gehört. Das ist kostenlos: keine Transaktion, keine Gebühr.",
    "none": "Keine Solana-Wallet gefunden",
    "noneText": "Öffne Decard auf dem Handy direkt in deiner Wallet-App. Installiere am Computer eine Wallet und lade die Seite neu.",
    "approve": "Bestätige die Anmeldung in deiner Wallet…",
    "connecting": "Wird verbunden…",
    "close": "Schließen"
  },
  "party": {
    "loading": "Deine Karten werden geladen",
    "failedTitle": "Deine Karten konnten nicht gelesen werden",
    "failedText": "Collector Crypt hat gerade nicht geantwortet. Warte einen Moment und komm dann zu dieser Station zurück.",
    "emptyTitle": "Noch keine gegradeten Slabs in dieser Wallet",
    "emptyText": "Einlösen funktioniert für gegradete Collector-Crypt-Karten in der verbundenen Wallet. Öffne zuerst ein Pack oder hol dir eine Karte im Scanner.",
    "rip": "Pack öffnen",
    "scanner": "Scanner durchstöbern",
    "count": "{n} / {max} in deinem Team",
    "declared": "Deklariert",
    "selectTop": "Top {max} auswählen",
    "selectAll": "Alle auswählen",
    "clear": "Auswahl aufheben",
    "filter": "Deine Karten filtern",
    "filterPlaceholder": { "one": "{n} Karte nach Name oder Note filtern", "other": "{n} Karten nach Name oder Note filtern" },
    "insuredLead": "Unterwegs versichert.",
    "insuredText": "Liegt der deklarierte Wert über {over}, kommt automatisch eine Versicherung von 0,5 % des deklarierten Werts dazu.",
    "listed": "Gelistet · zuerst vom Markt",
    "noMatch": "Keine Karte passt zu „{q}“.",
    "pickOne": "Mindestens einen Slab wählen",
    "pack": { "one": "{n} Slab einpacken", "other": "{n} Slabs einpacken" },
    "flagged": {
      "one": "{n} Karte bei der Prüfung beanstandet: Nimm sie heraus, um weiterzumachen.",
      "other": "{n} Karten bei der Prüfung beanstandet: Nimm sie heraus, um weiterzumachen."
    }
  },
  "region": {
    "destination": "Reiseziel",
    "zone": "Versandzone",
    "yourSlabs": { "one": "Für {n} Slab", "other": "Für {n} Slabs" },
    "signature": "Die Unterschrift bei Zustellung kostet {price} extra, wenn der deklarierte Wert über {over} liegt.",
    "insurance": "Die Versicherung kostet {price} extra: 0,5 % des deklarierten Werts, wenn dieser über {over} liegt.",
    "published": "Veröffentlichte Tarife, ohne Bearbeitungs- und Netzwerkgebühren. Den echten Versandpreis bekommst du bei der Prüfung, bevor etwas abgebucht wird.",
    "emptyTitle": "Wohin reisen die Slabs?",
    "emptyText": "Dreh den Globus und tippe auf dein Land oder gib es oben ein. Kleine Inseln erscheinen als Punkte: Zoome hinein, um sie anzutippen.",
    "next": "Weiter mit Reiseziel {country}",
    "pick": "Land wählen"
  },
  "home": {
    "labels": {
      "name": "Vollständiger Name",
      "line1": "Straße und Hausnummer",
      "line2": "Wohnung, Etage, Zusatz (optional)",
      "city": "Stadt oder Ort",
      "state": "Bundesland, Provinz oder Region",
      "postalCode": "Postleitzahl",
      "phoneNumber": "Telefon mit Ländervorwahl",
      "email": "E-Mail"
    },
    "hints": {
      "name": "Wer für das Paket unterschreibt.",
      "state": "Keine Bundesländer bei dir? Gib noch einmal die Stadt ein.",
      "phoneNumber": "Der Kurier druckt sie auf das Etikett.",
      "email": "Hierhin gehen die Updates zur Sendungsverfolgung."
    },
    "errors": {
      "tooLong": "Höchstens {max} Zeichen.",
      "nameMissing": "Wer soll für das Paket unterschreiben?",
      "line1Missing": "Gib Straße und Hausnummer an.",
      "cityMissing": "Gib die Stadt oder den Ort an.",
      "stateMissing": "Gib das Bundesland, die Provinz oder die Region an.",
      "postalCodeMissing": "Gib die Postleitzahl an.",
      "postalCodeFormat": "Nur Buchstaben, Ziffern, Leerzeichen und Bindestriche.",
      "phoneMissing": "Der Kurier braucht eine Telefonnummer.",
      "phoneFormat": "Ziffern mit Ländervorwahl, etwa +1 555 010 0199. Leerzeichen, Bindestriche und Klammern sind okay.",
      "emailMissing": "An diese E-Mail-Adresse gehen die Updates zur Sendungsverfolgung.",
      "emailFormat": "Diese E-Mail-Adresse sieht nicht richtig aus."
    },
    "rejected": "Der Versanddienstleister kann diese Adresse nicht verwenden: {detail}",
    "rejectedAny": "Der Versanddienstleister kann diese Adresse nicht verwenden: Prüfe jede Zeile",
    "savePass": "Zum Speichern brauchst du deinen Versandpass: eine kostenlose Nachricht zum Signieren.",
    "saveAuth": "Deine Decard-Anmeldung ist abgelaufen. Melde dich erneut an und speichere dann.",
    "saveFailed": "Die Adresse konnte nicht gespeichert werden. Versuch es noch einmal.",
    "saved": "Gespeichert. Die Slabs reisen nach {city}.",
    "deleted": "Adresse gelöscht.",
    "deleteFailed": "Die Adresse konnte nicht gelöscht werden. Versuch es noch einmal.",
    "moveTrip": "{country}: Wählst du diese Adresse, geht die Reise dorthin",
    "notListed": "{country}: Dieses Land führt der Dienstleister nicht. Bearbeite die Adresse, um sie zu nutzen.",
    "deleteConfirm": "Wirklich löschen?",
    "deleting": "Wird gelöscht…",
    "delete": "Löschen",
    "keep": "Behalten",
    "edit": "Bearbeiten",
    "editLabel": "Adresse von {name}, {city} bearbeiten",
    "deleteLabel": "Adresse von {name}, {city} löschen",
    "shippingTo": "Versandziel: {country}",
    "passLead": "Dein Versandpass ist abgelaufen.",
    "passText": "Gespeicherte Adressen werden live damit gelesen. {renew} (eine kostenlose Nachricht), um sie zu sehen, oder füge eine neue hinzu.",
    "loading": "Gespeicherte Adressen werden geladen",
    "add": "+ Adresse hinzufügen ({country})",
    "savedIn": "Gespeicherte Adressen ({country})",
    "noneIn": "{country}: noch keine gespeichert.",
    "elsewhere": { "one": "{n} in einem anderen Land gespeichert", "other": "{n} in anderen Ländern gespeichert" },
    "formEdit": "Adresse bearbeiten",
    "formNew": "Wohin sollen die Slabs?",
    "cancel": "Abbrechen",
    "country": "Land",
    "changeOnGlobe": "Auf dem Globus ändern",
    "saving": "Wird beim Versandschalter gespeichert…",
    "saveChanges": "Änderungen speichern",
    "saveShip": "Speichern und hierhin versenden",
    "keptBy": "Gespeichert beim Versanddienstleister von Slabz, nie bei Decard.",
    "next": "Route nach {city} prüfen",
    "saveFirst": "Zuerst die Adresse speichern",
    "pickAddress": "Adresse wählen"
  },
  "pass": {
    "label": "Versandpass",
    "ticket": "Versandticket",
    "valid": "Noch {timer} gültig",
    "passValid": "Pass {timer}",
    "signing": "Wird signiert…",
    "expired": "Abgelaufen",
    "passExpired": "Pass abgelaufen",
    "notIssued": "Nicht ausgestellt",
    "from": "Von",
    "vault": "Slabz-Tresor",
    "vaultSub": "Gegradet und versichert",
    "to": "Nach",
    "yourTown": "Deine Stadt",
    "pickOnGlobe": "Auf dem Globus wählen",
    "yourDoor": "Deine Tür",
    "savedHere": "Auf diesem Gerät gespeichert",
    "cargo": "Fracht",
    "declared": "Deklariert",
    "region": "Region",
    "shipping": "Versand",
    "estShipping": "Versand (geschätzt)",
    "charged": "Abbuchung in USDC",
    "chargedSub": "Aus deiner Wallet, bei der Freigabe",
    "estimated": "Geschätzte Summe",
    "estimatedSub": "Veröffentlichte Tarife. Den echten Versandpreis gibt es bei der Prüfung.",
    "paid": "Bezahlt in USDC",
    "paidSub": "Wie vom Versandschalter erfasst"
  },
  "review": {
    "route": "Die Route",
    "quote": "Der Versandpreis",
    "live": "Live vom Versandschalter",
    "passLead": "Der Versandpass ist abgelaufen.",
    "passText": "Der Versandpreis wird damit abgerufen. {renew} (eine kostenlose Nachricht).",
    "loading": "Versandpreis wird abgerufen",
    "noneCanTravel": "Keine dieser Karten kann gerade reisen.",
    "someCantTravel": {
      "one": "{n} deiner {total} Karten kann gerade nicht reisen.",
      "other": "{n} deiner {total} Karten können gerade nicht reisen."
    },
    "takeOut": { "one": "Herausnehmen und neu anfragen", "other": "Diese {n} herausnehmen und neu anfragen" },
    "askAgain": "Erneut anfragen",
    "shipping": "Versand ({zone})",
    "yourZone": "deine Zone",
    "insurance": "Versicherung",
    "fees": "Gebühren",
    "total": "Gesamt, zahlbar in USDC",
    "totalMeta": "{slabs} · deklariert {price}",
    "networkFee": "Dazu kommt die Solana-Netzwerkgebühr, ein Bruchteil eines Cents in SOL. Nennt der Versandschalter bei der Freigabe einen anderen Preis, bestätigst du zuerst die neue Summe.",
    "cargo": "Fracht · {slabs}",
    "declared": "Deklarierter Wert {price}",
    "listed": {
      "one": "{n} Karte ist zum Verkauf gelistet: Die Freigabe nimmt sie zuerst vom Markt, mit derselben Wallet-Bestätigung.",
      "other": "{n} Karten sind zum Verkauf gelistet: Die Freigabe nimmt sie zuerst vom Markt, mit derselben Wallet-Bestätigung."
    },
    "destination": "Reiseziel",
    "note": "Notiz für das Versandteam (optional)",
    "notePlaceholder": "Tor- oder Türcode, Lieferzeiten… Nur Text, wird mit der Sendung gespeichert.",
    "finalTitle": "Vor der Freigabe: Das ist endgültig",
    "finalBurn": {
      "one": "Die Freigabe {burns} in deiner Wallet. Ein Burn lässt sich nicht rückgängig machen: Das NFT kann danach nicht gelistet, zurückverkauft oder wiederhergestellt werden.",
      "other": "Die Freigabe {burns} in deiner Wallet. Ein Burn lässt sich nicht rückgängig machen: Die NFTs können danach nicht gelistet, zurückverkauft oder wiederhergestellt werden."
    },
    "finalBurns": { "one": "verbrennt dieses Karten-NFT", "other": "verbrennt diese {n} Karten-NFTs" },
    "finalPay": {
      "one": "Dieselbe Bestätigung {pays} für den Versand, und der Tresor schickt den physischen Slab nach {city}.",
      "other": "Dieselbe Bestätigung {pays} für den Versand, und der Tresor schickt die physischen Slabs nach {city}."
    },
    "finalPays": "zahlt {amount} in USDC",
    "theQuote": "den genannten Preis",
    "finalCheck": "Prüfe jetzt die Adresse: Die Slabs werden genau so verschickt, wie sie hier steht.",
    "next": "Weiter zur Freigabe · {price}",
    "waiting": "Warten auf den Versandpreis"
  },
  "release": {
    "whatItDoes": "Was die Freigabe bewirkt",
    "burnForGood": "werden endgültig verbrannt",
    "usdcShipping": "USDC für den Versand",
    "home": "Zuhause",
    "title": { "one": "Den Slab freigeben", "other": "Die {n} Slabs freigeben" },
    "renewLead": "Erneuere zuerst deinen Versandpass.",
    "renewText": "Er ist abgelaufen, und die Freigabe braucht ihn.",
    "passValid": "Versandpass noch {timer} gültig. Bei weniger als drei Minuten Restzeit wird er zuerst erneuert, damit die Freigabe nicht auf halbem Weg stoppt.",
    "agree": "Ich verstehe, dass {burn}, was sich nicht rückgängig machen lässt, und dass ich {amount} aus meiner Wallet zahle, um {them} zu versenden. Ziel: {place}.",
    "agreeBurn": { "one": "dieses Karten-NFT verbrannt wird", "other": "diese {n} Karten-NFTs verbrannt werden" },
    "agreeAmount": "{price} in USDC",
    "agreeQuoted": "den genannten Betrag",
    "agreeThem": { "one": "den Slab", "other": "sie" },
    "yourAddress": "meine Adresse",
    "hold": "Halten, um {n} freizugeben · {price}",
    "holdHint": "Deine Wallet zeigt dann die Transaktionen zum Bestätigen: den Burn jedes NFTs und die USDC-Zahlung, alles in einem Fenster. Schließt du das Fenster, wird alles abgebrochen; nichts wird abgebucht, bevor du bestätigst.",
    "backToReview": "← Zurück zur Prüfung",
    "holding": "Weiter halten…",
    "early": "Halte noch etwas länger, bis sich das Siegel füllt.",
    "holdHelp": "Halte das Siegel gedrückt (oder halte die Leertaste).",
    "stages": ["Sendung buchen", "In der Wallet bestätigen", "Verbrennen und bezahlen", "Unterwegs"],
    "preparing": "Die Sendung wird beim Versandschalter gebucht…",
    "signing": "In der Wallet bestätigen",
    "burning": "Verbrennen und Bezahlen auf Solana…",
    "burningText": "Das kann bis zu einer Minute dauern, während das Netzwerk bestätigt. Lass diesen Tab offen.",
    "waitText": "An diesem Punkt wird nichts verbrannt oder abgebucht. Lass diesen Tab offen.",
    "signingOne": "Deine Wallet zeigt eine Transaktion: Sie verbrennt {nfts} und zahlt {price} in USDC.",
    "signingMany": {
      "one": "Deine Wallet zeigt {n} Transaktion: Sie verbrennt {nfts} und zahlt {price} in USDC. Bestätige sie in einem Schritt.",
      "other": "Deine Wallet zeigt {n} Transaktionen: Zusammen verbrennen sie {nfts} und zahlen {price} in USDC. Bestätige alle auf einmal."
    },
    "notes": {
      "fresh": "Neue Transaktionen, dieselbe Sendung. Bestätige noch einmal.",
      "rest": "Bestätige den Rest der Sendung.",
      "burnRejected": "Das Netzwerk hat den Burn abgelehnt, also wurde nichts eingelöst. Die Transaktionen werden neu geholt…",
      "takenOver": "Eine neuere Sendung hat übernommen. Sie wird geladen…",
      "slowSign": "Das Signieren hat eine Weile gedauert, deshalb braucht das Netzwerk neue Transaktionen…",
      "newTotal": "Aktuelle Transaktionen für die neue Summe werden geholt…",
      "refetch": "Neue Transaktionen werden geholt…",
      "pickUp": "Die Sendung wird wieder aufgenommen…",
      "checking": "Der Stand der Sendung wird geprüft…",
      "unsigned": "Einige Teilschritte sind noch nicht signiert. Sie werden geholt…"
    },
    "repricedFinishTitle": "Bestätige den Restbetrag",
    "repricedTitle": "Die Summe hat sich geändert",
    "repricedFinish": "Der Abschluss der Sendung {id} kostet {price} in USDC für {cards}. Noch wurde nichts signiert.",
    "remaining": { "one": "{n} verbleibende Karte", "other": "{n} verbleibende Karten" },
    "remainingAll": "ihre restlichen Karten",
    "repriced": "Der Versandschalter verlangt jetzt {price} statt der von dir bestätigten {confirmed}. Es wurde nichts signiert oder abgebucht.",
    "accept": "{price} in USDC zahlen und {nfts} verbrennen.",
    "theNfts": "die NFTs",
    "holdAccept": "Halten, um anzunehmen · {price}",
    "notNow": "Nicht jetzt",
    "flagged": {
      "one": "{n} Karte beanstandet: Sie ist in deinem Team und bei der Prüfung markiert.",
      "other": "{n} Karten beanstandet: Sie sind in deinem Team und bei der Prüfung markiert."
    },
    "next": {
      "prepare": "Erneut versuchen",
      "sign": "Wallet erneut öffnen",
      "resume": "Diesen Schritt erneut versuchen",
      "complete": "Diesen Schritt erneut versuchen",
      "check": "Sendung prüfen",
      "review": "Zurück zur Prüfung",
      "address": "Adresse bearbeiten",
      "journey": "Deine Reisen öffnen",
      "none": "Zurück zum Team"
    },
    "seeJourneys": "Deine Reisen ansehen",
    "keepLead": "Lass diesen Tab offen.",
    "keepSaved": "Die Sendung ist auf diesem Gerät gespeichert, du kannst sie also jederzeit über deine Reisen abschließen.",
    "keepUnsigned": "Nichts wird abgebucht, bevor deine Wallet bestätigt.",
    "stops": {
      "signIn": {
        "title": "Erneut anmelden",
        "message": "Deine Decard-Anmeldung ist abgelaufen. Melde dich erneut an, um weiterzumachen; es wurde nichts Neues gesendet."
      },
      "passNeeded": {
        "title": "Versandpass nötig",
        "message": "Die Freigabe braucht einen neuen Versandpass: eine kostenlose Nachricht zum Signieren. Es wurde nichts Neues gesendet."
      },
      "replaced": {
        "title": "Eine neuere Sendung hat übernommen",
        "message": "Eine andere Einlösung dieser Karten hat diese hier ersetzt, bevor ihr Burn stattfand, daher wurde dafür nichts abgebucht. Deine Reisen zeigen die neuere."
      },
      "notPaid": {
        "title": "Es wurde nichts abgebucht",
        "message": "Diese Sendung wurde nie bezahlt, also wurde nichts verbrannt oder abgebucht. Starte eine neue Einlösung aus deinem Team, wenn du bereit bist."
      },
      "deskSaidNo": { "title": "Der Versandschalter hat abgelehnt", "message": "{detail} Starte keine neue Einlösung: Versuch diesen Schritt erneut." },
      "stillWaiting": {
        "title": "Noch keine Antwort vom Versandschalter",
        "message": "Wir haben noch keine Antwort bekommen. Deine Sendung ist gespeichert: Versuch es gleich noch einmal und starte keine neue Einlösung."
      },
      "burnFailed": { "title": "Der Burn ist nicht durchgegangen", "message": "{detail} Prüfe die Sendung, bevor du es erneut versuchst." },
      "network": {
        "title": "Warten auf das Netzwerk",
        "message": "Wir konnten den Burn noch nicht bestätigen. Deine Sendung ist gespeichert: Prüfe in einer Minute erneut und starte keine neue Einlösung."
      },
      "connect": {
        "title": "Wallet verbinden",
        "message": "Die Wallet mit diesen Karten muss die Freigabe bestätigen. Es wurde nichts verbrannt oder abgebucht."
      },
      "closed": {
        "title": "Nichts ist passiert",
        "message": "Du hast das Wallet-Fenster geschlossen. Es wurde nichts verbrannt und nichts abgebucht. Deine Karten sind noch in deiner Wallet."
      },
      "unsigned": {
        "title": "Die Wallet hat nicht signiert",
        "message": "Deine Wallet konnte die Transaktionen nicht signieren. Es wurde nichts verbrannt und nichts abgebucht."
      },
      "short": { "title": "Die Wallet hat nicht signiert", "message": "Die Wallet hat weniger Signaturen geliefert als angefragt. Es wurde nichts gesendet." },
      "invalidCards": {
        "title": "Einige Karten können nicht reisen",
        "message": "Nimm sie aus deinem Team und prüfe die Route dann erneut. Es wurde nichts verbrannt oder abgebucht."
      },
      "addressRejected": { "title": "Die Adresse wurde abgelehnt", "message": "{detail} Es wurde nichts verbrannt oder abgebucht." },
      "conflict": {
        "title": "Diese Karten sind schon gebucht",
        "message": "Eine andere Sendung enthält einige dieser Karten und ist vielleicht schon bezahlt. Führe diese andere Sendung über deine Reisen fort, statt eine neue zu starten."
      },
      "alreadyDone": { "title": "Schon unterwegs", "message": "Diese Karten wurden bereits für den Versand verbrannt. Verfolge sie über deine Reisen." },
      "prepareFailed": {
        "title": "Die Sendung konnte nicht gestartet werden",
        "message": "{detail} Nichts wird verbrannt oder abgebucht, bevor du signierst, ein neuer Versuch ist also sicher."
      },
      "prepareNoAnswer": {
        "title": "Die Sendung konnte nicht gestartet werden",
        "message": "Keine Antwort vom Versandschalter. Nichts wird verbrannt oder abgebucht, bevor du signierst, ein neuer Versuch ist also sicher."
      },
      "checkWaiting": { "title": "Wir warten noch", "message": "Wir konnten die Sendung noch nicht lesen. Versuch es in einer Minute erneut." }
    }
  },
  "journey": {
    "status": {
      "pending_burn": "Warten auf den Burn",
      "processing": "Wird im Tresor verpackt",
      "shipped": "Unterwegs",
      "delivered": "Zugestellt",
      "failed": "Fehlgeschlagen",
      "cancelled": "Storniert"
    },
    "stops": [
      { "title": "Gebucht", "text": "Sendung erstellt" },
      { "title": "Verpacken", "text": "Verbrannt, bezahlt, wird verpackt" },
      { "title": "Unterwegs", "text": "Beim Paketdienst" },
      { "title": "Zuhause", "text": "Zugestellt" }
    ],
    "checking": "Wird geprüft…",
    "unreadable": "Nicht lesbar",
    "inProgress": "In Bearbeitung",
    "yourDoor": "deine Tür",
    "strip": "Route vom Slabz-Tresor zum Ziel ({place}), {pct} % der Strecke geschafft",
    "passLead": "Dein Versandpass ist abgelaufen.",
    "passText": "Sendungen werden damit gelesen, die Status unten sind also vielleicht nicht aktuell.",
    "where": "Wo das Paket ist",
    "shipment": "Sendung",
    "shipmentRef": "Sendung · {id}",
    "delivered": "Endlich zu Hause!",
    "stalledTitle": { "failed": "Sendung fehlgeschlagen", "cancelled": "Sendung storniert" },
    "reading": "Sendung wird gelesen…",
    "yourShipment": "Deine Sendung",
    "stalled": {
      "failed": "Der Versanddienstleister hat diese Sendung als fehlgeschlagen markiert. Kontaktiere den Slabz-Support mit der Referenz oben, bevor du es erneut versuchst.",
      "cancelled": "Der Versanddienstleister hat diese Sendung als storniert markiert. Kontaktiere den Slabz-Support mit der Referenz oben, bevor du es erneut versuchst."
    },
    "stalledAs": {
      "failed": "Der Versanddienstleister hat diese Sendung als fehlgeschlagen markiert („{status}“). Kontaktiere den Slabz-Support mit der Referenz oben, bevor du es erneut versuchst.",
      "cancelled": "Der Versanddienstleister hat diese Sendung als storniert markiert („{status}“). Kontaktiere den Slabz-Support mit der Referenz oben, bevor du es erneut versuchst."
    },
    "pendingLead": "Diese Sendung wurde gebucht, aber ihr Burn ist noch nicht durchgegangen.",
    "pendingText": "Wurde eine Freigabe unterbrochen, schließ sie hier ab: Deine Wallet bestätigt nur, was noch fehlt, für genau diese Sendung, also wird nichts doppelt bezahlt.",
    "finish": "Diese Sendung abschließen",
    "tracking": "Sendungsverfolgung",
    "trackingWith": "Sendungsverfolgung · {carrier}",
    "trackIt": "Verfolgen ↗",
    "trackParcel": "Paket verfolgen ↗",
    "paid": "Bezahlt",
    "shipping": "Versand",
    "insurance": "Versicherung",
    "booked": "Gebucht",
    "updated": "Letzte Aktualisierung",
    "cards": { "one": "{n} Karte in dieser Sendung", "other": "{n} Karten in dieser Sendung" },
    "renewToRead": "Erneuere den Pass, um diese Sendung zu lesen.",
    "final": "Endgültiger Status.",
    "polling": "Wird alle 30 Sekunden aktualisiert, solange diese Seite offen ist.",
    "pickTitle": "Wähle eine Reise zum Verfolgen",
    "pickText": "Jede Sendung, die du hier startest, wird auf diesem Gerät gespeichert, damit du sie verfolgen oder eine unterbrochene abschließen kannst.",
    "noneTitle": "Noch keine Reisen auf diesem Gerät",
    "noneText": "Sendungen, die du auf diesem Gerät startest, erscheinen hier, samt Sendungsverfolgung.",
    "others": "Deine anderen Reisen · auf diesem Gerät",
    "all": "Deine Reisen · auf diesem Gerät",
    "passNeeded": "Pass nötig",
    "more": "Weitere Slabs einlösen"
  }
};
