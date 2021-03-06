if (typeof process !== 'undefined') {
    var Vue = require('vue');
}

Vue.component('timepicker', {
    props: ['options', 'value'],
    template: '<input class="timepicker" type="text" ' +
        ':class="{\'disable-input\': !options.daySchedule.active}"' +
        'v-bind:value="options.start? options.daySchedule.time.start : options.daySchedule.time.end" ' +
        ':readonly="!options.daySchedule.active">',

    data: function () {
        return {
            picker: '',
            interval: 30
        };
    },
    mounted: function () {
        var vm = this;
        var picker = $(this.$el).pickatime({
            format: 'HH:i',
            min: [7, 0],
            max: [20, 0],
            interval: 30,
            clear: ''
        }).val(this.value).trigger('change').on('change', function () {
            vm.$emit('input', this.value)
        });
        this.picker = picker.pickatime('picker');
    },
    watch: {
        value: function (value) {
            if (this.options.day === 'monday') {
                this.applyTimesAsMonday(value);
            }

        },
        options: function (options) {
            if (this.options.daySchedule.interval.indexOf(":") !== -1) {
                this.interval = (60 * parseInt(this.options.daySchedule.interval.split(":")[0])) + parseInt(this.options.daySchedule.interval.split(":")[1]);
            } else {
                this.interval = parseInt(this.options.daySchedule.interval);
            }
            let indexToWatch = (this.options.index === 0) ? 1 : 0;

            let siblingStart = (this.$root.scheduleSettings[indexToWatch] ?
                this.$root.parseTime(this.$root.scheduleSettings[indexToWatch][this.options.day].time.start) : '');
            let siblingEnd = (this.$root.scheduleSettings[indexToWatch] ?
                this.$root.parseTime(this.$root.scheduleSettings[indexToWatch][this.options.day].time.end) : '');

            if (options.daySchedule.active) {
                if (!this.options.start) {
                    let timeStart = this.$root.parseTime(this.options.daySchedule.time.start) || { hours: 7, minutes: 0 }
                    if (siblingStart && siblingEnd) {
                        this.picker.set({ enable: true });
                        this.picker.set({
                            min: [timeStart.hours, timeStart.minutes],
                            disable: [
                                {
                                    from: [siblingStart.hours, siblingStart.minutes],
                                    to: [siblingEnd.hours, siblingEnd.minutes]
                                }
                            ],
                            interval: this.interval
                        })
                    } else {
                        this.picker.set({
                            min: [timeStart.hours, timeStart.minutes],
                            interval: this.interval
                        })
                    }
                } else {
                    let timeEnd = this.$root.parseTime(this.options.daySchedule.time.end) || { hours: 20, minutes: 0 }
                    if (siblingStart && siblingEnd) {
                        this.picker.set({ enable: true });
                        this.picker.set({
                            max: [timeEnd.hours, timeEnd.minutes],
                            disable: [
                                {
                                    from: [siblingStart.hours, siblingStart.minutes],
                                    to: [siblingEnd.hours, siblingEnd.minutes]
                                }
                            ],
                            interval: this.interval
                        });
                    } else {
                        this.picker.set({
                            max: [timeEnd.hours, timeEnd.minutes],
                            interval: this.interval
                        });
                    }
                }
            } else {
                if (this.options.start) {
                    this.options.daySchedule.time.start = ''
                } else {
                    this.options.daySchedule.time.end = ''
                }
            }
        }
    },

    methods: {
        applyTimesAsMonday(value) {
            if (this.options.day === 'monday') {
                this.$root.days.forEach(day => {
                    if (this.$root.scheduleSettings[this.options.index][day].active &&
                        !this.$root.scheduleSettings[this.options.index][day].time.start &&
                        this.options.start) {
                        this.$root.scheduleSettings[this.options.index][day].time.start = value;
                    }
                    if (this.$root.scheduleSettings[this.options.index][day].active &&
                        !this.$root.scheduleSettings[this.options.index][day].time.end &&
                        !this.options.start) {
                        this.$root.scheduleSettings[this.options.index][day].time.end = value;
                    }
                })
            }
        }
    },
    destroyed: function () {
        $(this.$el).stop();
    }
});
Vue.component('live-timepicker', {
    props: ['options', 'value'],
    template: '<input class="timepicker" type="text" ' +
        ':class="{\'disable-input\': (!options.daySchedule.active)}"' +
        'v-bind:value="options.start? options.daySchedule.live_recording.start : options.daySchedule.live_recording.end" ' +
        ':readonly="!options.daySchedule.active || !options.daySchedule.liveState">',

    data: function () {
        return {
            picker: '',
            minTime: '',
            maxTime: '',
            interval: 30
        }
    },

    mounted: function () {
        var vm = this;

        this.minTime = this.$root.parseTime(this.options.daySchedule.time.start);
        this.maxTime = this.$root.parseTime(this.options.daySchedule.time.end);

        if (!this.minTime) {
            this.minTime = {
                hours: 7,
                minutes: 0
            }
        }

        if (!this.maxTime) {
            this.maxTime = {
                hours: 20,
                minutes: 0
            }
        }

        let picker = $(this.$el).pickatime({
            format: 'HH:i',
            min: [this.minTime.hours, this.minTime.minutes],
            max: [this.maxTime.hours, this.maxTime.minutes],
            interval: 30,
            clear: ''
        }).val(this.value).trigger('change').on('change', function () {
            vm.$emit('input', this.value)
        });
        this.picker = picker.pickatime('picker');
    },
    watch: {
        value: function (value) {
            if (this.options.start) {
                this.options.daySchedule.live_recording.start = value;
            } else {
                this.options.daySchedule.live_recording.end = value;
            }
        },
        options: function (options) {
            this.minTime = this.$root.parseTime(options.daySchedule.time.start);
            this.maxTime = this.$root.parseTime(options.daySchedule.time.end);
            let nowVal = this.$root.parseTime(this.value);
            if (this.$root.compareScheduleTimes(this.minTime, nowVal)) {
                this.value = options.daySchedule.time.start
            }
            if (this.$root.compareScheduleTimes(nowVal, this.maxTime)) {
                this.value = options.daySchedule.time.end
            }
            if (!this.minTime) {
                this.minTime = {
                    hours: 7,
                    minutes: 0
                }
            }
            if (!this.maxTime) {
                this.maxTime = {
                    hours: 20,
                    minutes: 0
                }
            }

            if (this.options.daySchedule.interval.indexOf(":") !== -1) {
                this.interval = (60 * parseInt(this.options.daySchedule.interval.split(":")[0])) + parseInt(this.options.daySchedule.interval.split(":")[1]);
            } else {
                this.interval = parseInt(this.options.daySchedule.interval);
            }

            this.picker.set({
                min: [this.minTime.hours, this.minTime.minutes],
                max: [this.maxTime.hours, this.maxTime.minutes],
                interval: this.interval
            })
        }
    },
    destroyed: function () {
        this.picker.stop();
    }
});
Vue.component('lunch-timepicker', {
    props: ['options', 'value', 'lunchState'],
    template: '<input class="timepicker" :class="{\'disable-input\': !options.schedule.lunchState}" ' +
    ':readonly="!options.schedule.lunchState" ' + ':value="(options.schedule.lunch_settings && options.schedule.lunch_settings.start) ? ' +
        '(options.start ? options.schedule.lunch_settings.start : options.schedule.lunch_settings.end) : \'\'">',

    data: function () {
        return {
            interval: 10,
            picker: '',
            minTime: '',
            maxTime: '',
        }
    },

    mounted: function () {
        let vm = this;
        let picker = $(this.$el).pickatime({
            format: 'HH:i',
            min: [10, 0],
            max: [16, 0],
            interval: vm.interval,
            clear: ''
        }).val(this.value).trigger('change').on('change', function () {
            vm.$emit('input', this.value)
        });
        this.picker = picker.pickatime('picker');
    },
    watch: {
        value: function(value) {
            if (this.options.start) {
                this.options.schedule.lunch_settings.start = value;
            } else {
                this.options.schedule.lunch_settings.end = value;
            }
        },
        options: function (options) {
            if (!options.schedule.lunchState) {
                options.schedule.lunch_settings.start = '';
                options.schedule.lunch_settings.end = '';
                return;
            }
            // fix
            this.minTime = this.$root.parseTime(options.schedule.time.start);
            this.maxTime = this.$root.parseTime(options.schedule.time.end);
            let nowVal = this.$root.parseTime(this.value);            
            if (!this.minTime) {
                this.minTime = {
                    hours: 10,
                    minutes: 0
                }
            }
            if (!this.maxTime) {
                this.maxTime = {
                    hours: 16,
                    minutes: 0
                }
            }
            if (this.$root.compareScheduleTimes(this.minTime, nowVal)) {
                this.value = options.schedule.time.start;
            }
            
            if (this.$root.compareScheduleTimes(nowVal, this.maxTime)) {
                this.value = options.schedule.time.end;
            }
            this.picker.set({enable: true})
            this.picker.set({
                min: [this.minTime.hours, this.minTime.minutes],
                max: [this.maxTime.hours, this.maxTime.minutes],
                interval: this.interval
            })
        }
    },
    destroyed: function () {
        this.picker.stop();
    }
});

