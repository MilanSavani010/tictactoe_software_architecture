# Architectural Decision Records (ADRs)

## Table of Contents

* [ADR 001 - Programming Language](#adr-001-programming-language)
* [ADR 002 - Client-Side SPA vs. Server-Side Rendering](#adr-002-client-side-spa-vs-server-side-rendering)
* [ADR 003 - UI Framework Selection](#adr-003-ui-framework-selection)
* [ADR 004 - Client-Side State Storage](#adr-004-client-side-state-storage)
* [ADR 005 - Automated Unit Testing Before Deployment](#adr-005-automated-unit-testing-before-deployment)
* [ADR 006 - Containerization with Docker](#adr-006-containerization-with-docker)
* [ADR 007 - Single-Package Deployment (No Separate Frontend/Backend)](#adr-007-single-package-deployment-no-separate-frontend-backend)
* [ADR 008 - Build Tooling for Development and Production](#adr-008-build-tooling-for-development-and-production)
* [ADR 009 - Player Turn Handling Architecture](#adr-009-player-turn-handling-architecture)
* [ADR 010 – Backend Dependency Injection Pattern](#adr-010-backend-dependency-injection)

---

<a id="#adr-001-programming-language"></a>
## ADR 001 - Programming Language

**Title:** Programming Language

**Status:** Accepted

### Context

* Problem: Need a unified language for frontend UI updates and potential backend services.
* Environmental Conditions: Must run across modern browsers; support fast DOM operations.
* Quality Objectives: Functional Suitability, Usability, Performance Efficiency, Maintainability.

### Alternatives

1. Plain JavaScript (ES6+)

   * Advantages: No compile step; universal browser support.
   * Disadvantages: Dynamic typing increases runtime error risk.
2. TypeScript

   * Advantages: Static typing catches logic errors early; rich IDE support.
   * Disadvantages: Requires build tooling; initial learning curve.

### Decision

* Evaluation: TypeScript’s static analysis supports catching rule-logic bugs early.
* Final Decision: Adopt TypeScript for both frontend and any Node.js backend.

### Consequences

* Advantages: Improved code correctness; faster developer feedback.
* Disadvantages: Build pipeline complexity.
* Risks: Misconfigured compiler could introduce delays.

---
<a id="adr-002-client-side-spa-vs-server-side-rendering"></a>
## ADR 002 - Client-Side SPA vs. Server-Side Rendering

**Title:** Application Architecture Style

**Status:** Accepted

### Context

* Problem: Decide between SPA or SSR for a fully interactive game.
* Environmental Conditions: Limited server interaction; all logic client-side.
* Quality Objectives: Performance Efficiency, Usability, Reliability.

### Alternatives

1. Server-Side Rendering (SSR)

   * Advantages: Faster first-paint; reduced initial JS bundle.
   * Disadvantages: Potential server round-trips for each move.
2. Single-Page Application (SPA)

   * Advantages: Instant UI updates; no reloads.
   * Disadvantages: Larger initial bundle.

### Decision

* Evaluation: SPA meets the sub-50 ms tap-to-render requirement.
* Final Decision: Implement as a SPA with client-side state.

### Consequences

* Advantages: Immediate responsiveness; simplified state management.
* Disadvantages: Build pipeline required.

---

<a id="adr-003-ui-framework-selection"></a>
## ADR 003 - UI Framework Selection

**Title:** UI Framework Selection

**Status:** Accepted

### Context

* Problem: Choose a component model for dynamic grid rendering.
* Environmental Conditions: Must support reactive updates; minimal footprint.
* Quality Objectives: Usability, Maintainability, Performance Efficiency.

### Alternatives

1. Vanilla JS with Custom Components

   * Advantages: No dependencies; minimal overhead.
   * Disadvantages: Reinvent common patterns.
2. React (with Hooks)

   * Advantages: Declarative UI; mature ecosystem.
   * Disadvantages: \~30 KB bundle overhead.

### Decision

* Evaluation: React’s Virtual DOM and component model suit a 3x3 grid.
* Final Decision: Use React functional components with hooks.

### Consequences

* Advantages: Component reuse; easier testing.
* Disadvantages: Bundle size increase.

---

<a id="adr-004-client-side-state-storage"></a>
## ADR 004 - Client-Side State Storage

**Title:** State Persistence Mechanism

**Status:** Accepted

### Context

* Problem: Preserve game state on refresh or accidental close.
* Environmental Conditions: Small JSON payload; synchronous access acceptable.
* Quality Objectives: Reliability, Performance Efficiency, Maintainability.

### Alternatives

1. IndexedDB

   * Advantages: Asynchronous; scalable.
   * Disadvantages: Complex API for small data.
2. localStorage

   * Advantages: Simple API; wide support.
   * Disadvantages: Blocking I/O; limited size.

### Decision

* Evaluation: localStorage is sufficient for sub-1 KB state and simple to use.
* Final Decision: Use localStorage for board and turn data.

### Consequences

* Advantages: Easy implementation.
* Disadvantages: Blocking writes.

---

<a id="adr-005-automated-unit-testing-before-deployment"></a>
## ADR 005 - Automated Unit Testing Before Deployment

**Title:** Testing Strategy

**Status:** Accepted

### Context

* Problem: Ensure rule logic correctness and prevent regressions.
* Environmental Conditions: CI/CD environment; test runner available.
* Quality Objectives: Reliability, Functional Suitability, Maintainability.

### Alternatives

1. Manual Testing Only

   * Advantages: No setup.
   * Disadvantages: Inconsistent coverage.
2. Automated Unit Tests (Jest)

   * Advantages: Repeatable; integrates with CI.
   * Disadvantages: Maintenance effort.

### Decision

* Evaluation: Automated tests provide measurable confidence (≥85% coverage).
* Final Decision: Adopt Jest for unit tests enforced in CI.

### Consequences

* Advantages: Regression prevention.
* Disadvantages: Test maintenance overhead.

---

<a id="adr-006-containerization-with-docker"></a>
## ADR 006 - Containerization with Docker 

**Title:** Packaging and Deployment Image

**Status:** Accepted

### Context

* Problem: Deliver OCR-compatible image for consistent deployment.
* Environmental Conditions: Target hosts support Docker.
* Quality Objectives: Reliability, Performance Efficiency, Usability.

### Alternatives

1. Shell Scripts + VM

   * Advantages: No container tech.
   * Disadvantages: Drift; harder reproducibility.
2. Docker Image

   * Advantages: Immutable; versioned.
   * Disadvantages: Learning curve.

### Decision

* Evaluation: Docker ensures identical runtimes.
* Final Decision: Package into a single Docker image.

### Consequences

* Advantages: Consistent environment.
* Disadvantages: Image maintenance.

---

<a id="adr-007-single-package-deployment-no-separate-frontend-backend"></a>
## ADR 007 - Single-Package Deployment (No Separate Frontend/Backend) 

**Title:** Monolithic Deployment Package

**Status:** Accepted

### Context

* Problem: Simplify deployment by bundling all components.
* Environmental Conditions: Client-side SPA; no external APIs.
* Quality Objectives: Maintainability, Reliability, Usability.

### Alternatives

1. Separate Frontend and Backend Images

   * Advantages: Separation of concerns.
   * Disadvantages: Orchestration complexity.
2. Monolithic Single Image

   * Advantages: One artifact.
   * Disadvantages: Coupling of components.

### Decision

* Evaluation: Monolithic image aligns with project simplicity.
* Final Decision: Bundle frontend and backend in one image.

### Consequences

* Advantages: Simplified CI/CD.
* Disadvantages: Larger image size.

---

<a 
id="adr-008-build-tooling-for-development-and-production"></a>
## ADR 008 - Build Tooling for Development and Production 

**Title:** Build Tooling Selection

**Status:** Accepted

### Context

* Problem: Choose a bundler for TypeScript/React.
* Environmental Conditions: Need fast dev builds; optimized prod bundles.
* Quality Objectives: Performance Efficiency, Maintainability, Reliability.

### Alternatives

1. Webpack

   * Advantages: Configurable; large ecosystem.
   * Disadvantages: Complex setup.
2. Rollup

   * Advantages: Small bundles.
   * Disadvantages: Less SPA-oriented.
3. Vite

   * Advantages: Fast dev server; minimal config.
   * Disadvantages: Newer tool.

### Decision

* Evaluation: Vite meets fast iteration and efficient production needs.
* Final Decision: Use Vite for both dev and prod builds.

### Consequences

* Advantages: Rapid feedback; small bundle.
* Disadvantages: Ecosystem maturity risks.



<a id="adr-009-player-turn-handling-architecture"></a>
## ADR 009 – Player Turn Handling Architecture

**Title:** Player Turn Handling Architecture

**Status:** Accepted

### Context

* **Problem:** Players must be able to take turns from separate devices (e.g., father at office, son at school), with the game enforcing valid turn order and keeping the board state consistent.
* **Environmental Conditions:** Browser-based SPA (React + TypeScript), instant browser access, no installation, cross-device play required.
* **Quality Objectives:** Functional Suitability, Usability, Reliability.

### Alternatives

1. **Frontend-Only Local State**

   * **Advantages:** Extremely simple, fast, no backend needed.
   * **Disadvantages:** Only supports two players sharing a single device; cannot synchronize turns or game state across devices.

2. **Backend-Driven Shared State**

   * **Advantages:** Allows play from different devices/browsers; ensures authoritative game state and turn enforcement; supports both local and remote play.
   * **Disadvantages:** Requires backend development (API, session management); increased architectural complexity.

### Decision

* **Evaluation:** Only a backend-driven approach fully satisfies the requirement that players (e.g., Lukas and Herr Hofmann) can each take turns from their own device, ensuring consistent game state and valid turns.
* **Final Decision:** Use a backend-driven shared state architecture, where all moves are processed by a central server and reflected in real time in every connected client.

### Consequences

* **Advantages:**

  * Both personas’ user journeys are supported: play from any device, anywhere.
  * Centralized logic prevents out-of-turn moves and state desynchronization.
  * Future features like “invite friend” or statistics are easier to add.

* **Disadvantages:**

  * Additional development complexity (need for a backend).
  * Server hosting and session management required.


<a id="adr-010-backend-dependency-injection"></a>
## ADR 010 – Backend Dependency Injection Pattern

**Title:** Backend Dependency Injection Pattern

**Status:** Accepted

### Context

* **Problem:** As our backend grows, we need to decouple components (controllers, services, repositories, domain logic) to improve testability, maintainability, and flexibility.
* **Environmental Conditions:** Node.js backend using CommonJS modules, Express for HTTP API, and a Domain-Driven Design (DDD) structure.
* **Quality Objectives:** Testability, Maintainability, Low Coupling, High Cohesion.

### Alternatives

1. **Manual Dependency Passing**
   * *Advantages:* Simple, explicit.
   * *Disadvantages:* Tedious and error-prone as the number of dependencies grows; harder to swap implementations in tests.

2. **Service Locator Pattern**
   * *Advantages:* Centralizes dependency management.
   * *Disadvantages:* Hides dependencies, making code harder to reason about and test; can lead to hidden coupling.

3. **Dependency Injection (DI) Pattern with a Container (e.g., Awilix)**
   * *Advantages:* Explicit dependencies, easy to swap implementations (for testing/mocking), supports constructor injection, aligns with DDD and modern Node.js practices.
   * *Disadvantages:* Slight learning curve; adds a small dependency.

### Decision

* **Evaluation:** DI with a container (Awilix) provides the best balance of explicitness, testability, and maintainability. It allows us to inject repositories into services, and services into controllers, without manual wiring or hidden dependencies.
* **Final Decision:** Adopt the Dependency Injection pattern using [Awilix](https://github.com/jeffijoe/awilix) as our DI container for the backend.

### Consequences

* **Advantages:**
  * All dependencies are explicit and easily swappable for testing.
  * Code is easier to maintain and extend as the project grows.
  * Aligns with our DDD structure and other architectural decisions (see ADR 009 for backend-driven state).
* **Disadvantages:**
  * Slightly more complex setup.
  * Developers must understand the DI container’s API.

