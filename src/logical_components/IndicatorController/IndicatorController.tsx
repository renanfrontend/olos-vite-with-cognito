import { useSelector } from "react-redux";
import { ReactSelect } from "../../@types/DataTypes";
import { OInputForm, OSelect, OToogle } from "../../components";

import "./IndicatorController.scss";
import { RootState } from "../../store";
import { PageIndicator } from "../../views/Indicators/Indicators";
import { toPattern } from "../../utils/Mask";
import { isUserAgent } from "../../utils/User";

type Props = {
  id: number;
  indicator: PageIndicator;
  onIndicatorChange: (id: number, value: PageIndicator, inputName: keyof PageIndicator) => void;
};

const IndicatorController = (props: Props) => {
  const { id, indicator, onIndicatorChange } = props;
  const { on_off, name, target, weight, rule, prompt, type } = indicator;

  const rules = useSelector((state: RootState) => state.uras.rules);

  const disable = !!on_off;

  const _subtitle: { [key: string]: string } = {
    NPS: "Pesquisa de Satisfação",
    SLA: "Nivel de Serviço",
    TME: "Tempo médio em espera",
    ABANDONO: "Porcetagem de Abandono",
    TMA: "Tempo médio de antedimento",
  };

  return (
    <div
      className={`IndicatorController ${!disable ? "IndicatorController--disable" : ""} ${
        isUserAgent() ? "IndicatorController--notAllowed" : ""
      }`}
    >
      <OInputForm name="IndicatorController__Name" value={`${name} ${_subtitle[name] ? `(${_subtitle[name]})` : ""}`} />
      <OSelect
        options={rules.map((rule) => {
          return {
            label: rule.name,
            value: rule.id.toString(),
          };
        })}
        value={rule}
        change={(value) => {
          const _value = value as ReactSelect;
          onIndicatorChange(id, { ...indicator, rule: _value }, "rule");
        }}
      />
      <OInputForm
        name="IndicatorController__Goal"
        placeholder={prompt}
        value={target}
        onChange={(value) => {
          onIndicatorChange(
            id,
            { ...indicator, target: type === "time" ? toPattern(value, "99:99:99") : value.replace(/\D/g, "") },
            "target"
          );
        }}
      />
      <OInputForm
        name="IndicatorController__Value"
        value={weight}
        placeholder="Peso"
        onChange={(value) => onIndicatorChange(id, { ...indicator, weight: value.replace(/\D/g, "") }, "weight")}
      />
      <OToogle
        status={disable}
        id={name}
        change={(value) => onIndicatorChange(id, { ...indicator, on_off: value ? 1 : 0 }, "on_off")}
      />
    </div>
  );
};

export default IndicatorController;
