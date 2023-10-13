import { useEffect, useState } from "react";
import { Checkbox } from "../../@types/DataTypes";
import OCheckbox from "../OCheckbox/OCheckbox";
import "./OCheckboxGroup.scss";

type Props = {
  onChange: (tab: Checkbox[]) => void;
  group: Array<Checkbox>;
  all?: boolean;
  direction?: "column" | "row";
  grid?: boolean;
  gridColumns?: number;
};

const OCheckboxGroup = (props: Props) => {
  const { group, onChange, direction, all, grid, gridColumns } = props;

  const [allFlag, setAllFlag] = useState(false);

  useEffect(() => {
    const _allgroup = group.filter((item) => item.activie === true);

    setAllFlag(_allgroup.length === group.length);
  }, [group]);

  return (
    <div
      className={`OCheckboxGroup OCheckboxGroup--${direction || "column"}`}
      style={grid ? { display: "grid", gridTemplateColumns: `repeat(${gridColumns}, 1fr)` } : undefined}
    >
      {all && (
        <OCheckbox
          label="Todos"
          value="all"
          checked={allFlag}
          onChange={() => {
            setAllFlag((old) => !old);

            const _group: Checkbox[] = group.map((checkbox) => {
              return {
                ...checkbox,
                activie: !allFlag,
              };
            });

            onChange(_group);
          }}
        />
      )}
      {group.map((checkbox, key) => (
        <OCheckbox
          key={key}
          label={checkbox.label}
          value={checkbox.value}
          checked={checkbox.activie}
          inputText={checkbox.input}
          inputTextValue={checkbox.extraValue}
          onChange={(data) => {
            const _group: Checkbox[] = group.map((checkbox) => {
              return {
                ...checkbox,
                activie: data.value === checkbox.value ? data.activie : checkbox.activie,
              };
            });

            onChange(_group);
          }}
        />
      ))}
    </div>
  );
};

export default OCheckboxGroup;
