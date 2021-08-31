export function deDupeByKey<
  Entry extends Record<string, any>,
  Key extends keyof Entry,
>(list: Entry[], key: Key): Entry[] {
  const keys: Record<string, boolean> = {};
  return list.filter((entry) => {
    const has = keys[entry[key]];
    keys[entry[key]] = true;
    return !has;
  });
}