var app = new Vue({
    el: '#app',
    data: {
        days: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        localeDays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        editorDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        editorLocaleDays: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        intervals: ['30', '10', '15', '20', '40', '1:00', '1:20'],
        dayTime: {},
        schedule: {},
        scheduleSettings: [],
        userReservations: null,
        scheduleState: true,
        editorState: false,
        localLoaderState: false,
        period: 6,
        record: {},
        reservations: null,
        testTime: '',
        mainArray: [],
        _masterSlug: '',
        _masterUser: '',
        _csrfToken: '',
        _authToken: '',
        range: {
            start: new Date().setHours(0, 0, 0, 0),
            end: new Date(new Date().setDate(new Date().getDate() + 30)).setHours(0, 0, 0, 0),
            current: ''
        },
        lunchTime: [],
        companies: [],
        companiesForClass: []
    },

    methods: {
        // calendar methods
        getDataFromDjango(val, slug, csrfToken, companies, authToken) {
            this.toggleLocalLoader(true);
            this._masterSlug = slug;
            this._masterUser = val;
            this._csrfToken = csrfToken;
            this._authToken = authToken;
            Vue.http.headers.common['Authorization'] = 'Token ' + this._authToken;
            companies = companies.filter(company => {
                return typeof company === 'object';
            });
            this.companies = companies;
            // connect to sockets
            if (this._masterUser) {
                this.checkNotificationPermissions();
                this.subscribeToNewOrders();
                this.subscribeToChangedOrders();
            }
            this.getMasterSchedule();
        },
        getMasterSchedule() {
            this.$http.get('/api/schedule-setting/' + this._masterSlug).then(response => {
                this.schedule = response.body;
                if (this.schedule.length > 0) {
                    document.querySelector('#prev-week').style.display = 'block';
                    document.querySelector('#next-week').style.display = 'block';
                }
                this.schedule.forEach(schedule => {
                    this.companies.forEach(company => {
                        if (schedule.company === company.id) {
                            if (this.companies.indexOf(company) === 0) {
                                schedule.major = true;
                            } else {
                                schedule.major = false;
                            }
                        }
                    });
                    if (companies.length === 0) {
                        this.schedule.forEach(schedule => {
                            schedule.major = true
                        });
                    }
                });

                // check if user has any orders
                if (!this._masterUser && this._authToken) {
                    this.getUserOrders().then(() => {
                        this.getMasterOrders();
                    }).catch(error => {
                        console.log(error);
                        this.getMasterOrders();
                    })
                } else {
                    this.getMasterOrders();
                }

            }, error => {
                console.error(error);
            })
        },
        getMasterOrders() {
            this.$http.get('/api/reservation/' + this._masterSlug).then(response => {
                this.reservations = this.doCorrectDateInOrders(response.body);
                this.fillRange(this.range.start, new Date(this.range.start).setDate(new Date(this.range.start).getDate() + this.period));
                this.toggleLocalLoader(false);
            }, error => {
                console.error(error);
            })
        },
        getUserOrders() {
            return new Promise((resolve, reject) => {
                this.$http.get('/api/user/reservations').then(response => {
                    if (response.ok) {
                        this.userReservations = this.doCorrectDateInOrders(response.body);
                        resolve();
                    } else {
                        console.log(response.statusText);
                        reject();
                    }
                }, error => {
                    console.log(error);
                    reject();
                })
            })
        },
        fillRange(start, end) {
            this.mainArray = [];
            this.range.current = end;
            let now = new Date(start);
            while (now <= end) {
                this.schedule.forEach(schedule => {
                    if (schedule[this.days[now.getDay()]] && (typeof schedule[this.days[now.getDay()]].time === 'object'
                        || schedule[this.days[now.getDay()]].time.length > 3)) {
                        let daySchedule = schedule[this.days[now.getDay()]];
                        if (typeof daySchedule.interval !== 'object') {
                            this.getWorkInterval(daySchedule, 'interval');
                        }
                        this.addDatesToArray(new Date(now), daySchedule, schedule.company);
                        let result = this.checkIfInMainArrayDateExists(now);
                        if (result.status) {
                            this.mainArray[result.index].times = this.mainArray[result.index].times.concat(this.dayTime.times);
                        } else {
                            this.mainArray.push(this.dayTime);
                        }

                    } else {
                        let result = this.checkIfInMainArrayDateExists(now);
                        if (result.status) {
                            // check if holiday already added to array (need to check if holiday is first in array)
                            if (this.mainArray[result.index].length > 1) {
                                this.mainArray[result.index].times.push({ time: new Date(now), status: 'holiday' });
                            }
                        } else {
                            this.mainArray.push({
                                date: new Date(now),
                                times: [
                                    {
                                        time: new Date(now),
                                        status: 'holiday'
                                    }
                                ]
                            })
                        }
                    }
                });
                now.setDate(now.getDate() + 1);
            }
            // when dates were added from different schedules, it's necessary to sort them all
            this.sortTimesInMainArray();
        },
        calculateLiveTimes(time, interval) {
            let timeInterval = (interval.hours > 0) ? ((60 * interval.hours) + interval.minutes) : interval.minutes;
            let counter = 0;
            let start = new Date(time.start);
            let end = new Date(time.end);
            while (new Date(start) < new Date(end)) {
                counter++;
                start.setMinutes(start.getMinutes() + timeInterval);
            }
            return counter;
        },
        addDatesToArray(now, daySchedule, companyId) {
            let oneDay = {
                initialDate: new Date(now),
                date: new Date(now)
            };
            let times = [];
            daySchedule = this.getWorkInterval(daySchedule, 'time');
            oneDay.date.setHours(daySchedule.time.start.hours, daySchedule.time.start.minutes, 0, 0);
            while (oneDay.date < oneDay.initialDate.setHours(daySchedule.time.end.hours, daySchedule.time.end.minutes, 0, 0)) {
                // check if lunch settings are presented
                if (daySchedule.lunch_settings) {
                    daySchedule = this.getWorkInterval(daySchedule, 'lunch_settings');
                    let time = this.doSetIntervalLimit(daySchedule, oneDay, 'lunch_settings');
                    if (time) {
                        time.company = companyId;
                        time.status = 'lunch';
                        times.push(time);
                        oneDay.date.setHours(daySchedule.lunch_settings.end.hours, daySchedule.lunch_settings.end.minutes, 0, 0);
                        continue;
                    }
                }
                // check if live recording is presented
                if (daySchedule.live_recording) {
                    daySchedule = this.getWorkInterval(daySchedule, 'live_recording');
                    let time = this.doSetIntervalLimit(daySchedule, oneDay, 'live_recording');
                    if (time) {
                        time.company = companyId;
                        time.status = 'live';
                        time.liveCounter = this.calculateLiveTimes(time.time, daySchedule.interval);
                        times.push(time);
                        oneDay.date.setHours(daySchedule.live_recording.end.hours, daySchedule.live_recording.end.minutes, 0, 0);
                        continue;
                    }
                }
                // check if record is out of real time
                if (oneDay.date.getTime() <= new Date().getTime()) {
                    times.push({
                        time: new Date(oneDay.date),
                        status: 'left'
                    });
                    oneDay.date.setHours(oneDay.date.getHours() + daySchedule.interval.hours);
                    oneDay.date.setMinutes(oneDay.date.getMinutes() + daySchedule.interval.minutes);
                    continue;
                }
                // check if user already made a record to the specialist
                if (!this._masterUser && this._authToken) {
                    if (this.userReservations) {
                        let userRecord = this.orderUserRecords(this.userReservations, oneDay.date);
                        if (userRecord) {
                            userRecord.company = companyId;
                            times.push(userRecord);

                            oneDay.date.setHours(oneDay.date.getHours() + daySchedule.interval.hours);
                            oneDay.date.setMinutes(oneDay.date.getMinutes() + daySchedule.interval.minutes);
                            continue;
                        }
                    }
                }
                let record = this.orderFreeRecords(this.reservations, oneDay.date);
                if (record) {
                    record.company = companyId;
                    times.push(record);

                    oneDay.date.setHours(oneDay.date.getHours() + daySchedule.interval.hours);
                    oneDay.date.setMinutes(oneDay.date.getMinutes() + daySchedule.interval.minutes);
                    continue;
                }
                times.push({
                    company: companyId,
                    time: new Date(oneDay.date),
                    status: 'free'
                });
                oneDay.date.setHours(oneDay.date.getHours() + daySchedule.interval.hours);
                oneDay.date.setMinutes(oneDay.date.getMinutes() + daySchedule.interval.minutes);
            }
            this.dayTime = { date: oneDay.date, times: times };
        },
        doCorrectDateInOrders(reservations) {
            reservations.map(order => {
                let date = {
                    date: order.date_time_reservation.split(' ')[0].split('.'),
                    time: order.date_time_reservation.split(' ')[1].split(':'),
                    jsDate: ''
                };
                date.jsDate = new Date('' + date.date[1] + '/' + date.date[0] + '/' + date.date[2]).setHours(parseInt(date.time[0]), parseInt(date.time[1]), 0, 0);
                order.date_time_reservation = new Date(date.jsDate);
            });
            return reservations;
        },
        getWorkInterval(item, key) {
            if (typeof item[key] !== 'object') {
                if (item[key].indexOf('-') !== -1) {
                    let timeArr = item[key].split('-');
                    item[key] = {
                        start: {
                            hours: parseInt(timeArr[0].split(':')[0]),
                            minutes: parseInt(timeArr[0].split(':')[1])
                        },
                        end: {
                            hours: parseInt(timeArr[1].split(':')[0]),
                            minutes: parseInt(timeArr[1].split(':')[1])
                        }
                    }
                } else {
                    if (item[key].indexOf(':') !== -1) {
                        let time = item.interval.split(':');
                        item[key] = {
                            hours: parseInt(time[0]),
                            minutes: parseInt(time[1])
                        }
                    } else {
                        item[key] = {
                            hours: 0,
                            minutes: parseInt(item[key])
                        }
                    }
                }
            }
            return item;
        },
        doSetIntervalLimit(daySchedule, oneDay, limitParam) {
            let time = null;
            daySchedule = this.getWorkInterval(daySchedule, limitParam);
            if (oneDay.date >= new Date(oneDay.initialDate).setHours(daySchedule[limitParam].start.hours, daySchedule[limitParam].start.minutes, 0, 0) &&
                oneDay.date < new Date(oneDay.initialDate).setHours(daySchedule[limitParam].end.hours, daySchedule[limitParam].end.minutes, 0, 0)) {
                time = {
                    time: {
                        start: new Date(oneDay.date),
                        end: new Date(oneDay.initialDate.setHours(daySchedule[limitParam].end.hours, daySchedule[limitParam].end.minutes, 0, 0))
                    }
                };
            }
            return time;
        },
        orderFreeRecords(reservations, dateToCheck) {
            let record = null;
            reservations.forEach(reservation => {
                if (reservation.date_time_reservation.getTime() === dateToCheck.getTime() && reservation.status !== 'refused') {
                    record = {
                        time: reservation.date_time_reservation,
                        status: reservation.status,
                        name: reservation.full_name,
                        phone: reservation.phone,
                        companyId: reservation.companyId,
                        id: reservation.id
                    };
                }
            });
            return record;
        },
        orderUserRecords(reservations, dateToCheck) {
            let record = null;
            reservations.forEach(reservation => {
                if (reservation.date_time_reservation.getTime() === dateToCheck.getTime() && reservation.status !== 'refused') {
                    record = {
                        time: reservation.date_time_reservation,
                        status: reservation.status,
                        name: reservation.full_name,
                        phone: reservation.phone,
                        companyId: reservation.companyId,
                        id: reservation.id,
                        userRecord: {
                            status: true,
                            specialist: reservation.specialist
                        }
                    };
                }
            });
            return record;
        },
        prettyDate(date, param) {
            let res = '';
            date = new Date(date);
            if (param === 'date') {
                res += date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                return res;
            }
            if (param === 'time') {
                res += (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' +
                    (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes());
                return res;
            }
        },
        prettyDateRange(dates, param) {
            let res1 = this.prettyDate(dates.start, param);
            let res2 = this.prettyDate(dates.end, param);
            return '' + res1 + ' - ' + res2;
        },
        setOrderStatusInArray(time) {
            this.mainArray.forEach(day => {
                if (day.date.getDate() === time.time.getDate()) {
                    day.times.forEach(timeEl => {
                        if (timeEl.time instanceof Date && timeEl.time.getTime() === time.time.getTime()) {
                            timeEl = time;
                        }
                    })
                }
            });
            this.reservations.forEach(reservation => {
                if (reservation.date_time_reservation.getTime() === time.time.getTime()) {
                    time.date_time_reservation = time.time;
                    this.reservations.splice(this.reservations.indexOf(reservation), 1, time);
                }
            })
        },
        toggleOrderPopup(time) {
            if (time.status === 'free' || time.status === 'refused') {
                this.record = time;
                document.querySelector('.blur').style.filter = 'blur(5px)';
                document.querySelector('.order-modal-wrap').style.display = 'block';
                document.querySelector('.title-time').innerHTML = 'Запись на ' + this.prettyDate(time.time, 'date') + ' ' + this.prettyDate(time.time, 'time');
                document.querySelector('#full_name').focus();

            }
            if (!this._masterUser) {
                if (time.status === 'armored') {
                    $('#armored-modal').modal();
                }
            }
        },
        renderPopupError(element, input, message, clearAfterInterval){
            let errorContainer = document.querySelector(element);
            errorContainer.innerHTML = message;
            errorContainer.style.display = 'block';
            let inputElement = null;
            if (input) {
                inputElement = document.querySelector(input);
                inputElement.classList.add('error');
            }
            if (clearAfterInterval) {
                setTimeout(() => {
                    inputElement.classList.remove('error');
                    errorContainer.innerHTML = '';
                    errorContainer.style.display = '';
                }, 3000);
            }
        },
        renderPopupSuccess(element, message, clearAfterInterval){
            let successContainer = document.querySelector(element);
            successContainer.style.display = 'block';
            successContainer.innerHTML = message;
            if (clearAfterInterval) {
                setTimeout(() => {
                    successContainer.style.display = '';
                    successContainer.innerHTML = ''
                }, 3000);
            }
        },
        prepareOrderParams(){
            this.record.name = document.querySelector('#full_name').value;
            this.record.phone = document.querySelector('#phone').value;
            let url = '/api/reservation/add/' + this._masterSlug + '/';
            let body = {
                full_name: this.record.name,
                phone: this.record.phone,
                date_time_reservation: '' + this.record.time.getFullYear() + '-' + (this.record.time.getMonth() + 1) +
                '-' + this.record.time.getDate() +
                ' ' + (this.record.time.getHours() > 9 ? this.record.time.getHours() : '0' + this.record.time.getHours()) +
                ':' + (this.record.time.getMinutes() > 9 ? this.record.time.getMinutes() : '0' + this.record.time.getMinutes()),
                status: 'armored'
            };
            if (this._masterUser) {
                body.status = 'confirmed';
            }
            let options = {
                headers: {
                    'X-CSRFToken': this._csrfToken
                }
            };
            return {
                options: options,
                body: body,
                url: url
            }
        },
        makeOrder(keypressState, event) {
            if (keypressState) {
                if (event.keyCode !== 13) return false;
            }
            if (!document.querySelector('#phone').value) {
                renderPopupError('.error', '#phone', '<div>Поле телефон введено неправильно</div>', true);
                return;
            }
            let params = this.prepareOrderParams();
            this.$http.post(params.url, params.body, params.options).then(response => {
                if (response.body.status !== 'error') {
                    this.renderPopupSuccess(".success", "Заявка успешно оформлена, ожидайте подтверждение специалиста", false);
                    this.record.status = 'armored';
                    if (this._masterUser) {
                        this.record.status = 'confirmed';
                        this.renderPopupSuccess(".success", "Заявка успешно оформлена", false);
                    }
                    this.record.id = response.body.id;
                    this.setOrderStatusInArray(this.record);
                    this.record.date_time_reservation = this.record.time;
                    this.reservations.push(this.record);
                    setTimeout(() => {
                        this.cleanOrderPopup();
                    }, 1500);
                } else {
                    var errorText = document.querySelector(".authorization-text a");
                    if (errorText && errorText.innerText === 'Авторизация') {
                        return;
                    }
                    this.renderPopupError('.error', null, '<div class="authorization-text">' + response.body.message + '</div>', false);
                    document.querySelector('.error').insertAdjacentHTML('afterend', '' +
                        '<div class="authorization-text" style="text-align: center">' +
                            '<a href="/accounts/login">Авторизация</a>' +
                        '</div>')
                }
            }, response => {
                console.error(response);
                if (response.body.phone) {
                    this.renderPopupError('.error', '#phone', '<div>' + response.body.phone + '</div>', true);
                }
            })
        },
        cleanOrderPopup() {
            document.querySelector('.order-modal-wrap').style.display = 'none';
            document.querySelector('.blur').style.filter = 'none';
            document.querySelector('.success').innerHTML = '';
            document.querySelector('.success').style.display = '';
            document.querySelector('.error').innerHTML = '';
        },
        setRecordStatus(time, status) {
            if (this._masterUser) {
                let url = '/api/reservation/status/' + this._masterSlug + '/' + time.id + '/';
                let body = {
                    status: status
                };
                let options = {
                    headers: {
                        'X-CSRFToken': this._csrfToken
                    }
                };
                this.$http.put(url, body, options).then(response => {
                    if (response.body.status === 'refused') {
                        time.status = 'free';
                        $('#confirm-modal .modal-body').html('Завяка успешно отклонена');
                        $('#confirm-modal').modal();
                    } else {
                        time.status = 'confirmed';
                        $('#confirm-modal .modal-body').html('Завяка успешно одобрена');
                        $('#confirm-modal').modal();
                    }
                    this.setOrderStatusInArray(time);
                }, error => {
                    console.error(error);
                })
            }
        },
        moveToNextWeek() {
            this.mainArray = [];

            this.range.current = new Date(this.range.current).setDate(new Date(this.range.current).getDate() + 1);

            let start = new Date(this.range.current);
            let end = new Date(this.range.current).setDate(new Date(this.range.current).getDate() + this.period);
            // if (new Date(end).getTime() >= new Date(this.range.end).getTime()) {
            //     start = new Date(this.range.end).setDate(new Date(this.range.end).getDate() - this.period);
            //     end = new Date(this.range.end);
            // }
            this.range.current = end;
            this.fillRange(start, end);
        },
        moveToPreviousWeek() {
            this.mainArray = [];

            this.range.current = new Date(this.range.current).setDate(new Date(this.range.current).getDate() - 1);

            let start = new Date(this.range.current).setDate(new Date(this.range.current).getDate() - (this.period * 2));
            let end = new Date(this.range.current).setDate(new Date(this.range.current).getDate() - this.period);
            // if (new Date(start).getTime() <= new Date(this.range.start).getTime()) {
            //     start = new Date(this.range.start);
            //     end = new Date(this.range.start).setDate(new Date(this.range.start).getDate() + this.period);
            // }

            this.range.current = end;
            this.fillRange(start, end);
        },
        checkIfInMainArrayDateExists(dateObject) {
            if (dateObject instanceof Object && dateObject.date) {
                dateObject = dateObject.date;
            }
            let result = this.mainArray.findIndex(x => {
                return new Date(x.date.setHours(0, 0, 0, 0)).getTime() === new Date(dateObject).getTime()
            });
            if (result !== -1) {
                return { status: true, index: result }
            } else {
                return { status: false, index: -1 };
            }
        },
        sortTimesInMainArray() {
            this.mainArray.forEach(item => {

                if (item.times.length > 1 && item.times[0].status === 'holiday') {
                    item.times.splice(0, 1);
                }

                item.times.sort((a, b) => {
                    if (a.time.start && b.time.start) {
                        return new Date(a.time.start) - new Date(b.time.start);
                    }
                    if (a.time.start) {
                        return new Date(a.time.start) - new Date(b.time);
                    }
                    if (b.time.start) {
                        return new Date(a.time) - new Date(b.time.start);
                    }
                    return new Date(a.time) - new Date(b.time);
                });
            });
        },
        makeClassFromCompany(time) {
            let result = '';
            this.schedule.forEach((schedule => {
                if (schedule.company === time.company) {
                    schedule.major ? result = 'company-1' : result = 'company-0';
                }
            }));
            return result;
        },
        toggleContent(scheduleState, editorState) {
            this.scheduleState = scheduleState;
            this.editorState = editorState;
            let prevLink = document.querySelector('#prev-week');
            let nextLink = document.querySelector('#next-week');
            if (scheduleState) {
                if (this.schedule.length > 0) {
                    setTimeout(()=>{
                        document.querySelector(".specialist > .grid").classList.remove('editor-mode');
                        prevLink.style.display = 'block';
                        nextLink.style.display = 'block';
                    });
                }
                this.getMasterSchedule();
            } else {
                setTimeout(()=>{
                    document.querySelector(".specialist > .grid").classList.add('editor-mode');
                    prevLink.style.display = 'none';
                    nextLink.style.display = 'none';
                });
                this.getScheduleSettings();
            }
        },
        toggleLocalLoader(status) {
            this.localLoaderState = status;
        },
        // editor methods
        returnDisabledDay(scheduleDay){
            if (!scheduleDay) {
                scheduleDay = {
                    time: {
                        start: '',
                        end: ''
                    },
                    live_recording: {
                        start: '',
                        end: ''
                    },
                    lunch_settings: {
                        start: '',
                        end: ''
                    },
                    interval: this.intervals[0],
                    lunchState: false
                };
                return scheduleDay;
            }
            scheduleDay.active = false;
            scheduleDay.lunchState = false;
            scheduleDay.time = {
                start: '',
                end: ''
            };
            scheduleDay.live_recording = {
                start: '',
                end: ''
            };
            scheduleDay.lunch_settings = {
                start: '',
                end: ''
            };
            scheduleDay.interval = this.intervals[0];
            return scheduleDay;
        },
        returnActiveDay(scheduleDay){
            scheduleDay.time = {
                start: scheduleDay.time.split('-')[0],
                end: scheduleDay.time.split('-')[1],
                init: scheduleDay.time,
            };
            if (scheduleDay.live_recording && scheduleDay.live_recording.indexOf('-') !== -1) {
                scheduleDay.liveState = true;
                scheduleDay.live_recording = {
                    init: scheduleDay.live_recording,
                    start: scheduleDay.live_recording.split('-')[0],
                    end: scheduleDay.live_recording.split('-')[1],
                }
            } else {
                scheduleDay.liveState = false;
                scheduleDay.live_recording = {
                    start: '',
                    end: ''
                }
            }
            if (scheduleDay.lunch_settings && scheduleDay.lunch_settings.indexOf('-') !== -1 && scheduleDay.lunch_settings.length > 3) {
                scheduleDay.lunch_settings = {
                    start: scheduleDay.lunch_settings.split('-')[0],
                    end: scheduleDay.lunch_settings.split('-')[1],
                };
                scheduleDay.lunchState = true;
            } else {
                scheduleDay.lunchState = false;
                scheduleDay.lunch_settings = {
                    start: '',
                    end: ''
                };
            }
            return scheduleDay;
        },
        getScheduleSettings() {
            this.toggleLocalLoader(true);
            this.scheduleSettings = [];
            if (this.schedule.length > 0) {
                if (this.schedule.length >= this.companies.length) {
                    this.schedule.forEach((schedule, index) => {
                        let url = '/api/work_day/' + this._masterSlug + '/' + schedule.id + '/update/';
                        let options = {
                            headers: {
                                'X-CSRFToken': this._csrfToken
                            }
                        };
                        this.$http.get(url, options).then(
                            response => {
                                let schedule = response.body;
                                this.companies.forEach(company => {
                                    if (typeof company === 'object' && company.id === schedule.company) {
                                        schedule.companyName = company.name;
                                    }
                                });
                                schedule.lunch_settings = {
                                    init: '',
                                    start: '',
                                    end: ''
                                };
                                this.days.forEach(day => {
                                    if (schedule[day] && schedule[day].time && schedule[day].time.indexOf('-') !== -1) {
                                        schedule[day].active = true;
                                    } else {
                                        schedule[day] = this.returnDisabledDay(schedule[day]);
                                    }
                                    if (schedule[day].active) {
                                        schedule[day] = this.returnActiveDay(schedule[day]);
                                    }
                                });
                                schedule.active = true;
                                this.scheduleSettings.push(schedule);
                                this.toggleLocalLoader(false);
                            },
                            error => {
                                console.log(error);
                                this.toggleLocalLoader(false);
                            }
                        )
                    });
                }
                else {
                    this.companies.forEach(company => {
                        if (typeof company === 'object') {
                            let lunchIndex = 0;
                            let schedule = this.schedule.filter((x, index) => {
                                if (x.company === company.id) {
                                    lunchIndex = index;
                                    return true;
                                }
                            });
                            schedule.lunch_settings = {
                                start: '',
                                end: ''
                            };
                            if (schedule.length > 0) {
                                schedule = schedule[0];
                                let url = '/api/work_day/' + this._masterSlug + '/' + schedule.id + '/update/';
                                let options = {
                                    headers: {
                                        'X-CSRFToken': this._csrfToken
                                    }
                                };
                                this.$http.get(url, options).then(
                                    response => {
                                        let schedule = response.body;
                                        this.companies.forEach(company => {
                                            if (typeof company === 'object' && company.id === schedule.company) {
                                                schedule.companyName = company.name;
                                            }
                                        });
                                        schedule.lunch_settings = {
                                            start: '',
                                            end: ''
                                        };
                                        this.days.forEach(day => {
                                            if (schedule[day] && schedule[day].time && schedule[day].time.indexOf('-') !== -1) {
                                                schedule[day].active = true;
                                                schedule[day].lunchState = true;
                                            } else {
                                                schedule[day] = this.returnDisabledDay(schedule[day]);
                                            }
                                            if (schedule[day].active) {
                                                schedule[day] = this.returnActiveDay(schedule[day]);
                                            }
                                        });
                                        schedule.active = true;
                                        this.scheduleSettings.push(schedule);
                                        this.toggleLocalLoader(false);
                                    },
                                    error => {
                                        console.log(error);
                                        this.toggleLocalLoader(false);
                                    }
                                )
                            }
                            else {
                                let dayObj = {};
                                this.days.forEach(day => {
                                    dayObj[day] = this.returnDisabledDay(dayObj[day]);
                                    dayObj[day].active = (day !== 'sunday');
                                });
                                dayObj.company = company.id;
                                dayObj.companyName = company.name;
                                dayObj.lunch_settings = {
                                    start: '',
                                    end: ''
                                };
                                this.scheduleSettings.push(dayObj);
                                this.toggleLocalLoader(false);
                            }
                        }
                    })
                }
            } else {
                if (this.companies.length > 0 && this.companies.some(comp => typeof comp === 'object')) {
                    this.companies.forEach(company => {
                        let dayObj = {};
                        this.days.forEach(day => {
                            dayObj[day] = this.returnDisabledDay(dayObj[day]);
                            dayObj[day].active = (day !== 'sunday');
                        });
                        dayObj.company = company.id;
                        dayObj.companyName = company.name;
                        dayObj.lunch_settings = {
                            start: '',
                            end: ''
                        };
                        this.scheduleSettings.push(dayObj);
                        this.toggleLocalLoader(false);
                    })
                } else {
                    let dayObj = {};
                    this.days.forEach(day => {
                        dayObj[day] = this.returnDisabledDay(dayObj[day]);
                        dayObj[day].active = (day !== 'sunday');
                    });
                    dayObj.lunch_settings = {
                        start: '',
                        end: ''
                    };
                    dayObj.company = null;
                    this.scheduleSettings.push(dayObj);
                    this.toggleLocalLoader(false);
                }
            }
        },
        parseTime(val) {
            if (typeof val === 'object') {
                return val;
            }
            if (val && val.indexOf(':') !== -1) {
                return {
                    init: val,
                    hours: parseInt(val.split(':')[0]),
                    minutes: parseInt(val.split(':')[1])
                }
            }
        },
        compareScheduleTimes(time1, time2) {
            if (!time2) return true;
            if (!time1) return false;
            if (time1.hours > time2.hours) {
                return true;
            } else if (time1.hours < time2.hours) {
                return false;
            } else if (time1.hours === time2.hours) {
                if (time1.minutes >= time2.minutes) {
                    return true;
                } else return time1.minutes > time2.minutes;
            }

        },
        prepareScheduleSettingsToSend(scheduleSettings, index) {
            let schedule = JSON.parse(JSON.stringify(scheduleSettings[index]));
            this.days.forEach(day => {
                if (schedule[day] && schedule[day].active) {
                    schedule[day].time = schedule[day].time.start + '-' + schedule[day].time.end;
                    if (schedule[day].liveState) {
                        schedule[day].live_recording = schedule[day].live_recording.start + '-' + schedule[day].live_recording.end;
                    } else {
                        schedule[day].live_recording = '';
                    }
                    schedule[day].lunch_settings = schedule[day].lunch_settings.start + '-' + schedule[day].lunch_settings.end;
                } else {
                    schedule[day].time = '';
                    schedule[day].lunch_settings = '';
                    schedule[day].interval = '';
                    schedule[day].live_recording = '';
                    schedule[day].active = false;
                }
            });
            return schedule;
        },
        submitSchedule(event, index, active) {
            event.preventDefault();
            let schedule = this.prepareScheduleSettingsToSend(this.scheduleSettings, index);
            if (active) {
                let url = `/api/work_day/${this._masterSlug}/${schedule.id}/update/`;
                let body = schedule;
                let options = {
                    headers: {
                        'X-CSRFToken': this._csrfToken
                    }
                };
                this.$http.put(url, body, options).then(response => {
                    alert('Вы успешно обновили расписание');
                    this.toggleContent(true, false)
                }, error => {
                    console.error(error);
                })
            } else {
                let url = `/api/work_day/${this._masterSlug}/add/`;
                let body = schedule;
                let options = {
                    headers: {
                        'X-CSRFToken': this._csrfToken
                    }
                };
                this.$http.post(url, body, options).then(response => {
                    alert('Вы успешно создали расписание');
                    this.updateSchduleAfterEditing();
                }, error => {
                    console.error(error);
                })
            }
        },
        updateLunchTime(index, val, state) {
            if (!this.scheduleSettings[index].lunch_settings.start) {
                this.scheduleSettings[index].lunch_settings = {
                    start: '',
                    end: ''
                }
            }
            if (state) {
                this.scheduleSettings[index].lunch_settings.start = val;
            } else {
                this.scheduleSettings[index].lunch_settings.end = val;
            }
        },
        updateSchduleAfterEditing() {
            this.$http.get('/api/schedule-setting/' + this._masterSlug).then(response => {
                this.schedule = response.body;
                this.getScheduleSettings();
            }, error => {
                console.error(error);
            })
        },
        // firebase methods
        subscribeToNewOrders() {
            if (this._masterUser) {
                var newOrders = firebase.database().ref("reservation/new");
                newOrders.on("child_added", (response) => {
                    if (this.initialSocketDataLoaded) {
                        var order = response.val();
                        if (order.specialist_slug && order.specialist_slug === this._masterSlug) {
                            this.addSocketOrderToArray(order);
                            this.showNotification("Новая заявка", order.message);
                        }
                    }
                });
                // trigger changes only for incremental children, not for initial data
                newOrders.once("value", (val) => {
                    this.initialSocketDataLoaded = true;
                });
            }
        },
        subscribeToChangedOrders() {
            if (this._masterUser) {
                var changedOrders = firebase.database().ref("reservation/changed");
                changedOrders.on("child_added", (response) => {
                    if (this.initialSocketDataChangeLoaded) {
                        var order = response.val();
                        if (order.specialist_slug && order.specialist_slug === this._masterSlug) {
                            this.updateSocketOrderInArray(order);
                            this.showNotification("Измененная заявка", order.message);
                        }
                    }
                });
                changedOrders.once("value", () => {
                    this.initialSocketDataChangeLoaded = true;
                });
            }
        },
        checkNotificationPermissions() {
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
                return;
            }
            if (Notification.permission !== "denied") {
                Notification.requestPermission((permission) => {
                    if (permission === "granted") {
                        this.notificationPermissions = true;
                    } else {
                        this.notificationPermissions = false;
                    }
                });
            }
        },
        showNotification(title, body) {
            var notification = new Notification(title, {
                icon: window.location.origin + "/static/img/logo.png",
                body: body,
            });
        },
        rebuidSocketOrder(order) {
            return {
                name: order.full_name,
                status: order.status,
                time: new Date(order.date_time),
                phone: order.phone,
                id: order.id,
                date_time_reservation: new Date(order.date_time)
            };
        },
        addSocketOrderToArray(order) {
            order = this.rebuidSocketOrder(order);
            // add order to reservations array
            this.reservations.push(order);
            // add order immediately if user now see proper time
            // search for week day
            for (var i = 0; i < this.mainArray.length; i++) {
                if (order.time.getDay() === this.mainArray[i].date.getDay()) {
                    // search for proper time in week day
                    for (var j = 0; j < this.mainArray[i].times.length; j++) {
                        var cell = this.mainArray[i].times[j];
                        if (order.time.getTime() === cell.time.getTime()) {
                            // check if status is suitable for changes
                            if (order.status !== cell.status && !cell.status.match(/history/)) {
                                cell.status = order.status;
                                cell.name = order.name;
                                cell.id = order.id;
                                cell.phone = order.phone;
                                cell.time = order.time;
                                break;
                            }
                        }
                    }
                }
            }
        },
        updateSocketOrderInArray(order) {
            order = this.rebuidSocketOrder(order);
            // update reservation list
            this.reservations.map(reservation => {
                if (reservation.id === order.id) {
                    return reservation = JSON.parse(JSON.stringify(order));
                }
            });
            // add order immediately if user now see proper time
            // search for week day
            for (var i = 0; i < this.mainArray.length; i++) {
                if (order.time.getDay() === this.mainArray[i].date.getDay()) {
                    // search for proper time in week day
                    for (var j = 0; j < this.mainArray[i].times.length; j++) {
                        var cell = this.mainArray[i].times[j];
                        if (order.time.getTime() === cell.time.getTime()) {
                            // check if status is suitable for changes
                            if (order.status === "refused") {
                                cell.status = "free";
                                cell.name = undefined;
                                cell.id = undefined;
                                cell.phone = undefined;
                                return;
                            }
                            if (order.status !== cell.status && !cell.status.match(/history/)) {
                                cell.status = order.status;
                                cell.name = order.name;
                                cell.id = order.id;
                                cell.phone = order.phone;
                                cell.time = order.time;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
});

if (typeof process !== 'undefined') {
    module.exports = app;
}