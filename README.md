# Cake Ordering Application

A cross-platform mobile app (React Native + TypeScript) for browsing cakes, placing orders, and managing cake inventory — backed by small Flask API servers (Python + SQLite). Intended as a full-stack demo / small production-ready prototype for a cake ordering system.

## Key points
- Mobile app lives in COS/ (TypeScript React Native)
- Two small Python Flask servers live in SERVERCAKE/ and SERVERUSER/ and use SQLite for persistence
- Client uses local SQLite on device (react-native-sqlite-storage) and talks to the Flask APIs for server-side data and order records

---

## Stack
- **Language(s):** TypeScript (app), Python (servers), Kotlin/Objective-C for native mobile bits
- **Framework / runtime:**
  - React Native (app) — project uses RN 0.73+ with React 18
  - Flask (servers) — simple REST API wrappers around SQLite
- **Notable libraries:**
  - @react-navigation/* (navigation)
  - react-native-sqlite-storage (local DB)
  - react-native-vector-icons (UI icons)
  - socket.io-client (included for realtime use)
  - Flask + sqlite3 on the server side

---

## Repository layout
Top-level (annotated)

```
COS/                React Native app (TypeScript). Screens, App.tsx, utilities
  ├─ App.tsx        App entry (navigation & tabs)
  ├─ screens/       Screens (Home, Cake, History, Profile, Login/Register, Admin, etc.)
  ├─ utility.ts     client utilities
SERVERCAKE/         Python Flask server + SQLite DB for cake catalog & order records
  ├─ server.py      Flask REST API (cakes, newcakes, cakerecords)
  ├─ mycakes.sqlite pre-populated SQLite DB used by server.py
SERVERUSER/         Python server + SQLite for user accounts
  ├─ serveruser.py  user-management API (users.sqlite included)
  ├─ users.sqlite   SQLite DB used by serveruser.py
SQLcreate/          SQL scripts to create DB tables (schema helpers)
assets/             images and app assets
android/ ios/       native projects for Android and iOS (React Native)
__tests__/          Jest tests (project tests)
package.json        JS dependencies & scripts
tsconfig.json       TypeScript config
```

How it fits together:
- The React Native app (COS/) is the client. It shows cake listings, lets users place orders and view history.
- The app reads/writes local data via react-native-sqlite-storage and calls the Flask servers (SERVERCAKE and SERVERUSER) for server-side persistence and multi-user functionality.
- SERVERCAKE exposes REST endpoints to list cakes, add new cakes and save cake order records. SERVERUSER manages user accounts.

---

## How to run the project (short path)

Prerequisites
- Node 18+ (package.json specifies node >= 18)
- Yarn or npm
- React Native environment set up (Android SDK / Xcode as appropriate)
- Python 3.x (for the Flask servers)
- CocoaPods for iOS (if running on iOS)

Install JS deps
```bash
# from repo root
npm install
# or
yarn
```

Start Metro
```bash
npm start
# or
yarn start
```

Run on Android
```bash
npm run android
# or
yarn android
```

Run on iOS
```bash
# macOS, from repo root
cd ios && pod install && cd ..
npm run ios
# or
yarn ios
```

Run tests
```bash
npm test
```

---

## Running the Flask servers

SERVERCAKE: (cake catalog + order records)
- File: SERVERCAKE/server.py
- DB: SERVERCAKE/mycakes.sqlite (included)

Quick run
```bash
# From repo root
python3 SERVERCAKE/server.py -p 5001
```
The server runs on 0.0.0.0:5001 by default (see server.py args). If you need a different port, pass `-p PORT`.

SERVERUSER: (user management)
- File: SERVERUSER/serveruser.py
- DB: SERVERUSER/users.sqlite (included)

Quick run (check serveruser.py for default port/flags)
```bash
python3 SERVERUSER/serveruser.py
```

Dependencies (server-side)
```bash
pip install Flask
# plus any other dependencies imported by serveruser.py (check its header)
```

---

## SERVERCAKE API (as implemented in SERVERCAKE/server.py)
Note: this is derived directly from the server implementation — use these sample shapes when calling the API.

- GET /api/cakes
  - Returns list of cakes (id, name, price, img)
- GET /api/cakes/:id
  - Returns single cake by id
- GET /api/cakerecords
  - Returns list of order records (id, name, price, img, date)
- POST /api/cakes
  - Adds a new order (cakerecord). Expects JSON:
    ```json
    { "name": "...", "price": 12.5, "img": "url-or-path", "date": "YYYY-MM-DD" }
    ```
  - Returns { id, affected, message } on success (201)
- POST /api/newcakes
  - Adds a new cake to the catalog. Expects JSON:
    ```json
    { "name": "...", "price": 9.99, "img": "url-or-path" }
    ```
  - Returns { id, affected, message } on success (201)
- PUT /api/cakes/:id
  - Update a cake entry. Expects JSON with id, name, price, img.
- DELETE /api/cakes/:id
  - Delete cake by id (expects JSON payload with matching id field)
- DELETE /api/cakerecords/:id
  - Delete an order record by id (expects JSON payload with matching id field)

Server responses include HTTP status codes and JSON error objects on failure. See SERVERCAKE/server.py for exact behavior and debug prints.

---

## Database
- SERVERCAKE/mycakes.sqlite — catalog + cakerecords
- SERVERUSER/users.sqlite — user data
- Local device DBs are handled via react-native-sqlite-storage for offline storage / caching

If you want to reset or recreate the DBs, check SQL scripts in SQLcreate/ and adapt as needed. Do not use these included SQLite files for production sensitive data.

---

## Common setup notes / troubleshooting
- iOS builds require running `pod install` in ios/ after installing JS deps.
- react-native-sqlite-storage (native module) may require additional native configuration on iOS/Android — follow its README if you see linking errors.
- If the mobile app cannot reach the Flask server on a device/emulator, ensure:
  - The server is accessible on the host IP (not just localhost) or use port-forwarding
  - For Android emulator, use 10.0.2.2:5001 (Android emulator) to reach host's localhost unless using a physical device
- If Python server errors mention missing modules, install them via pip (Flask is required).

---

## Development notes & tips
- The React Native app entry is COS/App.tsx — it wires stack + tab navigation and registers screens.
- New cakes (catalog) are added via POST /api/newcakes; orders are recorded via POST /api/cakes (cakerecords).
- Search for "sqlite" in COS/ screens to see where the app uses local SQLite storage.

---

## Contributing
1. Fork the repo
2. Create a feature branch
3. Run unit tests and check the app runs on simulator/emulator
4. Open a pull request describing changes and any required setup

Please add tests for new features where appropriate.

---

## License
No license file detected. Add a LICENSE (for example MIT) if you want to make this project open source.

---

## Contact
If you have questions or want to collaborate, open an issue or PR in this repository.
