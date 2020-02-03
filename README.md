# [Calendar Shifts](https://calendar-shifts.netlify.com/)

Quickly create reoccurring calendar events.

When you get your next month's schedule and you need to quickly add it to your calendar.

## How to use

1. Login
2. Select the days you have that shift.
3. Create a title and a description for your calendar events
4. Click "Add shifts" to add a shift!

## Install

### Dependencies

- git-crypt

Install the npm dependencies.

```bash
yarn install
```

Ask Fullchee for the key to decrypt git-crypt. Then run

```bash
git-crypt unlock `path to key file`
```

Now you're ready to start the app!

```bash
yarn start
```

## TODOs

- CircleCI and cypress
- Husky and git hooks
- Read google calendar events (search for a specific name)
  - if it finds it, add some UI change to the React Calendar UI
- Created # calendar events toast
- Tutorial on first load

## Lessons learned

- apiGoogleconfig.json: encrypted with git-crypt
  - Had trouble getting gcal working on netlify
  - tried GH Pages as well without success
- Verifying a website with Google was surprisingly easy

### Tech

- React
- git-crypt
- Git hooks (Husky)
- Cypress.io (E2E testing)
- ~~Integration tests (React testing library)~~
