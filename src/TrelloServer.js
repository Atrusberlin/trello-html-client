function TrelloServer(appKey, userToken) {
  $this = this;

  var keyAndToken = "";
  if (appKey) {
    keyAndToken = "key=" + appKey;
  }
  if (userToken) {
    keyAndToken += "&token=" + userToken;
  }

  var $failureHandler = function (data) {
  };

  $this.setFailureHandler = function (handler) {
    $failureHandler = handler;
  };

  $this.loadBoard = function (boardId, callback) {
    var getBoard = "https://trello.com/1/boards/" + boardId + getKeyAndToken("/?");
    $.get(getBoard, null, invokeCallbackWithData(data, callback), "json");
  };

  $this.loadLists = function (boardId, callback) {
    var getLists = "https://trello.com/1/boards/" + boardId + "/lists" + getKeyAndToken("?");
    $get(getLists, null, invokeCallbackWithData(data, callback), "json").fail($failureHandler);
  }

  var invokeCallbackWithData = function (data, callback) {
    callback(data);
  };
}

