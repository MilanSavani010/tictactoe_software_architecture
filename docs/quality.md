# Part 1 – Quality Attributes


## 1. Ranked ISO 25010 Quality Attributes

| Rank | Attribute              |
| ---- | ---------------------- |
| 1    | Functional Suitability |
| 2    | Usability              |
| 3    | Reliability            |
| 4    | Performance Efficiency |
| 5    | Maintainability        |

### Least Important

* **Security** – Minimal relevance for a local, two-player browser game with no sensitive data.

---

## 2. Descriptions and Rationale

### 1. Functional Suitability

* **Description:** It measures How well the game functions correctly according to the game rules, and logic.

* **importance:** Core gameplay deepends on the correct rules enforcement in continous and error free manner as well as  correct game logic.

* **Use Case**: When a player clicks the bottom-right cell to complete three in a row, the system must immediately recognize the win condition on the diagonal and display “Player X Wins.” Any missed or incorrect detection (e.g., only horizontal/vertical checks) breaks the rule logic.

### 2. Usability

* **Description:** How easy and logical to use the game interface with clear well defined actions, feedback, and controls.

* **Importance:** The more easy to learn the Interface the more user can focus to Play actual game rather than stuck into learning the external environment.

* **Use Case**: A first-time user opens the game URL on their smartphone, taps any empty cell, and expects an X or O to appear at that exact location. If tapping outside the visible grid or ambiguous hit zones leads to misplacement, users become frustrated.


### 3. Reliability

* **Description:** Stability of the game under normal use: crash resistance, state persistence (e.g., page refresh or tab switch).

* **Importance:** Unexpected crashes or lost game state undermine trust and satisfaction, especially mid-match.

* **Use Case:** During a match, a player accidentally refreshes the page. The application must restore the current board state, so players can resume without losing progress. Failure to persist state causes replay frustration.

### 4. Performance Efficiency

* **Description:** Responsiveness and resource usage: minimal tap-to-render latency, fast load times, low memory footprint.

* **Importance:** Even lightweight apps feel sluggish if delays occur; fast response keeps game flow smooth.

* **Use Case:** A player taps a cell over a standard mobile network. The X or O must render within 50 ms of the tap event. If rendering lags above 200 ms, the input feels unresponsive, breaking the game’s pacing.

### 5. Maintainability

* **Description:** Ease of updating and extending the code: modular design, clear structure, automated tests.
* **Importance:** Although simple now, a clean codebase allows future tweaks (UI tweaks, new themes) without major rewrites.

* **Use Case:** A developer needs to add a “highlight winning line” feature. By modifying or extending only the win-detection module and view-renderer component (≤2 files), the new feature integrates without changing core game logic elsewhere.



# Part 1 – Quality Attributes

In this file, we document the results for our Browser-Based TicTacToe project, focusing on Part 1, Tasks 1 and 2:

1. **List and rank the 5 most important ISO 25010 quality attributes.**
2. **For each attribute: short description and a specific use case.**

---

## 1. Ranked ISO 25010 Quality Attributes

| Rank | Attribute              |
| ---- | ---------------------- |
| 1    | Functional Suitability |
| 2    | Usability              |
| 3    | Reliability            |
| 4    | Performance Efficiency |
| 5    | Maintainability        |

### Least Important

* **Security** – Low relevance for a client-side, two-player browser game with no personal data.

---


### 1. Functional Suitability

* **Short Description:** Correct implementation of game rules, including move validation, win/draw detection, and board reset.
* **Use Case:** When a player clicks the bottom-right cell to complete three in a row, the system must immediately recognize the win condition on the diagonal and display “Player X Wins.” Any missed or incorrect detection (e.g., only horizontal/vertical checks) breaks the rule logic.

### 2. Usability

* **Short Description:** Intuitive interface where players can start a match and place marks without guidance.
* **Use Case:** A first-time user opens the game URL on their smartphone, taps any empty cell, and expects an X or O to appear at that exact location. If tapping outside the visible grid or ambiguous hit zones leads to misplacement, users become frustrated.

### 3. Reliability

