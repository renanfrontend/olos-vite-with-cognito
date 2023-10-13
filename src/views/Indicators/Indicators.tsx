import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, OHeader, OLoading, OMenu, OModal, OSelect } from "../../components";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ReactSelect } from "../../@types/DataTypes";
import { IndicatorController } from "../../logical_components";
import { setApiError, setRules } from "../../store/slices/slices";

import Menu from "../../data/Menu.json";
import getIndicators from "../../services/Olos/Aws/getIndicators";
import getRules from "../../services/Olos/Aws/getRules";

import "./indicators.scss";
import { UpdateIndicator } from "../../@types/OlosTypes";
import { timeToSeconds } from "../../utils/DateUtils";
import updateIndicators from "../../services/Olos/Aws/updateIndicators";

export type PageIndicator = {
  id: number;
  name: string;
  type: string;
  rule: ReactSelect;
  target: string;
  prompt: string;
  weight: string;
  on_off: number;
  column_name: string;
};

const Indicators = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loadingPage, setLoadingPage] = useState(false);

  const uras = useSelector((state: RootState) => state.uras.uras);

  const [selectedUra, setSelectedUra] = useState<ReactSelect | undefined>(undefined);
  const [indicators, setIndicators] = useState<PageIndicator[]>([]);

  const [saveError, setSaveError] = useState(false);
  const [success, setSuccess] = useState(false);

  const _changeIndicator = (id: number, value: PageIndicator, key: keyof PageIndicator) => {
    const _newIndicator = indicators.map((indicator) => ({ ...indicator }));
    const _indicator: any = _newIndicator[id];
    _indicator[key] = value[key];

    setIndicators(_newIndicator);
  };

  const _saveChanges = () => {
    setLoadingPage(true);

    const sumOfStuffArray: any[] = [];
    const _indicators: UpdateIndicator[] = indicators.map((indicator) => {
      return {
        id: indicator.id,
        name: indicator.name,
        on_off: indicator.on_off,
        prompt: indicator.prompt,
        rule_id: parseInt(indicator.rule.value),
        target: indicator.type === "time" ? timeToSeconds(indicator.target) : parseInt(indicator.target),
        type: indicator.type,
        weight: parseInt(indicator.weight),
        column_name: indicator.column_name,
      };
    });

    const indicatorsResponses = _indicators.map((indicator) => updateIndicators(indicator));

    Promise.all(indicatorsResponses)
      .then((responseArray) => responseArray.forEach((response) => sumOfStuffArray.push(response)))
      .then(() => setSuccess(true))
      .catch(() => setSaveError(true))
      .finally(() => setLoadingPage(false));
  };

  const _searchIndicators = async () => {
    setLoadingPage(true);
    try {
      const _indicators = await getIndicators();

      const _pageIndicator: PageIndicator[] = _indicators
        .sort((a, b) => a.id - b.id)
        .map((indicator) => {
          return {
            id: indicator.id,
            name: indicator.name,
            on_off: indicator.on_off,
            prompt: indicator.prompt,
            type: indicator.type,
            target:
              indicator.type === "time"
                ? new Date(indicator.target * 1000).toISOString().slice(11, 19)
                : indicator.target.toString(),
            weight: indicator.weight.toString(),
            rule: {
              label: indicator.rule_name,
              value: indicator.rule_id.toString(),
            },
            column_name: indicator.column_name
          };
        });

      setIndicators(_pageIndicator);

      const rules = await getRules();
      dispatch(setRules(rules));
    } catch (error) {
      dispatch(setApiError(`Ops!, Algo aconteceu com o nosso servidor!`));
    }

    setLoadingPage(false);
  };

  const _indicatorsValidation = indicators.filter((indicator) => !indicator.target || !indicator.weight);

  return (
    <section className="Indicators">
      <OHeader  logout/>
      <main className="Indicators__Content">
        <aside>
          <OMenu menu={Menu} page="indicadores" click={(menu) => navigate(menu)} />
        </aside>
        <section className="Indicators__Main">
          {loadingPage && <OLoading />}
          <>
            <div className="Indicators__Explanation">
              Selecione uma URA e distribua o peso para os indicadores listados e em seguida clique em salvar para
              aplicar as alterações.
            </div>
            <div className="Home__Filters">
              <OSelect
                placeholder="Selecione uma Ura"
                value={selectedUra}
                options={uras || []}
                change={(value) => {
                  return setSelectedUra(value as ReactSelect);
                }}
              />
              <Button label="Buscar" disabled={!selectedUra} onClick={() => _searchIndicators()} />
            </div>
            {!!indicators.length && (
              <>
                <div className="Indicators__Fields">
                  <div className="Indicators__Fields__Header">
                    <span>Parâmetro</span>
                    <span>Regra</span>
                    <span>Tipo/Meta</span>
                    <span>Peso</span>
                  </div>

                  {indicators.map((indicator, key) => {
                    return (
                      <IndicatorController
                        id={key}
                        key={key}
                        indicator={indicator}
                        onIndicatorChange={(id, value, key) => _changeIndicator(id, value, key)}
                      />
                    );
                  })}
                </div>
                <Button disabled={!!_indicatorsValidation.length} label="Salvar" onClick={() => _saveChanges()} />
              </>
            )}
          </>
        </section>
      </main>
      {saveError && (
        <OModal
          errorModal
          title="Não conseguimos fazer a alteração dos indicadores!"
          text="Por Favor, tente novamente."
          onClose={() => setSaveError(false)}
        />
      )}
      {success && (
        <OModal
          title="Indicadores alterados com sucesso!"
          text="Voce pode consultar os indicadores no menu de Relatórios"
          onClose={() => setSuccess(false)}
        />
      )}
    </section>
  );
};

export default Indicators;
