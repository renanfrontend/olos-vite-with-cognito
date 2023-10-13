/* eslint-disable react-hooks/exhaustive-deps */

import { useState } from "react";

import { ReactSelect } from "../../@types/DataTypes";
import { Button, OAcordeon, OCard, OHeader, OLoading, OMenu, OModal, OSelect } from "../../components";
import { RegionalController, TransferPoints } from "../../logical_components";
import { useNavigate } from "react-router-dom";
import { ConfigAws, Regional, UraTransferPoints } from "../../@types/OlosTypes";
import { setApiError, setConfigs } from "../../store/slices/slices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import Menu from "../../data/Menu.json";

import getConfig from "../../services/Olos/Aws/getConfig";
import updateConfig from "../../services/Olos/Aws/updateConfig";

import getTransferPoints from "../../services/Olos/Aws/getTransferPoints";
import { isUserAgent } from "../../utils/User";

import "./Home.scss";
import updateUraToDefault from "../../services/Olos/Aws/updateUraToDefault";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const configs = useSelector((state: RootState) => state.uras.configs);

  const [walletData, setWalletData] = useState<Regional[] | undefined>(undefined);
  const [transferPointsData, setTransferPointsData] = useState<UraTransferPoints[] | undefined>(undefined);

  const [selectedUra, setSelectedUra] = useState<ReactSelect | undefined>(undefined);

  const [saveError, setSaveError] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const [openUra, setOpenUra] = useState(0);

  const uras = useSelector((state: RootState) => state.uras.uras);

  const _getWallets = async () => {
    setLoadingPage(true);
    try {
      const _configs = await getConfig();

      const _wallets: Regional[] = _configs.values.map((distrib, key) => {
        return {
          id: key.toString(),
          generalValue: distrib.value.toString(),
          name: distrib.key,
          original: distrib,
        };
      });

      const _transferPoints = await getTransferPoints();
      setTransferPointsData(_transferPoints);

      setWalletData(_wallets);
      dispatch(setConfigs(_configs));
    } catch (error) {
      dispatch(setApiError(`Ops!, Algo aconteceu com o nosso servidor! Erro na API /Config`));
    }

    setLoadingPage(false);
  };

  const _searchWallets = () => {
    _getWallets();
  };

  const _updateValues = (regional: Regional) => {
    if (!walletData) return;

    const _wallet = [...walletData];
    const objIndex = walletData?.findIndex((obj) => obj.id === regional.id);

    _wallet[objIndex] = regional;

    setWalletData(_wallet);
  };

  const _redistribute = () => {
    if (!walletData || !configs) return;

    setLoadingSave(true);

    const _regional: ConfigAws = {
      id: configs?.id,
      values: walletData.map((wallet) => {
        return {
          key: wallet.name,
          value: parseInt(wallet.generalValue),
        };
      }),
    };

    updateConfig(_regional)
      .then(() => setSuccess(true))
      .catch(() => setSaveError(true))
      .finally(() => setLoadingSave(false));
  };

  const _redistributeForAll = (all?: boolean) => {
    if (!transferPointsData) return;

    const sumOfStuffArray: any[] = [];
    const _uraIds = transferPointsData?.map((point) => updateUraToDefault({ ura_id: point.id }));

    Promise.all(_uraIds)
      .then((responseArray) => responseArray.forEach((response) => sumOfStuffArray.push(response)))
      .then(() => {
        _getWallets();
        setSuccess(false);
      })
      // .catch(() => setSaveError(true))
      // .finally(() => setLoadingPage(false));
  };

  const _canSave = () => {
    if (isUserAgent()) return true;
    return !(some && some === 100);
  };

  const some = walletData?.reduce((partialSum, a) => partialSum + parseInt(a.generalValue), 0) || undefined;

  return (
    <section className="Home">
      <OHeader logout />
      <main className="Home__Content">
        <aside>
          <OMenu menu={Menu} page="inicio" click={(menu) => navigate(menu)} />
        </aside>
        <section className="Home__Main">
          {loadingPage && <OLoading />}
          <>
            <div className="Home__Explanation">
              Selecione uma URA para distribuir o total de chamadas pelas carteiras e em seguida clique em salvar para
              aplicar as alterações.
            </div>
            <div className="Home__Filters">
              <OSelect
                placeholder="Selecione uma Ura"
                value={selectedUra}
                options={uras || []}
                change={(value) => {
                  if (!value) setWalletData(undefined);
                  return setSelectedUra(value as ReactSelect);
                }}
              />
              <Button label="Buscar" disabled={!selectedUra} onClick={() => _searchWallets()} />
            </div>

            <div className="Home__Wallets">
              {!walletData?.length && (
                <div className="Home__WalletNotFound">
                  {walletData === undefined
                    ? "Selecione uma URA acima para poder distribuir chamadas!"
                    : "Não foram encontradas carteiras para a URA selecionada!"}
                </div>
              )}
              {walletData?.length && (
                <>
                  <div className="Home__WalletItens">
                    {walletData?.map((item, key) => {
                      return (
                        <OCard key={key} title={item.name} subTitle="% por Distribuição Total">
                          <RegionalController
                            disable={loadingSave}
                            transferPoint
                            order={key + 1}
                            key={key}
                            eps={item}
                            onGeneralValueChange={(value) => _updateValues(value)}
                            onPointsValueChange={(data) => _updateValues(data)}
                          />
                        </OCard>
                      );
                    })}
                  </div>

                  <p
                    className={`Home__Error 
                ${some && some === 100 ? "Home__Error--hidden" : ""} 
                ${some === undefined ? "Home__Error--yellow" : ""}`}
                  >
                    {some === undefined
                      ? "Preencha os valores de distribuição e clique em salvar!"
                      : "Os valores distribuidos entre as carteiras não é igual 100%!"}
                  </p>
                  <div className="Home__SaveArea">
                    <Button
                      loading={loadingSave}
                      label="Salvar"
                      disabled={_canSave()}
                      onClick={() => _redistribute()}
                    />
                  </div>
                </>
              )}
            </div>
            {!!transferPointsData?.length && (
              <div className="Home__TransferPoints">
                <h1 className="Home__Title">Pontos de Transferência</h1>
                {transferPointsData?.map((transferPoint, key) => {
                  return (
                    <OAcordeon
                      id={key + 1}
                      open={openUra === key + 1}
                      key={key}
                      name={transferPoint.name}
                      disable={!!transferPoint.ufs.length}
                      message={
                        transferPoint.ufs.length ? "" : "Não há UF's cadastrados para esse Ponto de Transferencia"
                      }
                      onClick={(id) => setOpenUra(openUra === id ? 0 : id)}
                    >
                      <TransferPoints id={transferPoint.id} points={transferPoint.ufs} />
                    </OAcordeon>
                  );
                })}
              </div>
            )}
          </>
        </section>
      </main>
      {saveError && (
        <OModal
          title="Não conseguimos mudar o valores padrão de distribuição!"
          text="Por Favor, tente novamente."
          onClose={() => setSaveError(false)}
          errorModal
        />
      )}
      {success && (
        <OModal
          title="Os valores padrão de distribuição foram alterados com sucesso!"
          text="Deseja replicar essa alteração para os Pontos de Transferência e suas UF's?"
          onClose={() => setSuccess(false)}
        >
          <div className="Home__SuccessController">
            <Button label="Replicar para Todos" onClick={() => _redistributeForAll(true)} />
            <Button theme="Border" label="Não Desejo Replicar" onClick={() => setSuccess(false)} />
          </div>
        </OModal>
      )}
    </section>
  );
};
