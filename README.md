## BioNode

Webid access control with biometric data client.

[link to wiki here]()

#### How to run
1. clone the repo `git clone https://url/to/repo/`.
3. make sure to have node.js installed on your computer.
4. run `npm install` to install the dependencies.
5. run the application with `npm start`.

#### Contributing
[link to wiki page on contributing standards]()

#### Dependency install troubleshooting
If you get errors related to make failing the build like below:
```bash
gyp ERR! build error 
gyp ERR! stack Error: `make` failed with exit code: 2
gyp ERR! stack     at ChildProcess.onExit (/usr/lib/node_modules/npm/node_modules/node-gyp/lib/build.js:270:23)
gyp ERR! stack     at emitTwo (events.js:87:13)
gyp ERR! stack     at ChildProcess.emit (events.js:172:7)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:200:12)
gyp ERR! System Linux 4.2.0-16-generic
gyp ERR! command "/usr/bin/nodejs" "/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
```
You probably need to install `libkrb5-dev` to your machine.
This is easy on ubuntu or debian, simply run `sudo apt-get install libkrb5-dev` then try to run `npm install` again.
