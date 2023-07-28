
function Date2DateInput(date, removeHours = false){
    
    let d = date.toISOString().split('.')[0];
    
    return removeHours ? d.split('T')[0] : d;
}

function NumDaysInMonth(year =  -1, month = -1){
    const y = year === -1 ? new Date().getFullYear() : year;
    const m = month === -1 ? new Date().getMonth() : month;

    return new Date(y, m+1, 0).getDate();
}

function GetMonthName(m = -1){
  
    let month = m === -1 ? new Date().getMonth() : m;

    return GetMonthsForLocale('fr-Fr')[month];
}

function GetMonthsForLocale(locale) {
    var format = new Intl.DateTimeFormat(locale, { month: 'long' })
    var months = []
    for (var month = 0; month < 12; month++) {
        var testDate = new Date(Date.UTC(2000, month, 1, 0, 0, 0));
        months.push(format.format(testDate))
    }
    return months;
}

function CalculateDateDifference(startDate, endDate) {
    // Calculate the difference in milliseconds between the two dates
    var differenceInMilliseconds = endDate.getUTCMilliseconds() - startDate.getUTCMilliseconds();

    //console.log(startDate, startDate, startDate.getTime())
  
    // Convert milliseconds to hours, minutes, and seconds
    var hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    var minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);
  
    // Format the result as hh:mm:ss
    var formattedResult = hours.toString().padStart(2, '0') + ':' +
                          minutes.toString().padStart(2, '0') + ':' +
                          seconds.toString().padStart(2, '0');
  
    // Return the formatted result
    return formattedResult;
  }

export {
    Date2DateInput,
    NumDaysInMonth,
    GetMonthName,
    GetMonthsForLocale,
    CalculateDateDifference 
}