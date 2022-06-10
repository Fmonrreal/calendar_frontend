import React, { useEffect, useState } from 'react';
import {Calendar,momentLocalizer} from 'react-big-calendar';
import {useDispatch,useSelector} from 'react-redux'
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calender-message-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';


import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { eveentStartLoading, eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

// const events = [{
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(2,'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Fernando'
//     }
// }]

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const {events,activeEvent} = useSelector( state => state.calendar );
    const {uid} = useSelector( state => state.auth );


    const [lastView, setlastView] = useState( localStorage.getItem('lastView') || 'month');

    useEffect(() => {
        
        dispatch(eveentStartLoading());

    }, [dispatch])

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setlastView(e);
        localStorage.setItem('lastView',e);
    }

    const onSelectSlot = (e) => {
        // console.log(e)
        dispatch(eventClearActiveEvent());
    }

    const eventStyleGetter = (event,start,end,isSelected) => {

        // console.log(event,start,end,isSelected);
        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    };

    return (
        <div className="calendar-screen">
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                onSelectSlot={onSelectSlot}
                selectable={true}
                components={{
                    event: CalendarEvent
                }}
                // style={{ height: 500 }}
            />

            <AddNewFab/>

            {
                (activeEvent) && <DeleteEventFab/>
            }

            <CalendarModal/>
            
        </div>
    )
}
