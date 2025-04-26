import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';
import { LucideIcon, MarsIcon, VenusIcon } from 'lucide-react';

export interface GenderSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string; Icon?: LucideIcon }>;
}

export const GenderSelect: React.FC<GenderSelectProps> = ({
  value,
  onChange,
  label = 'Gender',
  disabled = false,
  placeholder = 'Select gender',
  options = [
    { value: 'male', label: 'Male', Icon: MarsIcon },
    { value: 'female', label: 'Female', Icon: VenusIcon },
  ],
}) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="inline-flex items-center gap-2">
                {option.Icon && <option.Icon className="size-4" />}
                {option.label}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
