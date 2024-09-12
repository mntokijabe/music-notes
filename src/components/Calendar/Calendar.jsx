import React from 'react';

const Calendar = () => {
  return (
    <div>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=8b89550a61f99a83c84665c4aaa45d7720658a4b48d1125bc7e0042340c1eeff%40group.calendar.google.com&ctz=America%2FChicago"
        style={{ border: 0 }}
        width="800"
        height="600"
        frameBorder="0"
        scrolling="no"
        title="Google Calendar"
      />
    </div>
  );
};

export default Calendar;


