//******************************** Date Formatter ********************************
//Format a date or use preformatted spec

// Format Flags
//  \\   Escapes next character in string

// Day
// d    Day of the month, 2 digits with leading zeros. Example: 01 to 31
// j    Day of the month without leading zeros. Example: 1 to 31
// D    A textual representation of a day, three letters. Example: Mon. through Sun.
// l    A full textual representation of the day of the week. Example: Monday through Sunday

// Month
// F	A full textual representation of a month, such as January or March
// M	A short textual representation of a month, three letters. Example: Jan. through Dec.
// m	Numeric representation of a month, with leading zeros. Example: 01 through 12
// n	Numeric representation of a month, without leading zeros. Example: 1 through 12

// Year
// Y	A full numeric representation of a year, 4 digits. Example: 1999 or 2003
// y	A two digit representation of a year. Example: 99 or 03

// Time
// a	Lowercase Ante meridiem and Post meridiem. Example: am or pm
// A	Uppercase Ante meridiem and Post meridiem. Example: AM or PM
// g	12-hour format of an hour without leading zeros. Example: 1 through 12
// G	24-hour format of an hour without leading zeros. Example: 0 through 23
// h	12-hour format of an hour with leading zeros. Example: 01 through 12
// H	24-hour format of an hour with leading zeros. Example: 00 through 23
// i	Minutes with leading zeros. Example: 00 to 59
// s	Seconds, with leading zeros. Example: 00 through 59

// Timezone
// e	Timezone identifier. Example: UTC, GMT, Atlantic/Azores
// O	Difference to Greenwich time (GMT) in hours. Example: +0200
// P	Difference to Greenwich time (GMT) with colon between hours and minutes. Example: +02:00
// T	Timezone abbreviation. Example: EST, MDT ...

//convert to formatted string
if (!Date.prototype.customFormat) {
    Date.prototype.customFormat = function(formatParameters) {
        var str = "",
            esc = 0,
            self = this,
            formatFuncs = {
                d: function() { //Day of the month, 2 digits with leading zeros. Example: 01 to 31
                    return (self.getDate().toString().length == 2) ? self.getDate().toString() : "0" + self.getDate().toString();
                },
                j: function() { //Day of the month without leading zeros. Example: 1 to 31
                    return self.getDate().toString();
                },
                D: function() { //A textual representation of a day, three letters. Example: Mon through Sun
                    return [undefined, "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][self.getDay()];
                },
                l: function() { //A full textual representation of the day of the week. Example: Monday through Sunday
                    return [undefined, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][self.getDay()];
                },
                F: function() { //A full textual representation of a month, such as January or March
                    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][self.getMonth()];
                },
                M: function() { //A short textual representation of a month, three letters. Example: Jan through Dec
                    return ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"][self.getMonth()];
                },
                m: function() { //Numeric representation of a month, with leading zeros. Example: 01 through 12
                    var month = self.getMonth() + 1;
                    return (month.toString().length == 2) ? month.toString() : "0" + month.toString();
                },
                n: function() { //Numeric representation of a month, without leading zeros. Example: 1 through 12
                    var month = self.getMonth() + 1;
                    return month.toString();
                },
                Y: function() { //A full numeric representation of a year, 4 digits. Example: 1999 or 2003
                    return self.getFullYear().toString();
                },
                y: function() { //A two digit representation of a year. Example: 99 or 03
                    return self.getFullYear().toString().substr(2,2);
                },
                a: function() { //Lowercase Ante meridiem and Post meridiem. Example: am or pm
                    return (self.getHours() < 12) ? "am" : "pm";
                },
                A: function() { //Uppercase Ante meridiem and Post meridiem. Example: AM or PM
                    return (self.getHours() < 12) ? "AM" : "PM";
                },
                g: function() { //12-hour format of an hour without leading zeros. Example: 1 through 12
                    var hour = self.getHours();
                    if (hour > 12) hour = hour - 12;
                    return hour.toString();
                },
                G: function() { //24-hour format of an hour without leading zeros. Example: 0 through 23
                    return self.getHours();
                },
                h: function() { //12-hour format of an hour with leading zeros. Example: 01 through 12
                    var hour = self.getHours();
                    if (hour > 12) hour = hour - 12;
                    return (hour.toString().length == 2) ? hour.toString() : "0" + hour.toString();
                },
                H: function() { //24-hour format of an hour with leading zeros. Example: 00 through 23
                    return (self.getHours().toString().length == 2) ? self.getHours().toString() : "0" + self.getHours().toString();
                },
                i: function() { //Minutes with leading zeros. Example: 00 to 59
                    return (self.getMinutes().toString().length == 2) ? self.getMinutes().toString() : "0" + self.getMinutes().toString();
                },
                s: function() { //Seconds, with leading zeros. Example: 00 through 59
                    return (self.getSeconds().toString().length == 2) ? self.getSeconds().toString() : "0" + self.getSeconds().toString();
                },
                e: function() { //Timezone identifier. Example: UTC, GMT, Atlantic/Azores
                    return self.toString().substr(-4, 3);
                },
                O: function() { //Difference to Greenwich time (GMT) in hours. Example: +0200
                    var tz = self.getTimezoneOffset()/60;
                    var op = (tz >= 0) ? "+" : "";
                    return op + ((tz.toString().length == 2) ? tz.toString() : "0" + tz.toString()) + "00";
                },
                P: function() { //Difference to Greenwich time (GMT) with colon between hours and minutes. Example: +02:00
                    var tz = self.getTimezoneOffset()/60;
                    var op = (tz >= 0) ? "+" : "";
                    return op + ((tz.toString().length == 2) ? tz.toString() : "0" + tz.toString()) + ":00";
                },
                T: function() { //Timezone abbreviation. Example: EST, MDT ...
                    return self.toString().substr(-4, 3);
                }
            };

        formatParameters = formatParameters.split("");

        formatParameters.forEach(function(elem) {
            if (elem == "\\") {
                esc = 1;
            } else if (esc == 1) {
                str += elem;
                esc = 0;
            } else {
                if (formatFuncs.hasOwnProperty(elem)) {
                    str += formatFuncs[elem]();
                } else {
                    str += elem;
                }
            }
        });

        return str;
    };
}

