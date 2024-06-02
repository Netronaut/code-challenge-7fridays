# Code Challenge für 7Fridays

Hi,

ich habe für die Code-Challenge ein Setup mit NextJS, Tailwind und [bun](https://bun.sh/) gewählt. Bun ist eine alternative nodejs-Runtime, die wesentlich schneller startet und arbeitet. Bun enthält bereits viele Aspekte out-of-the-box:

- einen Paketmanager (ersetzt npm)
- einen Testrunner (ersetzt zB. jest)
- einen Bundler (ersetzt Webpack u.a.)
- nativen Typescript-Support (kein Transpile nötig)

Bun implementiert dabei die nodejs-API weitestgehend und verhält sich auch wie npm.

Du findest eine Demo-Installation hier: https://code-challenge-7fridays.vercel.app/

## Getting Started

Du musst zuerst bun installieren:

```bash
curl -fsSL https://bun.sh/install | bash
```

Um den Development-Server zu starten:

```bash
bun dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## Über die Code Challenge

Ich habe für diese Code-Challenge das Template der Default-App von create-next-app übernommen und erweitert. Ich nutze die aktuelle Version von NextJS mit dem AppRouter, was eine relativ neue Art ist, wie man Web-Applikationen mit dem Framework NextJS entwickelt. Du findest die Seiten (oder Views) unter _src/app/\*\*/page.tsx_.

Es gibt drei Routen:

- **src/app/page.tsx**  
  die Startseite mit der Produktübersicht
- **src/app/[slug]/page.tsx**  
  die Produkt-Detailseite
- **src/app/checkout/page.tsx**  
  die Warenkorb-Seite

In **src/app/layout.tsx** ist das allgemeine Layout definiert, das auf allen Seiten angewendet wird.

In **src/components** findest du die UI-Komponenten, unter **src/lib** sind einige generelle Utilities und sonstiger Code untergebracht.

Siehe [https://nextjs.org/docs](https://nextjs.org/docs) für mehr Details.

### GraphQL-API

Für die API-Route habe ich mich für den Apollo-Server entschieden, weil dieser einfach konfiguriert und schnell einsetzbar war. Auf der Client-Seite benutze ich jedoch reguläres Fetch.

> Meine Philosophie: keep it simple an stupid - keine unnötigen Optimierungen, wenn diese keinen signifikanten Vorteil bieten.

Du findest die API-Route unter **src/app/api/route.ts**

### UI

Die UI ist denkbar minimal und baut auf den vorhandenen Bestandteilen auf. Ich habe mich bemüht, alle Teilaspekte in Komponenten zu zerlegen (Button, Cart, ProductItem, ProductList) und die Benennung möglichst logisch zu halten.

### Testing

Bei der Testabdeckung habe ich mich auf das Testen der funktionalen Aspekte beschränkt. So werden zB. die API-Routen getestet und das Verhalten des Warenkorbes (add, remove, delete), nicht jedoch das visuelle Rendern der anderen Komponenten. Dies ist eine bewusste Entscheidung, um auch hier wieder unnötige Optimierung zu vermeiden.

Du kannst die Tests so ausführen:

```bash
bun test
```

Der Charme an der bun-Runtime ist, dass keine zusätzlicher Testrunner oder spezielle Konfiguration nötig ist. Lediglich eine DOM-API ([happydom](https://github.com/capricorn86/happy-dom)) und die [React-Testing-Library](https://testing-library.com/docs/react-testing-library/intro/) müssen zusätzlich installiert werden.

### Selbstkritik & Einschätzung

1. Kritik

Eine Kritik an dem Setup muss ich direkt selbst anbringen: weil Server-Routen ([Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)) nicht zur Build-Zeit zur Verfügung stehen, müssen alle Komponenten, die Daten von der API laden, diese Daten auf Client-Seite laden.

Aufgrund der vorliegenden Anforderungen ist das ok, in einem real-Life Szenario würde ich jedoch versuchen, möglichst viele der Komponenten und Pages als Server-Komponenten umzusetzen und zu vermeiden, dass erst auf Klick die Produktdaten geladen werden. Besser wäre also, alle Seiten komplett statisch vorzurendern und die Produkte über eine externe API zu laden (nicht über Route-Handler innerhalb desselben Projektes).

2. Kritik

Die zweite Kritik bezieht sich auf die Beobachtung, dass nach wie vor die Suspense-API von React nicht offiziell dokumentiert ist und als unstable gelten muss. Ich hätte gern einen inheitlicheren Ansatz verwendet (wie react-query o.ä.) unter Nutzung von `<Suspense>`, dies war jedoch ohne viel Aufwand nicht möglich. Also zurück zum guten alten `useEffect` und `useState` ;).

---

Vielen Dank und viel Erfolg bei der Freelancer-Suche!

❤️ [Jakob](https://github.com/jhohlfeld)
