# Holo Web Sdk / Capacitor demo

## Setup

```
npm install
nix-shell
npm run hc:gen-agent
npm run hc:run-agent
```

second terminal
```
npm run holo:chaperone
```

third terminal

make sure you have cocoapods installed. You can check with
```
pod --version
```
and install with
```
brew install cocoapods
```

then run

```
npm run ios
```

This should give you a prompt to choose a simulator. Once the simulator is running you should see an app with a "sign in" button. Clicking sign in will show you the (currently pretty broken on mobile) chaperone sign in window. Put anything in email and password and log in.

Now you should see "update profile" and "get profile" buttons, which call the elemental chat profile zome. get profile also updates the ui with the result