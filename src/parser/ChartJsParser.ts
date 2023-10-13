import { DistribEPS, OperationData, ServiceLevelAws } from "../@types/OlosTypes";
import { CHART_COLORS, getRandomColor, NAMED_COLORS, transparentize } from "../utils/ChartJsUtils";

type ChartLabelJs = {
  valid: boolean;
  data?: Array<string>;
};

type ChartJs = {
  valid: boolean;
  data?: any;
};

export const EpsToChartLabels = (data: DistribEPS[]): string[] => {
  const _labels = data
    .filter((v, i, a) => a.findIndex((v2) => v2.dateEvent === v.dateEvent) === i)
    .map((eps) => eps.dateEvent);
  return _labels;
};

export const EpsToChartDatasets = (data: DistribEPS[]) => {
  const _datasets: any[] = [];
  const _datesetIds = data
    .filter((v, i, a) => a.findIndex((v2) => v2.epsID === v.epsID) === i)
    .map((eps) => {
      return {
        id: eps.epsID,
        label: eps.descriptionService,
      };
    });

  _datesetIds.forEach((eps, key) => {
    const color = NAMED_COLORS[key] ? NAMED_COLORS[key] : getRandomColor();

    const _obj = {
      label: eps.label,
      data: data.filter((u) => u.epsID === eps.id).map((i) => i.percentualAtual),
      borderColor: color,
      backgroundColor: transparentize(color, 0.5),
    };
    _datasets.push(_obj);
  });

  return _datasets;
};

export const EpsToChart = (data: DistribEPS[]) => {
  const labels = EpsToChartLabels(data);
  const datasets = EpsToChartDatasets(data);
  return {
    labels,
    datasets,
  };
};

export const ServiceLevelToChartLabels = (data: ServiceLevelAws[]): ChartLabelJs => {
  if (!data.length) return { data: undefined, valid: false };

  const _labels = data[0].values.map((value) => value.timestamp);
  return { data: _labels, valid: true };
};

const _getSimpleData = (data: ServiceLevelAws[], fixedNumber: number | undefined) => {
  const _data = data;

  if (fixedNumber) {
    const fixed = {
      platform: "meta",
      values: data[0].values.map((value, key) => {
        return {
          ...value,
          value: key === 0 || key === data[0].values.length - 1 ? fixedNumber : NaN,
        };
      }),
    };
    _data.push(fixed);
  }

  const datasets = _data.map((dataset, key) => {
    const color = NAMED_COLORS[key] ? NAMED_COLORS[key] : getRandomColor();
    const finalColor = dataset.platform === "meta" ? CHART_COLORS.red : color;

    return {
      label: dataset.platform,
      data: dataset.values.map((value) => {
        return {
          x: value.timestamp,
          y: value.value,
        };
      }),
      borderColor: finalColor,
      backgroundColor: transparentize(finalColor, 0.5),
      spanGaps: true,
    };
  });

  return datasets;
};

export const ServiceLevelChartDatasets = (data: ServiceLevelAws[], fixedNumber: number | undefined) => {
  return _getSimpleData(data, fixedNumber);
};

const _normilizeData = (data: OperationData[], platforms: string[], kpi: string): ServiceLevelAws[] => {
  const _merged = data
    .map((item) => {
      return item.kpis.map((value) => {
        return {
          ...value,
          name: item.platform,
        };
      });
    })
    .flat();

  const _sorted = _merged.sort(function (a, b) {
    return (new Date(a.timestamp) as any) - (new Date(b.timestamp) as any);
  });

  const _normilized = platforms.map((platform) => {
    return {
      platform,
      values: _sorted.map((value, key) => {
        return {
          timestamp: value.timestamp,
          value: value.name === platform ? value[kpi as string as keyof typeof value] : NaN, 
        };
      }),
    };
  });

  return _normilized;
};

export const ServiceLevelToChart = (
  data: OperationData[],
  kpi: string | undefined,
  fixedNumber: number | undefined
): ChartJs => {
  if (!kpi) return { valid: false, data: undefined };

  const _data = _normilizeData(
    data,
    data.map((item) => item.platform),
    kpi
  );

  const labels = ServiceLevelToChartLabels(_data);
  if (!labels.valid) return { valid: false, data: undefined };

  const datasets = ServiceLevelChartDatasets(_data, fixedNumber);

  return {
    valid: true,
    data: {
      labels: labels?.data,
      datasets,
    },
  };
};
