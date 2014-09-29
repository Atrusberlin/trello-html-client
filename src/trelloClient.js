function TrelloClient(server) {
  var $this = this;

  $this.dueDateEnabled = true;
  $this.descriptionEnabled = true;
  $this.showBoardTitle = true;
  $this.avatarPrefix = "";

  function handleFailure(data) {
    $("#trelloError").html("Error (" + data.status + "): " + data.responseText)
        .css("display", "block");
  }

  function shortDate(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    var date = day + "." + month;

    return date;
  }

  function handleMemberResponse(data, cardId) {
    var $members = $("<div class='cardMembers' id='cardMembers" + cardId + "'></div>");
    for (i = 0; i < data.length; i++) {
      var current = data[i]
      var title = $this.avatarPrefix + current.fullName;
      $members.append("<div class='avatar' title='" + title + "'>" + current.initials + "</div>");
    }
    $members.appendTo("#card" + cardId + " .cardDetails");
  }

  function requestMember(cardId) {
    var membersRequest = "https://api.trello.com/1/card/" + cardId + "/members" + getKeyAndToken("?");
    $.get(membersRequest, null, function (data) {
      handleMemberResponse(data, cardId)
    }, "json").fail(handleFailure);
  }

  function handleCardResponse(data) {
    for (i = 0; i < data.length; i++) {
      var current = data[i];
      var listId = current.idList;
      var $card = $("<div id='card" + current.id + "' class='card'><div>" + current.name + "</div></div>");
      var $details = $("<div></div>").addClass("cardDetails");
      var $data = $("<div></div>").addClass("cardData");
      if ($this.descriptionEnabled && current.desc) {
        var $desc = $("<div></div>").addClass("cardDescription").attr("title", current.desc);
        $desc.appendTo($data);
      }
      if ($this.dueDateEnabled && current.due) {
        var $dueDate = $("<div></div>");
        $dueDate.addClass("dueDate").text(shortDate(current.due));
        $dueDate.appendTo($data);
      }
      $data.appendTo($details); // Work in Progess, noch nicht darstellen
      requestMember(current.id);
      $details.appendTo($card);
      $card.appendTo("#list" + listId);
    }
  }

  function requestCards(listId) {
    var cardRest = "https://api.trello.com/1/lists/" + listId + "/cards" + getKeyAndToken("?")
    $.get(cardRest, null, handleCardResponse, "json").fail(handleFailure);
  }

  function handleListResponse(data) {
    var $lists = $("#boardLists");
    for (i = 0; i < data.length; i++) {
      var current = data[i];
      var divId = "list" + current.id;
      var $list = $("<div id='" + divId + "' class='list'/>");
      $list.append("<div class='listName'>" + current.name + "</div>");
//      requestCards(current.id);
      $list.appendTo($lists);
    }
  }

  function getKeyAndToken(prefix) {
    if (keyAndToken) {
      return prefix + keyAndToken;
    }
    return "";
  }

  this.loadBoard = function (boardId) {
    var $info = $("#info");

    if ($this.showBoardTitle) {
      server.getBoard(boardId, function (data) {
        $("#boardTitle").html(data.name);
      });
    }
    else {
      $("#boardTitle").remove();
    }

    server.loadLists(boardId, function (data) {
      handleListResponse(data);
      $("#info").remove();
    });
  }
}