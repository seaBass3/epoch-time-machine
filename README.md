# epoch
Javascript date formatter with add and subtract date and time options

epoch adds the following functions to the JavaScript Date object:

`Date.toATOM()` - Convert to ATOM string format: 2005-08-15T15:52:01+00:00

`Date.toISO8601()` - Convert to ISO8601 string format: 2005-08-15T15:52:01+0000

`Date.toRFC850()` - Convert to RFC850 string format: Monday, 15-Aug-05 15:52:01 UTC

`Date.toRFC1036()` - Convert to RFC1036 string format: Mon, 15 Aug 05 15:52:01 +0000

`Date.toRSS()` - Convert to RSS, RFC2822 or RFC1123 string format: Mon, 15 Aug 2005 15:52:01 +0000

`Date.toW3C()` - Convert to W3C string format: 2005-08-15T15:52:01+00:00

`Date.toMySQL()` - Convert to MySQL time stamp string format: 2005-08-15 15:52:01

`Date.toFormal_date_long()` - Convert to formal grammar long date:  Thursday, September 22, 2016

`Date.toFormal_dateTime_long()` - Convert to formal grammar long date & time: Thursday, September 22, 2016, at 5:04pm

`Date.toFormal_date_abbr()` - Convert to formal grammar abbrivated date: Thu., Sep. 22, 2016

`Date.toFormal_dateTime_abbr()` - Convert to formal grammar abbrivated date & time: Thu., Sep. 22, 2016, at 5:04pm

`Date.toCustomFormat()` - Convert to a user specified format using the following flags:

Example

```
var a = new Date();
a.customFormat("D., M. j, Y, \\a\\t g:ia");  //"Mon., Sep. 26, 2016, at 4:13pm"
```

##*Format Flags*

`\\`   Escapes next character in string

###Day
* `d`    Day of the month, 2 digits with leading zeros. Example: 01 to 31
* `j`    Day of the month without leading zeros. Example: 1 to 31
* `D`    A textual representation of a day, three letters. Example: Mon. through Sun.
* `l`    A full textual representation of the day of the week. Example: Monday through Sunday

###Month
* `F`   A full textual representation of a month, such as January or March
* `M` 	A short textual representation of a month, three letters. Example: Jan. through Dec.
* `m` 	Numeric representation of a month, with leading zeros. Example: 01 through 12
* `n` 	Numeric representation of a month, without leading zeros. Example: 1 through 12

###Year
* `Y` 	A full numeric representation of a year, 4 digits. Example: 1999 or 2003
* `y` 	A two digit representation of a year. Example: 99 or 03

###Time
* `a` 	Lowercase Ante meridiem and Post meridiem. Example: am or pm
* `A` 	Uppercase Ante meridiem and Post meridiem. Example: AM or PM
* `g` 	12-hour format of an hour without leading zeros. Example: 1 through 12
* `G` 	24-hour format of an hour without leading zeros. Example: 0 through 23
* `h` 	12-hour format of an hour with leading zeros. Example: 01 through 12
* `H` 	24-hour format of an hour with leading zeros. Example: 00 through 23
* `i` 	Minutes with leading zeros. Example: 00 to 59
* `s` 	Seconds, with leading zeros. Example: 00 through 59

###Timezone
* `e` 	Timezone identifier. Example: UTC, GMT, Atlantic/Azores
* `O` 	Difference to Greenwich time (GMT) in hours. Example: +0200
* `P` 	Difference to Greenwich time (GMT) with colon between hours and minutes. Example: +02:00
* `T` 	Timezone abbreviation. Example: EST, MDT ...

***

##*Time Machine*

Add or subtract years, months, days, hours, minutes or seconds using the following functions:

* `Date.addYears (number)`
* `Date.subtractYears (number)`
* `Date.addMonths (number)`
* `Date.subtractMonths (number)`
* `Date.addDays (number)`
* `Date.subtractDays (number)`
* `Date.addHours (number)`
* `Date.subtractHours (number)`
* `Date.addMinutes (number)`
* `Date.subtractMinutes (number)`
* `Date.addSeconds (number)`
* `Date.subtractSeconds (number)`

Example

```
var a = new Date();  //Thu Sep 22 2016 17:04:50 GMT-0400 (EDT)
a.addYears(5); //Wed Sep 22 2021 17:04:50 GMT-0400 (EDT)
```



