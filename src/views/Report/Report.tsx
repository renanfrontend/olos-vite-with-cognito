import { useState } from "react";
import { Button, OHeader, OLoading, OMenu, OSelect } from "../../components";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  Point,
  BubbleDataPoint,
  ChartOptions,
} from "chart.js";

import Menu from "../../data/Menu.json";

import { add, format } from "date-fns";
import { ReactSelect } from "../../@types/DataTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setApiError } from "../../store/slices/slices";

import { ServiceLevelToChart } from "../../parser/ChartJsParser";
import getKpis from "../../services/Olos/Aws/getkpis";

import Indicators from "../../data/Indicators.json";

import "./Report.scss";
import getIndicators from "../../services/Olos/Aws/getIndicators";

type ObjRender = {
  name: string;
  render: JSX.Element | null;
};

export const Report = () => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uras = useSelector((state: RootState) => state.uras.uras);

  const [selectedUra, setSelectedUra] = useState<ReactSelect | undefined>(undefined);
  const [selectedIndicator, setSelectedIndicator] = useState<ReactSelect | undefined>(undefined);
  const [indicatorValue, setIndicatorValue] = useState<string | undefined>(undefined);

  const chartToRender = "report1";
  const [loadingPage, setLoadingPage] = useState(false);

  const [chart, setChart] = useState(false);
  const [tickType, setTickType] = useState("");

  const [chartReportOne, setChartReportOne] =
    useState<ChartData<"line", (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>>();

  const [emptyChart, setEmptyChart] = useState(false);

  const _searchReports = async () => {
    setLoadingPage(true);
    dispatch(setApiError(""));
    setEmptyChart(false);

    try {
      const _kpis = await getKpis(format(new Date(), "yyyy-MM-dd"));
      // const _kpis = await getKpis("2023-06-21");
      const _indicators = await getIndicators();

      const _target = _indicators.find((indicator) => indicator.name === selectedIndicator?.label) || undefined;
      setTickType(_target?.type || "");

      const _chart = ServiceLevelToChart(_kpis.data, selectedIndicator?.value, _target?.target);

      if (!_chart.valid)
        return dispatch(
          setApiError(`Ops! Os dados entre as plataformas estão incoerentes! Erro na API /operation/kpis ou /kpi`)
        );

      setChartReportOne(_chart.data);
      setChart(true);
      setIndicatorValue(selectedIndicator?.value)
    } catch (error) {
      const _err = error as any;

      if (_err?.response?.status === 404) {
        setChart(false);
        setEmptyChart(true);
      } else {
        dispatch(setApiError(`Ops! Algo aconteceu com o nosso servidor! Erro na API /operation/kpis ou /kpi`));
      }
    }

    setLoadingPage(false);
  };

  const options: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        max: tickType === "time" || indicatorValue === "number_of_calls" ? undefined : 100,
        min: tickType === "time" || indicatorValue === "number_of_calls" ? undefined : 0,
        offset: true,
        ticks: {
          callback: function (value: any, index: any, ticks: any) {
            if (tickType === "time") return new Date(value * 1000).toISOString().slice(11, 19);
            if (indicatorValue === "number_of_calls") return value;
            return `${value}%`;
          },
        },
      },
      x: {
        offset: false,
        ticks: {
          callback: function (val: any, index: any): any {
            const _date = new Date(this.getLabelForValue(val));
            return format(add(_date, { hours: 3 }), "dd/MM - HH:mm:ss");
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function (context) {
            if (!context[0]?.label) return "";

            const _date = new Date(context[0]?.label);
            return format(add(_date, { hours: 3 }), "dd/MM - HH:mm:ss");
          },
          label: function (context) {
            const label = context.dataset.label || "";
            let value = "";

            if (tickType === "time") {
              value = new Date(parseInt(context.formattedValue) * 1000).toISOString().slice(11, 19);
            } else if (selectedIndicator?.value === "number_of_calls") {
              value = context.formattedValue;
            } else {
              value = `${context.formattedValue}%`;
            }

            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  const renderChart: { [key: string]: ObjRender } = {
    report1: {
      name: "report 1",
      render: chartReportOne ? <Line key="report-1" options={options as any} data={chartReportOne} /> : null,
    },
  };

  return (
    <section className="Report">
      <OHeader logout />
      <main className="Report__Content">
        <aside>
          <OMenu menu={Menu} page="relatorio" click={(menu) => navigate(menu)} />
        </aside>
        <section className="Report__Main">
          <div className="Report__Explanation">Selecione uma URA para visualizar o relatório de distribuição.</div>
          <div className="Report__Filters">
            <OSelect
              placeholder="Selecione uma Ura"
              value={selectedUra}
              options={uras}
              change={(value) => setSelectedUra(value as ReactSelect)}
            />
            <OSelect
              placeholder="Indicador"
              value={selectedIndicator}
              options={Indicators}
              change={(value) => setSelectedIndicator(value as ReactSelect)}
            />
            <Button label="Analisar" disabled={!selectedUra || !selectedIndicator} onClick={() => _searchReports()} />
          </div>
          {chart && (
            <div className="Report__MainContent">
              <div className="Report__Dash">{renderChart[chartToRender].render}</div>
            </div>
          )}
          {emptyChart && <p>Não foram encontrados dados para montar gráfico</p>}
        </section>
      </main>
      {loadingPage && <OLoading />}
    </section>
  );
};