* **Short Description:** Consistent game behavior under normal actions, including browser refresh or accidental tab close-and-reopen.
* **Use Case:** During a match, a player accidentally refreshes the page. The application must restore the current board state, so players can resume without losing progress. Failure to persist state causes replay frustration.

### 4. Performance Efficiency

* **Short Description:** Fast load times and immediate rendering of user actions under typical web conditions.
* **Use Case:** A player taps a cell over a standard mobile network. The X or O must render within 50 ms of the tap event. If rendering lags above 200 ms, the input feels unresponsive, breaking the game’s pacing.

### 5. Maintainability

* **Short Description:** Clear, modular code structure that allows easy bug fixes and feature tweaks.
* **Use Case:** A developer needs to add a “highlight winning line” feature. By modifying or extending only the win-detection module and view-renderer component (≤2 files), the new feature integrates without changing core game logic elsewhere.


# Part 2 – Quality Scenarios



## 1. Functional Suitability

**Scenario: Win Detection Latency**

* **Stimulus:** Player completes three in a row.
* **Environment:** Desktop browser (Chrome) during Local Multiplayer.
* **Response:** Game highlights the winning line and displays “Player X Wins.”
* **Response Measure:** ≤100 ms from the third mark placement to display, averaged over 100 trials (SD ≤5 ms).

**Scenario: Draw State Recognition**

* **Stimulus:** Final cell is filled without any winning line.
* **Environment:** Mobile browser (Safari on iOS) with stable network.
* **Response:** Game displays “Draw.”
* **Response Measure:** 100% correct draw detection across 500 randomized end-state tests.

## 2. Usability

**Scenario: First-Time Cell Placement Success**

* **Stimulus:** New user taps an empty cell.
* **Environment:** Touchscreen smartphone, unlocked state.
* **Response:** Mark appears in the tapped cell.
* **Response Measure:** ≥95% of 20 participants place the mark correctly on first tap without instruction.

**Scenario: Menu Navigation**

* **Stimulus:** User clicks “Local Multiplayer” button.
* **Environment:** Browser window resized to 320×480 px.
* **Response:** Multiplayer setup screen loads, displaying a correctly formatted 3×3 grid.
* **Response Measure:** ≤200 ms load time; grid cells align without overlap in 5 tested browsers.

## 3. Reliability

**Scenario: State Persistence After Refresh**

* **Stimulus:** User refreshes the page mid-game.
* **Environment:** Chrome desktop with localStorage enabled.
* **Response:** Exact board state and current player turn are restored.
* **Response Measure:** 100% pass rate over 50 refresh trials.

**Scenario: Continuous Operation Under Stress**

* **Stimulus:** Rapid cell tapping and window resizing for 5 minutes.
* **Environment:** Mid-range laptop.
* **Response:** Game remains running and responsive, with no errors.
* **Response Measure:** Zero crashes or frozen states during 100 stress test iterations.

## 4. Performance Efficiency

**Scenario: Tap-to-Render Latency**

* **Stimulus:** User taps a grid cell.
* **Environment:** 4G mobile network, Chromium on Android.
* **Response:** Mark renders at tap location.
* **Response Measure:** ≤50 ms latency in 95% of 200 measurements.

**Scenario: Initial Load Time**

* **Stimulus:** Player navigates to the game URL.
* **Environment:** Broadband 25 Mbps on desktop.
* **Response:** Game UI fully interactive.
* **Response Measure:** ≤1 s from request to interactivity in 90% of 100 page loads.

## 5. Maintainability

**Scenario: Adding UI Theme**

* **Stimulus:** Developer introduces a new CSS theme file and references it in configuration.
* **Environment:** Codebase checked out on main branch.
* **Response:** Game applies new theme without build or runtime errors.
* **Response Measure:** ≤2 source files modified; automated build passes without warnings.

**Scenario: Unit Test Coverage**

* **Stimulus:** CI pipeline executes unit tests.
* **Environment:** GitHub Actions runner.
* **Response:** Coverage report generated.
* **Response Measure:** ≥85% coverage for game-logic modules.
