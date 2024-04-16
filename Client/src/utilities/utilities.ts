interface Date {
  format(type?: string): string;
}

export const Init = () => {
  console.log("init");
};

console.log("INIT");

Init();

export class CustomDate extends Date {
  format(type?: string): string {
    const currentDate = this;
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Месяцы начинаются с 0
    const year = currentDate.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }
}

export const findTag = (tags: string[] | undefined, tag: string) => {
  if (!tags) return false;
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].indexOf(tag) != -1) {
      return true;
    }
  }
  return false;
}