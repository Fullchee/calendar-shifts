# [Calendar Shifts]()

Quickly create reoccurring calendar events.

When you get your next month's schedule and you need to quickly add it to your calendar.

## Install

### Dependencies

- git-crypt

Install the npm dependencies.

```bash
yarn install
```

Ask Fullchee for the key to decrypt git-crypt. Then run

```bash
git-crypt unlock `path to file`
```

Now you're ready to start the app!

```bash
yarn start
```

## TODOs
- Create a UI to 
- create an event with a react calendar UI
- Read google calendar events (search for a specific name)
  - if it finds it, add some UI change to the React Calendar UI
- If not logged in, just show the login
  - or, when you click create event, if not logged in, ask for login
