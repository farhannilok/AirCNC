import { DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const Calender = ({ date, handleDateChange }) => {
    return (
        <DateRange
            rangeColors={['#F43F5E']}
            onChange={handleDateChange}
            ranges={[date]}
            direction='vertical'
            showDateDisplay={false}
            minDate={date.startDate}
            maxDate={date.endDate}
        />
    )
}

export default Calender