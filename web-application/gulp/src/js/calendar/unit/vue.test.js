var assert = require('assert');
var app = require('../calendar.js');

// Empty object test function
function isEmptyObject(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

describe('Calendar unit test', function () {

    it('should check initial state of app', function () {
        assert.equal(app.$data.days.length, 7, 'Init amount of days');
        assert.equal(app.$data.localeDays.length, 7, 'Init amount of localeDays');
        assert.equal(app.$data.editorDays.length, 7, 'Init amount of editorDays');
        assert.equal(app.$data.editorLocaleDays.length, 7, 'Init amount of editorLocaleDays');
        assert.equal(app.$data.intervals.length, 7, 'Init amount of intervals');
        assert.equal(typeof app.$data.dayTime, 'object', 'Init object of daytime');
        assert.equal(typeof app.$data.schedule, 'object', 'Init object of schedule');
        assert.equal(app.$data.scheduleSettings.length, 0, 'Init amount of scheduleSettings');
        assert.ok(app.$data.scheduleState, 'Schedulestate init value');
        assert.equal(app.$data.editorState, false, 'EditorState init value');
        assert.equal(app.$data.localLoaderState, false, 'local loader init state');
        assert.equal(app.$data.period, 6, 'Period init value');
        assert.equal(typeof app.$data.record, 'object', 'Init object of record');
        assert.equal(app.$data.reservations, null, 'Null of reservations');
        assert.equal(app.$data.testTime, '', 'Init value of test time');
        assert.equal(app.$data.mainArray.length, 0, 'Init value of main array');
        assert.equal(app.$data.lunchTime.length, 0, 'Init value of lunchTime');
    })

    // describe("Test getMasterSchedule", function (assert) {
    //     var done = assert.async();
    //     setTimeout(function () {
    //         app.getMasterSchedule();
    //         assert.ok(!isEmptyObject(app.$data.schedule), 'app.schedule not empty');
    //         assert.equal(document.querySelector("#prev-week").style.display, 'block', 'Display arrow back');
    //         assert.equal(document.querySelector("#next-week").style.display, 'block', 'Display arrow next');
    //         done();
    //     }, 1000);
    // });

    // describe("Test getMasterOrders", function (assert) {
    //     var done = assert.async();
    //     setTimeout(function () {
    //         app.getMasterOrders();
    //         assert.ok(!isEmptyObject(app.$data.reservations, 'Reservations object not empty'));
    //         done();
    //     }, 1000)
    // });

    // it("should test doCorrectDateInOrders", function () {
    //     var obj1 = {
    //         'date_time_reservation': '19.12.2018 09:00'
    //     };
    //     var obj2 = {
    //         'date_time_reservation': '04.07.2018 15:00'
    //     };
    //     var results = app.doCorrectDateInOrders([obj1, obj2]);
    //     results.forEach(element => {
    //         assert.ok(element.date_time_reservation instanceof Date, 'Check if rebuilded date is instance of js Date');
    //     });
    // });

    it("should test calculateLiveTimes", function () {
        var date = new Date('12/15/2018');
        var date1 = new Date(date).setHours(date.getHours() + 6);
        assert.equal(app.calculateLiveTimes({
            start: date,
            end: date1
        }, {
            hours: 1,
            minutes: 0
        }), 6, 'Test live times calculation');
        assert.equal(app.calculateLiveTimes({
            start: date,
            end: date1
        }, {
            hours: 0,
            minutes: 30
        }), 12, 'Test live times calculation');
        assert.equal(app.calculateLiveTimes({
            start: date,
            end: date1
        }, {
            hours: 1,
            minutes: 30
        }), 4, 'Test live times calculation');
        assert.equal(app.calculateLiveTimes({
            start: date,
            end: date1
        }, {
            hours: 2,
            minutes: 0
        }), 3, 'Test live times calculation');
    });

    it("should test getWorkInterval", function () {
        var obj = {
            time: '10:00-15:00'
        };
        var obj1 = {
            live: '09:30-16:45'
        }
        assert.equal(
            JSON.stringify(app.getWorkInterval(obj, 'time')),
            JSON.stringify({
                time: {
                    start: {
                        hours: 10,
                        minutes: 0
                    },
                    end: {
                        hours: 15,
                        minutes: 0
                    }
                }
            }),
            "Test getting work interval"
        )
        assert.equal(
            JSON.stringify(app.getWorkInterval(obj1, 'live')),
            JSON.stringify({
                live: {
                    start: {
                        hours: 9,
                        minutes: 30
                    },
                    end: {
                        hours: 16,
                        minutes: 45
                    }
                }
            }),
            "Test getting work interval"
        )
    });

    it("Should test doSetIntervalLimit", function () {
        var daySchedule = {
            time: '09:00-17:00'
        }
        var oneDay = {
            date: new Date('Tue Jan 09 2018 15:00:00 GMT+0600 (+06)'),
            initialDate: new Date('Tue Jan 09 2018 00:00:00 GMT+0600 (+06)')
        }
        var oneDay2 = {
            date: new Date('Tue Jan 09 2018 18:00:00 GMT+0600 (+06)'),
            initialDate: new Date('Tue Jan 09 2018 00:00:00 GMT+0600 (+06)')
        }
        assert.ok(
            app.doSetIntervalLimit(daySchedule, oneDay, 'time').time.start instanceof Date &&
            app.doSetIntervalLimit(daySchedule, oneDay, 'time').time.end instanceof Date,
            'doSetIntervalLimit returns date object'
        );
        assert.equal(app.doSetIntervalLimit(daySchedule, oneDay2, 'time'), null, 'Get null if time is bigger than schedule');
    });

    it("should test prettyDate", function () {
        assert.equal(app.prettyDate('Wed Jan 10 2018 13:13:52 GMT+0600 (+06)', 'date'), '10.1.2018');
        assert.equal(app.prettyDate('Wed Jan 10 2018 09:06:52 GMT+0600 (+06)', 'time'), '09:06');
    });

    it("should test prettyDateRange", function () {
        var date = {
            start: 'Wed Jan 10 2018 09:00:52 GMT+0600 (+06)',
            end: 'Wed Jan 10 2018 16:00:52 GMT+0600 (+06)'
        }
        assert.equal(app.prettyDateRange(date, 'time'), '09:00 - 16:00');
    });

    it("should test moveToNextWeek", function () {
        var period = app.$data.period;
        var date = new Date(app.$data.range.current).setDate(new Date(app.$data.range.current).getDate() + 1);
        date = new Date(date).setDate(new Date(date).getDate() + period);
        app.moveToNextWeek();
        assert.equal(
            JSON.stringify(new Date(date)),
            JSON.stringify(new Date(app.$data.range.current))
        );
    });

    it("should test moveToPreviousWeek", function () {
        var period = app.$data.period;
        var date = new Date(app.$data.range.current).setDate(new Date(app.$data.range.current).getDate());
        assert.equal(
            JSON.stringify(new Date(date)),
            JSON.stringify(new Date(app.$data.range.current))
        );
    });

    it("should test checkIfInMainArrayDateExists", function () {
        var data = app.$data.mainArray;
        app.$data.mainArray = [{
                date: new Date('Wed Jan 10 2018 09:00:00 GMT+0600 (+06)')
            },
            {
                date: new Date('Wed Jan 11 2018 15:00:00 GMT+0600 (+06)')
            }
        ]
        var dateObject = {
            date: new Date('Wed Jan 11 2018 00:00:00 GMT+0600 (+06)')
        };
        var dateObject2 = {
            date: new Date('Wed Jan 13 2018 00:00:00 GMT+0600 (+06)')
        };
        var results = app.checkIfInMainArrayDateExists(dateObject);
        var results2 = app.checkIfInMainArrayDateExists(dateObject2)
        assert.ok(results.status === true && results.index === 1);
        assert.ok(results2.status === false && results2.index === -1);

        app.$data.mainArray = data;
    });

    it("should test sortTimesInMainArray", function () {
        app.$data.mainArray = [{
            times: [
                {
                    time: {
                        start: 'Tue Jan 9 2018 13:13:52 GMT+0600 (+06)',
                        status: 'work'
                    }
                },
                {
                    time: {
                        start: 'Mon Jan 8 2018 13:13:52 GMT+0600 (+06)',
                        status: 'work'
                    }
                },
                {
                    time: {
                        start: 'Wed Jan 10 2018 13:13:52 GMT+0600 (+06)',
                        status: 'work'
                    }
                }
            ]
        }]
        var whatShouldBe = [{
            times: [
                {
                    time: {
                        start: 'Mon Jan 8 2018 13:13:52 GMT+0600 (+06)',
                        status: 'work'
                    }
                },
                {
                    time: {
                        start: 'Tue Jan 9 2018 13:13:52 GMT+0600 (+06)',
                        status: 'work'
                    }
                },
                {
                    time: {
                        start: 'Wed Jan 10 2018 13:13:52 GMT+0600 (+06)',
                        status: 'work'
                    }
                }
            ]
        }]
        app.sortTimesInMainArray();
        assert.deepEqual(app.$data.mainArray[0].times, whatShouldBe[0].times);
    });

    // describe("Test getScheduleSettings", function (assert) {
    //     var done = assert.async();
    //     setTimeout(function () {
    //         app.getScheduleSettings();
    //         assert.ok(!isEmptyObject(app.$data.scheduleSettings), 'ScheduleSettings is not empty');
    //         done();
    //     }, 1000);
    // })

    it("should test parseTime", function () {
        var testVal = '9:35';
        assert.deepEqual(
            app.parseTime(testVal), {
                init: '9:35',
                hours: 9,
                minutes: 35
            },
            'parseTime returns correct data'
        );
    })

    it("should test compareScheduleTimes", function () {
        var time1 = {
            hours: 9,
            minutes: 35
        };
        var time2 = {
            hours: 13,
            minutes: 44
        };
        var time3 = {
            hours: 9,
            minutes: 36
        };
        var time4 = {
            hours: 8,
            minutes: 59
        };

        assert.ok(app.compareScheduleTimes(time1, ''));
        assert.equal(app.compareScheduleTimes('', time2), false);
        assert.ok(app.compareScheduleTimes(time2, time1));
        assert.ok(app.compareScheduleTimes(time3, time1));
        assert.equal(app.compareScheduleTimes(time4, time1), false);
    });
})