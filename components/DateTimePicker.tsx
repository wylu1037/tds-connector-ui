"use client"

import { ChevronDownIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateTimePickerProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Select date and time",
  disabled = false,
  className,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const parseDateTime = (dateTimeString?: string) => {
    if (!dateTimeString) return { date: undefined, time: "10:00" }
    
    const date = new Date(dateTimeString)
    if (isNaN(date.getTime())) {
      return { date: undefined, time: "10:00" }
    }
    
    const timeString = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    return { date, time: timeString }
  }

  const formatDateTime = (date: Date, time: string) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}T${time}`
  }

  const { date: selectedDate, time: selectedTime } = parseDateTime(value)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && onChange) {
      const newDateTime = formatDateTime(selectedDate, selectedTime)
      onChange(newDateTime)
      setIsOpen(false)
    }
  }

  const handleTimeChange = (timeValue: string) => {
    if (!onChange) return
    
    if (selectedDate) {
      const newDateTime = formatDateTime(selectedDate, timeValue)
      onChange(newDateTime)
    } else {
      // If no date is set, use today's date
      const today = new Date()
      const newDateTime = formatDateTime(today, timeValue)
      onChange(newDateTime)
    }
  }

  return (
    <div className={`flex gap-4 ${className || ""}`}>
      <div className="flex-1">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal"
              disabled={disabled}
            >
              {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
              disabled={disabled}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-32">
        <Input
          type="time"
          step="60"
          value={selectedTime}
          onChange={(e) => handleTimeChange(e.target.value)}
          disabled={disabled}
          className="bg-background border-border appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  )
}