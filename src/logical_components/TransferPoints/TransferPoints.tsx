import { Fragment, useEffect, useState } from "react";
import { TransferPoint, UF } from "../../@types/OlosTypes";
import { Button, OInputForm, OToogle } from "../../components";

import { ReactComponent as Unavailable } from "../../assets/icons/unavailable.svg";
import { ReactComponent as Check } from "../../assets/icons/check.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { isUserAgent } from "../../utils/User";

import updateUf from "../../services/Olos/Aws/updateUf";
import fixUF from "../../services/Olos/Aws/fixUF";
import unfixUF from "../../services/Olos/Aws/unfixUF";

import "./TransferPoints.scss";

type Props = {
  id: number;
  points: UF[];
};

type EditOpt = {
  id: number;
  key: "balance" | "default_values";
  valueId: number;
};

type UFStatus = {
  id: number;
  type: "rejected" | "fulfilled";
};

const TransferPoints = (props: Props) => {
  const { points } = props;

  const [allPoints, setAllPoints] = useState<UF[]>([]);
  const [ufStatus, setUfStatus] = useState<UFStatus[]>([]);

  const [loading, setLoading] = useState(false);

  const _editPoint = (value: any, opt: EditOpt) => {
    const { id, key, valueId } = opt;
    const _newline = allPoints.map((bpo) => ({ ...bpo }));
    const _uf = _newline[id];
    _uf[key][valueId].value = value;

    _uf.edited = true;

    setAllPoints(_newline);
  };

  useEffect(() => {
    setAllPoints(points);
  }, [points]);

  const _save = async () => {
    setLoading(true);
    setUfStatus([]);

    const _ufs = allPoints
      .filter((point) => point.edited)
      .map((point) => {
        return {
          id: point.id,
          default_values: point.default_values.map((defaultValue) => {
            return { ...defaultValue, value: parseInt(defaultValue.value as any) };
          }),
        };
      });

    const ufsResponses = _ufs.map((uf) => updateUf(uf.id, uf.default_values));

    const results = await Promise.allSettled(ufsResponses);

    results.forEach((result, key) => {
      setUfStatus([...ufStatus, { id: _ufs[key].id, type: result.status }]);
    });

    setLoading(false);
  };

  const _pointsSome = allPoints.filter(
    (point) => point.default_values.reduce((total, point) => total + parseInt(point.value as any as string), 0) !== 100
  );

  const _pointsEdited = allPoints.filter((point) => point?.edited);

  const _reoder = (array: TransferPoint[]) => {
    const order = ["teltelematica", "almaviva"];
    return array.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
  };

  const _getRenderStatus = (status?: "rejected" | "fulfilled") => {
    const _icons: { [key: string]: any } = {
      rejected: <Unavailable className="TransferPoints__Error" title="Erro ao distribuir" />,
      fulfilled: <Check className="TransferPoints__Fulfilled" title="Sucesso ao distribuir" />,
    };
    return status ? _icons[status] : undefined;
  };

  const _canSave = () => {
    if (isUserAgent()) return true;
    return !!_pointsSome.length || !!!_pointsEdited.length || loading;
  };

  const _changeFixed = (value: boolean, id: number, uraId: number) => {
    const _newline = allPoints.map((bpo) => ({ ...bpo }));

    _newline[id].fixed = value ? 1 : 0;
    setAllPoints(_newline);

    if (value) {
      fixUF(uraId);
    } else {
      unfixUF(uraId);
    }
  };

  return (
    <div className="TransferPoints">
      <div className="TransferPoints__Header">
        <div className="TransferPoints__HeaderTitle TransferPoints__State">Fixo</div>
      </div>
      <div className="TransferPoints__Header">
        <div className="TransferPoints__HeaderTitle TransferPoints__State">Estado</div>
      </div>
      <div className="TransferPoints__Header TransferPoints__Init">
        <div className="TransferPoints__HeaderTitle">Valores Iniciais</div>
        <div className="TransferPoints__SubHeader">Teltelematica</div>
        <div className="TransferPoints__SubHeader">Almaviva</div>
      </div>
      <div className="TransferPoints__Header TransferPoints__Current">
        <div className="TransferPoints__HeaderTitle">Valores Atuais</div>
        <div className="TransferPoints__SubHeader">Teltelematica</div>
        <div className="TransferPoints__SubHeader">Almaviva</div>
      </div>

      <div className="TransferPoints__Header" />

      {allPoints.map((point, id) => {
        const _showInfo =
          point.default_values.reduce((total, point) => total + parseInt(point.value as any as string), 0) !== 100;

        return (
          <Fragment key={id}>
            <div className="TransferPoints__Line TransferPoints__Fixed">
              <OToogle
                id={point.id.toString()}
                status={!!point.fixed}
                change={(flag) => _changeFixed(flag, id, point.id)}
              />
            </div>
            <div className="TransferPoints__Line TransferPoints__UF">
              <span>{point.code}</span>
              {point.edited && <Edit className="TransferPoints__Edit" />}
              {_showInfo && (
                <span className="TransferPoints__Warning">
                  (Os valores distribuidos entre essa carteira não é igual 100%!)
                </span>
              )}
            </div>
            <div className={`TransferPoints__Line TransferPoints__Default ${point.fixed ? "TransferPoints--disable" : ""}`}>
              {_reoder(point.default_values).map((initial, key) => {
                return (
                  <div key={key} className="TransferPoints__Value">
                    <OInputForm
                      key={key}
                      value={initial.value.toString()}
                      disable={isUserAgent()}
                      onChange={(value) =>
                        _editPoint(value.replace(/\D/g, ""), { id, key: "default_values", valueId: key })
                      }
                    />
                    <span>%</span>
                  </div>
                );
              })}
            </div>
            <div className={`TransferPoints__Line TransferPoints__Balance ${point.fixed ? "TransferPoints--disable" : ""}`}>
              {_reoder(point.balance).map((initial, key) => {
                return (
                  <div key={key} className="TransferPoints__Value">
                    <OInputForm key={key} value={initial.value.toString()} />
                    <span>%</span>
                  </div>
                );
              })}
            </div>
            <div className="TransferPoints__Line TransferPoints__Info">
              {_getRenderStatus(ufStatus.find((st) => st.id === point.id)?.type)}
            </div>
          </Fragment>
        );
      })}
      <Button label={loading ? "Enviando..." : "Salvar"} disabled={_canSave()} onClick={() => _save()} />
    </div>
  );
};

export default TransferPoints;
