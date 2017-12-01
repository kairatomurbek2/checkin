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
        period: 6,
        record: {},
        reservations: null,
        mainArray: [],
        _masterSlug: '',
        _masterUser: '',
        _csrfToken: '',
        range: {
            start: new Date().setHours(0, 0, 0, 0),
            end: new Date(new Date().setDate(new Date().getDate() + 30)).setHours(0, 0, 0, 0),
            current: ''
        },
        lunchTime: [],
        companies: [],
        companiesForClass: []
    },

    mounted() {
    },

    methods: {
        // calendar methods
        getDataFromDjango(val, slug, csrfToken, companies) {
            this._masterSlug = slug;
            this._masterUser = val;
            this._csrfToken = csrfToken;
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
                    })
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
                document.querySelector('.order-modal-wrap').style.display = 'block';
                document.querySelector('.title-time').innerHTML = 'Запись на ' + this.prettyDate(time.time, 'date') + ' ' + this.prettyDate(time.time, 'time');

            }
            if (!this._masterUser) {
                if (time.status === 'armored') {
                    $('#armored-modal').modal();
                }
            }
        },
        makeOrder() {
            if (!document.querySelector('#phone').value) {
                document.querySelector('.error').innerHTML += '<div> Поле телефон не введено </div>';
                document.querySelector('.error').style.display = 'block';
                input = document.querySelector('#phone');
                input.classList.add('error');
                setTimeout(function () {
                    input.classList.remove('error');
                    document.querySelector('.error').innerHTML = '';
                    document.querySelector('.error').style.display = '';
                }, 3000);
                return;
            }
            this.record.name = document.querySelector('#full_name').value;
            this.record.phone = document.querySelector('#phone').value;
            let url = '/api/reservation/add/' + this._masterSlug + '/';
            let body = {
                full_name: this.record.name,
                phone: this.record.phone,
                date_time_reservation: '' + this.record.time.getFullYear() + '-' + (this.record.time.getMonth() + 1) + '-' + this.record.time.getDate() +
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
            this.$http.post(url, body, options).then(response => {
                if (response.body.status !== 'error') {
                    document.querySelector('.success').style.display = 'block';
                    document.querySelector('.success').innerHTML = 'Заявка успешно оформлена, ожидайте подтверждение специалиста';
                    this.record.status = 'armored';
                    if (this._masterUser) {
                        this.record.status = 'confirmed';
                        document.querySelector('.success').innerHTML = 'Заявка успешно оформлена';
                    }
                    this.record.id = response.body.id;
                    this.setOrderStatusInArray(this.record);
                    this.record.date_time_reservation = this.record.time;
                    this.reservations.push(this.record);
                    setTimeout(function () {
                        document.querySelector('.order-modal-wrap').style.display = 'none';
                        document.querySelector('.success').innerHTML = '';
                        document.querySelector('.success').style.display = '';
                        document.querySelector('.error').innerHTML = '';
                        this.cleanOrderPopup();
                    }, 3000);
                } else {
                    document.querySelector('.error').style.display = 'block';
                    document.querySelector('.error').innerHTML += '<div class="authorization-text">' + response.body.message + '</div>';
                    document.querySelector('.error').insertAdjacentHTML('afterend', '<div class="authorization-text" style="text-align: center"><a href="/accounts/login">Авторизация</a></div>')
                }
            }, response => {
                console.error(response);
            })
        },
        cleanOrderPopup() {
            document.querySelector('.order-modal-wrap').style.display = 'none';
            document.querySelector('.blur').style.filter = 'blur(0px)';
            document.querySelector('.title-time').innerHTML = '';
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
            if (this.scheduleState) {
                if (this.schedule.length > 0) {
                    document.querySelector('#prev-week').style.display = 'block';
                    document.querySelector('#next-week').style.display = 'block';
                }
                this.getMasterSchedule();
            } else {
                document.querySelector('#prev-week').style.display = 'none';
                document.querySelector('#next-week').style.display = 'none';
                this.getScheduleSettings();
            }
        },
        // editor methods
        getScheduleSettings() {
            this.scheduleSettings = [];
            if (this.schedule.length > 0) {
                if (this.schedule.length === this.companies.length) {
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
                                        schedule[day].active = false;
                                        schedule[day].time = {
                                            start: '',
                                            end: ''
                                        };
                                        schedule[day].live_recording = {
                                            start: '',
                                            end: ''
                                        };
                                        schedule[day].lunch_settings = {
                                            start: '',
                                            end: ''
                                        };
                                        schedule[day].interval = this.intervals[0];
                                    }
                                    if (schedule[day].active) {
                                        schedule[day].time = {
                                            start: schedule[day].time.split('-')[0],
                                            end: schedule[day].time.split('-')[1],
                                            init: schedule[day].time,
                                        };
                                        if (schedule[day].live_recording && schedule[day].live_recording.indexOf('-') !== -1) {
                                            schedule[day].liveState = true;
                                            schedule[day].live_recording = {
                                                init: schedule[day].live_recording,
                                                start: schedule[day].live_recording.split('-')[0],
                                                end: schedule[day].live_recording.split('-')[1],
                                            }
                                        } else {
                                            schedule[day].liveState = false;
                                            schedule[day].live_recording = {
                                                start: '',
                                                end: ''
                                            }
                                        }
                                        if (schedule[day].lunch_settings && schedule[day].lunch_settings.indexOf('-') !== -1) {
                                            schedule.lunch_settings.init = schedule[day].lunch_settings;
                                            schedule.lunch_settings.start = schedule[day].lunch_settings.split('-')[0];
                                            schedule.lunch_settings.end = schedule[day].lunch_settings.split('-')[1];
                                        }
                                    }
                                });
                                schedule.active = true;
                                this.scheduleSettings.push(schedule);
                            },
                            error => {
                                console.log(error);
                            }
                        )
                    });
                } else {
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
                                            } else {
                                                schedule[day].active = false;
                                                schedule[day].time = {
                                                    start: '',
                                                    end: ''
                                                };
                                                schedule[day].live_recording = {
                                                    start: '',
                                                    end: ''
                                                };
                                                schedule[day].lunch_settings = {
                                                    start: '',
                                                    end: ''
                                                };
                                                schedule[day].interval = this.intervals[0];
                                            }
                                            if (schedule[day].active) {
                                                schedule[day].time = {
                                                    start: schedule[day].time.split('-')[0],
                                                    end: schedule[day].time.split('-')[1],
                                                    init: schedule[day].time,
                                                };
                                                if (schedule[day].live_recording && schedule[day].live_recording.indexOf('-') !== -1) {
                                                    schedule[day].liveState = true;
                                                    schedule[day].live_recording = {
                                                        init: schedule[day].live_recording,
                                                        start: schedule[day].live_recording.split('-')[0],
                                                        end: schedule[day].live_recording.split('-')[1],
                                                    }
                                                } else {
                                                    schedule[day].liveState = false;
                                                    schedule[day].live_recording = {
                                                        start: '',
                                                        end: ''
                                                    }
                                                }
                                                if (schedule[day].lunch_settings && schedule[day].lunch_settings.indexOf('-') !== -1) {
                                                    schedule.lunch_settings.start = schedule[day].lunch_settings.split('-')[0];
                                                    schedule.lunch_settings.end = schedule[day].lunch_settings.split('-')[1];
                                                }
                                            }
                                        });
                                        schedule.active = true;
                                        this.scheduleSettings.push(schedule);
                                    },
                                    error => {
                                        console.log(error);
                                    }
                                )
                            }
                            else {
                                let dayObj = {};
                                this.days.forEach(day => {
                                    dayObj[day] = {
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
                                        active: false
                                    }
                                });
                                dayObj.active = false;
                                dayObj.company = company.id;
                                dayObj.companyName = company.name;
                                dayObj.lunch_settings = {
                                    start: '',
                                    end: ''
                                };
                                this.scheduleSettings.push(dayObj);
                            }
                        }
                    })
                }
            } else {
                if (this.companies.length > 0 && this.companies.some(comp => typeof comp === 'object')) {
                    this.companies.forEach(company => {
                        let dayObj = {};
                        this.days.forEach(day => {
                            dayObj[day] = {
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
                                active: false
                            }
                        });
                        dayObj.active = false;
                        dayObj.company = company.id;
                        dayObj.companyName = company.name;
                        dayObj.lunch_settings = {
                            start: '',
                            end: ''
                        };
                        this.scheduleSettings.push(dayObj);
                    })
                } else {
                    let dayObj = {};
                    this.days.forEach(day => {
                        dayObj[day] = {
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
                            active: false
                        }
                    });
                    dayObj.active = false;
                    dayObj.lunch_settings = {
                        start: '',
                        end: ''
                    };
                    dayObj.company = null;
                    this.scheduleSettings.push(dayObj);
                }
            }
        },
        parseTime(val) {
            if (val && val.indexOf(':') !== -1) {
                return {
                    init: val,
                    hours: parseInt(val.split(':')[0]),
                    minutes: parseInt(val.split(':')[1])
                }
            }
        },
        compareScheduleTimes(time1, time2) {
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
        updateScheduleSettingsTime(scheduleDay, day, event, index, startState) {
            // startState - is a state, which signs that element shows start of the day or end of the day;
            // index - first element in scheduleSettings or second element
            let value = event.target.value;
            let sibling = {};
            let gotTime = {};
            let relative = {};
            if (index === 0) {
                if (this.scheduleSettings.length > 1) {
                    if (this.scheduleSettings[1][day] && this.scheduleSettings[1][day].time.start.indexOf(":") !== -1) {
                        sibling.init = this.scheduleSettings[1][day].time;
                        sibling.start = this.parseTime(this.scheduleSettings[1][day].time.start);
                        sibling.end = this.parseTime(this.scheduleSettings[1][day].time.end);
                    }
                }
            }

            if (index === 1) {
                if (this.scheduleSettings[0][day] && this.scheduleSettings[0][day].time.end.indexOf(":") !== -1) {
                    sibling.init = this.scheduleSettings[0][day].time;
                    sibling.start = this.parseTime(this.scheduleSettings[0][day].time.start);
                    sibling.end = this.parseTime(this.scheduleSettings[0][day].time.end);
                }
            }

            if (startState) {
                gotTime = this.parseTime(value);
                relative = this.parseTime(scheduleDay.time.end);
                if (relative) {
                    if (this.compareScheduleTimes(relative, gotTime)) {
                        scheduleDay.time.start = value;
                    } else {
                        scheduleDay.time.start = scheduleDay.time.end;
                        event.target.value = scheduleDay.time.end;
                    }
                }
                if (sibling.start) {
                    if (this.compareScheduleTimes(gotTime, sibling.start) && this.compareScheduleTimes(sibling.end, gotTime)) {
                        scheduleDay.time.start = sibling.end.init;
                        event.target.value = sibling.end.init;
                    } else {
                        scheduleDay.time.start = value;
                    }
                } else {
                    scheduleDay.time.start = value;
                }
            } else {
                gotTime = this.parseTime(value);
                relative = this.parseTime(scheduleDay.time.start);
                if (relative) {
                    if (this.compareScheduleTimes(relative, gotTime)) {
                        scheduleDay.time.end = scheduleDay.time.start;
                        event.target.end = scheduleDay.time.start;
                    } else {
                        scheduleDay.time.end = value;
                    }
                }
                if (sibling.end) {
                    if (this.compareScheduleTimes(gotTime, sibling.start) && this.compareScheduleTimes(sibling.end, gotTime)) {
                        scheduleDay.time.end = sibling.end.init;
                        event.target.value = sibling.end.init;
                    } else {
                        scheduleDay.time.end = value;
                    }
                } else {
                    scheduleDay.time.end = value;
                }
            }
        },
        updateLiveQueue(scheduleDay, event, startState) {
            let value = this.parseTime(event.target.value);
            let start = this.parseTime(scheduleDay.time.start);
            let end = this.parseTime(scheduleDay.time.end);

            if (this.compareScheduleTimes(start, value) || this.compareScheduleTimes(value, end)) {
                if (startState) {
                    scheduleDay.live_recording.start = scheduleDay.time.start;
                    event.target.value = scheduleDay.time.start;
                } else {
                    scheduleDay.live_recording.end = scheduleDay.time.end;
                    event.target.value = scheduleDay.time.end;
                }
            } else {
                if (startState) {
                    scheduleDay.live_recording.start = event.target.value;
                } else {
                    scheduleDay.live_recording.end = event.target.value;
                }
            }
        },
        submitSchedule(event, index, active) {
            event.preventDefault();
            let schedule = JSON.parse(JSON.stringify(this.scheduleSettings[index]));
            if (!schedule.lunch_settings.start || !schedule.lunch_settings.end) {
                alert("Вы не ввели время обеда");
                return;
            }
            this.days.forEach(day => {
                if (schedule[day] && schedule[day].active) {
                    schedule[day].time = schedule[day].time.start + '-' + schedule[day].time.end;
                    if (schedule[day].liveState) {
                        schedule[day].live_recording = schedule[day].live_recording.start + '-' + schedule[day].live_recording.end;
                    } else {
                        schedule[day].live_recording = '';
                    }
                    schedule[day].lunch_settings = schedule.lunch_settings.start + '-' + schedule.lunch_settings.end;
                } else {
                    schedule[day].time = '';
                    schedule[day].lunch_settings = '';
                    schedule[day].interval = '';
                    schedule[day].live_recording = '';
                    schedule[day].active = false;
                }
            });

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
        }
    }
});
