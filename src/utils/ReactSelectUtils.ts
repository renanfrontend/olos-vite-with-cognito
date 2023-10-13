import { ReactSelect } from "../@types/DataTypes";

export const operation = (list1: ReactSelect[], list2: ReactSelect[], isUnion = false) =>
  list1.filter(
    (
      (set) => (a) =>
        isUnion === set.has(a.value)
    )(new Set(list2.map((b) => b.value)))
  );

export const inBoth = (list1: ReactSelect[], list2: ReactSelect[]) => operation(list1, list2, true),
  inFirstOnly = operation,
  inSecondOnly = (list1: ReactSelect[], list2: ReactSelect[]) => inFirstOnly(list2, list1);
