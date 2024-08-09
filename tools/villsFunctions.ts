export class CurrentDate extends Date {
  constructor() {
    super();
  }

  day() {
    return this.getDate();
  }

  month() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[this.getMonth()];
  }

  year() {
    return this.getFullYear();
  }

  formatTimePart(part: number) {
    return part < 10 ? `0${part}` : part;
  }

  hour() {
    return this.formatTimePart(this.getHours());
  }

  minutes() {
    return this.formatTimePart(this.getMinutes());
  }

  seconds() {
    return this.formatTimePart(this.getSeconds());
  }
}
