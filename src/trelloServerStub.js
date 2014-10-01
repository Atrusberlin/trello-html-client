function TrelloServerStub() {

  $this = this;

  $this.setFailureHandler = function () {
  }

  $this.loadBoard = function (boardId, callback) {
    $.getJSON("conf/board.json", callback);
  };

  $this.loadLists = function (boardId, callback) {
    $.getJSON("conf/lists.json", callback);
  }

  $this.loadCards = function (listId, callback) {
    $.getJSON("conf/cards_" + listId + ".json", callback);
  };

  $this.loadMembers = function (cardId, callback) {

  };


}