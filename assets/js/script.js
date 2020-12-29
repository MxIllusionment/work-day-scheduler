var startTime = 9;
var endTime = 18;
var scheduleContents = [];


/* Dynamically creates all rows for the scheduler */
function pageInitializer() {
  for (var i = startTime; i < endTime; i++) {
    var newRow = $("<div>");
    var hourCol = $("<div>");

    newRow.addClass("row time-block");
    newRow.attr("id", "time-" + i);

    hourCol.addClass("col-2 hour");
    /* Dynamically generate formatted time */
    hourCol.text(moment().hour(i).format("hA"));
    newRow.append(hourCol);

    /* Add central column with textarea input */
    newRow.append("<div class='col-9 main-col'><textarea></textarea></div>");

    /* Add save button column with icon */
    newRow.append("<div class='col-1 saveBtn'><i class='fa fa-save'></i></div>");

    $("#timeblock-wrapper").append(newRow);
  }
}

/* Update date and row classes based on current time */
function timeUpdate() {
  var currentHour = moment().hour();

  /* Update date at top of screen */
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  /* Remove past/present/future classes from all main columns */
  $(".main-col").removeClass("past present future");

  /* Update each main column based on the current time */
  for (var i = startTime; i < endTime; i++) {
    var newClass;
    if (currentHour > i) {
      newClass = "past";
    } else if (currentHour < i) {
      newClass = "future";
    } else {
      newClass = "present";
    }
    $("#time-" + i).children(".main-col").addClass(newClass);
  }
}

/* Save the textarea in a specific row */
function saveRow() {
  var parent = $(this).parent();
  /* Extract row time from parent's ID and convert to array index */
  var rowIndex = parseInt(parent.attr("id").split("-")[1]) - startTime;
  scheduleContents[rowIndex] = parent.find("textarea").val();

  localStorage.setItem("schedule", JSON.stringify(scheduleContents));
}

/* Load all schedule date from local storage */
function loadRows() {
  var loadedContents = JSON.parse(localStorage.getItem("schedule"));

  if (loadedContents) {
    scheduleContents = loadedContents;
    /* Assign loaded contents to the appropriate textareas */
    for (var i = 0; i < scheduleContents.length; i++) {
      $("#time-" + (i + startTime)).find("textarea").val(scheduleContents[i]);
    }
  }
}

/* Page initialization */
pageInitializer();
loadRows();
timeUpdate();

/* Update time-based information every minute */
setInterval(timeUpdate, 60000);

/* Add event listener to all save buttons */
$(".saveBtn").click(saveRow);