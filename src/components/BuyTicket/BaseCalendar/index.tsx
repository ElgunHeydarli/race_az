import { DayPicker } from 'react-day-picker';

const BaseCalendar = ({
  field,
  setShowCalendar,
}: {
  field: {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
  };
  setShowCalendar: (value: boolean) => void;
}) => {
  return (
    <>
      <DayPicker
        mode="single"
        selected={field.value}
        onSelect={(date) => {
          field.onChange(date);
          setShowCalendar(false);
        }}
        fromYear={1950}
        toYear={new Date().getFullYear()}
        captionLayout="dropdown"
        modifiersClassNames={{
          selected: 'bg-[#0B98A1] text-white rounded-full',
          today: 'border border-[#0B98A1] rounded-full',
        }}
        classNames={{
          months: 'flex flex-col gap-4',
          caption: 'flex justify-between items-center py-2 px-2',
          caption_label: 'hidden',
          dropdown:
            'bg-[#333] text-white rounded-md border border-[#444] p-1 text-sm',
          dropdown_month: 'bg-[#333] text-white',
          dropdown_year: 'bg-[#333] text-white',
          head: 'text-[#999]',
          head_cell: 'w-10 h-10 font-normal text-sm',
          table: 'w-full border-collapse',
          cell: 'w-10 h-10 text-center text-sm p-0 relative',
          day: 'w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#333] text-white',
          day_selected: 'bg-[#0B98A1] text-white',
          day_today: 'border border-[#0B98A1]',
          day_outside: 'text-[#666] opacity-50',
          nav: 'flex items-center space-x-1',
          nav_button:
            'h-7 w-7 bg-transparent text-white flex items-center justify-center',
          nav_button_previous: 'absolute left-1',
          nav_button_next: 'absolute right-1',
          root: 'bg-[#1E1E1E] text-white',
        }}
        styles={{
          caption: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px',
          },
          months: { backgroundColor: '#1E1E1E' },
        }}
      />
    </>
  );
};

export default BaseCalendar;
