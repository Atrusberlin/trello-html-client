# Trello JavaScript Client

This project has the goal to show a Trello Board as a simple view.

The view is read only and allows any person to read the board even without an own Trello login.

## How-To

Import the JavaScript and CSS files also the jquery library.
Define the following HTML snippet:

```html
<script language="JavaScript" type="text/javascript" src="lib/jquery-2.1.1.min.js"></script>
<script language="JavaScript" src="lib/jquery-ui-1.11.0-custom.min.js" type="text/javascript"></script>
<script language="JavaScript" type="text/javascript" src="src/trelloClient.js"></script>
<script language="JavaScript" type="text/javascript" src="src/trelloClientVersion.js"></script>

<style type="text/css">
  @import "trelloClient.css";
  @import "style/trelloClientVersion.css";
</style>

<span id="trelloError"></span>

<div id="board" style="width:600px; height:400px">
  <span id="info"> [enter the text you want to show] </span>
  <div id="boardTitle"></div>
  <div id="boardLists"></div>
</div>

<script language="JavaScript">
  // VersionInfo requires the releasenotes.json file
  var version = new TrelloClientVersion("releasenotes.json");
  version.activate();

  var client = new TrelloClient([trello application key],[trello user token]);
  client.descriptionEnabled = true; // default
  client.dueDateEnabled = true; // default
  client.avatarPrefix = "Member: ";
  client.showBoardTitle = true; // default
  client.loadBoard([boardId]);
</script>
```

## Demo - trelloClient.html

### nginx HTML Server

- install the server from http://nginx.org/en/download.html
- create a environment variable %NGINX_DIR%
- use the batch files "nginx_start.bat" and "nginx_stop.bat" to run and halt the server

### Configuration

To run this demo you need to specify a `config.json` next to `trelloClient.html`
```json
{
  "applicationKey" : "[yourApplicationKey]",
  "userToken" : "[yourTokenAuthorizedByAUserHowHasAccessToTheBoard]",
  "boardId" : "[theBoardId: e.g. cI66RoQS]",
  "online" : true
}
```

_**yourApplicationKey**_: [Generate your own application key](https://trello.com/1/appKey/generate)

_**yourTokenAuthorizedByAUserHowHasAccessToTheBoard**_: `https://trello.com/1/authorize?key={YourAppKey}&name={YourAppName}&expiration=1day&response_type=token&scope=read`

Public boards don't need neither **applicationKey** nor **userToken**.

_**online**_: switch to disable requests to trello.com

## License

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.