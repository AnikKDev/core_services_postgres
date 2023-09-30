import { WeekDays } from '@prisma/client';

export const asyncForeach = async (arr: any[], callback: any) => {
  if (!Array.isArray(arr)) {
    throw new Error('Expected an array');
  }
  for (let i = 0; i < arr.length; i++) {
    await callback(arr[i], i, arr);
  }
};

export const hasTimeConflict = (
  existingSchedules: {
    startTime: string;
    endTime: string;
    dayOfWeek: WeekDays;
  }[],
  newSlot: {
    startTime: string;
    endTime: string;
    dayOfWeek: WeekDays;
  }
) => {
  for (const slot of existingSchedules) {
    /* 
Consider two scenarios:

### Scenario 1:
- Existing Slot: `2:00 PM` to `4:00 PM`
- New Slot: `1:00 PM` to `3:00 PM`

Here:
- `newStart (1:00 PM) < existingEnd (4:00 PM)`, which is true.
- But, `newEnd (3:00 PM) > existingStart (2:00 PM)`, which is also true.

The combined condition correctly identifies an overlap in this case.

### Scenario 2:
- Existing Slot: `2:00 PM` to `4:00 PM`
- New Slot: `12:00 PM` to `1:30 PM`

Here:
- `newStart (12:00 PM) < existingEnd (4:00 PM)`, which is true.
- However, `newEnd (1:30 PM) > existingStart (2:00 PM)`, which is false.

Without the second condition, the code would mistakenly identify an overlap in this scenario, even though the new slot finishes before the existing slot starts.

The condition `newEnd > existingStart` ensures that the end of the new slot is indeed after the start of the existing slot. Only in such cases can we have a legitimate overlap.

The point of the entire condition (`newStart < existingEnd && newEnd > existingStart`) is to ensure that there's an actual overlap, and not just a new slot starting before an existing one or ending before an existing one starts. It makes sure there's an actual overlap where both start and end times of the new slot lie within the duration of the existing slot or vice versa.

*/

    const existingStart = new Date(`1970-01-01T${slot.startTime}:00`);
    const existingEnd = new Date(`1980-01-01T${slot.endTime}:00`);
    const newStart = new Date(`1980-01-01T${newSlot.startTime}:00`);
    const newEnd = new Date(`1980-01-01T${newSlot.endTime}:00`);

    if (newStart < existingEnd && newEnd > existingStart) {
      return true; //has conflicting start and end
    }
  }
  return false;
};
