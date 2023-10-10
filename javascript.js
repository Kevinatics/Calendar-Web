$(function () {
    var currentHour = dayjs().hour();
    $('#currentDay').text(dayjs().format('MMMM D, YYYY'));
    

    $('.saveBtn').on('click', function(){
        var timeBlock = $(this).closest('.time-block');
        var hourId = timeBlock.attr('id');
        var userInput = timeBlock.find('textarea').val();
        localStorage.setItem(hourId, userInput);
    });

    $('.time-block').each(function(){
        var blockHour = parseInt($(this).attr('id').split('-')[1]);

        if (blockHour < currentHour) {
            $(this).addClass('past');
        } else if (blockHour === currentHour) {
            $(this).removeClass('past');
            $(this).addClass('present');
        } else {
            $(this).removeClass('past');
            $(this).removeClass('present');
            $(this).addClass('future');
        }
    });


    $('.time-block').each(function(){
        let storedValue = localStorage.getItem($(this).attr('id'));
        if (storedValue){
            $(this).find('textarea').val(storedValue);
        }
    });        

});

function createTimeBlocks(startHour, endHour) {
    const timeBlockContainer = document.querySelector('.container-lg.px-5'); // Select the container where time blocks will be added

    for (let i = startHour; i <= endHour; i++) {
        let displayHour = i <= 12 ? i : i - 12; // Convert 24-hour format to 12-hour format
        let meridiem = i < 12 ? 'AM' : 'PM'; // Determine AM or PM
        
        let timeBlock = `
        <div id="hour-${i}" class="row time-block">
            <div class="col-2 col-md-1 hour text-center py-3">${displayHour}${meridiem}</div>
            <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
            <button class="btn saveBtn col-2 col-md-1" aria-label="save">
                <i class="fas fa-save" aria-hidden="true"></i>
            </button>
        </div>
        `;

        timeBlockContainer.innerHTML += timeBlock;
    }
}

// Call the function on document ready
document.addEventListener('DOMContentLoaded', function() {
    createTimeBlocks(12, 17); // Create time blocks from 12PM to 5PM
});