function TrelloClientVersion() {

  var $this = this;
  var $versionInfo, $versionInfoText;

  $this.activate = function () {
    $versionInfo = $("<div id='versionInfo'></div>").insertBefore("#board");
    $versionInfoText = $("<div id='versionInfoText'></div>").insertAfter($versionInfo).hide();
    initPopup();
  }

  var initPopup = function () {
    $versionInfoText.position({
                                my: "left+10 top+10",
                                at: "right bottom",
                                of: "#versionInfo"
                              })
    $versionInfoText.hide();

    $("#versionInfo").mouseover(function () {

      $versionInfoText.show();
    }).mouseout(function () {
      $versionInfoText.hide();
    });

  };
}
