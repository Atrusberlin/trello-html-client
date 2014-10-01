function TrelloServer(appKey, userToken) {
  $this = this;

  var keyAndToken = "";
  if (appKey) {
    keyAndToken = "key=" + appKey;
  }
  if (userToken) {
    keyAndToken += "&token=" + userToken;
  }

  function getKeyAndToken(prefix) {
    if (keyAndToken) {
      return prefix + keyAndToken;
    }
    return "";
  }

  var $failureHandler = function (data) {
  };

  $this.setFailureHandler = function (handler) {
    $failureHandler = handler;
  };

  $this.loadBoard = function (boardId, callback) {
    var getBoard = "https://trello.com/1/boards/" + boardId + getKeyAndToken("/?");
    $.get(getBoard, null, callback, "json");
  };

  $this.loadLists = function (boardId, callback) {
    var getLists = "https://trello.com/1/boards/" + boardId + "/lists" + getKeyAndToken("?");
    $.get(getLists, null, callback, "json").fail($failureHandler);
  }

  $this.loadCards = function (listId, callback) {
    var cardRest = "https://api.trello.com/1/lists/" + listId + "/cards" + getKeyAndToken("?")
    $.get(cardRest, null, callback, "json").fail($failureHandler);
  };

  $this.loadMembers = function (cardId, callback) {
    var membersRequest = "https://api.trello.com/1/card/" + cardId + "/members" + getKeyAndToken("?");
    $.get(membersRequest, null,function (data) {
      callback(data, cardId)
    }, "json").fail($failureHandler);
  };

  var invokeCallbackWithData = function (data, callback) {
    callback(data);
  };
}

