var startTime = 9;
var endTime = 18;


/* Dynamically creates all rows for the scheduler */
function pageInitializer() {
  for (var i = startTime; i < endTime; i++) {
    var newRow = $("<div>");
    var hourCol = $("<div>");
    var mainCol = $("<div>");
    var input = $("<textarea>");
    var saveCol = $("<div>");
    var saveIcon = $("<i>");

    newRow.addClass("row time-block");
    hourCol.addClass("col-2 hour");
    /* TODO: Dynamically generate formatted time */
    hourCol.text(i);

    mainCol.addClass("col-9 main-col");
    input.attr("data-hour", i);
    mainCol.append(input);

    saveCol.addClass("col-1 saveBtn");
    saveIcon.addClass("fa fa-save");
    saveCol.append(saveIcon);
    saveCol.attr("data-hour", i);

    newRow.append(hourCol);
    newRow.append(mainCol);
    newRow.append(saveCol);

    $("#timeblock-wrapper").append(newRow);
  }
}

/* Page initialization */
pageInitializer();