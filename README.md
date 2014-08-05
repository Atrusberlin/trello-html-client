# Trello JavaScript Client

This project has the goal to show a Trello Board as a simple view.

The view is read only and allows any person to read the board even without an own Trello login.

## How-To

Import the JavaScript and CSS files also the jquery library.
Define the following HTML snippet:

```html
<script language="JavaScript" src="lib/jquery-2.1.1.min.js"></script>
<script language="JavaScript" src="trelloClient.js"></script>

<script language="JavaScript">
  var client = new TrelloClient([trello application key],[trello user token]);
  client.descriptionEnabled = true; // default
  client.dueDateEnabled = true; // default
  client.showBoardTitle = true; // default
  client.requestLists([boardId]);
</script>

<style type="text/css">
  @import "trelloClient.css";
</style>

<span id="trelloError"></span>

<div id="board" style="width:600px; height:400px">
  <span id="info"> [enter the text you want to show] </span>
  <div id="boardTitle"></div>
  <div id="boardLists"></div>
</div>
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
  "boardId" : "[theBoardId: e.g. cI66RoQS]"
}
```

_**yourApplicationKey**_: [Generate your own application key](https://trello.com/1/appKey/generate)

_**yourTokenAuthorizedByAUserHowHasAccessToTheBoard**_: `https://trello.com/1/authorize?key={YourAppKey}&name={YourAppName}&expiration=1day&response_type=token&scope=read`

Public boards don't need neither **applicationKey** nor **userToken**.

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