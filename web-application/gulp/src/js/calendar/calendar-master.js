let app = new Vue({
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
        scheduleState: true,
        editorState: false,
        localLoaderState: true,
        period: 5,
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
        companiesForClass: [],
        // firebase variables
        notificationPermissions: false,
        initialSocketDataLoaded: false,
        initialSocketDataChangeLoaded: false
    },

    mounted() {
        this.checkNotificationPermissions();
        this.subscribeToNewOrders();
        this.subscribeToChangedOrders();
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
                this.getMasterOrders();
            }, error => {
                console.error(error);
            })
        },
        getMasterOrders() {
            this.$http.get('/api/reservation/' + this._masterSlug).then(response => {
                this.reservations = response.body;
                this.doCorrectDateInOrders();
                this.fillRange(this.range.start, new Date(this.range.start).setDate(new Date(this.range.start).getDate() + this.period));
                this.toggleLocalLoader(false);
            }, error => {
                console.error(error);
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
                                this.mainArray[result.index].times.push({time: new Date(now), status: 'holiday'});
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
            // when dates were added from different schedules, it's needed to sort it all
            this.sortTimesInMainArray();
        },
        calculateLiveTimes(time, interval){
            let timeInterval = (interval.hours > 0) ? ((60*interval.hours) + interval.minutes) : interval.minutes;
            let counter = 0;
            let start = new Date(time.start);
            let end = new Date(time.end);
            while (new Date(start) < new Date(end)) {
                counter ++;
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
                let record = this.orderFreeRecords(oneDay.date);
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
            this.dayTime = {date: oneDay.date, times: times};
        },
        doCorrectDateInOrders() {
            this.reservations.map(order => {
                let date = {
                    date: order.date_time_reservation.split(' ')[0].split('.'),
                    time: order.date_time_reservation.split(' ')[1].split(':'),
                    jsDate: ''
                };
                date.jsDate = new Date('' + date.date[1] + '/' + date.date[0] + '/' + date.date[2]).setHours(parseInt(date.time[0]), parseInt(date.time[1]), 0, 0);
                order.date_time_reservation = new Date(date.jsDate);
            })
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
        orderFreeRecords(dateToCheck) {
            let record = null;
            this.reservations.forEach(reservation => {
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
                document.querySelector('.modal-calendar-admin').style.display = 'block';
                document.querySelector('.modal-calendar-admin .title-time').innerHTML = 'Запись на ' + this.prettyDate(time.time, 'date') + ' ' + this.prettyDate(time.time, 'time');
                document.querySelector('#full_name_admin').focus();
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
            this.record.name = document.querySelector('#full_name_admin').value;
            this.record.phone = document.querySelector('#phone_admin').value;
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
            if (!document.querySelector('#phone_admin').value) {
                renderPopupError('.error', '#phone_admin', '<div>Поле телефон введено неправильно</div>', true);
                return;
            }

            let params = this.prepareOrderParams();
            this.$http.post(params.url, params.body, params.options).then(response => {
                if (response.body.status !== 'error') {
                    this.renderPopupSuccess(".modal-calendar-admin .success", "Заявка успешно оформлена, ожидайте подтверждение специалиста", false);
                    this.record.status = 'armored';
                    if (this._masterUser) {
                        this.record.status = 'confirmed';
                        this.renderPopupSuccess(".modal-calendar-admin .success", "Заявка успешно оформлена", false);
                    }
                    this.record.id = response.body.id;
                    this.setOrderStatusInArray(this.record);
                    this.record.date_time_reservation = this.record.time;
                    this.reservations.push(this.record);

                    setTimeout(() => {
                        this.cleanOrderPopup()
                    }, 1500);

                } else {
                    var errorText = document.querySelector(".authorization-text a");
                    if (errorText && errorText.innerText === 'Авторизация') {
                        return;
                    }
                    this.renderPopupError('.modal-calendar-admin .error', null, '<div class="authorization-text">' + response.body.message + '</div>', false);
                    document.querySelector('.modal-calendar-admin .error').insertAdjacentHTML('afterend', '' +
                        '<div class="authorization-text" style="text-align: center">' +
                        '<a href="/accounts/login">Авторизация</a>' +
                        '</div>');
                }
            }, response => {
                console.error(response);
                if (response.body.phone) {
                    this.renderPopupError('.modal-calendar-admin .error', '#phone_admin', '<div>' + response.body.phone + '</div>', true);
                }
            })
        },
        cleanOrderPopup() {
            document.querySelector('#phone_admin').value = '';
            document.querySelector('#full_name_admin').value = '';
            document.querySelector('.modal-calendar-admin').style.display = 'none';
            document.querySelector('.blur').style.filter = 'none';
            document.querySelector('.modal-calendar-admin .success').innerHTML = '';
            document.querySelector('.modal-calendar-admin .success').style.display = '';
            document.querySelector('.modal-calendar-admin .error').innerHTML = '';
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
            if (new Date(end).getTime() >= new Date(this.range.end).getTime()) {
                start = new Date(this.range.end).setDate(new Date(this.range.end).getDate() - this.period);
                end = new Date(this.range.end);
            }
            this.range.current = end;
            this.fillRange(start, end);
        },
        moveToPreviousWeek() {
            this.mainArray = [];

            this.range.current = new Date(this.range.current).setDate(new Date(this.range.current).getDate() - 1);

            let start = new Date(this.range.current).setDate(new Date(this.range.current).getDate() - (this.period * 2));
            let end = new Date(this.range.current).setDate(new Date(this.range.current).getDate() - this.period);
            if (new Date(start).getTime() <= new Date(this.range.start).getTime()) {
                start = new Date(this.range.start);
                end = new Date(this.range.start).setDate(new Date(this.range.start).getDate() + this.period);
            }
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
                return {status: true, index: result}
            } else {
                return {status: false, index: -1};
            }
        },
        sortTimesInMainArray() {
            this.mainArray.forEach(item => {

                if (item.times.length > 1 && item.times[0].status === 'holiday') {
                    item.times.splice(0, 1);
                }

                item.times.sort((a, b) => {
                    if (a.time.start) {
                        return new Date(a.time.start) - new Date(b.time);
                    }
                    if (b.time.start) {
                        return new Date(a.time) - new Date(b.time.start);
                    }
                    if (a.time.start && b.time.start) {
                        return new Date(a.time.start) - new Date(b.time.start);
                    }
                    return new Date(a.time) - new Date(b.time);
                });
            })
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
            if (scheduleState) {
                if (this.schedule.length > 0) {
                    setTimeout(() => {
                        document.querySelector('#prev-week').style.display = 'block';
                        document.querySelector('#next-week').style.display = 'block';
                    });
                }
                this.getMasterSchedule();
            } else {
                setTimeout(() => {
                    document.querySelector('#prev-week').style.display = 'none';
                    document.querySelector('#next-week').style.display = 'none';
                });
                this.getScheduleSettings();
            }
        },
        toggleLocalLoader(status) {
            this.localLoaderState = status;
        },
        // firebase methods
        subscribeToNewOrders() {
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
        },
        subscribeToChangedOrders() {
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

