import { CalendarIcon } from 'lucide-react';
import { cn } from '.';
import { Button } from './button';
import { Calendar, CalendarProps } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { format } from 'date-fns';

type DatePickerProps = {
  value?: Date;
  onChange: (value?: Date) => void;
} & CalendarProps;

export function DatePicker({ value, onChange, ...props }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full pl-3 text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          {value ? format(value, 'PPP') : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...props}
          mode="single"
          selected={value}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}
