// export function getPeopleForDay(scheduleData, category, day) {
//   return Object.entries(scheduleData)
//     .filter(([name, selectedDays]) => selectedDays[category].includes(day))
//     .map(([name]) => name);
// }

export function getPeopleForDay(scheduleData, category, day) {
  const people = [];
  for (let name in scheduleData) {
    if (!scheduleData.hasOwnProperty(name)) continue;
    if (scheduleData[name][category].includes(day)) people.push(name);
  }
  return people;
}
