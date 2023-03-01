# Loggsy Testing Guide

> This guide will help you test Loggsy on your local machine.

---

<details>
<summary>Frontend</summary>

<br>

### Cypress

> If you have followed the [Setup Guide](./docs/SETUP.md), then you should have the frontend server running on `http://localhost:3000`
> and also have Cypress installed.

- [ ] Open the Cypress GUI

> Make sure you are in the client directory

```bash
pnpm cypress open
```

- [ ] Select one of the modes to run the tests (E2E or Component)

- [ ] Click on any of the test files to run the tests within that file

</details>

---

<details>
<summary>Backend</summary>

<br>

### Unittest

- [ ] Navigate to the server directory

```bash
cd server
```

- [ ] Start the Virtual Environment

```bash
# For Mac
source venv/bin/activate

# For Windows
venv\Scripts\activate
```

- [ ] Run the tests

```bash
# For Mac
python3 manage.py test --keepdb

# For Windows
python manage.py test --keepdb

### The --keepdb flag is used to persist the database after the tests are run
### This is useful as for every subsequent runs, no new databases are created and destroyed
```

</details>

---
