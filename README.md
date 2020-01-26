# [Calendar Shifts]()

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

- Front page: show login button (state: isLoggedIn?)
  - or the calendar view if already logged in
  - add a sign out button if not signed in
- create an event with a react calendar UI
- Read google calendar events (search for a specific name)
  - if it finds it, add some UI change to the React Calendar UI
- If not logged in, just show the login
  - or, when you click create event, if not logged in, ask for login
-

## User stories

- edit the name/times of a shift
- delete a shift
- dropdown: default value?
