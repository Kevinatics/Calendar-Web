$(function () {
    // Function to update time-block classes based on the current hour
    function updateTimeBlocks() {
      var currentHour = dayjs().format('hA');
  
      // Loop through time-blocks and update classes
      $('.time-block').each(function () {
        var blockHour = $(this).find('.hour').text();
  
        if (blockHour < currentHour) {
          $(this).addClass('past').removeClass('present future');
        } else if (blockHour === currentHour) {
          $(this).addClass('present').removeClass('past future');
        } else {
          $(this).addClass('future').removeClass('past present');
        }
      });
    }
  
    // Function to create a time block for a given hour
    function createTimeBlock(hour) {
      // Create a new time block element
      var timeBlock = $('<div>')
        .attr('id', 'hour-' + hour)
        .addClass('row time-block');
  
      // Create the hour column
      var hourColumn = $('<div>')
        .addClass('col-2 col-md-1 hour text-center py-3')
        .text(hour);
  
      // Create the textarea for event description
      var descriptionTextarea = $('<textarea>')
        .addClass('col-8 col-md-10 description')
        .attr('rows', 3);
  
      // Create the Save button
      var saveButton = $('<button>')
        .addClass('btn saveBtn col-2 col-md-1')
        .attr('aria-label', 'save')
        .html('<i class="fas fa-save" aria-hidden="true"></i>');
  
      // Append columns to the time block
      timeBlock.append(hourColumn, descriptionTextarea, saveButton);
  
      // Append the time block to the container
      $('.container-lg').append(timeBlock);
    }
  
    // Create time blocks from 9 AM to 5 PM in 12-hour clock format
    for (var hour = 9; hour <= 17; hour++) {
      var formattedHour = hour < 12 ? hour + ' AM' : (hour === 12 ? '12 PM' : (hour - 12) + ' PM');
      createTimeBlock(formattedHour);
    }
  
    // Update time-block classes when the page loads
    updateTimeBlocks();
  
    // Update time-block classes every minute
    setInterval(updateTimeBlocks, 60000);
  
    // Function to load saved events from local storage
    function loadEvents() {
      var savedEvents = JSON.parse(localStorage.getItem('events')) || {};
  
      // Populate the text areas with saved events
      for (var hour in savedEvents) {
        $('#hour-' + hour + ' .description').val(savedEvents[hour]);
      }
    }
  
    // Load saved events when the page loads
    loadEvents();
  
    // Function to save events to local storage
    function saveEvent(hour, eventText) {
      var savedEvents = JSON.parse(localStorage.getItem('events')) || {};
      savedEvents[hour] = eventText;
      localStorage.setItem('events', JSON.stringify(savedEvents));
    }
  
    // Event listener for the "Save" buttons
    $('.saveBtn').on('click', function () {
      var hour = $(this).parent().attr('id').split('-')[1];
      var eventText = $(this).siblings('.description').val();
      saveEvent(hour, eventText);
    });
  
    // Display the current date in the header
    $('#currentDay').text(dayjs().format('dddd, MMMM D'));
  });
  