import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, OHeader, OInputForm, OLoading, OMenu, OModal, OSelect } from "../../components";

import Menu from "../../data/Menu.json";
import { GroupedUFS, UFS } from "../../data/UFS";

import "./BPORegister.scss";
import { ReactSelect } from "../../@types/DataTypes";
import getUras from "../../services/Olos/Aws/getUras";
import { UF, UpdateURA } from "../../@types/OlosTypes";
import updateUra from "../../services/Olos/Aws/updateUra";
import insertUra, { InsertURA } from "../../services/Olos/Aws/insertUra";

interface BPO {
  id?: number;
  name: string;
  ufs: ReactSelect[];
  edit: boolean;
}

const BPORegister = () => {
  const navigate = useNavigate();

  const [loadingPage, setLoadingPage] = useState(false);
  const [bpos, setBpos] = useState<BPO[]>([]);
  const [bpo, setBpo] = useState<BPO | undefined>();

  const [success, setSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [editWarnig, setEditWarnig] = useState(false);

  const _editBpo = (id: string, value: any, key: number) => {
    const _newline = bpos.map((bpo) => ({ ...bpo }));
    const _bpo: any = _newline[key];
    _bpo[id as string as keyof BPO] = value;

    setBpos(_newline);
  };

  const _addNewBpo = () => {
    const _bpo: BPO = {
      name: "",
      ufs: [],
      edit: false,
    };

    const _bpos = [...bpos, _bpo];
    setBpos(_bpos);
  };

  const _getPageData = () => {
    setLoadingPage(true);
    getUras()
      .then((response) => {
        const _getUf = (uraUF: UF) => {
          const _uf = UFS.find((uf) => uf.value === uraUF.code);

          if (!_uf) return [] as any;

          return { ..._uf, data: { id: uraUF.id } };
        };

        const _bpos: BPO[] = response.map((ura) => {
          return {
            id: ura.id,
            name: ura.name,
            ufs: ura.ufs.map((uraUF) => _getUf(uraUF)),
            edit: true,
          };
        });

        setBpos(_bpos);
      })
      .catch(() => {})
      .finally(() => setLoadingPage(false));
  };

  const _changeBpo = (_bpo: BPO) => {
    setEditWarnig(true);
    setBpo(_bpo);
  };

  const _updateUra = () => {
    if (!bpo) return;

    const _ura: UpdateURA = {
      id: bpo.id || 0,
      name: bpo.name,
      ufs: bpo.ufs.map((uf) => {
        return {
          code: uf.value,
          id: uf?.data?.id || undefined,
        };
      }),
    };


    // updateUra(_ura);
  };

  const _creatBpo = (bpo: BPO) => {
    setLoadingPage(true);

    const _bpo: InsertURA = {
      name: bpo.name,
      ufs: bpo.ufs.map((uf) => {
        return {
          code: uf.value,
          fixed: 0,
        };
      }),
    };

    insertUra(_bpo)
      .then(() => {
        _getPageData();
        setSuccess(true);
      })
      .catch(() => setSaveError(true))
      .finally(() => setLoadingPage(false));
  };

  useEffect(() => {
    _getPageData();
  }, []);

  const _renderBOPS = () => {
    if (!bpos.length) return <div className="BPORegister__BPOS--notFound">Não foram encontradas URA's cadastradas</div>;

    return bpos.map((bpo, key) => {
      return (
        <div key={key} className="BPORegister__BPO">
          <OInputForm placeholder="Nome" value={bpo.name} onChange={(value) => _editBpo("name", value, key)} />
          <OSelect
            placeholder="UF's"
            value={bpo.ufs}
            options={GroupedUFS}
            isMulti
            change={(value) => _editBpo("ufs", value as ReactSelect[], key)}
          />
          <Button
            disabled={bpo.edit ? true : !bpo.name || !bpo.ufs.length}
            title="A função de editar ainda não está disponivel"
            label={bpo.edit ? "Salvar" : "Adicionar"}
            onClick={() => (bpo.edit ? _changeBpo(bpo) : _creatBpo(bpo))}
          />
        </div>
      );
    });
  };

  return (
    <section className="BPORegister">
      <OHeader logout />
      <main className="BPORegister__Content">
        <aside>
          <OMenu menu={Menu} page="bpos" click={(menu) => navigate(menu)} />
        </aside>
        <section className="BPORegister__Main">
          {loadingPage && <OLoading />}
          <>
            <div className="BPORegister__Explanation">
              Para adicionar uma nova opção de URA clique em uma "Nova URA" e em seguida clique em salvar para aplicar
              as alterações.
            </div>
            <div className="BPORegister__BPOS">{_renderBOPS()}</div>
            <div className="BPORegister__Controller">
              <Button label="Nova URA" theme="Border" onClick={() => _addNewBpo()} />
            </div>
          </>
        </section>
      </main>
      {saveError && (
        <OModal
          title="Não conseguimos criar uma nova URA!"
          text="Por Favor, tente novamente mais tarde."
          errorModal
          onClose={() => setSaveError(false)}
        />
      )}
      {success && (
        <OModal
          title="URA criada com sucesso!"
          text="Voce pode fazer a distribuições no menu de Distribuidor de Chamadas"
          onClose={() => setSuccess(false)}
        />
      )}
      {editWarnig && (
        <OModal
          removeInfo
          onClose={() => {
            setEditWarnig(false);
            setBpo(undefined);
          }}
        >
          <section className="BPORegister__Warnig">
            <h1>Atenção</h1>
            <p>
              Ao editar o nome ou as UF's da URA {bpo?.name} você vai vai estar alterando como a distribuição de
              chamadas pode, ser aplicada
            </p>
            <h2>Deseja mesmo salvar essa alterações?</h2>
            <div className="BPORegister__WarnigBtns">
              <Button label="Confirmar" onClick={() => _updateUra()} />
              <Button
                label="Cancelar"
                theme="Border"
                onClick={() => {
                  setEditWarnig(false);
                  setBpo(undefined);
                }}
              />
            </div>
          </section>
        </OModal>
      )}
    </section>
  );
};

export default BPORegister;
