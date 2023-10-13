import { Regional } from "../../@types/OlosTypes";
import { OInputForm } from "../../components";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";

import Mask from "@this-empathy/javascript-mask";

import "./RegionalController.scss";
import { isUserAgent } from "../../utils/User";

type Props = {
  eps: Regional;
  transferPoint?: boolean;
  order?: number;
  disable?: boolean;
  onGeneralValueChange?: (value: Regional) => void;
  onPointsValueChange?: (value: Regional) => void;
};

const RegionalController = (props: Props) => {
  const { eps, onGeneralValueChange, order, disable } = props;

  

  return (
    <div className={`RegionalController ${disable ? "RegionalController--disable" : ""}`}>
      {eps.total && (
        <>
          <div className="RegionalController__Reach">
            <div className="RegionalController__ReachTitle">Meta</div>
            <div className="RegionalController__ReachNumber">
              <ul>
                <li>
                  <span>SLA(20)</span>
                  <small>s</small>
                </li>
                <li className="RegionalController__And">
                  <span>|</span>
                </li>
                <li>
                  <span>{eps.total}</span>
                  <small>%</small>
                </li>
              </ul>
            </div>
          </div>
          <div className="RegionalController__Dot"></div>
        </>
      )}
      <div className="RegionalController__General">
        <div className="RegionalController__Input">
          <OInputForm
            value={eps.generalValue}
            maxLength={3}
            order={order}
            disable={isUserAgent()}
            onChange={(value) =>
              onGeneralValueChange && onGeneralValueChange({ ...eps, generalValue: Mask.number(value) })
            }
          />
          %
        </div>
      </div>
    </div>
  );
};

export default RegionalController;
