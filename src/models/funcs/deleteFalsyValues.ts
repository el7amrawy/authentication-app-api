const deleteFalsyValues = (ob: Object): Object => {
  for (const key in ob) {
    if (!ob[key as keyof typeof ob]) {
      delete ob[key as keyof typeof ob];
    }
  }
  return ob;
};

export default deleteFalsyValues;