//convert to ATOM string format: 2005-08-15T15:52:01+00:00
if (!Date.prototype.toATOM) {
    Date.prototype.toATOM = function() {
        return this.customFormat("Y-m-d\\TH:i:sP");
    };
}

//convert to ISO8601 string format: 2005-08-15T15:52:01+0000
if (!Date.prototype.toISO8601) {
    Date.prototype.toISO8601 = function() {
        return this.customFormat("Y-m-d\\TH:i:sO");
    };
}

//convert to RFC850 string format: Monday, 15-Aug-05 15:52:01 UTC
if (!Date.prototype.toRFC850) {
    Date.prototype.toRFC850 = function() {
        return this.customFormat("l, d-M-y H:i:s T");
    };
}

//convert to RFC1036 string format: Mon, 15 Aug 05 15:52:01 +0000
if (!Date.prototype.toRFC1036) {
    Date.prototype.toRFC1036 = function() {
        return this.customFormat("D, d M y H:i:s O");
    };
}

//convert to RSS, RFC2822 or RFC1123 string format: Mon, 15 Aug 2005 15:52:01 +0000
if (!Date.prototype.toRSS) {
    Date.prototype.toRSS = function() {
        return this.customFormat("D, d M Y H:i:s O");
    };
}

//convert to W3C string format: 2005-08-15T15:52:01+00:00
if (!Date.prototype.toW3C) {
    Date.prototype.toW3C = function() {
        return this.customFormat("Y-m-d\\TH:i:sP");
    };
}

//convert to MySQL time stamp string format: 2005-08-15 15:52:01
if (!Date.prototype.toMySQL) {
    Date.prototype.toMySQL = function() {
        return this.customFormat("Y-m-d H:i:s");
    };
}

//convert to formal grammar long date
if (!Date.prototype.toFormal_date_long) {
    Date.prototype.toFormal_date_long = function() {
        return this.customFormat("l, F j, Y");
    };
}

//convert to formal grammar long date & time
if (!Date.prototype.toFormal_dateTime_long) {
    Date.prototype.toFormal_dateTime_long = function() {
        return this.customFormat("l, F j, Y, \\a\\t g:ia");
    };
}

//convert to formal grammar abbrivated date
if (!Date.prototype.toFormal_date_abbr) {
    Date.prototype.toFormal_date_abbr = function() {
        return this.customFormat("D., M. j, Y");
    };
}

//convert to formal grammar abbrivated date & time
if (!Date.prototype.toFormal_dateTime_abbr) {
    Date.prototype.toFormal_dateTime_abbr = function() {
        return this.customFormat("D., M. j, Y, \\a\\t g:ia");
    };
}


//********************************Time Travel ********************************
//Add or subtract years, months, days, hours, minutes or seconds

//add year(s) - argument: number
if (!Date.prototype.addYears) {
    Date.prototype.addYears = function(years) {
        return this.setFullYear(this.getFullYear() + years);
    };
}

//subtract year(s) - argument: number
if (!Date.prototype.subtractYears) {
    Date.prototype.subtractYears = function(years) {
        return this.setFullYear(this.getFullYear() - years);
    };
}

//add month(s) - argument: number
if (!Date.prototype.addMonths) {
    Date.prototype.addMonths = function(month) {
        return this.setMonth(this.getMonth() + month);
    };
}

//subtract month(s) - argument: number
if (!Date.prototype.subtractMonths) {
    Date.prototype.subtractMonths = function(month) {
        return this.setMonth(this.getMonth() - month);
    };
}

//add day(s) - argument: number
if (!Date.prototype.addDays) {
    Date.prototype.addDays = function(days) {
        return this.setDate(this.getDate() + days);
    };
}

//subtract day(s) - argument: number
if (!Date.prototype.subtractDays) {
    Date.prototype.subtractDays = function(days) {
        return this.setDate(this.getDate() - days);
    };
}

//add hour(s) - argument: number
if (!Date.prototype.addHours) {
    Date.prototype.addHours = function(hours) {
        return this.setHours(this.getHours() + hours);
    };
}

//subtract hour(s) - argument: number
if (!Date.prototype.subtractHours) {
    Date.prototype.subtractHours = function(hours) {
        return this.setHours(this.getHours() - hours);
    };
}

//add minute(s) - argument: number
if (!Date.prototype.addMinutes) {
    Date.prototype.addMinutes = function(minutes) {
        return this.setMinutes(this.getMinutes() + minutes);
    };
}

//subtract minute(s) - argument: number
if (!Date.prototype.subtractMinutes) {
    Date.prototype.subtractMinutes = function(minutes) {
        return this.setMinutes(this.getMinutes() - minutes);
    };
}

//add second(s) - argument: number
if (!Date.prototype.addSeconds) {
    Date.prototype.addSeconds = function(seconds) {
        return this.setSeconds(this.getSeconds() + seconds);
    };
}

//subtract second(s) - argument: number
if (!Date.prototype.subtractSeconds) {
    Date.prototype.subtractSeconds = function(seconds) {
        return this.setSeconds(this.getSeconds() - seconds);
    };
}

//used for debugging
//var a = new Date();
